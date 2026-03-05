<script lang="ts">
  import type { RotrPost } from '$lib/types'

  let { post }: { post: RotrPost } = $props()

  function formatDate(iso?: string | null) {
    if (!iso) return ''
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  const authorName = typeof post.author === 'object' && post.author !== null ? post.author.name : undefined
</script>

<div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone" style="font-family: var(--font-body); font-style: italic;">
  {#if authorName}<span>{authorName}</span><span aria-hidden="true">&middot;</span>{/if}
  {#if post.published_at}<time datetime={post.published_at}>{formatDate(post.published_at)}</time>{/if}
  {#if post.type}<span aria-hidden="true">&middot;</span><span>{post.type}</span>{/if}
</div>
