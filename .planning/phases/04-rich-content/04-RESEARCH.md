# Phase 4: Rich Content - Research

**Researched:** 2026-03-16
**Domain:** Next.js App Router rich-entry UX (full-day view, markdown, photos, timeline scrubber, accessibility)
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
### Full-day open/close behavior
- Only the **centered carousel card** can open full-day view.
- Full-day view includes a persistent **"Back to timeline"** control at the top.
- Returning to carousel preserves **the same active day and carousel position**.
- Transition between carousel and full-day is a **quick crossfade/content swap**.

### Timeline scrubber interaction
- Scrubber is a **floating vertical control between the map and content/day pane**.
- Drag interaction is **continuous** and snaps to the nearest day on release.
- Keyboard behavior: arrow keys move exactly **±1 day**.
- Screen reader announcement format: **"Day X of Y: [Date], [Location]"** on day change.

### Photo gallery and randomization
- Photo order is randomized **once per browser session, per day**.
- Full-day photo display uses a **journal collage grid**.
- If a day has no photos, show a subtle paper-note message: **"No photos for this day"** (diary remains primary).
- Clicking a photo opens a **lightweight in-place lightbox** with previous/next navigation.

### Full-day content layout and reading flow
- Full-day presentation is **diary-first**.
- Header shows **date + location** as primary information.
- **Weather + distance** appear as secondary metadata chips only when present.
- Diary renders as **full markdown with no truncation**.
- On mobile full-day mode, map remains visible as a **compact top section** with content scrolling below.

### Claude's Discretion
- Exact crossfade duration/easing values within "quick" feel.
- Exact collage breakpoints and frame treatment details within existing design system.
- Exact lightbox chrome details (controls placement, close affordance) while preserving accessibility.
- Exact scrubber visual styling (track texture, handle sizing) within journal theme tokens.

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CONTENT-01 | Full day view displays date, location, weather, distance, markdown diary | Full-day view component pattern, `react-markdown` + `remark-gfm` stack, metadata chip conditional rendering |
| CONTENT-02 | Full day view replaces carousel without UI shift, map stays visible | Page-level state orchestration in `app/page.tsx`, crossfade swap in right pane only, preserve SplitLayout/map mount |
| CONTENT-03 | Photos fetched by date and randomized each visit | Session-scoped per-day shuffle strategy using `sessionStorage`, stable-on-session deterministic seed/shuffle |
| CONTENT-04 | Timeline scrubber with motorhome icon allows jumping to any day | Native vertical range slider accessibility pattern, drag/keyboard semantics, ARIA announcement format + live region |
</phase_requirements>

## Summary

Phase 4 should be implemented as a **page-level mode switch** inside the existing `SplitLayout`: keep `JourneyMap` mounted and synchronized by continuing to drive everything through `activeEntryId`, while swapping only the right-pane content between Carousel mode and Full-day mode. This aligns with current architecture (`app/page.tsx` already owns synchronized state) and directly satisfies the no-layout-shift/map-visible requirement.

For content rendering, the standard path is to use `react-markdown` (secure-by-default renderer) plus `remark-gfm` for richer markdown support. For photos, keep using Next.js image optimization (`next/image`) and avoid hand-rolled loaders unless needed. Session-randomized photo order should be implemented with `sessionStorage` (tab/session lifetime) and cached per day key.

For navigation and accessibility, implement the timeline scrubber as a **native slider control** (`input[type="range"]` with vertical styling and motorhome thumb treatment), then add an ARIA live region announcing exact day text (`Day X of Y: [Date], [Location]`) on value changes. This gives strong keyboard/screen-reader behavior with minimal custom logic and lower risk.

**Primary recommendation:** Keep map and day selection as a single source of truth (`activeEntryId`), add a right-pane full-day mode with CSS crossfade, render diary via `react-markdown`, and implement timeline as a styled native vertical range slider with ARIA announcements.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.1.6 | App Router + rendering/runtime | Already project foundation; supports Client Components and optimized images |
| react / react-dom | 19.2.3 | Interactive stateful UI | Existing project runtime; no migration needed |
| react-markdown | latest stable | Safe markdown-to-React rendering | Officially secure-by-default and extensible via plugins |
| remark-gfm | latest stable | GitHub Flavored Markdown support | Standard companion plugin for markdown tables/lists/strikethrough |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| yet-another-react-lightbox | latest stable | In-place photo lightbox with keyboard navigation | Use for photo zoom/prev-next behavior instead of custom modal logic |
| next/image | bundled with next@16.1.6 | Optimized responsive images, CLS protection | Use for collage + lightbox thumbs/full images |
| Web Storage API (`sessionStorage`) | Browser standard | Session-scoped per-day photo order persistence | Use for “random once per browser session, per day” |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Native `input[type="range"]` scrubber | Custom div/drag widget | Custom widget adds keyboard/ARIA complexity and higher accessibility risk |
| yet-another-react-lightbox | Homegrown dialog/lightbox | Homegrown must reimplement focus trap, keyboard controls, edge cases |
| react-markdown | Hand-rolled markdown parser/renderer | Hand-rolled parsing is fragile and security-prone |

**Installation:**
```bash
npm install react-markdown remark-gfm yet-another-react-lightbox
```

## Architecture Patterns

### Recommended Project Structure
```
app/
├── components/
│   ├── FullDayView/            # Diary-first full entry rendering
│   ├── TimelineScrubber/       # Vertical day scrubber + a11y announcements
│   ├── PhotoCollage/           # Collage grid + no-photo state
│   └── PhotoLightbox/          # Thin wrapper around lightbox library
lib/
├── richContent/
│   ├── photoShuffle.ts         # Session-stable per-day shuffle helpers
│   └── dayNavigation.ts        # index/id conversion helpers
tests/
├── components/
│   ├── FullDayView.test.tsx
│   ├── TimelineScrubber.test.tsx
│   └── RichContentShell.test.tsx
└── lib/
    └── photoShuffle.test.ts
```

### Pattern 1: Single Source of Truth for Day + Mode
**What:** Keep `activeEntryId` in `app/page.tsx` and add `viewMode: 'carousel' | 'full'`; map, scrubber, carousel, and full-day all derive from same day state.
**When to use:** Always in this phase (prevents map/content desync).
**Example:**
```tsx
'use client'
import { useState } from 'react'

const [activeEntryId, setActiveEntryId] = useState(entries[0].id)
const [viewMode, setViewMode] = useState<'carousel' | 'full'>('carousel')

// Right pane swaps content only; map component stays mounted
```

### Pattern 2: Secure Markdown Rendering
**What:** Render full diary markdown with `react-markdown` (+ optional `remark-gfm`).
**When to use:** For `CONTENT-01` diary body.
**Example:**
```tsx
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

<Markdown remarkPlugins={[remarkGfm]}>{entry.diary}</Markdown>
```

### Pattern 3: Session-Stable Per-Day Photo Randomization
**What:** Shuffle each day’s photos once per browser session; cache by key like `photo-order:${entry.id}` in `sessionStorage`.
**When to use:** For every full-day render with photos.
**Example:**
```ts
const key = `photo-order:${entry.id}`
const cached = sessionStorage.getItem(key)
if (cached) return applyOrder(entry.photos, JSON.parse(cached))

const order = fisherYatesIndices(entry.photos.length)
sessionStorage.setItem(key, JSON.stringify(order))
return applyOrder(entry.photos, order)
```

### Pattern 4: Accessible Vertical Scrubber via Native Range
**What:** Use `<input type="range">` with `min=0`, `max=entries.length - 1`, `step=1`, styled vertically; update day on input/change and keyboard arrows.
**When to use:** Timeline control between panes.
**Example:**
```tsx
<input
  type="range"
  min={0}
  max={entries.length - 1}
  step={1}
  value={activeIndex}
  aria-label="Journey timeline"
  aria-valuetext={`Day ${activeIndex + 1} of ${entries.length}: ${date}, ${location}`}
  onChange={(e) => setActiveIndex(Number(e.currentTarget.value))}
/>
```

### Anti-Patterns to Avoid
- **Route-changing full-day navigation:** adds remount risk and can break map continuity; keep this as in-pane mode swap.
- **Separate scrubber state disconnected from `activeEntryId`:** causes map/content drift.
- **Client-unsafe storage calls at module scope:** `sessionStorage` must be used in client runtime/effects.
- **Custom markdown parsing:** unnecessary security and correctness risk.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Markdown rendering | Custom parser/regex formatter | `react-markdown` + `remark-gfm` | Security, correctness, extension support |
| Lightbox behavior | Custom modal/gallery with keyboard focus management | `yet-another-react-lightbox` | Keyboard/touch navigation + tested UX patterns |
| Accessible slider semantics | Div + pointer handlers only | Native `input[type="range"]` + ARIA | Browser-native keyboard/AT behavior |
| Image optimization | Manual srcset/loader pipeline | `next/image` | Built-in optimization + layout shift prevention |

**Key insight:** Rich-content UX has many subtle accessibility and interaction edge cases; standard libraries/native controls reduce rewrite risk dramatically.

## Common Pitfalls

### Pitfall 1: Map remounts during mode switch
**What goes wrong:** Full-day transition accidentally remounts map, causing camera reset/flicker.
**Why it happens:** Mode switch implemented as route change or conditional that moves map tree.
**How to avoid:** Keep `JourneyMap` in stable left pane; swap only right content pane.
**Warning signs:** Marker animation restarts, map recenters unexpectedly when opening full-day.

### Pitfall 2: Photo order changes on every re-render
**What goes wrong:** Randomization runs in render/effect without persistence; order flickers.
**Why it happens:** Non-memoized shuffle or no session cache.
**How to avoid:** Cache index order in `sessionStorage` by day ID.
**Warning signs:** Opening/closing lightbox reorders collage.

### Pitfall 3: Scrubber appears draggable but is not screen-reader friendly
**What goes wrong:** Visual control works with pointer but lacks robust announcement semantics.
**Why it happens:** Custom div slider without proper role/aria attributes.
**How to avoid:** Prefer native range + `aria-valuetext` + polite live region for formatted day announcement.
**Warning signs:** Keyboard arrows do nothing; SR reads only number without date/location context.

### Pitfall 4: Layout shift when opening full-day content
**What goes wrong:** Right pane jumps height/scroll unexpectedly.
**Why it happens:** No fixed-height content shell or missing aspect constraints for media.
**How to avoid:** Reuse existing full-height pane; crossfade absolute/stacked layers; use `next/image` dimensions/fill appropriately.
**Warning signs:** Scroll position jumps, map boundary moves, CLS spikes.

## Code Examples

Verified patterns from official sources:

### Client interactive component boundary (`'use client'`)
```tsx
'use client'
import { useState } from 'react'
```
Source: Next.js App Router directive docs (`/vercel/next.js/v16.1.6`)

### Markdown with GFM
```tsx
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

<Markdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
  {markdown}
</Markdown>
```
Source: `react-markdown` README (`/remarkjs/react-markdown`)

### Minimal lightbox with controlled open state
```tsx
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

<Lightbox open={open} close={() => setOpen(false)} slides={slides} />
```
Source: `yet-another-react-lightbox` README (`/igordanchenko/yet-another-react-lightbox`)

### Session storage usage
```ts
sessionStorage.setItem('key', 'value')
const value = sessionStorage.getItem('key')
```
Source: MDN `Window.sessionStorage`

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `next/image` `priority` prop | `next/image` `preload` prop | Next.js 16 | Prefer clearer preload semantics for hero/LCP images |
| Custom markdown HTML injection | `react-markdown` secure-by-default rendering | Established modern pattern | Lower XSS risk and cleaner extensibility |
| Fully custom slider div widgets | Native range + APG-consistent semantics | Ongoing best practice | Better keyboard/AT reliability with less code |

**Deprecated/outdated:**
- `next/image` `priority`: deprecated in Next.js 16, use `preload`.

## Open Questions

1. **Photo source for production (S3 vs Payload media) remains unresolved in project state**
   - What we know: Requirement is date-linked photo rendering with randomization.
   - What's unclear: Final remote host/path shape for image allowlist.
   - Recommendation: Keep collage/lightbox API source-agnostic; if remote images are used, add strict `images.remotePatterns` before deployment.

2. **Crossfade duration/easing exact values are discretionary**
   - What we know: Must feel “quick”, reduced-motion friendly.
   - What's unclear: Final token values.
   - Recommendation: Pick one baseline (e.g., 160–220ms, ease-out), test with reduced motion and keyboard flows, then lock token.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest ^4.1.0 + Testing Library (`@testing-library/react`) |
| Config file | `vitest.config.ts` |
| Quick run command | `npm run test:run -- tests/components/TimelineScrubber.test.tsx` |
| Full suite command | `npm run test:run` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CONTENT-01 | Full-day view renders date/location, optional chips, full markdown diary | component | `npm run test:run -- tests/components/FullDayView.test.tsx` | ❌ Wave 0 |
| CONTENT-02 | Opening centered card swaps to full-day without remounting map/layout shift | integration | `npm run test:run -- tests/components/RichContentShell.test.tsx` | ❌ Wave 0 |
| CONTENT-03 | Photos randomize once/session/day and stay stable within session | unit | `npm run test:run -- tests/lib/photoShuffle.test.ts` | ❌ Wave 0 |
| CONTENT-04 | Scrubber drag + arrow keys + SR day announcement | component+a11y | `npm run test:run -- tests/components/TimelineScrubber.test.tsx` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `npm run test:run -- tests/components/TimelineScrubber.test.tsx`
- **Per wave merge:** `npm run test:run`
- **Phase gate:** Full suite green before `/gsd-verify-work`

### Wave 0 Gaps
- [ ] `tests/components/FullDayView.test.tsx` — covers CONTENT-01
- [ ] `tests/components/RichContentShell.test.tsx` — covers CONTENT-02
- [ ] `tests/lib/photoShuffle.test.ts` — covers CONTENT-03
- [ ] `tests/components/TimelineScrubber.test.tsx` — covers CONTENT-04

## Sources

### Primary (HIGH confidence)
- Context7 `/vercel/next.js/v16.1.6` — `use client` rules, App Router client boundary, `next/image` behavior/deprecations
- Context7 `/remarkjs/react-markdown` — secure-by-default statement, plugin configuration patterns
- Context7 `/igordanchenko/yet-another-react-lightbox` — controlled open/close, slide index events, keyboard UX support
- W3C WAI-ARIA APG Slider Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/slider/
- MDN `Window.sessionStorage`: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
- MDN `<input type="range">`: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/range
- Next.js Image docs (v16.1.6): https://nextjs.org/docs/app/api-reference/components/image

### Secondary (MEDIUM confidence)
- Existing project code inspection (`app/page.tsx`, `SplitLayout`, `Carousel`, `JourneyMap`, test setup) for integration constraints and patterns

### Tertiary (LOW confidence)
- None

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - backed by Context7 + current project dependencies and official docs
- Architecture: HIGH - backed by existing code structure and requirement constraints
- Pitfalls: MEDIUM - based on strong precedent + project-specific integration behavior

**Research date:** 2026-03-16
**Valid until:** 2026-04-15
