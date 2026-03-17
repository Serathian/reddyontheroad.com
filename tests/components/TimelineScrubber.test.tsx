import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TimelineScrubber } from '@/app/components/TimelineScrubber/TimelineScrubber'
import type { DailyEntry } from '@/lib/types'

const entries: DailyEntry[] = [
  {
    id: 'day-1',
    date: '2024-06-20',
    location: 'Athens, Greece',
    latitude: 37.9838,
    longitude: 23.7275,
    preview: 'Exploring old streets',
    diary: 'Day 1 diary',
  },
  {
    id: 'day-2',
    date: '2024-06-21',
    location: 'Corinth, Greece',
    latitude: 37.9386,
    longitude: 22.9322,
    preview: 'Canal and coastline',
    diary: 'Day 2 diary',
  },
  {
    id: 'day-3',
    date: '2024-06-22',
    location: 'Patras, Greece',
    latitude: 38.2466,
    longitude: 21.7346,
    preview: 'Ferry prep',
    diary: 'Day 3 diary',
  },
]

describe('TimelineScrubber', () => {
  it('renders a decorative motorhome icon affordance', () => {
    const onDayChange = vi.fn()
    render(<TimelineScrubber entries={entries} activeIndex={0} onDayChange={onDayChange} />)

    const icon = screen.getByTestId('timeline-motorhome-icon')
    expect(icon).toHaveAttribute('aria-hidden', 'true')
    expect(icon).toHaveAttribute('data-icon', 'motorhome')
  })

  it('updates only on release and snaps to nearest day', () => {
    const onDayChange = vi.fn()
    render(<TimelineScrubber entries={entries} activeIndex={0} onDayChange={onDayChange} />)

    const slider = screen.getByRole('slider', { name: 'Journey timeline' })

    fireEvent.pointerDown(slider)
    fireEvent.input(slider, { target: { value: '1.6' } })
    expect(onDayChange).not.toHaveBeenCalled()

    fireEvent.pointerUp(slider)
    expect(onDayChange).toHaveBeenCalledWith(2)
    expect(slider).toHaveValue('2')
  })

  it('moves exactly one day with keyboard arrows and commits on key release', () => {
    const onDayChange = vi.fn()
    render(<TimelineScrubber entries={entries} activeIndex={1} onDayChange={onDayChange} />)

    const slider = screen.getByRole('slider', { name: 'Journey timeline' })

    fireEvent.keyDown(slider, { key: 'ArrowUp' })
    expect(onDayChange).not.toHaveBeenCalled()
    fireEvent.keyUp(slider, { key: 'ArrowUp' })
    expect(onDayChange).toHaveBeenCalledWith(0)

    fireEvent.keyDown(slider, { key: 'ArrowDown' })
    fireEvent.keyUp(slider, { key: 'ArrowDown' })
    expect(onDayChange).toHaveBeenCalledWith(1)
  })

  it('exposes aria-valuetext and announces exact day format in live region', () => {
    const onDayChange = vi.fn()
    const { rerender } = render(
      <TimelineScrubber entries={entries} activeIndex={0} onDayChange={onDayChange} />,
    )

    const slider = screen.getByRole('slider', { name: 'Journey timeline' })
    expect(slider).toHaveAttribute('aria-valuetext', 'Day 1 of 3: June 20, 2024, Athens, Greece')

    rerender(<TimelineScrubber entries={entries} activeIndex={1} onDayChange={onDayChange} />)
    expect(screen.getByTestId('timeline-preview')).toHaveTextContent('Day 2 of 3')
  })

  it('shows visible date/location preview while scrubbing before commit', () => {
    const onDayChange = vi.fn()
    render(<TimelineScrubber entries={entries} activeIndex={0} onDayChange={onDayChange} />)

    const slider = screen.getByRole('slider', { name: 'Journey timeline' })

    fireEvent.pointerDown(slider)
    fireEvent.input(slider, { target: { value: '1.4' } })

    expect(screen.getByTestId('timeline-preview')).toHaveTextContent('Day 2 of 3')
    expect(onDayChange).not.toHaveBeenCalled()
  })
})
