# Agents.md — reddyontheroad.com Handoff

This document gives a remote Claude agent everything needed to continue implementing this project with zero additional context.

---

## Project Summary

**What this is:** A SvelteKit frontend for a personal family travel blog — a 2022 motorhome road trip from Oulu, Finland to Málaga, Spain. Jake, his wife Ana, and their 3-year-old daughter Leila. Personal family memoir, not a commercial blog.

**Repo location:** `c:\Repositories\droplet-stack\reddyontheroad.com\`

**Design brief:**
- Scroll-driven timeline on the left; sticky Mapbox GL JS mini-map on the right
- As the reader scrolls through each week, the map flies to that week's country and lights up the route
- Warm parchment palette (`#fdf6e3` bg), amber accents (`#b45309`), sage green (`#4d7c0f`)
- Three fonts: **Playfair Display** (headings), **Lora** (body serif), **Caveat** (handwritten script — week labels, nav logo)
- No gradients, no card grids with rounded corners, no centered-everything — editorial and journal-like

**Tech stack:**
- SvelteKit 2 + Svelte 5 (runes: `$state`, `$props`, `$effect`)
- TypeScript (strict)
- Tailwind CSS v4 (CSS `@theme` tokens, no `tailwind.config.js`)
- Mapbox GL JS 3.x
- `@sveltejs/adapter-node` (Docker deployment, port 3003)
- Google Fonts loaded via `<link>` in `src/app.html`

**CMS backend:** Payload v3 at `https://cms.jake-reddy.com/api` — collections `rotr_posts` and `rotr_locations`. Data layer uses mock data first (`USE_MOCK = true` in `src/lib/api.ts`), Payload API ready behind a flag.

---

## Current State

**Single commit:** `d741801 — initial commit`

**Files committed:**
```
.env.example            ← PUBLIC_MAPBOX_TOKEN + PUBLIC_CMS_URL
.gitignore
package.json            ← all deps installed, needs "type": "module" added
package-lock.json
src/app.html            ← Google Fonts preconnects + SvelteKit head/body markers ✓
src/routes/+page.svelte ← STUB only: <h1>Reddy on the Road</h1>
svelte.config.js        ← adapter-node, $lib alias ✓
tsconfig.json           ← strict mode ✓
vite.config.ts          ← @tailwindcss/vite + sveltekit plugins ✓
```

**node_modules:** Already installed. Run `npm install` if missing.

**`.svelte-kit/`:** Generated (run `npx svelte-kit sync` if missing).

---

## Installed Packages

```json
"devDependencies": {
  "@sveltejs/adapter-node": "^5.2.12",
  "@sveltejs/kit": "^2.16.0",
  "@sveltejs/vite-plugin-svelte": "^5.0.0",
  "@tailwindcss/vite": "^4.1.0",
  "svelte": "^5.0.0",
  "svelte-check": "^4.0.0",
  "tailwindcss": "^4.1.0",
  "typescript": "^5.7.0",
  "vite": "^6.0.0"
},
"dependencies": {
  "mapbox-gl": "^3.6.0"
}
```

---

## Remaining Work (Tasks 2–16)

Complete these in order. Commit after each task as specified.

---

### Fix: Add `"type": "module"` to `package.json`

Add `"type": "module"` as the second key in `package.json` (eliminates a Node.js warning during build):

```json
{
  "name": "reddyontheroad.com",
  "type": "module",
  "version": "0.0.1",
  ...
}
```

Commit: `git add package.json && git commit -m "chore: add type module to package.json"`

---

### Task 2: Design System — `src/app.css` + Root Layout

**Create `src/app.css`:**

```css
@import "tailwindcss";

/* ─── Brand tokens ──────────────────────────────────────────────────────────── */
@theme {
  /* Colors */
  --color-parchment: #fdf6e3;
  --color-ink:       #1c1917;
  --color-amber:     #b45309;
  --color-sage:      #4d7c0f;
  --color-stone:     #78716c;
  --color-rule:      #d6cfc0;
  --color-paper:     #f5edda;
  --color-map-bg:    #f0e8d0;

  /* Typography */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body:    'Lora', Georgia, serif;
  --font-script:  'Caveat', cursive;

  /* Animations */
  --animate-fade-up: fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  --animate-fade-in: fade-in 0.4s ease both;
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* ─── Paper grain overlay ───────────────────────────────────────────────────── */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ─── Base ──────────────────────────────────────────────────────────────────── */
html {
  background-color: #fdf6e3;
  color: #1c1917;
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body, Georgia, serif);
  line-height: 1.8;
  -webkit-font-smoothing: antialiased;
}

/* ─── Nav link underline (amber) ────────────────────────────────────────────── */
.nav-link {
  position: relative;
  text-decoration: none;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #b45309;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s ease;
}
.nav-link:hover::after,
.nav-link[data-active="true"]::after {
  transform: scaleX(1);
}

/* ─── CTA arrow nudge ───────────────────────────────────────────────────────── */
.cta-arrow {
  display: inline-block;
  transition: transform 0.15s ease;
}
a:hover .cta-arrow,
button:hover .cta-arrow {
  transform: translateX(4px);
}

/* ─── Prose body styles ─────────────────────────────────────────────────────── */
.prose-journal p {
  font-family: var(--font-body);
  font-size: 1.0625rem;
  line-height: 1.85;
  color: #1c1917;
  margin-bottom: 1.5rem;
}

.prose-journal h2 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  color: #1c1917;
}

.prose-journal h3 {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

/* ─── Week number script label ──────────────────────────────────────────────── */
.week-label {
  font-family: var(--font-script);
  font-size: 1.25rem;
  color: #b45309;
  letter-spacing: 0.01em;
}

/* ─── Mapbox GL JS overrides ────────────────────────────────────────────────── */
.mapboxgl-map {
  font-family: var(--font-body) !important;
}
.mapboxgl-ctrl-logo {
  opacity: 0.4;
}

/* ─── Reduced motion ────────────────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Create `src/routes/+layout.svelte`** (replaces stub if exists):

```svelte
<script lang="ts">
  import '../app.css'
  import Nav from '$lib/components/layout/Nav.svelte'
  import Footer from '$lib/components/layout/Footer.svelte'
</script>

<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-amber focus:px-4 focus:py-2 focus:text-parchment focus:rounded"
>
  Skip to content
</a>

<Nav />
<main id="main-content" class="pt-14 min-h-screen">
  <slot />
</main>
<Footer />
```

**Verify:** `npm run dev` → http://localhost:5173, background should be warm parchment `#fdf6e3`.

**Commit:** `git add src/app.css src/routes/+layout.svelte && git commit -m "feat: design system — Tailwind v4 tokens, base styles, root layout"`

---

### Task 3: TypeScript Types

**Important:** All CMS collection types are generated from Payload CMS and published to npm as `@basecamp-cms/basecamp-cms-types` (already in `package.json`). Do not redefine types that exist in this package — import them directly.

**Create `src/lib/types.ts`:**

```typescript
// ─── CMS types — import from shared package, do not redefine ────────────────
export type {
  Media,
  Author,
  Tag,
  RotrPost,
  RotrLocation,
} from '@basecamp-cms/basecamp-cms-types'

// ─── Local re-exports for convenience ────────────────────────────────────────
// Re-export any enums/string unions the package exposes:
export type { PlaceType, MarkerType, PostType, PostStatus } from '@basecamp-cms/basecamp-cms-types'

// ─── Types that only exist on the frontend (not in Payload schema) ────────────

export interface RotrLocationStop {
  location: RotrLocation
  visit_date?: string
  id?: string
}

// ─── Payload REST API envelope ────────────────────────────────────────────────

export interface PayloadListResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

// ─── Map types ────────────────────────────────────────────────────────────────

export interface MapCoord {
  lng: number
  lat: number
}
```

If the package does not yet export a type you need, check `node_modules/@basecamp-cms/basecamp-cms-types/dist/index.d.ts` first. Only define locally if it is genuinely absent.

**Verify:** `npm run check` → no errors.

**Commit:** `git add src/lib/types.ts && git commit -m "feat: TypeScript interfaces matching Payload CMS rotr schema"`

---

<!-- original Task 3 manual type definitions preserved below for reference only — use package instead -->
<!--
**Create `src/lib/types.ts` (LEGACY — use package above instead):**

```typescript
// ─── CMS media / relational types ──────────────────────────────────────────

export interface Media {
  id: number
  url: string
  filename: string
  mimeType: string
  width: number
  height: number
  alt?: string
}

export interface Author {
  id: number
  name: string
  bio?: string
  avatar?: Media
}

export interface Tag {
  id: number
  name: string
  slug: string
}

// ─── Location types ──────────────────────────────────────────────────────────

export type PlaceType =
  | 'city' | 'town' | 'village' | 'beach'
  | 'mountain' | 'park' | 'landmark'
  | 'accommodation' | 'restaurant' | 'other'

export type MarkerType =
  | 'hotel' | 'hostel' | 'airbnb' | 'camp' | 'parking'
  | 'city-stop' | 'viewpoint' | 'beach' | 'restaurant' | 'other'

export interface RotrLocation {
  id: number
  name: string
  description?: string
  place_type: PlaceType
  marker_type: MarkerType
  latitude: number
  longitude: number
  country?: string
}

export interface RotrLocationStop {
  location: RotrLocation
  visit_date?: string
  id?: string
}

// ─── Post types ───────────────────────────────────────────────────────────────

export type PostType = 'story' | 'guide' | 'tips' | 'listicle'
export type PostStatus = 'draft' | 'published' | 'archived'

export interface RotrPost {
  id: number
  status: PostStatus
  title: string
  slug: string
  type?: PostType
  excerpt?: string
  body?: string
  cover_image?: Media
  author?: Author
  tags?: Tag[]
  latitude?: number
  longitude?: number
  locations?: RotrLocationStop[]
  published_at?: string
  wp_post_id?: number
  updatedAt: string
  createdAt: string
}

// ─── Payload REST API envelope ────────────────────────────────────────────────

export interface PayloadListResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

// ─── Map types ────────────────────────────────────────────────────────────────

export interface MapCoord {
  lng: number
  lat: number
}
```
-->

---

### Task 4: Mock Data

**Create `src/lib/mock/locations.ts`:**

```typescript
import type { RotrLocation } from '$lib/types'

export const mockLocations: Record<string, RotrLocation[]> = {
  'week-1-oulu': [
    { id: 101, name: 'Oulu City Centre', place_type: 'city', marker_type: 'city-stop', latitude: 65.0121, longitude: 25.4651, country: 'Finland', description: 'Our starting point.' },
    { id: 102, name: 'Virpiniemi Campsite', place_type: 'accommodation', marker_type: 'camp', latitude: 65.0785, longitude: 25.2904, country: 'Finland' },
    { id: 103, name: 'Nallikari Beach', place_type: 'beach', marker_type: 'beach', latitude: 65.0271, longitude: 25.3733, country: 'Finland' },
  ],
  'week-2-stockholm': [
    { id: 201, name: 'Stockholm Old Town', place_type: 'city', marker_type: 'city-stop', latitude: 59.3251, longitude: 18.0711, country: 'Sweden' },
    { id: 202, name: 'Camping Stockholm', place_type: 'accommodation', marker_type: 'camp', latitude: 59.3128, longitude: 18.0045, country: 'Sweden' },
    { id: 203, name: 'Djurgården', place_type: 'park', marker_type: 'viewpoint', latitude: 59.3271, longitude: 18.1099, country: 'Sweden' },
    { id: 204, name: 'Vasa Museum', place_type: 'landmark', marker_type: 'city-stop', latitude: 59.3280, longitude: 18.0912, country: 'Sweden' },
  ],
  'week-3-copenhagen': [
    { id: 301, name: 'Copenhagen Central', place_type: 'city', marker_type: 'city-stop', latitude: 55.6761, longitude: 12.5683, country: 'Denmark' },
    { id: 302, name: 'Nyhavn', place_type: 'landmark', marker_type: 'city-stop', latitude: 55.6796, longitude: 12.5896, country: 'Denmark' },
    { id: 303, name: 'Absalon Camping', place_type: 'accommodation', marker_type: 'camp', latitude: 55.6544, longitude: 12.5067, country: 'Denmark' },
  ],
  'week-4-germany': [
    { id: 401, name: 'Hamburg Reeperbahn', place_type: 'city', marker_type: 'city-stop', latitude: 53.5495, longitude: 9.9653, country: 'Germany' },
    { id: 402, name: 'Hamburg Stellingen Camping', place_type: 'accommodation', marker_type: 'camp', latitude: 53.5952, longitude: 9.9204, country: 'Germany' },
    { id: 403, name: 'Cologne Cathedral', place_type: 'landmark', marker_type: 'viewpoint', latitude: 50.9413, longitude: 6.9583, country: 'Germany' },
    { id: 404, name: 'Rhine Valley Parking', place_type: 'park', marker_type: 'parking', latitude: 50.2667, longitude: 7.5500, country: 'Germany' },
  ],
  'week-5-strasbourg': [
    { id: 501, name: 'Strasbourg Petite France', place_type: 'city', marker_type: 'city-stop', latitude: 48.5734, longitude: 7.7521, country: 'France' },
    { id: 502, name: 'Camping de la Montagne Verte', place_type: 'accommodation', marker_type: 'camp', latitude: 48.5760, longitude: 7.7101, country: 'France' },
    { id: 503, name: 'Alsace Wine Route', place_type: 'landmark', marker_type: 'viewpoint', latitude: 48.1683, longitude: 7.2714, country: 'France' },
  ],
  'week-6-perpignan': [
    { id: 601, name: 'Perpignan Old City', place_type: 'city', marker_type: 'city-stop', latitude: 42.6886, longitude: 2.8948, country: 'France' },
    { id: 602, name: 'Camping du Roussillon', place_type: 'accommodation', marker_type: 'camp', latitude: 42.7012, longitude: 2.9135, country: 'France' },
    { id: 603, name: 'Col du Perthus — Pyrenees Crossing', place_type: 'mountain', marker_type: 'viewpoint', latitude: 42.4620, longitude: 2.8680, country: 'France/Spain' },
  ],
  'week-7-barcelona': [
    { id: 701, name: 'La Barceloneta', place_type: 'beach', marker_type: 'beach', latitude: 41.3769, longitude: 2.1897, country: 'Spain' },
    { id: 702, name: 'Sagrada Família', place_type: 'landmark', marker_type: 'viewpoint', latitude: 41.4036, longitude: 2.1744, country: 'Spain' },
    { id: 703, name: 'Camping Tres Estrellas', place_type: 'accommodation', marker_type: 'camp', latitude: 41.3209, longitude: 2.0856, country: 'Spain' },
    { id: 704, name: 'Passeig de Gràcia', place_type: 'city', marker_type: 'city-stop', latitude: 41.3917, longitude: 2.1649, country: 'Spain' },
  ],
  'week-8-malaga': [
    { id: 801, name: 'Málaga Old Town', place_type: 'city', marker_type: 'city-stop', latitude: 36.7213, longitude: -4.4214, country: 'Spain' },
    { id: 802, name: 'Playa de la Malagueta', place_type: 'beach', marker_type: 'beach', latitude: 36.7153, longitude: -4.4058, country: 'Spain' },
    { id: 803, name: 'Camping Málaga', place_type: 'accommodation', marker_type: 'camp', latitude: 36.7339, longitude: -4.3712, country: 'Spain' },
    { id: 804, name: 'Mirador de Gibralfaro', place_type: 'landmark', marker_type: 'viewpoint', latitude: 36.7222, longitude: -4.4100, country: 'Spain' },
  ],
}
```

**Create `src/lib/mock/posts.ts`:**

```typescript
import type { RotrPost } from '$lib/types'
import { mockLocations } from './locations'

const makeStops = (key: string) =>
  mockLocations[key].map((loc) => ({
    location: loc,
    visit_date: undefined,
    id: String(loc.id),
  }))

export const mockPosts: RotrPost[] = [
  {
    id: 1, status: 'published', title: 'Leaving Oulu', slug: 'week-1-oulu', type: 'story',
    excerpt: 'The morning we packed the last boxes into the motorhome, Leila kept asking if she could bring her entire bedroom. We said no. She brought the pillow at least. By noon we were on the E75 heading south, watching Finland blur past the windows.',
    body: `It had taken three months to reach this point. The motorhome — a 2012 Hymer B-Class we'd found through a Finnish Facebook group — had been cleaned, serviced, and loaded so many times that we knew exactly where everything lived. Leila's car seat bolted into the bench seat opposite the kitchen. Ana's plants had all been surrendered to a neighbour except for one small succulent that found a home in the dashboard cup holder.\n\nOulu in July is as close to paradise as Finland gets. Long evenings, warm enough to sit outside, the sea a short cycle away. Leaving it felt strange — not sad exactly, but like stepping off a ledge you've been standing on for years.`,
    latitude: 65.0121, longitude: 25.4651,
    locations: makeStops('week-1-oulu'),
    published_at: '2022-07-04T08:00:00.000Z',
    updatedAt: '2022-07-04T08:00:00.000Z', createdAt: '2022-07-04T08:00:00.000Z',
  },
  {
    id: 2, status: 'published', title: 'Stockholm', slug: 'week-2-stockholm', type: 'story',
    excerpt: 'Sweden felt immediately different — wider roads, bigger parking areas, a faint sense that motorhomes were expected here. We crossed from Haparanda and by evening were parked up on the outskirts of Stockholm.',
    body: `Stockholm is a city that assumes you know what you're doing. We didn't, quite. The motorhome, which felt enormous in Finnish campsite lanes, felt positively agricultural trying to navigate the Djurgården bridge. Leila slept through most of it.\n\nWe parked at the Fishing Harbour area and took the metro in. Old Town on foot, the Vasa Museum — which Leila declared "the broken boat museum" and was not wrong — and the unexpected pleasure of finding a playground on Djurgården that kept us occupied for two hours while Ana made coffee.`,
    latitude: 59.3293, longitude: 18.0686,
    locations: makeStops('week-2-stockholm'),
    published_at: '2022-07-11T08:00:00.000Z',
    updatedAt: '2022-07-11T08:00:00.000Z', createdAt: '2022-07-11T08:00:00.000Z',
  },
  {
    id: 3, status: 'published', title: 'Copenhagen and the Great Belt', slug: 'week-3-copenhagen', type: 'story',
    excerpt: 'Denmark announced itself with flat light and the smell of the sea. We crossed the Øresund Bridge early in the morning and found Copenhagen still waking up. Leila ate a pastry almost as big as her face in Nyhavn.',
    body: `The Øresund Bridge crossing deserves its own entry. There's a particular Danish quality to the road — flat, purposeful, the sea on both sides. The bridge toll was eye-watering. Worth it.\n\nCopenhagen in August heat is a different city to its winter reputation. People were everywhere — on bikes, at café terraces, in the parks. We found a campsite about twenty minutes from the centre, walked the bikes in from the van, and spent three days feeling like residents rather than tourists.`,
    latitude: 55.6761, longitude: 12.5683,
    locations: makeStops('week-3-copenhagen'),
    published_at: '2022-07-18T08:00:00.000Z',
    updatedAt: '2022-07-18T08:00:00.000Z', createdAt: '2022-07-18T08:00:00.000Z',
  },
  {
    id: 4, status: 'published', title: 'Germany — The Autobahn Week', slug: 'week-4-germany', type: 'story',
    excerpt: 'Germany meant the Autobahn, and the Autobahn meant decisions. We had agreed, in advance, that we would drive sensibly. We averaged 78 km/h through roadworks the whole way to Hamburg. Leila napped. Responsible parenting.',
    body: `Hamburg hit us like a city that had decided to be interesting on purpose. The harbour, the Speicherstadt, the Reeperbahn at 11 in the morning with its very apologetic energy — all of it felt like arriving somewhere that had been somewhere for a long time.\n\nFrom Hamburg we drove the Rhine Valley route rather than the motorway. This was Ana's suggestion and it was the best navigation decision of the trip. The river on one side, castle ruins on the cliffs, a wine village every fifteen kilometres. We drank Riesling sitting on the motorhome steps and watched the river traffic and felt unambiguously lucky.`,
    latitude: 53.5511, longitude: 9.9937,
    locations: makeStops('week-4-germany'),
    published_at: '2022-07-25T08:00:00.000Z',
    updatedAt: '2022-07-25T08:00:00.000Z', createdAt: '2022-07-25T08:00:00.000Z',
  },
  {
    id: 5, status: 'published', title: 'Alsace — France Begins', slug: 'week-5-strasbourg', type: 'story',
    excerpt: "Crossing into France felt ceremonial. There's a particular French quality to the roadsides — the plane trees, the stone walls, the village names that all sound like poetry. We arrived in Strasbourg in the late afternoon and immediately got lost in Petite France.",
    body: `Strasbourg is a city in negotiation with itself — French and German, European and local, old half-timbered buildings and the glass-and-steel Parliament all within walking distance of each other. We spent two days here and could have spent two weeks.\n\nLeila's highlight was a duck she befriended near the canal. The duck was unimpressed but patient. Ana found a bookshop selling English-language novels in the old town and disappeared for two hours. I ate a flammkuchen standing up at a market stall and considered that this was exactly the trip we had hoped it would be.`,
    latitude: 48.5734, longitude: 7.7521,
    locations: makeStops('week-5-strasbourg'),
    published_at: '2022-08-01T08:00:00.000Z',
    updatedAt: '2022-08-01T08:00:00.000Z', createdAt: '2022-08-01T08:00:00.000Z',
  },
  {
    id: 6, status: 'published', title: 'The Pyrenees', slug: 'week-6-perpignan', type: 'story',
    excerpt: 'The Pyrenees crossing is, in the motorhome community, something of a rite of passage. You either go through the tunnel or you take the mountain road. We took the mountain road. This was either brave or silly. Possibly both.',
    body: `Perpignan sits at the foot of the Pyrenees with a confidence that comes from being the last major French city before Spain. The old Catalan quarter is extraordinary — terracotta and shadow and the smell of something being grilled somewhere always just out of sight.\n\nThe Col du Perthus crossing itself was not as dramatic as we'd feared. The road is wide enough, the gradient manageable. We pulled into a lay-by at the top and got out to stand on the border. Leila asked which side was which. We pointed. France. Spain. She nodded as if this confirmed something she'd always suspected.`,
    latitude: 42.6886, longitude: 2.8948,
    locations: makeStops('week-6-perpignan'),
    published_at: '2022-08-08T08:00:00.000Z',
    updatedAt: '2022-08-08T08:00:00.000Z', createdAt: '2022-08-08T08:00:00.000Z',
  },
  {
    id: 7, status: 'published', title: 'Barcelona', slug: 'week-7-barcelona', type: 'story',
    excerpt: "Barcelona was an idea we'd been building toward for months. In reality it was even more than the idea. We found a campsite south of the city, took the metro in, and on the first morning walked to the sea and stood there for a long time not saying very much.",
    body: `Sagrada Família first, obviously. You have to. Leila was uncharacteristically quiet inside, which we took as high praise from a three-year-old. The scale of the thing, the light coming through the coloured glass — even in high tourist season, crowded and noisy, it was impossible not to feel the weight of it.\n\nBarceloneta beach in the afternoon heat, Leila running at the waves and retreating shrieking every time one came close. Ana and I taking turns with her, drinking bad coffee from a beach kiosk, watching the city haze in the distance. Three weeks from Oulu and we were at the Mediterranean. It felt improbable and completely right.`,
    latitude: 41.3851, longitude: 2.1734,
    locations: makeStops('week-7-barcelona'),
    published_at: '2022-08-15T08:00:00.000Z',
    updatedAt: '2022-08-15T08:00:00.000Z', createdAt: '2022-08-15T08:00:00.000Z',
  },
  {
    id: 8, status: 'published', title: 'Málaga — We Made It', slug: 'week-8-malaga', type: 'story',
    excerpt: 'The Costa del Sol is not what the Finnish newspapers would have you believe. Yes, there are British pubs and sunburnt tourists. There is also Málaga — genuinely, stubbornly itself — and the sea in the evenings turned a colour we had no name for.',
    body: `We parked up in a campsite east of Málaga on a Thursday evening and the three of us walked to the beach without saying much. The Mediterranean in August is a very specific temperature — warm enough to feel like relief, not cold enough to be refreshing. Leila went in up to her waist and declared it perfect.\n\nMálaga old town is underrated. The Picasso museum, the Alcazaba up on the hill, the tapas bars in the streets around the market that charge a third of what Barcelona charges for twice the quality. We stayed ten days in the end, because leaving felt wrong.\n\nThis blog exists because Ana thought we should write it down while we still remembered everything clearly. I think she was right. Leila is four now and already asks when we're going again.`,
    latitude: 36.7213, longitude: -4.4214,
    locations: makeStops('week-8-malaga'),
    published_at: '2022-08-22T08:00:00.000Z',
    updatedAt: '2022-08-22T08:00:00.000Z', createdAt: '2022-08-22T08:00:00.000Z',
  },
]
```

**Commit:** `git add src/lib/mock/ && git commit -m "feat: mock data — 8 weeks Finland to Málaga with GPS locations"`

---

### Task 5: API Layer

**Create `src/lib/api.ts`:**

```typescript
import { mockPosts } from '$lib/mock/posts'
import type { PayloadListResponse, RotrPost } from '$lib/types'

// Toggle to false when the real CMS is ready
const USE_MOCK = true

const CMS_URL =
  typeof import.meta !== 'undefined'
    ? (import.meta.env?.PUBLIC_CMS_URL ?? 'https://cms.jake-reddy.com')
    : 'https://cms.jake-reddy.com'

export async function fetchAllPosts(): Promise<RotrPost[]> {
  if (USE_MOCK) return mockPosts

  const url = `${CMS_URL}/api/rotr_posts?where[status][equals]=published&sort=published_at&depth=2&limit=100`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`CMS fetch failed: ${res.status}`)
  const data: PayloadListResponse<RotrPost> = await res.json()
  return data.docs
}

export async function fetchPost(slug: string): Promise<RotrPost | null> {
  if (USE_MOCK) return mockPosts.find((p) => p.slug === slug) ?? null

  const url = `${CMS_URL}/api/rotr_posts?where[slug][equals]=${encodeURIComponent(slug)}&depth=2&limit=1`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`CMS fetch failed: ${res.status}`)
  const data: PayloadListResponse<RotrPost> = await res.json()
  return data.docs[0] ?? null
}
```

**Commit:** `git add src/lib/api.ts && git commit -m "feat: API layer with USE_MOCK flag, typed for Payload REST"`

---

### Task 6: Nav + Footer + Layout Components

**Create `src/lib/components/layout/Nav.svelte`:**

```svelte
<script lang="ts">
  import { page } from '$app/stores'
</script>

<header class="fixed top-0 left-0 right-0 z-50 border-b border-rule bg-parchment/95 backdrop-blur-sm">
  <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 lg:px-12">
    <a href="/" style="font-family: var(--font-script); font-size: 1.25rem; font-weight: 600; color: #b45309; text-decoration: none;">
      Reddy on the Road
    </a>
    <div class="flex items-center gap-8">
      <a
        href="/"
        class="nav-link text-sm text-stone"
        style="font-family: var(--font-body); font-style: italic;"
        data-active={$page.url.pathname === '/'}
      >
        The Journey
      </a>
      <a
        href="/about"
        class="nav-link text-sm text-stone"
        style="font-family: var(--font-body); font-style: italic;"
        data-active={$page.url.pathname === '/about'}
      >
        About Us
      </a>
    </div>
  </nav>
</header>
```

**Create `src/lib/components/layout/Footer.svelte`:**

```svelte
<footer class="mt-24 border-t border-rule px-6 py-8 lg:px-12">
  <div class="mx-auto flex max-w-6xl items-center justify-between">
    <p class="text-sm text-stone" style="font-family: var(--font-body); font-style: italic;">
      Reddy on the Road &middot; 2022 &middot; A family road trip memoir
    </p>
    <p class="text-sm text-stone" style="font-family: var(--font-body);">
      &copy; 2022
    </p>
  </div>
</footer>
```

**Verify:** `npm run dev` → Nav and Footer appear correctly.

**Commit:** `git add src/lib/components/layout/ && git commit -m "feat: Nav and Footer components"`

---

### Task 7: About Page

**Create `src/routes/about/+page.svelte`:**

```svelte
<svelte:head>
  <title>About Us · Reddy on the Road</title>
</svelte:head>

<article class="mx-auto max-w-2xl px-6 py-20 lg:px-8">
  <div class="mb-2">
    <span class="week-label" style="font-family: var(--font-script)">About us</span>
  </div>
  <h1 class="mb-8 text-4xl font-bold leading-tight text-ink" style="font-family: var(--font-display); font-weight: 700">
    Jake, Ana &amp; Leila
  </h1>
  <div class="mb-6 h-[3px] w-12 rounded-full bg-amber"></div>

  <div class="prose-journal space-y-6">
    <p>
      In the summer of 2022, the three of us packed a 2012 Hymer motorhome and drove from Oulu,
      Finland to Málaga, Spain. Jake drove. Ana navigated and kept a paper journal. Leila, who
      was three years old, ate everything in sight and asked when we were getting there.
    </p>

    <h2>The motorhome</h2>
    <p>
      We called it the Hymer because we never got around to naming it properly. It was white,
      it had a double bed above the cab, and it smelled faintly of pine resin from the previous
      owners. The fridge worked. The heating worked. The step to the bathroom was exactly the
      right height to catch your shin in the dark. We became very fond of it.
    </p>

    <h2>The trip</h2>
    <p>
      Eight weeks, eight countries, somewhere between 6,000 and 7,000 kilometres. We weren't
      travelling fast — we stopped for two, three, four days wherever felt right. Stockholm
      for a week. Copenhagen. The Rhine Valley. Alsace. The Pyrenees crossing at Col du Perthus,
      which was less terrifying than everyone on the forums said. Barcelona. And finally Málaga,
      where we stayed ten days and talked seriously about not going home.
    </p>

    <h2>Why this blog</h2>
    <p>
      This is not a travel guide. We're not telling you where to go or what to see. This is a
      record of one particular summer — the way the light fell differently in each country, the
      campsite that was absolutely not what the website promised, the morning in Copenhagen when
      Leila ran toward the pigeons in the square and the pigeons ran toward her and for a moment
      no one was sure who was chasing who.
    </p>
    <p>
      Ana thought we should write it down. She was right. Leila is four now and already asks
      when we're going again.
    </p>
  </div>
</article>
```

**Commit:** `git add src/routes/about/ && git commit -m "feat: about page — family intro"`

---

### Task 8: Shared Components

**Create `src/lib/components/shared/MarkerIcon.svelte`:**

```svelte
<script lang="ts">
  import type { MarkerType } from '$lib/types'

  let { markerType, size = 20, color = 'currentColor' }: {
    markerType: MarkerType
    size?: number
    color?: string
  } = $props()
</script>

{#if markerType === 'camp'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M3 20 L12 4 L21 20 Z" />
    <path d="M9 20 L12 14 L15 20" />
  </svg>
{:else if markerType === 'city-stop'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
    <circle cx="12" cy="12" r="5" />
  </svg>
{:else if markerType === 'viewpoint'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M1 20 L8 8 L12 14 L16 8 L23 20 Z" />
  </svg>
{:else if markerType === 'beach'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M2 12 C5 9 8 15 11 12 S17 9 20 12 S23 15 22 12" />
    <path d="M2 17 C5 14 8 20 11 17 S17 14 20 17" />
  </svg>
{:else if markerType === 'parking'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 8 L9 16 M9 8 L13 8 C14.7 8 16 9.3 16 11 C16 12.7 14.7 14 13 14 L9 14" />
  </svg>
{:else if markerType === 'restaurant'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="3" y1="2" x2="3" y2="8" />
    <line x1="7" y1="2" x2="7" y2="8" />
    <line x1="5" y1="8" x2="5" y2="22" />
    <path d="M13 2 C13 2 17 4 17 8 C17 10 15 12 13 12 L13 22" />
  </svg>
{:else}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
{/if}
```

**Create `src/lib/components/shared/CoverImage.svelte`:**

```svelte
<script lang="ts">
  import type { Media } from '$lib/types'

  let { image, alt = '', class: className = '' }: {
    image?: Media
    alt?: string
    class?: string
  } = $props()
</script>

{#if image?.url}
  <img src={image.url} alt={image.alt ?? alt} class={className} />
{:else}
  <div class="flex items-center justify-center bg-paper {className}">
    <span style="font-family: var(--font-script); font-size: 4rem; color: #d6cfc0;">&#x2767;</span>
  </div>
{/if}
```

**Commit:** `git add src/lib/components/shared/ && git commit -m "feat: MarkerIcon and CoverImage shared components"`

---

### Task 9: Timeline Components

**Create `src/lib/components/timeline/WeekHeader.svelte`:**

```svelte
<script lang="ts">
  let { weekNumber, publishedAt }: {
    weekNumber: number
    publishedAt?: string
  } = $props()

  function formatWeekDate(iso?: string): string {
    if (!iso) return ''
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  }
</script>

<div class="mb-3 flex items-baseline gap-4">
  <span class="week-label" style="font-family: var(--font-script)">Week {weekNumber}</span>
  {#if publishedAt}
    <time class="text-sm text-stone" style="font-family: var(--font-body); font-style: italic;">
      {formatWeekDate(publishedAt)}
    </time>
  {/if}
</div>
```

**Create `src/lib/components/timeline/StopList.svelte`:**

```svelte
<script lang="ts">
  import type { RotrLocationStop } from '$lib/types'

  let { stops }: { stops?: RotrLocationStop[] } = $props()

  const country = stops?.[0]?.location?.country ?? ''
  const count = stops?.length ?? 0
</script>

{#if count > 0}
  <p class="mb-4 text-xs uppercase tracking-widest text-stone" style="font-family: var(--font-body)">
    {count} stop{count !== 1 ? 's' : ''}{country ? ` · ${country}` : ''}
  </p>
{/if}
```

**Create `src/lib/components/timeline/WeekSection.svelte`:**

```svelte
<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte'
  import type { RotrPost } from '$lib/types'
  import WeekHeader from './WeekHeader.svelte'
  import StopList from './StopList.svelte'

  let { post, weekNumber }: {
    post: RotrPost
    weekNumber: number
  } = $props()

  const dispatch = createEventDispatcher<{ intersect: { index: number } }>()

  let sectionEl: HTMLElement
  let observer: IntersectionObserver

  onMount(() => {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            dispatch('intersect', { index: weekNumber - 1 })
          }
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(sectionEl)
  })

  onDestroy(() => {
    observer?.disconnect()
  })
</script>

<section bind:this={sectionEl} class="border-l-[3px] border-amber pl-6 py-12" id="week-{weekNumber}">
  <WeekHeader {weekNumber} publishedAt={post.published_at} />

  <h2 class="mb-3 text-2xl font-bold leading-snug text-ink" style="font-family: var(--font-display); font-weight: 700">
    {post.title}
  </h2>

  <StopList stops={post.locations} />

  {#if post.excerpt}
    <p class="mb-5 leading-relaxed text-ink/80" style="font-family: var(--font-body)">
      {post.excerpt}
    </p>
  {/if}

  <a href="/week/{post.slug}" class="inline-flex items-center gap-2 text-sm font-semibold text-amber" style="font-family: var(--font-body)">
    Read this week <span class="cta-arrow" aria-hidden="true">&rarr;</span>
  </a>
</section>

<hr class="my-2 border-rule" />
```

**Commit:** `git add src/lib/components/timeline/ && git commit -m "feat: timeline components — WeekHeader, StopList, WeekSection with IntersectionObserver"`

---

### Task 10: Home Page

**Create `src/routes/+page.ts`:**

```typescript
import type { PageLoad } from './$types'
import { fetchAllPosts } from '$lib/api'

export const load: PageLoad = async () => {
  const posts = await fetchAllPosts()
  return { posts }
}
```

**Replace `src/routes/+page.svelte`** (remove the stub, write this):

```svelte
<script lang="ts">
  import { browser } from '$app/environment'
  import type { PageData } from './$types'
  import WeekSection from '$lib/components/timeline/WeekSection.svelte'

  let { data }: { data: PageData } = $props()

  let activeWeek = $state(0)

  function handleIntersect(event: CustomEvent<{ index: number }>) {
    activeWeek = event.detail.index
  }
</script>

<svelte:head>
  <title>Reddy on the Road — Finland to Spain, 2022</title>
  <meta name="description" content="A family road trip memoir. Finland to Spain in a motorhome, 2022." />
</svelte:head>

<div class="mx-auto max-w-6xl px-6 lg:grid lg:grid-cols-[3fr_2fr] lg:gap-0 lg:px-0">

  <!-- Left: scrollable timeline -->
  <div class="timeline-column py-20 lg:px-12">
    <header class="mb-16">
      <div class="mb-2">
        <span class="week-label text-2xl" style="font-family: var(--font-script)">A family road trip</span>
      </div>
      <h1 class="mb-4 text-5xl font-black leading-none text-ink" style="font-family: var(--font-display); font-weight: 900">
        Reddy on<br />the Road
      </h1>
      <div class="mb-6 h-[3px] w-16 rounded-full bg-amber"></div>
      <p class="max-w-sm text-stone" style="font-family: var(--font-body)">
        Finland to Spain, summer 2022. Jake, Ana &amp; Leila. One motorhome.
        Eight weeks. Eight countries.
      </p>
    </header>

    {#each data.posts as post, i (post.id)}
      <WeekSection {post} weekNumber={i + 1} on:intersect={handleIntersect} />
    {/each}
  </div>

  <!-- Right: sticky Mapbox map (desktop only) -->
  <div class="map-column hidden lg:block">
    <div class="sticky top-0 h-screen border-l border-rule">
      {#if browser}
        {#await import('$lib/components/map/JourneyMap.svelte') then { default: JourneyMap }}
          <svelte:component this={JourneyMap} posts={data.posts} activeWeekIndex={activeWeek} />
        {/await}
      {/if}
    </div>
  </div>

</div>
```

**Verify:** `npm run dev` → 8 weeks scroll timeline visible, parchment background, amber left borders, correct fonts.

**Commit:** `git add src/routes/+page.ts src/routes/+page.svelte && git commit -m "feat: home page — scroll timeline, 8 weeks, IntersectionObserver wired"`

---

### Task 11: Post Components

**Create `src/lib/components/post/PostHero.svelte`:**

```svelte
<script lang="ts">
  import type { RotrPost } from '$lib/types'
  import CoverImage from '$lib/components/shared/CoverImage.svelte'

  let { post, weekNumber }: { post: RotrPost; weekNumber: number } = $props()
</script>

<figure class="relative h-[55vh] min-h-64 w-full overflow-hidden bg-paper">
  <CoverImage image={post.cover_image} alt={post.title} class="h-full w-full object-cover" />
  <div class="absolute bottom-0 left-0 bg-parchment/90 px-6 py-4">
    <span class="week-label text-xl" style="font-family: var(--font-script)">Week {weekNumber}</span>
    {#if post.locations?.[0]?.location?.country}
      <p class="text-sm text-stone" style="font-family: var(--font-body); font-style: italic;">
        {post.locations[0].location.country}
      </p>
    {/if}
  </div>
</figure>
```

**Create `src/lib/components/post/PostMeta.svelte`:**

```svelte
<script lang="ts">
  import type { RotrPost } from '$lib/types'

  let { post }: { post: RotrPost } = $props()

  function formatDate(iso?: string) {
    if (!iso) return ''
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  }
</script>

<div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone" style="font-family: var(--font-body); font-style: italic;">
  {#if post.author?.name}<span>{post.author.name}</span><span aria-hidden="true">&middot;</span>{/if}
  {#if post.published_at}<time datetime={post.published_at}>{formatDate(post.published_at)}</time>{/if}
  {#if post.type}<span aria-hidden="true">&middot;</span><span>{post.type}</span>{/if}
</div>
```

**Create `src/lib/components/post/PostBody.svelte`:**

```svelte
<script lang="ts">
  let { body }: { body?: string } = $props()
</script>

{#if body}
  <div class="prose-journal">
    {#each body.split('\n\n') as paragraph}
      {#if paragraph.trim()}
        <p>{paragraph.trim()}</p>
      {/if}
    {/each}
  </div>
{/if}
```

**Create `src/lib/components/post/StopCard.svelte`:**

```svelte
<script lang="ts">
  import type { RotrLocationStop } from '$lib/types'
  import MarkerIcon from '$lib/components/shared/MarkerIcon.svelte'

  let { stop }: { stop: RotrLocationStop } = $props()
  const loc = stop.location
</script>

<div class="border border-rule bg-paper p-3">
  <div class="mb-1 flex items-center gap-2">
    <span class="text-amber"><MarkerIcon markerType={loc.marker_type} size={16} color="#b45309" /></span>
    <span class="text-sm font-semibold text-ink" style="font-family: var(--font-body)">{loc.name}</span>
  </div>
  <p class="text-xs text-stone" style="font-family: var(--font-script)">{loc.marker_type}</p>
  {#if stop.visit_date}
    <p class="mt-1 text-xs text-stone" style="font-family: var(--font-body); font-style: italic;">
      {new Date(stop.visit_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
    </p>
  {/if}
</div>
```

**Create `src/lib/components/post/LocationStops.svelte`:**

```svelte
<script lang="ts">
  import type { RotrLocationStop } from '$lib/types'
  import StopCard from './StopCard.svelte'

  let { stops }: { stops?: RotrLocationStop[] } = $props()
</script>

{#if stops && stops.length > 0}
  <section class="mt-12 border-t border-rule pt-10">
    <h2 class="mb-6 text-lg font-bold text-ink" style="font-family: var(--font-display)">Stops this week</h2>
    <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {#each stops as stop (stop.id ?? stop.location.id)}
        <StopCard {stop} />
      {/each}
    </div>
  </section>
{/if}
```

**Commit:** `git add src/lib/components/post/ && git commit -m "feat: post components — PostHero, PostMeta, PostBody, LocationStops, StopCard"`

---

### Task 12: Week Post Page

**Create `src/routes/week/[slug]/+page.ts`:**

```typescript
import type { PageLoad } from './$types'
import { fetchPost, fetchAllPosts } from '$lib/api'
import { error } from '@sveltejs/kit'

export const load: PageLoad = async ({ params }) => {
  const [post, allPosts] = await Promise.all([fetchPost(params.slug), fetchAllPosts()])
  if (!post) throw error(404, `Week "${params.slug}" not found`)

  const currentIndex = allPosts.findIndex((p) => p.slug === params.slug)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  return { post, prevPost, nextPost, weekNumber: currentIndex + 1 }
}
```

**Create `src/routes/week/[slug]/+page.svelte`:**

```svelte
<script lang="ts">
  import type { PageData } from './$types'
  import PostHero from '$lib/components/post/PostHero.svelte'
  import PostMeta from '$lib/components/post/PostMeta.svelte'
  import PostBody from '$lib/components/post/PostBody.svelte'
  import LocationStops from '$lib/components/post/LocationStops.svelte'

  let { data }: { data: PageData } = $props()
  const { post, prevPost, nextPost, weekNumber } = data
</script>

<svelte:head>
  <title>{post.title} · Reddy on the Road</title>
  {#if post.excerpt}<meta name="description" content={post.excerpt} />{/if}
</svelte:head>

<PostHero {post} {weekNumber} />

<article class="mx-auto max-w-2xl px-6 py-12 lg:px-8">
  <a href="/" class="mb-8 inline-flex items-center gap-2 text-sm text-stone hover:text-amber" style="font-family: var(--font-body); font-style: italic;">
    <span aria-hidden="true">&larr;</span> Back to the journey
  </a>

  <div class="mb-2 mt-8">
    <span class="week-label" style="font-family: var(--font-script)">Week {weekNumber}</span>
  </div>
  <h1 class="mb-4 text-4xl font-bold leading-tight text-ink" style="font-family: var(--font-display); font-weight: 700">
    {post.title}
  </h1>
  <div class="mb-6 h-[3px] w-12 rounded-full bg-amber"></div>

  <PostMeta {post} />

  <div class="mt-8"><PostBody body={post.body} /></div>

  <LocationStops stops={post.locations} />

  <nav class="mt-16 flex justify-between border-t border-rule pt-8" aria-label="Weekly navigation">
    {#if prevPost}
      <a href="/week/{prevPost.slug}" class="group flex flex-col text-sm" style="font-family: var(--font-body)">
        <span class="text-xs uppercase tracking-widest text-stone">Previous week</span>
        <span class="mt-1 font-semibold text-ink group-hover:text-amber">{prevPost.title}</span>
      </a>
    {:else}<div></div>{/if}
    {#if nextPost}
      <a href="/week/{nextPost.slug}" class="group flex flex-col text-right text-sm" style="font-family: var(--font-body)">
        <span class="text-xs uppercase tracking-widest text-stone">Next week</span>
        <span class="mt-1 font-semibold text-ink group-hover:text-amber">{nextPost.title}</span>
      </a>
    {/if}
  </nav>
</article>
```

**Verify:** Navigate to http://localhost:5173/week/week-1-oulu — hero, title, body paragraphs, stop cards, prev/next nav all render. Click through all 8 weeks.

**Commit:** `git add src/routes/week/ && git commit -m "feat: week post page — hero, narrative, stops, prev/next nav"`

---

### Task 13: Mapbox GL JS Integration

**IMPORTANT — SSR Safety:** Mapbox GL JS requires `window` and WebGL. It CANNOT run in Node.js SSR. Use dynamic `import()` inside `onMount` only. The home page already wraps `JourneyMap` in `{#if browser}` and `{#await import(...)}` — this is correct.

**Create `src/lib/map/config.ts`:**

```typescript
export const MAPBOX_STYLE = 'mapbox://styles/mapbox/light-v11'

export const INITIAL_BOUNDS: [[number, number], [number, number]] = [
  [-10, 35],
  [32, 67],
]

export const ROUTE_COLOR = '#b45309'
export const ROUTE_COLOR_MUTED = '#d6cfc0'
```

**Create `src/lib/components/map/JourneyMap.svelte`:**

```svelte
<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import type { RotrPost } from '$lib/types'
  import { MAPBOX_STYLE, INITIAL_BOUNDS, ROUTE_COLOR, ROUTE_COLOR_MUTED } from '$lib/map/config'
  import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public'

  let { posts, activeWeekIndex }: {
    posts: RotrPost[]
    activeWeekIndex: number
  } = $props()

  let mapContainer: HTMLDivElement
  let mapInstance: import('mapbox-gl').Map | null = null
  let mapboxgl: typeof import('mapbox-gl') | null = null
  let markers: import('mapbox-gl').Marker[] = []

  const routeCoords = posts
    .filter((p) => p.latitude != null && p.longitude != null)
    .map((p) => [p.longitude!, p.latitude!] as [number, number])

  function prefersReducedMotion() {
    return typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  }

  function clearMarkers() {
    for (const m of markers) m.remove()
    markers = []
  }

  function addMarkersForWeek(weekIndex: number) {
    if (!mapInstance || !mapboxgl) return
    clearMarkers()
    const post = posts[weekIndex]
    if (!post?.locations) return

    for (const stop of post.locations) {
      const loc = stop.location
      if (!loc?.latitude || !loc?.longitude) continue

      const el = document.createElement('div')
      el.style.cssText = 'width:10px;height:10px;background:#b45309;border:2px solid #fdf6e3;border-radius:50%;box-shadow:0 1px 3px rgba(0,0,0,0.2);'
      el.setAttribute('title', loc.name)

      markers.push(
        new mapboxgl!.Marker({ element: el })
          .setLngLat([loc.longitude, loc.latitude])
          .addTo(mapInstance!)
      )
    }
  }

  function updateActiveSegment(weekIndex: number) {
    if (!mapInstance?.isStyleLoaded()) return
    const activeCoords = routeCoords.slice(Math.max(0, weekIndex - 1), weekIndex + 1)
    if (activeCoords.length < 2) return
    const source = mapInstance.getSource('route-active') as import('mapbox-gl').GeoJSONSource | undefined
    source?.setData({ type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: activeCoords } })
  }

  function flyToWeek(weekIndex: number) {
    if (!mapInstance) return
    const post = posts[weekIndex]
    if (!post?.latitude || !post?.longitude) return
    const method = prefersReducedMotion() ? 'jumpTo' : 'flyTo'
    mapInstance[method]({ center: [post.longitude, post.latitude], zoom: 6, duration: 1200 })
  }

  $effect(() => {
    if (!mapInstance || !mapboxgl) return
    flyToWeek(activeWeekIndex)
    addMarkersForWeek(activeWeekIndex)
    updateActiveSegment(activeWeekIndex)
  })

  onMount(async () => {
    const module = await import('mapbox-gl')
    mapboxgl = module.default
    mapboxgl.accessToken = PUBLIC_MAPBOX_TOKEN

    mapInstance = new mapboxgl.Map({
      container: mapContainer,
      style: MAPBOX_STYLE,
      bounds: INITIAL_BOUNDS,
      fitBoundsOptions: { padding: 40 },
    })

    await new Promise<void>((resolve) => mapInstance!.on('load', resolve))

    mapInstance.addSource('route-full', {
      type: 'geojson',
      data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: routeCoords } },
    })
    mapInstance.addLayer({
      id: 'route-full', type: 'line', source: 'route-full',
      paint: { 'line-color': ROUTE_COLOR_MUTED, 'line-width': 2, 'line-opacity': 0.6 },
    })

    mapInstance.addSource('route-active', {
      type: 'geojson',
      data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: routeCoords.slice(0, 2) } },
    })
    mapInstance.addLayer({
      id: 'route-active', type: 'line', source: 'route-active',
      paint: { 'line-color': ROUTE_COLOR, 'line-width': 4, 'line-opacity': 1 },
    })

    addMarkersForWeek(0)
  })

  onDestroy(() => {
    clearMarkers()
    mapInstance?.remove()
    mapInstance = null
  })
</script>

<svelte:head>
  <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.css" />
</svelte:head>

<div
  bind:this={mapContainer}
  class="h-full w-full"
  aria-label="Interactive route map showing the journey from Finland to Spain"
  role="img"
></div>
```

**Required:** Create `.env.local` with your real Mapbox public token:

```
PUBLIC_MAPBOX_TOKEN=pk.eyJ1...your_actual_token
PUBLIC_CMS_URL=https://cms.jake-reddy.com
```

Get a Mapbox token at https://account.mapbox.com — it's free, public tokens are safe to use in the browser.

**Verify (desktop-width window ≥1024px):**
- Map appears in right column, full height
- Europe route visible from Finland to Spain
- Scroll through weeks — map flies to each country
- Amber dots appear for current week's stops

**Commit:** `git add src/lib/map/ src/lib/components/map/ && git commit -m "feat: Mapbox GL JS — scroll-driven flyTo, route line, stop markers"`

---

### Task 14: Docker + docker-compose

**Create `Dockerfile`:**

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev
EXPOSE 3003
CMD ["node", "build"]
```

**Create `.dockerignore`:**

```
node_modules
.svelte-kit
build
.env
.env.local
.env.*
!.env.example
*.md
.git
.gitignore
```

**Add service to `c:\Repositories\droplet-stack\droplet-compose\docker-compose.yml`:**

Locate the services block and add alongside existing services:

```yaml
  reddyontheroad:
    image: ghcr.io/${GITHUB_OWNER}/reddyontheroad.com:latest
    container_name: reddyontheroad
    restart: unless-stopped
    env_file: .env
    environment:
      PORT: "3003"
      PUBLIC_MAPBOX_TOKEN: ${MAPBOX_TOKEN}
      PUBLIC_CMS_URL: https://cms.jake-reddy.com
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.reddyontheroad.rule=Host(`reddyontheroad.com`)"
      - "traefik.http.routers.reddyontheroad.entrypoints=websecure"
      - "traefik.http.routers.reddyontheroad.tls.certresolver=le"
      - "traefik.http.services.reddyontheroad.loadbalancer.server.port=3003"
    networks:
      - traefik-public
```

Also add `MAPBOX_TOKEN=pk.your_token` to the droplet-compose `.env` file.

**Verify:**

```bash
npm run build
docker build -t rotr-test .
docker run -p 3003:3003 -e PORT=3003 -e PUBLIC_MAPBOX_TOKEN=pk.your_token rotr-test
```

Visit http://localhost:3003 — site should load.

**Commit (from reddyontheroad.com/):**

```bash
git add Dockerfile .dockerignore
git commit -m "feat: Dockerfile for adapter-node, port 3003"
```

**Commit (from droplet-compose/):**

```bash
git add docker-compose.yml
git commit -m "feat: add reddyontheroad.com service — Traefik routing, port 3003"
```

---

## Final Verification Checklist

- [ ] `npm run check` — zero TypeScript/Svelte errors
- [ ] `npm run build` — production build succeeds
- [ ] http://localhost:5173 — home page loads, parchment bg, 8 weeks listed
- [ ] http://localhost:5173 (desktop ≥1024px) — sticky map in right column
- [ ] Scroll through weeks → map flies to each country
- [ ] http://localhost:5173/week/week-1-oulu — PostHero placeholder, title, body, stops, prev/next
- [ ] http://localhost:5173/about — family bio renders
- [ ] Mobile (<1024px) — single column, no map
- [ ] Docker: `docker build` succeeds, `docker run -p 3003:3003` serves at :3003

---

## Design Rules (Do Not Violate)

- **No gradients** — not on images, not on backgrounds, not in text
- **No rounded-2xl card grids** — borders and subtle rounding only
- **No tag pills** — use plain comma-separated text or the Caveat font style
- **Color only in text, borders, and the route line** — section backgrounds stay parchment/paper
- **One amber CTA per section** — the "Read this week →" link
- **The 3px amber left border** on WeekSection is the editorial anchor — don't remove it
- **Amber = `#b45309`** (not orange, not yellow — specifically this amber)

## Color Quick Reference

| Token | Hex | Use |
|---|---|---|
| `--color-parchment` | `#fdf6e3` | Page background |
| `--color-ink` | `#1c1917` | Body text |
| `--color-amber` | `#b45309` | Accents, CTAs, week labels |
| `--color-sage` | `#4d7c0f` | Nature markers |
| `--color-stone` | `#78716c` | Meta/muted text |
| `--color-rule` | `#d6cfc0` | Borders, dividers |
| `--color-paper` | `#f5edda` | Card backgrounds |

## Font Quick Reference

| Font | Use |
|---|---|
| Playfair Display | H1/H2 headings, post titles |
| Lora | All body text, excerpts, nav links |
| Caveat | Week labels ("Week 3"), nav logo, captions |
