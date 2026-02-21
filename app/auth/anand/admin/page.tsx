
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Settings, Users, CreditCard, Database, LogOut, Loader2, Newspaper, Search } from 'lucide-react'

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isLoggingIn, setIsLoggingIn] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    // Check auth status via API (HttpOnly cookies can't be read by JS)
    useEffect(() => {
        fetch('/api/auth/admin')
            .then(res => res.json())
            .then(data => {
                setIsAuthenticated(data.authenticated === true)
                setIsLoading(false)
            })
            .catch(() => {
                setIsAuthenticated(false)
                setIsLoading(false)
            })
    }, [])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoggingIn(true)
        setError('')

        try {
            const res = await fetch('/api/auth/admin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.error || 'Login failed')
                setIsLoggingIn(false)
                return
            }

            setIsAuthenticated(true)
            setEmail('')
            setPassword('')
        } catch (err) {
            setError('Something went wrong. Please try again.')
        } finally {
            setIsLoggingIn(false)
        }
    }

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/admin', { method: 'DELETE' })
            setIsAuthenticated(false)
        } catch (err) {
            console.error('Logout failed', err)
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
        )
    }

    // ──── LOGIN FORM ────
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Settings className="w-8 h-8 text-purple-600" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">GST Baba Admin</h1>
                            <p className="text-gray-500 text-sm mt-1">Sign in to access the dashboard</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@example.com"
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                                />
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoggingIn}
                                className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 disabled:opacity-50 transition-all shadow-lg shadow-purple-200 active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                {isLoggingIn ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    // ──── ADMIN DASHBOARD ────
    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center p-4 bg-gray-50 min-h-screen">
            <div className="animate-in flex-1 flex flex-col gap-8 max-w-5xl px-3 text-center w-full">
                <main className="flex-1 flex flex-col gap-6">
                    <div className="mb-8 flex justify-between items-center">
                        <div className="text-left">
                            <h2 className="font-bold text-4xl mb-2 text-gray-900">Admin Dashboard</h2>
                            <p className="text-gray-600">Welcome, Admin</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-sm font-medium flex items-center gap-2"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">

                        <Link href="/auth/anand/admin/settings" className="group block p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all hover:bg-gray-50">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 text-orange-600 group-hover:scale-110 transition-transform">
                                <Search className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-orange-700">GST Rate Finder</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">Manage GST items, HSN codes, and tax rates for the app.</p>
                        </Link>

                        <Link href="/auth/anand/admin/users" className="group block p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all hover:bg-gray-50">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-700">User Management</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">View all users, ban abusers, and manage subscriptions.</p>
                        </Link>

                        <Link href="/auth/anand/admin/plans" className="group block p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all hover:bg-gray-50">
                            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 text-amber-600 group-hover:scale-110 transition-transform">
                                <CreditCard className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-amber-700">Plans & Billing</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">Create plans, coupons, and control feature access.</p>
                        </Link>

                        <Link href="/auth/anand/admin/news" className="group block p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all hover:bg-gray-50">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 text-green-600 group-hover:scale-110 transition-transform">
                                <Newspaper className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-green-700">GST News</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">Auto-fetch latest GST news every 6 hours from NewsData.io.</p>
                        </Link>

                    </div>
                </main>
            </div>
        </div>
    )
}
