
'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Edit2, Save, X, ArrowLeft, Check, Lock, Unlock, Crown, Users, Calendar, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface Plan {
    id: number
    name: string
    price: number
    interval: string
    features: string[]
    limits: any
    is_active: boolean
}

interface Subscription {
    id: number
    user_id: string
    plan_id: number
    status: string
    start_date: string
    end_date: string | null
    profiles: {
        id: string
        email: string
        full_name: string
        phone: string
    }
    plans: {
        name: string
    }
}

// Available features for toggling
const FEATURE_KEYS = [
    { key: 'calculator', label: 'GST Calculator' },
    { key: 'invoice', label: 'Invoice Generator' },
    { key: 'reminders', label: 'Return Reminders' },
    { key: 'itc_reconciliation', label: 'ITC Reconciliation' },
    { key: 'news', label: 'GST News & Updates' },
]

export default function PlansPage() {
    const [plans, setPlans] = useState<Plan[]>([])
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
    const [loading, setLoading] = useState(true)
    const [editingPlan, setEditingPlan] = useState<Plan | null>(null)
    const [isCreating, setIsCreating] = useState(false)
    const [activeView, setActiveView] = useState<'plans' | 'subscribers'>('plans')

    // Form State
    const [formData, setFormData] = useState<Partial<Plan>>({
        name: '',
        price: 0,
        interval: 'month',
        features: [],
        limits: {}
    })

    useEffect(() => {
        fetchPlans()
    }, [])

    const fetchPlans = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/admin/plans')
            const data = await res.json()
            if (data.plans) setPlans(data.plans)
            if (data.subscriptions) setSubscriptions(data.subscriptions)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (plan: Plan) => {
        setEditingPlan(plan)
        setFormData(plan)
        setIsCreating(false)
    }

    const handleCreate = () => {
        setEditingPlan(null)
        setFormData({
            name: 'New Plan',
            price: 99,
            interval: 'month',
            features: ['calculator'],
            limits: { invoices: 10 }
        })
        setIsCreating(true)
    }

    const handleSave = async () => {
        const endpoint = '/api/admin/plans'
        const method = isCreating ? 'POST' : 'PUT'

        try {
            const res = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (data.success) {
                fetchPlans()
                setEditingPlan(null)
                setIsCreating(false)
            } else {
                alert(data.error)
            }
        } catch (err) {
            alert('Save failed')
        }
    }

    const toggleFeature = (key: string) => {
        const currentFeatures = formData.features || []
        const newFeatures = currentFeatures.includes(key)
            ? currentFeatures.filter(f => f !== key)
            : [...currentFeatures, key]

        setFormData({ ...formData, features: newFeatures })
    }

    // Get subscribers for a specific plan
    const getSubscribersForPlan = (planId: number) => {
        return subscriptions.filter(s => s.plan_id === planId)
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-700 border-green-200'
            case 'trialing': return 'bg-blue-100 text-blue-700 border-blue-200'
            case 'canceled': return 'bg-red-100 text-red-700 border-red-200'
            case 'expired': return 'bg-gray-100 text-gray-700 border-gray-200'
            case 'past_due': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
            default: return 'bg-gray-100 text-gray-600 border-gray-200'
        }
    }

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
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
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <Link href="/auth/anand/admin" className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-2">
                            <ArrowLeft className="w-4 h-4" /> Dashboard
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">Plans & Subscriptions</h1>
                        <p className="text-sm text-gray-500">Configure plans and view subscriber details.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* View Toggle */}
                        <div className="flex bg-white border rounded-lg overflow-hidden">
                            <button
                                onClick={() => setActiveView('plans')}
                                className={`px-4 py-2 text-sm font-medium transition-colors ${activeView === 'plans' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                Plans
                            </button>
                            <button
                                onClick={() => setActiveView('subscribers')}
                                className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1.5 ${activeView === 'subscribers' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <Users className="w-3.5 h-3.5" />
                                Subscribers ({subscriptions.length})
                            </button>
                        </div>
                        {activeView === 'plans' && (
                            <button
                                onClick={handleCreate}
                                className="bg-black text-white px-4 py-2 rounded-md font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors"
                            >
                                <Plus className="w-4 h-4" /> Create Plan
                            </button>
                        )}
                    </div>
                </div>

                {/* ──── PLANS VIEW ──── */}
                {activeView === 'plans' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {plans.map(plan => {
                            const planSubs = getSubscribersForPlan(plan.id)
                            const activeSubs = planSubs.filter(s => s.status === 'active')
                            return (
                                <div key={plan.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow relative">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                                            <div className="text-2xl font-bold text-purple-600 mt-1">₹{plan.price}<span className="text-xs text-gray-400 font-normal">/{plan.interval}</span></div>
                                        </div>
                                        <button onClick={() => handleEdit(plan)} className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Subscriber Count Badge */}
                                    <div className="flex items-center gap-2 mb-4 p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                                        <Users className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm font-medium text-gray-700">{activeSubs.length} active</span>
                                        {planSubs.length !== activeSubs.length && (
                                            <span className="text-xs text-gray-400">/ {planSubs.length} total</span>
                                        )}
                                    </div>

                                    <div className="space-y-2 border-t pt-4">
                                        <p className="text-xs font-bold text-gray-500 uppercase mb-2">Enabled Features</p>
                                        {FEATURE_KEYS.map(f => (
                                            <div key={f.key} className="flex items-center gap-2 text-sm">
                                                {plan.features?.includes(f.key) ? (
                                                    <Check className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <Lock className="w-3 h-3 text-gray-300" />
                                                )}
                                                <span className={plan.features?.includes(f.key) ? 'text-gray-700 font-medium' : 'text-gray-400'}>{f.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Quick subscriber list */}
                                    {planSubs.length > 0 && (
                                        <div className="mt-4 border-t pt-4">
                                            <p className="text-xs font-bold text-gray-500 uppercase mb-2">Recent Subscribers</p>
                                            <div className="space-y-2 max-h-32 overflow-y-auto">
                                                {planSubs.slice(0, 5).map(sub => (
                                                    <div key={sub.id} className="flex items-center justify-between text-xs">
                                                        <div className="flex items-center gap-2 min-w-0">
                                                            <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                                                                {(sub.profiles?.full_name || sub.profiles?.email || '?').charAt(0).toUpperCase()}
                                                            </div>
                                                            <span className="text-gray-700 truncate">{sub.profiles?.full_name || sub.profiles?.email || 'Unknown'}</span>
                                                        </div>
                                                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${getStatusColor(sub.status)}`}>
                                                            {sub.status}
                                                        </span>
                                                    </div>
                                                ))}
                                                {planSubs.length > 5 && (
                                                    <p className="text-xs text-gray-400 text-center pt-1">+{planSubs.length - 5} more</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* ──── SUBSCRIBERS VIEW ──── */}
                {activeView === 'subscribers' && (
                    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 border-b text-gray-500 uppercase text-xs">
                                    <tr>
                                        <th className="px-6 py-3 font-semibold">User</th>
                                        <th className="px-6 py-3 font-semibold">Plan</th>
                                        <th className="px-6 py-3 font-semibold">Status</th>
                                        <th className="px-6 py-3 font-semibold">Start Date</th>
                                        <th className="px-6 py-3 font-semibold">End Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {subscriptions.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="p-8 text-center text-gray-500">No subscriptions found.</td>
                                        </tr>
                                    ) : (
                                        subscriptions.map(sub => (
                                            <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">
                                                            {(sub.profiles?.full_name || sub.profiles?.email || '?').charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-gray-900">{sub.profiles?.full_name || 'N/A'}</div>
                                                            <div className="text-xs text-gray-500">{sub.profiles?.email || 'N/A'}</div>
                                                            {sub.profiles?.phone && <div className="text-xs text-gray-400">{sub.profiles.phone}</div>}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                                                        {sub.plans?.name?.includes('Pro') && <Crown className="w-3 h-3" />}
                                                        {sub.plans?.name || 'Unknown'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(sub.status)}`}>
                                                        {sub.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                                        {formatDate(sub.start_date)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">
                                                    {sub.end_date ? formatDate(sub.end_date) : <span className="text-gray-400 italic">Lifetime / Auto-renew</span>}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ──── EDIT/CREATE MODAL ──── */}
                {(editingPlan || isCreating) && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-in fade-in">
                        <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">{isCreating ? 'Create Plan' : 'Edit Plan'}</h2>
                                <button onClick={() => { setEditingPlan(null); setIsCreating(false) }} className="p-1 hover:bg-gray-100 rounded-full">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Plan Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full p-2 border rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Price (₹)</label>
                                        <input
                                            type="number"
                                            value={formData.price}
                                            onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                                            className="w-full p-2 border rounded-md"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Interval</label>
                                    <select
                                        value={formData.interval}
                                        onChange={e => setFormData({ ...formData, interval: e.target.value })}
                                        className="w-full p-2 border rounded-md"
                                    >
                                        <option value="month">Monthly</option>
                                        <option value="year">Yearly</option>
                                        <option value="lifetime">Lifetime</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-3">Feature Access Control</label>
                                    <div className="grid grid-cols-1 gap-2 bg-gray-50 p-4 rounded-lg border">
                                        {FEATURE_KEYS.map(f => {
                                            const isEnabled = formData.features?.includes(f.key)
                                            return (
                                                <button
                                                    key={f.key}
                                                    type="button"
                                                    onClick={() => toggleFeature(f.key)}
                                                    className={`flex justify-between items-center p-2 rounded-md border transition-all ${isEnabled ? 'bg-white border-green-200 shadow-sm' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {isEnabled ? <Unlock className="w-4 h-4 text-green-600" /> : <Lock className="w-4 h-4 text-gray-400" />}
                                                        <span className={`text-sm ${isEnabled ? 'font-bold text-gray-900' : 'text-gray-500'}`}>{f.label}</span>
                                                    </div>
                                                    <div className={`w-8 h-4 rounded-full relative transition-colors ${isEnabled ? 'bg-green-500' : 'bg-gray-300'}`}>
                                                        <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all`} style={{ left: isEnabled ? 'calc(100% - 14px)' : '2px' }} />
                                                    </div>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end gap-2 border-t mt-6">
                                    <button onClick={() => { setEditingPlan(null); setIsCreating(false) }} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md font-medium">Cancel</button>
                                    <button onClick={handleSave} className="bg-purple-600 text-white px-6 py-2 rounded-md font-bold hover:bg-purple-700 shadow-lg shadow-purple-200">
                                        {isCreating ? 'Create Plan' : 'Save Changes'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
