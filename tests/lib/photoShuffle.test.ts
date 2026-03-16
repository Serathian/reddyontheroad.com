import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import type { Photo } from '@/lib/types'
import { getSessionPhotoOrder, shufflePhotosForDay } from '@/lib/richContent/photoShuffle'

describe('photoShuffle', () => {
  const photos: Photo[] = [
    { url: '/a.jpg', alt: 'A' },
    { url: '/b.jpg', alt: 'B' },
    { url: '/c.jpg', alt: 'C' },
    { url: '/d.jpg', alt: 'D' },
  ]

  beforeEach(() => {
    sessionStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('stores photo index order in sessionStorage and returns shuffled photos', () => {
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0.9)
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.8)

    const sourceSnapshot = [...photos]
    const shuffled = shufflePhotosForDay('day-1', photos)

    const cachedOrder = sessionStorage.getItem('photo-order:day-1')
    expect(cachedOrder).not.toBeNull()

    const parsedOrder = JSON.parse(cachedOrder ?? '[]') as number[]
    expect(parsedOrder).toHaveLength(photos.length)
    expect(new Set(parsedOrder).size).toBe(photos.length)

    expect(shuffled).not.toBe(photos)
    expect(photos).toEqual(sourceSnapshot)
  })

  it('returns identical order for repeated calls in the same session', () => {
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0.75)
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.4)

    const first = shufflePhotosForDay('day-2', photos)

    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)

    const second = shufflePhotosForDay('day-2', photos)

    expect(second).toEqual(first)
    expect(getSessionPhotoOrder('day-2', photos.length)).toEqual(
      getSessionPhotoOrder('day-2', photos.length)
    )
  })

  it('keeps independent cached orders for different day IDs', () => {
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0.9)
      .mockReturnValueOnce(0.9)
      .mockReturnValueOnce(0.9)
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.1)

    const firstDay = shufflePhotosForDay('day-3', photos)
    const secondDay = shufflePhotosForDay('day-4', photos)

    const day3Order = sessionStorage.getItem('photo-order:day-3')
    const day4Order = sessionStorage.getItem('photo-order:day-4')

    expect(day3Order).not.toBeNull()
    expect(day4Order).not.toBeNull()
    expect(day3Order).not.toBe(day4Order)
    expect(firstDay).not.toEqual(secondDay)
  })
})
