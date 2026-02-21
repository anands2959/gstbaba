
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { checkAdminSession } from '@/utils/adminAuth'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const NEWS_API_URL = 'https://newsdata.io/api/1/latest'
const FETCH_INTERVAL_HOURS = 6
const MAX_ARTICLES = 10

// GST-specific keywords for server-side relevance filtering
const GST_KEYWORDS = [
    'gst', 'goods and services tax', 'gstr', 'gstin',
    'gst council', 'gst rate', 'gst return', 'gst filing',
    'input tax credit', 'itc', 'e-invoice', 'e-way bill',
    'eway bill', 'gst collection', 'gst revenue', 'gst portal',
    'gst notification', 'gst compliance', 'gst registration',
    'cgst', 'sgst', 'igst', 'gst slab'
]

function isGSTRelated(article: any): boolean {
    const text = `${article.title || ''} ${article.description || ''}`.toLowerCase()
    return GST_KEYWORDS.some(keyword => text.includes(keyword))
}

// Check if we should fetch (last fetch was > 6 hours ago)
async function shouldFetch(): Promise<boolean> {
    const { data } = await supabase
        .from('news_fetch_log')
        .select('fetched_at')
        .order('fetched_at', { ascending: false })
        .limit(1)
        .single()

    if (!data) return true

    const lastFetch = new Date(data.fetched_at).getTime()
    const hoursSince = (Date.now() - lastFetch) / (1000 * 60 * 60)
    return hoursSince >= FETCH_INTERVAL_HOURS
}

// Fetch news from NewsData.io API
async function fetchNewsFromAPI(): Promise<any[]> {
    const apiKey = (process.env.NEWS_API_KEY || '').trim()
    if (!apiKey) throw new Error('NEWS_API_KEY not configured')

    const params = new URLSearchParams({
        apikey: apiKey,
        qInTitle: 'GST',
        country: 'in',
        language: 'en',
        size: MAX_ARTICLES.toString(),
    })

    const res = await fetch(`${NEWS_API_URL}?${params.toString()}`)
    const data = await res.json()

    if (data.status !== 'success') {
        throw new Error(data.results?.message || data.message || 'API request failed')
    }

    const results = data.results || []
    // Filter to keep only articles that are truly GST-related
    return results.filter(isGSTRelated)
}

// GET: Return stored news + fetch status
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
        const articles = await fetchNewsFromAPI()

        if (articles.length === 0) {
            await supabase.from('news_fetch_log').insert({
                articles_count: 0,
                status: 'success',
                error_message: 'No articles returned',
            })
            return NextResponse.json({ success: true, message: 'No new articles found', count: 0 })
        }

        // Delete old news first
        await supabase.from('gst_news').delete().neq('id', 0)

        // Insert new articles
        const rows = articles.map((a: any) => ({
            article_id: a.article_id,
            title: a.title,
            description: a.description,
            content: (a.content || '').replace(/ONLY AVAILABLE IN PAID PLANS?/gi, '').trim() || null,
            source_name: a.source_name,
            source_url: a.source_url,
            source_icon: a.source_icon,
            image_url: a.image_url,
            link: a.link,
            category: a.category || [],
            language: a.language || 'en',
            country: a.country || [],
            published_at: a.pubDate,
        }))

        const { error: insertError } = await supabase
            .from('gst_news')
            .upsert(rows, { onConflict: 'article_id' })

        if (insertError) throw insertError

        // Log the fetch
        await supabase.from('news_fetch_log').insert({
            articles_count: rows.length,
            status: 'success',
        })

        return NextResponse.json({
            success: true,
            message: `Fetched ${rows.length} articles`,
            count: rows.length,
        })
    } catch (error: any) {
        try {
            await supabase.from('news_fetch_log').insert({
                articles_count: 0,
                status: 'error',
                error_message: error.message,
            })
        } catch { }

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
