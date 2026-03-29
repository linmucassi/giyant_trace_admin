import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AdminUser = { id: string; name: string; email: string; role: string }

type AdminState = {
  user: AdminUser | null
  token: string | null
  setAuth: (user: AdminUser, token: string) => void
  logout: () => void
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: 'giyant-admin-auth' }
  )
)
