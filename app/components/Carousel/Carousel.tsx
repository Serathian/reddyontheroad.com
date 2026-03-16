'use client'

import { useEffect, useRef, useState } from 'react'
import { DayCard } from './DayCard'
import { SkeletonCard } from './SkeletonCard'
import type { DailyEntry } from '@/lib/types'
import styles from './Carousel.module.css'

interface CarouselProps {
  entries: DailyEntry[]
  isLoading?: boolean
}

export function Carousel({ entries, isLoading = false }: CarouselProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map())

  useEffect(() => {
    // Create observer with center-detection configuration
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id')
            if (id) setActiveId(id)
          }
        })
      },
      {
        root: null, // viewport as root
        rootMargin: '-50% 0px -50% 0px', // center 50% detection zone
        threshold: 0, // trigger immediately when entering zone
      }
    )

    observerRef.current = observer

    // Observe all cards
    cardRefs.current.forEach((card) => observer.observe(card))

    // CRITICAL: Cleanup on unmount (prevents memory leaks)
    return () => observer.disconnect()
  }, [entries])

  // Loading state: show skeleton cards
  if (isLoading) {
    return (
      <div className={styles.carousel}>
        {[...Array(3)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className={styles.carousel}>
      {entries.map((entry) => (
        <DayCard
          key={entry.id}
          entry={entry}
          isActive={activeId === entry.id}
          ref={(el) => {
            // Ref callback pattern for dynamic list
            if (el) {
              cardRefs.current.set(entry.id, el)
            } else {
              cardRefs.current.delete(entry.id)
            }
          }}
        />
      ))}
    </div>
  )
}
