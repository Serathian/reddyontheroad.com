import type { DailyEntry } from '@/lib/types'

export const MAPTILER_API_KEY_ENV_VAR = 'NEXT_PUBLIC_MAPTILER_API_KEY' as const
export const MAPTILER_DEFAULT_STYLE_ID = 'streets-v2' as const

export function buildMapTilerStyleUrl(
  apiKey: string,
  styleId: string = MAPTILER_DEFAULT_STYLE_ID,
): string {
  return `https://api.maptiler.com/maps/${styleId}/style.json?key=${apiKey}`
}

/**
 * User-approved camera transition envelope for journal-like motion.
 * Keep map animation timing in the 1200–1600ms range for deliberate movement.
 */
export const CAMERA_DURATION_RANGE_MS = {
  min: 1200,
  preferred: 1400,
  max: 1600,
} as const

export const CAMERA_DURATION_MS = {
  pan: 1200,
  fly: 1500,
} as const

/**
 * Preserve a stable zoom feel as entries advance.
 * Implementations should avoid aggressive zoom jumps between adjacent points.
 */
export const CAMERA_STABLE_ZOOM = {
  preferred: 8.75,
  min: 7.75,
  max: 9.75,
} as const

/**
 * Near-distance updates should use subtle pan behavior instead of dramatic travel.
 * Distances under this threshold should favor a gentle camera ease at stable zoom.
 */
export const NEAR_DISTANCE_SUBTLE_PAN_THRESHOLD_KM = 40

/**
 * Trail context is constrained to the active entry and six predecessors.
 * This locks the visual history to a rolling seven-entry window.
 */
export const TRAIL_WINDOW_SIZE = 7

export type CameraTransitionMode = 'subtle-pan' | 'regional-move' | 'long-hop'

export interface TrailPoint {
  entryId: DailyEntry['id']
  latitude: DailyEntry['latitude']
  longitude: DailyEntry['longitude']
  date: DailyEntry['date']
  isCurrent: boolean
}

export interface JourneyMapProps {
  /**
   * Source entry list used for active point and trail generation.
   */
  entries: DailyEntry[]
  /**
   * Currently selected entry ID from carousel synchronization.
   */
  activeEntryId: DailyEntry['id']
  /**
   * Public provider API key provided via NEXT_PUBLIC_MAPTILER_API_KEY.
   */
  mapApiKey?: string
  /**
   * Optional callback emitted after camera transition settles.
   */
  onCameraSettled?: (entryId: DailyEntry['id'], mode: CameraTransitionMode) => void
}
