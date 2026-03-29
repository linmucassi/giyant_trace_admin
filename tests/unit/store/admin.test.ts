import { describe, it, expect, beforeEach } from 'vitest'
import { useAdminStore } from '@/store/admin'

beforeEach(() => {
  useAdminStore.setState({ user: null, token: null })
})

describe('useAdminStore', () => {
  it('starts empty', () => {
    const { user, token } = useAdminStore.getState()
    expect(user).toBeNull()
    expect(token).toBeNull()
  })

  it('setAuth persists user and token', () => {
    const mockUser = { id: '1', name: 'Admin', email: 'admin@gt.com', role: 'superadmin' }
    useAdminStore.getState().setAuth(mockUser, 'admin-token')
    expect(useAdminStore.getState().user).toEqual(mockUser)
    expect(useAdminStore.getState().token).toBe('admin-token')
  })

  it('logout clears state', () => {
    useAdminStore.setState({ user: { id: '1', name: 'A', email: 'a@a.com', role: 'superadmin' }, token: 'tok' })
    useAdminStore.getState().logout()
    expect(useAdminStore.getState().user).toBeNull()
    expect(useAdminStore.getState().token).toBeNull()
  })
})
