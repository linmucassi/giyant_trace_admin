'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useAdminStore } from '@/store/admin'
import { adminApi } from '@/lib/api'
import { toast } from 'sonner'
import { Shield } from 'lucide-react'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})
type FormData = z.infer<typeof schema>

export default function AdminLoginPage() {
  const router = useRouter()
  const setAuth = useAdminStore((s) => s.setAuth)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const res = await adminApi.post('/auth/login', data)
      setAuth(res.data.data.user, res.data.data.tokens.accessToken)
      router.push('/admin/dashboard')
    } catch (err: any) {
      toast.error(err.response?.data?.error ?? 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl mb-4">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">GiyantTrace Admin</h1>
          <p className="mt-1 text-slate-400 text-sm">Platform Administration</p>
        </div>
        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-7">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
              <input {...register('email')} type="email"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="admin@giyanttrace.com" />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
              <input {...register('password')} type="password"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors mt-2">
              {loading ? 'Signing in...' : 'Sign in to Admin'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
