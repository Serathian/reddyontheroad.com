'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import type { Photo } from '@/lib/types'
import styles from './PhotoCollage.module.css'

interface PhotoCollageProps {
  photos?: Photo[]
}

export function PhotoCollage({ photos = [] }: PhotoCollageProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const slides = useMemo(
    () => photos.map((photo) => ({ src: photo.url, alt: photo.alt, title: photo.caption })),
    [photos]
  )

  if (photos.length === 0) {
    return <p className={styles.emptyMessage}>No photos for this day</p>
  }

  const openAt = (index: number) => {
    setActiveIndex(index)
    setIsLightboxOpen(true)
  }

  const goPrevious = () => {
    setActiveIndex((current) => (current === 0 ? photos.length - 1 : current - 1))
  }

  const goNext = () => {
    setActiveIndex((current) => (current === photos.length - 1 ? 0 : current + 1))
  }

  return (
    <section className={styles.wrapper} aria-label="Photo collage">
      <div className={styles.grid}>
        {photos.map((photo, index) => (
          <button
            key={`${photo.url}-${index}`}
            type="button"
            className={styles.photoButton}
            onClick={() => openAt(index)}
            aria-label={`Open photo ${index + 1}${photo.caption ? `: ${photo.caption}` : ''}`}
          >
            <Image
              src={photo.url}
              alt={photo.alt}
              width={380}
              height={280}
              className={styles.photo}
            />
            {photo.caption ? <span className={styles.caption}>{photo.caption}</span> : null}
          </button>
        ))}
      </div>

      {isLightboxOpen ? (
        <div className={styles.controls}>
          <button type="button" className={styles.navButton} onClick={goPrevious}>
            Previous photo
          </button>
          <button type="button" className={styles.navButton} onClick={goNext}>
            Next photo
          </button>
          <button type="button" className={styles.navButton} onClick={() => setIsLightboxOpen(false)}>
            Close lightbox
          </button>
        </div>
      ) : null}

      <Lightbox
        open={isLightboxOpen}
        close={() => setIsLightboxOpen(false)}
        index={activeIndex}
        slides={slides}
      />
    </section>
  )
}
