import { PUBLIC_CMS_URL } from '$env/static/public'
import type { PageLoad } from './$types'
import type { PaginatedResponse, RotrPost } from '$lib/types'

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch(
    `${PUBLIC_CMS_URL}/api/rotr_posts?where[status][equals]=published&sort=-published_at&limit=6&depth=1`
  )

  if (!res.ok) {
    return { posts: [] }
  }

  const data: PaginatedResponse<RotrPost> = await res.json()
  return { posts: data.docs }
}
