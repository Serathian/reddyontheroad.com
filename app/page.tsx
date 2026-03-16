"use client"

import { useState } from 'react'
import SplitLayout from './components/SplitLayout/SplitLayout'
import { Carousel } from './components/Carousel/Carousel'
import { JourneyMap } from './components/Map/JourneyMap'
import { mockDailyEntries } from '@/lib/mockData'
import styles from './page.module.css'

export default function Home() {
  const [activeEntryId, setActiveEntryId] = useState<string>(mockDailyEntries[0].id)

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
        <div className={styles.carouselWrapper}>
          <Carousel
            entries={mockDailyEntries}
            activeId={activeEntryId}
            onActiveChange={setActiveEntryId}
          />
        </div>
      }
    />
  )
}
