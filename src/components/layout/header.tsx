'use client'
import { useAdminStore } from '@/store/admin'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export function AdminHeader() {
  const { user, logout } = useAdminStore()
  const router = useRouter()
  return (
    <header className="bg-white border-b px-6 py-3 flex items-center justify-between">
      <div className="text-sm text-gray-500">Platform Administration</div>
      {user && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">{user.name}</span>
          <button onClick={() => { logout(); router.push('/login') }} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      )}
    </header>
  )
}
