<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import type { RotrPost } from '$lib/types'
  import { MAP_STYLE, INITIAL_BOUNDS, ROUTE_COLOR, ROUTE_COLOR_MUTED } from '$lib/map/config'
  import { getRouteCoords, locationToLngLat, getResolvedLocations } from '$lib/map/utils'
  import 'maplibre-gl/dist/maplibre-gl.css'
  import { Map, Marker, type LngLatBoundsLike } from 'maplibre-gl'

  let { posts, activeWeekIndex }: {
    posts: RotrPost[]
    activeWeekIndex: number
  } = $props()

  let mapContainer: HTMLDivElement
  let mapInstance: Map | null = null
  let markers: Marker[] = []

  $effect.pre(() => {
    void posts.length
  })

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
    if (!mapInstance) return
    clearMarkers()
    const post = posts[weekIndex]
    if (!post?.locations) return

    for (const loc of getResolvedLocations(post.locations)) {
      const el = document.createElement('div')
      el.style.cssText = 'width:10px;height:10px;background:#b45309;border:2px solid #fdf6e3;border-radius:50%;box-shadow:0 1px 3px rgba(0,0,0,0.2);'
      el.setAttribute('title', loc.name)

      markers.push(
        new Marker({ element: el })
          .setLngLat(locationToLngLat(loc))
          .addTo(mapInstance)
      )
    }
  }

  function updateActiveSegment(weekIndex: number) {
    if (!mapInstance?.isStyleLoaded()) return
    const routeCoords = getRouteCoords(posts)
    const activeCoords = routeCoords.slice(Math.max(0, weekIndex - 1), weekIndex + 1)
    if (activeCoords.length < 2) return
    const source = mapInstance.getSource('route-active')
    if (source && 'setData' in source) {
      (source as any).setData({ type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: activeCoords } })
    }
  }

  function flyToWeek(weekIndex: number) {
    if (!mapInstance) return
    const post = posts[weekIndex]
    if (post?.latitude == null || post?.longitude == null) return
    if (prefersReducedMotion()) {
      mapInstance.jumpTo({ center: [post.longitude, post.latitude], zoom: 6 })
    } else {
      mapInstance.flyTo({ center: [post.longitude, post.latitude], zoom: 6, duration: 1200 })
    }
  }

  $effect(() => {
    if (!mapInstance) return
    flyToWeek(activeWeekIndex)
    addMarkersForWeek(activeWeekIndex)
    updateActiveSegment(activeWeekIndex)
  })

  onMount(async () => {
    mapInstance = new Map({
      container: mapContainer,
      style: MAP_STYLE,
      bounds: INITIAL_BOUNDS as LngLatBoundsLike,
      fitBoundsOptions: { padding: 40 },
    })

    await new Promise<void>((resolve) => mapInstance!.on('load', () => resolve()))

    const routeCoords = getRouteCoords(posts)

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

<div
  bind:this={mapContainer}
  class="h-full w-full"
  aria-label="Interactive route map showing the journey from Finland to Spain"
  role="img"
></div>
