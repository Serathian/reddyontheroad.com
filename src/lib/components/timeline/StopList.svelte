<script lang="ts">
  import type { RotrLocation } from '$lib/types'

  let { stops }: { stops?: { location: RotrLocation | number; visit_date?: string | null; id?: string | null }[] | null } = $props()

  const firstLocation = stops?.[0]?.location
  const country = typeof firstLocation === 'object' ? firstLocation?.country : ''
  const count = stops?.length ?? 0
</script>

{#if count > 0}
  <p class="mb-4 text-xs uppercase tracking-widest text-stone" style="font-family: var(--font-body)">
    {count} stop{count !== 1 ? 's' : ''}{country ? ` · ${country}` : ''}
  </p>
{/if}
