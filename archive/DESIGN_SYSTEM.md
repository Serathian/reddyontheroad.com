# Reddy on the Road - Design System
## Finland to Spain 2022 - Family Travel Diary

> **Context:** A nostalgic digital diary of a 2022 motorhome journey from Finland to Spain with family (3-year-old daughter). Features a linear timeline feed with an interactive map as a core component.

---

## 🎨 Design Philosophy

**Core Values:**
- **Cozy & Warm** - Like gathering around a campfire
- **Family-Oriented** - Celebrating togetherness and childhood wonder
- **Nostalgic** - Evoking memories and the passage of time
- **Journey-Focused** - The road itself is part of the story

**Visual Style:** Storytelling-Driven with narrative flow, scroll-triggered reveals, and journey visualization

---

## 🎨 Color Palette

### Option 1: Warm Coffee & Cream (RECOMMENDED)
Perfect for cozy, nostalgic family content.

| Role | Color | Hex | Tailwind | Usage |
|------|-------|-----|----------|-------|
| **Primary** | Warm Brown | `#92400E` | `amber-800` | Headers, icons, accents |
| **Secondary** | Lighter Brown | `#B45309` | `amber-700` | Secondary text, borders |
| **CTA** | Cream White | `#F8FAFC` | `slate-50` | Buttons, highlights |
| **Background** | Warm Cream | `#FEF3C7` | `amber-50` | Page background |
| **Text** | Deep Coffee | `#78350F` | `amber-900` | Body text |
| **Map Accent** | Muted Orange | `#F97316` | `orange-500` | Route lines, pins |

**Mood:** Like old Polaroid photos, warm evenings in the motorhome

### Option 2: Sky Blue & Adventure Orange
From initial recommendations - works for travel/adventure feel.

| Role | Color | Hex | Tailwind |
|------|-------|-----|----------|
| **Primary** | Sky Blue | `#0EA5E9` | `sky-500` |
| **Secondary** | Light Sky | `#38BDF8` | `sky-400` |
| **CTA** | Adventure Orange | `#F97316` | `orange-500` |
| **Background** | Sky Tint | `#F0F9FF` | `sky-50` |
| **Text** | Deep Ocean | `#0C4A6E` | `sky-900` |

**Decision:** Use **Option 1 (Warm Coffee & Cream)** for primary theme with **Option 2's orange** (`#F97316`) for map route lines to maintain adventure energy.

---

## ✍️ Typography

### Option 1: Nostalgic & Dramatic (RECOMMENDED)
```css
@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Merriweather:wght@300;400;700&display=swap');
```

| Font | Role | Weights | Usage |
|------|------|---------|-------|
| **Abril Fatface** | Display/Headings | Regular | Page titles, section headers, dates |
| **Merriweather** | Body/Reading | Light (300), Regular (400), Bold (700) | Blog posts, descriptions, captions |

**Mood:** Vintage, nostalgic, dramatic - like a storybook
**Best for:** Long-form reading, emotional storytelling

### Option 2: Handwritten Charm (Alternative)
```css
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Quicksand:wght@300;400;500;600;700&display=swap');
```

| Font | Role | Usage |
|------|------|-------|
| **Caveat** | Accents | Handwritten notes, captions, daughter's quotes |
| **Quicksand** | Body | Main content (softer, friendlier) |

**Usage Note:** If using Option 1, consider adding Caveat for occasional handwritten notes or photo captions.

### Tailwind Config
```js
fontFamily: {
  display: ['Abril Fatface', 'serif'],
  body: ['Merriweather', 'serif'],
  handwritten: ['Caveat', 'cursive'], // Optional accent
}
```

---

## 🗺️ Map Component Guidelines

Based on chart/visualization research:

### Map Type
**Recommended:** Interactive Route Map with Timeline Integration

**Library:** Choose based on needs:
- **Mapbox GL JS** - Best for custom styling, smooth animations, 3D terrain
- **Leaflet** - Lightweight, simple, excellent for 2D routes
- **Google Maps** - Familiar UI, but less customizable

### Map Features

#### Visual Elements
- **Route Line:** Orange (`#F97316`) with 3px width, slight glow effect
- **Location Pins:** Custom motorhome icon (SVG) with drop shadow
- **Clusters:** For closely spaced stops, use marker clustering
- **Timeline Sync:** Highlight current pin based on scroll position in feed

#### Interaction
- **Pan + Zoom:** Allow exploration
- **Pin Click:** Jump to corresponding timeline post
- **Hover:** Show location name + date tooltip
- **Mobile:** Touch-friendly pins (min 44x44px tap target)

#### Accessibility
- ⚠️ **Critical:** Provide text list of all locations as alternative
- Include keyboard navigation for pins (Tab through markers)
- Screen reader: Announce "Stop X of Y: [Location Name], [Date]"

#### Performance
- Lazy load map below hero section
- Use vector tiles for fast rendering
- Implement viewport-based marker loading for long routes

---

## 📜 Timeline Feed Layout

### Structure

```
┌─────────────────────────────────────┐
│         STICKY MAP (top 50vh)       │
│    Shows route + current location   │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│                                     │
│  [Date Badge]                       │
│  ┌───────────────────────────┐     │
│  │  📸 Photo Grid            │     │
│  │                           │     │
│  │  [Location Name]          │     │
│  │  Story text...            │     │
│  └───────────────────────────┘     │
│         │ (timeline line)           │
│  [Date Badge]                       │
│  ┌───────────────────────────┐     │
│  │  📸 Photo Grid            │     │
│  │  ...                      │     │
```

### Post Card Design

```css
.timeline-post {
  background: #FFFBEB; /* Warm cream */
  border-left: 4px solid #F97316; /* Orange accent */
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 48px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  position: relative;
}

.timeline-post::before {
  /* Vertical timeline connector */
  content: '';
  position: absolute;
  left: -2px;
  top: -24px;
  width: 4px;
  height: 24px;
  background: #F97316;
}

.date-badge {
  background: #92400E; /* Warm brown */
  color: #FEF3C7;
  padding: 8px 16px;
  border-radius: 20px;
  font-family: 'Abril Fatface', serif;
  font-size: 14px;
  display: inline-block;
  margin-bottom: 16px;
}
```

### Scroll Behavior
- **Smooth scroll** between posts (CSS `scroll-behavior: smooth`)
- **Scroll-triggered animations:** Fade in posts as they enter viewport
- **Map sync:** Update map pin highlight when post reaches center of viewport
- **Respect `prefers-reduced-motion`** - disable animations if set

---

## 📸 Image Handling

### Optimization Rules
✅ **Do:**
- Use WebP format with JPEG fallback
- Implement lazy loading (`loading="lazy"`)
- Provide `srcset` for responsive images:
  ```html
  <img 
    src="photo-800w.webp"
    srcset="photo-400w.webp 400w,
            photo-800w.webp 800w,
            photo-1200w.webp 1200w"
    sizes="(max-width: 768px) 100vw, 800px"
    loading="lazy"
    alt="Descriptive text"
  />
  ```
- Use aspect ratio containers to prevent layout shift
- Compress to 85% quality for web

❌ **Don't:**
- Load full-resolution images (4000px+)
- Eager load below-the-fold images
- Forget alt text for family photos

### Photo Grid Layouts

**Option 1: Masonry Grid** (for varied photo sizes)
```css
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  grid-auto-flow: dense;
}
```

**Option 2: Fixed Aspect Grid** (more uniform)
```css
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.photo-grid img {
  aspect-ratio: 4/3;
  object-fit: cover;
  border-radius: 8px;
}
```

---

## 🎭 Animation Guidelines

### Scroll Animations
```css
/* Fade in posts as they appear */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.timeline-post {
  animation: fadeInUp 0.6s ease-out;
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  .timeline-post {
    animation: none;
  }
}
```

### Interaction Transitions
```css
/* Smooth hover states */
.card, .btn {
  transition: all 200ms ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px rgba(0,0,0,0.15);
}

/* Map pin animation */
.map-pin {
  transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.map-pin:hover {
  transform: scale(1.2);
}
```

### Rules
✅ **Do:**
- Keep animations under 400ms
- Use `ease-out` for entrances, `ease-in` for exits
- Provide loading states for map/images

❌ **Don't:**
- Use infinite bouncing/spinning on content
- Force parallax scrolling (causes motion sickness)
- Block interaction during animations

---

## 📐 Layout Specifications

### Responsive Breakpoints
```css
/* Mobile First */
--mobile: 375px;
--tablet: 768px;
--desktop: 1024px;
--wide: 1440px;

/* Tailwind equivalents */
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Container Widths
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Timeline feed - narrower for readability */
.timeline-container {
  max-width: 800px;
  margin: 0 auto;
}

/* Map - full width or sidebar */
.map-container {
  position: sticky;
  top: 80px; /* Below navbar */
  height: 50vh;
  width: 100%;
}
```

### Spacing System
```css
--space-xs: 4px;   /* 0.25rem */
--space-sm: 8px;   /* 0.5rem */
--space-md: 16px;  /* 1rem */
--space-lg: 24px;  /* 1.5rem */
--space-xl: 32px;  /* 2rem */
--space-2xl: 48px; /* 3rem */
--space-3xl: 64px; /* 4rem */
```

---

## 🧩 Component Patterns

### Navigation Bar
```html
<nav class="fixed top-0 left-0 right-0 z-50 bg-amber-50/95 backdrop-blur-sm border-b border-amber-200">
  <div class="container flex items-center justify-between h-16">
    <a href="/" class="font-display text-2xl text-amber-900">
      Reddy on the Road
    </a>
    <div class="flex gap-6">
      <a href="#map" class="text-amber-800 hover:text-amber-900">Map</a>
      <a href="#timeline" class="text-amber-800 hover:text-amber-900">Timeline</a>
      <a href="#about" class="text-amber-800 hover:text-amber-900">About</a>
    </div>
  </div>
</nav>
```

### Timeline Post Card
```html
<article class="timeline-post">
  <span class="date-badge">May 15, 2022</span>
  <h2 class="font-display text-3xl text-amber-900 mb-4">
    Rovaniemi, Finland
  </h2>
  
  <div class="photo-grid mb-6">
    <img src="..." alt="..." loading="lazy" />
    <img src="..." alt="..." loading="lazy" />
  </div>
  
  <div class="prose prose-amber">
    <p class="font-body text-amber-900">
      Our first stop heading south...
    </p>
  </div>
  
  <!-- Optional handwritten note -->
  <p class="font-handwritten text-lg text-amber-700 mt-4 italic">
    "Look Daddy, reindeer!" - Emma
  </p>
</article>
```

### Map Pin Tooltip
```html
<div class="map-tooltip">
  <strong class="font-display text-sm">Rovaniemi</strong>
  <span class="text-xs text-amber-700">May 15, 2022</span>
</div>
```

---

## ♿ Accessibility Checklist

- [ ] All images have descriptive `alt` text
- [ ] Map has keyboard navigation (Tab through pins)
- [ ] Focus states visible (blue outline or custom)
- [ ] Color contrast 4.5:1 minimum (text on background)
- [ ] `prefers-reduced-motion` respected
- [ ] Screen reader: Timeline posts have proper heading hierarchy (h1 > h2 > h3)
- [ ] Links have descriptive text (not "click here")
- [ ] Provide text alternative to map (location list)

---

## 🚀 Performance Optimization

### Critical Path
1. Load fonts (font-display: swap)
2. Render hero + navigation
3. Load above-fold content
4. Lazy load map library
5. Lazy load timeline images as user scrolls

### Image Strategy
```html
<!-- Hero image: Eager load -->
<img src="hero.webp" loading="eager" fetchpriority="high" />

<!-- Timeline images: Lazy load -->
<img src="photo.webp" loading="lazy" />
```

### Bundle Optimization
- Tree-shake unused Tailwind classes
- Defer non-critical JavaScript
- Use CSS containment for timeline posts:
  ```css
  .timeline-post {
    contain: layout style paint;
  }
  ```

---

## 🎯 Key Differences from Generic Travel Site

| Generic Travel Site | Your Family Diary |
|---------------------|-------------------|
| Sky blue, corporate | Warm brown, cozy |
| Hotel booking CTAs | No CTAs - just story |
| Grid of destinations | Linear chronological timeline |
| Stock photos | Personal family photos |
| Professional copy | Personal narrative + daughter's quotes |
| Fast browsing | Slow, immersive reading |
| Multiple routes/packages | Single journey focus |

---

## 📋 Implementation Checklist

### Before You Start
- [ ] Compress all photos to WebP (85% quality)
- [ ] Create motorhome icon SVG for map pins
- [ ] Export route coordinates (lat/lng) from Google Maps
- [ ] Write alt text for all photos
- [ ] Organize photos by date/location

### Phase 1: Foundation
- [ ] Set up HTML structure with Tailwind
- [ ] Implement color palette in CSS variables
- [ ] Load fonts (Abril Fatface + Merriweather)
- [ ] Build responsive navigation
- [ ] Create timeline post card component

### Phase 2: Core Features
- [ ] Implement map with route line
- [ ] Add location pins with tooltips
- [ ] Build timeline feed with scroll animations
- [ ] Sync map highlight with scroll position
- [ ] Add photo grids with lazy loading

### Phase 3: Polish
- [ ] Test all breakpoints (375px to 1440px)
- [ ] Add `prefers-reduced-motion` support
- [ ] Optimize images (srcset, WebP)
- [ ] Add loading states
- [ ] Implement keyboard navigation

### Phase 4: Accessibility
- [ ] Test with screen reader
- [ ] Verify color contrast ratios
- [ ] Add skip links
- [ ] Test keyboard-only navigation
- [ ] Add aria-labels where needed

---

## 🚫 Anti-Patterns to Avoid

❌ **Don't:**
- Use emojis as icons (🚐 ❌) - Use SVG motorhome icon instead
- Add booking/e-commerce CTAs - This is a personal diary, not a service
- Use generic stock photos - Only use your family photos
- Implement complex search/filters - Single chronological timeline only
- Auto-play videos - Respect bandwidth and user preference
- Use dark mode toggle - Keep warm, cozy light theme
- Add social media share buttons - Keep intimate, not viral
- Use clickbait headlines - Authentic storytelling only

✅ **Do:**
- Use SVG icons from Heroicons or Lucide
- Add `cursor-pointer` to clickable elements
- Keep interactions smooth (200-300ms transitions)
- Respect user motion preferences
- Optimize for slow connections (lazy loading)
- Write personal, authentic captions
- Include daughter's quotes (in handwritten font)

---

## 🎨 Design Inspiration Keywords

For searching additional references:
- "Scrapbook layout CSS"
- "Travel journal UI nostalgic"
- "Timeline storytelling design"
- "Vintage photo grid"
- "Cozy warm color palette"
- "Family blog design"
- "Road trip visualization"

---

## 📚 Resources

### Map Libraries
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/) - Custom styling, smooth animations
- [Leaflet](https://leafletjs.com/) - Lightweight, simple
- [Google Maps JS API](https://developers.google.com/maps/documentation/javascript) - Familiar, reliable

### Icon Libraries
- [Heroicons](https://heroicons.com/) - Beautiful hand-crafted SVG icons
- [Lucide](https://lucide.dev/) - Community-driven icon set
- [Simple Icons](https://simpleicons.org/) - Brand icons (if needed)

### Image Optimization
- [Squoosh](https://squoosh.app/) - Browser-based image compression
- [ImageOptim](https://imageoptim.com/) - Mac app for batch compression

### Fonts
- [Google Fonts](https://fonts.google.com/)
- [Font Pair](https://fontpair.co/) - Font pairing inspiration

---

## 🎯 Success Metrics

This is a personal project, but consider:
- **Emotional Impact:** Does it evoke nostalgia and warmth?
- **Readability:** Can you comfortably read posts on mobile?
- **Performance:** Does it load fast on 3G?
- **Accessibility:** Can someone navigate with keyboard only?
- **Shareability:** Would you be proud to share with family/friends?

---

**Generated:** March 12, 2026  
**Design System Version:** 1.0  
**For:** Reddy on the Road - Finland to Spain 2022
