# Reddy on the Road - Digital Travel Journal

## What This Is

A Next.js frontend that presents an 8-month motorhome trip as an interactive digital journal. As visitors scroll through daily entries, an animated map traces the journey with a trailing path showing the previous ~7 days. Content is fetched from a Payload CMS (built separately), and photos are dynamically loaded by date with randomization for variety. The interface uses a vintage leather-bound diary aesthetic with a rolodex-style carousel for navigating through ~240 days of travel.

## Core Value

The map and content must move together seamlessly—as you navigate through days, the map animates to show where the family was, creating a unified storytelling experience that feels like flipping through a well-traveled journal.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] User can scroll through daily journal entries in a rolodex-style carousel
- [ ] Map displays current day's GPS location with 7-day trailing path
- [ ] Map smoothly animates as user navigates between days
- [ ] Timeline scrubber with motorhome icon allows jumping to any day
- [ ] Clicking centered carousel card opens full day view (replaces carousel, no UI shift)
- [ ] Full day view displays: date, location, weather, distance, photos, markdown diary content
- [ ] Photos are fetched by date and randomized each visit
- [ ] Daily entries fetch from Payload CMS (REST or GraphQL API)
- [ ] Interface implements leather-bound journal design system (aged paper, handwritten fonts, vintage aesthetic)
- [ ] Docker container builds for standalone deployment
- [ ] CI/CD pipeline builds and pushes to GitHub Container Registry on tag push
- [ ] Responsive design: desktop split-screen (map left, carousel right), mobile stacked layout

### Out of Scope

- CMS implementation — Built in parallel, outside this project
- Photo storage decision — TBD (S3 vs Payload media)
- Week-based grouping — Ditched in favor of pure daily linear progression
- User accounts / authentication — Personal family journal, no auth needed
- Social sharing features — Private keepsake, not for social distribution
- Multiple journey support — Single trip only (8 months in 2022)
- Content editing — Read-only frontend, editing happens in CMS

## Context

**Trip Details:**
- 8-month motorhome journey in 2022 with wife and 3-year-old
- Trip is complete, content is retrospective
- ~240 days of daily entries

**CMS (Payload, separate project):**
- Each daily entry contains: GPS coordinates, location (plain text), distance (optional), weather (optional), markdown diary text
- Exposes REST and GraphQL APIs
- Photo storage mechanism TBD

**Design System:**
- **CRITICAL**: MUST use existing design system — DO NOT create new design
- Complete specification in `JOURNAL_DESIGN_SYSTEM.md` and `design-system/reddy-on-the-road/MASTER.md`
- Typography: Caveat (handwritten headers), Crimson Text (body serif), Courier Prime (metadata)
- Color palette: aged cream paper (#F5F1E8), rich leather browns (#3E2723-#8D6E63), sepia tones
- Effects: Paper grain textures, vintage photo frames, ink bleed, torn edges
- Implementation: Convert existing CSS variables and styles to Next.js CSS Modules

**Existing Prototype:**
- Static HTML/CSS/JS prototype exists (`journal-prototype.html`)
- Demonstrates design system, scroll interactions, split-screen layout
- Mapbox GL JS v2.15.0 included but placeholder implementation
- Serves as visual/interaction reference for Next.js build

**Deployment Context:**
- Part of larger Docker Compose stack
- Needs standalone Docker container
- GitHub Actions CI pushes to GitHub Container Registry (ghcr.io)

**Primary Audience:**
- Personal family keepsake
- Shared with family/friends via URL
- Not intended for public discovery or SEO

## Constraints

- **Framework**: Next.js — Required for this frontend
- **CMS Integration**: Payload REST or GraphQL API — CMS already chosen and built separately
- **Map Library**: Mapbox GL JS v2.15.0 — Already prototyped, proven for scroll-driven animation
- **Containerization**: Docker — Must produce standalone container for Docker Compose stack
- **CI/CD**: GitHub Actions pushing to GHCR — Required for deployment pipeline
- **Design**: Leather journal aesthetic — Complete design system exists, must be preserved
- **Navigation**: Rolodex carousel + timeline scrubber — Settled UX pattern, no modal overlays or UI shifting
- **Photo Loading**: Date-based with randomization — Photos named by date, fetched and randomized client-side

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Ditch week groupings, use pure daily linear progression | More natural continuous journey feel, simpler mental model | — Pending |
| Rolodex carousel with center-focused card | Vintage aesthetic fit, easy navigation without overwhelming 240 days | — Pending |
| Full day view replaces carousel (no overlay/modal) | Avoids UI shifting, cleaner state transitions | — Pending |
| Map stays visible in both carousel and full day views | Maintains spatial context throughout experience | — Pending |
| Photos randomized per visit | Keeps experience fresh for repeat visitors, no two scrolls the same | — Pending |
| Timeline scrubber with motorhome icon | Whimsical touch, fits travel theme, provides quick navigation | — Pending |
| Next.js over vanilla HTML | Enables CMS integration, server-side rendering, build optimization, Docker containerization | — Pending |

---
*Last updated: 2026-03-14 after initialization*
