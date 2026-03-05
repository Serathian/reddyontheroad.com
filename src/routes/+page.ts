import type { PageLoad } from './$types'
import { fetchAllPosts } from '$lib/api'

export const load: PageLoad = async () => {
  const posts = await fetchAllPosts()
  return { posts }
}
