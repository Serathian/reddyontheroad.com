import { describe, it, expect } from 'vitest'
import { getRouteCoords, locationToLngLat, getResolvedLocations } from './utils'
import type { RotrPost, RotrLocation, RotrLocationStop } from '$lib/types'

// ── Fixtures ──────────────────────────────────────────────────────────────────

function makePost(overrides: Partial<RotrPost> = {}): RotrPost {
  return {
    id: 1,
    status: 'published',
    title: 'Week 1',
    slug: 'week-1',
    latitude: 60.17,
    longitude: 24.94,
    updatedAt: '',
    createdAt: '',
    ...overrides,
  }
}

function makeLocation(overrides: Partial<RotrLocation> = {}): RotrLocation {
  return {
    id: 1,
    name: 'Helsinki',
    place_type: 'city',
    marker_type: 'city-stop',
    latitude: 60.17,
    longitude: 24.94,
    updatedAt: '',
    createdAt: '',
    ...overrides,
  }
}

function makeStop(location: RotrLocation | number): RotrLocationStop {
  return { location }
}

// ── getRouteCoords ─────────────────────────────────────────────────────────────

describe('getRouteCoords', () => {
  it('returns [longitude, latitude] pairs — not [latitude, longitude]', () => {
    // Helsinki: lat 60.17, lng 24.94
    // If order were swapped the result would be [60.17, 24.94] instead of [24.94, 60.17]
    const posts = [makePost({ latitude: 60.17, longitude: 24.94 })]
    const [[lng, lat]] = getRouteCoords(posts)
    expect(lng).toBe(24.94)
    expect(lat).toBe(60.17)
  })

  it('filters out posts with null latitude', () => {
    const posts = [
      makePost({ latitude: null, longitude: 24.94 }),
      makePost({ latitude: 60.17, longitude: 24.94 }),
    ]
    expect(getRouteCoords(posts)).toHaveLength(1)
  })

  it('filters out posts with null longitude', () => {
    const posts = [
      makePost({ latitude: 60.17, longitude: null }),
      makePost({ latitude: 60.17, longitude: 24.94 }),
    ]
    expect(getRouteCoords(posts)).toHaveLength(1)
  })

  it('does not filter out posts where latitude or longitude is 0', () => {
    // 0 is a valid coordinate (equator / prime meridian) — must not be excluded
    const posts = [
      makePost({ latitude: 0, longitude: 0 }),
      makePost({ latitude: 0, longitude: 24.94 }),
      makePost({ latitude: 60.17, longitude: 0 }),
    ]
    expect(getRouteCoords(posts)).toHaveLength(3)
  })

  it('returns an empty array when no posts have coordinates', () => {
    const posts = [makePost({ latitude: null, longitude: null })]
    expect(getRouteCoords(posts)).toHaveLength(0)
  })

  it('preserves post order in the returned coordinate list', () => {
    const posts = [
      makePost({ id: 1, latitude: 60.17, longitude: 24.94 }),  // Helsinki
      makePost({ id: 2, latitude: 59.91, longitude: 10.75 }),  // Oslo
      makePost({ id: 3, latitude: 40.42, longitude: -3.70 }),  // Madrid
    ]
    const coords = getRouteCoords(posts)
    expect(coords).toHaveLength(3)
    expect(coords[0]).toEqual([24.94, 60.17])
    expect(coords[1]).toEqual([10.75, 59.91])
    expect(coords[2]).toEqual([-3.70, 40.42])
  })
})

// ── locationToLngLat ──────────────────────────────────────────────────────────

describe('locationToLngLat', () => {
  it('returns [longitude, latitude] — not [latitude, longitude]', () => {
    const loc = makeLocation({ latitude: 60.17, longitude: 24.94 })
    const [lng, lat] = locationToLngLat(loc)
    expect(lng).toBe(24.94)
    expect(lat).toBe(60.17)
  })

  it('handles negative longitude correctly (western hemisphere / western Europe)', () => {
    // Madrid: lat 40.42, lng -3.70
    const loc = makeLocation({ latitude: 40.42, longitude: -3.70 })
    const [lng, lat] = locationToLngLat(loc)
    expect(lng).toBe(-3.70)
    expect(lat).toBe(40.42)
  })

  it('handles coordinates at zero without treating them as falsy', () => {
    const loc = makeLocation({ latitude: 0, longitude: 0 })
    const [lng, lat] = locationToLngLat(loc)
    expect(lng).toBe(0)
    expect(lat).toBe(0)
  })

  it('longitude is always in the valid WGS-84 range (-180 to 180)', () => {
    const loc = makeLocation({ latitude: 60.17, longitude: 24.94 })
    const [lng] = locationToLngLat(loc)
    expect(lng).toBeGreaterThanOrEqual(-180)
    expect(lng).toBeLessThanOrEqual(180)
  })

  it('latitude is always in the valid WGS-84 range (-90 to 90)', () => {
    const loc = makeLocation({ latitude: 60.17, longitude: 24.94 })
    const [, lat] = locationToLngLat(loc)
    expect(lat).toBeGreaterThanOrEqual(-90)
    expect(lat).toBeLessThanOrEqual(90)
  })
})

// ── getResolvedLocations ──────────────────────────────────────────────────────

describe('getResolvedLocations', () => {
  it('returns only stops whose location is a RotrLocation object', () => {
    const resolved = makeLocation()
    const stops: RotrLocationStop[] = [
      makeStop(resolved),
      makeStop(42),          // bare numeric ID — not yet populated
    ]
    const result = getResolvedLocations(stops)
    expect(result).toHaveLength(1)
    expect(result[0]).toBe(resolved)
  })

  it('returns an empty array when all stops are numeric IDs', () => {
    const stops: RotrLocationStop[] = [makeStop(1), makeStop(2)]
    expect(getResolvedLocations(stops)).toHaveLength(0)
  })

  it('returns all stops when all locations are resolved', () => {
    const stops: RotrLocationStop[] = [
      makeStop(makeLocation({ id: 1, name: 'Helsinki' })),
      makeStop(makeLocation({ id: 2, name: 'Oslo' })),
    ]
    expect(getResolvedLocations(stops)).toHaveLength(2)
  })

  it('returns an empty array for an empty stops list', () => {
    expect(getResolvedLocations([])).toHaveLength(0)
  })
})
