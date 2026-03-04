<script lang="ts">
  import type { PageData } from './$types'
  import { formatDate } from '$lib/utils/formatDate'

  interface Props {
    data: PageData
  }
  let { data }: Props = $props()
</script>

<svelte:head>
  <title>Reddy on the Road</title>
  <meta name="description" content="Travel stories and adventures by Jake Reddy." />
</svelte:head>

<!-- Hero -->
<section class="max-w-5xl mx-auto px-6 py-20 text-center">
  <p class="font-handwritten text-2xl text-amber-700 mb-4">Welcome to</p>
  <h1 class="font-display text-6xl font-black leading-tight mb-6">
    Reddy on the Road
  </h1>
  <p class="font-body text-xl text-stone-600 max-w-xl mx-auto leading-relaxed">
    Travel stories, routes, and dispatches from the road. Slow travel, honest writing.
  </p>
  <div class="mt-8 flex gap-4 justify-center">
    <a
      href="/trips"
      class="bg-stone-950 text-amber-50 font-body font-semibold px-6 py-3 rounded-sm hover:bg-stone-800 transition-colors"
    >
      Read trips
    </a>
    <a
      href="/map"
      class="border border-stone-950 font-body font-semibold px-6 py-3 rounded-sm hover:bg-stone-100 transition-colors"
    >
      Explore the map
    </a>
  </div>
</section>

<!-- Latest posts -->
{#if data.posts.length > 0}
  <section class="max-w-5xl mx-auto px-6 pb-20">
    <h2 class="font-display text-3xl font-bold mb-8 border-b border-stone-200 pb-4">
      Latest stories
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each data.posts as post (post.id)}
        {@const coverUrl = typeof post.cover_image === 'object' && post.cover_image?.url
          ? post.cover_image.url
          : null}
        <a
          href="/trips/{post.slug}"
          class="group flex flex-col gap-3 hover:opacity-90 transition-opacity"
        >
          {#if coverUrl}
            <div class="aspect-[3/2] overflow-hidden rounded-sm bg-stone-200">
              <img
                src={coverUrl}
                alt={post.title}
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          {:else}
            <div class="aspect-[3/2] rounded-sm bg-stone-200 flex items-center justify-center">
              <span class="font-handwritten text-stone-400 text-lg">No photo yet</span>
            </div>
          {/if}

          {#if post.type}
            <span class="font-body text-xs font-semibold uppercase tracking-widest text-amber-700">
              {post.type}
            </span>
          {/if}

          <h3 class="font-display text-xl font-bold leading-snug group-hover:underline">
            {post.title}
          </h3>

          {#if post.excerpt}
            <p class="font-body text-sm text-stone-600 leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          {/if}

          {#if post.published_at}
            <p class="font-body text-xs text-stone-400 mt-auto">
              {formatDate(post.published_at)}
            </p>
          {/if}
        </a>
      {/each}
    </div>

    <div class="mt-12 text-center">
      <a
        href="/trips"
        class="font-body font-semibold text-sm underline underline-offset-4 hover:text-amber-700 transition-colors"
      >
        View all trips →
      </a>
    </div>
  </section>
{/if}
