import styles from './SkeletonCard.module.css'

export function SkeletonCard() {
  return (
    <div className={styles.card} aria-hidden="true">
      <div className={styles.date}></div>
      <div className={styles.location}></div>
      <div className={styles.preview}></div>
    </div>
  )
}
