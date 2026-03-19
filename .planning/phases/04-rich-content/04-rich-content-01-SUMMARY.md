---
phase: 04-rich-content
plan: 01
subsystem: ui
tags: [react-markdown, remark-gfm, yet-another-react-lightbox, sessionStorage, vitest]

# Dependency graph
requires:
  - phase: 03.1-maptiler-migration
    provides: active day synchronization between map and content panes
provides:
  - Session-stable per-day photo shuffle helpers with cache key `photo-order:{entryId}`
  - Diary-first FullDayView rendering full markdown with conditional metadata chips
  - PhotoCollage with exact empty-photo copy and in-place lightbox navigation controls
affects: [phase-04-plan-02, full-day-mode, timeline-scrubber]

# Tech tracking
tech-stack:
  added: [react-markdown, remark-gfm, yet-another-react-lightbox]
  patterns: [tdd-red-green, session-scoped-photo-ordering, diary-first-full-day-layout]

key-files:
  created:
    - lib/richContent/photoShuffle.ts
    - app/components/FullDayView/FullDayView.tsx
    - app/components/FullDayView/FullDayView.module.css
    - app/components/PhotoCollage/PhotoCollage.tsx
    - app/components/PhotoCollage/PhotoCollage.module.css
    - tests/lib/photoShuffle.test.ts
    - tests/components/FullDayView.test.tsx
  modified:
    - package.json
    - package-lock.json

key-decisions:
  - "Use `sessionStorage` keyed by `photo-order:{entryId}` so each day randomizes once per browser session and stays stable across re-renders."
  - "Embed lightweight previous/next lightbox controls in `PhotoCollage` to keep full-day photo navigation in-place without route changes."
  - "Treat duplicate cached indices as invalid and regenerate order to preserve true shuffle permutations."

patterns-established:
  - "Diary-first rendering order: header/date-location → optional chips → markdown body → photos"
  - "Photo randomization returns a new array and never mutates source photo collections"

requirements-completed: [CONTENT-01, CONTENT-03]

# Metrics
duration: 2 min
completed: 2026-03-19
---

# Phase 4 Plan 1: Full-day diary/photos surface + session-stable randomization Summary

**Diary-first full-day rendering ships with full markdown content, session-stable per-day photo collage ordering, and hardened cached-order validation for resilient lightbox browsing.**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-19T07:29:04Z
- **Completed:** 2026-03-19T07:31:07Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Re-verified rich-content dependencies, `FullDayView`, and `PhotoCollage` behavior against plan verification commands.
- Added regression coverage for malformed cached photo orders to protect session-stable randomization guarantees.
- Hardened `photoShuffle` cache validation to reject duplicate index arrays before rendering collage/lightbox sequences.

## Task Commits

Each task was committed atomically:

1. **Task 1 (RED): session-stable photo shuffle tests** - `fe192e8` (test)
2. **Task 1 (GREEN): photo shuffle + dependencies** - `84a4255` (feat)
3. **Task 2 (RED): full day view behavior tests** - `6ef81e7` (test)
4. **Task 2 (GREEN): full day view + collage + lightbox** - `657be5c` (feat)
5. **Task 1 (Rule 1 RED): invalid cache regression test** - `3e54ace` (test)
6. **Task 1 (Rule 1 GREEN): unique-order cache validation** - `2d0a2aa` (feat)

**Plan metadata:** pending

## Files Created/Modified
- `lib/richContent/photoShuffle.ts` - Session-scoped per-day photo ordering + safe shuffle application.
- `tests/lib/photoShuffle.test.ts` - TDD guarantees for cache write, same-session stability, and per-day isolation.
- `app/components/FullDayView/FullDayView.tsx` - Diary-first full-day renderer with markdown + metadata chips + collage section.
- `app/components/PhotoCollage/PhotoCollage.tsx` - Journal collage layout with exact empty state and in-place lightbox controls.
- `tests/components/FullDayView.test.tsx` - Rendering and photo interaction contract tests for CONTENT-01/03.

## Decisions Made
- Used `sessionStorage` with explicit per-day key format (`photo-order:{entryId}`) to guarantee deterministic session behavior.
- Kept lightbox interaction inside `PhotoCollage` (instead of extra wrapper) to satisfy plan scope and reduce integration complexity.
- Enforced unique permutation validation for cached index arrays so stale/corrupted `sessionStorage` values cannot yield duplicate photos.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Reject duplicate cached photo index orders**
- **Found during:** Task 1 (session-stable photo shuffle utility)
- **Issue:** `isValidOrder` accepted duplicate indices, allowing malformed `sessionStorage` values to produce repeated photos and missing entries.
- **Fix:** Added failing regression test, then updated validation to require set cardinality equal to photo count before reusing cached order.
- **Files modified:** `tests/lib/photoShuffle.test.ts`, `lib/richContent/photoShuffle.ts`
- **Verification:** `npm run test:run -- tests/lib/photoShuffle.test.ts` and `npm run test:run -- tests/components/FullDayView.test.tsx tests/lib/photoShuffle.test.ts`
- **Committed in:** `3e54ace`, `2d0a2aa`

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Fix tightens CONTENT-03 correctness without scope creep; all planned behavior remains intact.

## Issues Encountered
None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Ready for `04-02-PLAN.md` to wire page-level mode switching and timeline scrubber integration.
- Full-day rich content and photo contracts are in place and now resilient to corrupted cached photo-order values.

---
*Phase: 04-rich-content*
*Completed: 2026-03-19*

## Self-Check: PASSED

- Verified key files exist on disk.
- Verified task commit hashes exist in git history.
