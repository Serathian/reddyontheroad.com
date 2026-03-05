<script lang="ts">
  import { browser } from '$app/environment'
  import type { PageData } from './$types'
  import WeekSection from '$lib/components/timeline/WeekSection.svelte'

  let { data }: { data: PageData } = $props()

  let activeWeek = $state(0)

  function handleIntersect(index: number) {
    activeWeek = index
  }
</script>

<svelte:head>
  <title>Reddy on the Road — Finland to Spain, 2022</title>
  <meta name="description" content="A family road trip memoir. Finland to Spain in a motorhome, 2022." />
</svelte:head>

<div class="mx-auto max-w-6xl px-6 lg:grid lg:grid-cols-[3fr_2fr] lg:gap-0 lg:px-0">

  <!-- Left: scrollable timeline -->
  <div class="timeline-column py-20 lg:px-12">
    <header class="mb-16">
      <div class="mb-2">
        <span class="week-label text-2xl" style="font-family: var(--font-script)">A family road trip</span>
      </div>
      <h1 class="mb-4 text-5xl font-black leading-none text-ink" style="font-family: var(--font-display); font-weight: 900">
        Reddy on<br />the Road
      </h1>
      <div class="mb-6 h-[3px] w-16 rounded-full bg-amber"></div>
      <p class="max-w-sm text-stone" style="font-family: var(--font-body)">
        Finland to Spain, summer 2022. Jake, Ana &amp; Leila. One motorhome.
        Eight weeks. Eight countries.
      </p>
    </header>

    {#each data.posts as post, i (post.id)}
      <WeekSection {post} weekNumber={i + 1} onintersect={handleIntersect} />
    {/each}
  </div>

  <!-- Right: sticky Mapbox map (desktop only) -->
  <div class="map-column hidden lg:block">
    <div class="sticky top-0 h-screen border-l border-rule">
      {#if browser}
        {#await import('$lib/components/map/JourneyMap.svelte') then { default: JourneyMap }}
          <JourneyMap posts={data.posts} activeWeekIndex={activeWeek} />
        {/await}
      {/if}
    </div>
  </div>

</div>
