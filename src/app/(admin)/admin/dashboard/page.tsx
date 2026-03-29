'use client'

import { useQuery } from '@tanstack/react-query'
import { adminApi } from '@/lib/api'
import { Building2, Users, Activity, FolderOpen } from 'lucide-react'

type PlatformStats = {
  totalWorkspaces: number
  activeWorkspaces: number
  totalUsers: number
  totalProcesses: number
  planBreakdown: Record<string, number>
}

export default function AdminDashboardPage() {
  const { data, isLoading } = useQuery<PlatformStats>({
    queryKey: ['admin', 'stats'],
    queryFn: () => adminApi.get('/admin/stats').then((r) => r.data.data),
  })

  const cards = [
    { label: 'Total Workspaces', value: data?.totalWorkspaces ?? 0, icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Workspaces', value: data?.activeWorkspaces ?? 0, icon: Activity, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Users', value: data?.totalUsers ?? 0, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Total Processes', value: data?.totalProcesses ?? 0, icon: FolderOpen, color: 'text-orange-600', bg: 'bg-orange-50' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Platform Overview</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl border p-5">
            <div className="flex items-center gap-3">
              <div className={`${card.bg} ${card.color} p-2 rounded-lg`}><card.icon className="w-5 h-5" /></div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{isLoading ? '—' : card.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{card.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {data?.planBreakdown && (
        <div className="bg-white rounded-xl border p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Plan Distribution</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(data.planBreakdown).map(([plan, count]) => (
              <div key={plan} className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-2xl font-bold text-gray-900">{count}</p>
                <p className="text-sm text-gray-500 mt-1 capitalize">{plan}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
