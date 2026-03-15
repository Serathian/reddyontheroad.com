// lib/mockData.ts
import { DailyEntry } from './types'

export const mockDailyEntries: DailyEntry[] = [
  {
    id: 'entry-001',
    date: '2024-06-15',
    location: 'Santorini, Greece',
    latitude: 36.3932,
    longitude: 25.4615,
    diary: `# Sunset at Oia

Arrived in Santorini this morning. The famous blue-domed churches are even more stunning in person. Spent the afternoon exploring the narrow streets of Oia, getting lost in the maze of white-washed buildings.

Evening brought the legendary sunset. Hundreds of tourists gathered, but somehow it felt intimate. The sun melted into the Aegean, painting everything gold and orange. The caldera below turned deep blue.

Had dinner at a taverna overlooking the sea. Fresh octopus, Greek salad, and local wine. The owner told stories about the island before tourism took over.`,
    weather: 'Sunny, 28°C',
    distanceMiles: 150,
    photos: [
      {
        url: '/photos/santorini-sunset.jpg',
        caption: 'Sunset at Oia',
        alt: 'Golden sunset over white buildings and blue domes'
      }
    ]
  },
  {
    id: 'entry-002',
    date: '2024-06-16',
    location: 'Athens, Greece',
    latitude: 37.9838,
    longitude: 23.7275,
    diary: `# Acropolis Morning

Took the ferry back to Athens. The city feels different from the islands - louder, grittier, more real.

Started early at the Acropolis to beat the crowds and heat. Climbed the marble steps worn smooth by millions of feet. The Parthenon is humbling - how did they build this 2,500 years ago?

The view from the top shows Athens sprawling in every direction, mountains in the distance. You can see why this was the center of the ancient world.

Spent the afternoon in Plaka, the old neighborhood. Got hopelessly lost in the narrow streets. Found a bookshop selling old travel guides from the 1960s. Bought one as a souvenir.`,
    weather: 'Clear, 32°C',
    distanceMiles: 75,
  },
  {
    id: 'entry-003',
    date: '2024-06-17',
    location: 'Delphi, Greece',
    latitude: 38.4824,
    longitude: 22.5010,
    diary: `# Oracle and Mountains

Three-hour bus ride to Delphi through mountain roads. The driver played Greek music the whole way, singing along occasionally.

Delphi sits on the slopes of Mount Parnassus, overlooking a valley of olive groves. Ancient Greeks believed this was the center of the world. Standing here, you understand why.

The archaeological site is massive - theater, temple, treasury buildings. The stadium is at the very top, exhausting climb in the heat. Worth it for the view.

The museum has the bronze charioteer, one of the most beautiful ancient sculptures I've ever seen. His eyes are inlaid with precious stones, lifelike after 2,500 years.

Tomorrow: heading to Meteora to see the cliff-top monasteries.`,
    weather: 'Partly cloudy, 26°C',
    distanceMiles: 110,
    photos: [
      {
        url: '/photos/delphi-temple.jpg',
        caption: 'Temple of Apollo ruins',
        alt: 'Ancient stone columns against mountain backdrop'
      }
    ]
  }
]

// Helper to get entry by ID
export function getEntryById(id: string): DailyEntry | undefined {
  return mockDailyEntries.find(entry => entry.id === id)
}

// Helper to get entries by date range
export function getEntriesByDateRange(startDate: string, endDate: string): DailyEntry[] {
  return mockDailyEntries.filter(entry => 
    entry.date >= startDate && entry.date <= endDate
  )
}

// Helper to get all unique locations
export function getAllLocations(): string[] {
  return [...new Set(mockDailyEntries.map(entry => entry.location))]
}
