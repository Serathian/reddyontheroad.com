# Modern Scroll-Driven Design System
## Reddy on the Road - Animated Journey Map

> **Concept:** A fixed map animates the route as weekly posts scroll past. Modern, memorable card design with depth and layering. Coffee palette with contemporary styling.

---

## 🎯 Layout Architecture

### Split-Screen Design (Desktop)
```
┌─────────────────────────────────────────────────────────┐
│  NAVBAR (Fixed)                                         │
└─────────────────────────────────────────────────────────┘
┌──────────────────────┬──────────────────────────────────┐
│                      │                                  │
│   FIXED MAP          │   SCROLLING TIMELINE            │
│   (Left 50%)         │   (Right 50%)                   │
│                      │                                  │
│   • Animates route   │   ┌──────────────────────┐     │
│   • Shows progress   │   │ Week 1: Finland      │     │
│   • Highlights pin   │   │ May 15-21, 2022     │     │
│   • Follows scroll   │   └──────────────────────┘     │
│                      │                                  │
│   [Map shows route   │   ┌──────────────────────┐     │
│    progressively]    │   │ Week 2: Sweden       │     │
│                      │   │ May 22-28, 2022     │     │
│                      │   └──────────────────────┘     │
│                      │                                  │
│                      │          ↓ Scroll               │
│                      │                                  │
└──────────────────────┴──────────────────────────────────┘
```

### Mobile Design
```
┌─────────────────────┐
│   NAVBAR (Fixed)    │
└─────────────────────┘
┌─────────────────────┐
│   MAP               │
│   (Sticky 40vh)     │
│   Animates on       │
│   scroll            │
└─────────────────────┘
┌─────────────────────┐
│  Week 1 Card        │
│  [Content]          │
└─────────────────────┘
┌─────────────────────┐
│  Week 2 Card        │
│  [Content]          │
└─────────────────────┘
       ↓ Scroll
```

---

## 🎨 Modern Card Design (Bento-Style)

### Weekly Post Card Structure

```
┌─────────────────────────────────────────────────┐
│  Week 2 • May 22-28, 2022                       │ ← Date badge
├─────────────────────────────────────────────────┤
│  ┌───────────┐  ┌───────────┐                  │
│  │   Photo   │  │   Photo   │                  │ ← Photo grid
│  │    1      │  │    2      │                  │
│  └───────────┘  └───────────┘                  │
│  ┌───────────────────────────┐                 │
│  │        Photo 3            │                 │
│  └───────────────────────────┘                 │
├─────────────────────────────────────────────────┤
│  Through Sweden                                 │ ← Title
│  Stockholm → Gothenburg                        │
│                                                 │
│  This week we explored the Swedish archipelago │ ← Summary
│  and fell in love with fika culture. Emma...   │
│                                                 │
│  📍 3 stops • 🚗 850 km • 📸 47 photos        │ ← Stats
└─────────────────────────────────────────────────┘
```

---

## 🗺️ Scroll-Driven Map Animation System

### How It Works

1. **User scrolls** through weekly posts
2. **Scroll position is tracked** (0-100% per week)
3. **Map animates** route progressively
4. **Route line draws** from week to week
5. **Pin highlights** current week's locations

### Technical Approach

#### Method 1: CSS Scroll-Linked Animations (Modern, No JS)
```css
@keyframes drawRoute {
  from {
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dashoffset: 0;
  }
}

.route-path {
  stroke-dasharray: 1000;
  animation: drawRoute linear;
  animation-timeline: scroll(root);
}
```

#### Method 2: JavaScript Intersection Observer (Better Control)
```javascript
// Track which week is in view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const weekIndex = entry.target.dataset.weekIndex;
      updateMapToWeek(weekIndex);
    }
  });
}, {
  threshold: 0.5, // Trigger when 50% visible
  rootMargin: '-20% 0px -20% 0px' // Center detection zone
});

// Observe all week cards
document.querySelectorAll('.week-card').forEach(card => {
  observer.observe(card);
});

function updateMapToWeek(weekIndex) {
  // Draw route up to this week
  const progress = weekIndex / totalWeeks;
  animateRouteToProgress(progress);
  
  // Highlight pins for this week
  highlightWeekPins(weekIndex);
  
  // Fly to location
  map.flyTo({
    center: weekLocations[weekIndex],
    zoom: 6,
    duration: 1500
  });
}
```

#### Method 3: Scroll Progress with GSAP (Smoothest)
```javascript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Animate route based on scroll
gsap.to('.route-line', {
  strokeDashoffset: 0,
  ease: 'none',
  scrollTrigger: {
    trigger: '.timeline-container',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1, // Smooth scrubbing
    onUpdate: (self) => {
      const progress = self.progress; // 0 to 1
      updateMapProgress(progress);
    }
  }
});
```

---

## 🎨 Modern Visual Style

### Design Principles

1. **Dimensional Layering** - Cards float with depth
2. **Soft Shadows** - Subtle elevation
3. **Rounded Corners** - 16-24px radius
4. **Clean Hierarchy** - Clear visual flow
5. **Micro-interactions** - Hover states, transitions
6. **Generous White Space** - Breathing room

### Updated CSS Variables

```css
:root {
  /* Coffee Palette (Maintained) */
  --color-primary: #92400E;
  --color-secondary: #B45309;
  --color-background: #FEF3C7;
  --color-card: #FFFBEB;
  --color-text: #78350F;
  --color-accent: #F97316;
  
  /* Modern Elevation System */
  --elevation-1: 0 1px 3px rgba(146, 64, 14, 0.1);
  --elevation-2: 0 4px 12px rgba(146, 64, 14, 0.1);
  --elevation-3: 0 10px 24px rgba(146, 64, 14, 0.12);
  --elevation-4: 0 20px 40px rgba(146, 64, 14, 0.15);
  
  /* Spacing (Modern scale) */
  --space-2xs: 4px;
  --space-xs: 8px;
  --space-sm: 12px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 96px;
  
  /* Border Radius (Generous) */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 24px;
  --radius-full: 9999px;
  
  /* Transitions (Smooth) */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-bounce: 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 🎯 Weekly Card Component (Modern Bento Style)

```css
.week-card {
  background: var(--color-card);
  border-radius: var(--radius-xl);
  padding: var(--space-2xl);
  box-shadow: var(--elevation-2);
  border: 1px solid rgba(146, 64, 14, 0.1);
  transition: all var(--transition-base);
  contain: layout style paint;
  position: relative;
  overflow: hidden;
}

.week-card::before {
  /* Subtle gradient overlay */
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(
    90deg,
    var(--color-accent) 0%,
    var(--color-primary) 100%
  );
}

.week-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--elevation-3);
}

/* Date Badge - Modern pill */
.week-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  background: var(--color-primary);
  color: var(--color-background);
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.025em;
  margin-bottom: var(--space-lg);
}

/* Photo Grid - Bento Layout */
.photo-bento {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 200px);
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.photo-bento img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-base);
}

.photo-bento img:hover {
  transform: scale(1.05);
  z-index: 1;
}

/* Featured photo spans 2 columns */
.photo-bento img:first-child {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}

/* Title */
.week-title {
  font-family: var(--font-display);
  font-size: 2rem;
  color: var(--color-primary);
  margin-bottom: var(--space-sm);
  line-height: 1.2;
}

.week-route {
  font-size: 1.125rem;
  color: var(--color-secondary);
  font-weight: 500;
  margin-bottom: var(--space-lg);
}

/* Summary */
.week-summary {
  font-family: var(--font-body);
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-text);
  margin-bottom: var(--space-xl);
}

/* Stats Bar */
.week-stats {
  display: flex;
  gap: var(--space-xl);
  padding-top: var(--space-lg);
  border-top: 1px solid rgba(146, 64, 14, 0.15);
  color: var(--color-secondary);
  font-size: 0.9375rem;
  font-weight: 500;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}
```

---

## 🗺️ Fixed Map Component (Split-Screen)

```css
/* Desktop: Fixed left half */
.map-container {
  position: fixed;
  left: 0;
  top: var(--navbar-height);
  width: 50%;
  height: calc(100vh - var(--navbar-height));
  z-index: 10;
}

.map-canvas {
  width: 100%;
  height: 100%;
  border-right: 1px solid rgba(146, 64, 14, 0.2);
}

/* Progress indicator overlay */
.map-progress {
  position: absolute;
  bottom: var(--space-2xl);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 251, 235, 0.95);
  backdrop-filter: blur(8px);
  padding: var(--space-md) var(--space-xl);
  border-radius: var(--radius-full);
  box-shadow: var(--elevation-3);
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.progress-text {
  font-family: var(--font-display);
  font-size: 0.875rem;
  color: var(--color-primary);
}

.progress-bar {
  width: 120px;
  height: 4px;
  background: rgba(146, 64, 14, 0.2);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--color-accent);
  transition: width var(--transition-base);
}

/* Timeline container - Right half */
.timeline-container {
  margin-left: 50%;
  padding: var(--space-4xl) var(--space-2xl);
  min-height: 100vh;
}

/* Mobile: Stack vertically */
@media (max-width: 1024px) {
  .map-container {
    position: sticky;
    top: var(--navbar-height);
    width: 100%;
    height: 40vh;
    left: 0;
    z-index: 5;
  }
  
  .timeline-container {
    margin-left: 0;
    padding: var(--space-xl) var(--space-lg);
  }
}
```

---

## 🎬 Route Animation Styles

```css
/* Animated route line */
.map-route-line {
  stroke: var(--color-accent);
  stroke-width: 4;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  filter: drop-shadow(0 2px 4px rgba(249, 115, 22, 0.3));
}

/* Animate drawing effect */
.map-route-line.animated {
  stroke-dasharray: 3000;
  stroke-dashoffset: 3000;
  transition: stroke-dashoffset 0.5s ease-out;
}

/* Active week pins */
.map-pin {
  transition: all var(--transition-bounce);
  cursor: pointer;
}

.map-pin.active {
  transform: scale(1.3);
  filter: drop-shadow(0 4px 12px rgba(249, 115, 22, 0.6));
}

.map-pin.past {
  opacity: 0.5;
}

.map-pin.future {
  opacity: 0.3;
}
```

---

## 📱 Mobile Optimizations

```css
@media (max-width: 768px) {
  /* Smaller cards */
  .week-card {
    padding: var(--space-xl);
    border-radius: var(--radius-lg);
  }
  
  /* Simplified photo grid */
  .photo-bento {
    grid-template-columns: 1fr;
    grid-template-rows: 300px 200px 200px;
    gap: var(--space-sm);
  }
  
  .photo-bento img:first-child {
    grid-column: 1;
    grid-row: 1;
  }
  
  /* Smaller typography */
  .week-title {
    font-size: 1.5rem;
  }
  
  .week-summary {
    font-size: 1rem;
  }
  
  /* Stack stats vertically */
  .week-stats {
    flex-direction: column;
    gap: var(--space-sm);
  }
}
```

---

## 🎯 Interaction States

```css
/* Card entrance animation */
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.week-card {
  animation: slideInRight 0.6s ease-out;
  animation-fill-mode: both;
}

/* Stagger animation for multiple cards */
.week-card:nth-child(1) { animation-delay: 0ms; }
.week-card:nth-child(2) { animation-delay: 100ms; }
.week-card:nth-child(3) { animation-delay: 200ms; }

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .week-card {
    animation: none;
  }
  
  .map-route-line.animated {
    transition: none;
  }
}

/* Focus states for accessibility */
.week-card:focus-within {
  outline: 3px solid var(--color-accent);
  outline-offset: 4px;
}
```

---

## 🔧 Implementation Stack

### Recommended Libraries

**Map Animation:**
- **Mapbox GL JS** - Best for smooth animations
- **GSAP ScrollTrigger** - Premium scroll control
- OR **Native CSS scroll-timeline** - Modern, no JS

**Frameworks:**
- **Next.js 14+** - App Router, Server Components
- **Framer Motion** - Smooth animations
- **Tailwind CSS** - Utility-first styling

---

## 📊 Data Structure for Weeks

```javascript
// weeks.json
[
  {
    "id": 1,
    "week": "Week 1",
    "dateRange": "May 15-21, 2022",
    "title": "Arctic Circle to Helsinki",
    "route": "Rovaniemi → Oulu → Helsinki",
    "summary": "Our journey began under the midnight sun...",
    "stats": {
      "stops": 3,
      "distance": "640 km",
      "photos": 34
    },
    "photos": [
      "/images/week1-hero.webp",
      "/images/week1-2.webp",
      "/images/week1-3.webp"
    ],
    "locations": [
      { "name": "Rovaniemi", "coords": [25.7294, 66.5039] },
      { "name": "Oulu", "coords": [25.4714, 65.0121] },
      { "name": "Helsinki", "coords": [24.9384, 60.1695] }
    ],
    "mapProgress": 0.08 // 8% of total route
  },
  {
    "id": 2,
    "week": "Week 2",
    "dateRange": "May 22-28, 2022",
    "title": "Through Sweden",
    "route": "Stockholm → Gothenburg",
    "summary": "Swedish archipelago and fika culture...",
    "stats": {
      "stops": 2,
      "distance": "470 km",
      "photos": 42
    },
    "photos": [...],
    "locations": [...],
    "mapProgress": 0.18 // 18% of total route
  }
  // ... more weeks
]
```

---

## 🎨 Visual Hierarchy

### Z-Index System
```css
:root {
  --z-navbar: 100;
  --z-map: 10;
  --z-timeline: 1;
  --z-map-controls: 20;
  --z-modal: 1000;
}
```

### Typography Scale
```css
.text-xs    { font-size: 0.75rem; }   /* 12px - Captions */
.text-sm    { font-size: 0.875rem; }  /* 14px - Labels */
.text-base  { font-size: 1rem; }      /* 16px - Body */
.text-lg    { font-size: 1.125rem; }  /* 18px - Large body */
.text-xl    { font-size: 1.25rem; }   /* 20px - Subheadings */
.text-2xl   { font-size: 1.5rem; }    /* 24px - Headings */
.text-3xl   { font-size: 2rem; }      /* 32px - Week titles */
.text-4xl   { font-size: 2.5rem; }    /* 40px - Page titles */
```

---

## ✨ Unique Design Features

### 1. **Route Progress Indicator**
Floating pill shows "Week 3 of 12" with animated progress bar

### 2. **Zoom Transitions**
Map zooms smoothly between weeks, showing different detail levels

### 3. **Micro-interactions**
- Photos scale on hover
- Cards lift on hover
- Route line pulses at active pin
- Stats animate in when visible

### 4. **Smart Condensing**
Past weeks show condensed view, current week expanded

### 5. **Photo Lightbox**
Click any photo → Full-screen gallery with swipe navigation

---

## 📋 Implementation Checklist

- [ ] Set up split-screen layout (50/50 desktop)
- [ ] Initialize Mapbox with route data
- [ ] Create weekly card component
- [ ] Implement scroll observer
- [ ] Animate route drawing based on scroll
- [ ] Add progress indicator
- [ ] Style photo bento grids
- [ ] Add hover/focus states
- [ ] Test mobile responsive layout
- [ ] Implement reduced motion support
- [ ] Add photo lightbox
- [ ] Optimize images (WebP, lazy load)
- [ ] Test scroll performance (60fps)

---

**Next:** Let me create a working prototype with this design!
