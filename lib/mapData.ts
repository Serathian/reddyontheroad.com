import type { DailyEntry } from '@/lib/types'

export const TRAIL_WINDOW_SIZE = 7
export const TRAIL_MIN_OPACITY = 0.25
export const TRAIL_MAX_OPACITY = 0.95

interface LineStringFeature {
  type: 'Feature'
  properties: {
    pointCount: number
  }
  geometry: {
    type: 'LineString'
    coordinates: [number, number][]
  }
}

interface PointFeature {
  type: 'Feature'
  properties: {
    id: string
    ageIndex: number
    ageOpacity: number
    isCurrent: boolean
  }
  geometry: {
    type: 'Point'
    coordinates: [number, number]
  }
}

export interface TrailGeoJSON {
  type: 'FeatureCollection'
  features: [LineStringFeature]
}

export interface StopPointsGeoJSON {
  type: 'FeatureCollection'
  features: PointFeature[]
}

function clampActiveIndex(length: number, activeIndex: number): number {
  if (length === 0) return -1
  if (activeIndex < 0) return 0
  if (activeIndex > length - 1) return length - 1
  return activeIndex
}

export function getTrailWindow(entries: DailyEntry[], activeIndex: number): DailyEntry[] {
  const boundedActiveIndex = clampActiveIndex(entries.length, activeIndex)
  if (boundedActiveIndex < 0) {
    return []
  }

  const startIndex = Math.max(0, boundedActiveIndex - (TRAIL_WINDOW_SIZE - 1))
  return entries.slice(startIndex, boundedActiveIndex + 1)
}

export function buildTrailGeoJSON(entries: DailyEntry[], activeIndex: number): TrailGeoJSON {
  const trailWindow = getTrailWindow(entries, activeIndex)

  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          pointCount: trailWindow.length,
        },
        geometry: {
          type: 'LineString',
          coordinates: trailWindow.map((entry) => [entry.longitude, entry.latitude]),
        },
      },
    ],
  }
}

export function buildStopPointsGeoJSON(entries: DailyEntry[], activeIndex: number): StopPointsGeoJSON {
  const trailWindow = getTrailWindow(entries, activeIndex)
  const lastWindowIndex = trailWindow.length - 1
  const denominator = Math.max(lastWindowIndex, 1)

  return {
    type: 'FeatureCollection',
    features: trailWindow.map((entry, index) => {
      const ageIndex = lastWindowIndex - index
      const ageProgress = index / denominator
      const ageOpacity = Number(
        (TRAIL_MIN_OPACITY + ageProgress * (TRAIL_MAX_OPACITY - TRAIL_MIN_OPACITY)).toFixed(3),
      )

      return {
        type: 'Feature',
        properties: {
          id: entry.id,
          ageIndex,
          ageOpacity,
          isCurrent: index === lastWindowIndex,
        },
        geometry: {
          type: 'Point',
          coordinates: [entry.longitude, entry.latitude],
        },
      }
    }),
  }
}
