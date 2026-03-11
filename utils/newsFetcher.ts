import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const NEWS_API_URL = 'https://newsdata.io/api/1/latest'
export const FETCH_INTERVAL_HOURS = 6
export const MAX_ARTICLES = 10

const GST_KEYWORDS = [
    'gst', 'goods and services tax', 'gstr', 'gstin',
    'gst council', 'gst rate', 'gst return', 'gst filing',
    'input tax credit', 'itc', 'e-invoice', 'e-way bill',
    'eway bill', 'gst collection', 'gst revenue', 'gst portal',
    'gst notification', 'gst compliance', 'gst registration',
    'cgst', 'sgst', 'igst', 'gst slab'
]

export function isGSTRelated(article: any): boolean {
    const text = `${article.title || ''} ${article.description || ''}`.toLowerCase()
    return GST_KEYWORDS.some(keyword => text.includes(keyword))
}

export async function shouldFetch(): Promise<boolean> {
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

export async function fetchNewsFromAPI(): Promise<any[]> {
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
    return results.filter(isGSTRelated)
}

export async function fetchAndStoreNews() {
    try {
        const articles = await fetchNewsFromAPI()

        if (articles.length === 0) {
            await supabase.from('news_fetch_log').insert({
                articles_count: 0,
                status: 'success',
                error_message: 'No articles returned',
            })
            return { success: true, message: 'No new articles found', count: 0 }
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

        return { success: true, message: `Fetched ${rows.length} articles`, count: rows.length }
    } catch (error: any) {
        try {
            await supabase.from('news_fetch_log').insert({
                articles_count: 0,
                status: 'error',
                error_message: error.message,
            })
        } catch { }
        throw error
    }
}
