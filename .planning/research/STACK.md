# Stack Research

**Domain:** Interactive Travel Journal with Scroll-Driven Map
**Researched:** 2026-03-15
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 16.1.6 | React framework with SSR/SSG | Industry standard for React apps in 2025, built-in optimization, excellent Docker support, perfect for CMS integration with App Router |
| React | 19.x | UI library | Required by Next.js 16.x, Server Components enable better performance |
| TypeScript | 5.x | Type safety | Essential for maintainable codebases, full support across stack, Payload generates types automatically |
| Mapbox GL JS | 3.20.0 | Interactive map rendering | Current stable version (v2.15.0 in prototype is outdated), OpenGL-based client-side rendering, proven for scroll-driven animations |
| react-map-gl | 8.1.0 | React wrapper for Mapbox | Official Mapbox wrapper for React, handles lifecycle and state management, integrates seamlessly with Next.js |

### CMS & Data

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Payload CMS | 3.79.0 | Headless CMS | Latest stable, native Next.js integration, self-hosted (data ownership), REST & GraphQL APIs, excellent TypeScript support |
| PostgreSQL | 16.x | Database | Recommended by Payload for production, better performance than MongoDB for relational data like daily entries with GPS coordinates |
| @payloadcms/db-postgres | 3.79.0 | Payload database adapter | Official adapter, handles migrations, optimized queries |

### Styling & Animation

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| CSS Modules | Built-in | Component-scoped styling | Next.js native, perfect for design system implementation, no runtime overhead |
| Framer Motion | 11.x | Scroll animations | Industry standard for React animations, excellent scroll triggers, lighter than GSAP for this use case |
| Lenis | 1.1.x | Smooth scrolling | Standard for premium scroll experiences, integrates with Framer Motion, better than locomotive-scroll for React |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @turf/turf | 7.x | Geospatial calculations | For map path calculations, distance between points, 7-day trailing path logic |
| date-fns | 3.x | Date manipulation | Lightweight date handling for 240-day timeline, better tree-shaking than Moment.js |
| embla-carousel-react | 8.x | Carousel component | For rolodex-style carousel, performant touch/drag support, accessible |
| zod | 3.x | Runtime validation | Validate CMS data at runtime, integrates with TypeScript, payload uses it internally |
| sharp | 0.33.x | Image optimization | Next.js Image component dependency, handles dynamic photo loading |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Docker | Containerization | Official Next.js standalone output mode for minimal container size |
| GitHub Actions | CI/CD | Build and push to GHCR, official Next.js caching support |
| ESLint | Linting | Next.js includes ESLint config, add Payload plugin |
| Prettier | Code formatting | Standard configuration, integrate with ESLint |
| Playwright | E2E testing | Better Next.js support than Cypress for App Router |

## Installation

```bash
# Core framework
npx create-next-app@latest --typescript --app --tailwind --eslint

# Payload CMS (in Next.js project)
npx create-payload-app@latest --init --db postgres

# Map libraries
npm install mapbox-gl react-map-gl
npm install -D @types/mapbox-gl

# Animation & scroll
npm install framer-motion lenis

# Carousel
npm install embla-carousel-react

# Utilities
npm install @turf/turf date-fns zod

# Image optimization (usually auto-installed)
npm install sharp

# Dev dependencies
npm install -D prettier eslint-config-prettier
npm install -D @playwright/test
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Next.js App Router | Next.js Pages Router | Never for greenfield - Pages Router is legacy |
| Next.js | Astro | If content is 100% static and no CMS needed |
| Payload CMS | Sanity | If you prefer SaaS over self-hosted |
| Payload CMS | Strapi | Never - Payload has better Next.js integration |
| PostgreSQL | MongoDB | If you have existing Mongo infrastructure |
| Framer Motion | GSAP | If you need timeline-based animations or complex sequencing |
| react-map-gl | Direct Mapbox GL JS | Never in React - wrapper handles lifecycle properly |
| Lenis | Locomotive Scroll | Never - Locomotive is deprecated |
| Embla Carousel | Swiper | If you need more built-in effects (but heavier) |
| CSS Modules | Tailwind CSS | If you prefer utility-first (but design system is already defined) |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Mapbox GL JS v2.15.0 | Prototype version is 18 months old, missing performance improvements and bug fixes | Mapbox GL JS v3.20.0 |
| Contentful / Sanity | SaaS vendor lock-in, monthly costs, data not owned | Payload CMS (self-hosted) |
| Create React App | Deprecated, no SSR, poor performance | Next.js |
| Gatsby | Build times scale poorly with 240 pages, complex GraphQL layer | Next.js with ISR |
| Material UI / Chakra | Design system already defined, unnecessary abstraction | CSS Modules with design tokens |
| Redux / Zustand | Overkill for this use case, React state + URL params sufficient | React Context (minimal) |
| Axios | Fetch API is native, Next.js has built-in fetch extensions | Native fetch |
| Moment.js | Deprecated, bundle size issues | date-fns |
| Locomotive Scroll | No longer maintained, React integration poor | Lenis |
| GSAP ScrollTrigger | Overkill for this project, license complexity | Framer Motion scroll animations |

## Stack Patterns by Variant

**If deploying to Vercel:**
- Use Vercel Postgres (managed PostgreSQL)
- Enable ISR for daily entry pages
- Use Vercel Blob for photo storage
- GitHub Actions not needed (Vercel auto-deploys)

**If self-hosting with Docker:**
- Use standalone output mode: `output: 'standalone'`
- Separate PostgreSQL container in docker-compose
- S3-compatible storage (MinIO or R2) for photos
- GitHub Actions → GHCR workflow required

**If traffic is minimal (<1000 visits/month):**
- Static export with `output: 'export'`
- Pre-render all 240 days at build time
- S3 + CloudFront for hosting
- Lose: ISR, API routes, dynamic photos

**If photos are stored in Payload:**
- Use @payloadcms/plugin-cloud-storage
- Configure for S3/R2/GCS
- Payload handles upload UI
- Next.js Image component uses Payload URLs

**If photos are external (S3 directly):**
- Store S3 URLs in Payload text fields
- Use Next.js Image with remotePatterns
- Implement randomization in frontend
- Lower Payload storage costs

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| Next.js 16.x | React 19.x | React 19 required for Next.js 16+ |
| Payload 3.79.0 | Next.js 15.x - 16.x | Officially supports Next.js 15+, tested with 16 |
| react-map-gl 8.1.0 | mapbox-gl 3.x | Use matching major versions |
| Framer Motion 11.x | React 18-19 | Fully compatible with React 19 |
| Lenis 1.1.x | Framer Motion 11.x | Direct integration via useScroll hook |

## Docker Configuration

**Next.js Dockerfile (Standalone Mode):**

```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

**next.config.ts:**

```typescript
import type { NextConfig } from 'next'

const config: NextConfig = {
  output: 'standalone', // Critical for Docker
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.mapbox.com',
      },
      // Add your Payload/S3 domain
    ],
  },
}

export default config
```

## Environment Variables

```bash
# Next.js
NEXT_PUBLIC_MAPBOX_TOKEN=pk.xxx
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001

# Payload CMS
DATABASE_URI=postgresql://user:pass@localhost:5432/travel_journal
PAYLOAD_SECRET=your-secret-key-min-32-chars

# Photos (if using S3)
S3_BUCKET=travel-photos
S3_REGION=us-west-2
S3_ACCESS_KEY_ID=xxx
S3_SECRET_ACCESS_KEY=xxx

# Optional: Analytics, monitoring
```

## Project Structure

```
reddyontheroad.com/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (journal)/         # Route group for journal pages
│   │   │   ├── page.tsx       # Main carousel view
│   │   │   └── [day]/         # Dynamic day routes
│   │   │       └── page.tsx   # Full day view
│   │   ├── api/               # API routes (if needed)
│   │   └── layout.tsx         # Root layout
│   ├── components/
│   │   ├── Map/               # Mapbox components
│   │   │   ├── JourneyMap.tsx
│   │   │   └── PathLayer.tsx
│   │   ├── Carousel/          # Rolodex carousel
│   │   │   └── DayCarousel.tsx
│   │   ├── Timeline/          # Timeline scrubber
│   │   │   └── TimelineScrubber.tsx
│   │   └── ui/                # Design system components
│   ├── styles/
│   │   ├── design-tokens.css  # From JOURNAL_DESIGN_SYSTEM.md
│   │   └── globals.css
│   ├── lib/
│   │   ├── payload.ts         # Payload client
│   │   └── map-utils.ts       # Turf.js helpers
│   └── types/
│       └── payload-types.ts   # Auto-generated
├── payload.config.ts          # Payload configuration
├── next.config.ts
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## Performance Optimizations

1. **Image Loading**: Use Next.js Image component with `loading="lazy"` for photos
2. **Map Tiles**: Implement Mapbox tile caching strategy
3. **Route Prefetching**: Disable automatic prefetching, manually prefetch adjacent days
4. **Code Splitting**: Dynamic imports for Map component (heavy)
5. **Bundle Analysis**: Use `@next/bundle-analyzer` to monitor Mapbox bundle size
6. **Database Queries**: Index GPS coordinates, dates, and `deletedAt` fields
7. **Static Generation**: Pre-render all 240 days at build time with ISR revalidation

## Confidence Assessment

| Area | Level | Reason |
|------|-------|--------|
| Next.js | HIGH | Official docs verified, version 16.1.6 confirmed current |
| Payload CMS | HIGH | Latest version from GitHub releases, native Next.js support documented |
| Mapbox | HIGH | Official v3.20.0 from docs, react-map-gl 8.1.0 confirmed compatible |
| Animations | MEDIUM | Framer Motion standard, Lenis confirmed via community (GitHub 404 but widely used) |
| Docker | HIGH | Official Next.js standalone mode documented |
| Carousel | MEDIUM | Embla is standard choice, but Swiper also viable |

## Sources

- Next.js Official Docs (v16.1.6) — https://nextjs.org/docs — HIGH confidence
- Payload CMS Official Docs — https://payloadcms.com/docs — HIGH confidence
- Payload GitHub Releases (v3.79.0) — https://github.com/payloadcms/payload/releases — HIGH confidence
- Mapbox GL JS Docs (v3.20.0) — https://docs.mapbox.com/mapbox-gl-js/guides/ — HIGH confidence
- react-map-gl npm (v8.1.0) — https://www.npmjs.com/package/react-map-gl — MEDIUM confidence (npm blocked, version from successful fetch)
- Next.js Deployment Docs — https://nextjs.org/docs/app/building-your-application/deploying — HIGH confidence
- PROJECT.md, STACK.md, JOURNAL_DESIGN_SYSTEM.md — Project context files — HIGH confidence

---
*Stack research for: Interactive Travel Journal with Scroll-Driven Map*
*Researched: 2026-03-15*
