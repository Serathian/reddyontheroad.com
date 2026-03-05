<script lang="ts">
  import type { RotrLocation } from '$lib/types'
  import MarkerIcon from '$lib/components/shared/MarkerIcon.svelte'

  let { stop }: { stop: { location: RotrLocation | number; visit_date?: string | null; id?: string | null } } = $props()
  const loc = typeof stop.location === 'object' ? stop.location : undefined
</script>

{#if loc}
  <div class="border border-rule bg-paper p-3">
    <div class="mb-1 flex items-center gap-2">
      <span class="text-amber"><MarkerIcon markerType={loc.marker_type} size={16} color="#b45309" /></span>
      <span class="text-sm font-semibold text-ink" style="font-family: var(--font-body)">{loc.name}</span>
    </div>
    <p class="text-xs text-stone" style="font-family: var(--font-script)">{loc.marker_type}</p>
    {#if stop.visit_date}
      <p class="mt-1 text-xs text-stone" style="font-family: var(--font-body); font-style: italic;">
        {new Date(stop.visit_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
      </p>
    {/if}
  </div>
{/if}
