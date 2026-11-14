import Link from 'next/link';
import styles from './wip.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.contentCard}>
        <div className={styles.badge}>
          <span className={styles.pulseDot} />
          Work in Progress
        </div>

        <h1 className={styles.title}>Reddy on the Road</h1>
        <p className={styles.tagline}>Overland Dispatches & Field Journal</p>

        <p className={styles.description}>
          We are currently overhauling the travel scrapbook and GPS route mapping
          experience. Full interactive daily trails, vehicle loadouts, and campground
          dispatches will be returning soon.
        </p>

        <div className={styles.divider} />

        <div className={styles.links}>
          <a
            href="https://jake-reddy.com"
            className={styles.primaryButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Jake-Reddy.com
          </a>
          <a
            href="https://nerdintheforest.com"
            className={styles.secondaryButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            Nerd in the Forest
          </a>
        </div>

        <p className={styles.footerNote}>
          Curious to see what&apos;s coming?{' '}
          <Link href="/journal" className={styles.prototypeLink}>
            Explore the Journal Prototype
          </Link>
        </p>
      </div>
    </main>
  );
}
