---
phase: 02
slug: core-scroll
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-15
---

# Phase 02 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.1.0 with @testing-library/react 16.3.2 |
| **Config file** | `vitest.config.ts` (exists) |
| **Quick run command** | `npm test -- tests/components/Carousel.test.tsx -x` |
| **Full suite command** | `npm test` |
| **Estimated runtime** | ~5 seconds (quick), ~10 seconds (full) |

---

## Sampling Rate

- **After every task commit:** Run `npm test -- tests/components/Carousel.test.tsx -x`
- **After every plan wave:** Run `npm test`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 0 | (setup) | unit | `npm test -- tests/mocks/IntersectionObserver -x` | ❌ W0 | ⬜ pending |
| 02-01-02 | 01 | 0 | (setup) | unit | `npm test -- tests/components/Carousel.test.tsx -x` | ❌ W0 | ⬜ pending |
| 02-01-03 | 01 | 0 | (setup) | unit | `npm test -- tests/components/DayCard.test.tsx -x` | ❌ W0 | ⬜ pending |
| 02-02-01 | 02 | 1 | CAROUSEL-03 | unit | `npm test -- tests/components/DayCard.test.tsx -x` | ✅ W0 | ⬜ pending |
| 02-03-01 | 03 | 1 | CAROUSEL-01 | unit | `npm test -- tests/components/Carousel.test.tsx::scroll-navigation -x` | ✅ W0 | ⬜ pending |
| 02-03-02 | 03 | 1 | CAROUSEL-02 | unit | `npm test -- tests/components/Carousel.test.tsx::active-detection -x` | ✅ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/mocks/IntersectionObserver.ts` — Mock for JSDOM compatibility
- [ ] `tests/components/Carousel.test.tsx` — stubs for CAROUSEL-01, CAROUSEL-02
- [ ] `tests/components/DayCard.test.tsx` — stubs for CAROUSEL-03
- [ ] `tests/setup.ts` update — register global IntersectionObserver mock

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Keyboard navigation (arrow keys) | CAROUSEL-01 | Browser native scroll-snap keyboard interaction | 1. Tab to carousel 2. Press left/right arrows 3. Verify cards snap to center |
| Screen reader announces active day | CAROUSEL-02 | ARIA live region behavior with real AT | 1. Enable VoiceOver/NVDA 2. Navigate carousel 3. Verify active day announced |
| 60fps scroll performance | CAROUSEL-01 | Real browser rendering performance | 1. Open DevTools Performance 2. Scroll through 240 cards 3. Verify <10% JS execution |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
