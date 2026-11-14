# Rolling Playground - Stitch Design Analysis

## Two Favorited Screens Overview

Based on the Stitch designs, there are **two primary views** marked as favorites:

1. **Hub View** (d0d0f984cd384d0d921e1659936c03db) - The main landing/dashboard
2. **Detail View** (6a482efa8d1c4708b6b7d831791efc67) - Individual journal entry page

---

## Screen 1: The Rolling Playground - Hub

**Screenshot**: https://lh3.googleusercontent.com/aida/ADBb0ujL0uac4SsGCv3ZKiXr0SWmFE2k_bgZAOApgOnA3O6a04ZL71pC42EpDmVSTMFUhVjX8hmFkaACKky0xFCHhu05yJhrDwr9vEqfuoxpGwOiEcCyXLtFMs2utbi1_KdddIJF63WZTtVI8CSZeP5QB2V7FySD5sNMdFCWa0TVfhtTtn8o6gmlGMOd9x31AYOjBpRrKVtsx_cyOynqUoQdyp6chZADjI-p-1IPmbzZBDGCRGf7FIHofFdEi9EE

**Dimensions**: 2560 × 2048px (Desktop)

### Layout Structure

```
┌──────────────────────────────────────────────────────────────┐
│ [HEADER] The Rolling Playground | Nav Links | 🔍 ❤️ 👤       │ ← Fixed header with glassmorphic bg
├────────────────────────┬─────────────────────────────────────┤
│                        │                                     │
│  SCRAPBOOK FEED        │    INTERACTIVE MAP                  │
│  (Left 50%)            │    (Right 50%)                      │
│  Scrollable            │    Fixed                            │
│                        │                                     │
│  ┌─────────────────┐  │    • Map with styled markers        │
│  │ [TAPE ACCENT]   │  │    • Dashed route line (SVG)        │
│  │                 │  │    • Location pins w/ labels        │
│  │  Day 3          │  │                                     │
│  │  [Icon]         │  │    ┌───────────────────────────┐   │
│  │  [Photo]        │  │    │ FLOATING STATS CARD       │   │
│  │  [Story]        │  │    │ Miles | Juice Boxes | Alt │   │
│  │  Read more →    │  │    │ [Elevation Profile]       │   │
│  │                 │  │    └───────────────────────────┘   │
│  └─────────────────┘  │                                     │
│                        │    ┌──┐                             │
│  ┌─────────────────┐  │    │+│  ← Zoom controls            │
│  │ Day 5           │  │    │-│                              │
│  │ ...             │  │    │📍│                             │
│  └─────────────────┘  │    └──┘                             │
│                        │                                     │
└────────────────────────┴─────────────────────────────────────┘
│ [MOBILE NAV BAR] 🗺️ 👶 ➕ 📖 ⚙️                              │ ← Mobile only
└──────────────────────────────────────────────────────────────┘
[FAB: ✏️ Add New Memory]  ← Desktop only, bottom-left
```

### Key Components

#### 1. Header (TopAppBar)
- **Background**: `bg-[#fffcf5]/80` with `backdrop-blur-md` (glassmorphic)
- **Position**: Fixed top, z-index 50
- **Shadow**: Soft `0 4px 24px rgba(59,56,37,0.06)`
- **Contents**:
  - Logo: "The Rolling Playground" (italic, bold, 2xl, `#D66844`)
  - Nav: "Our Map" (active), "Journals", "Scrapbook", "Gallery"
  - Icons: favorite, search, avatar (circular with border)

#### 2. Scrapbook Feed (Left Panel)
- **Background**: `bg-surface-container-low` (#fff9e9)
- **Scrollable**: `overflow-y-auto`
- **Padding**: `px-6 lg:px-12 py-8`
- **Max-width**: 640px (xl) centered

##### Section Header
```html
<span>ADVENTURE LOG</span>
<h1>Southwest Sojourn</h1>
```

##### Scrapbook Cards (Article)
Each card has:

1. **Scrapbook Tape Decoration** (positioned absolute)
   - Random rotation: `-6deg`, `2deg`, `12deg`
   - Semi-transparent beige: `rgba(191, 186, 159, 0.2)`
   - Backdrop blur

2. **Card Container**
   - White background: `bg-surface-container-lowest` (#ffffff)
   - Padding: 1.5rem (p-6)
   - Rounded: 1rem (rounded-DEFAULT)
   - Rotation: `rotate-1`, `-rotate-1`, `rotate-2`
   - Hover: `hover:rotate-0` (straightens on hover)
   - Transition: `duration-500`

3. **Card Header**
   - Day number: "Day 3" (3xl, bold, `text-primary-dim`)
   - Title: "The Messy Breakfast at Zion" (xl, bold)
   - Icon: Material Symbol (4xl, tertiary color)
     - child_care, toys, auto_awesome

4. **Photo Container**
   - Aspect ratio: 4:3
   - Rounded: sm
   - Image: `hover:scale-105` transition (700ms)
   - Location badge (absolute bottom-right):
     - `bg-white/90 backdrop-blur`
     - Rounded full pill
     - Small italic text

5. **Story Text**
   - Text: lg, `leading-relaxed`
   - Color: `text-on-surface-variant`

6. **Read More Link**
   - Inline-flex with gap
   - Bold headline font
   - Arrow icon: `group-hover:translate-x-1`

#### 3. Map Panel (Right Side)
- **Background**: `bg-surface-container-highest` (#efe9cc)
- **Border**: Left border `border-outline-variant/15`
- **Hidden on mobile**: `hidden lg:block`

##### Map Container
- Background image with filters:
  - `opacity-80`
  - `mix-blend-multiply`
  - `grayscale-[20%]`

##### Map Markers
Custom positioned divs with:
- Circular colored backgrounds (primary, secondary)
- Material Symbol icons (filled): location_on, stroller, home
- Label below: `bg-white/95 backdrop-blur`
- Hover scale: `group-hover:scale-110`

##### Route Line
- SVG path
- Stroke: `#D66844`
- Stroke-dasharray: `8 8` (dashed)
- Stroke-width: 4px

##### Floating Stats Card
Position: `absolute bottom-8 left-8 right-8`

```html
<div class="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-xl">
  <div class="grid grid-cols-3 gap-8">
    <!-- Stat 1 -->
    <div>
      <span>MILES DRIVEN</span>
      <span class="text-3xl font-black italic">1,248</span>
    </div>
    <!-- Stat 2 -->
    <div class="border-x">
      <span>JUICE BOXES</span>
      <span class="text-3xl font-black italic">42</span>
    </div>
    <!-- Stat 3 -->
    <div>
      <span>ALT. GAINED</span>
      <span class="text-3xl font-black italic">5.4k'</span>
    </div>
  </div>
  
  <!-- Elevation Profile -->
  <div class="mt-6 pt-6 border-t">
    <div class="flex justify-between items-end h-16 gap-1">
      <!-- Bar chart bars with varying heights -->
      <div class="flex-1 bg-primary-container/20 h-1/4"></div>
      <div class="flex-1 bg-primary h-2/3"></div>
      ...
    </div>
    <div class="flex justify-between text-[10px]">
      <span>Vegas</span>
      <span>Elevation Profile</span>
      <span>Moab</span>
    </div>
  </div>
</div>
```

##### Floating Zoom Controls
Position: `absolute top-8 right-8`

Three buttons stacked vertically:
- `+` (add)
- `-` (remove)
- `📍` (my_location) - primary colored

#### 4. Mobile Bottom Navigation
- Fixed bottom
- `bg-white/95 backdrop-blur-lg`
- 5 items: Map, Growth (child_care), Add (+), Log (book), Settings
- Center FAB: Elevated circular button with `+` icon

#### 5. Desktop FAB
- Position: `fixed bottom-12 left-12`
- Gradient: `from-primary to-primary-container`
- Rounded full
- Shadow: 2xl
- Icon + Text: "Add New Memory"
- Hover: `scale-105`

---

## Screen 2: The Rolling Playground - Detail View

**Screenshot**: https://lh3.googleusercontent.com/aida/ADBb0uh1If62udKI_m5-NZiEiwKNqvuxraY_ZTLQFawOOlpo0HEIIVPdlvsUnkVBbQivbVYyPIfyaNTABxwD68RqRXYYfI3ONUbc6494RqhyrqxkEV_DVkaJNl2K3zavOnmMNc2r54MBYyPUFLM0AU6eNdqDc3d4BNNrgG-X0yWHFfEEfVNQKbc0S3kRK_l3j9Rbhi-Doh51-9MrY3c9fQ1lfS9a-DkqEgZFNUe60XWmGcip6WxcLG22WRRLbFhE

**Dimensions**: 2560 × 5260px (Desktop, scrollable)

### Layout Structure

```
┌──────────────────────────────────────────────────────────────┐
│ [HEADER] ← Back to Map | Logo | Nav | Icons | Avatar         │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                                                        │ │
│  │              [HERO IMAGE - Full Width]                 │ │
│  │              Rotated slightly                          │ │
│  │              Gradient overlay at bottom                │ │
│  │                                                        │ │
│  │              March 14, 2024                            │ │
│  │              The Giant Rocks at Joshua Tree            │ │
│  │                                                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌──────────────────────────┬───────────────────────────┐   │
│  │ MAIN CONTENT (8 cols)    │  SIDEBAR (4 cols)        │   │
│  │                          │                           │   │
│  │ ┌──────────────────────┐ │  ┌─────────────────────┐ │   │
│  │ │ Pull Quote Card      │ │  │ Road Trip Stats    │ │   │
│  │ │ [Quote icon]         │ │  │ • Miles: 142       │ │   │
│  │ │ "We arrived just..." │ │  │ • Snacks: 24+      │ │   │
│  │ └──────────────────────┘ │  │ • Songs: 86        │ │   │
│  │                          │  │                     │ │   │
│  │ ┌──────────────────────┐ │  │ [Map Preview]      │ │   │
│  │ │ Photo Grid (2 cols)  │ │  │                     │ │   │
│  │ │                      │ │  │ [Add Memory Button]│ │   │
│  │ │ ┌────┐  ┌─────────┐ │ │  └─────────────────────┘ │   │
│  │ │ │Img │  │Toddler  │ │ │                           │   │
│  │ │ │+   │  │Wins Box │ │ │  ┌─────────────────────┐ │   │
│  │ │ │Cap │  │         │ │ │  │ Scrapbook Stamp    │ │   │
│  │ │ └────┘  └─────────┘ │ │  │ [Verified Badge]   │ │   │
│  │ │                      │ │  │ National Park      │ │   │
│  │ │ ┌────────────────┐  │ │  │ Junior Ranger      │ │   │
│  │ │ │Tall photo      │  │ │  └─────────────────────┘ │   │
│  │ │ └────────────────┘  │ │                           │   │
│  │ └──────────────────────┘ │                           │   │
│  │                          │                           │   │
│  │ ┌──────────────────────┐ │                           │   │
│  │ │ Narrative Paragraphs │ │                           │   │
│  │ │                      │ │                           │   │
│  │ │ Finding the Flow     │ │                           │   │
│  │ │                      │ │                           │   │
│  │ │ [Story content...]   │ │                           │   │
│  │ └──────────────────────┘ │                           │   │
│  │                          │                           │   │
│  └──────────────────────────┴───────────────────────────┘   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
│ [FOOTER] Logo | Links | Social Icons                         │
└──────────────────────────────────────────────────────────────┘
```

### Key Components

#### 1. Header (Modified for Detail View)
- **Back button** added on left:
  - Arrow icon + "Back to Map" text
  - Primary color
- **Active nav**: "Journals" (instead of "Our Map")
- Separator bar between back button and logo

#### 2. Hero Section
- **Full-width image container**
  - Height: 614px mobile, 768px desktop
  - Rounded: xl
  - Shadow: xl
  - **Rotated**: `scrapbook-rotate-left` (-1.5deg)
  
- **Gradient overlay**:
  - `bg-gradient-to-t from-black/40 to-transparent`
  
- **Content overlay** (absolute bottom):
  - Date badge: `bg-secondary-container` pill
  - Title: 5xl-7xl, white, bold italic, drop-shadow

#### 3. Content Grid
`grid-cols-1 lg:grid-cols-12`

##### Main Content (8 columns)

**A. Pull Quote Card**
```html
<div class="bg-surface-container-low p-8 md:p-12 rounded-lg relative">
  <span class="absolute -top-4 -right-4 w-16 h-16 bg-primary/10 rounded-full scrapbook-rotate-right">
    <span class="material-symbols-outlined">format_quote</span>
  </span>
  <p class="text-2xl font-body italic leading-relaxed">
    [Quote text...]
  </p>
</div>
```

**B. Bento-Style Image Gallery**
Two-column grid with staggered items:

Left column:
1. **Photo card** (rotated right)
   - White frame: `bg-surface-container-lowest p-3`
   - Square aspect image
   - Caption: italic, centered, small label font
   
2. **"Toddler Wins" info box**
   - `bg-primary/5` with `border-primary/10`
   - Icon + heading
   - Bullet list with checkmark icons

Right column:
1. **Tall photo card** (rotated left)
   - Aspect ratio: 3:4
   - Same white frame treatment
   - Caption below

**C. Deep Narrative Section**
- Max-width: 2xl, centered
- Heading: 3xl, extrabold, italic
- Paragraphs: xl text, relaxed leading
- Color: `text-on-surface-variant`

##### Sidebar (4 columns, sticky)

**A. Road Trip Stats Card**
- `bg-surface-container-high`
- Rounded: xl
- Sticky: `top-32`
- Shadow: sm

Stats rows:
```html
<div class="flex items-center justify-between">
  <div class="flex items-center gap-3">
    <div class="w-10 h-10 rounded-full bg-white">
      <span class="material-symbols-outlined">distance</span>
    </div>
    <span class="font-label font-bold">Miles Driven</span>
  </div>
  <span class="font-headline font-black">142</span>
</div>
```

Icons used: distance, cookie, music_note

**Pinned Location** (within stats card):
- Map preview image
- Grayscale, hover reveals color
- Overlay: "View on Map" button

**Add Memory Button**:
- Full width
- Gradient background
- Icon + text

**B. Scrapbook Stamp**
- `bg-secondary-container/30`
- Rounded full (circle)
- Aspect square
- Dashed border
- Rotated right
- Content: verified icon, "National Park Junior Ranger", "Verified Adventure"

#### 4. Footer
- Rounded top: `rounded-t-[4rem]`
- `bg-stone-100`
- Three-column flex layout:
  1. Logo + copyright
  2. Links: About, Archive, Privacy
  3. Social icons: share, mail

---

## Design System Tokens

### Colors

```css
/* Primary Palette */
--primary: #a84625           /* Burnt orange */
--primary-dim: #983a1a
--primary-container: #ffad93  /* Light peachy orange */
--on-primary: #ffffff

/* Secondary Palette */
--secondary: #845d00          /* Golden brown */
--secondary-container: #ffdea8 /* Light sandy yellow */
--on-secondary: #ffffff

/* Tertiary Palette */
--tertiary: #546a59           /* Muted sage green */
--tertiary-container: #e4fde8  /* Very light mint */
--on-tertiary: #ffffff

/* Surface Colors */
--background: #fffbff          /* Off-white with warm tint */
--surface: #fffbff
--surface-container-low: #fff9e9
--surface-container-lowest: #ffffff
--surface-container: #f9f4e0
--surface-container-high: #f4eed6
--surface-container-highest: #efe9cc
--surface-variant: #efe9cc

/* Text Colors */
--on-background: #3b3825       /* Dark warm gray */
--on-surface: #3b3825
--on-surface-variant: #68654e  /* Medium warm gray */
--outline: #858169             /* Muted olive */
--outline-variant: #bfba9f     /* Light olive */
```

### Typography

```css
/* Font Families */
font-family: {
  headline: ["Plus Jakarta Sans"],  /* Bold geometric sans */
  body: ["Newsreader"],             /* Classic editorial serif */
  label: ["Plus Jakarta Sans"]      /* Same as headline for UI elements */
}

/* Font Sizes - Key Examples */
- Hero title: 5xl-7xl (3rem - 4.5rem)
- Card day number: 3xl (1.875rem)
- Card title: xl (1.25rem)
- Pull quote: 2xl (1.5rem)
- Narrative text: xl (1.25rem)
- Story preview: lg (1.125rem)
- Labels/metadata: xs-sm (0.75rem - 0.875rem)
```

### Spacing

Based on Tailwind defaults with rem units:
- `gap-2`: 0.5rem (8px)
- `gap-3`: 0.75rem (12px)
- `gap-4`: 1rem (16px)
- `gap-6`: 1.5rem (24px)
- `gap-8`: 2rem (32px)
- `p-6`: 1.5rem padding
- `p-8`: 2rem padding
- `space-y-16`: 4rem vertical spacing between cards

### Border Radius

```css
borderRadius: {
  DEFAULT: "1rem",    /* 16px - main card radius */
  sm: "0.25rem",      /* 4px - small elements */
  lg: "2rem",         /* 32px - large containers */
  xl: "3rem",         /* 48px - extra large */
  full: "9999px"      /* Circular */
}
```

### Shadows

- `shadow-sm`: Subtle lift for cards
- `shadow-lg`: Map markers on hover
- `shadow-xl`: Stats card, hero image
- `shadow-2xl`: FAB button
- Custom: `shadow-[0_4px_24px_rgba(59,56,37,0.06)]` for header

### Effects

#### Glassmorphism
```css
background: rgba(255, 252, 245, 0.8);  /* 80% opacity */
backdrop-filter: blur(12px);
```

#### Scrapbook Tape
```css
.scrapbook-tape {
  background: rgba(191, 186, 159, 0.2);
  backdrop-filter: blur(1px);
}
```

#### Grain Overlay
```css
.grain-overlay {
  background-image: url("data:image/svg+xml,%3Csvg...");
  opacity: 0.02;
  pointer-events: none;
}
```

#### Card Rotation
```css
.scrapbook-rotate-left {
  transform: rotate(-1.5deg);
}
.scrapbook-rotate-right {
  transform: rotate(1.2deg);
}
```

#### Transitions
- Card rotation: `duration-500`
- Image scale: `duration-700`
- Button hover: `transition-opacity` or `transition-transform`
- Arrow on hover: `group-hover:translate-x-1`

---

## Material Symbols Icons Used

### Hub View
- `favorite` (header)
- `search` (header)
- `child_care` (day card decoration)
- `toys` (day card decoration)
- `auto_awesome` (day card decoration)
- `arrow_forward` (read more link)
- `location_on` (map marker - filled)
- `stroller` (map marker - filled)
- `home` (map marker - filled)
- `add` (zoom control, mobile FAB)
- `remove` (zoom control)
- `my_location` (zoom control)
- `map`, `book`, `settings` (mobile nav)
- `edit` (desktop FAB)

### Detail View
- `arrow_back` (back button)
- `format_quote` (pull quote decoration)
- `child_care` (toddler wins section - filled)
- `check_circle` (checklist items)
- `distance`, `cookie`, `music_note` (stats icons)
- `location_on` (pinned location - filled)
- `add_a_photo` (add memory button)
- `verified` (scrapbook stamp)
- `share`, `mail` (footer social)

---

## Component Patterns Summary

### Card Component Pattern
```html
<article class="relative">
  <!-- Tape decoration -->
  <div class="absolute scrapbook-tape rotate-[random]"></div>
  
  <!-- Card body -->
  <div class="bg-white p-6 rounded-DEFAULT shadow-sm rotate-[random] hover:rotate-0 transition-transform duration-500">
    <!-- Header: Day number + title + icon -->
    <!-- Photo with location badge -->
    <!-- Story text -->
    <!-- Action link with animated arrow -->
  </div>
</article>
```

### Glassmorphic Overlay Pattern
```html
<div class="bg-white/90 backdrop-blur-md rounded-xl shadow-xl">
  <!-- Content -->
</div>
```

### Photo Frame Pattern
```html
<div class="bg-surface-container-lowest p-3 rounded-DEFAULT shadow-sm scrapbook-rotate-[direction]">
  <img class="rounded-sm aspect-[ratio] object-cover" />
  <p class="text-sm italic text-center mt-4">Caption</p>
</div>
```

### Icon + Label Stat Pattern
```html
<div class="flex items-center justify-between">
  <div class="flex items-center gap-3">
    <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center">
      <span class="material-symbols-outlined">icon_name</span>
    </div>
    <span class="font-label font-bold">Label</span>
  </div>
  <span class="font-headline font-black">Value</span>
</div>
```

---

## Implementation Comparison with Current

### What Exists ✅
- Split layout (map + content)
- Basic card system
- Journey map with markers
- Timeline scrubber
- Responsive design

### Missing Components ❌

#### Hub View
1. **Header**
   - Glassmorphic navigation bar
   - Material icons
   - Avatar component
   
2. **Scrapbook Cards**
   - Tape decorations
   - Card rotation effects
   - Day number display
   - Decorative icons
   - Photo display with location badges
   - Image hover scale
   - Animated arrow on links
   
3. **Map Panel**
   - Stats overlay card
   - Elevation profile chart
   - Floating zoom controls UI
   - Styled map markers with labels
   - Dashed route line styling
   
4. **Mobile**
   - Bottom navigation bar
   - FAB button
   
5. **Desktop**
   - FAB "Add New Memory" button

#### Detail View
Completely missing - needs full implementation:
1. Hero image section with gradient overlay
2. Pull quote card component
3. Bento-style photo gallery
4. Toddler Wins info box
5. Sidebar stats card (sticky)
6. Map preview thumbnail
7. Scrapbook stamp component
8. Footer
9. Deep narrative layout

### Design System Gaps
1. **Colors**: Complete palette mismatch
2. **Typography**: Different font families
3. **Effects**: Missing grain, glassmorphism, rotations
4. **Icons**: No Material Symbols integration
5. **Spacing**: Different scale system

---

## Recommendations

### Phase 1: Design System Foundation
Priority: **CRITICAL**
- [ ] Add Plus Jakarta Sans & Newsreader fonts
- [ ] Update CSS custom properties with Stitch color palette
- [ ] Add Material Symbols icon library
- [ ] Create grain overlay effect
- [ ] Create glassmorphic utility classes
- [ ] Add rotation utility classes

### Phase 2: Hub View Updates
Priority: **HIGH**
- [ ] Create Header component
- [ ] Enhance DayCard with all scrapbook elements
- [ ] Add stats overlay to map panel
- [ ] Create elevation profile chart component
- [ ] Add floating zoom controls
- [ ] Create mobile bottom nav
- [ ] Add FAB buttons

### Phase 3: Detail View Implementation
Priority: **MEDIUM**
- [ ] Create detail view route/page
- [ ] Implement hero section
- [ ] Build pull quote card
- [ ] Create photo gallery grid
- [ ] Build sidebar components
- [ ] Add footer

### Phase 4: Polish
Priority: **LOW**
- [ ] Fine-tune all transitions
- [ ] Test across browsers
- [ ] Performance optimization
- [ ] Accessibility audit

---

## Technical Notes

### Tailwind CDN Usage
The Stitch design uses Tailwind via CDN:
```html
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
```

With inline config for custom colors/fonts. For production, should migrate to proper Tailwind build.

### Icon Implementation
Material Symbols via CDN:
```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1" />
```

For filled icons, add style:
```html
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">icon_name</span>
```

### Responsive Strategy
- Hub: Side-by-side on desktop (lg+), stacked on mobile
- Detail: Single column on mobile, 8-4 grid on desktop
- Map: Hidden on mobile in hub view (bottom nav tab)
- Navigation: Horizontal desktop, bottom bar mobile

### Animation Performance
- Use CSS transforms (not position changes)
- Leverage `will-change` for frequently animated elements
- Consider `requestAnimationFrame` for scroll-based animations
- Test rotation performance on lower-end devices

---

## Questions for Consideration

1. **Data Model**: How will daily entries map to this structure?
   - Need: day number, icon type, photos, location name
   
2. **Photo Management**: Where are images stored?
   - Stitch uses Google CDN links
   - Need proper image optimization/CDN strategy
   
3. **Map Integration**: Keep MapLibre or switch to static?
   - Current MapLibre is more interactive
   - Stitch shows static with SVG overlay
   - **Recommendation**: Keep MapLibre, add styled overlays
   
4. **Detail View Routing**: How to navigate between views?
   - Need route structure: `/` (hub), `/entry/[id]` (detail)
   - Need state management for smooth transitions
   
5. **Timeline Scrubber**: Keep or remove?
   - Not in Stitch design
   - Could be optional feature toggle
   - **Recommendation**: Hide by default, add as enhancement

6. **Mobile Map Tab**: Implementation approach?
   - Separate view or hidden section?
   - State management for tab switching

---

## File Structure Recommendation

```
app/
├── components/
│   ├── Header/
│   │   ├── Header.tsx
│   │   └── Header.module.css
│   ├── ScrapbookCard/
│   │   ├── ScrapbookCard.tsx
│   │   ├── ScrapbookCard.module.css
│   │   └── ScrapbookTape.tsx
│   ├── MapPanel/
│   │   ├── MapPanel.tsx
│   │   ├── StatsOverlay.tsx
│   │   ├── ElevationProfile.tsx
│   │   └── ZoomControls.tsx
│   ├── MobileNav/
│   │   ├── BottomNav.tsx
│   │   └── BottomNav.module.css
│   ├── FAB/
│   │   ├── FAB.tsx
│   │   └── FAB.module.css
│   ├── DetailView/
│   │   ├── HeroSection.tsx
│   │   ├── PullQuoteCard.tsx
│   │   ├── PhotoGallery.tsx
│   │   ├── StatsSidebar.tsx
│   │   ├── ScrapbookStamp.tsx
│   │   └── Footer.tsx
│   └── shared/
│       ├── MaterialIcon.tsx
│       └── GlassCard.tsx
├── styles/
│   ├── design-tokens.css  (Stitch colors/vars)
│   └── effects.css        (grain, glass, rotations)
└── (hub)/
    ├── page.tsx           (Hub view)
    └── entry/
        └── [id]/
            └── page.tsx   (Detail view)
```

---

## Conclusion

The Stitch design represents a cohesive, modern editorial system with strong visual identity. Implementation requires:

1. **Complete design system overhaul** (colors, fonts, effects)
2. **New component library** (cards, overlays, decorations)
3. **Two distinct view templates** (hub + detail)
4. **Responsive strategy** (desktop/mobile variants)

**Estimated effort**: 5-7 days for full implementation
**Complexity**: Medium-High
**Risk**: Low (can be feature-flagged and rolled out incrementally)

The two favorited screens provide a clear north star for the visual direction and component architecture needed.
