<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import type { RotrPost } from '$lib/types'
  import WeekHeader from './WeekHeader.svelte'
  import StopList from './StopList.svelte'

  let { post, weekNumber, onintersect }: {
    post: RotrPost
    weekNumber: number
    onintersect?: (index: number) => void
  } = $props()

  let sectionEl: HTMLElement
  let observer: IntersectionObserver

  onMount(() => {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            onintersect?.(weekNumber - 1)
          }
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(sectionEl)
  })

  onDestroy(() => {
    observer?.disconnect()
  })
</script>

<section bind:this={sectionEl} class="border-l-[3px] border-amber pl-6 py-12" id="week-{weekNumber}">
  <WeekHeader {weekNumber} publishedAt={post.published_at} />

  <h2 class="mb-3 text-2xl font-bold leading-snug text-ink" style="font-family: var(--font-display); font-weight: 700">
    {post.title}
  </h2>

  <StopList stops={post.locations} />

  {#if post.excerpt}
    <p class="mb-5 leading-relaxed text-ink/80" style="font-family: var(--font-body)">
      {post.excerpt}
    </p>
  {/if}

  <a href="/week/{post.slug}" class="inline-flex items-center gap-2 text-sm font-semibold text-amber" style="font-family: var(--font-body)">
    Read this week <span class="cta-arrow" aria-hidden="true">&rarr;</span>
  </a>
</section>

<hr class="my-2 border-rule" />
