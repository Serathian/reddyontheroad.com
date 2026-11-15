import { describe, it, expect } from 'vitest'
import { isDailyEntry, type DailyEntry } from '@/lib/types'
import { validateGPSCoordinate } from '@/lib/validators'

describe('DailyEntry types', () => {
  it('validates complete daily entry structure', () => {
    const entry: DailyEntry = {
      id: 'entry-001',
      date: '2024-06-15',
      location: 'Santorini, Greece',
      city: 'Santorini',
      country: 'Greece',
      latitude: 36.3932,
      longitude: 25.4615,
      preview: 'Arrived in Santorini and witnessed the legendary sunset at Oia.',
      diary: 'Amazing sunset over the caldera...',
      weather: 'Sunny, 28°C',
      distanceKilometers: 150,
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
      city: 'Athens',
      country: 'Greece',
      latitude: 37.9838,
      longitude: 23.7275,
      preview: 'Early morning at the Acropolis to beat the crowds.',
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
      city: 'Delphi',
      country: 'Greece',
      latitude: 38.4824,
      longitude: 22.5010,
      preview: 'Drove to ancient Delphi, home of the Oracle.',
      diary: 'Oracle and Mountains'
    }
    
    expect(isDailyEntry(minimal)).toBe(true)
  })

  it('validates entry with photos array', () => {
    const entryWithPhotos: DailyEntry = {
      id: 'entry-004',
      date: '2024-06-18',
      location: 'Meteora, Greece',
      city: 'Meteora',
      country: 'Greece',
      latitude: 39.7217,
      longitude: 21.6306,
      preview: 'Visited the cliff-top monasteries of Meteora.',
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

  describe('preview field validation', () => {
    it('rejects entry without preview field', () => {
      const entryWithoutPreview = {
        id: 'entry-005',
        date: '2024-06-19',
        location: 'Thessaloniki, Greece',
        latitude: 40.6401,
        longitude: 22.9444,
        diary: 'Exploring the waterfront...'
      }
      
      expect(isDailyEntry(entryWithoutPreview)).toBe(false)
    })

    it('accepts valid entry with preview field', () => {
      const entryWithPreview = {
        id: 'entry-006',
        date: '2024-06-20',
        location: 'Olympus, Greece',
        latitude: 40.0853,
        longitude: 22.3586,
        preview: 'Hiked the trails of Mount Olympus, home of the ancient gods.',
        diary: 'Started early morning hike up Mount Olympus. The trail winds through forests and rocky terrain...'
      }
      
      expect(isDailyEntry(entryWithPreview)).toBe(true)
      if (isDailyEntry(entryWithPreview)) {
        expect(typeof entryWithPreview.preview).toBe('string')
      }
    })

    it('requires preview to be a string (not optional)', () => {
      const entryWithNullPreview = {
        id: 'entry-007',
        date: '2024-06-21',
        location: 'Vergina, Greece',
        latitude: 40.4840,
        longitude: 22.3176,
        preview: null,
        diary: 'Visited the royal tombs at Vergina.'
      }
      
      expect(isDailyEntry(entryWithNullPreview)).toBe(false)
    })
  })
})
