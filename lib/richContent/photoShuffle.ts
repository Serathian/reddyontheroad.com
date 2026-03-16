import type { Photo } from '@/lib/types'

const PHOTO_ORDER_KEY_PREFIX = 'photo-order:'

function getStorageKey(entryId: string): string {
  return `${PHOTO_ORDER_KEY_PREFIX}${entryId}`
}

function createShuffledOrder(length: number): number[] {
  const order = Array.from({ length }, (_, index) => index)

  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }

  return order
}

function isValidOrder(value: unknown, length: number): value is number[] {
  if (!Array.isArray(value)) {
    return false
  }

  if (value.length !== length) {
    return false
  }

  return value.every((index) => Number.isInteger(index) && index >= 0 && index < length)
}

export function getSessionPhotoOrder(entryId: string, photoCount: number): number[] {
  if (photoCount <= 0 || typeof window === 'undefined') {
    return []
  }

  const storageKey = getStorageKey(entryId)
  const cached = window.sessionStorage.getItem(storageKey)

  if (cached) {
    try {
      const parsed = JSON.parse(cached) as unknown
      if (isValidOrder(parsed, photoCount)) {
        return parsed
      }
    } catch {
      // ignore malformed cached values and rewrite below
    }
  }

  const order = createShuffledOrder(photoCount)
  window.sessionStorage.setItem(storageKey, JSON.stringify(order))
  return order
}

export function shufflePhotosForDay(entryId: string, photos?: Photo[]): Photo[] {
  if (!photos || photos.length === 0) {
    return []
  }

  const order = getSessionPhotoOrder(entryId, photos.length)
  if (order.length === 0) {
    return [...photos]
  }

  return order.map((index) => photos[index])
}
