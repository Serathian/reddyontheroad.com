import type { RotrPost, RotrLocation, RotrLocationStop } from '$lib/types'

/**
 * Extract route coordinates from an array of posts.
 * Returns pairs in [longitude, latitude] order as required by MapLibre GL JS / GeoJSON.
 * Posts without coordinates are filtered out.
 */
export function getRouteCoords(posts: RotrPost[]): [number, number][] {
  return posts
    .filter((p) => p.latitude != null && p.longitude != null)
    .map((p) => [p.longitude!, p.latitude!])
}

/**
 * Convert a resolved RotrLocation to a MapLibre-compatible [longitude, latitude] pair.
 */
export function locationToLngLat(loc: RotrLocation): [number, number] {
  return [loc.longitude, loc.latitude]
}

/**
 * From a list of location stops, return only those whose `location` field has
 * been populated (i.e. is a RotrLocation object, not a bare numeric ID).
 */
export function getResolvedLocations(stops: RotrLocationStop[]): RotrLocation[] {
  return stops
    .map((s) => s.location)
    .filter((loc): loc is RotrLocation => typeof loc === 'object')
}
