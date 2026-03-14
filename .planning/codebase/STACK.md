# Technology Stack

**Analysis Date:** 2026-03-14

## Languages

**Primary:**
- HTML5 - Markup for static pages (`journal-prototype.html`, `journal-palette-preview.html`)
- CSS3 - Styling via inline `<style>` blocks and `design-system-styles.css`
- JavaScript (ES6+) - Client-side interactivity (embedded in HTML files)

**Secondary:**
- Markdown - Documentation files (`.md` format throughout project)

## Runtime

**Environment:**
- Browser-based (client-side only)
- Modern evergreen browsers: Chrome, Firefox, Safari, Edge

**Package Manager:**
- Bun - Lockfile present at `.opencode/bun.lock`
- Package manifest: `.opencode/package.json`
- Lockfile: Present

## Frameworks

**Core:**
- Vanilla HTML/CSS/JS - No framework currently in use
- Optional Tailwind CSS - Configuration provided in `tailwind.config.example.js` but not actively implemented

**Testing:**
- None - No testing framework detected

**Build/Dev:**
- None - Static HTML files served directly without build process
- Potential for Vite (mentioned in `.gitignore` with `vite.config.js.timestamp-*`)

## Key Dependencies

**Critical:**
- Mapbox GL JS v2.15.0 - Interactive map rendering with scroll-driven animation
  - CDN: `https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js`
  - CSS: `https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css`
  - Referenced in: `journal-prototype.html` lines 14-15
  - Status: Integrated but not yet initialized (placeholder code at line 914)

**Infrastructure:**
- Google Fonts API - Typography delivery (Caveat, Crimson Text, Courier Prime)
  - CDN: `https://fonts.googleapis.com/css2`
  - Used in: `journal-prototype.html` (line 11), `journal-palette-preview.html`, `design-system-styles.css` (line 106)
  - Preconnect optimizations present for `fonts.googleapis.com` and `fonts.gstatic.com`

**Development:**
- @opencode-ai/plugin v1.2.20 - Development tooling (`.opencode/package.json`)

## Configuration

**Environment:**
- Environment variables supported (`.env` files listed in `.gitignore`)
- No active `.env` files currently present
- Mapbox API token will be required (documented in `MAP_ANIMATION_IMPLEMENTATION.md` line 21)

**Build:**
- `tailwind.config.example.js` - Tailwind CSS configuration template (not active)
- No active build configuration files detected
- `.gitignore` suggests potential Svelte/SvelteKit consideration (`.svelte-kit`, `/package` entries)

## Platform Requirements

**Development:**
- Modern web browser for preview
- Optional: Bun runtime (for potential dependency management)
- Optional: Node.js/npm (if Tailwind CSS is adopted)

**Production:**
- Static file hosting (HTML/CSS/JS)
- Deployment target: Not yet configured
- Candidates mentioned in docs: Vercel, Netlify, GitHub Pages (`PROJECT_README.md` line 139, `AGENT_HANDOFF.md` line 79)

---

*Stack analysis: 2026-03-14*
