---
phase: 1
slug: foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-15
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 2.x + React Testing Library 16.x |
| **Config file** | `vitest.config.ts` (Wave 0 installs) |
| **Quick run command** | `npm test -- --run` |
| **Full suite command** | `npm test -- --run --coverage` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm test -- --run`
- **After every plan wave:** Run `npm test -- --run --coverage`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| TBD | TBD | 0 | FOUND-01 | unit | `npm test -- lib/validators.test.ts --run` | ❌ W0 | ⬜ pending |
| TBD | TBD | TBD | FOUND-01 | build | `npm run build` | ✅ | ⬜ pending |
| TBD | TBD | TBD | FOUND-02 | manual | Developer verification via `npm run dev` | N/A | ⬜ pending |
| TBD | TBD | 0 | FOUND-03 | component | `npm test -- components/SplitLayout.test.tsx --run` | ❌ W0 | ⬜ pending |
| TBD | TBD | TBD | FOUND-04 | manual | Visual font check in browser | N/A | ⬜ pending |
| TBD | TBD | 0 | FOUND-04 | unit | `npm test -- design-system.test.ts --run` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `vitest.config.ts` — Vitest configuration with React plugin, jsdom environment, tsconfig paths
- [ ] `tests/lib/validators.test.ts` — GPS coordinate validation unit tests (FOUND-01)
- [ ] `tests/components/SplitLayout.test.tsx` — Responsive layout component tests (FOUND-03)
- [ ] `tests/design-system.test.ts` — CSS custom properties validation (FOUND-04)
- [ ] `tests/setup.ts` — Test environment setup, global mocks if needed
- [ ] Framework install: `npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom vite-tsconfig-paths`

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Payload CMS data fetching returns typed entries | FOUND-02 | Async Server Components unsupported by Vitest (Next.js official limitation) | Start dev server (`npm run dev`), verify entries render with TypeScript types in browser console |
| Fonts load with next/font/google optimization | FOUND-04 | Font optimization handled by Next.js framework; requires visual validation | Load app in browser, inspect font families in DevTools, verify Caveat/Crimson Text/Courier Prime load correctly |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
