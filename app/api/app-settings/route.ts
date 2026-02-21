
import { createClient } from '@/utils/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

// GET: Publicly accessible for the App to fetch settings
export async function GET() {
    const supabase = createClient()

    // We can use the admin client or just rely on the public read policy we created
    const { data, error } = await supabase
        .from('app_settings')
        .select('*')
        .single()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
}

// PUT: Protected, Admin only to update settings
export async function PUT(request: NextRequest) {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // Validate body if necessary (e.g., ensure required fields are present)
    // For now, we trust the admin UI to send correct data structure matching schema

    const { data, error } = await supabase
        .from('app_settings')
        .update(body)
        .eq('id', 1) // Always update the singleton row
        .select()
        .single()

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
}
