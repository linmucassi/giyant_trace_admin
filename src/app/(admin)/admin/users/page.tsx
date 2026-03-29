'use client'

import { useQuery } from '@tanstack/react-query'
import { adminApi } from '@/lib/api'
import { formatDistanceToNow } from 'date-fns'

type User = {
  id: string; name: string; email: string; role: string; isActive: boolean; createdAt: string
  workspace: { name: string; slug: string }
}

export default function UsersPage() {
  const { data, isLoading } = useQuery<{ data: User[] }>({
    queryKey: ['admin', 'users'],
    queryFn: () => adminApi.get('/admin/users').then((r) => r.data),
  })

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-gray-900">Users</h1>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left">
              <th className="px-4 py-3 font-medium text-gray-500">Name</th>
              <th className="px-4 py-3 font-medium text-gray-500">Email</th>
              <th className="px-4 py-3 font-medium text-gray-500">Workspace</th>
              <th className="px-4 py-3 font-medium text-gray-500">Role</th>
              <th className="px-4 py-3 font-medium text-gray-500">Status</th>
              <th className="px-4 py-3 font-medium text-gray-500">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {isLoading ? (
              <tr><td colSpan={6} className="text-center py-8 text-gray-400">Loading...</td></tr>
            ) : (data?.data ?? []).map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{u.name}</td>
                <td className="px-4 py-3 text-gray-500">{u.email}</td>
                <td className="px-4 py-3 text-gray-500">{u.workspace?.name ?? '—'}</td>
                <td className="px-4 py-3"><span className="capitalize text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">{u.role}</span></td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${u.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {u.isActive ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">{formatDistanceToNow(new Date(u.createdAt), { addSuffix: true })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
