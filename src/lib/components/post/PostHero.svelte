<script lang="ts">
  import type { RotrPost, RotrLocation } from '$lib/types'
  import CoverImage from '$lib/components/shared/CoverImage.svelte'

  let { post, weekNumber }: { post: RotrPost; weekNumber: number } = $props()

  const firstLocation = post.locations?.[0]?.location
  const country = typeof firstLocation === 'object' ? firstLocation?.country : undefined
</script>

<figure class="relative h-[55vh] min-h-64 w-full overflow-hidden bg-paper">
  <CoverImage image={post.cover_image} alt={post.title} class="h-full w-full object-cover" />
  <div class="absolute bottom-0 left-0 bg-parchment/90 px-6 py-4">
    <span class="week-label text-xl" style="font-family: var(--font-script)">Week {weekNumber}</span>
    {#if country}
      <p class="text-sm text-stone" style="font-family: var(--font-body); font-style: italic;">
        {country}
      </p>
    {/if}
  </div>
</figure>
