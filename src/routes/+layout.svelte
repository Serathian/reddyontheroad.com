<script lang="ts">
  import '../app.css'

  interface Props {
    children: import('svelte').Snippet
  }
  let { children }: Props = $props()
</script>

<div class="min-h-screen flex flex-col bg-amber-50 text-stone-950">
  <header class="border-b border-stone-200">
    <nav class="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
      <a href="/" class="font-display text-2xl font-black tracking-tight hover:opacity-80 transition-opacity">
        Reddy on the Road
      </a>
      <ul class="flex gap-6 font-body text-sm font-semibold tracking-wide uppercase">
        <li><a href="/" class="hover:text-amber-700 transition-colors">Home</a></li>
        <li><a href="/trips" class="hover:text-amber-700 transition-colors">Trips</a></li>
        <li><a href="/map" class="hover:text-amber-700 transition-colors">Map</a></li>
      </ul>
    </nav>
  </header>

  <main class="flex-1">
    {@render children()}
  </main>

  <footer class="border-t border-stone-200 mt-16">
    <div class="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between text-sm text-stone-500 font-body">
      <p class="font-handwritten text-lg">Jake Reddy</p>
      <p>&copy; {new Date().getFullYear()} Reddy on the Road</p>
    </div>
  </footer>
</div>
