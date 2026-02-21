
'use client'

import { useState, useEffect, useCallback } from 'react'
import { ArrowLeft, RefreshCw, Trash2, Loader2, Clock, ExternalLink, AlertCircle, CheckCircle2, XCircle, Newspaper } from 'lucide-react'
import Link from 'next/link'

interface NewsArticle {
    id: number
    article_id: string
    title: string
    description: string
    content: string
    source_name: string
    source_url: string
    source_icon: string
    image_url: string
    link: string
    category: string[]
    published_at: string
    fetched_at: string
}

interface FetchLogEntry {
    id: number
    fetched_at: string
    articles_count: number
    status: string
    error_message: string | null
}

export default function NewsPage() {
    const [news, setNews] = useState<NewsArticle[]>([])
    const [fetchLog, setFetchLog] = useState<FetchLogEntry[]>([])
    const [needsFetch, setNeedsFetch] = useState(false)
    const [loading, setLoading] = useState(true)
    const [fetching, setFetching] = useState(false)
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState<'success' | 'error'>('success')

    const loadNews = useCallback(async () => {
        try {
            const res = await fetch('/api/admin/news')
            const data = await res.json()
            if (data.error) throw new Error(data.error)
            setNews(data.news || [])
            setFetchLog(data.fetchLog || [])
            setNeedsFetch(data.needsFetch || false)

            // Auto-fetch if due
            if (data.needsFetch && (data.news || []).length === 0) {
                handleFetchNews()
            }
        } catch (err: any) {
            showMessage('Error loading news: ' + err.message, 'error')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadNews()
    }, [loadNews])

    // Auto-fetch every 6 hours while page is open
    useEffect(() => {
        const interval = setInterval(() => {
            loadNews()
        }, 6 * 60 * 60 * 1000) // 6 hours
        return () => clearInterval(interval)
    }, [loadNews])

    const showMessage = (msg: string, type: 'success' | 'error') => {
        setMessage(msg)
        setMessageType(type)
        setTimeout(() => setMessage(''), 5000)
    }

    const handleFetchNews = async () => {
        setFetching(true)
        try {
            const res = await fetch('/api/admin/news', { method: 'POST' })
            const data = await res.json()
            if (data.error) throw new Error(data.error)
            showMessage(data.message || 'News fetched successfully!', 'success')
            await loadNews()
        } catch (err: any) {
            showMessage('Fetch failed: ' + err.message, 'error')
        } finally {
            setFetching(false)
        }
    }

    const handleClearNews = async () => {
        if (!confirm('Are you sure you want to delete all news articles?')) return
        try {
            const res = await fetch('/api/admin/news', { method: 'DELETE' })
            const data = await res.json()
            if (data.error) throw new Error(data.error)
            showMessage('All news cleared', 'success')
            setNews([])
        } catch (err: any) {
            showMessage('Clear failed: ' + err.message, 'error')
        }
    }

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const timeAgo = (dateStr: string) => {
        const diff = Date.now() - new Date(dateStr).getTime()
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor(diff / (1000 * 60))
        if (hours > 24) return `${Math.floor(hours / 24)}d ago`
        if (hours > 0) return `${hours}h ago`
        return `${minutes}m ago`
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
        )
    }

    return (
        <div className="flex-1 w-full flex flex-col p-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto w-full">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                        <Link href="/auth/anand/admin" className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-2">
                            <ArrowLeft className="w-4 h-4" /> Dashboard
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">GST News Manager</h1>
                        <p className="text-sm text-gray-500">Auto-fetches latest 10 GST news every 6 hours from NewsData.io</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleFetchNews}
                            disabled={fetching}
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-purple-700 disabled:opacity-50 transition-all shadow-lg shadow-purple-200"
                        >
                            <RefreshCw className={`w-4 h-4 ${fetching ? 'animate-spin' : ''}`} />
                            {fetching ? 'Fetching...' : 'Fetch Now'}
                        </button>
                        <button
                            onClick={handleClearNews}
                            className="px-4 py-2 border border-red-200 text-red-600 rounded-lg font-medium flex items-center gap-2 hover:bg-red-50 transition-all"
                        >
                            <Trash2 className="w-4 h-4" />
                            Clear All
                        </button>
                    </div>
                </div>

                {/* Status Message */}
                {message && (
                    <div className={`p-4 rounded-lg mb-6 flex justify-between items-center text-sm font-medium ${messageType === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                        <span>{message}</span>
                        <button onClick={() => setMessage('')} className="font-bold text-lg">&times;</button>
                    </div>
                )}

                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg border p-4 text-center">
                        <p className="text-2xl font-bold text-gray-900">{news.length}</p>
                        <p className="text-xs text-gray-500 uppercase font-medium">Articles</p>
                    </div>
                    <div className="bg-white rounded-lg border p-4 text-center">
                        <p className="text-2xl font-bold text-gray-900">
                            {fetchLog.length > 0 ? timeAgo(fetchLog[0].fetched_at) : 'Never'}
                        </p>
                        <p className="text-xs text-gray-500 uppercase font-medium">Last Fetch</p>
                    </div>
                    <div className="bg-white rounded-lg border p-4 text-center">
                        <p className="text-2xl font-bold text-gray-900">6h</p>
                        <p className="text-xs text-gray-500 uppercase font-medium">Fetch Interval</p>
                    </div>
                    <div className="bg-white rounded-lg border p-4 text-center">
                        <p className={`text-2xl font-bold ${needsFetch ? 'text-amber-600' : 'text-green-600'}`}>
                            {needsFetch ? 'Due' : 'OK'}
                        </p>
                        <p className="text-xs text-gray-500 uppercase font-medium">Auto-Fetch Status</p>
                    </div>
                </div>

                {/* News Articles */}
                <div className="space-y-4 mb-8">
                    {news.length === 0 ? (
                        <div className="bg-white rounded-lg border p-12 text-center">
                            <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 font-medium">No news articles yet</p>
                            <p className="text-gray-400 text-sm mt-1">Click "Fetch Now" to get latest GST news</p>
                        </div>
                    ) : (
                        news.map(article => (
                            <div key={article.id} className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                                <div className="flex flex-col md:flex-row">
                                    {/* Image */}
                                    {article.image_url && (
                                        <div className="md:w-48 h-32 md:h-auto flex-shrink-0">
                                            <img
                                                src={article.image_url}
                                                alt={article.title}
                                                className="w-full h-full object-cover"
                                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                                            />
                                        </div>
                                    )}
                                    {/* Content */}
                                    <div className="p-4 flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <h3 className="font-bold text-gray-900 text-base leading-snug mb-1 line-clamp-2">
                                                    {article.title}
                                                </h3>
                                                <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                                                    {article.description}
                                                </p>
                                            </div>
                                            {article.link && (
                                                <a
                                                    href={article.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-shrink-0 p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-gray-400">
                                            {article.source_name && (
                                                <span className="flex items-center gap-1">
                                                    {article.source_icon && (
                                                        <img src={article.source_icon} alt="" className="w-4 h-4 rounded" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                                                    )}
                                                    <span className="font-medium text-gray-600">{article.source_name}</span>
                                                </span>
                                            )}
                                            {article.published_at && (
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {formatDate(article.published_at)}
                                                </span>
                                            )}
                                            {article.category?.length > 0 && (
                                                <span className="px-2 py-0.5 bg-gray-100 rounded text-[10px] uppercase font-medium">
                                                    {article.category[0]}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Fetch History */}
                {fetchLog.length > 0 && (
                    <div className="bg-white rounded-lg border shadow-sm p-6">
                        <h2 className="text-sm font-bold text-gray-500 uppercase mb-4">Fetch History</h2>
                        <div className="space-y-2">
                            {fetchLog.map(log => (
                                <div key={log.id} className="flex items-center justify-between text-sm py-2 border-b border-gray-50 last:border-0">
                                    <div className="flex items-center gap-2">
                                        {log.status === 'success' ? (
                                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                                        ) : (
                                            <XCircle className="w-4 h-4 text-red-500" />
                                        )}
                                        <span className="text-gray-700 font-medium">{formatDate(log.fetched_at)}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-500">{log.articles_count} articles</span>
                                        {log.error_message && (
                                            <span className="text-red-500 text-xs truncate max-w-xs" title={log.error_message}>
                                                {log.error_message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
