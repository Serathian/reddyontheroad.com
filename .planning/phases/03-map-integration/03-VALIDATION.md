---
phase: 03
slug: map-integration
status: draft
nyquist_compliant: true
wave_0_complete: false
created: 2026-03-16
---

# Phase 03 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.1.0 + Testing Library + jsdom |
| **Config file** | vitest.config.ts |
| **Quick run command** | `npm run test:run -- tests/lib/mapData.test.ts -t "builds 7-entry trail"` |
| **Full suite command** | `npm run test:run` |
| **Estimated runtime** | smoke: ~8-15s, full suite: ~45s |

---

## Sampling Rate

- **After every task commit (fast feedback):** Run `npm run test:run -- tests/lib/mapData.test.ts -t "builds 7-entry trail"` or the task-targeted single-test equivalent (`-t` filter).
- **After every plan wave:** Run `npm run test:run`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency (task-level):** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | MAP-01 | component | `npm run test:run -- tests/components/JourneyMap.test.tsx -t "renders current marker"` | ❌ W0 | ⬜ pending |
| 03-01-02 | 01 | 1 | MAP-02 | component | `npm run test:run -- tests/components/JourneyMap.test.tsx -t "coalesces camera updates"` | ❌ W0 | ⬜ pending |
| 03-02-01 | 02 | 1 | MAP-03 | unit | `npm run test:run -- tests/lib/mapData.test.ts -t "builds 7-entry trail"` | ❌ W0 | ⬜ pending |
| 03-02-02 | 02 | 1 | MAP-04 | component | `npm run test:run -- tests/components/JourneyMap.test.tsx -t "emphasizes current marker"` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/components/JourneyMap.test.tsx` — stubs for MAP-01, MAP-02, MAP-04
- [ ] `tests/lib/mapData.test.ts` — stubs for MAP-03
- [ ] `tests/mocks/mapbox.ts` — shared map ref and camera spies

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Camera transition feel is balanced (not too snappy/cinematic) | MAP-02 | Perceptual UX quality cannot be fully asserted via unit tests | Run app, scroll across day cards, confirm transitions feel ~1200-1600ms and nearby points pan subtly |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Task-level feedback latency <= 30s (longer runs reserved for wave/phase gates)
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
