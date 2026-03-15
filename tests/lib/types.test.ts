import { describe, it, expect } from 'vitest'
import { isDailyEntry, type DailyEntry } from '@/lib/types'
import { validateGPSCoordinate } from '@/lib/validators'

describe('DailyEntry types', () => {
  it('validates complete daily entry structure', () => {
    const entry: DailyEntry = {
      id: 'entry-001',
      date: '2024-06-15',
      location: 'Santorini, Greece',
      latitude: 36.3932,
      longitude: 25.4615,
      diary: 'Amazing sunset over the caldera...',
      weather: 'Sunny, 28°C',
      distanceMiles: 150,
      photos: [
        {
          url: '/photos/santorini-sunset.jpg',
          caption: 'Sunset at Oia',
          alt: 'Golden sunset over white buildings'
        }
      ]
    }
    
    expect(isDailyEntry(entry)).toBe(true)
  })
  
  it('validates GPS coordinates are in valid range', () => {
    const entry: DailyEntry = {
      id: 'entry-002',
      date: '2024-06-16',
      location: 'Athens, Greece',
      latitude: 37.9838,
      longitude: 23.7275,
      diary: 'Explored the Acropolis today.',
    }
    
    const gps = validateGPSCoordinate(entry.latitude, entry.longitude)
    expect(gps).not.toBeNull()
    expect(gps?.latitude).toBe(37.9838)
  })
  
  it('rejects invalid entry structure', () => {
    const invalid = {
      id: 'bad',
      // missing required fields
    }
    
    expect(isDailyEntry(invalid)).toBe(false)
  })

  it('accepts entry with minimal required fields', () => {
    const minimal: DailyEntry = {
      id: 'entry-003',
      date: '2024-06-17',
      location: 'Delphi, Greece',
      latitude: 38.4824,
      longitude: 22.5010,
      diary: 'Oracle and Mountains'
    }
    
    expect(isDailyEntry(minimal)).toBe(true)
  })

  it('validates entry with photos array', () => {
    const entryWithPhotos: DailyEntry = {
      id: 'entry-004',
      date: '2024-06-18',
      location: 'Meteora, Greece',
      latitude: 39.7217,
      longitude: 21.6306,
      diary: 'Monasteries on cliff tops',
      photos: [
        {
          url: '/photos/meteora-1.jpg',
          alt: 'Monastery on cliff'
        },
        {
          url: '/photos/meteora-2.jpg',
          caption: 'View from monastery',
          alt: 'Landscape view'
        }
      ]
    }
    
    expect(isDailyEntry(entryWithPhotos)).toBe(true)
  })
})
