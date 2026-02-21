
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

// Lazy-init Supabase Admin client (avoids crash if env var missing at module load)
let _adminClient: ReturnType<typeof createClient> | null = null
function getSupabaseAdmin() {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
        throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set in .env.local. Get it from Supabase Dashboard → Settings → API → Service Role Key.')
    }
    if (!_adminClient) {
        _adminClient = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        )
    }
    return _adminClient
}

import { checkAdminSession } from '@/utils/adminAuth'

export async function GET(request: Request) {
    try {
        const isAdmin = checkAdminSession()
        if (!isAdmin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const query = searchParams.get('query') || ''

        // Fetch profiles with subscription and plan info
        let dbQuery = (getSupabaseAdmin()
            .from('profiles') as any)
            .select(`
        *,
        subscriptions (
          status,
          current_period_end,
          plans (
            name,
            price
          )
        )
      `)
            .order('created_at', { ascending: false })

        if (query) {
            const sanitized = query.replace(/[%_'"\\]/g, '')
            dbQuery = dbQuery.or(`email.ilike.%${sanitized}%,full_name.ilike.%${sanitized}%,phone.ilike.%${sanitized}%`)
        }

        const { data: profileUsers, error } = await dbQuery

        if (error) throw error

        // Also get auth.users to catch any users whose profile trigger didn't fire
        // This ensures Google OAuth users from the app are always visible
        const { data: authData } = await getSupabaseAdmin().auth.admin.listUsers({ perPage: 1000 })
        const authUsers = authData?.users || []

        // Build a map of profile users by ID
        const profileMap = new Map((profileUsers || []).map((u: any) => [u.id, u]))

        // Merge: start with profiles, then add any auth users not in profiles
        const mergedUsers: any[] = [...(profileUsers || [])]
        for (const au of authUsers) {
            if (!profileMap.has(au.id)) {
                mergedUsers.push({
                    id: au.id,
                    email: au.email || au.user_metadata?.email || 'N/A',
                    full_name: au.user_metadata?.full_name || au.user_metadata?.name || null,
                    phone: au.phone || au.user_metadata?.phone || null,
                    gstin: null,
                    role: 'user',
                    is_banned: au.banned_until ? new Date(au.banned_until) > new Date() : false,
                    created_at: au.created_at,
                    subscriptions: []
                })
            }
        }

        // Filter by search query on merged list
        let filtered = mergedUsers
        if (query) {
            const q = query.toLowerCase()
            filtered = mergedUsers.filter(u =>
                (u.email || '').toLowerCase().includes(q) ||
                (u.full_name || '').toLowerCase().includes(q) ||
                (u.phone || '').toLowerCase().includes(q)
            )
        }

        // Transform data for UI
        const formattedUsers = filtered.map((user: any) => ({
            id: user.id,
            email: user.email || 'N/A',
            name: user.full_name || 'N/A',
            phone: user.phone || 'N/A',
            gstin: user.gstin || 'N/A',
            role: user.role || 'user',
            is_banned: user.is_banned || false,
            joined_at: user.created_at,
            plan: user.subscriptions?.[0]?.plans?.name || 'Free',
            status: user.subscriptions?.[0]?.status || 'active'
        }))

        return NextResponse.json({ users: formattedUsers })

    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal server error'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const isAdmin = checkAdminSession()
        if (!isAdmin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { userId, action, payload } = body

        if (!userId || !action) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        if (action === 'ban_status') {
            const { is_banned } = payload

            // Update Auth User (to revoke access immediately)
            const { error: authError } = await getSupabaseAdmin().auth.admin.updateUserById(
                userId,
                { ban_duration: is_banned ? '876000h' : 'none' } // 100 years or none
            )

            if (authError) throw authError

            // Update Profile (for UI display)
            const { error: dbError } = await (getSupabaseAdmin()
                .from('profiles') as any)
                .update({ is_banned })
                .eq('id', userId)

            if (dbError) throw dbError

            return NextResponse.json({ success: true, message: `User ${is_banned ? 'banned' : 'unbanned'} successfully` })
        }

        if (action === 'change_plan') {
            const { planId, status } = payload

            // Upsert subscription
            const { error } = await (getSupabaseAdmin()
                .from('subscriptions') as any)
                .upsert({
                    user_id: userId,
                    plan_id: planId,
                    status: status || 'active',
                    start_date: new Date().toISOString()
                }, { onConflict: 'user_id' }) // Assumes 1 active sub per user for now

            if (error) throw error
            return NextResponse.json({ success: true, message: 'Plan updated successfully' })
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })

    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal server error'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
