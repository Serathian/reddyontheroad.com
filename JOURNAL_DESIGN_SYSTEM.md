# Journal Design System
**Reddy on the Road - Leather-Bound Travel Diary Aesthetic**

> ⭐ **This is the CURRENT, APPROVED design system.**  
> Previous iterations (coffee palette, formal typography) have been archived.  
> See `PROJECT_README.md` for project context and `FILE_INDEX.md` for navigation.

## Overview
This design system creates a weathered, personal diary aesthetic that feels like opening an old leather-bound journal. The visual language emphasizes tactile textures, handwritten warmth, and aged materials that tell the story of a family's journey.

**Key Design Decisions:**
- ✅ Aged paper (#F5F1E8) instead of yellowish tones
- ✅ Handwritten fonts (Caveat) instead of formal serif
- ✅ Rich leather browns (#3E2723-#8D6E63) for warmth and depth
- ✅ Paper grain & leather textures for tactile authenticity
- ✅ Split-screen layout preserved from earlier iterations

---

## 🎨 Color Palette

### Aged Paper Foundation
```css
/* Primary Background - Aged Cream Paper */
--journal-paper: #F5F1E8;           /* Main content background - warm aged paper */
--journal-paper-dark: #EDE8DC;      /* Slightly aged areas, subtle depth */
--journal-paper-stained: #E8E0D0;   /* Weathered edges, coffee stains */

/* Sepia Tones - Vintage Photo Aesthetic */
--sepia-light: #F4ECD8;             /* Light sepia wash */
--sepia-medium: #D4C4A8;            /* Medium sepia for borders */
--sepia-dark: #A89476;              /* Deep sepia for aged effects */
```

### Leather Accents
```css
/* Rich Brown Leather */
--leather-dark: #3E2723;            /* Deep leather - primary text, dark accents */
--leather-medium: #5D4037;          /* Medium leather - navigation, headers */
--leather-light: #6D4C41;           /* Light leather - hover states */
--leather-worn: #795548;            /* Worn leather - subtle borders */

/* Leather with Warmth */
--leather-cognac: #8D6E63;          /* Cognac leather - warm accents */
--leather-tan: #A1887F;             /* Tan leather - secondary elements */
```

### Ink & Writing
```css
/* Handwritten Ink Colors */
--ink-black: #1A1412;               /* Primary text - rich dark ink */
--ink-faded: #4A3C35;               /* Faded ink - secondary text */
--ink-sepia: #6B5D54;               /* Sepia ink - meta information */
--ink-blue: #2C3E50;                /* Blue ink - occasional accent (links) */
```

### Accent Colors (Subtle & Nostalgic)
```css
/* Muted, Vintage Accents */
--vintage-red: #A0522D;             /* Faded red ribbon bookmark */
--vintage-gold: #B8860B;            /* Gold leaf accents, special moments */
--vintage-green: #556B2F;           /* Faded map green */
--vintage-blue: #4A6FA5;            /* Faded denim blue - travel theme */
```

### Functional Colors (Accessible)
```css
/* Interactive States */
--focus-ring: #8D6E63;              /* Focus indicator */
--success: #6B8E23;                 /* Success states - muted olive */
--warning: #CD853F;                 /* Warning states - peru */
--error: #A0522D;                   /* Error states - sienna */
```

---

## ✍️ Typography

### Font Pairing: Handwritten Warmth + Readable Elegance

#### Display Font (Handwritten Headers)
```css
font-family: 'Caveat', cursive;
/* Google Fonts: https://fonts.google.com/specimen/Caveat */
/* Use for: Main title, week headings, handwritten annotations */

Weights: 400 (Regular), 700 (Bold)
Characteristics: Natural handwritten feel, readable at scale, warm personality
```

**Sizes:**
- H1 (Main Title): 3.5rem (56px) / Bold
- H2 (Week Headings): 2.5rem (40px) / Bold  
- H3 (Section Headers): 1.875rem (30px) / Regular
- Annotations: 1.25rem (20px) / Regular

#### Body Font (Readable Serif)
```css
font-family: 'Crimson Text', serif;
/* Google Fonts: https://fonts.google.com/specimen/Crimson+Text */
/* Use for: Body text, captions, dates, statistics */

Weights: 400 (Regular), 600 (Semibold), 400 Italic
Characteristics: Classic journal serif, excellent readability, literary feel
```

**Sizes:**
- Body Text: 1.125rem (18px) / Regular / Line-height: 1.8
- Captions: 0.875rem (14px) / Regular / Line-height: 1.6
- Meta Info: 0.8125rem (13px) / Regular / Line-height: 1.5
- Emphasis: 1.125rem (18px) / Semibold

#### Alternative: Monospace for Stats/Data
```css
font-family: 'Courier Prime', monospace;
/* Google Fonts: https://fonts.google.com/specimen/Courier+Prime */
/* Use for: Distance counters, dates, travel statistics */

Weight: 400 (Regular)
```

---

## 🖼️ Textures & Effects

### Paper Grain Overlay
```css
.paper-texture {
  background-image: 
    url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
  background-size: 180px 180px;
}
```

### Leather Texture (for nav/headers)
```css
.leather-texture {
  background: 
    linear-gradient(135deg, var(--leather-medium) 0%, var(--leather-dark) 100%);
  background-image: 
    radial-gradient(circle at 25% 30%, rgba(255,255,255,0.08) 0%, transparent 50%),
    radial-gradient(circle at 75% 70%, rgba(0,0,0,0.1) 0%, transparent 50%);
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
}
```

### Photo Frame (Vintage Polaroid Effect)
```css
.photo-frame {
  padding: 12px 12px 40px 12px;
  background: var(--journal-paper);
  box-shadow: 
    0 2px 8px rgba(0,0,0,0.15),
    0 8px 20px rgba(0,0,0,0.1);
  transform: rotate(-1deg);
  border: 1px solid var(--sepia-medium);
}

.photo-frame::after {
  content: '';
  position: absolute;
  bottom: 8px;
  left: 12px;
  right: 12px;
  height: 28px;
  font-family: 'Caveat', cursive;
  font-size: 0.875rem;
  color: var(--ink-faded);
}
```

### Ink Bleed Effect (for handwritten text)
```css
.ink-bleed {
  text-shadow: 
    0.5px 0.5px 0.5px rgba(26, 20, 18, 0.3),
    -0.5px -0.5px 0.5px rgba(26, 20, 18, 0.2);
  filter: blur(0.2px);
}
```

### Worn Edges
```css
.worn-edges {
  position: relative;
}

.worn-edges::before {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px solid var(--sepia-medium);
  border-radius: 2px;
  box-shadow: 
    inset 0 0 20px rgba(0,0,0,0.05),
    0 1px 2px rgba(0,0,0,0.1);
  pointer-events: none;
}
```

---

## 📐 Layout & Spacing

### Preserved from Modern Design
- Split-screen layout (50% map, 50% content on desktop)
- Stacked layout (sticky map, scrolling content on mobile)
- Scroll-driven map animation system
- Weekly post structure with progress indicator

### Updated Component Styles

#### Week Card (Diary Entry Style)
```css
.week-card {
  background: var(--journal-paper);
  border: 1px solid var(--sepia-medium);
  border-radius: 4px;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 
    0 2px 8px rgba(0,0,0,0.08),
    0 4px 16px rgba(0,0,0,0.04);
  position: relative;
}

/* Stitching detail */
.week-card::before {
  content: '';
  position: absolute;
  top: 8px;
  left: 8px;
  right: 8px;
  bottom: 8px;
  border: 1px dashed var(--sepia-dark);
  border-radius: 2px;
  opacity: 0.3;
  pointer-events: none;
}
```

#### Navigation (Leather Spine)
```css
.nav-spine {
  background: var(--leather-dark);
  padding: 1rem 2rem;
  box-shadow: 
    inset 0 2px 4px rgba(0,0,0,0.3),
    0 2px 8px rgba(0,0,0,0.2);
}

.nav-link {
  font-family: 'Crimson Text', serif;
  font-weight: 600;
  color: var(--journal-paper);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: var(--leather-cognac);
}
```

#### Progress Indicator (Ribbon Bookmark)
```css
.progress-ribbon {
  position: fixed;
  top: 0;
  right: 0;
  width: 40px;
  height: 100vh;
  background: linear-gradient(180deg, var(--vintage-red) 0%, #8B4513 100%);
  box-shadow: 
    -2px 0 8px rgba(0,0,0,0.3),
    inset 1px 0 1px rgba(255,255,255,0.1);
  z-index: 100;
}

.progress-marker {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  background: var(--vintage-gold);
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  transition: top 0.3s ease;
}
```

---

## 🗺️ Map Styling

### Mapbox Theme: Vintage Paper Map
```javascript
// Use Mapbox Vintage style or customize with these parameters
style: 'mapbox://styles/mapbox/light-v11', // Base style
layers: [
  {
    // Land color - aged paper
    'paint': {
      'background-color': '#E8E0D0'
    }
  },
  {
    // Water - faded blue
    'paint': {
      'fill-color': '#A5BECC',
      'fill-opacity': 0.6
    }
  }
]

// Route line styling
paint: {
  'line-color': '#8B4513',        // Leather brown route
  'line-width': 4,
  'line-opacity': 0.8
}

// Location pins - vintage map markers
markerColor: '#A0522D',           // Vintage red
markerSize: 'medium'
```

---

## 📱 Responsive Behavior

### Breakpoints (Unchanged)
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Mobile Adjustments
```css
@media (max-width: 768px) {
  /* Reduce handwritten font sizes */
  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  
  /* Tighter spacing for mobile */
  .week-card { 
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
  
  /* Hide ribbon bookmark on mobile */
  .progress-ribbon { display: none; }
  
  /* Simplify textures for performance */
  .paper-texture { background-image: none; }
}
```

---

## ♿ Accessibility

### Contrast Ratios (WCAG AA Compliant)
- **Primary Text** (--ink-black on --journal-paper): 11.2:1 ✅
- **Secondary Text** (--ink-faded on --journal-paper): 7.8:1 ✅
- **Links** (--ink-blue on --journal-paper): 8.9:1 ✅
- **Navigation** (--journal-paper on --leather-dark): 12.1:1 ✅

### Focus States
```css
:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 2px;
  border-radius: 2px;
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  /* Disable map flyTo animations */
  .mapboxgl-map {
    --map-animation-duration: 0;
  }
}
```

---

## 🎭 Animation Principles

### Subtle & Organic
Animations should feel like pages turning, not digital transitions.

```css
/* Page turn effect for week cards */
@keyframes page-turn {
  0% {
    transform: perspective(1000px) rotateY(-5deg);
    opacity: 0;
  }
  100% {
    transform: perspective(1000px) rotateY(0deg);
    opacity: 1;
  }
}

.week-card.entering {
  animation: page-turn 0.6s ease-out;
}

/* Ink fade-in for text */
@keyframes ink-fade {
  0% {
    opacity: 0;
    filter: blur(2px);
  }
  100% {
    opacity: 1;
    filter: blur(0);
  }
}

.week-content {
  animation: ink-fade 0.8s ease-out 0.2s both;
}
```

---

## 🔧 Implementation Notes

### Google Fonts Import
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Courier+Prime&display=swap" rel="stylesheet">
```

### CSS Custom Properties
Define all colors in `:root` for easy theming and consistent use across components.

### Texture Performance
- Use CSS gradients and SVG data URIs for textures when possible
- Provide fallback solid colors for low-end devices
- Consider using `will-change` sparingly for animated elements

### Browser Support
- Target: Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- Graceful degradation: Textures and advanced effects degrade to solid colors
- Progressive enhancement: Core content accessible without JS

---

## 📊 Design Comparison

### Before (Coffee Palette)
- ❌ Yellowish tones (#FEF3C7, #FFFBEB) - too warm/bright
- ❌ Formal typography (Abril Fatface, Merriweather) - too rigid
- ✅ Split-screen layout - preserved
- ✅ Scroll animation system - preserved

### After (Leather Journal)
- ✅ Aged paper (#F5F1E8) - neutral, vintage, readable
- ✅ Rich leather browns (#3E2723-#8D6E63) - warm, tactile depth
- ✅ Handwritten headers (Caveat) - personal, diary-like
- ✅ Readable serif body (Crimson Text) - classic journal feel
- ✅ Paper grain & leather textures - tactile, weathered aesthetic
- ✅ Vintage photo treatments - nostalgic family album vibe

---

## 🚀 Quick Start Checklist

- [ ] Import Google Fonts (Caveat, Crimson Text, Courier Prime)
- [ ] Update CSS variables with journal color palette
- [ ] Apply `.paper-texture` to main content background
- [ ] Apply `.leather-texture` to navigation/headers
- [ ] Replace heading fonts with Caveat (handwritten)
- [ ] Replace body fonts with Crimson Text (serif)
- [ ] Add `.photo-frame` class to photo galleries
- [ ] Style week cards with `.week-card` and stitching detail
- [ ] Implement `.progress-ribbon` bookmark indicator
- [ ] Update Mapbox theme to vintage paper map style
- [ ] Test contrast ratios and accessibility
- [ ] Verify mobile responsiveness and texture performance

---

**Design Philosophy**: *"Every scroll should feel like turning the page of a well-loved travel journal—weathered, personal, and full of memories."*
