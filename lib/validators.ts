/**
 * GPS coordinate validation with industry-standard precision
 * 
 * Precision standard: 5-6 decimal places
 * - 5 decimals = 1.1m accuracy (matches commercial GPS receivers)
 * - 6 decimals = 0.11m accuracy
 * - 7+ decimals exceed GPS hardware capability (<10mm) and waste storage
 * 
 * Source: coordinate-converter.com industry standard
 */

export interface GPSCoordinate {
  latitude: number
  longitude: number
}

/**
 * Validates and normalizes GPS coordinates with 6 decimal precision
 * @param lat - Latitude (-90 to 90)
 * @param lng - Longitude (-180 to 180)
 * @returns Normalized coordinate or null if invalid
 */
export function validateGPSCoordinate(
  lat: number,
  lng: number
): GPSCoordinate | null {
  // Validate ranges
  if (lat < -90 || lat > 90) return null
  if (lng < -180 || lng > 180) return null
  
  // Round to 6 decimal places (0.11m precision)
  const latitude = Math.round(lat * 1000000) / 1000000
  const longitude = Math.round(lng * 1000000) / 1000000
  
  return { latitude, longitude }
}

/**
 * Regex for validating GPS coordinate strings
 * Allows: -123.456789, 0, 90, -180.123456
 * Rejects: abc, 123.123.123, 91.0 (range validation happens in validateGPSCoordinate)
 */
export const GPS_REGEX = /^-?\d{1,3}(\.\d{1,6})?$/

/**
 * Parses GPS coordinate strings and validates
 * @param latStr - Latitude string
 * @param lngStr - Longitude string
 * @returns Validated coordinate or null if invalid format/range
 */
export function parseGPSString(
  latStr: string,
  lngStr: string
): GPSCoordinate | null {
  if (!GPS_REGEX.test(latStr) || !GPS_REGEX.test(lngStr)) {
    return null
  }
  
  const lat = parseFloat(latStr)
  const lng = parseFloat(lngStr)
  
  return validateGPSCoordinate(lat, lng)
}
