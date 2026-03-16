# Phase 3: Map Integration - Context

**Gathered:** 2026-03-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Implement synchronized map behavior for daily journal navigation: show the current day location, animate camera movement between days, render a 7-day trailing path, and visually emphasize the current location marker. This phase covers map behavior and map presentation only; timeline scrubber and full-day content are separate phases.

</domain>

<decisions>
## Implementation Decisions

### Camera motion feel
- Use balanced camera transition timing (roughly 1200-1600ms feel), not fast-snappy or cinematic-slow.
- Keep zoom mostly stable between day changes.
- For nearby coordinates, prefer subtle pan over dramatic fly animation.
- During rapid scrolling, coalesce updates to the latest visible day instead of animating every intermediate step.

### 7-day trail behavior
- Trail window is based on the last 7 entries, not strict calendar-day slicing.
- Older segments within the 7-entry window fade by opacity with age.
- Future path remains hidden (no ghost or dotted preview).
- On large day jumps, redraw immediately to the new 7-entry window instead of animating intermediate trail states.

### Current marker emphasis
- Current location marker uses slight size increase plus glow for emphasis.
- Past stops within the recent window stay visible but muted.
- Keep motorhome-themed marker style.
- Marker popups/details appear on click/tap only (not always-on labels).

### Map annotation density
- Keep map chrome minimal by default during browsing.
- Show location details on interaction only.
- Keep distance/context hints out of map by default (content pane remains primary for metadata).
- On mobile, use extra-minimal annotation density to avoid obscuring map content.

### Claude's Discretion
- Exact easing curve and final animation durations within the chosen balanced-motion feel.
- Exact zoom delta thresholds for deciding subtle pan vs fly.
- Exact opacity ramp values for trail aging.
- Exact glow color/intensity and marker shadow values within existing journal design tokens.

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`SplitLayout` (`app/components/SplitLayout/SplitLayout.tsx`)**: Existing persistent split viewport where map occupies left pane on desktop and top pane on mobile.
- **`Carousel` active day detection (`app/components/Carousel/Carousel.tsx`)**: IntersectionObserver center-zone pattern already in production and can drive map sync updates.
- **`DailyEntry` GPS source (`lib/types.ts`, `lib/mockData.ts`)**: Each entry already includes latitude/longitude and chronological date for route construction.

### Established Patterns
- **Client-side interactivity in client components** (`'use client'`) with local state/hooks for scroll-driven behavior.
- **CSS Modules** per component for scoped visual styling.
- **Journal design tokens in `app/globals.css`** for cohesive marker/trail styling.

### Integration Points
- **`app/page.tsx` map placeholder replacement**: Current placeholder text in map pane is the direct insertion point for Mapbox map component.
- **Carousel → map synchronization**: Active day state from carousel should become the input signal for map camera/marker/trail updates.
- **Mapbox token setup**: `MAPBOX_ACCESS_TOKEN` is required from environment configuration before full map rendering.

</code_context>

<specifics>
## Specific Ideas

- Keep movement smooth and readable, not flashy.
- Prioritize clarity of “where we are now” while preserving recent-route context.
- Maintain a clean map surface that supports the vintage journal aesthetic rather than a data-dense dashboard.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 03-map-integration*
*Context gathered: 2026-03-16*
