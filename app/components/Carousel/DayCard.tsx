'use client'

import { forwardRef, useMemo } from 'react'
import Image from 'next/image'
import type { DailyEntry } from '@/lib/types'
import styles from './DayCard.module.css'

interface DayCardProps {
  entry: DailyEntry
  isActive: boolean
  onOpen?: () => void
  dayNumber?: number
}

function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Icon mapping for different types of entries
const getEntryIcon = (location: string): string => {
  const lower = location.toLowerCase()
  if (lower.includes('park') || lower.includes('nature')) return 'forest'
  if (lower.includes('beach') || lower.includes('ocean')) return 'beach_access'
  if (lower.includes('city') || lower.includes('town')) return 'location_city'
  if (lower.includes('mountain')) return 'landscape'
  return 'explore'
}

export const DayCard = forwardRef<HTMLElement, DayCardProps>(
  ({ entry, isActive, onOpen, dayNumber }, ref) => {
    // Determine rotation class (alternating pattern)
    const rotationClass = useMemo(() => {
      const index = dayNumber || 0
      const rotations = [styles.rotateLeft, styles.rotateRight, styles.rotateRight, styles.rotateLeft]
      return rotations[index % rotations.length]
    }, [dayNumber])

    // Determine tape position (alternating pattern)
    const tapeClass = useMemo(() => {
      const index = dayNumber || 0
      const tapes = [styles.tapeLeft, styles.tapeCenter, styles.tapeRight, styles.tapeCenter]
      return tapes[index % tapes.length]
    }, [dayNumber])

    const icon = getEntryIcon(entry.location)
    const firstPhoto = entry.photos?.[0]

    return (
      <article
        ref={ref}
        data-id={entry.id}
        data-active={isActive}
        className={`${styles.card} ${rotationClass} ${tapeClass}`}
      >
        {/* Day Number Badge */}
        {dayNumber !== undefined && (
          <div className={styles.dayBadge}>Day {dayNumber}</div>
        )}

        {/* Card Header */}
        <div className={styles.header}>
          <div className={styles.headerText}>
            <h3 className={styles.location}>{entry.location}</h3>
            <time className={styles.date}>{formatDate(entry.date)}</time>
          </div>
          <span className={`material-symbols-rounded ${styles.icon}`}>
            {icon}
          </span>
        </div>

        {/* Photo (if available) */}
        {firstPhoto && (
          <div className={styles.photoContainer}>
            <Image
              src={firstPhoto.url}
              alt={firstPhoto.caption || entry.location}
              width={380}
              height={280}
              className={styles.photo}
            />
            <div className={styles.locationBadge}>
              <span className="material-symbols-rounded">location_on</span>
              {entry.location}
            </div>
          </div>
        )}

        {/* Story Preview */}
        <p className={styles.preview}>{entry.preview}</p>

        {/* Read More Link */}
        {isActive && onOpen && (
          <button type="button" className={styles.readMore} onClick={onOpen}>
            <span>Read more</span>
            <span className="material-symbols-rounded">arrow_forward</span>
          </button>
        )}
      </article>
    )
  }
)

DayCard.displayName = 'DayCard'
