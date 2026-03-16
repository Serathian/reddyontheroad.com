---
phase: 04
slug: rich-content
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-16
---

# Phase 04 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest 4.x + Testing Library |
| **Config file** | `vitest.config.ts` |
| **Quick run command** | `npm run test:run -- tests/components/TimelineScrubber.test.tsx` |
| **Full suite command** | `npm run test:run` |
| **Estimated runtime** | ~45 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run test:run -- tests/components/TimelineScrubber.test.tsx`
- **After every plan wave:** Run `npm run test:run`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 1 | CONTENT-01 | component | `npm run test:run -- tests/components/FullDayView.test.tsx` | ❌ W0 | ⬜ pending |
| 04-01-02 | 01 | 1 | CONTENT-02 | integration | `npm run test:run -- tests/components/RichContentShell.test.tsx` | ❌ W0 | ⬜ pending |
| 04-02-01 | 02 | 1 | CONTENT-03 | unit | `npm run test:run -- tests/lib/photoShuffle.test.ts` | ❌ W0 | ⬜ pending |
| 04-02-02 | 02 | 1 | CONTENT-04 | component+a11y | `npm run test:run -- tests/components/TimelineScrubber.test.tsx` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/components/FullDayView.test.tsx` — stubs for CONTENT-01
- [ ] `tests/components/RichContentShell.test.tsx` — stubs for CONTENT-02
- [ ] `tests/lib/photoShuffle.test.ts` — stubs for CONTENT-03
- [ ] `tests/components/TimelineScrubber.test.tsx` — stubs for CONTENT-04

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Visual crossfade quality and no perceived layout shift in full-day transition | CONTENT-02 | Motion/visual polish quality is subjective and browser/device dependent | Run app, open centered card, confirm map remains visible and transition feels quick without jank |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 60s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
