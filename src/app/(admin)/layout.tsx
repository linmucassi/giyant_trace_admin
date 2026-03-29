import { AdminSidebar } from '@/components/layout/sidebar'
import { AdminHeader } from '@/components/layout/header'
import { AdminAuthGuard } from '@/components/auth-guard'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthGuard>
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AdminHeader />
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </AdminAuthGuard>
  )
}
