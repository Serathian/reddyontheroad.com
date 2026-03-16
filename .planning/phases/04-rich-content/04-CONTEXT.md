# Phase 4: Rich Content - Context

**Gathered:** 2026-03-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Enable rich daily-entry consumption by letting users open the centered carousel day into a full-day view that shows complete entry content (metadata, markdown diary, and photos), while maintaining seamless day-to-day navigation and keeping map-content synchronization intact. This phase includes timeline scrubber interactions and accessibility, full-day transitions, and photo experience behavior within the existing journal UX.

</domain>

<decisions>
## Implementation Decisions

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

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`app/page.tsx`**: Already coordinates `activeEntryId` state between `Carousel` and `JourneyMap`; this is the primary integration point for full-day open state and scrubber day jumps.
- **`app/components/Carousel/Carousel.tsx`**: Controlled active-day pattern (`activeId` + `onActiveChange`) is already established and should remain the source signal for day selection.
- **`app/components/Carousel/DayCard.tsx`**: Existing card component and metadata formatting can be reused for transition entry context and return behavior.
- **`app/components/SplitLayout/SplitLayout.tsx`**: Existing split-pane/stacked mobile shell should host full-day mode without replacing global layout.
- **`app/components/Map/JourneyMap.tsx`**: Map already responds to `activeEntryId`; phase 4 interactions should update this ID rather than creating map-specific navigation state.
- **`lib/types.ts` + `lib/mockData.ts`**: `DailyEntry` already contains diary, metadata, and optional `photos`, enabling full-day content rendering and photo behavior.

### Established Patterns
- **Client-side interaction state in App Router client components** (`'use client'`).
- **Controlled component contract** for day focus, already used for carousel↔map synchronization.
- **CSS Modules + global journal tokens** for all visuals and transitions.
- **Reduced-motion/accessibility awareness** already present in map components and should carry into scrubber/transition/lightbox behavior.

### Integration Points
- Full-day mode should be introduced at **page-level content orchestration** (where carousel currently renders), not as a route change.
- Timeline scrubber must update the same **active day state** consumed by map and carousel/full-day.
- Photo randomization should operate on the `DailyEntry.photos` collection before collage rendering and remain stable for that day within session.

</code_context>

<specifics>
## Specific Ideas

- Scrubber should feel like a shared map/content navigation control by living on the vertical boundary between panes.
- Narrative readability is prioritized: diary leads, photos enrich.
- Interaction tone should stay smooth and lightweight, avoiding heavy motion or layout jumps.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 04-rich-content*
*Context gathered: 2026-03-16*
