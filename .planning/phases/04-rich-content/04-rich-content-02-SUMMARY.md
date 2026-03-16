---
phase: 04-rich-content
plan: 02
subsystem: ui
tags: [timeline-scrubber, accessibility, carousel, map-sync, nextjs]

requires:
  - phase: 04-rich-content
    provides: FullDayView and session-stable photo rendering from Plan 01
provides:
  - Right-pane carousel/full-day mode orchestration driven by shared activeEntryId state
  - Floating timeline scrubber with drag, keyboard ±1 day movement, and SR announcements
  - Integration coverage for centered-card-only open, back flow, map persistence, and mobile map visibility
affects: [phase-05-deployment, accessibility, ui-transitions]

tech-stack:
  added: []
  patterns:
    - Single-source day state (`activeEntryId`) shared by map, carousel, full-day, and scrubber
    - In-pane content crossfade swap without remounting the map pane

key-files:
  created:
    - app/components/TimelineScrubber/TimelineScrubber.tsx
    - app/components/TimelineScrubber/TimelineScrubber.module.css
    - tests/components/TimelineScrubber.test.tsx
    - tests/components/RichContentShell.test.tsx
  modified:
    - app/page.tsx
    - app/page.module.css
    - app/components/Carousel/Carousel.tsx
    - app/components/Carousel/DayCard.tsx
    - app/components/Carousel/DayCard.module.css
    - app/components/SplitLayout/SplitLayout.module.css

key-decisions:
  - "Kept `activeEntryId` as the only day-selection source of truth and layered `viewMode` on top for pane swaps."
  - "Implemented scrubber as native `input[type=range]` with `aria-valuetext` and live-region announcement to preserve keyboard/AT semantics."

patterns-established:
  - "Right-pane crossfade layers for carousel/full-day swap while map remains mounted"
  - "Centered-card-only full-day entry point enforced at DayCard render contract"

requirements-completed: [CONTENT-02, CONTENT-04]

duration: 22 min
completed: 2026-03-16
---

# Phase 4 Plan 02: Page-mode swap + floating accessible timeline scrubber integration Summary

**Implemented a map-stable right-pane mode switch with centered-card full-day entry, persistent back flow, and an accessible floating timeline scrubber synchronized to the same active day state.**

## Performance

- **Duration:** 22 min
- **Started:** 2026-03-16T18:01:20Z
- **Completed:** 2026-03-16T18:23:37Z
- **Tasks:** 2
- **Files modified:** 10

## Accomplishments
- Added `TimelineScrubber` as a native range control with drag updates, snap-on-release behavior, arrow-key ±1 stepping, and exact SR day announcement format.
- Added page-level `viewMode` orchestration so only the active card opens full-day, with persistent `Back to timeline` and carousel position restoration.
- Added integration tests proving right-pane-only content swap, map mount continuity, and mobile full-day map visibility.

## Task Commits

Each task was committed atomically:

1. **Task 1 (RED): Timeline scrubber failing behavior tests** - `7a2c988` (test)
2. **Task 1 (GREEN): Timeline scrubber implementation** - `d615f91` (feat)
3. **Task 2 (RED): Rich-content shell orchestration failing tests** - `a9d0dc1` (test)
4. **Task 2 (GREEN): Mode swap orchestration and integration wiring** - `697af35` (feat)

## Files Created/Modified
- `app/components/TimelineScrubber/TimelineScrubber.tsx` - Range-based floating scrubber with live announcements and keyboard handling.
- `app/components/TimelineScrubber/TimelineScrubber.module.css` - Vertical-between-panes styling plus mobile horizontal fallback.
- `app/page.tsx` - Introduced `viewMode`, scrubber wiring, full-day swap, and carousel scroll restore.
- `app/page.module.css` - Added quick crossfade layer styles and persistent back button styles.
- `app/components/Carousel/DayCard.tsx` - Added centered-card-only `Open full day` trigger contract.
- `app/components/Carousel/Carousel.tsx` - Added open callback and container ref for scroll restoration.
- `tests/components/TimelineScrubber.test.tsx` - CONTENT-04 behavior and accessibility assertions.
- `tests/components/RichContentShell.test.tsx` - CONTENT-02 orchestration, map persistence, and mobile map visibility assertions.

## Decisions Made
- Kept day synchronization architecture unchanged (`activeEntryId` as single source of truth) and added `viewMode` only for right-pane content selection.
- Chose native range semantics for scrubber interaction and accessibility rather than custom drag widget behavior.

## Deviations from Plan

None - plan executed exactly as written.

## Authentication Gates

None.

## Issues Encountered
- Initial `npm run build` attempt hit the default 120s tool timeout; reran with extended timeout and build passed.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Phase 4 requirements are now fully covered across Plan 01 + Plan 02.
- Ready for Phase 5 deployment planning and performance/accessibility hardening.

## Self-Check: PASSED
- Found summary file: `.planning/phases/04-rich-content/04-rich-content-02-SUMMARY.md`
- Verified commits: `7a2c988`, `d615f91`, `a9d0dc1`, `697af35`
