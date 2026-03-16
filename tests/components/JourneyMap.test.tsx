import { describe, it, expect } from 'vitest'
import { createCameraSpySet, createMockMapRef } from '@/tests/mocks/mapbox'

describe('JourneyMap', () => {
  it.todo('renders current location marker from selected DailyEntry')
  it.todo('coalesces camera updates when active day changes quickly')
  it.todo('emphasizes the current marker over trailing points')
  it.todo('renders a trailing path context for recent journey entries')

  it('provides deterministic camera spies for future map assertions', () => {
    const spies = createCameraSpySet()
    const mapRef = createMockMapRef(spies)

    mapRef.current.stop()
    mapRef.current.easeTo({ duration: 1400, zoom: 8.5 })
    mapRef.current.flyTo({ duration: 1500, center: [23.727539, 37.983716] })

    expect(spies.stop).toHaveBeenCalledTimes(1)
    expect(spies.easeTo).toHaveBeenCalledWith({ duration: 1400, zoom: 8.5 })
    expect(spies.flyTo).toHaveBeenCalledWith({ duration: 1500, center: [23.727539, 37.983716] })
  })
})
