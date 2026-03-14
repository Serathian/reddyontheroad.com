# Architecture

**Analysis Date:** 2026-03-14

## Pattern Overview

**Overall:** Static HTML Prototype with Progressive Enhancement

**Key Characteristics:**
- Vanilla HTML/CSS/JS without build tooling or frameworks
- Self-contained prototype files demonstrating complete UI patterns
- Design system defined via CSS custom properties
- Client-side scroll-driven interactions using native Web APIs
- Mapbox GL JS for future map integration (included but placeholder implementation)

## Layers

**Presentation Layer:**
- Purpose: Static HTML prototypes demonstrating visual design and interaction patterns
- Location: `journal-prototype.html`, `journal-palette-preview.html`
- Contains: Complete page markup, inline styles, embedded JavaScript
- Depends on: Google Fonts CDN, Mapbox GL JS CDN
- Used by: Design reference for future implementation

**Design System Layer:**
- Purpose: Reusable style definitions and design tokens
- Location: `design-system-styles.css`, CSS variables in `journal-prototype.html`
- Contains: CSS custom properties, component classes, utility classes
- Depends on: Nothing (pure CSS)
- Used by: Prototype HTML files, future framework implementation

**Documentation Layer:**
- Purpose: Design specifications and implementation guidance
- Location: `JOURNAL_DESIGN_SYSTEM.md`, `MAP_ANIMATION_IMPLEMENTATION.md`, `PROJECT_README.md`
- Contains: Color palettes, typography specs, component descriptions, code examples
- Depends on: Nothing
- Used by: Developers implementing the design

**Configuration Layer:**
- Purpose: Framework-specific configuration templates
- Location: `tailwind.config.example.js`
- Contains: Tailwind CSS theme extensions (optional, not currently used)
- Depends on: Tailwind CSS (if adopted)
- Used by: Future Tailwind-based implementation

**Archive Layer:**
- Purpose: Historical design iterations preserved for reference
- Location: `archive/`
- Contains: Superseded design systems, outdated prototypes, old documentation
- Depends on: Nothing
- Used by: Historical reference only (not active development)

## Data Flow

**Static Prototype Flow:**

1. **HTML loads** → Inline CSS defines visual presentation via custom properties
2. **Google Fonts load** → Typography applied (Caveat, Crimson Text, Courier Prime)
3. **Mapbox GL JS loads** → Map container prepared (placeholder implementation)
4. **User scrolls** → JavaScript scroll listener fires
5. **Scroll position calculated** → Progress indicator updates, active week detected
6. **Active week changes** → Map info panel updates with week title/route

**State Management:**
- Scroll position drives all dynamic state
- No persistent state or data storage
- Week data embedded in HTML `data-week` attributes
- Active week determined by viewport intersection (manual calculation)

## Key Abstractions

**Week Card:**
- Purpose: Represents one week of travel content
- Examples: `.week-card` in `journal-prototype.html`
- Pattern: Article element with header, photo grid, content, stats sections

**Design Tokens:**
- Purpose: Centralized theme values for colors, spacing, typography
- Examples: CSS custom properties in `design-system-styles.css`
- Pattern: CSS variables defined in `:root`, organized by category (paper, leather, ink, etc.)

**Photo Frame:**
- Purpose: Vintage Polaroid-style photo presentation
- Examples: `.photo-frame` class in `journal-prototype.html`
- Pattern: Container with padding, rotation, shadow, and caption area

**Progress Indicator:**
- Purpose: Visual bookmark showing scroll progress
- Examples: `.progress-ribbon` in `journal-prototype.html`
- Pattern: Fixed-position ribbon with animated marker

## Entry Points

**Primary Prototype:**
- Location: `journal-prototype.html`
- Triggers: User opens file in browser
- Responsibilities: Demonstrates complete journal aesthetic with scroll interaction, week cards, map placeholder, navigation

**Color Reference:**
- Location: `journal-palette-preview.html`
- Triggers: User opens file in browser
- Responsibilities: Displays all color swatches, texture samples, typography examples

**Design System Entry:**
- Location: `JOURNAL_DESIGN_SYSTEM.md`
- Triggers: Developer reads documentation
- Responsibilities: Provides complete design specifications, code snippets, accessibility guidelines

**Configuration Entry:**
- Location: `tailwind.config.example.js`
- Triggers: Developer copies into project
- Responsibilities: Configures Tailwind CSS with theme colors, fonts, utilities

## Error Handling

**Strategy:** Graceful degradation with progressive enhancement

**Patterns:**
- Web fonts: Fallback to system serif/cursive if Google Fonts unavailable
- Textures: Paper grain SVG embedded inline, degrades to solid color
- Mapbox: Container displays placeholder if API fails to load
- JavaScript: Scroll interactions enhance UX but page functions without JS
- Reduced motion: `@media (prefers-reduced-motion)` disables all animations

## Cross-Cutting Concerns

**Logging:** None (static prototype, no runtime logging)

**Validation:** None (no form inputs or data validation)

**Authentication:** None (public static content)

**Accessibility:**
- Semantic HTML5 elements (`<article>`, `<nav>`, `<header>`)
- WCAG AA contrast ratios verified (documented in `JOURNAL_DESIGN_SYSTEM.md`)
- Focus indicators via `:focus-visible` pseudo-class
- Reduced motion support via media query
- Alt text placeholders for images (to be added with real content)

**Performance:**
- Paper texture removed on mobile (`@media (max-width: 768px)`)
- CSS `contain: layout style paint` on timeline posts
- Lazy loading planned for images (not yet implemented)
- No build process or minification (static prototype phase)

**Responsive Design:**
- Desktop: Split-screen layout (fixed map left, scrolling timeline right)
- Tablet/Mobile: Stacked layout (sticky map top, scrolling content below)
- Breakpoints: 768px (mobile), 1024px (tablet)

---

*Architecture analysis: 2026-03-14*
