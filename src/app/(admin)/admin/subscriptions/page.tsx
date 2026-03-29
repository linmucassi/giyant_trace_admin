'use client'

import { useQuery } from '@tanstack/react-query'
import { adminApi } from '@/lib/api'
import { format } from 'date-fns'

type Subscription = {
  id: string; plan: string; status: string; trialEndsAt?: string; currentPeriodEnd?: string
  workspace: { name: string; slug: string }
}

const statusColors: Record<string, string> = {
  trialing: 'bg-blue-100 text-blue-700', active: 'bg-green-100 text-green-700',
  past_due: 'bg-red-100 text-red-700', cancelled: 'bg-gray-100 text-gray-600', expired: 'bg-gray-100 text-gray-600',
}
const planColors: Record<string, string> = {
  starter: 'bg-gray-100 text-gray-700', growth: 'bg-blue-100 text-blue-700',
  pro: 'bg-purple-100 text-purple-700', enterprise: 'bg-yellow-100 text-yellow-800',
}

export default function SubscriptionsPage() {
  const { data, isLoading } = useQuery<{ data: Subscription[] }>({
    queryKey: ['admin', 'subscriptions'],
    queryFn: () => adminApi.get('/admin/subscriptions').then((r) => r.data),
  })

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-gray-900">Subscriptions</h1>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left">
              <th className="px-4 py-3 font-medium text-gray-500">Workspace</th>
              <th className="px-4 py-3 font-medium text-gray-500">Plan</th>
              <th className="px-4 py-3 font-medium text-gray-500">Status</th>
              <th className="px-4 py-3 font-medium text-gray-500">Period</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {isLoading ? (
              <tr><td colSpan={4} className="text-center py-8 text-gray-400">Loading...</td></tr>
            ) : (data?.data ?? []).map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{s.workspace?.name ?? '—'}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${planColors[s.plan] ?? 'bg-gray-100 text-gray-700'}`}>{s.plan}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[s.status] ?? 'bg-gray-100 text-gray-600'}`}>
                    {s.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {s.trialEndsAt ? `Trial ends ${format(new Date(s.trialEndsAt), 'MMM d, yyyy')}`
                    : s.currentPeriodEnd ? `Renews ${format(new Date(s.currentPeriodEnd), 'MMM d, yyyy')}` : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
