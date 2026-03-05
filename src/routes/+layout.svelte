<script lang="ts">
  import '../app.css'
  import Nav from '$lib/components/layout/Nav.svelte'
  import Footer from '$lib/components/layout/Footer.svelte'

  import type { Snippet } from 'svelte'
  let { children }: { children: Snippet } = $props()
</script>

<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-amber focus:px-4 focus:py-2 focus:text-parchment focus:rounded"
>
  Skip to content
</a>

<Nav />
<main id="main-content" class="pt-14 min-h-screen">
  {@render children()}
</main>
<Footer />
