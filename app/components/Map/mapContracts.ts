import type { StyleSpecification } from 'maplibre-gl'
import type { DailyEntry } from '@/lib/types'

export const MAP_STYLE_URL_ENV_VAR = 'NEXT_PUBLIC_MAP_STYLE_URL' as const
export const BASEMAP_GLYPHS_URL = 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf' as const

export const DEFAULT_BASEMAP_TILES = [
  'https://a.tile.opentopomap.org/{z}/{x}/{y}.png',
  'https://b.tile.opentopomap.org/{z}/{x}/{y}.png',
  'https://c.tile.opentopomap.org/{z}/{x}/{y}.png',
] as const

export const DEFAULT_BASEMAP_ATTRIBUTION = '© OpenStreetMap contributors, OpenTopoMap' as const

export function buildDefaultBasemapStyle(): StyleSpecification {
  return {
    version: 8,
    glyphs: BASEMAP_GLYPHS_URL,
    sources: {
      'topo-source': {
        type: 'raster',
        tiles: [...DEFAULT_BASEMAP_TILES],
        tileSize: 256,
        attribution: DEFAULT_BASEMAP_ATTRIBUTION,
      },
    },
    layers: [
      {
        id: 'topo-layer',
        type: 'raster',
        source: 'topo-source',
        minzoom: 0,
        maxzoom: 18,
        paint: {
          'raster-opacity': 0.92,
          'raster-saturation': -0.3,
          'raster-contrast': 0.15,
        },
      },
    ],
  }
}

export const DEFAULT_BASEMAP_STYLE: StyleSpecification = buildDefaultBasemapStyle()

export function resolveMapStyle(
  overrideStyle?: string | StyleSpecification,
): string | StyleSpecification {
  if (typeof overrideStyle === 'string') {
    const trimmed = overrideStyle.trim()
    if (trimmed.length > 0) {
      return trimmed
    }
  } else if (overrideStyle && typeof overrideStyle === 'object') {
    return overrideStyle
  }

  const envStyleUrl = process.env[MAP_STYLE_URL_ENV_VAR]?.trim()
  if (envStyleUrl) {
    return envStyleUrl
  }

  return DEFAULT_BASEMAP_STYLE
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
   * Optional custom MapLibre style URL or StyleSpecification overriding NEXT_PUBLIC_MAP_STYLE_URL and the default keyless raster style.
   */
  mapStyle?: string | StyleSpecification
  /**
   * Optional callback emitted after camera transition settles.
   */
  onCameraSettled?: (entryId: DailyEntry['id'], mode: CameraTransitionMode) => void
}
