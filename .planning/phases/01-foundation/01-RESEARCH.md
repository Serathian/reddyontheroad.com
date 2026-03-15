# Phase 1: Foundation - Research

**Researched:** 2026-03-15
**Domain:** Next.js 15 App Router, Payload CMS integration, TypeScript, CSS design system implementation
**Confidence:** HIGH

## Summary

Phase 1 establishes the technical foundation for a travel journal web application using Next.js 15 with App Router and TypeScript. The research confirms that Next.js 15 with Server Components provides an optimal architecture for integrating Payload CMS through the Local API (`getPayload`), enabling direct database queries from Server Components without additional REST API calls. The existing leather journal design system (aged paper aesthetic with Caveat/Crimson Text/Courier Prime fonts) will be implemented using Next.js CSS Modules for scoped component styles and global CSS for design tokens. GPS coordinate validation requires 5-6 decimal precision (approximately 1.1 meter accuracy) matching commercial GPS receiver capabilities. The responsive split-screen layout (50% map, 50% content on desktop; stacked on mobile) follows standard CSS Flexbox patterns with media query breakpoints.

**Primary recommendation:** Use `create-next-app@latest` with TypeScript and App Router enabled, integrate Payload CMS via Local API in Server Components, implement design system with CSS Modules + global variables, and establish Vitest + React Testing Library for unit testing (with Playwright for future e2e tests of async Server Components).

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FOUND-01 | Next.js application with App Router, TypeScript, and design system CSS | Context7 confirms Next.js 15 setup via `create-next-app@latest`; CSS Modules + global styles pattern documented; TypeScript automatically configured |
| FOUND-02 | Payload CMS integration with Server Component data fetching | Context7 confirms `getPayload()` Local API pattern in Server Components; no REST API needed for same-server CMS integration |
| FOUND-03 | Split-screen layout (desktop: map left, carousel right; mobile: stacked) | CSS Flexbox/Grid patterns verified; responsive design with `flex-direction: column` on mobile, `flex-direction: row` on desktop |
| FOUND-04 | Implement existing leather journal design system exactly as specified | Design system files verified; `next/font/google` optimizes fonts; CSS custom properties support design tokens; implementation strategy clear |

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15.1.8+ | React framework with App Router | Industry standard for SSR/SSG React apps; built-in TypeScript support; font optimization; Server Components |
| TypeScript | 5.x | Type safety | Next.js default; Payload CMS written in TypeScript; auto-generated types from CMS schema |
| Payload CMS | 3.x | Headless CMS | Modern TypeScript-first CMS; Next.js integration; Local API for Server Components; auto-type generation |
| React | 19.x | UI library | Next.js 15 uses React 19; Server Components support |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `next/font/google` | Built-in | Google Fonts optimization | Self-hosts fonts; eliminates external requests; prevents layout shift; required for Caveat/Crimson Text/Courier Prime |
| Vitest | 2.x+ | Unit testing | Faster than Jest; better ESM support; recommended by Next.js docs for unit tests |
| @testing-library/react | 16.x+ | Component testing | Standard for React component tests; works with Vitest |
| Playwright | Latest | E2E testing | Official Next.js recommendation for async Server Components (Vitest doesn't support them yet) |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS Modules | Tailwind CSS | Tailwind is 2026 standard per industry sources, but design system already defined with specific colors/typography; CSS Modules better for implementing existing design than utility-first framework |
| Payload CMS Local API | REST API | REST API adds network overhead for same-server CMS; Local API directly queries database, fully typed, better performance |
| Vitest | Jest | Jest has broader ecosystem but Vitest is faster, better ESM/TypeScript support, and officially recommended by Next.js for unit tests |

**Installation:**
```bash
# Create Next.js app with TypeScript
npx create-next-app@latest reddyontheroad --typescript --app --eslint --no-tailwind --import-alias "@/*"

# Install Payload CMS (assuming separate CMS setup)
# Note: CMS is built separately per requirements, frontend only consumes via API

# Install testing dependencies
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom vite-tsconfig-paths
```

## Architecture Patterns

### Recommended Project Structure
```
reddyontheroad.com/
├── app/
│   ├── layout.tsx           # Root layout with global styles, fonts
│   ├── page.tsx             # Home page (daily entry viewer)
│   ├── globals.css          # Design system tokens, reset, base styles
│   ├── fonts.ts             # next/font/google configuration
│   └── components/          # Shared components
│       ├── DayCard/
│       │   ├── DayCard.tsx
│       │   └── DayCard.module.css
│       └── SplitLayout/
│           ├── SplitLayout.tsx
│           └── SplitLayout.module.css
├── lib/
│   ├── payload.ts           # getPayload singleton pattern
│   ├── validators.ts        # GPS coordinate validation
│   └── types.ts             # Shared TypeScript types
├── public/                  # Static assets
├── tests/                   # Unit and component tests
├── vitest.config.ts         # Test configuration
├── tsconfig.json            # TypeScript config
├── next.config.ts           # Next.js config
└── .env.local               # Environment variables (not committed)
```

### Pattern 1: Server Component Data Fetching
**What:** Async Server Components fetch data directly from Payload CMS using Local API
**When to use:** Primary pattern for all CMS data fetching in this project (daily entries, metadata)
**Example:**
```typescript
// Source: Context7 /payloadcms/payload - Local API in Server Components
// app/page.tsx
import { getPayload } from 'payload'
import config from '@payload-config'
import type { DailyEntry } from '@/payload-types' // Auto-generated types

export default async function HomePage() {
  const payload = await getPayload({ config })
  
  const { docs: entries } = await payload.find({
    collection: 'daily-entries',
    sort: '-date',
    limit: 10,
  })

  return (
    <div>
      {entries.map((entry: DailyEntry) => (
        <article key={entry.id}>
          <h2>{entry.location}</h2>
          <p>{entry.date}</p>
        </article>
      ))}
    </div>
  )
}
```

### Pattern 2: Font Optimization with next/font/google
**What:** Self-host Google Fonts to eliminate external requests and layout shift
**When to use:** All font loading (required for design system fonts)
**Example:**
```typescript
// Source: Context7 /vercel/next.js - Google Fonts with multiple weights
// app/fonts.ts
import { Caveat, Crimson_Text, Courier_Prime } from 'next/font/google'

export const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-caveat',
  display: 'swap',
})

export const crimsonText = Crimson_Text({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-crimson',
  display: 'swap',
})

export const courierPrime = Courier_Prime({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-courier',
  display: 'swap',
})

// app/layout.tsx
import { caveat, crimsonText, courierPrime } from './fonts'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${caveat.variable} ${crimsonText.variable} ${courierPrime.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

### Pattern 3: CSS Design System with Modules + Global Variables
**What:** Global CSS custom properties for design tokens, CSS Modules for component scoping
**When to use:** Design system implementation (required for Phase 1)
**Example:**
```css
/* app/globals.css - Design tokens from JOURNAL_DESIGN_SYSTEM.md */
:root {
  /* Fonts */
  --font-display: var(--font-caveat);
  --font-body: var(--font-crimson);
  --font-mono: var(--font-courier);
  
  /* Aged Paper Foundation */
  --journal-paper: #F5F1E8;
  --journal-paper-dark: #EDE8DC;
  --journal-paper-stained: #E8E0D0;
  
  /* Leather Accents */
  --leather-dark: #3E2723;
  --leather-medium: #5D4037;
  --leather-cognac: #8D6E63;
  
  /* Ink & Writing */
  --ink-black: #1A1412;
  --ink-faded: #4A3C35;
  
  /* Spacing (from design-system/MASTER.md) */
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
}

body {
  font-family: var(--font-body), serif;
  background: var(--journal-paper);
  color: var(--ink-black);
}
```

```css
/* app/components/DayCard/DayCard.module.css */
.card {
  background: var(--journal-paper);
  border: 1px solid var(--sepia-medium);
  border-radius: 4px;
  padding: var(--space-xl);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.title {
  font-family: var(--font-display), cursive;
  font-size: 2.5rem;
  color: var(--leather-dark);
}
```

### Pattern 4: Responsive Split-Screen Layout
**What:** CSS Flexbox layout that switches from horizontal (desktop) to vertical (mobile)
**When to use:** Main layout for map + content (required for FOUND-03)
**Example:**
```typescript
// app/components/SplitLayout/SplitLayout.tsx
import styles from './SplitLayout.module.css'

export default function SplitLayout({ 
  map, 
  content 
}: { 
  map: React.ReactNode
  content: React.ReactNode 
}) {
  return (
    <div className={styles.container}>
      <aside className={styles.mapPane}>
        {map}
      </aside>
      <main className={styles.contentPane}>
        {content}
      </main>
    </div>
  )
}
```

```css
/* app/components/SplitLayout/SplitLayout.module.css */
/* Source: Web search - CSS Flexbox responsive patterns 2026 */
.container {
  display: flex;
  flex-direction: row; /* Side-by-side on desktop */
  min-height: 100vh;
}

.mapPane {
  flex: 1;
  min-width: 0; /* Prevents flex items from overflowing */
}

.contentPane {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
}

/* Mobile: stack vertically */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
  
  .mapPane {
    height: 40vh; /* Fixed height for map on mobile */
    position: sticky;
    top: 0;
    z-index: 10;
  }
}
```

### Pattern 5: GPS Coordinate Validation
**What:** Validate latitude/longitude with 5-6 decimal precision
**When to use:** All GPS coordinate processing (required for FOUND-01 success criteria)
**Example:**
```typescript
// Source: Web search - GPS coordinate precision standards
// lib/validators.ts
export interface GPSCoordinate {
  latitude: number
  longitude: number
}

export function validateGPSCoordinate(
  lat: number, 
  lng: number
): GPSCoordinate | null {
  // Validate ranges
  if (lat < -90 || lat > 90) return null
  if (lng < -180 || lng > 180) return null
  
  // Round to 6 decimal places (0.11m precision per industry standard)
  // 5 decimals = 1.1m, 6 decimals = 0.11m (matches GPS accuracy)
  const latitude = Math.round(lat * 1000000) / 1000000
  const longitude = Math.round(lng * 1000000) / 1000000
  
  return { latitude, longitude }
}

// Regex validation for string input (if needed)
export const GPS_REGEX = /^-?\d{1,3}(\.\d{1,6})?$/

export function parseGPSString(latStr: string, lngStr: string): GPSCoordinate | null {
  if (!GPS_REGEX.test(latStr) || !GPS_REGEX.test(lngStr)) return null
  
  const lat = parseFloat(latStr)
  const lng = parseFloat(lngStr)
  
  return validateGPSCoordinate(lat, lng)
}
```

### Anti-Patterns to Avoid
- **Don't use 'use client' for data fetching components:** Server Components can fetch data directly from Payload CMS; Client Components cannot access Local API or environment variables
- **Don't import global CSS in multiple files:** Only import `globals.css` in root layout to avoid style conflicts during route navigation
- **Don't create hydration mismatches:** Server and client must render identical HTML; avoid `Math.random()`, `Date.now()`, `window`, or `localStorage` in initial render
- **Don't manually create TypeScript types for CMS data:** Payload auto-generates types from schema; use `import type { Post } from '@/payload-types'`

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading optimization | Custom font preloading logic | `next/font/google` | Handles self-hosting, preloading, font-display swap, eliminates layout shift; trying to manually optimize fonts leads to FOUT/FOIT issues |
| GPS coordinate validation | Custom regex without precision handling | Standard validation with Math.round to 5-6 decimals | GPS precision is subtle: 7+ decimals exceed GPS accuracy (<10mm), causes database bloat; 4 decimals too coarse (11m); industry standard is 5-6 decimals |
| CSS reset/normalization | Custom reset styles | Modern CSS reset (already in design system) | Modern resets handle form normalization, box-sizing, and accessibility defaults; custom resets miss edge cases |
| TypeScript config for Next.js | Manual tsconfig setup | `create-next-app` defaults | Next.js requires specific compiler options (`plugins: [{ name: "next" }]`, `jsx: "preserve"`, module resolution); manual config breaks incremental compilation |
| CMS data fetching layer | Custom REST API client, caching logic | Payload Local API (`getPayload`) | Local API is fully typed, auto-memoizes identical requests within component tree, direct database access; custom layer adds latency and maintenance |

**Key insight:** Next.js and Payload CMS are batteries-included frameworks that solve font optimization, type generation, and data fetching out of the box. Custom solutions for these problems introduce bugs (hydration errors, type drift, performance issues) and maintenance burden. Use the framework primitives.

## Common Pitfalls

### Pitfall 1: Hydration Errors from Non-Deterministic Rendering
**What goes wrong:** Server renders HTML with one value, client hydrates with different value, React throws "Text content does not match server-rendered HTML"
**Why it happens:** Using browser-only APIs (`window`, `localStorage`, `Date.now()`, `Math.random()`) or CSS-in-JS that generates random class names during initial render
**How to avoid:** 
- Only access browser APIs inside `useEffect` (which runs after hydration)
- Use `suppressHydrationWarning` on elements with unavoidable mismatches (like timestamps)
- Ensure Server and Client Components render identically on first render
**Warning signs:** Console errors mentioning "hydration", UI flickering on page load, inconsistent rendering

**Example:**
```typescript
// ❌ BAD: Creates hydration mismatch
export default function BadComponent() {
  const id = Math.random() // Different on server vs client
  return <div>ID: {id}</div>
}

// ✅ GOOD: Deterministic rendering
'use client'
import { useEffect, useState } from 'react'

export default function GoodComponent() {
  const [id, setId] = useState<number | null>(null)
  
  useEffect(() => {
    setId(Math.random()) // Only runs in browser after hydration
  }, [])
  
  return <div>{id ? `ID: ${id}` : 'Loading...'}</div>
}
```

### Pitfall 2: Importing Server-Only Code in Client Components
**What goes wrong:** Accidentally importing code that uses `process.env`, database clients, or `getPayload` into a Client Component causes build errors or exposes secrets
**Why it happens:** Next.js allows imports from Server Components into Client Components for props, but not for execution; easy to import utility functions that internally use server-only APIs
**How to avoid:**
- Use `server-only` package to mark server-only modules
- Keep CMS access in Server Components only
- Pass data as props from Server to Client Components
**Warning signs:** Build errors about `process.env` undefined, database connection errors in browser console, blank pages in production

**Example:**
```typescript
// ❌ BAD: lib/payload.ts imported in Client Component
'use client'
import { getPayload } from './lib/payload' // ERROR: getPayload uses process.env

// ✅ GOOD: Fetch in Server Component, pass as props
// app/page.tsx (Server Component)
import { getPayload } from './lib/payload'
import ClientList from './ClientList'

export default async function Page() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({ collection: 'posts' })
  return <ClientList posts={docs} /> // Pass data as props
}

// app/ClientList.tsx (Client Component)
'use client'
export default function ClientList({ posts }: { posts: Post[] }) {
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>
}
```

### Pitfall 3: Not Configuring CSS Modules File Convention
**What goes wrong:** Next.js doesn't recognize `.module.css` files or styles don't apply
**Why it happens:** Forgetting `.module.css` extension (using `.css` instead) means Next.js treats it as global CSS; importing global CSS outside root layout causes conflicts
**How to avoid:**
- Always use `.module.css` for component-scoped styles
- Only import global CSS in `app/layout.tsx`
- Use CSS custom properties in global CSS, reference them in modules
**Warning signs:** Styles not applying, "Global CSS cannot be imported from files other than your Custom `<App>`" error

### Pitfall 4: Excessive Decimal Precision in GPS Coordinates
**What goes wrong:** Storing GPS coordinates with 10+ decimal places wastes database space and creates false precision (beyond GPS device accuracy)
**Why it happens:** JavaScript `toFixed()` or database defaults allow arbitrary precision; developers assume "more decimals = more accurate"
**How to avoid:**
- Round to 5-6 decimal places (1.1m to 0.11m precision) before storage
- Validate coordinate ranges: latitude [-90, 90], longitude [-180, 180]
- Document precision requirements in schema
**Warning signs:** Database bloat, slow geospatial queries, coordinates with 14+ decimal places

**Reference:** Industry standard per coordinate-converter.com: "5 decimal places (e.g., 40.12345) is the correct standard. It provides approximately 1.1 meters (3.6 feet) of precision, which matches the physical accuracy of commercial GPS receivers."

### Pitfall 5: Font Loading Without Optimization
**What goes wrong:** External Google Fonts requests block rendering, cause layout shift (FOUT/FOIT), or fail on slow connections
**Why it happens:** Using `<link>` tags in `<head>` to load fonts from fonts.googleapis.com instead of next/font
**How to avoid:**
- Always use `next/font/google` to self-host fonts
- Set `display: 'swap'` to prevent invisible text during load
- Use `variable` option to create CSS custom properties
**Warning signs:** Slow page loads, text briefly invisible or wrong font, fonts loading from external domain

### Pitfall 6: Confusing Global CSS Scope in App Router
**What goes wrong:** Global styles imported in multiple route files conflict or don't unload on navigation
**Why it happens:** Next.js App Router doesn't remove stylesheets during client-side navigation (React Suspense integration); importing global CSS in multiple layouts causes duplicate styles
**How to avoid:**
- Import `globals.css` ONLY in root `app/layout.tsx`
- Use CSS Modules for all component-specific styles
- Reserve global CSS for design tokens, resets, and truly global styles
**Warning signs:** Styles accumulating on navigation, unexpected style overrides, duplicate CSS in DevTools

## Code Examples

Verified patterns from official sources:

### Environment Variables Access
```typescript
// Source: Context7 /vercel/next.js - Server Component env vars
// app/page.tsx
export default async function Page() {
  // ✅ Access env vars directly in Server Components
  const apiUrl = process.env.PAYLOAD_CMS_URL
  const apiKey = process.env.PAYLOAD_API_KEY
  
  // Fetch data using server-only credentials
  const res = await fetch(`${apiUrl}/api/entries`, {
    headers: { Authorization: `Bearer ${apiKey}` }
  })
  
  return <div>...</div>
}
```

### Parallel Data Fetching
```typescript
// Source: Context7 /vercel/next.js - Promise.all pattern
// app/day/[id]/page.tsx
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function DayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const payload = await getPayload({ config })
  
  // Initiate both requests in parallel
  const entryPromise = payload.findByID({ collection: 'entries', id })
  const photosPromise = payload.find({ 
    collection: 'photos',
    where: { entryId: { equals: id } }
  })
  
  // Wait for both to complete
  const [entry, { docs: photos }] = await Promise.all([entryPromise, photosPromise])
  
  return (
    <article>
      <h1>{entry.location}</h1>
      <div>{photos.length} photos</div>
    </article>
  )
}
```

### CSS Modules with Global Tokens
```typescript
// Source: Next.js docs + design system specification
// app/components/WeekCard/WeekCard.tsx
import styles from './WeekCard.module.css'

export default function WeekCard({ title, content }: { title: string; content: string }) {
  return (
    <article className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>{content}</div>
    </article>
  )
}
```

```css
/* app/components/WeekCard/WeekCard.module.css */
.card {
  background: var(--journal-paper); /* From globals.css */
  border: 1px solid var(--sepia-medium);
  padding: var(--space-xl);
  margin-bottom: var(--space-2xl);
}

.title {
  font-family: var(--font-display), cursive;
  font-size: 2.5rem;
  color: var(--leather-dark);
}

.content {
  font-family: var(--font-body), serif;
  line-height: 1.8;
  color: var(--ink-black);
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Pages Router (`pages/` directory) | App Router (`app/` directory) | Next.js 13 (2022), stable in 14-15 | Server Components by default, improved data fetching, nested layouts, better performance |
| `getServerSideProps` / `getStaticProps` | Async Server Components with `fetch` | Next.js 13 App Router | Simpler mental model, fetch directly in components, automatic request deduplication |
| External Google Fonts link | `next/font/google` self-hosting | Next.js 13 | Zero external requests, no layout shift, better privacy and performance |
| Jest for testing | Vitest for unit tests | 2023-2024 | Faster test execution, better ESM/TypeScript support, officially recommended by Next.js |
| Manual TypeScript types | Payload auto-generated types | Payload 2.x+ | Types stay in sync with schema, zero manual maintenance, catch schema changes at compile time |
| Tailwind CSS everywhere | CSS Modules for existing design systems | 2024-2026 trend | Tailwind is standard for greenfield, but CSS Modules better for implementing predefined design tokens |

**Deprecated/outdated:**
- **`_app.js` and `_document.js`:** Replaced by root `layout.tsx` in App Router
- **`next/image` with external loader:** Built-in optimization now handles most cases
- **Runtime config (`serverRuntimeConfig`):** Replaced by environment variables accessed via `process.env`
- **`getInitialProps`:** Deprecated in favor of `getServerSideProps` (Pages Router) or async Server Components (App Router)

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 2.x + React Testing Library 16.x |
| Config file | `vitest.config.ts` (Wave 0 task) |
| Quick run command | `npm test -- --run` |
| Full suite command | `npm test -- --run --coverage` |

**Rationale:** Vitest is officially recommended by Next.js docs for unit testing (as of 2026). React Testing Library is the standard for component testing. However, **async Server Components are NOT supported by Vitest** (per Next.js docs warning), so Wave 0 will set up Vitest for Client Components and synchronous utilities only. Future phases will add Playwright for e2e tests covering async Server Components.

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FOUND-01 | GPS coordinate validation (5-6 decimal precision, range checks) | unit | `npm test -- lib/validators.test.ts --run` | ❌ Wave 0 |
| FOUND-01 | TypeScript compiles without errors | build | `npm run build` | ✅ (next build) |
| FOUND-02 | Payload CMS data fetching returns typed entries | manual | Developer verification (async Server Component - Vitest unsupported) | N/A |
| FOUND-03 | Split-screen layout renders map and content panes | component | `npm test -- components/SplitLayout.test.tsx --run` | ❌ Wave 0 |
| FOUND-03 | Layout switches to stacked on mobile breakpoint | component | `npm test -- components/SplitLayout.test.tsx --run` | ❌ Wave 0 |
| FOUND-04 | Fonts load with next/font/google | manual | Visual check in browser | N/A |
| FOUND-04 | CSS custom properties match design system | unit | `npm test -- design-system.test.ts --run` | ❌ Wave 0 |

**Manual-only justification:**
- **FOUND-02 (Payload CMS data fetching):** Async Server Components cannot be tested with Vitest (official Next.js limitation). Will be covered by Playwright e2e tests in future phases or manual verification via `npm run dev`.
- **FOUND-04 (Font loading):** Font optimization is handled by Next.js framework; testing requires visual validation or Lighthouse audit (automated in Phase 5).

### Sampling Rate
- **Per task commit:** `npm test -- --run` (all unit tests, <30 seconds)
- **Per wave merge:** `npm test -- --run --coverage` (full suite with coverage report)
- **Phase gate:** Full suite green + manual verification of fonts and CMS integration before `/gsd-verify-work`

### Wave 0 Gaps
- [ ] `vitest.config.ts` — Vitest configuration with React plugin, jsdom environment, tsconfig paths
- [ ] `tests/lib/validators.test.ts` — GPS coordinate validation unit tests
- [ ] `tests/components/SplitLayout.test.tsx` — Responsive layout component tests
- [ ] `tests/design-system.test.ts` — CSS custom properties validation (ensures globals.css has required tokens)
- [ ] `tests/setup.ts` — Test environment setup, global mocks if needed
- [ ] Framework install: `npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom vite-tsconfig-paths`

**Note:** Once Vitest ecosystem adds async Server Component support, we can replace manual FOUND-02 verification with automated tests. Until then, Payload CMS integration will be verified through manual testing and e2e tests in later phases.

## Open Questions

1. **Payload CMS deployment architecture**
   - What we know: CMS is built separately (per requirements exclusions), frontend consumes via API
   - What's unclear: Is CMS on same server (enabling Local API) or separate server (requiring REST API)? 
   - Recommendation: If same Docker Compose stack, use Local API for best performance. If separate deployment, use REST API with proper CORS configuration. **This decision affects FOUND-02 implementation strategy.**

2. **Photo storage mechanism**
   - What we know: Photos fetched by date (per Phase 4 requirements), randomized each visit
   - What's unclear: S3 vs Payload media storage (flagged in STATE.md as TBD)
   - Recommendation: Decision not needed for Phase 1, but impacts Phase 4. Include `featuredImage` type field in Payload schema as placeholder.

3. **Mobile map interaction patterns**
   - What we know: Sticky map on mobile (from split-screen layout), map animates with carousel scroll (Phase 3)
   - What's unclear: Touch interaction patterns on small screens (pinch-to-zoom, pan conflicts with scroll)
   - Recommendation: Phase 1 establishes layout; Phase 3 research should investigate Mapbox mobile interaction best practices.

## Sources

### Primary (HIGH confidence)
- Context7 `/vercel/next.js` (v15.1.8, v16.0.3) - App Router setup, Server Components, font optimization, environment variables, CSS Modules
- Context7 `/payloadcms/payload` (v3.59.1, v3.77.0) - Local API integration, TypeScript type generation, collection configuration
- Next.js official docs (nextjs.org) - Vitest setup guide, production checklist, hydration error documentation
- JOURNAL_DESIGN_SYSTEM.md (project file) - Color palette, typography, spacing, texture specifications
- design-system/reddy-on-the-road/MASTER.md (project file) - Component specs, spacing tokens, shadow depths

### Secondary (MEDIUM confidence)
- coordinate-converter.com - GPS precision standards (verified against industry practice: 5-6 decimals for commercial GPS)
- Medium.com - Next.js hydration errors guide (2026, aligns with official Next.js docs on hydration)
- LogRocket blog - Server Component pitfalls (verified patterns match Context7 documentation)
- CSS-Tricks - Flexbox guide (verified standard patterns, cross-referenced with MDN)

### Tertiary (LOW confidence)
- Reddit r/nextjs discussions - Anecdotal evidence on CSS Modules vs Tailwind preference (used to understand community trends, not prescriptive)
- GitHub issues - Hydration error workarounds (used to identify common patterns, verified against official docs)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Context7 provides official Next.js and Payload CMS documentation; versions verified; installation commands tested pattern
- Architecture: HIGH - Server Component patterns, font optimization, and CSS Modules documented in official sources; GPS precision verified against industry standards
- Pitfalls: MEDIUM-HIGH - Hydration errors and import patterns verified in official Next.js docs; GPS precision and font loading pitfalls verified against multiple sources
- Validation: MEDIUM - Vitest setup verified in Next.js docs, but async Server Component limitation noted; testing strategy adapted to framework constraints

**Research date:** 2026-03-15
**Valid until:** 2026-04-15 (30 days - stable frameworks, but Next.js releases frequently; revalidate if Next.js 16 becomes stable)

**Notes:**
- Design system is pre-existing and approved (JOURNAL_DESIGN_SYSTEM.md), eliminating design decisions
- Payload CMS schema not defined in research (CMS built separately per requirements); assume standard collection structure with auto-generated types
- Testing strategy acknowledges Vitest limitation with async Server Components; manual verification acceptable for Phase 1, automated e2e tests deferred to future phases
