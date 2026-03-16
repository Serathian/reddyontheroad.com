---
phase: 03-map-integration
plan: 04
subsystem: ui
tags: [mapbox, react-map-gl, marker, regression-tests, accessibility]
requires:
  - phase: 03-map-integration
    provides: JourneyMap camera sync, 7-entry trail behavior, reduced-motion marker rules
provides:
  - Coordinate-aware current marker rendering via Mapbox Marker primitives
  - Reduced-motion and animated current emphasis tied to real map coordinates
  - Regression tests that fail if marker positioning regresses to CSS pixel translation
affects: [phase-04-rich-content, map-verification, timeline-sync]
tech-stack:
  added: []
  patterns: [marker-primitives-over-css-translation, reactive-mobile-annotation-density]
key-files:
  created: []
  modified:
    - app/components/Map/JourneyMap.tsx
    - tests/components/JourneyMap.test.tsx
key-decisions:
  - "Use Mapbox Marker longitude/latitude props for both current and past stop marker UI"
  - "Keep mobile marker-density behavior reactive via resize-driven viewport state instead of module-scope window reads"
patterns-established:
  - "Coordinate-aware marker pattern: marker UI lives inside react-map-gl Marker with explicit longitude/latitude binding"
  - "Regression pattern: assert marker coordinate props + absence of CSS translate positioning"
requirements-completed: [MAP-01, MAP-02, MAP-03, MAP-04]
duration: 2 min
completed: 2026-03-16
---

# Phase 3 Plan 4: Coordinate-aware marker wiring gap closure Summary

**JourneyMap now renders current and past markers through coordinate-bound Mapbox Marker primitives so animated and reduced-motion emphasis both stay anchored to the active day’s real map location.**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-16T12:02:03Z
- **Completed:** 2026-03-16T12:04:11Z
- **Tasks:** 3
- **Files modified:** 2

## Accomplishments
- Added failing TDD regression tests that require marker longitude/latitude wiring for current, reduced-motion, and past stops.
- Replaced pixel-translated marker buttons with `Marker` primitives in `JourneyMap` and preserved click-to-popup behavior.
- Re-ran map regression checks and production build to confirm MAP-01..MAP-04 and camera/trail behavior remain intact.

## Task Commits

Each task was committed atomically:

1. **Task 1: Add failing regression tests for coordinate-aware current marker wiring** - `c10cfc1` (test)
2. **Task 2: Replace pixel-translated marker buttons with Mapbox Marker primitives in JourneyMap** - `8277c3e` (feat)
3. **Task 3: Run map integration regression suite and production build checks** - `5294b31` (test)

**Plan metadata:** pending (docs commit after state/roadmap updates)

## Files Created/Modified
- `tests/components/JourneyMap.test.tsx` - Marker mock now exposes coordinate props and regression tests assert coordinate binding + no CSS translate fallback.
- `app/components/Map/JourneyMap.tsx` - Marker rendering migrated to `Marker longitude/latitude` with reactive mobile-density helper.

## Decisions Made
- Render marker emphasis through map primitives instead of pixel translation to guarantee geospatial correctness.
- Keep reduced-motion behavior purely decorative (animation toggle only) while preserving identical coordinate placement.

## Deviations from Plan

None - plan executed exactly as written.

## Authentication Gates

None.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- MAP-04 blocker is closed with explicit coordinate-aware regression coverage.
- Phase 3 plan set is complete and ready for transition work.

---
*Phase: 03-map-integration*
*Completed: 2026-03-16*

## Self-Check: PASSED

- FOUND: .planning/phases/03-map-integration/03-map-integration-04-SUMMARY.md
- FOUND: c10cfc1
- FOUND: 8277c3e
- FOUND: 5294b31
