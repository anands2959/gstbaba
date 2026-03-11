import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { checkAdminSession } from '@/utils/adminAuth'
import { shouldFetch, fetchAndStoreNews, MAX_ARTICLES } from '@/utils/newsFetcher'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
    try {
        const { data: news, error: newsError } = await supabase
            .from('gst_news')
            .select('*')
            .order('published_at', { ascending: false })
            .limit(MAX_ARTICLES)

        if (newsError) throw newsError

        const { data: fetchLog } = await supabase
            .from('news_fetch_log')
            .select('*')
            .order('fetched_at', { ascending: false })
            .limit(5)

        const needsFetch = await shouldFetch()

        return NextResponse.json({
            news: news || [],
            fetchLog: fetchLog || [],
            needsFetch,
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

// POST: Trigger news fetch (manual or auto)
export async function POST() {
    try {
        if (!checkAdminSession()) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        
        const result = await fetchAndStoreNews()
        return NextResponse.json(result)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

// DELETE: Clear all news
export async function DELETE() {
    try {
        if (!checkAdminSession()) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        await supabase.from('gst_news').delete().neq('id', 0)
        return NextResponse.json({ success: true, message: 'All news cleared' })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
