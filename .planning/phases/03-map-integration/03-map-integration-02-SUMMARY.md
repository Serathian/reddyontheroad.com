---
phase: 03-map-integration
plan: 02
subsystem: map
tags: [mapbox, geojson, vitest, trail-window, opacity]
requires:
  - phase: 03-map-integration
    provides: map contracts, test scaffolds, and pinned map dependencies from plan 01
provides:
  - Deterministic 7-entry trail windowing and GeoJSON builders with future-path exclusion
  - Stop-point metadata carrying ageIndex/ageOpacity for visual fading
  - Mapbox layer definitions for trail line, past stops, and emphasized current stop
affects: [03-map-integration-03, map-rendering, carousel-map-sync]
tech-stack:
  added: []
  patterns: [sequence-based trail windows, pure map data builders, age-based visual hierarchy]
key-files:
  created: [lib/mapData.ts, app/components/Map/mapLayers.ts]
  modified: [tests/lib/mapData.test.ts]
key-decisions:
  - "Use sequence-based last-7 entry slicing ending at active index instead of calendar slicing"
  - "Encode visual fading through stop-point ageOpacity metadata consumed by map layers"
patterns-established:
  - "Trail computation is pure and deterministic: getTrailWindow -> buildTrailGeoJSON/buildStopPointsGeoJSON"
  - "Layer paint expressions consume feature metadata rather than embedding timeline logic in UI code"
requirements-completed: [MAP-03]
duration: 2 min
completed: 2026-03-16
---

# Phase 3 Plan 2: MAP-03 trail data and layer primitives Summary

**Sequence-based 7-entry map trail generation now outputs deterministic GeoJSON with age-fade metadata, and Mapbox layers consume that metadata to render current-vs-past hierarchy without exposing future path.**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-16T11:00:27Z
- **Completed:** 2026-03-16T11:03:11Z
- **Tasks:** 3
- **Files modified:** 3

## Accomplishments
- Converted MAP-03 TODO scaffolds into strict unit tests for 7-entry windows, future-path exclusion, and opacity aging behavior.
- Implemented pure `mapData` builders for trail windows, LineString output, and stop point feature metadata.
- Added Mapbox layer configs for trail line, muted past stops, and emphasized current stop ready for JourneyMap wiring.

## Task Commits

Each task was committed atomically:

1. **Task 1: Convert MAP-03 scaffolds into strict unit tests** - `86d0d4b` (test)
2. **Task 2: Implement map data builders for 7-entry trail and stop points** - `943d62d` (feat)
3. **Task 3: Define Mapbox layer configurations consuming age metadata** - `930d9cd` (feat)

**Plan metadata:** Pending final docs commit

## Files Created/Modified
- `tests/lib/mapData.test.ts` - Strict MAP-03 tests for trail windowing, future filtering, and opacity ordering.
- `lib/mapData.ts` - Pure trail window + GeoJSON builders with exported constants and age metadata.
- `app/components/Map/mapLayers.ts` - Layer configuration exports for trail, past stops, and current stop emphasis.

## Decisions Made
- Kept trail selection deterministic and index-based to match carousel sequence semantics.
- Carried age-derived opacity in feature properties so visualization stays declarative in layer paint expressions.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Plan 03 can now wire `JourneyMap` directly to `mapData` outputs and `mapLayers` exports.
- MAP-03 requirement is covered by automated tests and build verification.

---
*Phase: 03-map-integration*
*Completed: 2026-03-16*

## Self-Check: PASSED
