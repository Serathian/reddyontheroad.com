import { describe, it, expect } from 'vitest'
import { formatDate } from './formatDate'

describe('formatDate', () => {
  it('formats an ISO date string into a readable format', () => {
    const result = formatDate('2024-06-15')
    expect(result).toBe('15 June 2024')
  })

  it('handles the start of the year', () => {
    const result = formatDate('2025-01-01')
    expect(result).toBe('1 January 2025')
  })
})
