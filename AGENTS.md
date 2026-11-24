# AGENTS.md — reddyontheroad.com

Operational guidelines and contracts for AI agents working in `reddyontheroad.com`.

---

## Technical Stack & Constraints

| Item | Details |
| :--- | :--- |
| Framework | Next.js 16 (App Router) + React 19 |
| Mapping Engine | MapLibre GL (`maplibre-gl`, `react-map-gl`) |
| Styling | CSS Modules + Custom Design System CSS Variables (`--cream`, `--burnt-orange`, `--olive-green`) |
| Local Port | `http://localhost:3001` |
| Production Container | `ghcr.io/Serathian/reddyontheroad.com:latest` |

---

## Agent Rules

1. **WIP Page Preservation**: The root route `/` must remain the static Work-in-Progress page until the overland journal architecture is fully ready to launch.
2. **Prototype Preservation**: All active UI/UX experiments and map journal logic live under `/journal` (`app/journal/page.tsx`). Do not discard prototype components.
3. **Standalone Output**: Keep `output: "standalone"` enabled in `next.config.ts`. The production Docker container requires `.next/standalone`.
4. **Git Cache Cleanliness**: Ensure `.next/` build output is never tracked by git.

---

## Agent skills

### Issue tracker

Issues are tracked centrally in GitHub Issues (`Serathian/website-stack` via `gh --repo Serathian/website-stack`). See `docs/agents/issue-tracker.md`.

### Triage labels

Uses the default five-role triage label vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context layout (`GLOSSARY.md` + `docs/adr/` at the repo root). See `docs/agents/domain.md`.

