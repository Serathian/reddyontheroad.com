# CLAUDE.md — reddyontheroad.com

This file provides comprehensive context for AI assistants working on this codebase.

---

## Project Overview

**Reddy on the Road** is a personal travel website for Jake Reddy. The site showcases travel stories, routes, and locations with an emphasis on rich typography and interactive mapping.

**Domain:** reddyontheroad.com
**Owner:** Jake Reddy (jake.a.reddy@gmail.com)
**Status:** Early development — scaffold is in place, content and features are yet to be built.

### Core Purpose

- Display travel stories and journal entries pulled from a headless CMS
- Visualise travel routes and visited locations on interactive Mapbox maps
- Provide a beautiful, editorial reading experience using custom typography

---

## Technology Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | SvelteKit | 2.x |
| UI | Svelte | 5.x (runes-based reactivity) |
| Build tool | Vite | 6.x |
| Styling | Tailwind CSS | 4.x |
| Mapping | Mapbox GL JS | 3.x |
| Language | TypeScript | 5.x (strict) |
| Deployment target | Node.js (adapter-node) | — |

### Key Integration Points

- **CMS:** Headless CMS at `https://cms.jake-reddy.com` — content (posts, trips, locations) is fetched from here via the `PUBLIC_CMS_URL` environment variable.
- **Maps:** Mapbox GL JS uses a public token stored in `PUBLIC_MAPBOX_TOKEN`.

---

## Repository Structure

```
reddyontheroad.com/
├── .github/
│   └── workflows/
│       └── pr.yml            # GitHub Actions: lint, type-check, test on PRs
├── src/
│   ├── app.html              # Root HTML template (fonts, viewport, favicon)
│   ├── lib/                  # Shared utilities and components ($lib alias)
│   │   ├── components/       # Reusable Svelte components (to be created)
│   │   └── utils/            # Helper functions (*.ts + *.test.ts colocated)
│   └── routes/               # SvelteKit file-based routing
│       └── +page.svelte      # Home page (currently a placeholder)
├── static/                   # Static assets (served as-is)
├── .env.example              # Required environment variable template
├── .npmrc                    # GitHub Package Registry config for @serathian scope
├── eslint.config.js          # ESLint flat config (TypeScript + Svelte)
├── svelte.config.js          # SvelteKit config (adapter-node, $lib alias)
├── vite.config.ts            # Vite config (Tailwind + SvelteKit plugins)
├── tsconfig.json             # TypeScript config (strict, ES modules)
├── package.json              # Project manifest and npm scripts
└── CLAUDE.md                 # This file
```

### Path Aliases

- `$lib` → `src/lib` — use this for all imports of shared code

---

## Development Workflow

### Environment Setup

1. Copy `.env.example` to `.env` and fill in your values:
   ```
   PUBLIC_MAPBOX_TOKEN=pk.eyJ1...
   PUBLIC_CMS_URL=https://cms.jake-reddy.com
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start development server (hot reload) |
| `npm run build` | Compile production build to `build/` |
| `npm run preview` | Serve the production build locally |
| `npm run check` | Run SvelteKit sync + TypeScript type-check |
| `npm run check:watch` | Continuous type-checking in watch mode |
| `npm run lint` | Run ESLint across all `.ts` and `.svelte` files |
| `npm run test` | Run Vitest unit tests |
| `npm run test:coverage` | Run Vitest with V8 coverage report |

### Development Server

Run `npm run dev` and visit `http://localhost:5173`.

---

## Architecture & Conventions

### Svelte 5 Runes

This project uses **Svelte 5 with runes**. Always use the new reactivity primitives — do not use Svelte 4's `$:` reactive statements or `export let` props.

```svelte
<!-- Correct: Svelte 5 runes -->
<script lang="ts">
  let count = $state(0)
  let doubled = $derived(count * 2)

  interface Props {
    title: string
  }
  let { title }: Props = $props()
</script>

<!-- Wrong: Svelte 4 patterns (do not use) -->
<script lang="ts">
  export let title: string   // ❌ use $props()
  $: doubled = count * 2     // ❌ use $derived()
</script>
```

### Tailwind CSS 4

Tailwind 4 uses a **CSS-first configuration** — there is no `tailwind.config.js`. All customisation happens in CSS files using `@theme` directives.

```css
/* Example: src/app.css (to be created) */
@import "tailwindcss";

@theme {
  --font-display: "Playfair Display", serif;
  --font-body: "Lora", serif;
  --font-handwritten: "Caveat", cursive;
}
```

### Typography

Three Google Font families are loaded globally in `src/app.html`:

| Family | Weights | Use |
|---|---|---|
| **Playfair Display** | 700, 900 | Display headings, titles |
| **Lora** | 400, 600, 400-italic | Body text, article prose |
| **Caveat** | 400, 600 | Handwritten accents, captions |

Apply these via Tailwind font utilities once `@theme` is configured (e.g. `font-display`, `font-body`, `font-handwritten`).

### File & Naming Conventions

- **Components:** `PascalCase.svelte` (e.g. `TripCard.svelte`, `MapView.svelte`)
- **Route files:** SvelteKit conventions — `+page.svelte`, `+layout.svelte`, `+page.server.ts`, `+page.ts`
- **Utilities:** `camelCase.ts` (e.g. `formatDate.ts`, `fetchTrips.ts`)
- **Types:** `PascalCase` interfaces and types, kept in `src/lib/types.ts` or colocated
- **Styles:** Use Tailwind utility classes; avoid inline `style=""` except for dynamic values

### TypeScript

Strict TypeScript is enforced (`"strict": true`). Always:
- Type all function parameters and return values
- Use TypeScript interfaces for CMS response shapes
- Avoid `any` — use `unknown` and narrow with type guards

### CMS Data Fetching

Fetch content in SvelteKit **load functions** (`+page.ts` or `+page.server.ts`), not inside component `onMount`. Use `PUBLIC_CMS_URL` from `$env/static/public`.

```typescript
// src/routes/+page.ts
import { PUBLIC_CMS_URL } from '$env/static/public'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch(`${PUBLIC_CMS_URL}/api/posts`)
  const posts = await res.json()
  return { posts }
}
```

### Mapbox Integration

Always import Mapbox GL JS with a dynamic import or inside `onMount` to avoid SSR errors (Mapbox requires `window`).

```svelte
<script lang="ts">
  import { onMount } from 'svelte'
  import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public'

  onMount(async () => {
    const mapboxgl = (await import('mapbox-gl')).default
    mapboxgl.accessToken = PUBLIC_MAPBOX_TOKEN
    // initialise map...
  })
</script>
```

---

## Planned Feature Roadmap

These are the anticipated features to build. Implement them incrementally:

### Phase 1 — Foundation
- [ ] Global layout (`src/routes/+layout.svelte`) with site nav and footer
- [ ] CSS setup: `src/app.css` with Tailwind 4 `@theme` configuration for custom fonts and colours
- [ ] Home page with hero section and latest trips preview

### Phase 2 — Content
- [ ] CMS integration: define TypeScript types for posts, trips, and locations
- [ ] Trip listing page (`/trips`)
- [ ] Individual trip/post page (`/trips/[slug]`)
- [ ] CMS fetch utilities in `src/lib/`

### Phase 3 — Maps
- [ ] Reusable `MapView` component using Mapbox GL JS
- [ ] Trip route visualisation (GeoJSON lines)
- [ ] Location markers with popups
- [ ] Full-screen map page (`/map`)

### Phase 4 — Polish
- [ ] SEO: `<svelte:head>` metadata on all pages
- [ ] Responsive design across all breakpoints
- [ ] Page transitions and loading states
- [ ] Static prerendering where appropriate

---

## Deployment

The project uses `@sveltejs/adapter-node`, which builds a Node.js server to `build/`.

```bash
npm run build
node build
```

Environment variables must be present at **runtime** (not just build time) since they are accessed server-side via SvelteKit load functions.

---

## CI/CD

A GitHub Actions workflow runs on every pull request targeting `master` (`.github/workflows/pr.yml`). It executes three checks in order:

1. **Lint** — ESLint across all `.ts` and `.svelte` files (`npm run lint`)
2. **Type check** — SvelteKit sync + `svelte-check` (`npm run check`)
3. **Tests** — Vitest unit tests (`npm run test`)

All three must pass before a PR can be merged. The workflow authenticates with the GitHub Package Registry (via `secrets.GITHUB_TOKEN`) to install the `@serathian/basecamp-cms-types` private package.

### Development Workflow

Each feature or phase is developed on a branch and merged to `master` via a pull request. The PR workflow gate ensures linting and tests always pass on `master`.

---

## Important Constraints

- **Testing framework:** Vitest is configured. Place test files alongside source files as `*.test.ts`.
- **Linting:** ESLint is configured in `eslint.config.js` with TypeScript and Svelte plugins.
- **CMS types package:** `@serathian/basecamp-cms-types` is installed from the GitHub Package Registry. The `.npmrc` reads the auth token from the `GITHUB_TOKEN` environment variable — locally use a personal access token with `read:packages` scope.
- **Do not commit `.env`** — it is in `.gitignore`. Only `.env.example` is tracked.
- **Keep `PUBLIC_` prefix** on all environment variables that are accessed in browser code (SvelteKit enforces this).
- **SSR awareness:** SvelteKit renders on the server by default. Any browser-only code (Mapbox, `window`, `document`) must be guarded with `onMount` or `browser` checks.

```typescript
import { browser } from '$app/environment'

if (browser) {
  // safe to use window here
}
```
