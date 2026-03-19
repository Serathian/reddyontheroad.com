# Feature Research

**Domain:** Interactive travel journal / story map
**Researched:** 2026-03-14
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Map with route visualization | Core to "story map" concept — users expect to see where you went | MEDIUM | Mapbox GL JS v2.15.0 already prototyped; animated path showing journey progression |
| Daily entries with location markers | Expected in any travel journal — shows "what happened where" | LOW | GPS coordinates per entry, marker placement on map |
| Photo galleries per entry | Travel is visual — photos are the proof and memory trigger | MEDIUM | Date-based fetching with randomization already in requirements |
| Chronological navigation | Users expect to move through time linearly (back/forward through days) | MEDIUM | Rolodex carousel + timeline scrubber already decided |
| Mobile-responsive design | Most users view travel content on phones | MEDIUM | Desktop split-screen, mobile stacked layout already in requirements |
| Written journal entries | Text narrative is core to "journal" concept | LOW | Markdown from CMS, display formatting needed |
| Date/location metadata | Users expect to know "when and where" for each entry | LOW | Date, location name, GPS from CMS |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required, but valuable.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Scroll-synchronized map animation | Map and content move together — unique unified storytelling | HIGH | Core value prop — map animates as carousel scrolls through days |
| 7-day trailing path | Shows journey context, not just single points | MEDIUM | Visual storytelling — "where we've been this week" |
| Vintage leather journal aesthetic | Feels like flipping through a real travel diary | MEDIUM | Complete design system exists (JOURNAL_DESIGN_SYSTEM.md) |
| Photo randomization per visit | Keeps experience fresh for repeat visitors | LOW | Date-based photos shuffled client-side each load |
| No-navigation full-day view | Expands in place without UI shift — cleaner state transitions | MEDIUM | Replaces carousel, map stays visible, no modal overlay |
| Weather + distance metadata | Adds environmental context to each day | LOW | Optional fields from CMS, nice storytelling detail |
| Timeline scrubber with motorhome icon | Whimsical, thematic, provides quick navigation across 240 days | MEDIUM | Visual charm + functional utility |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Social sharing / comments | "Let people share/discuss entries" | Turns private family keepsake into social platform; moderation burden | Share entire journal URL with family/friends; no per-entry sharing |
| Real-time GPS tracking | "Show where you are now" | Trip is retrospective (2022), not ongoing; complexity for no value | Static completed journey, not live tracking |
| Multi-trip support | "Track all your trips" | Single-trip focus keeps scope manageable; different trips = different projects | One journey, deeply documented |
| User accounts / authentication | "Let people save favorites" | Personal journal, not user-facing app; adds complexity | Public read-only access, no accounts needed |
| Interactive map editing | "Let users add their own pins" | Not a planning tool, it's a finished story | Read-only map, content managed via CMS |
| Week-based grouping | "Organize by weeks instead of days" | Already rejected — less natural than continuous daily progression | Pure linear daily timeline |
| Video playback | "Embed videos in entries" | Large files, hosting complexity, bandwidth costs | Photos with captions tell the story; link to external videos if needed |
| Route optimization / planning | "Show best route between points" | Not a planning tool — showing actual route taken, not optimal | Display actual journey path, historical not prescriptive |

## Feature Dependencies

```
[Daily entries]
    └──requires──> [Map markers]
                       └──requires──> [GPS coordinates]

[Scroll-synchronized animation]
    └──requires──> [Map integration]
    └──requires──> [Daily entries]
    └──requires──> [Carousel navigation]

[Full-day view]
    └──requires──> [Daily entries]
    └──requires──> [Photo fetching]
    └──requires──> [Markdown rendering]

[Timeline scrubber]
    └──requires──> [Daily entries]
    └──enhances──> [Carousel navigation]

[7-day trailing path]
    └──requires──> [Map integration]
    └──requires──> [GPS coordinates]
    └──enhances──> [Scroll-synchronized animation]

[Photo randomization]
    └──requires──> [Photo fetching]
    └──enhances──> [Full-day view]
```

### Dependency Notes

- **Daily entries require GPS coordinates:** No coordinates = no map markers, core feature broken
- **Scroll-synchronized animation requires map + carousel:** This is the core value prop; both systems must work together smoothly
- **Full-day view requires photo fetching:** Can't expand to full view without loading photos
- **Timeline scrubber enhances carousel navigation:** Provides quick jumping, but carousel is primary navigation
- **7-day trailing path enhances map animation:** Adds context to single-point markers, shows journey flow
- **Photo randomization enhances full-day view:** Adds replay value without changing core content

## MVP Definition

### Launch With (v1)

Minimum viable product — what's needed to validate the concept.

- [x] **Rolodex carousel navigation** — Core navigation pattern, shows daily entries in scrollable format
- [x] **Map with current location marker** — Essential for "story map" concept
- [x] **Full-day view with photos** — Core content display, reason to click into entries
- [x] **Markdown diary content from CMS** — The actual journal narrative
- [x] **Responsive layout (desktop/mobile)** — Must work on phones where most viewing happens
- [x] **Leather journal design system** — Visual identity, differentiates from generic blogs
- [x] **Date, location, weather, distance metadata** — Context for each day
- [x] **Docker container + CI/CD** — Required for deployment into existing stack

### Add After Validation (v1.x)

Features to add once core is working.

- [ ] **Scroll-synchronized map animation** — Add once basic map + carousel proven; complex interaction to debug
- [ ] **7-day trailing path** — Enhance map once animation working smoothly
- [ ] **Timeline scrubber with motorhome icon** — Add when users request faster navigation across 240 days
- [ ] **Photo randomization** — Polish feature, add when repeat visitors identified

### Future Consideration (v2+)

Features to defer until product-market fit is established.

- [ ] **Search/filter by location** — Only add if users want to jump to specific places
- [ ] **Export to PDF / print version** — Only if users request physical copies
- [ ] **Multi-language support** — Only needed if shared beyond English-speaking family/friends
- [ ] **Analytics tracking** — Only add if curious about usage patterns

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Daily entries display | HIGH | LOW | P1 |
| Map with markers | HIGH | MEDIUM | P1 |
| Photo galleries | HIGH | MEDIUM | P1 |
| Carousel navigation | HIGH | MEDIUM | P1 |
| Full-day view | HIGH | MEDIUM | P1 |
| Responsive design | HIGH | MEDIUM | P1 |
| Leather journal aesthetic | MEDIUM | MEDIUM | P1 |
| Scroll-synchronized animation | HIGH | HIGH | P2 |
| 7-day trailing path | MEDIUM | MEDIUM | P2 |
| Timeline scrubber | MEDIUM | MEDIUM | P2 |
| Photo randomization | LOW | LOW | P2 |
| Weather/distance metadata | LOW | LOW | P2 |
| Search/filter | MEDIUM | MEDIUM | P3 |
| Export to PDF | LOW | HIGH | P3 |

**Priority key:**
- P1: Must have for launch (core experience)
- P2: Should have, add after core proven
- P3: Nice to have, future consideration

## Competitor Feature Analysis

| Feature | Polarsteps (tracking app) | StoryMapJS (story maps) | Our Approach |
|---------|--------------------------|-------------------------|--------------|
| Map visualization | Real-time tracking with animated route | Slide-by-slide point markers | Scroll-synchronized animation with 7-day trailing path |
| Navigation | Chronological timeline | Linear slide progression | Rolodex carousel + timeline scrubber for 240-day journey |
| Content display | Step-by-step updates | Slides with media + text | Full-day view (no modal) with photos, weather, markdown diary |
| Design aesthetic | Modern app UI | Clean/minimal web | Vintage leather journal (aged paper, handwritten fonts) |
| Privacy | Private/friends/public toggles | Embeddable anywhere | Private URL sharing, no auth needed |
| Retrospective use | Active trip tracking | Post-trip story creation | Completed journey (2022), purely retrospective |
| Photo handling | Chronological uploads | Manual media placement | Date-based fetching with randomization |
| Audience | Travelers tracking ongoing trips | Journalists/educators telling stories | Personal family keepsake |

## Sources

- **StoryMapJS** (https://storymap.knightlab.com/) — Knight Lab story mapping tool, analyzed slide-based navigation and media integration patterns
- **Polarsteps** (https://www.polarsteps.com/) — Travel tracking app with 19M+ users, analyzed GPS tracking, photo galleries, social features, privacy controls
- **Mapme** (https://mapme.com/) — Interactive map builder, analyzed customization, media embedding, 3D features
- **Travellerspoint** (https://www.travellerspoint.com/) — Travel community with mapping and blogging, analyzed travel journal + map integration
- **Wanderlog** (https://wanderlog.com/) — Trip planning app, analyzed itinerary features, collaborative planning (excluded planning-specific features)

**Confidence rationale:**
- HIGH confidence — Reviewed 5+ established platforms in adjacent domains (story maps, travel tracking, trip planning)
- Feature categorization based on consistent patterns across all platforms
- Table stakes = features present in ALL platforms reviewed
- Differentiators = unique to project requirements, not commonly seen in competitors
- Anti-features = explicitly rejected in PROJECT.md or problematic based on use case (retrospective, not planning)

---
*Feature research for: Interactive travel journal / story map*
*Researched: 2026-03-14*
