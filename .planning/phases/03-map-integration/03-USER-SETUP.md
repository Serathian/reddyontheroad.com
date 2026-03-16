# Phase 3: User Setup Required

**Generated:** 2026-03-16
**Phase:** 03-map-integration
**Status:** Incomplete

Complete these items for map rendering to function. Claude automated everything possible; these items require human access to external dashboards/accounts.

## Environment Variables

| Status | Variable | Source | Add to |
|--------|----------|--------|--------|
| [ ] | `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` | Mapbox Dashboard → Access tokens | `.env.local` |

## Account Setup

- [ ] **Create Mapbox account** (if needed)
  - URL: https://account.mapbox.com/auth/signup/
  - Skip if: You already have a Mapbox account

## Dashboard Configuration

- [ ] **Create or copy a public access token**
  - Location: Mapbox Dashboard → Access tokens
  - Set to: Token with public scope suitable for client-side map rendering
  - Notes: Store only in `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` for this app

## Verification

After completing setup, verify with:

```bash
grep NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN .env.local
npm run build
```

Expected results:
- `.env.local` contains a non-empty `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`
- Build succeeds without map token configuration errors

---

**Once all items complete:** Mark status as "Complete" at top of file.
