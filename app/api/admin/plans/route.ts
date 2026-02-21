
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { checkAdminSession } from '@/utils/adminAuth'

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: Request) {
    try {
        if (!checkAdminSession()) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        // Fetch plans
        const { data: plans, error: plansError } = await supabaseAdmin
            .from('plans')
            .select('*')
            .order('price', { ascending: true })

        if (plansError) throw plansError

        // Fetch all subscriptions with user profile and plan info
        const { data: subscriptions, error: subsError } = await supabaseAdmin
            .from('subscriptions')
            .select(`
                *,
                profiles:user_id (
                    id,
                    email,
                    full_name,
                    phone
                ),
                plans:plan_id (
                    name
                )
            `)
            .order('created_at', { ascending: false })

        if (subsError) throw subsError

        return NextResponse.json({ plans, subscriptions: subscriptions || [] })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        if (!checkAdminSession()) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        const body = await request.json()
        const { name, price, interval, features, limits } = body

        const { data, error } = await supabaseAdmin
            .from('plans')
            .insert({ name, price, interval, features, limits })
            .select()
            .single()

        if (error) throw error
        return NextResponse.json({ success: true, plan: data })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        if (!checkAdminSession()) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        const body = await request.json()
        const { id, ...updates } = body

        if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 })

        const { data, error } = await supabaseAdmin
            .from('plans')
            .update(updates)
            .eq('id', id)
            .select()

        if (error) throw error
        return NextResponse.json({ success: true, plan: data })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
