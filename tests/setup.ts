import '@testing-library/jest-dom'
import { vi } from 'vitest'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
  usePathname: () => '/admin/dashboard',
  redirect: vi.fn(),
}))

vi.mock('next/font/google', () => ({
  Inter: () => ({ className: 'inter' }),
}))
