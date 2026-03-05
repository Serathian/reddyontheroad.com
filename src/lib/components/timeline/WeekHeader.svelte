<script lang="ts">
  let { weekNumber, publishedAt }: {
    weekNumber: number
    publishedAt?: string | null
  } = $props()

  function formatWeekDate(iso?: string | null): string {
    if (!iso) return ''
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  }
</script>

<div class="mb-3 flex items-baseline gap-4">
  <span class="week-label" style="font-family: var(--font-script)">Week {weekNumber}</span>
  {#if publishedAt}
    <time class="text-sm text-stone" style="font-family: var(--font-body); font-style: italic;">
      {formatWeekDate(publishedAt)}
    </time>
  {/if}
</div>
