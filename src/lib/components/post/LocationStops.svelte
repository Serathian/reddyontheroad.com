<script lang="ts">
  import type { RotrLocation } from '$lib/types'
  import StopCard from './StopCard.svelte'

  let { stops }: { stops?: { location: RotrLocation | number; visit_date?: string | null; id?: string | null }[] | null } = $props()
</script>

{#if stops && stops.length > 0}
  <section class="mt-12 border-t border-rule pt-10">
    <h2 class="mb-6 text-lg font-bold text-ink" style="font-family: var(--font-display)">Stops this week</h2>
    <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {#each stops as stop (stop.id ?? (typeof stop.location === 'object' ? stop.location.id : stop.location))}
        <StopCard {stop} />
      {/each}
    </div>
  </section>
{/if}
