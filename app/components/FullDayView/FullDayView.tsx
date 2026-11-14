'use client'

import Image from 'next/image'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { DailyEntry } from '@/lib/types'
import { shufflePhotosForDay } from '@/lib/richContent/photoShuffle'
import { PhotoCollage } from '@/app/components/PhotoCollage/PhotoCollage'
import styles from './FullDayView.module.css'

interface FullDayViewProps {
  entry: DailyEntry
  onNavigatePrevious?: () => void
  onNavigateNext?: () => void
  hasPrevious?: boolean
  hasNext?: boolean
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function FullDayView({ 
  entry, 
  onNavigatePrevious, 
  onNavigateNext, 
  hasPrevious = false, 
  hasNext = false 
}: FullDayViewProps) {
  const shuffledPhotos = shufflePhotosForDay(entry.id, entry.photos)
  const heroPhoto = shuffledPhotos[0]

  return (
    <article className={styles.container} aria-label="Full day entry">
      {heroPhoto ? (
        <div className={styles.heroWrapper}>
          <div className={styles.heroFrame}>
            <Image
              src={heroPhoto.url}
              alt={heroPhoto.alt}
              width={1200}
              height={800}
              className={styles.heroImage}
              priority
            />
            {heroPhoto.caption ? (
              <p className={styles.heroCaption}>{heroPhoto.caption}</p>
            ) : null}
          </div>
        </div>
      ) : null}

      <header className={styles.header}>
        <time className={styles.date}>{formatDate(entry.date)}</time>
        <h2 className={styles.location}>{entry.location}</h2>

        {(entry.weather || typeof entry.distanceKilometers === 'number') ? (
          <div className={styles.metaChips}>
            {entry.weather ? <span className={styles.chip}>{entry.weather}</span> : null}
            {typeof entry.distanceKilometers === 'number' ? (
              <span className={styles.chip}>{entry.distanceKilometers} km</span>
            ) : null}
          </div>
        ) : null}
      </header>

      <section className={styles.diary} aria-label="Diary">
        <Markdown remarkPlugins={[remarkGfm]}>{entry.diary}</Markdown>
      </section>

      {shuffledPhotos.length > 1 ? (
        <section className={styles.photos} aria-label="Photos">
          <PhotoCollage photos={shuffledPhotos.slice(1)} />
        </section>
      ) : null}

      {(hasPrevious || hasNext) ? (
        <nav className={styles.navigation} aria-label="Entry navigation">
          <button
            type="button"
            className={styles.navButton}
            onClick={onNavigatePrevious}
            disabled={!hasPrevious}
            aria-label="Previous entry"
          >
            ← Previous
          </button>
          <button
            type="button"
            className={styles.navButton}
            onClick={onNavigateNext}
            disabled={!hasNext}
            aria-label="Next entry"
          >
            Next →
          </button>
        </nav>
      ) : null}
    </article>
  )
}
