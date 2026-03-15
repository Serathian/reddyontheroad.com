import { Caveat, Crimson_Text, Courier_Prime } from 'next/font/google';

/**
 * Journal Design System - Font Configuration
 * 
 * Typography Hierarchy:
 * - Caveat: Handwritten headers, annotations, personal touch
 * - Crimson Text: Body text, captions, literary feel
 * - Courier Prime: Stats, dates, data (typewriter aesthetic)
 */

// Display Font - Handwritten Headers
export const caveat = Caveat({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

// Body Font - Readable Serif
export const crimsonText = Crimson_Text({
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-crimson',
  display: 'swap',
});

// Monospace Font - Stats & Data
export const courierPrime = Courier_Prime({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-courier',
  display: 'swap',
});
