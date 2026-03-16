---
phase: 03-map-integration
plan: 01
subsystem: map
tags: [mapbox, react-map-gl, vitest, contracts]
requires:
  - phase: 02-core-scroll
    provides: Vertical carousel active-day context and DailyEntry model used for map sync
provides:
  - Pinned Mapbox React dependency stack and public token env template
  - Wave 0 JourneyMap/mapData test scaffolds with reusable camera spy mock
  - Typed map synchronization contracts for motion and rolling trail behavior
affects: [03-map-integration, map-rendering, camera-animation]
tech-stack:
  added: [react-map-gl@8.1.0, mapbox-gl@3.20.0, @types/mapbox-gl@3.4.1]
  patterns: [Map camera contract constants, reusable map ref spy factory, todo-first test scaffolding]
key-files:
  created:
    - .env.example
    - tests/mocks/mapbox.ts
    - tests/components/JourneyMap.test.tsx
    - tests/lib/mapData.test.ts
    - app/components/Map/mapContracts.ts
  modified:
    - package.json
    - package-lock.json
key-decisions:
  - "Pin mapbox dependencies to exact versions to avoid integration drift during implementation waves"
  - "Encode camera timing/zoom/trail behavior as exported contracts before feature implementation"
patterns-established:
  - "Map test scaffolds start with it.todo coverage and deterministic mock helpers"
  - "Map motion decisions are centralized in typed constants for downstream consistency"
requirements-completed: [MAP-01, MAP-02, MAP-03, MAP-04]
duration: 3 min
completed: 2026-03-16
---

# Phase 3 Plan 1: Map Integration Foundation Summary

**Mapbox dependencies, Wave 0 map test scaffolds, and typed camera/trail contracts were shipped to unblock deterministic map implementation.**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-16T10:53:08Z
- **Completed:** 2026-03-16T10:55:33Z
- **Tasks:** 3
- **Files modified:** 7

## Accomplishments
- Installed and pinned `react-map-gl`, `mapbox-gl`, and `@types/mapbox-gl` with lockfile updates.
- Added reusable map mock helpers and Wave 0 JourneyMap/mapData scaffold tests that run deterministically.
- Defined `JourneyMapProps`, `TrailPoint`, `CameraTransitionMode`, and map motion/trail constants in a dedicated contract module.

## Task Commits

Each task was committed atomically:

1. **Task 1: Install and pin Mapbox React stack** - `8d855d9` (chore)
2. **Task 2: Create Wave 0 map test scaffolds and reusable map mock** - `32d3ad2` (test)
3. **Task 3: Define interface contracts for map synchronization** - `a6445fb` (feat)

**Plan metadata:** pending final docs commit

## Files Created/Modified
- `.env.example` - documents required `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` setup.
- `package.json` - pins Mapbox integration dependencies.
- `package-lock.json` - lockfile for reproducible dependency resolution.
- `tests/mocks/mapbox.ts` - deterministic map ref and camera spy factory helpers.
- `tests/components/JourneyMap.test.tsx` - Wave 0 JourneyMap scaffold coverage and mock contract validation.
- `tests/lib/mapData.test.ts` - Wave 0 map data rolling-trail scaffold todos.
- `app/components/Map/mapContracts.ts` - typed map sync contracts and locked motion/trail constants.

## Decisions Made
- Pinned the Mapbox stack with exact versions to stabilize downstream integration behavior.
- Centralized camera/timing/trail constraints in exported contracts to prevent interpretation drift in later plans.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Corrected Vitest scaffold placeholder usage in JourneyMap tests**
- **Found during:** Task 2 (Create Wave 0 map test scaffolds and reusable map mock)
- **Issue:** Used `describe.todo(...)`, which does not register placeholder tests for the intended scaffold behavior.
- **Fix:** Switched placeholders to `it.todo(...)` so todo coverage is surfaced correctly in targeted test output.
- **Files modified:** `tests/components/JourneyMap.test.tsx`
- **Verification:** `npm run test:run -- tests/components/JourneyMap.test.tsx tests/lib/mapData.test.ts` showed 5 todo entries and passing execution.
- **Committed in:** `32d3ad2` (part of Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Kept scope unchanged and ensured scaffold output matched Wave 0 intent.

## Issues Encountered
None.

## User Setup Required

External services require manual configuration. See [03-USER-SETUP.md](./03-USER-SETUP.md) for:
- Environment variables to add
- Dashboard configuration steps
- Verification commands

## Next Phase Readiness
- Phase 03 Plan 02 can now implement JourneyMap behavior against stable dependencies, tests, and contracts.
- No blockers from this plan.

---
*Phase: 03-map-integration*
*Completed: 2026-03-16*

## Self-Check: PASSED
