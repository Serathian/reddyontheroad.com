<script lang="ts">
  import type { MarkerType } from '$lib/types'

  let { markerType, size = 20, color = 'currentColor' }: {
    markerType: MarkerType
    size?: number
    color?: string
  } = $props()
</script>

{#if markerType === 'camp'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M3 20 L12 4 L21 20 Z" />
    <path d="M9 20 L12 14 L15 20" />
  </svg>
{:else if markerType === 'city-stop'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true">
    <circle cx="12" cy="12" r="5" />
  </svg>
{:else if markerType === 'viewpoint'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M1 20 L8 8 L12 14 L16 8 L23 20 Z" />
  </svg>
{:else if markerType === 'beach'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M2 12 C5 9 8 15 11 12 S17 9 20 12 S23 15 22 12" />
    <path d="M2 17 C5 14 8 20 11 17 S17 14 20 17" />
  </svg>
{:else if markerType === 'parking'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 8 L9 16 M9 8 L13 8 C14.7 8 16 9.3 16 11 C16 12.7 14.7 14 13 14 L9 14" />
  </svg>
{:else if markerType === 'restaurant'}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="3" y1="2" x2="3" y2="8" />
    <line x1="7" y1="2" x2="7" y2="8" />
    <line x1="5" y1="8" x2="5" y2="22" />
    <path d="M13 2 C13 2 17 4 17 8 C17 10 15 12 13 12 L13 22" />
  </svg>
{:else}
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
{/if}
