<script lang="ts">
  import type { PageData } from './$types'
  import PostHero from '$lib/components/post/PostHero.svelte'
  import PostMeta from '$lib/components/post/PostMeta.svelte'
  import PostBody from '$lib/components/post/PostBody.svelte'
  import LocationStops from '$lib/components/post/LocationStops.svelte'

  let { data }: { data: PageData } = $props()
  const { post, prevPost, nextPost, weekNumber } = data
</script>

<svelte:head>
  <title>{post.title} · Reddy on the Road</title>
  {#if post.excerpt}<meta name="description" content={post.excerpt} />{/if}
</svelte:head>

<PostHero {post} {weekNumber} />

<article class="mx-auto max-w-2xl px-6 py-12 lg:px-8">
  <a href="/" class="mb-8 inline-flex items-center gap-2 text-sm text-stone hover:text-amber" style="font-family: var(--font-body); font-style: italic;">
    <span aria-hidden="true">&larr;</span> Back to the journey
  </a>

  <div class="mb-2 mt-8">
    <span class="week-label" style="font-family: var(--font-script)">Week {weekNumber}</span>
  </div>
  <h1 class="mb-4 text-4xl font-bold leading-tight text-ink" style="font-family: var(--font-display); font-weight: 700">
    {post.title}
  </h1>
  <div class="mb-6 h-[3px] w-12 rounded-full bg-amber"></div>

  <PostMeta {post} />

  <div class="mt-8"><PostBody body={post.body} /></div>

  <LocationStops stops={post.locations} />

  <nav class="mt-16 flex justify-between border-t border-rule pt-8" aria-label="Weekly navigation">
    {#if prevPost}
      <a href="/week/{prevPost.slug}" class="group flex flex-col text-sm" style="font-family: var(--font-body)">
        <span class="text-xs uppercase tracking-widest text-stone">Previous week</span>
        <span class="mt-1 font-semibold text-ink group-hover:text-amber">{prevPost.title}</span>
      </a>
    {:else}<div></div>{/if}
    {#if nextPost}
      <a href="/week/{nextPost.slug}" class="group flex flex-col text-right text-sm" style="font-family: var(--font-body)">
        <span class="text-xs uppercase tracking-widest text-stone">Next week</span>
        <span class="mt-1 font-semibold text-ink group-hover:text-amber">{nextPost.title}</span>
      </a>
    {/if}
  </nav>
</article>
