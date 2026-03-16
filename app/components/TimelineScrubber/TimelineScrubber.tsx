'use client'

import { useEffect, useMemo, useState } from 'react'
import type { DailyEntry } from '@/lib/types'
import styles from './TimelineScrubber.module.css'

interface TimelineScrubberProps {
  entries: DailyEntry[]
  activeIndex: number
  onDayChange: (index: number) => void
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

function buildAnnouncement(entries: DailyEntry[], index: number): string {
  const entry = entries[index]
  const date = new Date(entry.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return `Day ${index + 1} of ${entries.length}: ${date}, ${entry.location}`
}

export function TimelineScrubber({ entries, activeIndex, onDayChange }: TimelineScrubberProps) {
  const maxIndex = Math.max(0, entries.length - 1)
  const safeIndex = clamp(activeIndex, 0, maxIndex)
  const [draftValue, setDraftValue] = useState<number>(safeIndex)

  useEffect(() => {
    setDraftValue(safeIndex)
  }, [safeIndex])

  const announcement = useMemo(() => buildAnnouncement(entries, safeIndex), [entries, safeIndex])

  const handleInput = (value: number) => {
    setDraftValue(value)
    onDayChange(clamp(Math.round(value), 0, maxIndex))
  }

  const snapToNearestDay = () => {
    const snapped = clamp(Math.round(draftValue), 0, maxIndex)
    setDraftValue(snapped)
    onDayChange(snapped)
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowRight' && event.key !== 'ArrowDown' && event.key !== 'ArrowLeft') {
      return
    }

    event.preventDefault()

    const delta = event.key === 'ArrowUp' || event.key === 'ArrowRight' ? 1 : -1
    const next = clamp(safeIndex + delta, 0, maxIndex)
    setDraftValue(next)
    onDayChange(next)
  }

  if (entries.length === 0) {
    return null
  }

  return (
    <div className={styles.scrubber}>
      <label className={styles.srOnly} htmlFor="journey-timeline-range">
        Journey timeline
      </label>
      <input
        id="journey-timeline-range"
        className={styles.range}
        type="range"
        min={0}
        max={maxIndex}
        step={0.1}
        value={draftValue}
        aria-label="Journey timeline"
        aria-valuetext={announcement}
        onInput={(event) => handleInput(Number(event.currentTarget.value))}
        onChange={(event) => handleInput(Number(event.currentTarget.value))}
        onMouseUp={snapToNearestDay}
        onTouchEnd={snapToNearestDay}
        onKeyDown={handleKeyDown}
      />
      <p className={styles.srOnly} aria-live="polite">
        {announcement}
      </p>
    </div>
  )
}
