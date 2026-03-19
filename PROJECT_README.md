# Reddy on the Road
**A Leather-Bound Travel Diary Website**

## Project Overview

This is a digital travel diary documenting a family's 12-week motorhome journey from Finland to Spain and back in Summer 2022. The website features a scroll-driven map animation with a weathered, leather-bound journal aesthetic.

### Key Features
- **Split-screen layout**: Fixed interactive map (left) + scrolling weekly timeline (right)
- **Scroll-driven animation**: Map route animates as user scrolls through weeks
- **Journal aesthetic**: Aged paper, leather textures, handwritten fonts
- **Weekly structure**: ~12 weeks of travel stories (200-300 words + photos per week)
- **Responsive**: Stacked layout on mobile (sticky map top, scrolling content below)

---

## Current Design System

### ✅ Active Design: Leather Journal Aesthetic

**Color Palette:**
- **Aged Paper**: #F5F1E8 (main background), #EDE8DC, #E8E0D0
- **Leather Browns**: #3E2723 (dark), #5D4037 (medium), #8D6E63 (cognac)
- **Ink Colors**: #1A1412 (black), #4A3C35 (faded), #2C3E50 (blue)
- **Sepia Tones**: #F4ECD8 (light), #D4C4A8 (medium), #A89476 (dark)
- **Vintage Accents**: #A0522D (red ribbon), #B8860B (gold), #556B2F (green)

**Typography:**
- **Handwritten**: Caveat (headings, annotations, titles)
- **Body Serif**: Crimson Text (paragraphs, captions, readable content)
- **Monospace**: Courier Prime (dates, stats, data)

**Textures:**
- Paper grain overlay (SVG noise pattern)
- Leather gradient (navigation, headers)
- Vintage photo frames (Polaroid-style with rotation)
- Stitched borders (dashed lines on cards)

**Components:**
- Leather navigation bar with texture
- Ribbon bookmark progress indicator
- Week cards with stitched detail
- Vintage photo frames with handwritten captions
- Typewriter-style statistics

---

## File Structure

### 📘 Primary Documentation (Read These)
- **`JOURNAL_DESIGN_SYSTEM.md`** - Complete design specifications, color palette, typography, components, accessibility
- **`MAP_ANIMATION_IMPLEMENTATION.md`** - Mapbox integration guide with scroll animation code examples

### 🌐 Working Prototypes
- **`journal-prototype.html`** - Full working demo with journal aesthetic (START HERE)
- **`journal-palette-preview.html`** - Visual color/texture reference with samples

### ⚙️ Configuration
- **`design-system-styles.css`** - CSS variables and base styles ready to use
- **`tailwind.config.example.js`** - Tailwind config with custom colors/fonts (if using Tailwind)

### 📁 Archived (Reference Only)
Files with "coffee palette" or outdated designs - kept for reference but not current:
- `DESIGN_SYSTEM.md` (old coffee palette)
- `MODERN_DESIGN_SYSTEM.md` (transition design)
- `modern-prototype.html` (old coffee aesthetic)
- `color-palette-preview.html` (old colors)
- `example.html` (early vertical timeline)
- `MODERN_SUMMARY.md`, `QUICK_START.md`, `README.md` (outdated guides)
- `MAP_IMPLEMENTATION.md` (basic version, use MAP_ANIMATION_IMPLEMENTATION.md instead)

---

## Quick Start Guide

### 1. Review the Design
```bash
# Open in browser to see the current design
open journal-prototype.html
open journal-palette-preview.html
```

### 2. Read the Documentation
- Start with `JOURNAL_DESIGN_SYSTEM.md` for complete design specs
- Reference `MAP_ANIMATION_IMPLEMENTATION.md` for map integration

### 3. Key Design Principles
- **Aesthetic**: Weathered, personal, diary-like (not formal or corporate)
- **Colors**: Aged paper (#F5F1E8) + rich leather browns (NOT yellowish tones)
- **Typography**: Handwritten warmth (Caveat) + readable serif (Crimson Text)
- **Textures**: Paper grain, leather, vintage photos
- **Animation**: Subtle, organic (page turning, not digital transitions)

### 4. Content Structure
Each week includes:
- Week number + handwritten title
- Route (cities visited)
- Date range (Summer 2022)
- Photo gallery (3-5 photos in vintage frames)
- Story text (200-300 words)
- Statistics (distance, stops, photos, highlights)

---

## Technical Stack

- **HTML/CSS**: Vanilla (no framework required)
- **Fonts**: Google Fonts (Caveat, Crimson Text, Courier Prime)
- **Map**: Mapbox GL JS v2.15.0 (for route animation)
- **Optional**: Tailwind CSS (config provided)
- **Browser Support**: Modern evergreen browsers (Chrome, Firefox, Safari, Edge)

---

## Next Steps for Development

### Phase 1: Content Integration
- [ ] Add actual travel route coordinates
- [ ] Write 12 weeks of travel stories
- [ ] Add real family photos to photo frames
- [ ] Test scroll-driven map animation with real route

### Phase 2: Map Integration
- [ ] Initialize Mapbox GL JS with custom vintage style
- [ ] Draw route line that animates on scroll
- [ ] Add location markers for each week
- [ ] Implement smooth flyTo transitions between weeks

### Phase 3: Enhanced Features
- [ ] Photo lightbox/gallery viewer
- [ ] Mobile navigation menu
- [ ] Search/filter by location or week
- [ ] Social sharing for individual weeks

### Phase 4: Polish & Deploy
- [ ] Accessibility audit (WCAG AA compliance)
- [ ] Performance optimization (texture loading, lazy images)
- [ ] SEO metadata and Open Graph tags
- [ ] Deploy to production (Vercel/Netlify/etc)

---

## Design Decisions Log

### Why Leather Journal Aesthetic?
- User wanted "loved journal/old leather-bound book" feel
- Rejected yellowish tones (#FEF3C7) - too bright/warm
- Rejected formal typography (Abril Fatface) - too rigid
- Goal: Personal, weathered, nostalgic family diary vibe

### Why Split-Screen Layout?
- Map provides geographic context while reading
- Scroll-driven animation creates narrative flow
- Maximizes both storytelling and wayfinding
- Mobile: Stacks for usability (sticky map + scrolling content)

### Why Handwritten Typography?
- Creates personal, authentic diary feel
- Caveat is readable at scale (unlike purely decorative scripts)
- Pairs well with Crimson Text for body readability
- Evokes handwritten travel journals

---

## Access Contrast Ratios (WCAG AA ✅)

All text combinations meet WCAG AA standards:
- Ink Black on Paper (#1A1412 on #F5F1E8): 11.2:1
- Ink Faded on Paper (#4A3C35 on #F5F1E8): 7.8:1
- Ink Blue on Paper (#2C3E50 on #F5F1E8): 8.9:1
- Paper on Leather Dark (#F5F1E8 on #3E2723): 12.1:1

---

## Questions for Agent?

When continuing this project, ask the user:
1. **Content**: Do you have the route coordinates and travel dates ready?
2. **Photos**: How many photos per week on average?
3. **Mapbox**: Do you have a Mapbox API key, or should we use an alternative?
4. **Hosting**: Where will this be deployed (Vercel, Netlify, custom)?
5. **CMS**: Will content be hardcoded HTML or need a CMS (like Markdown files)?

---

## Project Context

- **Journey**: Finland → Sweden → Denmark → Germany → France → Spain → back
- **Duration**: 12 weeks (Summer 2022)
- **Family**: Parents + 3-year-old daughter
- **Vehicle**: Motorhome/RV
- **Tone**: Cozy, warm, nostalgic, family-oriented
- **Goal**: Preserve memories in a beautiful, interactive digital diary

---

**Last Updated**: March 14, 2026  
**Design Status**: Journal aesthetic approved ✅  
**Next Milestone**: Content integration + real map data
