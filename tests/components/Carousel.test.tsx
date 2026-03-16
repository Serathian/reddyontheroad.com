import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Carousel } from '@/app/components/Carousel/Carousel'
import type { DailyEntry } from '@/lib/types'
import { MockIntersectionObserver } from '@/tests/mocks/IntersectionObserver'

describe('Carousel', () => {
  const mockEntries: DailyEntry[] = [
    {
      id: 'entry-1',
      date: '2024-06-15',
      location: 'Santorini, Greece',
      latitude: 36.393156,
      longitude: 25.461509,
      preview: 'Azure domes against endless blue.',
      diary: 'Full diary...',
    },
    {
      id: 'entry-2',
      date: '2024-06-16',
      location: 'Athens, Greece',
      latitude: 37.983716,
      longitude: 23.727539,
      preview: 'Ancient stones whisper stories.',
      diary: 'Full diary...',
    },
    {
      id: 'entry-3',
      date: '2024-06-17',
      location: 'Delphi, Greece',
      latitude: 38.482266,
      longitude: 22.501104,
      preview: 'Clouds drift through mountain ruins.',
      diary: 'Full diary...',
    },
  ]

  let mockObserver: MockIntersectionObserver

  beforeEach(() => {
    // Reset mock observer before each test
    mockObserver = new MockIntersectionObserver()
    vi.stubGlobal('IntersectionObserver', vi.fn(() => mockObserver))
  })

  it('renders all entries as DayCard components', () => {
    render(<Carousel entries={mockEntries} />)

    // Check all locations appear (each DayCard shows location)
    expect(screen.getByText(/Santorini, Greece/i)).toBeInTheDocument()
    expect(screen.getByText(/Athens, Greece/i)).toBeInTheDocument()
    expect(screen.getByText(/Delphi, Greece/i)).toBeInTheDocument()
  })

  it('creates IntersectionObserver with correct rootMargin configuration', () => {
    render(<Carousel entries={mockEntries} />)

    // Verify IntersectionObserver was created with center-detection config
    expect(vi.mocked(IntersectionObserver)).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0,
      })
    )
  })

  it('observes all card elements', () => {
    render(<Carousel entries={mockEntries} />)

    // Observer should observe 3 cards
    expect(mockObserver.observe).toHaveBeenCalledTimes(3)
  })

  it('disconnects observer on unmount (memory leak prevention)', () => {
    const { unmount } = render(<Carousel entries={mockEntries} />)

    unmount()

    // Verify cleanup was called
    expect(mockObserver.disconnect).toHaveBeenCalled()
  })

  it('updates active ID when IntersectionObserver fires', () => {
    const { container } = render(<Carousel entries={mockEntries} />)

    // Initially no active card
    expect(container.querySelector('[data-active="true"]')).toBeNull()

    // Find the second card element by data-id
    const card2 = container.querySelector('[data-id="entry-2"]')
    expect(card2).toBeInTheDocument()

    // Trigger intersection for second card
    if (card2) {
      mockObserver.triggerIntersection(card2, true)
    }

    // Second card should now be active
    expect(card2).toHaveAttribute('data-active', 'true')
  })

  it('shows skeleton cards when loading', () => {
    render(<Carousel entries={mockEntries} isLoading={true} />)

    // Skeleton cards should be present (they have aria-hidden="true")
    const skeletons = screen.getAllByLabelText('', { hidden: true })
    expect(skeletons.length).toBeGreaterThan(0)
  })
})
