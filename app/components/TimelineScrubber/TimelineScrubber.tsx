'use client'

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import type { DailyEntry } from '@/lib/types'
import styles from './TimelineScrubber.module.css'

interface TimelineScrubberProps {
  entries: DailyEntry[]
  activeIndex: number
  onDayChange: (index: number) => void
}

function clamp(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) {
    return min
  }

  return Math.max(min, Math.min(max, value))
}

function buildAnnouncement(entries: DailyEntry[], index: number): string {
  const entry = entries[index] ?? entries[0]
  if (!entry) {
    return 'Day 0 of 0'
  }

  const date = new Date(entry.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return `Day ${index + 1} of ${entries.length}: ${date}, ${entry.location}`
}

function buildDayCountLabel(total: number, index: number): string {
  return `Day ${index + 1} of ${total}`
}

export function TimelineScrubber({ entries, activeIndex, onDayChange }: TimelineScrubberProps) {
  const maxIndex = Math.max(0, entries.length - 1)
  const safeIndex = clamp(activeIndex, 0, maxIndex)
  const [draftValue, setDraftValue] = useState<number>(safeIndex)
  const [isInteracting, setIsInteracting] = useState(false)
  const isInteractingRef = useRef(false)
  const draftValueRef = useRef<number>(safeIndex)
  const draftIndex = clamp(Math.round(draftValue), 0, maxIndex)

  useEffect(() => {
    if (isInteractingRef.current) {
      return
    }

    setDraftValue(safeIndex)
    draftValueRef.current = safeIndex
  }, [safeIndex])

  const announcement = useMemo(() => buildAnnouncement(entries, draftIndex), [entries, draftIndex])
  const dayCountLabel = useMemo(
    () => buildDayCountLabel(entries.length, draftIndex),
    [entries.length, draftIndex],
  )
  const thumbPercent = maxIndex > 0 ? (draftValue / maxIndex) * 100 : 0

  const handleInput = (value: number) => {
    isInteractingRef.current = true
    setIsInteracting(true)
    setDraftValue(value)
    draftValueRef.current = value
  }

  const commitDraft = (value?: number) => {
    const source = value ?? draftValueRef.current
    const snapped = clamp(Math.round(source), 0, maxIndex)
    if (!isInteracting && snapped === safeIndex) {
      return
    }

    setDraftValue(snapped)
    draftValueRef.current = snapped
    isInteractingRef.current = false
    setIsInteracting(false)
    onDayChange(snapped)
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowRight' && event.key !== 'ArrowDown' && event.key !== 'ArrowLeft') {
      return
    }

    event.preventDefault()
    isInteractingRef.current = true
    setIsInteracting(true)

    const delta = event.key === 'ArrowUp' || event.key === 'ArrowRight' ? -1 : 1
    const next = clamp(Math.round(draftValue) + delta, 0, maxIndex)
    setDraftValue(next)
    draftValueRef.current = next
  }

  const handleKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowRight' && event.key !== 'ArrowDown' && event.key !== 'ArrowLeft') {
      return
    }

    commitDraft()
  }

  if (entries.length === 0) {
    return null
  }

  return (
    <div
      className={`${styles.scrubber} ${isInteracting ? styles.interacting : ''}`.trim()}
      style={{ '--thumb-percent': `${thumbPercent}%` } as CSSProperties}
    >
      <label className={styles.srOnly} htmlFor="journey-timeline-range">
        Journey timeline
      </label>
      <span
        className={styles.motorhomeIcon}
        data-testid="timeline-motorhome-icon"
        data-icon="motorhome"
        aria-hidden="true"
      >
        🚐
      </span>
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
        onPointerDown={() => {
          isInteractingRef.current = true
          setIsInteracting(true)
        }}
        onPointerUp={(event) => commitDraft(Number(event.currentTarget.value))}
        onPointerCancel={() => commitDraft()}
        onMouseUp={(event) => commitDraft(Number(event.currentTarget.value))}
        onTouchEnd={(event) => commitDraft(Number(event.currentTarget.value))}
        onBlur={() => commitDraft()}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      />
      <p className={styles.preview} data-testid="timeline-preview" aria-hidden="true">
        {dayCountLabel}
      </p>
      <p className={styles.srOnly} aria-live="polite">
        {announcement}
      </p>
    </div>
  )
}
