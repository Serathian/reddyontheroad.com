'use client'

import { type RefObject, useEffect, useRef, useState } from 'react'
import { DayCard } from './DayCard'
import { SkeletonCard } from './SkeletonCard'
import type { DailyEntry } from '@/lib/types'
import styles from './Carousel.module.css'

interface CarouselProps {
  entries: DailyEntry[]
  isLoading?: boolean
  onActiveChange?: (id: string) => void
  activeId?: string | null
  onOpenDay?: (id: string) => void
  containerRef?: RefObject<HTMLDivElement | null>
}

export function Carousel({ entries, isLoading = false, onActiveChange, activeId, onOpenDay, containerRef }: CarouselProps) {
  const [uncontrolledActiveId, setUncontrolledActiveId] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map())
  const lastNotifiedActiveId = useRef<string | null>(null)
  const suppressObserverUntil = useRef(0)

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
      (observerEntries) => {
        if (Date.now() < suppressObserverUntil.current) {
          return
        }

        const visibleEntries = observerEntries.filter((entry) => entry.isIntersecting)
        if (visibleEntries.length === 0) {
          return
        }

        const viewportCenter = window.innerHeight / 2

        const closestToCenter = visibleEntries
          .map((entry) => {
            const rect = entry.boundingClientRect
            const cardCenter = rect.top + rect.height / 2
            return {
              id: entry.target.getAttribute('data-id'),
              distance: Math.abs(cardCenter - viewportCenter),
            }
          })
          .filter((item): item is { id: string; distance: number } => Boolean(item.id))
          .sort((a, b) => a.distance - b.distance)[0]

        if (closestToCenter?.id) {
          setResolvedActiveId(closestToCenter.id)
        }
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

  useEffect(() => {
    // Keep controlled activeId in sync with visual center when selection
    // comes from external controls (e.g. timeline scrubber).
    if (!activeId) {
      return
    }

    const activeCard = cardRefs.current.get(activeId)
    if (!activeCard) {
      return
    }

    if (typeof activeCard.scrollIntoView !== 'function') {
      return
    }

    // Avoid observer feedback loops while programmatically centering card
    suppressObserverUntil.current = Date.now() + 250

    activeCard.scrollIntoView({
      block: 'center',
      behavior: 'auto',
    })
  }, [activeId])

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
    <div className={styles.carousel} data-testid="carousel-container" ref={containerRef}>
      {entries.map((entry) => (
        <DayCard
          key={entry.id}
          entry={entry}
          isActive={resolvedActiveId === entry.id}
          onOpen={resolvedActiveId === entry.id ? () => onOpenDay?.(entry.id) : undefined}
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
