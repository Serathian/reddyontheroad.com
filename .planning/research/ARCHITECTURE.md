# Architecture Research

**Domain:** Scroll-driven interactive maps with CMS integration
**Researched:** 2026-03-14
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER (Next.js)                      │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │   Map View   │  │ Carousel UI  │  │ Timeline UI  │              │
│  │ (Client Cmp) │  │ (Client Cmp) │  │ (Client Cmp) │              │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘              │
│         │                 │                  │                       │
│         └─────────────────┴──────────────────┘                       │
│                           │                                          │
│         ┌─────────────────┴──────────────────┐                       │
│         │   Scroll State Coordinator         │                       │
│         │   (IntersectionObserver bridge)    │                       │
│         └────────────────────────────────────┘                       │
├─────────────────────────────────────────────────────────────────────┤
│                      DATA LAYER (Next.js)                            │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │  Page Route  │  │   API Route  │  │  Data Cache  │              │
│  │ (Server Cmp) │  │  (optional)  │  │  (React RSC) │              │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘              │
│         │                 │                  │                       │
│         └─────────────────┴──────────────────┘                       │
│                           │                                          │
├───────────────────────────┴─────────────────────────────────────────┤
│                    INTEGRATION LAYER                                 │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │ CMS Client   │  │ Photo Loader │  │ Map Service  │              │
│  │  (Payload)   │  │   (dynamic)  │  │  (Mapbox GL) │              │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘              │
│         │                 │                  │                       │
├─────────┴─────────────────┴──────────────────┴─────────────────────┤
│                    EXTERNAL SERVICES                                 │
├─────────────────────────────────────────────────────────────────────┤
│  ┌───────────────────┐  ┌───────────────────┐                       │
│  │   Payload CMS     │  │   Photo Storage   │                       │
│  │  (REST/GraphQL)   │  │   (S3 or CMS)     │                       │
│  └───────────────────┘  └───────────────────┘                       │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| **Map View** | Renders Mapbox GL map, handles camera transitions, displays GPS path with trailing effect | Client component with `useEffect` for Mapbox initialization, camera flyTo on day change |
| **Carousel UI** | Displays rolodex-style daily entry cards, handles card focus and scrolling | Client component with horizontal scroll container, IntersectionObserver for center detection |
| **Timeline Scrubber** | Provides date-based navigation, displays motorhome icon position | Client component with range input or custom scrubber, calculates position from day index |
| **Scroll State Coordinator** | Bridges scroll events to component state, manages active day index | Custom hook or context provider using IntersectionObserver or Scrollama library |
| **Page Route** | Server-rendered entry point, fetches initial data set (all days or subset) | Next.js App Router page.tsx, async component fetching from CMS |
| **CMS Client** | Fetches daily entries from Payload, handles pagination/filtering | Server-side fetch wrapper using Payload REST API or SDK, cached with React cache() |
| **Photo Loader** | Fetches photos by date, randomizes order on client | Client-side function fetching images by date pattern, shuffles array on mount |
| **Map Service** | Initializes Mapbox GL instance, manages layers/sources, animates camera | Mapbox GL JS v2.15.0 wrapper with methods for path updates and camera control |

## Recommended Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Main journal route (server component)
│   ├── layout.tsx                # Root layout with fonts, metadata
│   └── api/                      # Optional API routes
│       └── photos/[date]/        # Photo listing endpoint (if needed)
├── components/                   # React components
│   ├── map/
│   │   ├── MapView.tsx           # Mapbox GL map wrapper (client)
│   │   ├── MapControls.tsx       # Zoom, rotation controls (client)
│   │   └── useMapCamera.ts       # Custom hook for camera animations
│   ├── carousel/
│   │   ├── DayCarousel.tsx       # Rolodex carousel container (client)
│   │   ├── DayCard.tsx           # Individual day card (client)
│   │   └── useCarouselScroll.ts  # Scroll detection hook
│   ├── timeline/
│   │   ├── TimelineScrubber.tsx  # Date navigation scrubber (client)
│   │   └── MotorhomeIcon.tsx     # Animated motorhome indicator
│   └── views/
│       ├── DayView.tsx           # Full day detail view (client)
│       └── JournalLayout.tsx     # Split-screen layout wrapper
├── lib/
│   ├── cms/
│   │   ├── payload-client.ts     # Payload API wrapper
│   │   └── types.ts              # CMS data types
│   ├── photos/
│   │   ├── photo-loader.ts       # Photo fetching and randomization
│   │   └── utils.ts              # Image URL helpers
│   ├── scroll/
│   │   ├── scroll-coordinator.ts # Scroll state management
│   │   └── useScrollProgress.ts  # Progress tracking hook
│   └── utils/
│       └── date.ts               # Date formatting utilities
├── styles/
│   ├── globals.css               # Global styles, CSS variables
│   ├── design-tokens.css         # Design system variables
│   └── components/               # Component-specific styles (if not using CSS-in-JS)
└── types/
    └── journal.ts                # Shared TypeScript types
```

### Structure Rationale

- **app/:** Next.js App Router convention, enables Server Components for initial data fetching with automatic caching
- **components/:** Organized by feature area (map, carousel, timeline), keeps related code together, clear client/server boundaries
- **lib/:** Business logic separate from UI, testable in isolation, organized by concern (CMS, photos, scroll)
- **styles/:** Centralized design system tokens, supports existing leather journal aesthetic CSS variables
- **types/:** Shared TypeScript definitions for CMS data structures and component props

## Architectural Patterns

### Pattern 1: Server Component Data Loading with Client Hydration

**What:** Fetch all daily entries on server, pass to client components as props, enable instant navigation without loading states

**When to use:** Initial page load for scroll-driven story maps where all data is needed upfront

**Trade-offs:**
- **Pros:** No loading spinners, instant scroll/navigation, works without JS (progressive enhancement), SSR-friendly for SEO
- **Cons:** Larger initial HTML payload (~240 days), slower Time to First Byte for large datasets
- **Mitigation:** Consider paginated server-side approach if entry count grows significantly (>500 days)

**Example:**
```typescript
// app/page.tsx (Server Component)
import { PayloadSDK } from '@payloadcms/sdk'
import JournalLayout from '@/components/views/JournalLayout'

const sdk = new PayloadSDK({ baseURL: process.env.PAYLOAD_API_URL })

export default async function JournalPage() {
  // Fetch all days server-side, cached automatically by Next.js
  const { docs: days } = await sdk.find({
    collection: 'days',
    limit: 300,
    sort: 'date',
  })

  // Pass to client components as props
  return <JournalLayout days={days} />
}
```

### Pattern 2: IntersectionObserver-Based Scroll Detection

**What:** Use IntersectionObserver to detect when carousel cards enter viewport, trigger map animations without scroll event listeners

**When to use:** Scroll-driven interactions where performance matters, replacing throttled scroll events

**Trade-offs:**
- **Pros:** Better performance than scroll events (runs off main thread), built-in threshold control, automatic cleanup
- **Cons:** Requires polyfill for older browsers (though excellent modern support), async callbacks require state management
- **Recommendation:** Use Scrollama library for proven implementation with step/progress callbacks

**Example:**
```typescript
// lib/scroll/useScrollProgress.ts
import { useEffect, useState } from 'react'
import scrollama from 'scrollama'

export function useScrollProgress(stepSelector: string) {
  const [activeStep, setActiveStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const scroller = scrollama()

    scroller
      .setup({
        step: stepSelector,
        offset: 0.5, // Trigger when step is 50% down viewport
        progress: true, // Enable granular progress updates
      })
      .onStepEnter((response) => {
        setActiveStep(response.index)
      })
      .onStepProgress((response) => {
        setProgress(response.progress)
      })

    return () => scroller.destroy()
  }, [stepSelector])

  return { activeStep, progress }
}
```

### Pattern 3: Map Camera Flyto with Easing

**What:** Animate Mapbox camera to new GPS coordinates using flyTo with easing curves when day changes

**When to use:** Scroll-driven story maps where map position syncs with content

**Trade-offs:**
- **Pros:** Smooth, cinematic transitions that maintain spatial orientation, built-in easing functions
- **Cons:** Fixed animation duration can feel slow if user scrolls quickly, can cause motion sickness if overused
- **Recommendation:** Use shorter durations (1-2s) and essential easing for quick scroll changes, disable animations on reduced-motion preference

**Example:**
```typescript
// components/map/useMapCamera.ts
import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'

export function useMapCamera(
  map: mapboxgl.Map | null,
  center: [number, number],
  zoom: number
) {
  const prevCenter = useRef(center)

  useEffect(() => {
    if (!map) return

    // Skip animation if coordinates haven't changed
    if (
      prevCenter.current[0] === center[0] &&
      prevCenter.current[1] === center[1]
    ) {
      return
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) {
      // Jump instantly for accessibility
      map.jumpTo({ center, zoom })
    } else {
      // Smooth animation
      map.flyTo({
        center,
        zoom,
        duration: 1500, // 1.5 seconds
        essential: true, // Animation continues even if tab not focused
      })
    }

    prevCenter.current = center
  }, [map, center, zoom])
}
```

### Pattern 4: Trailing Path with GeoJSON Source

**What:** Display GPS path with 7-day trailing effect using Mapbox GeoJSON source, update dynamically as day changes

**When to use:** Showing recent route history on scroll-driven journey maps

**Trade-offs:**
- **Pros:** Native Mapbox rendering, smooth line rendering, easy to update data without re-rendering entire map
- **Cons:** Requires recalculating visible path slice on every day change, GeoJSON can get large with many coordinates
- **Recommendation:** Pre-calculate daily path slices server-side, store in CMS or compute at build time

**Example:**
```typescript
// components/map/MapView.tsx
useEffect(() => {
  if (!map || !currentDay) return

  // Calculate 7-day trailing window
  const dayIndex = days.findIndex((d) => d.id === currentDay.id)
  const startIndex = Math.max(0, dayIndex - 6)
  const visibleDays = days.slice(startIndex, dayIndex + 1)

  // Convert to GeoJSON LineString
  const pathData: GeoJSON.Feature<GeoJSON.LineString> = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: visibleDays.map((day) => [day.longitude, day.latitude]),
    },
  }

  // Update map source
  const source = map.getSource('trail-path') as mapboxgl.GeoJSONSource
  if (source) {
    source.setData(pathData)
  }
}, [map, currentDay, days])
```

### Pattern 5: Client-Side Photo Randomization

**What:** Fetch photos by date pattern, shuffle array on client to create variety across visits

**When to use:** When photo order isn't critical and you want repeat visitors to see fresh content

**Trade-offs:**
- **Pros:** Simple implementation, no server state needed, instant variety
- **Cons:** Shuffle happens after hydration (layout shift), non-deterministic (can't share exact view), breaks SSR hydration if not careful
- **Recommendation:** Use `useEffect` to randomize after mount, accept layout shift or show skeleton until randomized

**Example:**
```typescript
// lib/photos/photo-loader.ts
export async function fetchPhotosByDate(date: string): Promise<string[]> {
  // Fetch all photos matching date pattern (e.g., 2022-03-15-*.jpg)
  const response = await fetch(`/api/photos/${date}`)
  const photos = await response.json()
  return photos
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// components/views/DayView.tsx
const [photos, setPhotos] = useState<string[]>([])

useEffect(() => {
  fetchPhotosByDate(day.date).then((fetchedPhotos) => {
    setPhotos(shuffleArray(fetchedPhotos))
  })
}, [day.date])
```

## Data Flow

### Request Flow

```
User navigates to journal
    ↓
Next.js Server Component (page.tsx)
    ↓
Payload SDK.find({ collection: 'days', limit: 300 })
    ↓
Payload CMS REST API → Daily entries JSON
    ↓
Server renders initial HTML with all day data
    ↓
Browser hydrates → Client components mount
    ↓
MapView initializes Mapbox GL → Loads tiles
    ↓
DayCarousel sets up IntersectionObserver
    ↓
User scrolls → Observer detects active card
    ↓
Scroll coordinator updates active day state
    ↓
MapView receives new coordinates → flyTo animation
    ↓
Photo loader fetches images for active day → Randomizes
    ↓
Timeline scrubber updates motorhome position
```

### State Management Flow

```
Server State (React Server Components)
    ↓
Initial props passed to Client Components
    ↓
┌─────────────────────────────────────────────┐
│         Client State (useState/Context)      │
├─────────────────────────────────────────────┤
│  - activeDayIndex (number)                   │
│  - scrollProgress (number 0-1)               │
│  - mapInstance (mapboxgl.Map | null)         │
│  - photos (string[])                         │
│  - viewMode ('carousel' | 'fullDay')         │
└─────────────────────────────────────────────┘
    ↓ (state changes propagate to children)
Components re-render with new state
    ↓
Side effects trigger (useEffect)
    ↓
Map animations, photo fetches, etc.
```

### Key Data Flows

1. **Initial Load Flow:** Server fetches all days → Passes to client components as props → Map initializes to first day → Carousel renders all cards
2. **Scroll-Driven Update Flow:** User scrolls carousel → IntersectionObserver detects new active card → State updates activeDayIndex → Map flyTo new coordinates → Photos fetch for new day
3. **Timeline Scrubber Flow:** User drags scrubber → Calculate day index from position → Jump to day (same as scroll) → Carousel scrolls to card, map animates
4. **Full Day View Flow:** User clicks centered card → ViewMode state changes to 'fullDay' → Carousel hides, full view shows → Map stays visible (no re-mount)

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-500 days | Current architecture works well. Fetch all days server-side, pass to client. ~100KB JSON gzipped. |
| 500-2000 days | Consider incremental loading: fetch initial viewport of days (30-50), lazy load others as user approaches edges. Use Intersection Observer on edge sentinels to trigger next batch fetch. |
| 2000+ days | Move to virtualized carousel (react-window or similar), only render visible cards in DOM. Implement cursor-based pagination from CMS, fetch in chunks. Consider year-based initial navigation (jump to year, then load months). |

### Scaling Priorities

1. **First bottleneck:** Large initial HTML payload slows Time to First Byte
   - **Fix:** Implement incremental server-side pagination, render initial visible days only
   - **Alternative:** Static generation with ISR (Incremental Static Regeneration) if days don't change often
   
2. **Second bottleneck:** Mapbox tile loading slows initial render
   - **Fix:** Preload tiles for first day's viewport, defer non-critical layers (labels, POIs) until after initial render
   - **Alternative:** Show static map preview image, hydrate to interactive map after user interaction

3. **Third bottleneck:** Photo fetching slows day view transitions
   - **Fix:** Prefetch photos for adjacent days (prev/next), implement image lazy loading with placeholders
   - **Alternative:** Use CDN with optimized formats (WebP, AVIF), implement progressive image loading

## Anti-Patterns

### Anti-Pattern 1: Fetching CMS Data Client-Side on Mount

**What people do:** Fetch all days from Payload API using `useEffect` on client component mount

**Why it's wrong:**
- Delays content display until JS loads and executes
- Shows loading spinner instead of instant content
- Breaks progressive enhancement (no content without JS)
- Misses Next.js SSR benefits and automatic caching
- Bad for SEO (Googlebot sees loading state)

**Do this instead:** Fetch in Server Component, pass as props to client components

```typescript
// ❌ BAD: Client-side fetch
'use client'
export default function JournalPage() {
  const [days, setDays] = useState([])
  
  useEffect(() => {
    fetch('/api/days').then(r => r.json()).then(setDays)
  }, [])
  
  return <JournalLayout days={days} /> // Empty until fetch completes
}

// ✅ GOOD: Server-side fetch
// app/page.tsx (Server Component)
export default async function JournalPage() {
  const sdk = new PayloadSDK({ baseURL: process.env.PAYLOAD_API_URL })
  const { docs: days } = await sdk.find({ collection: 'days', limit: 300 })
  
  return <JournalLayout days={days} /> // Pre-rendered with data
}
```

### Anti-Pattern 2: Using Scroll Events Instead of IntersectionObserver

**What people do:** Attach `window.addEventListener('scroll', ...)` to detect active carousel card

**Why it's wrong:**
- Scroll events fire constantly (100+ times per scroll), requires aggressive throttling
- Runs on main thread, can block rendering and cause janky scrolling
- Manual viewport calculations are error-prone (getBoundingClientRect is expensive)
- Doesn't automatically clean up, causes memory leaks

**Do this instead:** Use IntersectionObserver (or Scrollama library which wraps it)

```typescript
// ❌ BAD: Scroll events
window.addEventListener('scroll', () => {
  document.querySelectorAll('.day-card').forEach((card, index) => {
    const rect = card.getBoundingClientRect()
    if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
      setActiveDay(index) // Triggers on every scroll pixel
    }
  })
})

// ✅ GOOD: IntersectionObserver
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Number(entry.target.getAttribute('data-index'))
        setActiveDay(index)
      }
    })
  },
  { threshold: 0.5 } // Only fires when 50% visible
)

cards.forEach((card) => observer.observe(card))
```

### Anti-Pattern 3: Re-Mounting Map on Day Change

**What people do:** Destroy and recreate Mapbox map instance when active day changes

**Why it's wrong:**
- Causes expensive re-initialization (tiles reload, layers re-render)
- Flicker and poor UX during transition
- Loses map state (user's zoom level, tilted view, etc.)
- Defeats purpose of Mapbox's built-in animation (flyTo)

**Do this instead:** Keep single map instance, update camera and data sources

```typescript
// ❌ BAD: Re-mount map
useEffect(() => {
  const map = new mapboxgl.Map({ container: 'map', center: day.coords })
  return () => map.remove() // Destroys on every day change
}, [day])

// ✅ GOOD: Persistent map with flyTo
useEffect(() => {
  const map = new mapboxgl.Map({ container: 'map' })
  // ... setup layers once
  return () => map.remove() // Only destroys on unmount
}, []) // Empty deps = runs once

useEffect(() => {
  if (!map) return
  map.flyTo({ center: day.coords }) // Animate to new position
}, [day]) // Updates camera only
```

### Anti-Pattern 4: Blocking Server Component with Slow CMS Calls

**What people do:** Make multiple sequential CMS requests in Server Component without caching

**Why it's wrong:**
- Delays Time to First Byte, user sees blank page longer
- Wastes CMS API quota on repeated identical requests
- Doesn't leverage Next.js automatic request deduplication
- Can't parallelize independent requests

**Do this instead:** Use React `cache()` for memoization, parallelize with Promise.all

```typescript
// ❌ BAD: Sequential, uncached requests
export default async function Page() {
  const days = await fetch(payloadUrl + '/days').then(r => r.json())
  const settings = await fetch(payloadUrl + '/globals/settings').then(r => r.json())
  const photos = await fetch(payloadUrl + '/media').then(r => r.json())
  // Each request blocks the next, no caching
}

// ✅ GOOD: Parallel, cached requests
import { cache } from 'react'

const getDays = cache(async () => {
  const { docs } = await sdk.find({ collection: 'days' })
  return docs
})

const getSettings = cache(async () => {
  return await sdk.findGlobal({ slug: 'settings' })
})

export default async function Page() {
  // Requests run in parallel, results cached
  const [days, settings] = await Promise.all([getDays(), getSettings()])
}
```

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| **Payload CMS** | REST API via Payload SDK in Server Components, cached with React `cache()` | Use `@payloadcms/sdk` package for type-safe queries. Server-side only (don't expose API URL to client). Consider GraphQL if complex nested queries needed. |
| **Mapbox GL JS** | Client-side library initialization in `useEffect`, single instance per page lifecycle | Include Mapbox CSS in layout, store access token in env var. Use v2.15.0 as specified in constraints. Watch bundle size (~500KB). |
| **Photo Storage** | Dynamic import from public folder or S3 with date-based naming convention | If S3: generate signed URLs server-side. If CMS media: use Payload media URLs. Client-side fetch with date pattern (e.g., `/photos/2022-03-15-*.jpg`). |
| **Google Fonts** | Next.js Font Optimization (`next/font/google`) for Caveat, Crimson Text, Courier Prime | Automatic subsetting and preloading. Define in layout.tsx, apply via CSS variables. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| **Server Component ↔ Client Component** | Props (serializable data only) | Pass initial day data as JSON-serializable props. Can't pass functions or Map instances. Use Context for deep prop drilling. |
| **Carousel ↔ Map** | Shared state via React Context or parent component state | activeDayIndex flows down to both components. Carousel updates state on scroll, Map reads state to animate. Consider zustand for complex state. |
| **Timeline Scrubber ↔ Carousel** | Controlled scroll position via refs or scrollTo API | Scrubber calls `carouselRef.current.scrollTo()` or updates shared day index. Carousel reports scroll position back to scrubber for icon placement. |
| **Photo Loader ↔ Day View** | Async/await promises, loading states | Day View calls loader function, manages loading/error states. Consider React Suspense for cleaner async handling. |

## Build Order Recommendations

Based on component dependencies and risk mitigation, suggested build order:

### Phase 1: Foundation (Week 1-2)
1. **Next.js setup** with App Router, TypeScript, design system CSS
2. **Payload SDK integration** with Server Component data fetching (mock data acceptable)
3. **Basic split-screen layout** (static map placeholder, simple card list)
4. **Design system implementation** (CSS variables, typography, paper texture)

**Why first:** Establishes architecture, validates CMS integration works, provides visual foundation for all components

### Phase 2: Core Scroll Interaction (Week 2-3)
1. **Carousel component** with horizontal scroll, card rendering
2. **Scroll coordinator** using Scrollama or IntersectionObserver
3. **Active day state management** (context or parent state)
4. **Basic day card UI** with date, location, preview content

**Why second:** Core user interaction, validates scroll detection pattern, enables testing of state flow

### Phase 3: Map Integration (Week 3-4)
1. **Mapbox GL initialization** in client component
2. **Camera animation** on day change (flyTo)
3. **Trailing path visualization** with GeoJSON source
4. **Current location marker** with animation

**Why third:** Depends on scroll state being stable, most technically complex (isolate risk), can develop against mock coordinates

### Phase 4: Rich Content (Week 4-5)
1. **Full day view** with markdown rendering, metadata display
2. **Photo loading** with date-based fetching and randomization
3. **Timeline scrubber** with motorhome icon, drag interaction
4. **View transitions** between carousel and full day (no layout shift)

**Why fourth:** Builds on stable foundation, adds polish and richness, can be iteratively enhanced

### Phase 5: Optimization (Week 5-6)
1. **Photo prefetching** for adjacent days
2. **Map tile preloading** for initial viewport
3. **Responsive layout** adjustments (mobile stacked view)
4. **Accessibility** pass (reduced motion, keyboard nav, ARIA labels)

**Why last:** Performance optimization benefits from complete feature set, accessibility can be tested holistically

## Sources

- **Next.js Data Fetching:** https://nextjs.org/docs/app/getting-started/fetching-data (Official docs, 2026-02-27) - HIGH confidence
- **Mapbox GL JS Guides:** https://docs.mapbox.com/mapbox-gl-js/guides/ (Official docs, v3.20.0) - HIGH confidence
- **Mapbox Scroll Example:** https://docs.mapbox.com/mapbox-gl-js/example/scroll-fly-to/ (Official example) - HIGH confidence
- **Payload REST API:** https://payloadcms.com/docs/rest-api/overview (Official docs) - HIGH confidence
- **Scrollama Library:** https://github.com/russellsamora/scrollama (v3.2.0, widely used) - HIGH confidence
- **IntersectionObserver API:** https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API (MDN docs) - HIGH confidence

**Confidence Assessment:** All sources are official documentation or established open-source libraries with active maintenance. Architecture patterns are proven in production (see Scrollama "In The Wild" section listing major news outlets). Next.js patterns align with official App Router guidance from Vercel.

---
*Architecture research for: Scroll-driven travel journal with CMS integration*
*Researched: 2026-03-14*
