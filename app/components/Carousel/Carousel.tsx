'use client'

import { useEffect, useRef, useState } from 'react'
import { DayCard } from './DayCard'
import { SkeletonCard } from './SkeletonCard'
import type { DailyEntry } from '@/lib/types'
import styles from './Carousel.module.css'

interface CarouselProps {
  entries: DailyEntry[]
  isLoading?: boolean
  onActiveChange?: (id: string) => void
  activeId?: string | null
}

export function Carousel({ entries, isLoading = false, onActiveChange, activeId }: CarouselProps) {
  const [uncontrolledActiveId, setUncontrolledActiveId] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map())
  const lastNotifiedActiveId = useRef<string | null>(null)

  const resolvedActiveId = activeId ?? uncontrolledActiveId

  const setResolvedActiveId = (nextId: string) => {
    if (activeId === undefined) {
      setUncontrolledActiveId(nextId)
    }

    if (lastNotifiedActiveId.current !== nextId) {
      onActiveChange?.(nextId)
      lastNotifiedActiveId.current = nextId
    }
  }

  useEffect(() => {
    // Create observer with center-detection configuration
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id')
            if (id) setResolvedActiveId(id)
          }
        })
      },
      {
        root: null, // viewport as root
        rootMargin: '-40% 0px -40% 0px', // center 20% detection zone (vertical)
        threshold: 0, // trigger immediately when entering zone
      }
    )

    observerRef.current = observer

    // Observe all cards
    cardRefs.current.forEach((card) => observer.observe(card))

    // CRITICAL: Cleanup on unmount (prevents memory leaks)
    return () => observer.disconnect()
  }, [entries, activeId, onActiveChange])

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
          isActive={resolvedActiveId === entry.id}
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
