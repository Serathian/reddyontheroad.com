# Research Summary

**Project:** Reddy on the Road - Interactive Travel Journal
**Research Date:** 2026-03-14 to 2026-03-15
**Confidence:** HIGH

---

## Executive Summary

This project implements a scroll-driven interactive travel journal combining a rolodex-style carousel navigation with synchronized map animations. Research validates the technical approach using Next.js 16.x App Router with Payload CMS, Mapbox GL JS v3.20.0, and a vintage leather journal design system.

**Key Findings:**
- **MVP scope is achievable in 5-6 weeks** using recommended stack
- **Core differentiator** (scroll-synchronized map animation) is technically proven but complex — defer to v1.x after core proven
- **8 critical pitfalls identified** with prevention strategies mapped to roadmap phases
- **Architecture patterns established** for scroll detection (IntersectionObserver), map persistence (singleton pattern), and data fetching (Server Components)

---

## Feature Strategy

### Launch With (v1.0 MVP)

**Core Experience (P1 - Must Have):**
- Rolodex carousel navigation with daily entry cards
- Map with current location marker (static per day)
- Full-day view with photos, markdown diary, metadata
- Responsive layout (desktop split-screen, mobile stacked)
- Leather journal design system (aged paper, Caveat font)
- Docker container + CI/CD to GHCR

**Rationale:** Validates core value prop (story map + journal) without complex scroll-animation coupling. Proves CMS integration, establishes design system, enables user testing.

### Add After Validation (v1.x)

**Enhanced Interactions (P2 - Should Have):**
- Scroll-synchronized map animation (map follows carousel)
- 7-day GPS trailing path (recent journey context)
- Timeline scrubber with motorhome icon (fast navigation)
- Photo randomization (replay value for repeat visits)

**Rationale:** Complex scroll-map coupling requires stable foundation. Add once basic carousel + map proven separately. Timeline scrubber only needed when users request faster navigation across 240 days.

### Deferred (v2+)

**Polish & Expansion (P3 - Nice to Have):**
- Search/filter by location
- Export to PDF / print version
- Multi-language support
- Analytics tracking

**Anti-Features (Explicitly Excluded):**
- Social sharing/comments (not a social platform)
- User accounts/authentication (public read-only)
- Real-time GPS tracking (completed 2022 trip)
- Week-based grouping (pure daily timeline preferred)
- Video playback (photo-first, bandwidth concerns)

---

## Technology Stack

### Core Stack (Required)

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.1.6 | React framework with App Router, SSR/SSG, automatic optimization |
| **React** | 19.x | UI library (required by Next.js 16.x) |
| **TypeScript** | 5.x | Type safety, Payload auto-generates types |
| **Payload CMS** | 3.79.0 | Headless CMS with native Next.js integration, self-hosted |
| **PostgreSQL** | 16.x | Database (recommended by Payload for production) |
| **Mapbox GL JS** | 3.20.0 | Interactive map (update from prototype's v2.15.0) |
| **react-map-gl** | 8.1.0 | Official Mapbox wrapper for React lifecycle |

### Supporting Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| **Framer Motion** | 11.x | Scroll animations, carousel transitions |
| **Lenis** | 1.1.x | Smooth scrolling (better than deprecated Locomotive Scroll) |
| **Embla Carousel** | 8.x | Rolodex carousel with touch/drag support |
| **@turf/turf** | 7.x | Geospatial calculations for GPS paths |
| **date-fns** | 3.x | Date handling for 240-day timeline |
| **sharp** | 0.33.x | Image optimization (Next.js Image dependency) |

### Development Tools

- **Docker** (standalone output mode for minimal container size)
- **GitHub Actions** (CI/CD to GHCR)
- **Playwright** (E2E testing with App Router support)

### What NOT to Use

- ❌ **Mapbox GL JS v2.15.0** (prototype version outdated, use v3.20.0)
- ❌ **Contentful/Sanity** (SaaS lock-in, use self-hosted Payload)
- ❌ **Locomotive Scroll** (deprecated, use Lenis)
- ❌ **Material UI/Chakra** (design system already defined)
- ❌ **Redux/Zustand** (overkill, use React Context minimally)

---

## Architecture Patterns

### Pattern 1: Server Component Data Loading

**Use for:** Initial page load with all daily entries

```typescript
// app/page.tsx (Server Component)
export default async function JournalPage() {
  const { docs: days } = await sdk.find({
    collection: 'days',
    limit: 300,
    sort: 'date',
  })
  return <JournalLayout days={days} />
}
```

**Why:** No loading spinners, instant navigation, SSR-friendly for SEO, works without JS.

**Trade-off:** Larger initial HTML (~240 days = ~100KB gzipped). Acceptable for <500 days.

---

### Pattern 2: IntersectionObserver Scroll Detection

**Use for:** Detecting active carousel card for map synchronization

**Why:** Better performance than scroll events (runs off main thread), automatic cleanup, built-in threshold control.

**Recommendation:** Use Scrollama library for proven implementation.

```typescript
// lib/scroll/useScrollProgress.ts
export function useScrollProgress(stepSelector: string) {
  useEffect(() => {
    const scroller = scrollama()
      .setup({
        step: stepSelector,
        offset: 0.5, // Trigger when 50% down viewport
        progress: true,
      })
      .onStepEnter((response) => setActiveStep(response.index))
    
    return () => scroller.destroy()
  }, [stepSelector])
}
```

---

### Pattern 3: Map Camera Singleton

**Use for:** Animating map without re-mounting expensive WebGL context

```typescript
// Create once on mount
useEffect(() => {
  const map = new mapboxgl.Map({ container: 'map' })
  return () => map.remove() // Only on unmount
}, [])

// Update camera on day change
useEffect(() => {
  if (!map) return
  map.flyTo({ center: day.coords, duration: 1500 })
}, [day])
```

**Why:** Avoids WebGL re-initialization, maintains zoom/rotation state, enables smooth flyTo animations.

**Critical:** Never use activeDay as key prop on Map component.

---

### Pattern 4: Trailing Path with GeoJSON

**Use for:** 7-day GPS path visualization

```typescript
// Calculate 7-day window
const visibleDays = days.slice(dayIndex - 6, dayIndex + 1)

// Convert to GeoJSON LineString
const pathData: GeoJSON.Feature<GeoJSON.LineString> = {
  type: 'Feature',
  geometry: {
    type: 'LineString',
    coordinates: visibleDays.map(d => [d.longitude, d.latitude]),
  },
}

// Update map source
(map.getSource('trail-path') as GeoJSONSource).setData(pathData)
```

**Optimization:** Pre-calculate daily path slices server-side or at build time.

---

### Pattern 5: Client-Side Photo Randomization

**Use for:** Fresh photo order on each visit

```typescript
useEffect(() => {
  fetchPhotosByDate(day.date).then((photos) => {
    setPhotos(shuffleArray(photos))
  })
}, [day.date])
```

**Why:** Simple, no server state needed, instant variety.

**Trade-off:** Layout shift after hydration. Use skeleton placeholders or reserve aspect ratio space.

---

## Critical Pitfalls & Prevention

### Pitfall 1: Map Instance Re-mounting ⚠️ CRITICAL

**Problem:** Map flashes black, resets zoom, janky transitions.

**Prevention Phase:** Phase 1 (Foundation)
- Create map instance once in ref
- Update via `flyTo()` method, not re-render
- Never key Map component by activeDay

**Verification:** Map ref persists across navigations, no WebGL console warnings.

---

### Pitfall 2: Scroll Event Performance ⚠️ CRITICAL

**Problem:** Janky scroll, battery drain, constant re-renders.

**Prevention Phase:** Phase 2 (Core Scroll)
- Use IntersectionObserver (via react-intersection-observer)
- No raw scroll event listeners

**Verification:** DevTools Performance shows <10% JS during scroll, 60fps maintained.

---

### Pitfall 3: CMS Data Fetching Waterfall

**Problem:** Sequential fetches cause 3-5s load times.

**Prevention Phase:** Phase 1 (Foundation)
- Use Server Components for initial load
- Parallelize with `Promise.all([...])`
- Cache with React `cache()` function

**Verification:** Network tab shows parallel fetches, total load <1s on 3G.

---

### Pitfall 4: Mapbox Tile Request Explosion

**Problem:** Hundreds of tile requests, API quota exhaustion.

**Prevention Phase:** Phase 3 (Map Animation)
- Use consistent zoom level (10-12)
- Implement tile caching via `transformRequest`
- Limit camera flyTo duration

**Verification:** Mapbox dashboard shows <1000 tile requests per full timeline scroll.

---

### Pitfall 5: Photo Randomization Determinism

**Problem:** Same "random" photos on every refresh.

**Prevention Phase:** Phase 4 (Content Richness)
- Client-side only (not SSR/SSG)
- Use `crypto.randomUUID()` or timestamp seed
- Store seed in sessionStorage (not localStorage)

**Verification:** Different sessions show different photo orders.

---

### Pitfall 6: GPS Precision Mismatch

**Problem:** Trailing path zig-zags across oceans.

**Prevention Phase:** Phase 1 (Foundation)
- Standardize GPS in Payload: `{ lat: number, lng: number }`
- Validate 5-6 decimal place precision
- Use Turf.js for all geospatial calculations

**Verification:** Trailing path draws sensible routes, no ocean-crossing glitches.

---

### Pitfall 7: Timeline Accessibility Failure

**Problem:** Keyboard/screen reader users can't navigate.

**Prevention Phase:** Phase 4 (Content Richness)
- Use semantic `<input type="range">` base
- Add ARIA labels and live regions
- Support keyboard: Arrow keys, Page Up/Down

**Verification:** Lighthouse Accessibility >95, keyboard navigation works.

---

### Pitfall 8: Docker Image Bloat

**Problem:** 2GB+ image, slow CI, expensive storage.

**Prevention Phase:** Phase 5 (Deployment)
- Enable `output: 'standalone'` in next.config.ts
- Multi-stage build with alpine base
- Comprehensive `.dockerignore`

**Verification:** Image size <200MB, CI build <5 minutes.

---

## Component Structure

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Main carousel view (Server Component)
│   ├── layout.tsx                # Root layout with fonts, metadata
│   └── api/                      # Optional API routes
├── components/
│   ├── map/
│   │   ├── MapView.tsx           # Mapbox GL map wrapper (client)
│   │   ├── MapControls.tsx       # Zoom, rotation controls
│   │   └── useMapCamera.ts       # Camera animation hook
│   ├── carousel/
│   │   ├── DayCarousel.tsx       # Rolodex carousel (client)
│   │   ├── DayCard.tsx           # Individual day card
│   │   └── useCarouselScroll.ts  # Scroll detection hook
│   ├── timeline/
│   │   ├── TimelineScrubber.tsx  # Date navigation (client)
│   │   └── MotorhomeIcon.tsx     # Animated indicator
│   └── views/
│       ├── DayView.tsx           # Full day detail (client)
│       └── JournalLayout.tsx     # Split-screen wrapper
├── lib/
│   ├── cms/
│   │   ├── payload-client.ts     # Payload API wrapper
│   │   └── types.ts              # CMS data types
│   ├── photos/
│   │   ├── photo-loader.ts       # Fetching + randomization
│   │   └── utils.ts              # Image URL helpers
│   ├── scroll/
│   │   ├── scroll-coordinator.ts # State management
│   │   └── useScrollProgress.ts  # Progress tracking
│   └── utils/
│       └── date.ts               # Date formatting
├── styles/
│   ├── globals.css               # Global styles
│   ├── design-tokens.css         # Design system variables
│   └── components/               # Component-specific styles
└── types/
    └── journal.ts                # Shared TypeScript types
```

---

## Data Flow

### Initial Load Flow

```
User navigates → Next.js Server Component (page.tsx)
    ↓
Payload SDK.find({ collection: 'days' })
    ↓
Server renders HTML with all day data
    ↓
Browser hydrates → Client components mount
    ↓
MapView initializes Mapbox GL
    ↓
DayCarousel sets up IntersectionObserver
```

### Scroll-Driven Update Flow

```
User scrolls carousel
    ↓
IntersectionObserver detects new active card
    ↓
State updates activeDayIndex
    ↓
MapView receives new coordinates → flyTo animation
    ↓
Photo loader fetches images for active day → randomizes
    ↓
Timeline scrubber updates motorhome position
```

---

## Build Order Recommendations

### Phase 1: Foundation (Week 1-2)
1. Next.js setup with App Router, TypeScript, design system CSS
2. Payload SDK integration with Server Component data fetching
3. Basic split-screen layout (static map placeholder, simple card list)
4. Design system implementation (CSS variables, typography, paper texture)

**Why first:** Establishes architecture, validates CMS integration, provides visual foundation.

---

### Phase 2: Core Scroll Interaction (Week 2-3)
1. Carousel component with horizontal scroll
2. Scroll coordinator using IntersectionObserver
3. Active day state management
4. Basic day card UI

**Why second:** Core user interaction, validates scroll detection pattern.

---

### Phase 3: Map Integration (Week 3-4)
1. Mapbox GL initialization
2. Camera animation on day change (flyTo)
3. Trailing path visualization with GeoJSON
4. Current location marker

**Why third:** Most complex, depends on scroll state being stable.

---

### Phase 4: Rich Content (Week 4-5)
1. Full day view with markdown rendering
2. Photo loading with randomization
3. Timeline scrubber with motorhome icon
4. View transitions between carousel and full day

**Why fourth:** Builds on stable foundation, adds polish.

---

### Phase 5: Optimization (Week 5-6)
1. Photo prefetching for adjacent days
2. Map tile preloading
3. Responsive layout adjustments
4. Accessibility pass

**Why last:** Performance optimization benefits from complete feature set.

---

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| **0-500 days** | Current architecture works. Fetch all days server-side. ~100KB JSON gzipped. |
| **500-2000 days** | Incremental loading: fetch initial viewport (30-50 days), lazy load with IntersectionObserver edge sentinels. |
| **2000+ days** | Virtualized carousel (react-window), cursor-based pagination, year-based initial navigation. |

**Current project (240 days):** Well within optimal range for server-side fetch-all pattern.

---

## Environment Variables

```bash
# Next.js
NEXT_PUBLIC_MAPBOX_TOKEN=pk.xxx
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001

# Payload CMS
DATABASE_URI=postgresql://user:pass@localhost:5432/travel_journal
PAYLOAD_SECRET=your-secret-key-min-32-chars

# Photos (if using S3)
S3_BUCKET=travel-photos
S3_REGION=us-west-2
S3_ACCESS_KEY_ID=xxx
S3_SECRET_ACCESS_KEY=xxx
```

---

## Docker Configuration

**Key requirements:**
- `output: 'standalone'` in next.config.ts
- Multi-stage build: deps → build → runtime
- Alpine base image (node:20-alpine)
- `.dockerignore` excludes: node_modules, .git, .next/cache, design-system/, archive/

**Target image size:** <200MB (vs. 2GB+ without optimization)

---

## Anti-Patterns to Avoid

### ❌ Client-Side CMS Fetching

```typescript
// BAD: Fetch in useEffect
'use client'
export default function Page() {
  const [days, setDays] = useState([])
  useEffect(() => {
    fetch('/api/days').then(setDays)
  }, [])
}

// GOOD: Server Component fetch
export default async function Page() {
  const { docs: days } = await sdk.find({ collection: 'days' })
  return <JournalLayout days={days} />
}
```

**Why:** Client-side defeats Next.js SSR benefits, shows loading spinner, bad for SEO.

---

### ❌ Scroll Event Listeners

```typescript
// BAD: Raw scroll events
window.addEventListener('scroll', () => {
  // Fires 100+ times per scroll, blocks main thread
})

// GOOD: IntersectionObserver
const observer = new IntersectionObserver(
  (entries) => { /* Only fires on visibility change */ },
  { threshold: 0.5 }
)
```

**Why:** Scroll events cause performance issues, IntersectionObserver runs off main thread.

---

### ❌ Re-Mounting Map on Day Change

```typescript
// BAD: Destroys map instance
useEffect(() => {
  const map = new mapboxgl.Map(...)
  return () => map.remove()
}, [day]) // Re-creates on every day change

// GOOD: Persistent map
useEffect(() => {
  const map = new mapboxgl.Map(...)
  return () => map.remove()
}, []) // Creates once

useEffect(() => {
  map.flyTo({ center: day.coords })
}, [day]) // Updates camera only
```

**Why:** Re-mounting causes expensive WebGL re-initialization, flashing, state loss.

---

## Technical Debt to Avoid

| Shortcut | Long-term Cost | When Acceptable |
|----------|----------------|-----------------|
| Hardcode GPS coordinates | Can't update data, breaks CMS contract | Prototyping only (1-2 days) |
| Skip TypeScript for Payload types | Runtime errors, poor DX | Never (Payload auto-generates) |
| Client-side CMS fetching | Slower loads, SEO loss | Never |
| Skip image optimization | Massive photo bundles, slow mobile | Dev only |
| Mock CMS responses | Drift from real data shape | First week only |

---

## Security Considerations

| Risk | Prevention |
|------|------------|
| Exposing Payload admin in same container | Separate Payload container, firewall `/admin` routes |
| GPS reveals sensitive locations | Audit coordinates, fuzz home address, strip EXIF |
| Photo URL enumeration | Use signed URLs with expiration or auth-protected routes |
| DDoS on CMS fetches | Rate limiting in Next.js middleware |
| Mapbox token in git history | Never commit .env, rotate if leaked |

---

## Performance Targets

| Metric | Target | How to Verify |
|--------|--------|---------------|
| Initial Load (3G) | <2s | Chrome DevTools Network throttling |
| Scroll Performance | 60fps | DevTools Performance tab, <10% JS during scroll |
| Mapbox Tile Requests | <1000 per full scroll | Mapbox dashboard analytics |
| Docker Image Size | <200MB | `docker images` output |
| Lighthouse Performance | >90 | Chrome Lighthouse audit |
| Lighthouse Accessibility | >95 | Chrome Lighthouse audit |

---

## Confidence Assessment

| Area | Confidence | Rationale |
|------|------------|-----------|
| **Stack Selection** | HIGH | All sources official docs, versions verified current |
| **Architecture Patterns** | HIGH | Proven in production (Scrollama "In The Wild"), official Next.js guidance |
| **Pitfall Prevention** | MEDIUM-HIGH | Based on documented issues + personal experience |
| **Build Timeline** | MEDIUM | 5-6 week estimate assumes experienced developer, may vary |
| **Feature Scope** | HIGH | Aligned with project constraints, validated against competitors |

---

## Research Sources

### Official Documentation (HIGH Confidence)
- Next.js Official Docs (v16.1.6) — https://nextjs.org/docs
- Payload CMS Official Docs — https://payloadcms.com/docs
- Mapbox GL JS Docs (v3.20.0) — https://docs.mapbox.com/mapbox-gl-js/guides/
- IntersectionObserver API — MDN Web Docs
- Docker Multi-Stage Builds — Docker Official Docs

### Open Source Libraries (HIGH Confidence)
- Scrollama (v3.2.0) — https://github.com/russellsamora/scrollama
- react-map-gl (v8.1.0) — https://www.npmjs.com/package/react-map-gl
- Framer Motion — https://www.framer.com/motion/

### Competitive Analysis (HIGH Confidence)
- StoryMapJS — https://storymap.knightlab.com/
- Polarsteps — https://www.polarsteps.com/
- Mapme — https://mapme.com/
- Travellerspoint — https://www.travellerspoint.com/
- Wanderlog — https://wanderlog.com/

### Project Context (HIGH Confidence)
- `.planning/PROJECT.md` — Project requirements and constraints
- `JOURNAL_DESIGN_SYSTEM.md` — Complete design system specification
- `.planning/codebase/STACK.md` — Existing tech stack

---

## Next Steps

1. **Define Requirements** — Extract functional and technical requirements from research findings
2. **Create Roadmap** — Break into phases matching build order recommendations
3. **Plan Phase 1** — Detail Foundation phase tasks (Next.js setup, Payload integration, design system)
4. **Execute Phase 1** — Begin implementation with pitfall prevention from start

---

*Research synthesis completed: 2026-03-15*
*Files synthesized: FEATURES.md, ARCHITECTURE.md, STACK.md, PITFALLS.md*
