import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FullDayView } from '@/app/components/FullDayView/FullDayView'
import type { DailyEntry } from '@/lib/types'

vi.mock('@/lib/richContent/photoShuffle', () => ({
  getSessionPhotoOrder: vi.fn(),
  shufflePhotosForDay: (_entryId: string, photos?: unknown[]) => photos ?? [],
}))

vi.mock('yet-another-react-lightbox', () => ({
  default: ({ open, slides, index }: { open: boolean; slides: Array<{ alt?: string }>; index: number }) => {
    if (!open) {
      return null
    }

    return (
      <div role="dialog" aria-label="Photo lightbox">
        <p>{slides[index]?.alt ?? ''}</p>
      </div>
    )
  },
}))

describe('FullDayView', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  const baseEntry: DailyEntry = {
    id: 'entry-100',
    date: '2024-06-24',
    location: 'Patras, Greece',
    latitude: 38.2466,
    longitude: 21.7346,
    preview: 'Left Athens and drove west.',
    diary: `# Ferry Day

We packed before dawn and hit the road.

- Coffee at 6:30
- Ferry tickets by noon

This final sentence must remain visible without truncation.`,
  }

  it('renders date and location header with full markdown diary content', () => {
    render(<FullDayView entry={baseEntry} />)

    expect(screen.getByText('Patras, Greece')).toBeInTheDocument()
    expect(screen.getByText(/June 24, 2024/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Ferry Day' })).toBeInTheDocument()
    expect(screen.getByText('This final sentence must remain visible without truncation.')).toBeInTheDocument()
  })

  it('renders weather and distance chips only when values are present', () => {
    const { rerender } = render(
      <FullDayView
        entry={{
          ...baseEntry,
          weather: 'Rainy, 19°C',
          distanceMiles: 132,
        }}
      />
    )

    expect(screen.getByText('Rainy, 19°C')).toBeInTheDocument()
    expect(screen.getByText('132 miles')).toBeInTheDocument()

    rerender(<FullDayView entry={{ ...baseEntry, weather: undefined, distanceMiles: undefined }} />)

    expect(screen.queryByText('Rainy, 19°C')).not.toBeInTheDocument()
    expect(screen.queryByText('132 miles')).not.toBeInTheDocument()
  })

  it('shows the exact empty photo state copy when a day has no photos', () => {
    render(<FullDayView entry={{ ...baseEntry, photos: [] }} />)

    expect(screen.getByText('No photos for this day')).toBeInTheDocument()
  })

  it('opens lightbox on photo click and supports previous/next navigation', () => {
    render(
      <FullDayView
        entry={{
          ...baseEntry,
          photos: [
            { url: '/photos/one.jpg', alt: 'First photo alt', caption: 'First caption' },
            { url: '/photos/two.jpg', alt: 'Second photo alt', caption: 'Second caption' },
            { url: '/photos/three.jpg', alt: 'Third photo alt', caption: 'Third caption' },
          ],
        }}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: /open photo 1/i }))

    expect(screen.getByRole('dialog', { name: 'Photo lightbox' })).toBeInTheDocument()
    expect(screen.getByText('First photo alt')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Next photo' }))
    expect(screen.getByText('Second photo alt')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Previous photo' }))
    expect(screen.getByText('First photo alt')).toBeInTheDocument()
  })
})
