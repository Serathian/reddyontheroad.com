# Phase 3: Map Integration - Research

**Researched:** 2026-03-16
**Domain:** Mapbox map synchronization in Next.js 16 (App Router) with React
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
### Camera motion feel
- Use balanced camera transition timing (roughly 1200-1600ms feel), not fast-snappy or cinematic-slow.
- Keep zoom mostly stable between day changes.
- For nearby coordinates, prefer subtle pan over dramatic fly animation.
- During rapid scrolling, coalesce updates to the latest visible day instead of animating every intermediate step.

### 7-day trail behavior
- Trail window is based on the last 7 entries, not strict calendar-day slicing.
- Older segments within the 7-entry window fade by opacity with age.
- Future path remains hidden (no ghost or dotted preview).
- On large day jumps, redraw immediately to the new 7-entry window instead of animating intermediate trail states.

### Current marker emphasis
- Current location marker uses slight size increase plus glow for emphasis.
- Past stops within the recent window stay visible but muted.
- Keep motorhome-themed marker style.
- Marker popups/details appear on click/tap only (not always-on labels).

### Map annotation density
- Keep map chrome minimal by default during browsing.
- Show location details on interaction only.
- Keep distance/context hints out of map by default (content pane remains primary for metadata).
- On mobile, use extra-minimal annotation density to avoid obscuring map content.

### Claude's Discretion
- Exact easing curve and final animation durations within the chosen balanced-motion feel.
- Exact zoom delta thresholds for deciding subtle pan vs fly.
- Exact opacity ramp values for trail aging.
- Exact glow color/intensity and marker shadow values within existing journal design tokens.

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| MAP-01 | Mapbox GL map displays current day's GPS location | Use `react-map-gl/mapbox` + `Marker`/GeoJSON point layer driven by active carousel entry |
| MAP-02 | Map camera animates smoothly between days as user navigates | Use `MapRef.flyTo/easeTo`, distance-based pan vs fly, `map.stop()` + coalesced updates |
| MAP-03 | 7-day trailing GPS path shows recent journey context | Use single GeoJSON `Source` + `Layer` with per-vertex age properties for opacity fade |
| MAP-04 | Current location marker with animation | Use emphasized marker component/CSS glow + reduced-motion fallback |
</phase_requirements>

## Summary

Phase 3 should implement map behavior with **react-map-gl + mapbox-gl** in a single persistent client component mounted in `SplitLayout`'s map pane. The standard pattern is: keep one map instance alive, drive camera transitions from carousel active-day changes, and update marker/trail data declaratively (React props) rather than re-creating map objects.

For smooth storytelling, use a hybrid camera strategy: `easeTo` (or short `flyTo`) for nearby moves, `flyTo` for larger jumps, keep zoom stable, and cancel in-flight animation with `map.stop()` before the next transition. During rapid scroll events, coalesce state updates so only the latest active day animates.

The 7-entry trail should be rendered from a rolling GeoJSON window (last 7 entries, no future path), with opacity by age. Keep annotation density minimal and click-driven. To stay under tile-request goals and avoid unnecessary Mapbox billing events, do not remount the map and avoid style reinitialization patterns.

**Primary recommendation:** Build a single `JourneyMap` client component using `react-map-gl@8.1.0` + `mapbox-gl@3.20.0`, controlled by carousel active-day state, with coalesced camera updates and a rolling GeoJSON trail source.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react-map-gl | 8.1.0 | React wrapper for Mapbox map, layers, markers, map ref APIs | Official vis.gl wrapper with React-safe bindings and `reuseMaps` |
| mapbox-gl | 3.20.0 | Rendering engine and camera/source/layer APIs | Official Mapbox GL JS runtime used by react-map-gl/mapbox |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Next.js | 16.1.6 (project) | App Router, client/server boundaries, env handling | Use client component for map + `NEXT_PUBLIC_` token exposure |
| Vitest | 4.1.0 (project) | Unit/component test runner in jsdom | Validate trail generation and sync logic with mocked map ref |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| react-map-gl + mapbox-gl | direct mapbox-gl imperative integration | More lifecycle/cleanup complexity; easier to break React sync |
| Mapbox GL JS | MapLibre GL JS | Removes Mapbox service coupling, but conflicts with MAPBOX token decision and style/service expectations |

**Installation:**
```bash
npm install react-map-gl mapbox-gl @types/mapbox-gl
```

## Architecture Patterns

### Recommended Project Structure
```text
app/
├── components/
│   ├── Map/
│   │   ├── JourneyMap.tsx          # Persistent map component ('use client')
│   │   ├── JourneyMap.module.css   # Marker glow/muted stop styles
│   │   ├── mapLayers.ts            # Layer definitions (trail/current/past)
│   │   └── mapData.ts              # 7-entry window + geojson builders
│   └── Carousel/
│       └── Carousel.tsx            # emits active day id/index
└── page.tsx                        # lifts active day state and passes to map
```

### Pattern 1: Persistent map instance + reactive overlays
**What:** Keep one map mounted; update camera and source data as props/state change.
**When to use:** Always in this phase (requirement: no flashing/re-mounting).
**Example:**
```typescript
// Source: https://visgl.github.io/react-map-gl/docs/api-reference/mapbox/map
<Map
  ref={mapRef}
  reuseMaps
  mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
  mapStyle="mapbox://styles/mapbox/streets-v12"
  initialViewState={{ longitude, latitude, zoom: 6 }}
>
  <Source id="trail" type="geojson" data={trailGeoJson}>
    <Layer {...trailLayer} />
  </Source>
  <Marker longitude={currentLng} latitude={currentLat} onClick={openPopup} />
</Map>
```

### Pattern 2: Coalesced camera updates from scroll-driven active day
**What:** Cancel old animation and animate only to newest target.
**When to use:** Active day changes quickly (rapid vertical scroll).
**Example:**
```typescript
// Source: https://docs.mapbox.com/mapbox-gl-js/api/map/#map#flyto
const map = mapRef.current;
if (!map) return;

map.stop();
const isNear = haversineMiles(prev, next) < PAN_THRESHOLD_MILES;
if (isNear) {
  map.easeTo({ center: [next.longitude, next.latitude], duration: 1200, essential: true });
} else {
  map.flyTo({ center: [next.longitude, next.latitude], zoom: stableZoom, duration: 1500, essential: true });
}
```

### Pattern 3: Rolling 7-entry trail as single GeoJSON source
**What:** Recompute last-7 window and call source update through React props/setData.
**When to use:** On each active index change.
**Example:**
```typescript
// Source: https://docs.mapbox.com/mapbox-gl-js/api/sources/#geojsonsource#setdata
const windowEntries = entries.slice(Math.max(0, activeIndex - 6), activeIndex + 1);
const trailGeoJson = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: windowEntries.map(e => [e.longitude, e.latitude])
    }
  }]
};
```

### Anti-Patterns to Avoid
- **Re-creating `Map` component on active day changes:** causes visual flash and extra initialization.
- **Animating every intermediate day during fast scroll:** creates camera backlog and motion noise.
- **Rebuilding style (`setStyle`) for simple visual updates:** heavy operation, increases load risk.
- **Using server-only env vars in client map component:** token becomes undefined unless `NEXT_PUBLIC_` prefixed.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Map rendering engine | Custom canvas/WebGL map | mapbox-gl | Tile management, projection, gestures, camera are solved already |
| React↔Map lifecycle bridge | Custom imperative wrapper | react-map-gl Map/MapRef | Prevents React state mismatch and cleanup bugs |
| Camera tween queue | Homegrown animation scheduler | `map.stop()` + `easeTo/flyTo` | Native camera API handles interruption and easing reliably |
| Route drawing primitives | Custom SVG overlay sync | GeoJSON `Source` + `Layer` | Map-native rendering stays aligned while panning/zooming |

**Key insight:** The risky complexity here is lifecycle synchronization (scroll state, camera state, map state), not drawing a line. Use native map primitives and keep orchestration minimal.

## Common Pitfalls

### Pitfall 1: Hidden re-mounts trigger map re-initialization
**What goes wrong:** Map flashes and can increase billable map-load events.
**Why it happens:** Conditional rendering/key changes recreate the `Map` object.
**How to avoid:** Keep map mounted in stable tree location; use `reuseMaps` where unmount/remount can occur.
**Warning signs:** `onLoad` firing repeatedly during normal day navigation.

### Pitfall 2: Rapid scroll causes camera animation queue lag
**What goes wrong:** Camera keeps flying to stale entries after user stops.
**Why it happens:** Every active-day change triggers a new animation.
**How to avoid:** Coalesce updates, cancel active animation (`map.stop()`), animate only latest target.
**Warning signs:** Camera movement continues after timeline settles.

### Pitfall 3: Token is not accessible in client bundle
**What goes wrong:** Blank map or auth errors in browser.
**Why it happens:** Using `MAPBOX_ACCESS_TOKEN` instead of `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` in client code.
**How to avoid:** Follow Next.js public env variable rules and validate token in startup guard.
**Warning signs:** 401/403 map requests and undefined token in client logs.

### Pitfall 4: Over-updating source/style causes unnecessary work
**What goes wrong:** Jank during scroll and more network churn than expected.
**Why it happens:** Recreating large style/data objects each render.
**How to avoid:** Memoize GeoJSON/layer config, update only when active index changes.
**Warning signs:** High render frequency and repeated source/style data events.

## Code Examples

Verified patterns from official sources:

### Map with ref + imperative camera control
```typescript
// Source: https://visgl.github.io/react-map-gl/docs/api-reference/mapbox/map
import Map, {type MapRef} from 'react-map-gl/mapbox';

const mapRef = useRef<MapRef>(null);

function goTo(coords: [number, number]) {
  mapRef.current?.stop();
  mapRef.current?.flyTo({ center: coords, duration: 1400, essential: true });
}
```

### GeoJSON source update (trail redraw)
```typescript
// Source: https://docs.mapbox.com/mapbox-gl-js/api/sources/#geojsonsource#setdata
const source = mapRef.current?.getMap().getSource('trail') as mapboxgl.GeoJSONSource | undefined;
if (source) source.setData(trailGeoJson);
```

### Click-only marker details
```typescript
// Source: https://visgl.github.io/react-map-gl/docs/api-reference/mapbox/marker
<Marker longitude={lng} latitude={lat} onClick={() => setPopupOpen(true)}>
  <button className={isCurrent ? styles.currentMarker : styles.pastMarker} aria-label="Current location" />
</Marker>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Re-mount map for tab/view toggles | Keep map instance, optionally `reuseMaps` | react-map-gl docs (current) | Prevents re-init churn and improves UX/cost |
| Imperative-only map wiring | React wrapper with safe `MapRef` methods | react-map-gl modern API | Better React lifecycle alignment |
| Tile-request-based billing assumptions | Map-load-based billing in modern Mapbox GL JS | Mapbox GL JS v2+ | Success metric should track both map loads and request volume separately |

**Deprecated/outdated:**
- “Mapbox costs are primarily tile-request driven for GL JS interactions”: outdated for GL JS v2+ map-load billing model (tile/network usage still matters for performance).

## Open Questions

1. **Where should active-day state live after map sync is introduced?**
   - What we know: Carousel currently owns `activeId` internally.
   - What's unclear: Whether to lift to `page.tsx` or expose callback from Carousel.
   - Recommendation: Lift active-day state to parent and pass as prop to both Carousel and JourneyMap.

2. **Final thresholds for pan vs fly and opacity ramp values**
   - What we know: User constrained "balanced" motion + 7-entry age fading.
   - What's unclear: Exact threshold/easing constants.
   - Recommendation: Define constants in `mapData.ts` and tune with visual QA in one pass.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.0 + Testing Library + jsdom |
| Config file | `vitest.config.ts` |
| Quick run command | `npm run test:run -- tests/components/JourneyMap.test.tsx` |
| Full suite command | `npm run test:run` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| MAP-01 | Current day marker renders at active entry coordinates | component | `npm run test:run -- tests/components/JourneyMap.test.tsx -t "renders current marker"` | ❌ Wave 0 |
| MAP-02 | Camera method called with smooth transition on day change; coalesces rapid updates | unit/component | `npm run test:run -- tests/components/JourneyMap.test.tsx -t "coalesces camera updates"` | ❌ Wave 0 |
| MAP-03 | Trail uses last 7 entries and fades older segments | unit | `npm run test:run -- tests/lib/mapData.test.ts -t "builds 7-entry trail"` | ❌ Wave 0 |
| MAP-04 | Current marker gets emphasized style; past markers muted | component | `npm run test:run -- tests/components/JourneyMap.test.tsx -t "emphasizes current marker"` | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** `npm run test:run -- tests/components/JourneyMap.test.tsx`
- **Per wave merge:** `npm run test:run`
- **Phase gate:** Full suite green before `/gsd-verify-work`

### Wave 0 Gaps
- [ ] `tests/components/JourneyMap.test.tsx` — covers MAP-01, MAP-02, MAP-04
- [ ] `tests/lib/mapData.test.ts` — covers MAP-03 trail-window + opacity mapping
- [ ] `tests/mocks/mapbox.ts` — reusable `MapRef`/`flyTo`/`easeTo` spies for deterministic camera tests

## Sources

### Primary (HIGH confidence)
- Context7 `/visgl/react-map-gl` — Map API, `reuseMaps`, MapRef methods, Source/Layer/Marker patterns
- Context7 `/mapbox/mapbox-gl-js` — `flyTo/easeTo/stop`, GeoJSON source `setData`, layer paint expressions
- https://visgl.github.io/react-map-gl/docs/api-reference/mapbox/map — authoritative `Map` props and `reuseMaps`
- https://visgl.github.io/react-map-gl/docs/get-started/tips-and-tricks — cost/remount guidance, marker performance notes
- https://docs.mapbox.com/mapbox-gl-js/api/map/ — camera methods/options
- https://docs.mapbox.com/mapbox-gl-js/api/sources/ — GeoJSON source API (`setData`)
- https://nextjs.org/docs/app/guides/environment-variables — `NEXT_PUBLIC_` client env requirements

### Secondary (MEDIUM confidence)
- https://docs.mapbox.com/help/glossary/map-loads/ — billing model explanation for map loads
- https://docs.mapbox.com/help/troubleshooting/mapbox-gl-js-performance/ — performance guidance (verified via official docs)

### Tertiary (LOW confidence)
- Community issue/forum discussions on tile request edge cases during animation (used only as cautionary context, not core guidance)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - official docs + current npm versions verified
- Architecture: HIGH - directly supported by react-map-gl and Mapbox APIs
- Pitfalls: MEDIUM-HIGH - mostly official docs; some operational warnings from community behavior

**Research date:** 2026-03-16
**Valid until:** 2026-04-15
