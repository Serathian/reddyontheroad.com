import { describe, expect, it } from 'vitest'

import { buildStopPointsGeoJSON, buildTrailGeoJSON, getTrailWindow } from '@/lib/mapData'
import type { DailyEntry } from '@/lib/types'

function createEntries(count: number): DailyEntry[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `entry-${index}`,
    date: `2022-01-${String(index + 1).padStart(2, '0')}`,
    latitude: 37 + index * 0.1,
    longitude: 23 + index * 0.1,
    location: `Location ${index}`,
    preview: `Preview ${index}`,
    diary: `Diary ${index}`,
  }))
}

describe('mapData', () => {
  it('returns indices 2..8 when activeIndex=8 on 10 entries', () => {
    const entries = createEntries(10)

    const trailWindow = getTrailWindow(entries, 8)

    expect(trailWindow).toHaveLength(7)
    expect(trailWindow.map((entry) => entry.id)).toEqual([
      'entry-2',
      'entry-3',
      'entry-4',
      'entry-5',
      'entry-6',
      'entry-7',
      'entry-8',
    ])
  })

  it('returns indices 0..activeIndex when activeIndex is less than 6', () => {
    const entries = createEntries(10)

    const trailWindow = getTrailWindow(entries, 4)

    expect(trailWindow).toHaveLength(5)
    expect(trailWindow.map((entry) => entry.id)).toEqual([
      'entry-0',
      'entry-1',
      'entry-2',
      'entry-3',
      'entry-4',
    ])
  })

  it('never includes future entries in trail coordinates', () => {
    const entries = createEntries(10)

    const trailGeoJSON = buildTrailGeoJSON(entries, 5)
    const coordinates = trailGeoJSON.features[0].geometry.coordinates

    expect(coordinates).toEqual([
      [23, 37],
      [23.1, 37.1],
      [23.2, 37.2],
      [23.3, 37.3],
      [23.4, 37.4],
      [23.5, 37.5],
    ])
    expect(coordinates.some(([longitude]) => longitude > 23.5)).toBe(false)
  })

  it('assigns decreasing opacity from newest to oldest point', () => {
    const entries = createEntries(10)

    const stopPointsGeoJSON = buildStopPointsGeoJSON(entries, 8)
    const opacities = stopPointsGeoJSON.features.map((feature) => feature.properties.ageOpacity)

    expect(opacities).toHaveLength(7)
    expect(opacities[0]).toBeLessThan(opacities[1])
    expect(opacities[1]).toBeLessThan(opacities[2])
    expect(opacities[2]).toBeLessThan(opacities[3])
    expect(opacities[3]).toBeLessThan(opacities[4])
    expect(opacities[4]).toBeLessThan(opacities[5])
    expect(opacities[5]).toBeLessThan(opacities[6])
    expect(opacities[0]).toBeLessThan(opacities[6])
  })
})
