import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import Home from '@/app/page'
import { MockIntersectionObserver } from '@/tests/mocks/IntersectionObserver'

let mapMountCount = 0

vi.mock('@/app/components/Map/JourneyMap', () => ({
  JourneyMap: ({ activeEntryId }: { activeEntryId: string }) => {
    const React = require('react') as typeof import('react')

    React.useEffect(() => {
      mapMountCount += 1
    }, [])

    return (
      <div data-testid="journey-map-shell" data-active-entry={activeEntryId}>
        map-mounted
      </div>
    )
  },
}))

describe('Rich content shell orchestration', () => {
  let mockObserver: MockIntersectionObserver
  let originalIntersectionObserver: typeof IntersectionObserver

  beforeEach(() => {
    mapMountCount = 0
    originalIntersectionObserver = global.IntersectionObserver

    const SpyConstructor = vi.fn(function (this: unknown, callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
      mockObserver = new MockIntersectionObserver(callback, options)
      return mockObserver
    }) as unknown as typeof IntersectionObserver

    global.IntersectionObserver = SpyConstructor
  })

  it('allows only the active centered card to trigger full-day open', async () => {
    const { container } = render(<Home />)

    const activeCard = container.querySelector('[data-active="true"]')
    expect(activeCard).toBeInTheDocument()

    const inactiveCard = container.querySelector('[data-active="false"]')
    expect(inactiveCard).toBeInTheDocument()

    expect(screen.getAllByRole('button', { name: /open full day/i })).toHaveLength(1)
    expect(activeCard?.querySelector('button')).toBeTruthy()
    expect(inactiveCard?.querySelector('button')).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: /open full day/i }))
    expect(await screen.findByRole('button', { name: /back to timeline/i })).toBeInTheDocument()
  })

  it('shows persistent back control and returns to the same active day', async () => {
    const { container } = render(<Home />)

    const targetCard = container.querySelector('[data-id="entry-003"]')
    expect(targetCard).toBeInTheDocument()

    fireEvent.scroll(container.querySelector('[data-testid="carousel-container"]') as Element, {
      target: { scrollTop: 420 },
    })

    act(() => {
      mockObserver.triggerIntersection(targetCard as Element, true)
    })

    const openButton = await screen.findByRole('button', { name: /open full day/i })
    fireEvent.click(openButton)

    expect(screen.getByRole('button', { name: /back to timeline/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: /Delphi, Greece/i })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /back to timeline/i }))

    await waitFor(() => {
      const activeCard = container.querySelector('[data-id="entry-003"]')
      expect(activeCard).toHaveAttribute('data-active', 'true')
    })
  })

  it('restores carousel scroll position after returning from full-day view', async () => {
    const { container } = render(<Home />)

    const carousel = container.querySelector('[data-testid="carousel-container"]') as HTMLElement
    carousel.scrollTop = 480

    fireEvent.click(screen.getByRole('button', { name: /open full day/i }))
    fireEvent.click(await screen.findByRole('button', { name: /back to timeline/i }))

    await waitFor(() => {
      expect(carousel.scrollTop).toBe(480)
    })
  })

  it('keeps map mounted while right pane swaps with crossfade states', async () => {
    render(<Home />)

    const rightPane = screen.getByTestId('right-pane-mode')
    expect(rightPane).toHaveAttribute('data-view-mode', 'carousel')
    expect(mapMountCount).toBe(1)

    fireEvent.click(screen.getByRole('button', { name: /open full day/i }))

    await waitFor(() => {
      expect(rightPane).toHaveAttribute('data-view-mode', 'full')
    })

    expect(mapMountCount).toBe(1)
    fireEvent.click(screen.getByRole('button', { name: /back to timeline/i }))
    await waitFor(() => {
      expect(rightPane).toHaveAttribute('data-view-mode', 'carousel')
    })
    expect(mapMountCount).toBe(1)
  })

  it('keeps map visible on mobile when full-day mode is active', async () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 375,
    })
    window.dispatchEvent(new Event('resize'))

    render(<Home />)

    fireEvent.click(screen.getByRole('button', { name: /open full day/i }))

    expect(await screen.findByTestId('journey-map-shell')).toBeInTheDocument()
    expect(screen.getByTestId('layout-shell')).toHaveAttribute('data-mobile-full', 'true')
  })
})
