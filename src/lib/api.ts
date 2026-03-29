import axios from 'axios'
import { useAdminStore } from '@/store/admin'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

export const adminApi = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: { 'Content-Type': 'application/json' },
})

adminApi.interceptors.request.use((config) => {
  const token = useAdminStore.getState().token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

adminApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      useAdminStore.getState().logout()
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)
