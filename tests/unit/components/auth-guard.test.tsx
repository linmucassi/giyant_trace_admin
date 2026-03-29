import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AdminAuthGuard } from '@/components/auth-guard'
import { useAdminStore } from '@/store/admin'

const mockReplace = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace }),
}))

beforeEach(() => {
  vi.clearAllMocks()
  useAdminStore.setState({ user: null, token: null })
})

describe('AdminAuthGuard', () => {
  it('redirects to /login when not authenticated', () => {
    const { container } = render(<AdminAuthGuard><div>Admin</div></AdminAuthGuard>)
    expect(container).toBeEmptyDOMElement()
    expect(mockReplace).toHaveBeenCalledWith('/login')
  })

  it('renders children when authenticated', () => {
    useAdminStore.setState({
      user: { id: '1', name: 'Admin', email: 'a@a.com', role: 'superadmin' },
      token: 'valid',
    })
    render(<AdminAuthGuard><div>Admin Panel</div></AdminAuthGuard>)
    expect(screen.getByText('Admin Panel')).toBeInTheDocument()
  })
})
