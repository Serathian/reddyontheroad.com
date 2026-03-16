import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DayCard } from '@/app/components/Carousel/DayCard'
import type { DailyEntry } from '@/lib/types'

describe('DayCard', () => {
  const mockEntry: DailyEntry = {
    id: 'test-1',
    date: '2024-06-15',
    location: 'Santorini, Greece',
    latitude: 36.393156,
    longitude: 25.461509,
    preview: 'Azure domes against endless blue - this island steals your breath.',
    diary: 'Full diary content here...',
  }

  it('renders date, location, and preview text', () => {
    render(<DayCard entry={mockEntry} isActive={false} />)

    // Check formatted date appears (should be "June 15, 2024")
    expect(screen.getByText(/June 15, 2024/i)).toBeInTheDocument()

    // Check location appears
    expect(screen.getByText(/Santorini, Greece/i)).toBeInTheDocument()

    // Check preview text appears
    expect(
      screen.getByText(/Azure domes against endless blue/i)
    ).toBeInTheDocument()
  })

  it('has data-active="true" attribute when active', () => {
    const { container } = render(<DayCard entry={mockEntry} isActive={true} />)

    const card = container.querySelector('[data-active="true"]')
    expect(card).toBeInTheDocument()
  })

  it('has data-active="false" attribute when not active', () => {
    const { container } = render(
      <DayCard entry={mockEntry} isActive={false} />
    )

    const card = container.querySelector('[data-active="false"]')
    expect(card).toBeInTheDocument()
  })

  it('has accessible article element with data-id', () => {
    const { container } = render(<DayCard entry={mockEntry} isActive={false} />)

    const article = container.querySelector('article')
    expect(article).toBeInTheDocument()
    expect(article).toHaveAttribute('data-id', 'test-1')
  })
})
