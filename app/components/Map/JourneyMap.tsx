'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import Map, { Layer, Marker, Popup, Source, type MapRef } from 'react-map-gl/maplibre'
import type { DailyEntry } from '@/lib/types'
import { buildStopPointsGeoJSON, buildTrailGeoJSON } from '@/lib/mapData'
import {
  buildMapTilerStyleUrl,
  CAMERA_DURATION_MS,
  CAMERA_STABLE_ZOOM,
  JourneyMapProps,
  MAPTILER_API_KEY_ENV_VAR,
  NEAR_DISTANCE_SUBTLE_PAN_THRESHOLD_KM,
} from './mapContracts'
import { currentStopLayer, pastStopsLayer, trailLineLayer } from './mapLayers'
import styles from './JourneyMap.module.css'

function distanceKm(a: DailyEntry, b: DailyEntry): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const earthRadiusKm = 6371
  const dLat = toRad(b.latitude - a.latitude)
  const dLon = toRad(b.longitude - a.longitude)
  const lat1 = toRad(a.latitude)
  const lat2 = toRad(b.latitude)

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2

  return 2 * earthRadiusKm * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))
}

function useReducedMotionPreference() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(media.matches)
    sync()

    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  return reducedMotion
}

function useIsMobileViewport() {
  const [isMobileViewport, setIsMobileViewport] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateViewport = () => setIsMobileViewport(window.innerWidth <= 768)
    updateViewport()

    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  return isMobileViewport
}

export function JourneyMap({ entries, activeEntryId, mapApiKey, mapboxAccessToken }: JourneyMapProps) {
  const mapRef = useRef<MapRef>(null)
  const [popupEntryId, setPopupEntryId] = useState<string | null>(null)
  const reducedMotion = useReducedMotionPreference()
  const isMobileViewport = useIsMobileViewport()

  const activeIndex = useMemo(
    () => Math.max(0, entries.findIndex((entry) => entry.id === activeEntryId)),
    [entries, activeEntryId],
  )

  const activeEntry = entries[activeIndex]
  const previousEntryRef = useRef<DailyEntry | null>(null)

  const trailGeoJSON = useMemo(
    () => buildTrailGeoJSON(entries, activeIndex),
    [entries, activeIndex],
  )

  const stopPointsGeoJSON = useMemo(
    () => buildStopPointsGeoJSON(entries, activeIndex),
    [entries, activeIndex],
  )

  const resolveMapHandle = () => {
    const candidate = mapRef.current as unknown as
      | (MapRef & { current?: MapRef })
      | null
      | undefined

    return candidate?.current ?? candidate ?? null
  }

  useEffect(() => {
    const mapHandle = resolveMapHandle()

    if (!activeEntry || !mapHandle) {
      previousEntryRef.current = activeEntry ?? null
      return
    }

    const previousEntry = previousEntryRef.current
    if (!previousEntry || previousEntry.id === activeEntry.id) {
      previousEntryRef.current = activeEntry
      return
    }

    mapHandle.stop()

    const center: [number, number] = [activeEntry.longitude, activeEntry.latitude]
    const nearMove = distanceKm(previousEntry, activeEntry) < NEAR_DISTANCE_SUBTLE_PAN_THRESHOLD_KM

    if (nearMove) {
      mapHandle.easeTo({
        center,
        duration: CAMERA_DURATION_MS.pan,
        zoom: CAMERA_STABLE_ZOOM.preferred,
        essential: true,
      })
    } else {
      mapHandle.flyTo({
        center,
        duration: CAMERA_DURATION_MS.fly,
        zoom: CAMERA_STABLE_ZOOM.preferred,
        essential: true,
      })
    }

    previousEntryRef.current = activeEntry
  }, [activeEntry])

  useEffect(() => {
    setPopupEntryId(null)
  }, [activeEntryId])

  if (!activeEntry) return null

  const popupEntry = popupEntryId
    ? entries.find((entry) => entry.id === popupEntryId) ?? null
    : null

  const resolvedMapApiKey = mapApiKey ?? mapboxAccessToken ?? process.env[MAPTILER_API_KEY_ENV_VAR] ?? ''
  const mapStyle = buildMapTilerStyleUrl(resolvedMapApiKey)

  return (
    <div className={styles.container}>
      <Map
        ref={mapRef}
        mapLib={maplibregl}
        reuseMaps
        mapStyle={mapStyle}
        initialViewState={{
          longitude: activeEntry.longitude,
          latitude: activeEntry.latitude,
          zoom: CAMERA_STABLE_ZOOM.preferred,
        }}
        attributionControl={false}
        logoPosition="bottom-right"
        style={{ width: '100%', height: '100%' }}
      >
        <Source id="journey-trail" type="geojson" data={trailGeoJSON}>
          <Layer {...trailLineLayer} />
        </Source>

        <Source id="journey-stops" type="geojson" data={stopPointsGeoJSON}>
          <Layer {...pastStopsLayer} />
          <Layer {...currentStopLayer} />
        </Source>

        {stopPointsGeoJSON.features.map((feature) => {
          const [longitude, latitude] = feature.geometry.coordinates
          const id = feature.properties.id
          const isCurrent = feature.properties.isCurrent

          if (!isCurrent && isMobileViewport) {
            return null
          }

          return (
            <Marker key={id} longitude={longitude} latitude={latitude} anchor="center">
              <button
                type="button"
                className={`${styles.marker} ${isCurrent ? styles.currentMarker : styles.pastMarker} ${
                  isCurrent && !reducedMotion ? styles.currentMarkerAnimated : ''
                }`}
                data-testid={isCurrent ? 'current-stop' : 'past-stop'}
                data-state={isCurrent ? 'current' : 'past'}
                data-animated={isCurrent && !reducedMotion ? 'true' : 'false'}
                data-emphasis={isCurrent ? 'static' : 'muted'}
                aria-label={isCurrent ? 'Current location' : 'Past stop'}
                onClick={() => setPopupEntryId(id)}
                style={{ opacity: isCurrent ? 1 : feature.properties.ageOpacity }}
              />
            </Marker>
          )
        })}

        {popupEntry && (
          <Popup
            longitude={popupEntry.longitude}
            latitude={popupEntry.latitude}
            onClose={() => setPopupEntryId(null)}
            closeButton
            closeOnClick={false}
            anchor="top"
          >
            <p className={styles.popup}>
              <strong>{popupEntry.location}</strong>
              {popupEntry.date}
            </p>
          </Popup>
        )}
      </Map>

      <span className={styles.mobileHint} aria-hidden>
        Tap markers for details
      </span>
    </div>
  )
}
