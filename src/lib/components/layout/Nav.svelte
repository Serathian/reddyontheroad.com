<script lang="ts">
  import { page } from '$app/state'
</script>

<header class="fixed top-0 left-0 right-0 z-50 border-b border-rule bg-parchment/95 backdrop-blur-sm">
  <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 lg:px-12">
    <a href="/" style="font-family: var(--font-script); font-size: 1.25rem; font-weight: 600; color: #b45309; text-decoration: none;">
      Reddy on the Road
    </a>
    <div class="flex items-center gap-8">
      <a
        href="/"
        class="nav-link text-sm text-stone"
        style="font-family: var(--font-body); font-style: italic;"
        data-active={page.url.pathname === '/'}
      >
        The Journey
      </a>
      <a
        href="/about"
        class="nav-link text-sm text-stone"
        style="font-family: var(--font-body); font-style: italic;"
        data-active={page.url.pathname === '/about'}
      >
        About Us
      </a>
    </div>
  </nav>
</header>
