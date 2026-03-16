"use client"

import { useEffect, useMemo, useRef, useState } from 'react'
import SplitLayout from './components/SplitLayout/SplitLayout'
import { Carousel } from './components/Carousel/Carousel'
import { JourneyMap } from './components/Map/JourneyMap'
import { FullDayView } from './components/FullDayView/FullDayView'
import { TimelineScrubber } from './components/TimelineScrubber/TimelineScrubber'
import { mockDailyEntries } from '@/lib/mockData'
import styles from './page.module.css'

export default function Home() {
  const [activeEntryId, setActiveEntryId] = useState<string>(mockDailyEntries[0].id)
  const [viewMode, setViewMode] = useState<'carousel' | 'full'>('carousel')
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const [savedScrollTop, setSavedScrollTop] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const activeIndex = useMemo(
    () => Math.max(0, mockDailyEntries.findIndex((entry) => entry.id === activeEntryId)),
    [activeEntryId],
  )

  const activeEntry = mockDailyEntries[activeIndex]

  useEffect(() => {
    const syncMobile = () => setIsMobile(window.innerWidth <= 768)
    syncMobile()
    window.addEventListener('resize', syncMobile)
    return () => window.removeEventListener('resize', syncMobile)
  }, [])

  const openFullDay = (id: string) => {
    if (id !== activeEntryId) {
      return
    }

    setSavedScrollTop(carouselRef.current?.scrollTop ?? 0)
    setViewMode('full')
  }

  const goBackToTimeline = () => {
    setViewMode('carousel')
  }

  useEffect(() => {
    if (viewMode !== 'carousel') {
      return
    }

    if (!carouselRef.current) {
      return
    }

    carouselRef.current.scrollTop = savedScrollTop
  }, [viewMode, savedScrollTop])

  const handleDayIndexChange = (index: number) => {
    const next = mockDailyEntries[index]
    if (!next) {
      return
    }

    setActiveEntryId(next.id)
  }

  return (
    <SplitLayout
      map={
        <JourneyMap
          entries={mockDailyEntries}
          activeEntryId={activeEntryId}
          mapApiKey={process.env.NEXT_PUBLIC_MAPTILER_API_KEY}
        />
      }
      content={
        <div className={styles.rightPane} data-testid="right-pane-mode" data-view-mode={viewMode}>
          <div className={styles.mapBoundScrubber}>
            <TimelineScrubber
              entries={mockDailyEntries}
              activeIndex={activeIndex}
              onDayChange={handleDayIndexChange}
            />
          </div>

          <div className={styles.viewSwap} data-testid="layout-shell" data-mobile-full={viewMode === 'full' && isMobile ? 'true' : 'false'}>
            <div className={`${styles.layer} ${viewMode === 'carousel' ? styles.visible : styles.hidden}`}>
              <div className={styles.carouselWrapper}>
                <Carousel
                  entries={mockDailyEntries}
                  activeId={activeEntryId}
                  onActiveChange={setActiveEntryId}
                  onOpenDay={openFullDay}
                  containerRef={carouselRef}
                />
              </div>
            </div>

            <div className={`${styles.layer} ${styles.fullDayLayer} ${viewMode === 'full' ? styles.visible : styles.hidden}`}>
              <button type="button" className={styles.backButton} onClick={goBackToTimeline}>
                Back to timeline
              </button>
              <FullDayView entry={activeEntry} />
            </div>
          </div>
        </div>
      }
    />
  )
}
