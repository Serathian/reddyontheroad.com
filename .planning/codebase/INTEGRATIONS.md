# External Integrations

**Analysis Date:** 2026-03-14

## APIs & External Services

**Mapping:**
- Mapbox GL JS v2.15.0 - Interactive map rendering and route visualization
  - SDK/Client: CDN-loaded JavaScript library
  - Auth: Mapbox API token (required, not yet configured)
  - Usage: Scroll-driven route animation from Finland to Spain
  - Implementation status: Integrated in HTML (line 14-15 of `journal-prototype.html`) but not initialized
  - Documentation: `MAP_ANIMATION_IMPLEMENTATION.md` provides complete integration guide
  - Alternative considered: Leaflet (mentioned in `AGENT_HANDOFF.md` line 59)

**Typography:**
- Google Fonts API - Web font delivery
  - Fonts loaded: Caveat (handwritten), Crimson Text (serif), Crimson Text (mono)
  - Connection: Preconnect optimization to `fonts.googleapis.com` and `fonts.gstatic.com`
  - Weights: Caveat (400, 700), Crimson Text (400, 600, italic), Courier Prime (regular)
  - CSS import also used in `design-system-styles.css` for Abril Fatface + Merriweather (legacy from archived design)

## Data Storage

**Databases:**
- None - Static content only

**File Storage:**
- Local filesystem only
- Photos to be stored in project directory (referenced in `AGENT_HANDOFF.md` - 3-5 photos per week, ~50-60 total)
- No cloud storage integration

**Caching:**
- None - Browser-level caching only

## Authentication & Identity

**Auth Provider:**
- None - Public read-only content
  - Implementation: No authentication required
  - Project is a static travel diary website

## Monitoring & Observability

**Error Tracking:**
- None

**Logs:**
- Browser console only (standard `console` methods available in JavaScript)

## CI/CD & Deployment

**Hosting:**
- Not yet deployed
  - Candidates mentioned: Vercel, Netlify, GitHub Pages, custom server
  - References: `PROJECT_README.md` line 139, `AGENT_HANDOFF.md` lines 79, 121, 147

**CI Pipeline:**
- None - No `.github/workflows` directory detected
  - Current deployment approach: Manual static file hosting

## Environment Configuration

**Required env vars:**
- `MAPBOX_ACCESS_TOKEN` - Required for Mapbox GL JS initialization (not yet set)
  - Obtain from: https://account.mapbox.com
  - Referenced in: `MAP_ANIMATION_IMPLEMENTATION.md` line 21

**Optional env vars:**
- None currently defined

**Secrets location:**
- Not configured
  - `.gitignore` includes `.env`, `.env.*` patterns to prevent secret exposure
  - No active `.env` files present in project

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## Content Management

**CMS:**
- Not configured
  - Content approach: Hardcoded HTML (current prototype)
  - Alternative mentioned: Markdown files (`PROJECT_README.md` line 182)
  - Decision pending user preference

**Static Content:**
- 12 weeks of travel stories (200-300 words each)
- Route coordinates and GPS data
- Photo gallery (3-5 photos per week)
- All content currently placeholder data in `journal-prototype.html`

## Third-Party Assets

**CDN Resources:**
- Mapbox GL JS and CSS (v2.15.0)
- Google Fonts (Caveat, Crimson Text, Courier Prime)

**Icon Libraries:**
- None currently integrated
- Design system skill suggests: Heroicons, Lucide, or Simple Icons (SVG-based)

---

*Integration audit: 2026-03-14*
