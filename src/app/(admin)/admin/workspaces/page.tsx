'use client'

import { useQuery } from '@tanstack/react-query'
import { adminApi } from '@/lib/api'
import { formatDistanceToNow } from 'date-fns'
import { Search } from 'lucide-react'
import { useState } from 'react'

type Workspace = {
  id: string; name: string; slug: string; plan: string; isActive: boolean; createdAt: string
  _count?: { users: number; processes: number }
}

const planColors: Record<string, string> = {
  starter: 'bg-gray-100 text-gray-700', growth: 'bg-blue-100 text-blue-700',
  pro: 'bg-purple-100 text-purple-700', enterprise: 'bg-yellow-100 text-yellow-800',
}

export default function WorkspacesPage() {
  const [search, setSearch] = useState('')
  const { data, isLoading } = useQuery<{ data: Workspace[] }>({
    queryKey: ['admin', 'workspaces'],
    queryFn: () => adminApi.get('/admin/workspaces').then((r) => r.data),
  })

  const workspaces = (data?.data ?? []).filter(
    (w) => !search || w.name.toLowerCase().includes(search.toLowerCase()) || w.slug.includes(search)
  )

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Workspaces</h1>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..."
            className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
        </div>
      </div>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left">
              <th className="px-4 py-3 font-medium text-gray-500">Workspace</th>
              <th className="px-4 py-3 font-medium text-gray-500">Slug</th>
              <th className="px-4 py-3 font-medium text-gray-500">Plan</th>
              <th className="px-4 py-3 font-medium text-gray-500">Status</th>
              <th className="px-4 py-3 font-medium text-gray-500">Users</th>
              <th className="px-4 py-3 font-medium text-gray-500">Processes</th>
              <th className="px-4 py-3 font-medium text-gray-500">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {isLoading ? (
              <tr><td colSpan={7} className="text-center py-8 text-gray-400">Loading...</td></tr>
            ) : workspaces.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-8 text-gray-400">No workspaces found</td></tr>
            ) : workspaces.map((w) => (
              <tr key={w.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{w.name}</td>
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{w.slug}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${planColors[w.plan] ?? 'bg-gray-100 text-gray-700'}`}>{w.plan}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${w.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {w.isActive ? 'Active' : 'Suspended'}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{w._count?.users ?? '—'}</td>
                <td className="px-4 py-3 text-gray-500">{w._count?.processes ?? '—'}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{formatDistanceToNow(new Date(w.createdAt), { addSuffix: true })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
