# Roadmap: Reddy on the Road

## Overview

Transform an 8-month motorhome journey into an interactive digital journal where map and content move together seamlessly. Starting from Next.js foundation and Payload CMS integration, through scroll-driven carousel navigation and map animation, to full content richness and production deployment. The roadmap follows a proven build order that validates core interactions early before adding complexity.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Next.js setup, Payload integration, design system, basic layout
- [ ] **Phase 2: Core Scroll** - Carousel navigation with scroll detection and day cards
- [ ] **Phase 3: Map Integration** - Mapbox animation, trailing path, location markers
- [ ] **Phase 4: Rich Content** - Full day view, photos, timeline scrubber, transitions
- [ ] **Phase 5: Deployment** - Docker container, CI/CD, performance, accessibility

## Phase Details

### Phase 1: Foundation
**Goal**: Establish technical foundation with working Next.js app, CMS integration, and visual design system
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04
**Design System**: MUST implement existing design system from `JOURNAL_DESIGN_SYSTEM.md` and `design-system/reddy-on-the-road/MASTER.md` — DO NOT create new design
**Success Criteria** (what must be TRUE):
  1. Next.js application runs locally with TypeScript and App Router
  2. Server Component fetches daily entries from Payload CMS and renders to HTML
  3. Split-screen layout displays on desktop (map placeholder left, content right) and stacked on mobile
  4. Leather journal aesthetic matches existing design system exactly (aged paper background, Caveat/Crimson Text/Courier Prime fonts, defined color palette, vintage styling)
  5. GPS coordinates are validated with 5-6 decimal precision and stored in standardized format
**Plans**: 5 plans in 3 waves (4 original + 1 gap closure)

Plans:
- [x] 01-01-PLAN.md — Next.js scaffold, fonts, test framework (Wave 1) ✅ 2026-03-15
- [x] 01-02-PLAN.md — Design system CSS implementation (Wave 1) ✅ 2026-03-15
- [x] 01-03-PLAN.md — Split-screen layout + GPS validation (Wave 2) ✅ 2026-03-15
- [x] 01-04-PLAN.md — Mock data implementation (Wave 3) ✅ 2026-03-15
- [ ] 01-05-PLAN.md — [GAP CLOSURE] Complete typography tokens (Wave 1)

### Phase 2: Core Scroll
**Goal**: Users can navigate through daily entries via scrollable carousel with visual feedback
**Depends on**: Phase 1
**Requirements**: CAROUSEL-01, CAROUSEL-02, CAROUSEL-03
**Success Criteria** (what must be TRUE):
  1. User can horizontally scroll through 240 daily entry cards in rolodex-style carousel
  2. Active day is detected automatically as user scrolls (no manual selection needed)
  3. Day cards display date, location name, and preview content clearly
  4. Scroll performance maintains 60fps with <10% JS execution during scroll
**Plans**: 3 plans in 3 waves

Plans:
- [x] 02-01-PLAN.md — Type updates and test infrastructure (Wave 1) ✅ 2026-03-16
- [x] 02-02-PLAN.md — Carousel and DayCard implementation (Wave 2) ✅ 2026-03-16
- [ ] 02-03-PLAN.md — Integration and verification (Wave 3)

### Phase 3: Map Integration
**Goal**: Map displays journey and animates smoothly as user navigates through days
**Depends on**: Phase 2
**Requirements**: MAP-01, MAP-02, MAP-03, MAP-04
**Success Criteria** (what must be TRUE):
  1. Map displays current day's GPS location with visible marker
  2. Map camera flies smoothly to new location when user scrolls to different day
  3. 7-day trailing path shows recent journey route on map (not just single point)
  4. Map instance persists across day changes without re-mounting or flashing
  5. Mapbox tile requests stay under 1000 per full timeline scroll
**Plans**: TBD

### Phase 4: Rich Content
**Goal**: Users can view full daily entries with photos, navigate quickly via timeline, and experience smooth transitions
**Depends on**: Phase 3
**Requirements**: CONTENT-01, CONTENT-02, CONTENT-03, CONTENT-04
**Success Criteria** (what must be TRUE):
  1. User can click centered carousel card to open full day view with all content (photos, diary, metadata)
  2. Full day view replaces carousel without layout shift, map stays visible
  3. Photos display in random order on each visit (different sequence per session)
  4. Timeline scrubber allows user to jump to any day by dragging motorhome icon
  5. Timeline scrubber is keyboard accessible (arrow keys work, screen reader announces day)
**Plans**: TBD

### Phase 5: Deployment
**Goal**: Production-ready application deployed via automated pipeline with optimized performance
**Depends on**: Phase 4
**Requirements**: DEPLOY-01, DEPLOY-02, DEPLOY-03, DEPLOY-04
**Success Criteria** (what must be TRUE):
  1. Docker image builds successfully and is under 200MB in size
  2. GitHub Actions workflow builds and pushes to GHCR on git tag push
  3. Initial page load completes in under 2 seconds on 3G connection
  4. Lighthouse scores: Performance >90, Accessibility >95
  5. Application works with JavaScript disabled (Server Components render content)
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase            | Plans Complete | Status      | Completed  |
| ---------------- | -------------- | ----------- | ---------- |
| 1. Foundation    | 5/5            | Complete    | 2026-03-15 |
| 2. Core Scroll   | 0/TBD          | Not started | -          |
| 3. Map Integration | 0/TBD        | Not started | -          |
| 4. Rich Content  | 0/TBD          | Not started | -          |
| 5. Deployment    | 0/TBD          | Not started | -          |

---
*Last updated: 2026-03-15*
