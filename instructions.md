# Reddy on the Road — Agent Instructions

`reddyontheroad.com` is an overland travel scrapbook and journal app built with **Next.js 16, React 19, and MapLibre GL**.

---

## 1. Current State & Routing

* **Root (`/`)**: Serves an on-brand, static **Work in Progress (WIP)** landing page (`app/page.tsx` with `app/wip.module.css`).
* **Prototype (`/journal`)**: Houses the full interactive travel scrapbook prototype (`app/journal/page.tsx`), featuring:
  * Split layout with interactive MapLibre GL route tracking.
  * Daily travel card carousel with photo collages and journal notes.
  * Timeline scrubber and daily stat overlays.

---

## 2. Docker & Production Deployment

* **Next.js Standalone**: Configured with `output: "standalone"` in `next.config.ts`.
* **Webpack Build Flag**: Uses `next build --webpack` in `package.json` to ensure clean, reliable font and module resolution in container builds.
* **Production Container**: Built via multi-stage `Dockerfile` (Node 22-alpine), served by `node server.js` on port 3000 behind Traefik.
* **CI/CD**: Pushes to `main` trigger `.github/workflows/docker-publish.yml` to run lint, TypeScript checks, and Vitest tests before building `ghcr.io/Serathian/reddyontheroad.com:latest` and notifying Watchtower (pull requests to `main` run verification checks only).

---

## 3. Development Commands

```bash
# Start local dev server (port 3001)
npm run dev

# Run ESLint and TypeScript checks
npm run lint
npx tsc --noEmit

# Run Vitest unit tests
npm run test:run

# Build Next.js standalone bundle
npm run build
```
