import SplitLayout from './components/SplitLayout/SplitLayout'
import { Carousel } from './components/Carousel/Carousel'
import { mockDailyEntries } from '@/lib/mockData'
import styles from './page.module.css'

export default function Home() {
  return (
    <SplitLayout
      map={
        <div className={styles.mapPlaceholder}>
          <p>Map integration coming in Phase 3</p>
        </div>
      }
      content={
        <div className={styles.carouselWrapper}>
          <Carousel entries={mockDailyEntries} />
        </div>
      }
    />
  )
}
