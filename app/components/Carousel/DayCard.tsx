'use client'

import { forwardRef } from 'react'
import type { DailyEntry } from '@/lib/types'
import styles from './DayCard.module.css'

interface DayCardProps {
  entry: DailyEntry
  isActive: boolean
  onOpen?: () => void
}

function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const DayCard = forwardRef<HTMLElement, DayCardProps>(
  ({ entry, isActive, onOpen }, ref) => {
    return (
      <article
        ref={ref}
        data-id={entry.id}
        data-active={isActive}
        className={styles.card}
      >
        <time className={styles.date}>{formatDate(entry.date)}</time>
        <h3 className={styles.location}>{entry.location}</h3>
        <p className={styles.preview}>{entry.preview}</p>
        {isActive && onOpen ? (
          <button type="button" className={styles.openButton} onClick={onOpen}>
            Open full day
          </button>
        ) : null}
      </article>
    )
  }
)

DayCard.displayName = 'DayCard'
