<script lang="ts">
  import type { Media } from '$lib/types'

  let { image, alt = '', class: className = '' }: {
    image?: Media | number | null
    alt?: string
    class?: string
  } = $props()

  const resolved = typeof image === 'object' && image !== null ? image : undefined
</script>

{#if resolved?.url}
  <img src={resolved.url} alt={resolved.alt ?? alt} class={className} />
{:else}
  <div class="flex items-center justify-center bg-paper {className}">
    <span style="font-family: var(--font-script); font-size: 4rem; color: #d6cfc0;">&#x2767;</span>
  </div>
{/if}
