// lib/mockData.ts
import { DailyEntry } from './types'

export const mockDailyEntries: DailyEntry[] = [
  {
    id: 'entry-001',
    date: '2024-06-15',
    location: 'Santorini, Greece',
    city: 'Santorini',
    country: 'Greece',
    latitude: 36.3932,
    longitude: 25.4615,
    preview: 'Arrived in Santorini and witnessed the legendary sunset at Oia. The caldera turned deep blue as the sun melted into the Aegean.',
    diary: `# Sunset at Oia

Arrived in Santorini this morning. The famous blue-domed churches are even more stunning in person. Spent the afternoon exploring the narrow streets of Oia, getting lost in the maze of white-washed buildings.

Evening brought the legendary sunset. Hundreds of tourists gathered, but somehow it felt intimate. The sun melted into the Aegean, painting everything gold and orange. The caldera below turned deep blue.

Had dinner at a taverna overlooking the sea. Fresh octopus, Greek salad, and local wine. The owner told stories about the island before tourism took over.`,
    weather: 'Sunny, 28°C',
    distanceKilometers: 241,
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
    city: 'Athens',
    country: 'Greece',
    latitude: 37.9838,
    longitude: 23.7275,
    preview: 'Early morning at the Acropolis to beat the crowds. The Parthenon is humbling — 2,500 years old and still standing.',
    diary: `# Acropolis Morning

Took the ferry back to Athens. The city feels different from the islands - louder, grittier, more real.

Started early at the Acropolis to beat the crowds and heat. Climbed the marble steps worn smooth by millions of feet. The Parthenon is humbling - how did they build this 2,500 years ago?

The view from the top shows Athens sprawling in every direction, mountains in the distance. You can see why this was the center of the ancient world.

Spent the afternoon in Plaka, the old neighborhood. Got hopelessly lost in the narrow streets. Found a bookshop selling old travel guides from the 1960s. Bought one as a souvenir.`,
    weather: 'Clear, 32°C',
    distanceKilometers: 121,
  },
  {
    id: 'entry-003',
    date: '2024-06-17',
    location: 'Delphi, Greece',
    city: 'Delphi',
    country: 'Greece',
    latitude: 38.4824,
    longitude: 22.5010,
    preview: 'Drove to ancient Delphi, home of the Oracle. The mountain sanctuary feels mystical even today.',
    diary: `# Oracle and Mountains

Three-hour bus ride to Delphi through mountain roads. The driver played Greek music the whole way, singing along occasionally.

Delphi sits on the slopes of Mount Parnassus, overlooking a valley of olive groves. Ancient Greeks believed this was the center of the world. Standing here, you understand why.

The archaeological site is massive - theater, temple, treasury buildings. The stadium is at the very top, exhausting climb in the heat. Worth it for the view.

The museum has the bronze charioteer, one of the most beautiful ancient sculptures I've ever seen. His eyes are inlaid with precious stones, lifelike after 2,500 years.

Tomorrow: heading to Meteora to see the cliff-top monasteries.`,
    weather: 'Partly cloudy, 26°C',
    distanceKilometers: 177,
    photos: [
      {
        url: '/photos/delphi-temple.jpg',
        caption: 'Temple of Apollo ruins',
        alt: 'Ancient stone columns against mountain backdrop'
      }
    ]
  },
  {
    id: 'entry-004',
    date: '2024-06-18',
    location: 'Meteora, Greece',
    city: 'Meteora',
    country: 'Greece',
    latitude: 39.7217,
    longitude: 21.6306,
    preview: 'Monasteries perched on impossible rock pillars. Monks built these 600 years ago without modern tools — humbling.',
    diary: `# Monasteries in the Sky

Arrived at Meteora in late afternoon. The rock formations are otherworldly - massive pillars of stone rising from the valley floor.

Climbed to the Great Meteoron monastery at sunset. Six hundred years ago, monks hauled building materials up these cliffs using rope and baskets. The frescoes inside are perfectly preserved.

Met a monk who's lived here for thirty years. He said the hardest part isn't the isolation, it's the tourists. We both laughed. He gave me walnuts from the monastery garden.

The silence at dawn is complete. No cars, no voices, just wind through the rocks and distant bells.`,
    weather: 'Clear, 24°C',
    distanceKilometers: 225,
  },
  {
    id: 'entry-005',
    date: '2024-06-19',
    location: 'Thessaloniki, Greece',
    city: 'Thessaloniki',
    country: 'Greece',
    latitude: 40.6401,
    longitude: 22.9444,
    preview: 'Second city, first impressions. Byzantine walls, Ottoman markets, and the best street food in Greece.',
    diary: `# City of Ghosts

Thessaloniki feels lived-in in a way Athens doesn't. Layers of history stacked on top of each other - Roman ruins, Byzantine churches, Ottoman markets, modern cafes.

Walked the old city walls this morning. The fortifications are massive, built to withstand sieges. You can see the Thermaic Gulf from the towers.

Lunch at Modiano Market. Fresh seafood, spices, olives. Got into a conversation with a fishmonger about the best way to cook sardines. He insisted I try his family recipe.

Evening in Ladadika district. Old warehouse buildings converted to bars and restaurants. Live music spilling into the streets. This city knows how to live.`,
    weather: 'Warm, 29°C',
    distanceKilometers: 314,
    photos: [
      {
        url: '/photos/thessaloniki-walls.jpg',
        caption: 'Byzantine city walls at sunset',
        alt: 'Ancient stone fortifications overlooking the sea'
      }
    ]
  },
  {
    id: 'entry-006',
    date: '2024-06-20',
    location: 'Olympus Base, Greece',
    city: 'Olympus Base',
    country: 'Greece',
    latitude: 40.0855,
    longitude: 22.3583,
    preview: 'Attempted the trail to Mount Olympus. Made it halfway before weather turned. Zeus had other plans.',
    diary: `# Mountain of Gods

Started the hike to Mount Olympus at 6 AM. The goal was the summit at 2,917 meters. The trail begins in thick forest, then opens to alpine meadows.

Made good progress for four hours. The views were spectacular - mountains in every direction, eagles overhead.

Around 2,000 meters the weather changed fast. Clouds rolled in, temperature dropped, wind picked up. Guide said we should turn back. Disappointed but not stupid.

The Greeks built their gods' home on this mountain for a reason. It demands respect.

Spent the evening in Litochoro, the base town. Tomorrow: heading to the peninsula.`,
    weather: 'Started clear, became stormy, 18°C at altitude',
    distanceKilometers: 80,
  },
  {
    id: 'entry-007',
    date: '2024-06-21',
    location: 'Halkidiki Peninsula, Greece',
    city: 'Halkidiki Peninsula',
    country: 'Greece',
    latitude: 40.1411,
    longitude: 23.5528,
    preview: 'Three-fingered peninsula. Turquoise water, pine forests to the beach, and finally some quiet.',
    diary: `# Three Fingers, One Paradise

Halkidiki is shaped like a hand reaching into the Aegean - three peninsulas extending south. Stayed on Kassandra, the westernmost finger.

The beaches here are different from the islands. Pine forests come right down to the sand. The water is so clear you can see fish from the shore.

Rented a small boat for the afternoon. Followed the coastline, stopping at hidden coves. No one around for hours. Swimming in water this blue feels surreal.

Evening in a tiny fishing village. Grilled fish, white wine, conversation with locals about the best diving spots. They invited me back in September when the crowds are gone.`,
    weather: 'Perfect, 27°C',
    distanceKilometers: 137,
    photos: [
      {
        url: '/photos/halkidiki-cove.jpg',
        caption: 'Hidden cove on Kassandra',
        alt: 'Turquoise water and white sand beach surrounded by pines'
      }
    ]
  },
  {
    id: 'entry-008',
    date: '2024-06-22',
    location: 'Crete, Greece',
    city: 'Crete',
    country: 'Greece',
    latitude: 35.2401,
    longitude: 25.1442,
    preview: 'Flew to Crete, largest of the Greek islands. Starting in Heraklion, heading to Knossos tomorrow.',
    diary: `# Island of Legends

Landed in Crete this afternoon. The island is massive - you could spend a month here easily.

Heraklion is rougher than I expected. More port city than tourist town. Walked the Venetian fortress at the harbor. Built in the 1500s, still imposing.

Dinner at a place locals recommended. Real Cretan food - dakos, lamb with stamnagathi, tsikoudia to finish. The owner explained the difference between Cretan and mainland Greek cuisine. It's all about the herbs.

Tomorrow: Knossos and the Palace of Minos. The center of Minoan civilization, older than classical Greece by a thousand years.

Can already tell this island is different. Wilder, more independent. The Cretans have always done things their own way.`,
    weather: 'Hot, 31°C',
    distanceKilometers: 499,
  },
  {
    id: 'entry-009',
    date: '2024-06-23',
    location: 'Knossos, Crete',
    city: 'Knossos',
    country: 'Greece',
    latitude: 35.2979,
    longitude: 25.1632,
    preview: 'Palace of Minos. 4,000 years old. The reconstruction is controversial but gives you a sense of the scale.',
    diary: `# Labyrinth

Knossos is unlike any other ancient site. Part ruin, part reconstruction. Archaeologist Arthur Evans rebuilt sections in the early 1900s - purists hate it, but it helps visualize how it looked.

The palace is a maze. Hundreds of rooms, multiple stories, complex drainage systems. You understand why the Greeks told stories about labyrinths here.

The frescoes are beautiful - dolphins, bulls, priestesses. The famous bull-leaping fresco shows athletes vaulting over charging bulls. Was it sport, ritual, or mythology?

The Minoans had flush toilets and sophisticated plumbing 4,000 years ago. Then their civilization vanished, possibly destroyed by the volcanic eruption at Santorini.

Spent hours wandering the ruins, trying to imagine life here at its height. Tomorrow: Samaria Gorge, one of the longest in Europe.`,
    weather: 'Sunny, 30°C',
    distanceKilometers: 5,
    photos: [
      {
        url: '/photos/knossos-dolphins.jpg',
        caption: 'Dolphin fresco in the Queen\'s chamber',
        alt: 'Ancient fresco showing blue dolphins swimming'
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
