import { Plus_Jakarta_Sans, Newsreader } from 'next/font/google';

/**
 * Modern Explorer's Journal - Font Configuration
 * 
 * Typography Hierarchy:
 * - Plus Jakarta Sans: UI elements, headers, navigation, stats (modern sans-serif)
 * - Newsreader: Body text, storytelling, journal entries (elegant serif)
 * 
 * Both fonts are variable fonts, so weights are handled dynamically without fixed weight arrays.
 */

// Sans-serif Font - UI & Headers
export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Serif Font - Body & Storytelling
export const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});
