'use client'

import type { MapRef } from 'react-map-gl/maplibre'
import styles from './ZoomControls.module.css'

interface ZoomControlsProps {
  mapRef: React.RefObject<MapRef | null>
}

export function ZoomControls({ mapRef }: ZoomControlsProps) {
  const handleZoomIn = () => {
    const mapHandle = mapRef.current as unknown as
      | (MapRef & { current?: MapRef })
      | null
      | undefined

    const map = mapHandle?.current ?? mapHandle ?? null
    map?.getMap().zoomIn()
  }

  const handleZoomOut = () => {
    const mapHandle = mapRef.current as unknown as
      | (MapRef & { current?: MapRef })
      | null
      | undefined

    const map = mapHandle?.current ?? mapHandle ?? null
    map?.getMap().zoomOut()
  }

  return (
    <div className={styles.controls}>
      <button
        type="button"
        className={styles.zoomButton}
        onClick={handleZoomIn}
        aria-label="Zoom in"
        title="Zoom in"
      >
        <span className="material-symbols-rounded" aria-hidden="true">
          add
        </span>
      </button>
      <button
        type="button"
        className={styles.zoomButton}
        onClick={handleZoomOut}
        aria-label="Zoom out"
        title="Zoom out"
      >
        <span className="material-symbols-rounded" aria-hidden="true">
          remove
        </span>
      </button>
    </div>
  )
}
