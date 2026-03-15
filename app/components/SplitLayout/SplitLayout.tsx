import { ReactNode } from 'react'
import styles from './SplitLayout.module.css'

export interface SplitLayoutProps {
  map: ReactNode
  content: ReactNode
}

/**
 * Responsive split-screen layout for journal interface
 * 
 * Desktop (>768px): 50% map left, 50% content right (side-by-side)
 * Mobile (≤768px): Stacked with sticky map top, scrolling content below
 */
export default function SplitLayout({ map, content }: SplitLayoutProps) {
  return (
    <div className={styles.container}>
      <aside className={styles.mapPane} aria-label="Map view">
        {map}
      </aside>
      <main className={styles.contentPane}>
        {content}
      </main>
    </div>
  )
}
