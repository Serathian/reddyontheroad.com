'use client';

import { useMemo } from 'react';
import type { DailyEntry } from '@/lib/types';
import styles from './StatsOverlay.module.css';

interface StatsOverlayProps {
  entries: DailyEntry[];
  activeEntryId: string;
  className?: string;
}

interface TripStats {
  kilometersTotal: number;
  citiesCount: number;
  countriesCount: number;
}

function calculateTripStats(entries: DailyEntry[]): TripStats {
  // Calculate total kilometers directly from the data
  const kilometersTotal = entries.reduce((total, entry) => {
    if (entry.distanceKilometers) {
      return total + entry.distanceKilometers;
    }
    return total;
  }, 0);

  // Extract unique cities and countries from explicit fields
  const cities = new Set<string>();
  const countries = new Set<string>();

  entries.forEach((entry) => {
    if (entry.city) {
      cities.add(entry.city);
    }
    
    if (entry.country) {
      countries.add(entry.country);
    }
  });

  return {
    kilometersTotal: Math.round(kilometersTotal),
    citiesCount: cities.size,
    countriesCount: countries.size,
  };
}

export default function StatsOverlay({ entries, activeEntryId, className }: StatsOverlayProps) {
  // Calculate stats only up to and including the active entry
  const stats = useMemo(() => {
    const activeIndex = entries.findIndex(entry => entry.id === activeEntryId);
    if (activeIndex === -1) return calculateTripStats(entries);
    
    // Slice entries up to and including the active entry
    const entriesUpToActive = entries.slice(0, activeIndex + 1);
    return calculateTripStats(entriesUpToActive);
  }, [entries, activeEntryId]);

  return (
    <div className={`${styles.overlay} ${className || ''}`}>
      <div className={styles.card}>
        <h2 className={styles.title}>Journey Stats</h2>
        
        <div className={styles.statsGrid}>
          {/* Kilometers Traveled */}
          <div className={styles.stat}>
            <span className={`material-symbols-rounded ${styles.icon}`}>
              route
            </span>
            <div className={styles.statContent}>
              <div className={styles.value}>
                {stats.kilometersTotal.toLocaleString()}
              </div>
              <div className={styles.label}>Kilometers</div>
            </div>
          </div>

          {/* Cities Visited */}
          <div className={styles.stat}>
            <span className={`material-symbols-rounded ${styles.icon}`}>
              location_city
            </span>
            <div className={styles.statContent}>
              <div className={styles.value}>
                {stats.citiesCount}
              </div>
              <div className={styles.label}>Cities</div>
            </div>
          </div>

          {/* Countries Visited */}
          <div className={styles.stat}>
            <span className={`material-symbols-rounded ${styles.icon}`}>
              public
            </span>
            <div className={styles.statContent}>
              <div className={styles.value}>
                {stats.countriesCount}
              </div>
              <div className={styles.label}>
                {stats.countriesCount === 1 ? 'Country' : 'Countries'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
