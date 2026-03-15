import { describe, it, expect } from 'vitest'
import { validateGPSCoordinate, parseGPSString, GPS_REGEX } from '@/lib/validators'

describe('validateGPSCoordinate', () => {
  it('validates and normalizes valid coordinates', () => {
    const result = validateGPSCoordinate(40.7128, -74.0060)
    expect(result).toEqual({ latitude: 40.7128, longitude: -74.006 })
  })

  it('rejects latitude out of range (> 90)', () => {
    expect(validateGPSCoordinate(91, -74)).toBeNull()
  })

  it('rejects latitude out of range (< -90)', () => {
    expect(validateGPSCoordinate(-91, -74)).toBeNull()
  })

  it('rejects longitude out of range (> 180)', () => {
    expect(validateGPSCoordinate(40, 181)).toBeNull()
  })

  it('rejects longitude out of range (< -180)', () => {
    expect(validateGPSCoordinate(40, -181)).toBeNull()
  })

  it('rounds excessive precision to 6 decimals', () => {
    const result = validateGPSCoordinate(40.123456789, -74.987654321)
    expect(result).toEqual({ latitude: 40.123457, longitude: -74.987654 })
  })

  it('validates edge case: origin (0, 0)', () => {
    const result = validateGPSCoordinate(0, 0)
    expect(result).toEqual({ latitude: 0, longitude: 0 })
  })

  it('validates edge case: min values (-90, -180)', () => {
    const result = validateGPSCoordinate(-90, -180)
    expect(result).toEqual({ latitude: -90, longitude: -180 })
  })

  it('validates edge case: max values (90, 180)', () => {
    const result = validateGPSCoordinate(90, 180)
    expect(result).toEqual({ latitude: 90, longitude: 180 })
  })
})

describe('GPS_REGEX', () => {
  it('matches valid integer coordinates', () => {
    expect(GPS_REGEX.test('40')).toBe(true)
    expect(GPS_REGEX.test('-74')).toBe(true)
  })

  it('matches valid decimal coordinates', () => {
    expect(GPS_REGEX.test('40.7128')).toBe(true)
    expect(GPS_REGEX.test('-74.0060')).toBe(true)
  })

  it('matches negative zero', () => {
    expect(GPS_REGEX.test('-0')).toBe(true)
  })

  it('rejects non-numeric strings', () => {
    expect(GPS_REGEX.test('abc')).toBe(false)
    expect(GPS_REGEX.test('40.abc')).toBe(false)
  })

  it('rejects multiple decimal points', () => {
    expect(GPS_REGEX.test('40.71.28')).toBe(false)
  })

  it('allows up to 6 decimal places', () => {
    expect(GPS_REGEX.test('40.123456')).toBe(true)
  })
})

describe('parseGPSString', () => {
  it('parses valid coordinate strings', () => {
    const result = parseGPSString('40.7128', '-74.0060')
    expect(result).toEqual({ latitude: 40.7128, longitude: -74.006 })
  })

  it('rejects invalid latitude format', () => {
    expect(parseGPSString('abc', '-74.0060')).toBeNull()
  })

  it('rejects invalid longitude format', () => {
    expect(parseGPSString('40.7128', 'xyz')).toBeNull()
  })

  it('rejects out-of-range coordinates', () => {
    expect(parseGPSString('91', '-74')).toBeNull()
    expect(parseGPSString('40', '181')).toBeNull()
  })

  it('handles string integers', () => {
    const result = parseGPSString('40', '-74')
    expect(result).toEqual({ latitude: 40, longitude: -74 })
  })
})
