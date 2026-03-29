'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminStore } from '@/store/admin'

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const token = useAdminStore((s) => s.token)
  useEffect(() => { if (!token) router.replace('/login') }, [token, router])
  if (!token) return null
  return <>{children}</>
}
