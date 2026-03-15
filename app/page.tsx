import SplitLayout from './components/SplitLayout/SplitLayout'
import { mockDailyEntries } from '@/lib/mockData'
import styles from './page.module.css'

export default function Home() {
  return (
    <SplitLayout
      map={
        <div className={styles.mapPlaceholder}>
          <p>🗺️ Map will go here</p>
          <p className={styles.mapNote}>
            Interactive map showing journal entry locations
          </p>
        </div>
      }
      content={
        <div className={styles.entriesList}>
          <h1 className={styles.title}>Travel Journal</h1>
          
          {mockDailyEntries.map((entry) => (
            <article key={entry.id} className={styles.entryCard}>
              <header className={styles.entryHeader}>
                <h2 className={styles.location}>{entry.location}</h2>
                <time className={styles.date}>
                  {new Date(entry.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </header>
              
              {entry.weather && (
                <p className={styles.weather}>☀️ {entry.weather}</p>
              )}
              
              {entry.distanceMiles && (
                <p className={styles.distance}>
                  📍 {entry.distanceMiles} miles traveled
                </p>
              )}
              
              <div className={styles.diary}>
                {/* For now, render diary as plain text - markdown parsing in Phase 2 */}
                {entry.diary.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph.replace(/^# /, '')}</p>
                ))}
              </div>
              
              {entry.photos && entry.photos.length > 0 && (
                <div className={styles.photos}>
                  {entry.photos.map((photo, i) => (
                    <figure key={i}>
                      <div className={styles.photoPlaceholder}>
                        📷 {photo.caption || 'Photo'}
                      </div>
                      <figcaption>{photo.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      }
    />
  )
}
