// lib/types.ts
export interface Photo {
  url: string
  caption?: string
  alt: string
}

export interface DailyEntry {
  id: string
  date: string // ISO 8601 format
  location: string
  latitude: number
  longitude: number
  preview: string // Hand-crafted summary for carousel display (1-2 sentences)
  diary: string
  weather?: string
  distanceMiles?: number
  photos?: Photo[]
}

// Type guard for runtime validation
export function isDailyEntry(obj: unknown): obj is DailyEntry {
  if (typeof obj !== 'object' || obj === null) return false
  const entry = obj as Record<string, unknown>
  
  return (
    typeof entry.id === 'string' &&
    typeof entry.date === 'string' &&
    typeof entry.location === 'string' &&
    typeof entry.latitude === 'number' &&
    typeof entry.longitude === 'number' &&
    typeof entry.preview === 'string' &&
    typeof entry.diary === 'string'
  )
}
