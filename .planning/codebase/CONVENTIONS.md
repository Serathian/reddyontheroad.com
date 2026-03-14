# Coding Conventions

**Analysis Date:** 2026-03-14

## Naming Patterns

**Files:**
- Kebab-case for HTML files: `journal-prototype.html`, `journal-palette-preview.html`
- Kebab-case for CSS files: `design-system-styles.css`
- SCREAMING_SNAKE_CASE for documentation: `PROJECT_README.md`, `JOURNAL_DESIGN_SYSTEM.md`, `MAP_ANIMATION_IMPLEMENTATION.md`
- Kebab-case for JavaScript config: `tailwind.config.example.js`

**Functions:**
- camelCase for JavaScript functions: `updateProgress()`, `querySelector()`, `addEventListener()`

**Variables:**
- camelCase for JavaScript variables: `scrollTop`, `docHeight`, `winHeight`, `scrollPercent`
- const for immutable values: `const timeline`, `const progressMarker`, `const mapInfo`

**CSS Variables:**
- Double-dash prefix with semantic naming: `--journal-paper`, `--leather-dark`, `--ink-black`
- Grouped by category: `--journal-*`, `--leather-*`, `--ink-*`, `--vintage-*`, `--sepia-*`
- Legacy aliases preserved for backwards compatibility: `--color-primary`, `--color-background`

**Classes:**
- Kebab-case: `.week-card`, `.photo-frame`, `.navbar-link`, `.timeline-container`
- BEM-like modifiers: `.week-card.active`, `.photo-frame.large`
- Semantic naming over presentational: `.hero-section` not `.big-text-area`

## Code Style

**Formatting:**
- 2-space indentation for HTML, CSS, and JavaScript
- No trailing whitespace
- Consistent spacing around operators and braces

**Linting:**
- No formal linting tool detected
- Manual code review standards

**CSS Organization:**
- CSS variables defined in `:root` at top of file
- Grouped by category with comment headers
- Components ordered logically (layout → content → interactive)

## Import Organization

**Order:**
1. External resources (fonts, libraries)
2. Stylesheets
3. Scripts

**Example from `journal-prototype.html`:**
```html
<!-- Journal Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Caveat..." rel="stylesheet">

<!-- Mapbox -->
<link href='https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css' rel='stylesheet' />
<script src='https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js'></script>
```

**Path Aliases:**
- Not detected - vanilla HTML/CSS/JS without build system

## Error Handling

**Patterns:**
- Minimal explicit error handling in current code
- Reliance on browser defaults for DOM operations
- No try-catch blocks in existing JavaScript

**TODO:** Error handling needs to be added for:
- Missing DOM elements
- Failed external resource loading (fonts, Mapbox)
- Invalid data attributes

## Logging

**Framework:** Standard console (no logging library)

**Patterns:**
- No console logging in production code
- Comments used for documentation instead of debug logs

## Comments

**When to Comment:**
- Inline comments for complex logic: `// Calculate scroll progress`
- Section headers in CSS: `/* ===== COLOR PALETTE ===== */`
- Placeholder notes: `// Mapbox integration would go here`
- Legacy compatibility notes: `/* Legacy aliases for backwards compatibility */`

**Documentation Comments:**
- File headers explain purpose and context
- CSS variables include inline descriptions
- JavaScript functions have brief purpose comments

**Style:**
- Single-line comments with `//` for JavaScript
- Multi-line comments with `/* */` for CSS
- Clear, descriptive language
- No redundant comments (code should be self-documenting where possible)

## Function Design

**Size:** 
- Short, focused functions (20-50 lines typical)
- Single responsibility principle

**Parameters:** 
- Minimal parameters (0-3 typical)
- No parameter validation in current code

**Return Values:** 
- Implicit returns (void functions for side effects)
- No explicit return type documentation

**Example Pattern from `journal-prototype.html`:**
```javascript
function updateProgress() {
  const timeline = document.querySelector('.timeline-container');
  const progressMarker = document.getElementById('progressMarker');
  const mapInfo = document.getElementById('mapInfo');
  const weekCards = document.querySelectorAll('.week-card');
  
  // Calculate scroll progress
  const scrollTop = window.pageYOffset;
  const docHeight = timeline.scrollHeight;
  const winHeight = window.innerHeight;
  const scrollPercent = scrollTop / (docHeight - winHeight);
  
  // Update ribbon marker position
  progressMarker.style.top = `${Math.min(scrollPercent * 100, 95)}%`;
  
  // Detect which week is in view
  weekCards.forEach(card => {
    // Card interaction logic
  });
}
```

## CSS Conventions

**Variable Usage:**
- Always use CSS variables for colors: `color: var(--ink-black)`
- Use variables for spacing: `padding: var(--space-lg)`
- Use variables for typography: `font-family: var(--font-handwritten)`

**Selectors:**
- Class-based (not ID-based except for JavaScript hooks)
- Avoid deep nesting (max 2-3 levels)
- Semantic class names over utility classes

**Responsive Design:**
- Mobile-first approach implied but not strictly enforced
- Media queries at component level, not separate file
- Breakpoints: 768px (tablet), 375px (small mobile)

**Accessibility:**
- Focus states defined: `*:focus { outline: 2px solid var(--color-primary) }`
- Reduced motion support: `@media (prefers-reduced-motion: reduce)`
- Skip-to-content link: `.skip-to-content`
- Semantic HTML elements used

## HTML Conventions

**Structure:**
- Semantic HTML5 elements: `<article>`, `<nav>`, `<section>`
- Data attributes for JavaScript hooks: `data-week="1"`
- BEM-like class naming for components

**Accessibility:**
- `lang` attribute on `<html>` element
- Meta viewport tag for responsive design
- Descriptive alt text required (currently using placeholder emojis)

## JavaScript Conventions

**ES6+ Features:**
- `const` and `let` (no `var`)
- Template literals: `` `Week ${weekNum}` ``
- Arrow functions in callbacks: `weekCards.forEach(card => { ... })`

**DOM Manipulation:**
- `querySelector` and `querySelectorAll` for selection
- Direct property access: `element.style.top`, `element.textContent`
- `classList` for class manipulation: `classList.add('active')`, `classList.remove('active')`

**Event Handling:**
- `addEventListener` (not inline handlers)
- Passive listeners not explicitly used (potential performance improvement)

**Code Organization:**
- Inline `<script>` tags (no external JS files currently)
- Function declarations (not arrow functions for top-level)
- Event listeners registered after function definitions

## Performance Patterns

**CSS:**
- `contain: layout style paint` on animated elements
- Minimal use of expensive properties (shadows, gradients used sparingly)
- Hardware acceleration implied through transforms

**JavaScript:**
- Debouncing/throttling not implemented (potential improvement for scroll handlers)
- DOM queries cached in function scope

**Images:**
- Placeholder approach currently (📸 emoji)
- Real images should use lazy loading and responsive srcset

## Browser Support

**Target:**
- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox used (no fallbacks)
- ES6+ JavaScript (no transpilation)

**Polyfills:**
- None detected or required for target browsers

---

*Convention analysis: 2026-03-14*
