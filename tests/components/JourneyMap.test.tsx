import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import type { StyleSpecification } from 'maplibre-gl'
import { mockDailyEntries } from '@/lib/mockData'
import { createCameraSpySet, createMockMapRef } from '@/tests/mocks/mapRuntime'
import { JourneyMap } from '@/app/components/Map/JourneyMap'
import {
  BASEMAP_GLYPHS_URL,
  DEFAULT_BASEMAP_ATTRIBUTION,
  MAP_STYLE_URL_ENV_VAR,
} from '@/app/components/Map/mapContracts'

const mapSpies = createCameraSpySet()
const mapRef = createMockMapRef(mapSpies)

let prefersReducedMotion = false

vi.mock('react-map-gl/maplibre', async () => {
  const React = await import('react')

  const MockMap = React.forwardRef(function MockMap(
    {
      children,
      onLoad,
      ...props
    }: {
      children?: React.ReactNode
      onLoad?: () => void
      [key: string]: unknown
    },
    ref: React.ForwardedRef<unknown>,
  ) {
    React.useImperativeHandle(ref, () => mapRef.current)
    React.useEffect(() => {
      onLoad?.()
    }, [onLoad])

    return (
      <div data-testid="journey-map" data-props={JSON.stringify(props)}>
        {children}
      </div>
    )
  })

  const Source = ({
    id,
    data,
    children,
  }: {
    id?: string
    data?: unknown
    children?: React.ReactNode
  }) => (
    <div data-testid={`source-${String(id)}`} data-features={JSON.stringify(data)}>
      {children}
    </div>
  )

  const Layer = ({ id }: { id?: string }) => <div data-testid={`layer-${String(id)}`} />

  const Marker = ({
    children,
    longitude,
    latitude,
  }: {
    children: React.ReactNode
    longitude: number
    latitude: number
  }) => (
    <div
      data-testid="map-marker"
      data-longitude={String(longitude)}
      data-latitude={String(latitude)}
    >
      {children}
    </div>
  )

  const Popup = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="map-popup">{children}</div>
  )

  const AttributionControl = ({ position, compact }: { position?: string; compact?: boolean }) => (
    <div
      data-testid="map-attribution-control"
      data-position={position}
      data-compact={String(Boolean(compact))}
    />
  )

  return {
    __esModule: true,
    default: MockMap,
    AttributionControl,
    Source,
    Layer,
    Marker,
    Popup,
  }
})

describe('JourneyMap', () => {
  beforeEach(() => {
    mapSpies.stop.mockClear()
    mapSpies.easeTo.mockClear()
    mapSpies.flyTo.mockClear()
    prefersReducedMotion = false

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => {
        const isReducedMotionQuery = query === '(prefers-reduced-motion: reduce)'

        return {
          matches: isReducedMotionQuery ? prefersReducedMotion : false,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        } as unknown as MediaQueryList
      },
    })

    delete process.env[MAP_STYLE_URL_ENV_VAR]
  })

  it('uses the built-in keyless raster StyleSpecification with OpenTopoMap tiles, glyphs, and attribution by default', async () => {
    render(<JourneyMap entries={mockDailyEntries} activeEntryId={mockDailyEntries[2].id} />)

    const map = await screen.findByTestId('journey-map')
    const rawProps = map.getAttribute('data-props') ?? '{}'
    const props = JSON.parse(rawProps) as { mapStyle?: StyleSpecification }
    const topoSource = props.mapStyle?.sources?.['topo-source'] as
      | { type?: string; tiles?: string[]; attribution?: string }
      | undefined

    expect(props.mapStyle?.version).toBe(8)
    expect(props.mapStyle?.glyphs).toBe(BASEMAP_GLYPHS_URL)
    expect(topoSource?.type).toBe('raster')
    expect(topoSource?.tiles?.[0]).toContain('opentopomap.org')
    expect(topoSource?.attribution).toBe(DEFAULT_BASEMAP_ATTRIBUTION)
    expect(rawProps).not.toContain('api.maptiler.com')

    const attributionControl = screen.getByTestId('map-attribution-control')
    expect(attributionControl).toHaveAttribute('data-compact', 'true')
    expect(attributionControl).toHaveAttribute('data-position', 'bottom-left')
  })

  it('resolves map style from NEXT_PUBLIC_MAP_STYLE_URL when provided without requiring an API key', async () => {
    process.env[MAP_STYLE_URL_ENV_VAR] = 'https://tiles.example.org/style.json'

    render(<JourneyMap entries={mockDailyEntries} activeEntryId={mockDailyEntries[2].id} />)

    const map = await screen.findByTestId('journey-map')
    const rawProps = map.getAttribute('data-props') ?? '{}'
    const props = JSON.parse(rawProps) as { mapStyle?: string }

    expect(props.mapStyle).toBe('https://tiles.example.org/style.json')
  })

  it('prefers explicit mapStyle prop over NEXT_PUBLIC_MAP_STYLE_URL and ignores legacy tokens', async () => {
    process.env[MAP_STYLE_URL_ENV_VAR] = 'https://tiles.example.org/env-style.json'

    render(
      <JourneyMap
        entries={mockDailyEntries}
        activeEntryId={mockDailyEntries[2].id}
        mapStyle="https://tiles.example.org/prop-style.json"
        {...({ mapboxAccessToken: 'legacy-mapbox-token' } as unknown as object)}
      />,
    )

    const map = await screen.findByTestId('journey-map')
    const rawProps = map.getAttribute('data-props') ?? '{}'
    const props = JSON.parse(rawProps) as { mapStyle?: string }

    expect(props.mapStyle).toBe('https://tiles.example.org/prop-style.json')
    expect(rawProps).not.toContain('legacy-mapbox-token')
  })

  it('coordinate-aware current marker uses active entry coordinates', async () => {
    const { container } = render(
      <JourneyMap entries={mockDailyEntries} activeEntryId={mockDailyEntries[2].id} />,
    )

    const current = await screen.findByRole('button', { name: /current location/i })
    const pastStops = container.querySelectorAll('[data-testid="past-stop"]')

    expect(current).toHaveAttribute('data-state', 'current')
    expect(current).toHaveAttribute('data-animated', 'true')
    expect(current.parentElement).toHaveAttribute(
      'data-longitude',
      String(mockDailyEntries[2].longitude),
    )
    expect(current.parentElement).toHaveAttribute(
      'data-latitude',
      String(mockDailyEntries[2].latitude),
    )
    expect(pastStops.length).toBeGreaterThan(0)
    expect(pastStops[0]).toHaveAttribute('data-state', 'past')
  })

  it('coordinate-aware reduced-motion current marker keeps coordinates and disables animation', async () => {
    prefersReducedMotion = true

    render(<JourneyMap entries={mockDailyEntries} activeEntryId={mockDailyEntries[2].id} />)

    const current = await screen.findByRole('button', { name: /current location/i })
    expect(current).toHaveAttribute('data-animated', 'false')
    expect(current).toHaveAttribute('data-emphasis', 'static')
    expect(current.parentElement).toHaveAttribute(
      'data-longitude',
      String(mockDailyEntries[2].longitude),
    )
    expect(current.parentElement).toHaveAttribute(
      'data-latitude',
      String(mockDailyEntries[2].latitude),
    )
  })

  it('coordinate-aware past stops also receive marker longitude/latitude props', async () => {
    const { container } = render(
      <JourneyMap entries={mockDailyEntries} activeEntryId={mockDailyEntries[2].id} />,
    )

    const pastStops = await waitFor(() => container.querySelectorAll('[data-testid="past-stop"]'))
    expect(pastStops.length).toBeGreaterThan(0)

    const firstPast = pastStops[0]
    const firstPastCoordinates = [mockDailyEntries[0].longitude, mockDailyEntries[0].latitude]

    expect(firstPast.parentElement).toHaveAttribute('data-longitude', String(firstPastCoordinates[0]))
    expect(firstPast.parentElement).toHaveAttribute('data-latitude', String(firstPastCoordinates[1]))
  })

  it('coordinate-aware marker rendering avoids CSS pixel translate positioning', async () => {
    render(<JourneyMap entries={mockDailyEntries} activeEntryId={mockDailyEntries[2].id} />)

    const current = await screen.findByRole('button', { name: /current location/i })
    expect(current.getAttribute('style') ?? '').not.toContain('translate(')
  })

  it('stops current camera transition before issuing the next command', async () => {
    const { rerender } = render(
      <JourneyMap entries={mockDailyEntries} activeEntryId={mockDailyEntries[0].id} />,
    )

    rerender(<JourneyMap entries={mockDailyEntries} activeEntryId={mockDailyEntries[1].id} />)

    await waitFor(() => {
      expect(mapSpies.stop).toHaveBeenCalled()
      expect(mapSpies.flyTo).toHaveBeenCalled()
    })

    const stopOrder = mapSpies.stop.mock.invocationCallOrder[0]
    const commandOrder = mapSpies.flyTo.mock.invocationCallOrder[0]

    expect(stopOrder).toBeLessThan(commandOrder)
  })

  it('uses pan/ease for nearby moves and fly for larger jumps', async () => {
    const { rerender } = render(
      <JourneyMap entries={mockDailyEntries} activeEntryId={mockDailyEntries[7].id} />,
    )

    rerender(<JourneyMap entries={mockDailyEntries} activeEntryId={mockDailyEntries[8].id} />)

    await waitFor(() => expect(mapSpies.easeTo).toHaveBeenCalled())

    rerender(<JourneyMap entries={mockDailyEntries} activeEntryId={mockDailyEntries[0].id} />)

    await waitFor(() => expect(mapSpies.flyTo).toHaveBeenCalled())

    expect(mapSpies.easeTo).toHaveBeenCalledWith(
      expect.objectContaining({ duration: 1200 }),
    )
    expect(mapSpies.flyTo).toHaveBeenCalledWith(
      expect.objectContaining({ duration: 1500 }),
    )
  })

  it('coalesces camera updates to the latest active target during rapid changes', async () => {
    const { rerender } = render(
      <JourneyMap entries={mockDailyEntries} activeEntryId={mockDailyEntries[0].id} />,
    )

    rerender(<JourneyMap entries={mockDailyEntries} activeEntryId={mockDailyEntries[2].id} />)
    rerender(<JourneyMap entries={mockDailyEntries} activeEntryId={mockDailyEntries[4].id} />)
    rerender(<JourneyMap entries={mockDailyEntries} activeEntryId={mockDailyEntries[7].id} />)

    await waitFor(() => expect(mapSpies.flyTo).toHaveBeenCalled())

    const latestCenter = [mockDailyEntries[7].longitude, mockDailyEntries[7].latitude]
    const lastFlyCall = mapSpies.flyTo.mock.calls.at(-1)?.[0] as { center?: [number, number] }

    expect(lastFlyCall.center).toEqual(latestCenter)
  })

  it('renders a trailing path context for recent journey entries', async () => {
    render(<JourneyMap entries={mockDailyEntries} activeEntryId={mockDailyEntries[7].id} />)

    const trailSource = await screen.findByTestId('source-journey-trail')
    const trailData = JSON.parse(trailSource.getAttribute('data-features') || '{}') as {
      features?: [{ properties?: { pointCount?: number } }]
    }

    expect(trailData.features?.[0]?.properties?.pointCount).toBe(7)
  })

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
