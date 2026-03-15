# Phase 2: Core Scroll - Context

**Gathered:** 2026-03-15
**Status:** Ready for planning

<domain>
## Phase Boundary

Build a horizontal scrollable carousel of daily entry cards that allows users to navigate through 240 days of journal entries. The carousel uses scroll detection to identify the active day and provides visual feedback through card styling. This phase focuses on the navigation mechanism only - full day detail view and map integration come in later phases.

</domain>

<decisions>
## Implementation Decisions

### Carousel Interaction
- CSS scroll-snap for native snap-to-card behavior
- No custom JavaScript scroll physics needed
- Modern, accessible, performant approach
- Browser handles scroll snap points natively

### Card Content Density
- Cards display preview field from CMS (not truncated diary text)
- Add `preview: string` field to `DailyEntry` type
- CMS provides hand-crafted preview for each entry (editorial control)
- Full diary content reserved for Phase 4's detail view
- Preview should be concise summary optimized for carousel browsing

### Active Day Indicator
- Scale + shadow combo for centered card
- IntersectionObserver detects which card is in center viewport
- Centered card scales slightly (1.05-1.1x) with deeper shadow
- Fits vintage journal aesthetic (raised card effect)
- Smooth CSS transitions for scale/shadow changes

### Empty/Loading States
- Skeleton cards with vintage paper texture during load
- Maintains aged paper aesthetic (no generic gray boxes)
- Subtle shimmer or pulse animation on skeleton elements
- Consistent with journal design system

### Claude's Discretion
- Exact scale factor for active card (1.05x vs 1.1x)
- Shadow depth values (keeping within vintage aesthetic)
- Skeleton animation timing and style
- Carousel padding and spacing
- Card aspect ratio and dimensions

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`DailyEntry` interface** (`lib/types.ts`): Already has id, date, location, latitude, longitude, diary, weather, distanceMiles, photos — needs `preview` field added
- **`mockDailyEntries`** (`lib/mockData.ts`): 3 Greek travel entries with realistic diary content — needs preview field added to mock data
- **`SplitLayout` component** (`app/components/SplitLayout/SplitLayout.tsx`): Desktop 50/50 split, mobile stacked — carousel goes in content pane (right side on desktop)
- **Design system CSS** (`app/globals.css`): Leather journal tokens already defined (--journal-paper, --leather-*, --ink-*, font variables)

### Established Patterns
- **CSS Modules**: All components use scoped CSS modules (`.module.css` files)
- **Next.js App Router**: Server Components for data fetching, client components for interactivity
- **Typography**: Caveat (handwritten headers via `--font-display`), Crimson Text (body via `--font-serif`), Courier Prime (metadata via `--font-mono`)
- **Flexbox layout**: Used for split-screen (Phase 1), prefer flexbox for carousel container as well

### Integration Points
- **Carousel replaces current entries list**: Current `page.tsx` has vertical list of entries — replace with horizontal carousel
- **IntersectionObserver pattern**: Not yet established, will set precedent for Phase 3's map sync
- **Type definitions**: `lib/types.ts` is single source for all data types

</code_context>

<specifics>
## Specific Ideas

- Preview field should come from CMS, not auto-generated truncation — gives editorial control over what visitors see first
- Scale + shadow creates "raised card" effect that fits vintage journal aesthetic
- IntersectionObserver approach establishes pattern for Phase 3's map-to-carousel sync

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-core-scroll*
*Context gathered: 2026-03-15*
