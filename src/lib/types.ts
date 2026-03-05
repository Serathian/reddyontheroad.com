// ─── CMS types — import from shared package, do not redefine ────────────────
export type {
  Media,
  Author,
  Tag,
  RotrPost,
  RotrLocation,
} from '@basecamp-cms/basecamp-cms-types'

// ─── Derived union types (not separately exported by the package) ────────────
export type PlaceType = 'city' | 'town' | 'village' | 'beach' | 'mountain' | 'park' | 'landmark' | 'accommodation' | 'restaurant' | 'other'
export type MarkerType = 'hotel' | 'hostel' | 'airbnb' | 'camp' | 'parking' | 'city-stop' | 'viewpoint' | 'beach' | 'restaurant' | 'other'
export type PostType = 'story' | 'guide' | 'tips' | 'listicle'
export type PostStatus = 'draft' | 'published' | 'archived'

// ─── Types that only exist on the frontend (not in Payload schema) ───────────

import type { RotrLocation } from '@basecamp-cms/basecamp-cms-types'

export interface RotrLocationStop {
  location: RotrLocation | number
  visit_date?: string | null
  id?: string | null
}

// ─── Payload REST API envelope ────────────────────────────────────────────────

export interface PayloadListResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

// ─── Map types ────────────────────────────────────────────────────────────────

export interface MapCoord {
  lng: number
  lat: number
}
