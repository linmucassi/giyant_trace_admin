import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AdminSidebar } from '@/components/layout/sidebar'

vi.mock('next/navigation', () => ({
  usePathname: () => '/admin/dashboard',
}))

vi.mock('next/link', () => ({
  default: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}))

describe('AdminSidebar', () => {
  it('renders all nav items', () => {
    render(<AdminSidebar />)
    expect(screen.getByText('Overview')).toBeInTheDocument()
    expect(screen.getByText('Workspaces')).toBeInTheDocument()
    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getByText('Subscriptions')).toBeInTheDocument()
  })

  it('highlights the active route', () => {
    render(<AdminSidebar />)
    const activeLink = screen.getByText('Overview').closest('a')
    expect(activeLink?.className).toContain('bg-blue-600')
  })
})
