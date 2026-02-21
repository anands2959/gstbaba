
'use client'

import { useState, useEffect } from 'react'
import { Search, Loader2, MoreVertical, ShieldAlert, Crown, UserCheck, AlertCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface User {
    id: string
    email: string
    name: string
    gstin: string
    phone: string
    role: string
    is_banned: boolean
    plan: string
    status: string
    joined_at: string
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('all') // all, active, banned, pro
    const [actionLoading, setActionLoading] = useState<string | null>(null)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const res = await fetch(`/api/admin/users?query=${search}`)
            const data = await res.json()
            if (data.users) setUsers(data.users)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        fetchUsers()
    }

    const handleAction = async (userId: string, action: string, payload: any) => {
        if (!confirm('Are you sure you want to perform this action?')) return

        setActionLoading(userId)
        try {
            const res = await fetch('/api/admin/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, action, payload })
            })
            const data = await res.json()
            if (data.success) {
                fetchUsers() // Refresh list
            } else {
                alert(data.error)
            }
        } catch (err) {
            alert('Action failed')
        } finally {
            setActionLoading(null)
        }
    }

    const filteredUsers = users.filter(user => {
        if (filter === 'active') return !user.is_banned
        if (filter === 'banned') return user.is_banned
        if (filter === 'pro') return user.plan.toLowerCase().includes('pro')
        return true
    })

    return (
        <div className="flex-1 w-full flex flex-col p-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto w-full">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <Link href="/auth/anand/admin" className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-2">
                            <ArrowLeft className="w-4 h-4" /> Dashboard
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                        <p className="text-sm text-gray-500">View, search, and manage user access.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-3 py-1 bg-white border rounded-full">Total: {users.length}</span>
                        <span className="text-xs font-bold px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full">Active: {users.filter(u => !u.is_banned).length}</span>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="bg-white p-4 rounded-lg shadow-sm border mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <form onSubmit={handleSearch} className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or phone..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-md text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                    </form>

                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
                        {['all', 'active', 'banned', 'pro'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 text-xs font-bold uppercase rounded-md transition-colors ${filter === f ? 'bg-purple-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b text-gray-500 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-3 font-semibold">User Details</th>
                                    <th className="px-6 py-3 font-semibold">Plan & Status</th>
                                    <th className="px-6 py-3 font-semibold">GSTIN</th>
                                    <th className="px-6 py-3 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr><td colSpan={4} className="p-8 text-center text-gray-500"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />Loading users...</td></tr>
                                ) : filteredUsers.length === 0 ? (
                                    <tr><td colSpan={4} className="p-8 text-center text-gray-500">No users found.</td></tr>
                                ) : (
                                    filteredUsers.map(user => (
                                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs ${user.is_banned ? 'bg-red-500' : 'bg-purple-600'}`}>
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-900 flex items-center gap-2">
                                                            {user.name}
                                                            {user.is_banned && <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-[10px] rounded uppercase">Banned</span>}
                                                        </div>
                                                        <div className="text-gray-500 text-xs">{user.email}</div>
                                                        <div className="text-gray-400 text-xs">{user.phone}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${user.plan.includes('Pro') ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'}`}>
                                                    {user.plan.includes('Pro') && <Crown className="w-3 h-3" />}
                                                    {user.plan}
                                                </span>
                                                <div className="text-xs text-gray-400 mt-1 capitalize">{user.status}</div>
                                            </td>
                                            <td className="px-6 py-4 font-mono text-gray-600">
                                                {user.gstin}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    {user.is_banned ? (
                                                        <button
                                                            onClick={() => handleAction(user.id, 'ban_status', { is_banned: false })}
                                                            disabled={actionLoading === user.id}
                                                            className="p-2 text-green-600 hover:bg-green-50 rounded-md"
                                                            title="Unban User"
                                                        >
                                                            <UserCheck className="w-4 h-4" />
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleAction(user.id, 'ban_status', { is_banned: true })}
                                                            disabled={actionLoading === user.id}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                                                            title="Ban User"
                                                        >
                                                            <ShieldAlert className="w-4 h-4" />
                                                        </button>
                                                    )}

                                                    {/* Manual Plan Upgrade (Demo) */}
                                                    <button
                                                        onClick={() => handleAction(user.id, 'change_plan', { planId: 2, status: 'active' })} // ID 2 = Pro Monthly
                                                        disabled={actionLoading === user.id}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                                                        title="Upgrade to Pro (Manual)"
                                                    >
                                                        <Crown className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
