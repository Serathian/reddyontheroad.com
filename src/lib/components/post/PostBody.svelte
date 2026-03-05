<script lang="ts">
  let { body }: { body?: string | null } = $props()
</script>

{#if body}
  <div class="prose-journal">
    {#each body.split('\n\n') as paragraph}
      {#if paragraph.trim()}
        <p>{paragraph.trim()}</p>
      {/if}
    {/each}
  </div>
{/if}
