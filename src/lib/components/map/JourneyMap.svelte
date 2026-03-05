<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import type { RotrPost } from '$lib/types'
  import { MAPBOX_STYLE, INITIAL_BOUNDS, ROUTE_COLOR, ROUTE_COLOR_MUTED } from '$lib/map/config'
  import { PUBLIC_MAPBOX_TOKEN } from '$env/static/public'

  let { posts, activeWeekIndex }: {
    posts: RotrPost[]
    activeWeekIndex: number
  } = $props()

  let mapContainer: HTMLDivElement
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mapInstance: any = null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mapboxgl: any = null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let markers: any[] = []

  $effect.pre(() => {
    // Access posts to track dependency — routeCoords is derived from it
    void posts.length
  })

  function getRouteCoords() {
    return posts
      .filter((p) => p.latitude != null && p.longitude != null)
      .map((p) => [p.longitude!, p.latitude!] as [number, number])
  }

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
    if (!mapInstance || !mapboxgl) return
    clearMarkers()
    const post = posts[weekIndex]
    if (!post?.locations) return

    for (const stop of post.locations) {
      const loc = stop.location
      if (typeof loc !== 'object' || !loc?.latitude || !loc?.longitude) continue

      const el = document.createElement('div')
      el.style.cssText = 'width:10px;height:10px;background:#b45309;border:2px solid #fdf6e3;border-radius:50%;box-shadow:0 1px 3px rgba(0,0,0,0.2);'
      el.setAttribute('title', loc.name)

      markers.push(
        new mapboxgl.Marker({ element: el })
          .setLngLat([loc.longitude, loc.latitude])
          .addTo(mapInstance)
      )
    }
  }

  function updateActiveSegment(weekIndex: number) {
    if (!mapInstance?.isStyleLoaded()) return
    const routeCoords = getRouteCoords()
    const activeCoords = routeCoords.slice(Math.max(0, weekIndex - 1), weekIndex + 1)
    if (activeCoords.length < 2) return
    const source = mapInstance.getSource('route-active')
    source?.setData({ type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: activeCoords } })
  }

  function flyToWeek(weekIndex: number) {
    if (!mapInstance) return
    const post = posts[weekIndex]
    if (!post?.latitude || !post?.longitude) return
    const method = prefersReducedMotion() ? 'jumpTo' : 'flyTo'
    mapInstance[method]({ center: [post.longitude, post.latitude], zoom: 6, duration: 1200 })
  }

  $effect(() => {
    if (!mapInstance || !mapboxgl) return
    flyToWeek(activeWeekIndex)
    addMarkersForWeek(activeWeekIndex)
    updateActiveSegment(activeWeekIndex)
  })

  onMount(async () => {
    const module = await import('mapbox-gl')
    mapboxgl = module.default ?? module
    mapboxgl.accessToken = PUBLIC_MAPBOX_TOKEN

    mapInstance = new mapboxgl.Map({
      container: mapContainer,
      style: MAPBOX_STYLE,
      bounds: INITIAL_BOUNDS,
      fitBoundsOptions: { padding: 40 },
    })

    await new Promise<void>((resolve) => mapInstance.on('load', () => resolve()))

    const routeCoords = getRouteCoords()

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

<svelte:head>
  <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.css" />
</svelte:head>

<div
  bind:this={mapContainer}
  class="h-full w-full"
  aria-label="Interactive route map showing the journey from Finland to Spain"
  role="img"
></div>
