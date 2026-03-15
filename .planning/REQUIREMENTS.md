# Requirements

## Overview

Requirements extracted from PROJECT.md and validated against research findings. Each requirement maps to exactly one roadmap phase.

## V1 Requirements

### Foundation (FOUND)

- [x] **FOUND-01**: Next.js application with App Router, TypeScript, and design system CSS
  - **Source**: PROJECT.md constraints, ARCHITECTURE.md Phase 1
  - **Why**: Framework foundation for all features
  - **Phase**: Phase 1
  - **Completed**: 2026-03-15 (Plan 01-01)

**FOUND-02**: Payload CMS integration with Server Component data fetching
- **Source**: PROJECT.md constraints, ARCHITECTURE.md Phase 1
- **Why**: CMS integration is required for all content
- **Phase**: Phase 1

**FOUND-03**: Split-screen layout (desktop: map left, carousel right; mobile: stacked)
- **Source**: PROJECT.md requirements, responsive design
- **Why**: Core UI structure for journal experience
- **Phase**: Phase 1

**FOUND-04**: Implement existing leather journal design system exactly as specified
- **Source**: `JOURNAL_DESIGN_SYSTEM.md` and `design-system/reddy-on-the-road/MASTER.md`
- **Specification**: Use defined color palette, typography (Caveat, Crimson Text, Courier Prime), spacing, aged paper texture, vintage aesthetic
- **Constraint**: DO NOT create new design system - implement the existing one
- **Why**: Visual identity already defined and validated, differentiates from generic blogs
- **Phase**: Phase 1

### Carousel Navigation (CAROUSEL)

**CAROUSEL-01**: Rolodex-style carousel with horizontal scroll through daily entries
- **Source**: PROJECT.md requirements
- **Why**: Primary navigation pattern for 240-day journey
- **Phase**: Phase 2

**CAROUSEL-02**: Scroll detection using IntersectionObserver to identify active day
- **Source**: ARCHITECTURE.md Pattern 2, PITFALLS.md Pitfall 2
- **Why**: Performance-critical scroll interaction without event listeners
- **Phase**: Phase 2

**CAROUSEL-03**: Day card UI displaying date, location, preview content
- **Source**: PROJECT.md requirements
- **Why**: Visual representation of daily entries in carousel
- **Phase**: Phase 2

### Map Integration (MAP)

**MAP-01**: Mapbox GL map displays current day's GPS location
- **Source**: PROJECT.md requirements
- **Why**: Core to "story map" concept
- **Phase**: Phase 3

**MAP-02**: Map camera animates smoothly between days as user navigates
- **Source**: PROJECT.md requirements, core value
- **Why**: Unified storytelling experience (map and content move together)
- **Phase**: Phase 3

**MAP-03**: 7-day trailing GPS path shows recent journey context
- **Source**: PROJECT.md requirements
- **Why**: Visual storytelling — "where we've been this week"
- **Phase**: Phase 3

**MAP-04**: Current location marker with animation
- **Source**: FEATURES.md table stakes
- **Why**: Clear visual indicator of current day's location
- **Phase**: Phase 3

### Rich Content (CONTENT)

**CONTENT-01**: Full day view displays date, location, weather, distance, markdown diary
- **Source**: PROJECT.md requirements
- **Why**: Complete journal entry with all metadata
- **Phase**: Phase 4

**CONTENT-02**: Full day view replaces carousel without UI shift, map stays visible
- **Source**: PROJECT.md requirements, key decisions
- **Why**: Cleaner state transitions, maintains spatial context
- **Phase**: Phase 4

**CONTENT-03**: Photos fetched by date and randomized each visit
- **Source**: PROJECT.md requirements
- **Why**: Keeps experience fresh for repeat visitors
- **Phase**: Phase 4

**CONTENT-04**: Timeline scrubber with motorhome icon allows jumping to any day
- **Source**: PROJECT.md requirements
- **Why**: Quick navigation across 240 days, whimsical thematic touch
- **Phase**: Phase 4

### Deployment (DEPLOY)

**DEPLOY-01**: Docker container with standalone output mode (<200MB)
- **Source**: PROJECT.md requirements, PITFALLS.md Pitfall 8
- **Why**: Required for Docker Compose stack
- **Phase**: Phase 5

**DEPLOY-02**: CI/CD pipeline builds and pushes to GitHub Container Registry on tag push
- **Source**: PROJECT.md requirements
- **Why**: Automated deployment workflow
- **Phase**: Phase 5

**DEPLOY-03**: Performance optimization (photo prefetch, map tile preload)
- **Source**: ARCHITECTURE.md Phase 5
- **Why**: Fast load times, smooth interactions
- **Phase**: Phase 5

**DEPLOY-04**: Accessibility pass (keyboard navigation, ARIA labels, reduced motion)
- **Source**: ARCHITECTURE.md Phase 5, PITFALLS.md Pitfall 7
- **Why**: WCAG AA compliance, inclusive experience
- **Phase**: Phase 5

## V2 Requirements (Deferred)

Future enhancements after v1.0 validation:

- Search/filter by location
- Export to PDF / print version
- Multi-language support
- Analytics tracking

## Explicitly Excluded

Features that will NOT be implemented (from PROJECT.md Out of Scope):

- CMS implementation — Built separately
- Photo storage decision — TBD (S3 vs Payload media)
- Week-based grouping — Ditched in favor of pure daily linear progression
- User accounts / authentication — Personal journal, no auth needed
- Social sharing features — Private keepsake
- Multiple journey support — Single trip only
- Content editing — Read-only frontend

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete |
| FOUND-02 | Phase 1 | Pending |
| FOUND-03 | Phase 1 | Pending |
| FOUND-04 | Phase 1 | Complete |
| CAROUSEL-01 | Phase 2 | Pending |
| CAROUSEL-02 | Phase 2 | Pending |
| CAROUSEL-03 | Phase 2 | Pending |
| MAP-01 | Phase 3 | Pending |
| MAP-02 | Phase 3 | Pending |
| MAP-03 | Phase 3 | Pending |
| MAP-04 | Phase 3 | Pending |
| CONTENT-01 | Phase 4 | Pending |
| CONTENT-02 | Phase 4 | Pending |
| CONTENT-03 | Phase 4 | Pending |
| CONTENT-04 | Phase 4 | Pending |
| DEPLOY-01 | Phase 5 | Pending |
| DEPLOY-02 | Phase 5 | Pending |
| DEPLOY-03 | Phase 5 | Pending |
| DEPLOY-04 | Phase 5 | Pending |

**Coverage**: 19/19 requirements mapped ✓

---
*Last updated: 2026-03-15*
