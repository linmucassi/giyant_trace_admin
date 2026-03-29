'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Building2, Users, CreditCard, BarChart3, Settings, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/workspaces', label: 'Workspaces', icon: Building2 },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/subscriptions', label: 'Subscriptions', icon: CreditCard },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  return (
    <aside className="w-60 bg-slate-900 flex flex-col h-full">
      <div className="px-5 py-5 border-b border-slate-800 flex items-center gap-2">
        <Shield className="w-5 h-5 text-blue-400" />
        <span className="text-sm font-bold text-white">GT Admin</span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link key={href} href={href}
              className={cn('flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                active ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white')}>
              <Icon className="w-4 h-4 flex-shrink-0" />{label}
            </Link>
          )
        })}
      </nav>
      <div className="px-5 py-4 border-t border-slate-800">
        <p className="text-xs text-slate-500">GiyantTrace Admin v1.0</p>
      </div>
    </aside>
  )
}
