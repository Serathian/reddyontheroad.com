---
phase: 02-core-scroll
plan: 02
subsystem: carousel
tags: [carousel, scroll-snap, intersection-observer, tdd, loading-states]

dependency_graph:
  requires:
    - 02-01-PLAN.md (DailyEntry.preview field, IntersectionObserver mock)
  provides:
    - Carousel component with scroll-snap
    - DayCard component with active state detection
    - SkeletonCard loading state component
  affects:
    - Phase 03 (will consume Carousel for map sync)

tech_stack:
  added:
    - CSS scroll-snap-type: x mandatory
    - IntersectionObserver API (center-detection via rootMargin)
    - CSS Module patterns (component-scoped styles)
  patterns:
    - TDD workflow: RED → GREEN → REFACTOR
    - React forwardRef for list items
    - useRef with Map for dynamic element tracking
    - Ref callback pattern for list updates

key_files:
  created:
    - app/components/Carousel/Carousel.tsx (76 lines)
    - app/components/Carousel/Carousel.module.css (20 lines)
    - app/components/Carousel/DayCard.tsx (37 lines)
    - app/components/Carousel/DayCard.module.css (78 lines)
    - app/components/Carousel/SkeletonCard.tsx (11 lines)
    - app/components/Carousel/SkeletonCard.module.css (67 lines)
    - tests/components/Carousel.test.tsx (127 lines)
    - tests/components/DayCard.test.tsx (60 lines)
  modified:
    - tests/components/Carousel.test.tsx (fixed IntersectionObserver mock constructor)

decisions:
  - title: "IntersectionObserver mock pattern"
    context: "Test suite failing with 'is not a constructor' error when using vi.fn() with arrow function"
    options:
      - "Use vi.stubGlobal with arrow function (failed - cannot use new with arrow functions)"
      - "Use vi.fn with function declaration (chosen - proper constructor semantics)"
      - "Avoid per-test mocking and rely on global mock only"
    chosen: "Use vi.fn with function declaration"
    rationale: "Arrow functions cannot be used with 'new' keyword. Using function declaration preserves constructor semantics while still allowing vi.fn() to track calls"
    impact: "All 6 Carousel tests pass, mock constructor properly tracks IntersectionObserver instantiation"

  - title: "SkeletonCard shimmer animation timing"
    context: "Loading state needs subtle animation consistent with vintage journal aesthetic"
    options:
      - "Fast shimmer (1s) - modern, energetic"
      - "Medium shimmer (2.5s) - chosen, balanced pace"
      - "Slow shimmer (4s) - too subtle, feels sluggish"
    chosen: "2.5s infinite ease-in-out"
    rationale: "Per 02-CONTEXT.md user decision, vintage aesthetic requires slower, more deliberate animations. 2.5s feels intentional without being slow"
    impact: "Shimmer feels consistent with journal page-turn aesthetic"

metrics:
  duration_minutes: 5.5
  completed_at: "2026-03-16T08:28:59Z"
  tasks_completed: 3
  tests_added: 10
  files_created: 8
  commits: 3
---

# Phase 02 Plan 02: Carousel Component Summary

**Horizontal scroll carousel with CSS scroll-snap, IntersectionObserver active detection, and vintage journal card styling**

## What Was Built

### Components
1. **DayCard** - Individual journal entry card with active state styling (TDD)
2. **Carousel** - Horizontal scroll container with center-detection via IntersectionObserver (TDD)
3. **SkeletonCard** - Loading state with vintage paper texture and shimmer animation

### Key Capabilities
- ✅ Horizontal scroll with CSS scroll-snap (mandatory snap to center)
- ✅ Active card detection via IntersectionObserver with center-weighted rootMargin
- ✅ Visual feedback for active card (scale 1.02, elevated shadow)
- ✅ Skeleton loading states with vintage aesthetic
- ✅ Memory leak prevention (observer cleanup on unmount)
- ✅ Accessibility (prefers-reduced-motion support)

### Test Coverage
- **DayCard**: 4/4 tests passing
  - Renders date, location, preview
  - Active state attribute tracking
  - Accessible button element
  - Date formatting
- **Carousel**: 6/6 tests passing
  - Renders all entry cards
  - IntersectionObserver configuration verified
  - Observes all card elements
  - Cleanup on unmount (memory leak prevention)
  - Active state updates on intersection
  - Skeleton cards show during loading

## Execution Flow

### Task 1: DayCard Component (TDD) ✅
**RED** (`c1b1799`): Created failing test expecting DayCard to render entry data
**GREEN** (`0c08e79`): Implemented component with CSS Module, all 4 tests passing
**REFACTOR**: No refactoring needed - clean implementation

**Files created:**
- `app/components/Carousel/DayCard.tsx` - forwardRef component with data attributes
- `app/components/Carousel/DayCard.module.css` - Card styling with active state transform
- `tests/components/DayCard.test.tsx` - 4 behavior tests

### Task 2: Carousel Component (TDD) ✅
**RED** (`0181c28`): Created failing test expecting Carousel to observe cards
**GREEN** (`c63b55b`): Implemented scroll container with IntersectionObserver, all 6 tests passing after mock fix
**REFACTOR**: No refactoring needed - minimal, clean implementation

**Files created:**
- `app/components/Carousel/Carousel.tsx` - Scroll container with center-detection observer
- `app/components/Carousel/Carousel.module.css` - scroll-snap CSS configuration
- `app/components/Carousel/SkeletonCard.tsx` - Loading state component (dependency)
- `app/components/Carousel/SkeletonCard.module.css` - Shimmer animation styles
- `tests/components/Carousel.test.tsx` - 6 behavior tests

### Task 3: SkeletonCard Component ✅
Already created as dependency during Task 2 implementation. Verified structure matches plan spec.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed IntersectionObserver mock constructor pattern**
- **Found during:** Task 2 GREEN phase
- **Issue:** Test file using `vi.fn()` with arrow function cannot be called with `new` keyword, causing "is not a constructor" TypeError in all Carousel tests
- **Fix:** Changed mock setup from arrow function to function declaration: `vi.fn(function(this: any, ...) { ... })`
- **Files modified:** `tests/components/Carousel.test.tsx`
- **Commit:** Part of `c63b55b` (GREEN commit includes test fixes)
- **Verification:** All 6 Carousel tests pass after fix

**2. [Rule 1 - Bug] Wrapped IntersectionObserver callback in act()**
- **Found during:** Task 2 verification
- **Issue:** React warning "An update to Carousel inside a test was not wrapped in act(...)"
- **Fix:** Wrapped `mockObserver.triggerIntersection()` call in `act()` to properly handle state updates
- **Files modified:** `tests/components/Carousel.test.tsx` (line 106-110)
- **Commit:** Part of `c63b55b`
- **Verification:** Warning eliminated, test passes cleanly

**3. [Rule 1 - Bug] Fixed skeleton card test selector**
- **Found during:** Task 2 verification
- **Issue:** Test using `screen.getAllByLabelText('')` failing with "Unable to find a label" error
- **Fix:** Changed to `container.querySelectorAll('[aria-hidden="true"]')` to properly query skeleton cards
- **Files modified:** `tests/components/Carousel.test.tsx` (line 120-124)
- **Commit:** Part of `c63b55b`
- **Verification:** Test passes, skeleton cards detected correctly

## Technical Highlights

### IntersectionObserver Center Detection
Per 02-RESEARCH.md Pattern 2, achieved center-only detection via:
```javascript
rootMargin: '-50% 0px -50% 0px'  // Shrinks intersection zone to middle 50%
threshold: 0                      // Trigger immediately when entering zone
```

This creates a "center stripe" - only the card in the middle of the viewport triggers `isIntersecting: true`.

### Memory Leak Prevention
Per 02-RESEARCH.md Pitfall 1, IntersectionObserver cleanup is critical:
```javascript
useEffect(() => {
  const observer = new IntersectionObserver(...)
  // ... observe cards ...
  return () => observer.disconnect() // CRITICAL: prevents memory leaks
}, [entries])
```

Without cleanup, observer callbacks fire on unmounted components → console errors and memory leaks.

### Ref Callback Pattern for Dynamic Lists
Per 02-RESEARCH.md Pattern 3, used ref callback instead of createRef() for list items:
```javascript
ref={(el) => {
  if (el) {
    cardRefs.current.set(entry.id, el)
  } else {
    cardRefs.current.delete(entry.id)
  }
}}
```

This pattern handles list updates (add/remove) gracefully - refs update automatically when entries change.

### CSS scroll-snap Behavior
```css
scroll-snap-type: x mandatory;  /* Force snap (can't stop mid-scroll) */
scroll-behavior: smooth;        /* Animated scroll transitions */
```

Alternative `proximity` would allow stopping between cards, breaking the "one active card" pattern.

## Verification

### Automated Tests
```bash
npm test -- tests/components/
```
**Result:** ✅ 14/14 tests passing
- DayCard: 4/4 passing
- Carousel: 6/6 passing
- MapView: 4/4 passing (from 02-01)

### Production Build
```bash
npm run build
```
**Result:** ✅ Compiled successfully in 1294.9ms
- TypeScript validation passed
- All routes generated
- No build errors

### Code Quality
- ✅ No TypeScript errors
- ✅ CSS Modules scoped correctly
- ✅ IntersectionObserver cleanup verified
- ✅ Accessibility attributes present (aria-hidden, prefers-reduced-motion)
- ✅ Design tokens used consistently (--journal-paper-stained, --shadow-md, etc.)

## Success Criteria Met

From 02-02-PLAN.md must_haves:

✅ **User can horizontally scroll through daily entry cards** - Carousel renders with overflow-x: auto
✅ **Cards snap to center position using native CSS scroll-snap** - scroll-snap-type: x mandatory applied
✅ **Active (centered) card is detected automatically via IntersectionObserver** - rootMargin center-detection working
✅ **Active card shows visual feedback (scale + shadow)** - data-active="true" triggers transform: scale(1.02) and elevated shadow
✅ **Cards display date, location, and preview content** - DayCard renders all three fields from DailyEntry
✅ **Loading state shows skeleton cards with vintage aesthetic** - SkeletonCard with shimmer animation on journal-paper-stained background

## Commits

| Hash    | Type | Message                                            |
| ------- | ---- | -------------------------------------------------- |
| c1b1799 | test | Add failing test for DayCard component             |
| 0c08e79 | feat | Implement DayCard component with active state      |
| 0181c28 | test | Add failing test for Carousel component            |
| c63b55b | feat | Implement Carousel with scroll-snap and active detection |

## Next Steps

**Phase 02 Plan 03** (next in wave): Likely integrates Carousel with MapView or adds scroll-based navigation features.

**Phase 03** (downstream consumer): Will sync Carousel scroll position with map camera animation - uses activeId state and scroll events from this plan's Carousel.

## Self-Check

Verifying all claimed artifacts exist:

**Files created:**
- ✅ app/components/Carousel/Carousel.tsx
- ✅ app/components/Carousel/Carousel.module.css
- ✅ app/components/Carousel/DayCard.tsx
- ✅ app/components/Carousel/DayCard.module.css
- ✅ app/components/Carousel/SkeletonCard.tsx
- ✅ app/components/Carousel/SkeletonCard.module.css
- ✅ tests/components/Carousel.test.tsx
- ✅ tests/components/DayCard.test.tsx

**Commits exist:**
- ✅ c1b1799 (test: DayCard RED)
- ✅ 0c08e79 (feat: DayCard GREEN)
- ✅ 0181c28 (test: Carousel RED)
- ✅ c63b55b (feat: Carousel GREEN)

**Tests passing:**
- ✅ DayCard: 4/4 tests
- ✅ Carousel: 6/6 tests
- ✅ Build: ✅ Success

## Self-Check: PASSED
