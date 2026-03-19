# Pitfalls Research

**Domain:** Interactive Travel Journal with Scroll-Driven Map
**Researched:** 2026-03-15
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Map Instance Re-mounting on State Changes

**What goes wrong:**
Map re-creates WebGL context on every carousel navigation, causing flashing, lost zoom/rotation state, and poor performance. Animations jank or skip entirely.

**Why it happens:**
React developers treat Map as a normal component, putting it in conditional render or keying it by active day state. Mapbox GL creates expensive WebGL contexts that shouldn't unmount.

**How to avoid:**
- Create map instance once at mount, store ref
- Update camera position via `flyTo()` method, not by re-rendering
- Never use activeDay as a key prop on Map component
- Keep Map component at stable position in component tree

**Warning signs:**
- Brief black flash when navigating between days
- Map resets zoom level unexpectedly
- Console warnings about WebGL contexts
- Sluggish map transitions

**Phase to address:**
Phase 1 (Foundation) - Establish map singleton pattern from start

---

### Pitfall 2: Scroll Event Listener Performance

**What goes wrong:**
Using raw scroll events (`window.addEventListener('scroll')`) for 240-day timeline creates constant re-renders, janky scroll, battery drain on mobile.

**Why it happens:**
Developers use familiar scroll event pattern instead of IntersectionObserver. Scroll events fire at 60fps+ with no passive option protection.

**How to avoid:**
- Use IntersectionObserver API (via react-intersection-observer)
- Each day card is an observed element
- Callback fires only when visibility changes, not on every scroll pixel
- Passive by default, no main thread blocking

**Warning signs:**
- Choppy scroll performance, especially on mobile
- DevTools Performance tab shows constant JS execution during scroll
- React DevTools Profiler shows many re-renders per second
- Overheating device during scroll

**Phase to address:**
Phase 2 (Core Scroll) - Build scroll interaction correctly from start

---

### Pitfall 3: CMS Data Fetching Waterfall

**What goes wrong:**
App fetches current day, then fetches photos, then weather data sequentially. Initial load takes 3-5 seconds instead of <1 second.

**Why it happens:**
Using client-side useEffect chains or not parallelizing Server Component data fetching. Each fetch waits for previous to complete.

**How to avoid:**
- Use Server Components for initial data load (Next.js App Router)
- Parallelize independent fetches with `Promise.all([fetch(...), fetch(...)])`
- Prefetch adjacent days in background after initial render
- Cache CMS responses with appropriate revalidation

**Warning signs:**
- Network tab shows sequential requests, not parallel
- Long "Waiting for server response" times
- Slow page transitions between days
- Total load time > 2 seconds on fast connection

**Phase to address:**
Phase 1 (Foundation) - Set up data fetching patterns correctly

---

### Pitfall 4: Mapbox Tile Request Explosion

**What goes wrong:**
Map requests hundreds of tiles during smooth scroll through 240 days, hitting Mapbox API limits or costing $$$. App breaks after 50k free requests/month.

**Why it happens:**
Every camera movement triggers new tile requests. Zooming in/out aggressively compounds this. No tile caching strategy.

**How to avoid:**
- Use consistent zoom level (10-12) across all days
- Implement tile caching via Mapbox `transformRequest` option
- Limit camera flyTo speed (`duration` param) to reduce mid-flight tile loads
- Consider static map tiles for overview, dynamic only for detail view

**Warning signs:**
- Mapbox usage dashboard shows exponential growth
- Network tab shows 100s of tile requests during scroll
- Map tiles flash/reload frequently during camera movement
- Approaching Mapbox free tier limits quickly

**Phase to address:**
Phase 3 (Map Animation) - Implement tile optimization from start

---

### Pitfall 5: Photo Randomization Isn't Actually Random

**What goes wrong:**
Same "random" photos show on every page refresh because randomization uses array index or date-based seed. Users see identical experience each visit.

**Why it happens:**
Using `Math.random()` with same seed, or shuffling based on deterministic data (date, index). Server-rendered components lock in randomization at build time.

**How to avoid:**
- Client-side randomization only (not SSR/SSG)
- Use `crypto.randomUUID()` or timestamp-based seed per session
- Re-shuffle on route change or manual trigger
- Store shuffle seed in sessionStorage, not localStorage (varies per visit)

**Warning signs:**
- Photos appear in same order every refresh
- Different browsers show identical photo sequence
- Randomization works in dev but not production build
- Users report "I've seen this before"

**Phase to address:**
Phase 4 (Content Richness) - Implement client-side randomization

---

### Pitfall 6: GPS Precision Mismatch (Trailing Path Glitches)

**What goes wrong:**
7-day trailing path draws zig-zag lines across ocean or through mountains because GPS coordinates have inconsistent precision or projection mismatches.

**Why it happens:**
CMS stores coordinates as strings with varying decimal places, or mixing lat/lng order. Mapbox expects [lng, lat] but many sources provide [lat, lng].

**How to avoid:**
- Standardize GPS format in Payload schema: `{ lat: number, lng: number }`
- Validate coordinate precision (5-6 decimal places sufficient)
- Use Turf.js for all geospatial calculations (handles projections)
- Convert to GeoJSON format early in data pipeline

**Warning signs:**
- Path lines cross large bodies of water incorrectly
- Path appears jagged despite smooth actual route
- Console errors from Mapbox about invalid coordinates
- Map markers appear in wrong locations

**Phase to address:**
Phase 1 (Foundation) - Define GPS data schema with validation

---

### Pitfall 7: Timeline Scrubber Accessibility Failure

**What goes wrong:**
Timeline scrubber (motorhome icon) is mouse-only, keyboard users can't navigate days. Violates WCAG AA and makes site unusable for screen reader users.

**Why it happens:**
Custom slider built without semantic HTML or keyboard handlers. Developers focus on visual design, skip ARIA attributes and keyboard events.

**How to avoid:**
- Use semantic `<input type="range">` as base, style visually
- Add ARIA labels: `aria-label="Day 1 of 240"`
- Support keyboard: Arrow keys (day-by-day), Page Up/Down (week jumps)
- Announce changes to screen readers with `aria-live` region

**Warning signs:**
- Lighthouse Accessibility score < 90
- Can't tab to timeline scrubber
- Screen reader doesn't announce current day
- Keyboard navigation does nothing

**Phase to address:**
Phase 4 (Content Richness) - Build timeline scrubber accessibly from start

---

### Pitfall 8: Docker Image Size Bloat (>2GB)

**What goes wrong:**
Docker image includes dev dependencies, source maps, Mapbox offline caches, resulting in 2GB+ image. Slow CI builds, expensive storage, long deployment times.

**Why it happens:**
Not using Next.js standalone output, including node_modules wholesale, copying .next/cache directories, no multi-stage build.

**How to avoid:**
- Enable `output: 'standalone'` in next.config.ts (only includes runtime deps)
- Multi-stage build: deps → build → runtime
- `.dockerignore` excludes: node_modules, .git, .next/cache, design-system/, archive/
- Use alpine base image (node:20-alpine)

**Warning signs:**
- `docker images` shows >1GB image size
- CI build takes >10 minutes
- GHCR storage quota warnings
- Deployment pulls take >2 minutes

**Phase to address:**
Phase 5 (Deployment) - Optimize Docker build from start

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hardcode GPS coordinates in code | Skip Payload integration, test map faster | Can't update journey data, breaks CMS contract | Prototyping only (1-2 days max) |
| Skip TypeScript for Payload types | Faster initial setup | Runtime errors from CMS shape changes, poor DX | Never - Payload generates types automatically |
| Use Mapbox CDN instead of npm | No build config needed | Bundle size visibility lost, version lock-in | Never in production (OK for prototyping) |
| Client-side CMS fetching | Simpler mental model | Slower loads, SEO loss, API key exposure | Never - defeats Next.js purpose |
| Skip image optimization | Faster dev iteration | Massive photo bundles (240 days × photos), slow mobile | Dev only - optimize before deploy |
| Inline all styles in components | Easier to reason about | Design system divergence, no shared tokens | Never - design system exists |
| Mock CMS responses | Parallel dev before CMS ready | Drift from real data shape, integration surprise | First week only |

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Payload CMS | Fetching on client with API URL in code | Use Server Components, env var for API URL, never expose secret |
| Mapbox API | Token in client-side code committed to git | Use NEXT_PUBLIC_ prefix, .env.local in .gitignore, rotate if leaked |
| Photo Storage (S3) | Public bucket with no CDN | Use CloudFront/R2 CDN, signed URLs, or Payload media handler |
| Docker Compose | Hardcoded localhost in CMS URL | Use service names (payload:3001), env vars for external access |
| GitHub Actions | GHCR token in workflow file | Use ${{ secrets.GITHUB_TOKEN }}, automatic auth in GH-hosted runners |

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Loading all 240 days upfront | Works fine for 10 days of testing | Virtualized carousel, load visible ±3 days only | >50 days, mobile devices |
| Full-resolution photos (5MB each) | Looks great on desktop dev | Next.js Image with sizes, WebP format, lazy loading | >20 photos loaded |
| Animating map on every scroll pixel | Smooth in dev with 10 days | IntersectionObserver triggers only, debounce flyTo | 240 days, slower devices |
| Fetching all photo URLs per day | Fine with 5 photos/day | Paginate photos, load on expand, randomize subset | >10 photos/day |
| No route prefetching | Instant in dev (localhost CMS) | Prefetch adjacent ±2 days after idle | Real network latency |

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Exposing Payload admin in same container | Public can access CMS UI at /admin | Separate Payload container, firewall admin routes, or disable admin in prod |
| Storing GPS coordinates without privacy check | Reveals home address, sensitive locations | Audit coordinates, fuzz sensitive locations, strip EXIF from photos |
| Allowing photo URLs to be enumerated | Anyone can scrape all family photos | Use signed URLs with expiration, or auth-protected routes |
| No rate limiting on CMS fetches | DDoS potential, Payload overload | Implement rate limiting in Next.js middleware or reverse proxy |
| Committing .env with Mapbox secret token | Token leaked in git history, quota theft | Never commit .env, use secret token rotation if leaked |

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| No loading states during map flyTo | Looks broken, user clicks repeatedly | Show subtle map dimming or motorhome animation during transition |
| Carousel snaps without easing | Jarring, nauseating on mobile | Use Framer Motion spring animations, respect prefers-reduced-motion |
| Timeline scrubber jumps to exact day | Hard to browse nearby days | Magnetic snapping to week boundaries, preview on hover |
| Full day view has no breadcrumb | Lost in 240 days, no way to know position | Show "Day 47 of 240 - Week 7" header, mini-timeline persists |
| Photos load below fold | User scrolls, then images pop in shifting layout | Reserve space with aspect ratio, skeleton placeholders |
| No offline support | Broken experience on flaky mobile connection | Service worker caches HTML/CSS, graceful offline message for photos/map |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Mapbox integration:** Often missing token rotation strategy — verify .env.example documents token, logs warn if using placeholder
- [ ] **Photo randomization:** Often missing session persistence — verify refresh shows different photos, but back button shows same
- [ ] **GPS trailing path:** Often missing coordinate validation — verify path doesn't cross oceans, handles single-day trips
- [ ] **Timeline scrubber:** Often missing keyboard navigation — verify Tab reaches it, Arrow keys work, screen reader announces
- [ ] **Docker build:** Often missing .dockerignore — verify image size <200MB, build excludes design-system/ and archive/
- [ ] **CMS integration:** Often missing error states — verify graceful degradation when Payload down, timeout handling
- [ ] **Responsive design:** Often missing mobile map interaction — verify 7-day trail visible on small screens, not too dense
- [ ] **Carousel navigation:** Often missing touch gesture support — verify swipe works on mobile, not mouse-only

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Map re-mounting | LOW | Extract map instance to ref, wrap in useMemo, pass flyTo handler down |
| Scroll event listeners | LOW | Replace addEventListener with react-intersection-observer, test perf |
| Data fetching waterfall | MEDIUM | Refactor to Server Components, add Promise.all, measure with Chrome DevTools |
| Mapbox tile explosion | MEDIUM | Add tile caching, reduce zoom changes, consider static tiles for overview |
| Photo randomization fail | LOW | Move randomization to client component, use crypto.randomUUID(), test across refreshes |
| GPS precision issues | MEDIUM | Add Zod schema to Payload, validate on save, use Turf.js for calculations, audit existing data |
| Timeline accessibility | HIGH | Rebuild with semantic HTML, add ARIA, test with screen reader, hire a11y audit |
| Docker image bloat | LOW | Add standalone output, multi-stage build, .dockerignore, rebuild and verify size |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Map re-mounting | Phase 1 (Foundation) | Map ref persists across navigations, no WebGL warnings in console |
| Scroll performance | Phase 2 (Core Scroll) | DevTools Performance shows <10% JS during scroll, 60fps maintained |
| Data fetching waterfall | Phase 1 (Foundation) | Network tab shows parallel fetches, total load <1s on 3G |
| Mapbox tile explosion | Phase 3 (Map Animation) | Mapbox dashboard shows <1000 tile requests per full timeline scroll |
| Photo randomization | Phase 4 (Content Richness) | Session A and B show different photo orders, refresh changes order |
| GPS precision | Phase 1 (Foundation) | Trailing path draws sensible routes, Turf.js validates coordinates |
| Timeline accessibility | Phase 4 (Content Richness) | Lighthouse Accessibility >95, keyboard navigation works, ARIA complete |
| Docker bloat | Phase 5 (Deployment) | Image size <200MB, CI build <5 min, deployment pull <30s |

## Sources

- Next.js Performance Best Practices — https://nextjs.org/docs/app/building-your-application/optimizing — HIGH confidence
- Mapbox GL JS Performance Guide — https://docs.mapbox.com/mapbox-gl-js/guides/performance/ — HIGH confidence
- IntersectionObserver API — MDN Web Docs — HIGH confidence
- Web.dev Lighthouse Accessibility — https://web.dev/accessibility — HIGH confidence
- Docker Multi-Stage Builds — Docker Official Docs — HIGH confidence
- Personal experience with scroll-driven map projects — MEDIUM confidence
- Community pitfalls from Next.js + Mapbox projects — MEDIUM confidence

---
*Pitfalls research for: Interactive Travel Journal with Scroll-Driven Map*
*Researched: 2026-03-15*
