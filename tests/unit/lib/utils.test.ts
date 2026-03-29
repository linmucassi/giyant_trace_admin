import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('resolves tailwind conflicts', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8')
  })

  it('ignores falsy values', () => {
    expect(cn('base', false && 'hidden')).toBe('base')
  })
})
