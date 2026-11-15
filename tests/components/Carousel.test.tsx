import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { Carousel } from '@/app/components/Carousel/Carousel'
import type { DailyEntry } from '@/lib/types'
import { MockIntersectionObserver } from '@/tests/mocks/IntersectionObserver'

describe('Carousel', () => {
  const mockEntries: DailyEntry[] = [
    {
      id: 'entry-1',
      date: '2024-06-15',
      location: 'Santorini, Greece',
      city: 'Santorini',
      country: 'Greece',
      latitude: 36.393156,
      longitude: 25.461509,
      preview: 'Azure domes against endless blue.',
      diary: 'Full diary...',
    },
    {
      id: 'entry-2',
      date: '2024-06-16',
      location: 'Athens, Greece',
      city: 'Athens',
      country: 'Greece',
      latitude: 37.983716,
      longitude: 23.727539,
      preview: 'Ancient stones whisper stories.',
      diary: 'Full diary...',
    },
    {
      id: 'entry-3',
      date: '2024-06-17',
      location: 'Delphi, Greece',
      city: 'Delphi',
      country: 'Greece',
      latitude: 38.482266,
      longitude: 22.501104,
      preview: 'Clouds drift through mountain ruins.',
      diary: 'Full diary...',
    },
  ]

  let mockObserver: MockIntersectionObserver
  let originalIntersectionObserver: typeof IntersectionObserver

  beforeEach(() => {
    // Save original constructor
    originalIntersectionObserver = global.IntersectionObserver
    
    // Create a proper constructor function (not arrow function)
    const SpyConstructor = vi.fn(function(this: unknown, callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
      mockObserver = new MockIntersectionObserver(callback, options)
      return mockObserver
    }) as unknown as typeof IntersectionObserver
    
    // Replace global constructor with spy
    global.IntersectionObserver = SpyConstructor
  })

  afterEach(() => {
    // Restore original constructor
    global.IntersectionObserver = originalIntersectionObserver
    vi.clearAllMocks()
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

    // Verify IntersectionObserver was created with center-detection config (vertical)
    expect(IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        root: null,
        rootMargin: '-40% 0px -40% 0px',
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

    // Trigger intersection for second card - wrap in act() because it updates state
    act(() => {
      if (card2) {
        mockObserver.triggerIntersection(card2, true)
      }
    })

    // Second card should now be active
    expect(card2).toHaveAttribute('data-active', 'true')
  })

  it('shows skeleton cards when loading', () => {
    const { container } = render(<Carousel entries={mockEntries} isLoading={true} />)

    // Skeleton cards should be present (they have aria-hidden="true")
    const skeletons = container.querySelectorAll('[aria-hidden="true"]')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  it('calls onActiveChange when observer sets active entry', () => {
    const onActiveChange = vi.fn()
    const { container } = render(<Carousel entries={mockEntries} onActiveChange={onActiveChange} />)

    const card3 = container.querySelector('[data-id="entry-3"]')
    expect(card3).toBeInTheDocument()

    act(() => {
      if (card3) {
        mockObserver.triggerIntersection(card3, true)
      }
    })

    expect(onActiveChange).toHaveBeenCalledWith('entry-3')
  })

  it('respects controlled activeId value', () => {
    const { container } = render(<Carousel entries={mockEntries} activeId="entry-2" />)

    const active = container.querySelector('[data-id="entry-2"]')
    expect(active).toHaveAttribute('data-active', 'true')
  })
})
