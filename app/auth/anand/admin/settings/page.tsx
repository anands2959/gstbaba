
'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Save, Plus, Trash2, Pencil, Search, X, Loader2, Package, Hash } from 'lucide-react'
import Link from 'next/link'

interface GSTItem {
    id: number
    name: string
    category: string
    hsn: string
    gstRate: number
    cgst: number
    sgst: number
    igst: number
    description: string
}

const CATEGORIES = [
    'Electronics', 'Clothing', 'Food', 'Study', 'Services',
    'Build', 'Health', 'Medical', 'Decor', 'Auto', 'Beauty', 'Sports', 'Other'
]

export default function GSTRateFinderPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState('')
    const [items, setItems] = useState<GSTItem[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [searchMode, setSearchMode] = useState<'name' | 'hsn'>('name')
    const [filterCategory, setFilterCategory] = useState('')

    // Modal state
    const [showModal, setShowModal] = useState(false)
    const [editingItem, setEditingItem] = useState<GSTItem | null>(null)
    const [form, setForm] = useState<GSTItem>({
        id: 0, name: '', category: 'Electronics', hsn: '', gstRate: 18,
        cgst: 9, sgst: 9, igst: 18, description: ''
    })

    // Full settings payload (we only edit gst_rules, but preserve everything else for PUT)
    const [fullSettings, setFullSettings] = useState<any>(null)

    useEffect(() => { fetchSettings() }, [])

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/app-settings')
            const data = await res.json()
            if (data.error) { setMessage('Error: ' + data.error); setLoading(false); return }
            setFullSettings(data)
            setItems(data.gst_rules || [])
        } catch (err: any) {
            setMessage('Error: ' + err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        setSaving(true)
        setMessage('')
        try {
            const payload = { ...fullSettings, gst_rules: items }
            const res = await fetch('/api/app-settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            const data = await res.json()
            if (data.error) throw new Error(data.error)
            setFullSettings(data)
            setMessage('Saved successfully!')
            setTimeout(() => setMessage(''), 3000)
        } catch (err: any) {
            setMessage('Error saving: ' + err.message)
        } finally {
            setSaving(false)
        }
    }

    // Auto-calc CGST/SGST/IGST when GST rate changes
    const updateGSTRate = (rate: number) => {
        setForm(prev => ({
            ...prev,
            gstRate: rate,
            cgst: rate / 2,
            sgst: rate / 2,
            igst: rate
        }))
    }

    const openAddModal = () => {
        setEditingItem(null)
        setForm({
            id: Date.now(), name: '', category: 'Electronics', hsn: '', gstRate: 18,
            cgst: 9, sgst: 9, igst: 18, description: ''
        })
        setShowModal(true)
    }

    const openEditModal = (item: GSTItem) => {
        setEditingItem(item)
        setForm({ ...item })
        setShowModal(true)
    }

    const handleSubmitItem = () => {
        if (!form.name.trim() || !form.hsn.trim()) {
            setMessage('Name and HSN Code are required')
            setTimeout(() => setMessage(''), 3000)
            return
        }

        if (editingItem) {
            setItems(prev => prev.map(i => i.id === editingItem.id ? { ...form } : i))
        } else {
            setItems(prev => [{ ...form, id: Date.now() }, ...prev])
        }
        setShowModal(false)
    }

    const handleDeleteItem = (id: number) => {
        if (!confirm('Delete this item?')) return
        setItems(prev => prev.filter(i => i.id !== id))
    }

    // Filtering
    const filteredItems = items.filter(item => {
        const matchesSearch = searchQuery
            ? searchMode === 'name'
                ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
                : item.hsn.startsWith(searchQuery)
            : true
        const matchesCategory = filterCategory ? item.category === filterCategory : true
        return matchesSearch && matchesCategory
    })

    // Unique categories from data
    const usedCategories = Array.from(new Set(items.map(i => i.category))).sort()

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        </div>
    )

    return (
        <div className="flex-1 w-full flex flex-col items-center p-4 md:p-6 bg-gray-50 min-h-screen">
            <div className="w-full max-w-7xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                        <Link href="/auth/anand/admin" className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-2">
                            <ArrowLeft className="w-4 h-4" /> Dashboard
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">GST Rate Finder</h1>
                        <p className="text-sm text-gray-500">Manage GST items, HSN codes, and tax rates for the app.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold px-3 py-1.5 bg-white border rounded-full text-gray-600">
                            {items.length} items
                        </span>
                        <button
                            onClick={openAddModal}
                            className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-sm"
                        >
                            <Plus className="w-4 h-4" /> Add Item
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-purple-600 disabled:opacity-50 transition-colors shadow-md"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            {saving ? 'Saving...' : 'Save All'}
                        </button>
                    </div>
                </div>

                {/* Message */}
                {message && (
                    <div className={`p-3 rounded-lg mb-4 flex justify-between items-center text-sm font-medium ${message.includes('Error') || message.includes('required') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                        <span>{message}</span>
                        <button onClick={() => setMessage('')} className="font-bold text-lg leading-none">&times;</button>
                    </div>
                )}

                {/* Toolbar */}
                <div className="bg-white p-4 rounded-xl shadow-sm border mb-4 flex flex-col md:flex-row gap-3 items-center">
                    {/* Search */}
                    <div className="flex items-center gap-2 flex-1 w-full">
                        <div className="flex bg-gray-100 rounded-lg p-0.5">
                            <button
                                onClick={() => { setSearchMode('name'); setSearchQuery('') }}
                                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${searchMode === 'name' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
                            >
                                <Package className="w-3 h-3 inline mr-1" />Name
                            </button>
                            <button
                                onClick={() => { setSearchMode('hsn'); setSearchQuery('') }}
                                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${searchMode === 'hsn' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
                            >
                                <Hash className="w-3 h-3 inline mr-1" />HSN
                            </button>
                        </div>
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type={searchMode === 'hsn' ? 'tel' : 'text'}
                                placeholder={searchMode === 'name' ? 'Search by item name...' : 'Search by HSN code...'}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <X className="w-4 h-4 text-gray-400" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Category Filter */}
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="border rounded-lg px-3 py-2 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-purple-500 outline-none bg-white min-w-[150px]"
                    >
                        <option value="">All Categories</option>
                        {usedCategories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b text-gray-500 uppercase text-xs">
                                <tr>
                                    <th className="px-4 py-3 font-semibold w-12">#</th>
                                    <th className="px-4 py-3 font-semibold">Item Name</th>
                                    <th className="px-4 py-3 font-semibold">HSN Code</th>
                                    <th className="px-4 py-3 font-semibold">Category</th>
                                    <th className="px-4 py-3 font-semibold text-center">GST %</th>
                                    <th className="px-4 py-3 font-semibold text-center">CGST</th>
                                    <th className="px-4 py-3 font-semibold text-center">SGST</th>
                                    <th className="px-4 py-3 font-semibold text-center">IGST</th>
                                    <th className="px-4 py-3 font-semibold">Description</th>
                                    <th className="px-4 py-3 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredItems.length === 0 ? (
                                    <tr>
                                        <td colSpan={10} className="p-12 text-center text-gray-400 text-sm">
                                            {searchQuery || filterCategory
                                                ? 'No items match your search.'
                                                : 'No items yet. Click "Add Item" to get started.'}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredItems.map((item, idx) => (
                                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-4 py-3 text-gray-400 font-mono text-xs">{idx + 1}</td>
                                            <td className="px-4 py-3 font-semibold text-gray-900">{item.name}</td>
                                            <td className="px-4 py-3 font-mono text-gray-600 font-bold">{item.hsn}</td>
                                            <td className="px-4 py-3">
                                                <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <span className="inline-block bg-orange-50 text-orange-700 text-xs font-bold px-2.5 py-1 rounded-lg border border-orange-200">
                                                    {item.gstRate}%
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-center text-gray-600 font-medium">{item.cgst}%</td>
                                            <td className="px-4 py-3 text-center text-gray-600 font-medium">{item.sgst}%</td>
                                            <td className="px-4 py-3 text-center text-gray-600 font-medium">{item.igst}%</td>
                                            <td className="px-4 py-3 text-gray-500 text-xs max-w-[200px] truncate" title={item.description}>
                                                {item.description || '—'}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-1">
                                                    <button
                                                        onClick={() => openEditModal(item)}
                                                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteItem(item.id)}
                                                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    {filteredItems.length > 0 && (
                        <div className="px-4 py-3 bg-gray-50 border-t flex justify-between items-center text-xs text-gray-500">
                            <span>Showing {filteredItems.length} of {items.length} items</span>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="bg-purple-700 text-white px-5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-purple-600 disabled:opacity-50 transition-colors"
                            >
                                {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                                Save Changes
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
                    <div className="bg-white w-full max-w-lg rounded-2xl p-6 relative z-10 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">
                                    {editingItem ? 'Edit Item' : 'Add New Item'}
                                </h2>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    {editingItem ? 'Update item details below.' : 'Fill in the item details. CGST/SGST auto-calculate.'}
                                </p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Item Name *</label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                                        placeholder="e.g. Mobile Phone"
                                        className="w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">HSN Code *</label>
                                    <input
                                        type="text"
                                        value={form.hsn}
                                        onChange={(e) => setForm(prev => ({ ...prev, hsn: e.target.value }))}
                                        placeholder="e.g. 8517"
                                        className="w-full p-2.5 border rounded-lg text-sm font-mono focus:ring-2 focus:ring-purple-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Category</label>
                                    <select
                                        value={form.category}
                                        onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                                        className="w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none bg-white"
                                    >
                                        {CATEGORIES.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-1">GST Rate (%)</label>
                                    <input
                                        type="number"
                                        value={form.gstRate}
                                        onChange={(e) => updateGSTRate(Number(e.target.value))}
                                        placeholder="18"
                                        className="w-full p-2.5 border rounded-lg text-sm font-bold focus:ring-2 focus:ring-purple-500 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Auto-calculated rates display */}
                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-gray-50 p-3 rounded-lg border text-center">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">CGST</p>
                                    <p className="text-lg font-bold text-gray-900">{form.cgst}%</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg border text-center">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">SGST</p>
                                    <p className="text-lg font-bold text-gray-900">{form.sgst}%</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg border text-center">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">IGST</p>
                                    <p className="text-lg font-bold text-gray-900">{form.igst}%</p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Description</label>
                                <textarea
                                    value={form.description}
                                    onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder="Brief description of the item..."
                                    rows={2}
                                    className="w-full p-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitItem}
                                className="flex-[1.5] py-2.5 bg-gray-900 text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors shadow-md"
                            >
                                {editingItem ? 'Update Item' : 'Add Item'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
