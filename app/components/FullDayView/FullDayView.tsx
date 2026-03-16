'use client'

import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { DailyEntry } from '@/lib/types'
import { shufflePhotosForDay } from '@/lib/richContent/photoShuffle'
import { PhotoCollage } from '@/app/components/PhotoCollage/PhotoCollage'
import styles from './FullDayView.module.css'

interface FullDayViewProps {
  entry: DailyEntry
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function FullDayView({ entry }: FullDayViewProps) {
  const shuffledPhotos = shufflePhotosForDay(entry.id, entry.photos)

  return (
    <article className={styles.container} aria-label="Full day entry">
      <header className={styles.header}>
        <time className={styles.date}>{formatDate(entry.date)}</time>
        <h2 className={styles.location}>{entry.location}</h2>

        {(entry.weather || typeof entry.distanceMiles === 'number') ? (
          <div className={styles.metaChips}>
            {entry.weather ? <span className={styles.chip}>{entry.weather}</span> : null}
            {typeof entry.distanceMiles === 'number' ? (
              <span className={styles.chip}>{entry.distanceMiles} miles</span>
            ) : null}
          </div>
        ) : null}
      </header>

      <section className={styles.diary} aria-label="Diary">
        <Markdown remarkPlugins={[remarkGfm]}>{entry.diary}</Markdown>
      </section>

      <section className={styles.photos} aria-label="Photos">
        <PhotoCollage photos={shuffledPhotos} />
      </section>
    </article>
  )
}
