import type { PageLoad } from './$types'
import { fetchPost, fetchAllPosts } from '$lib/api'
import { error } from '@sveltejs/kit'

export const load: PageLoad = async ({ params }) => {
  const [post, allPosts] = await Promise.all([fetchPost(params.slug), fetchAllPosts()])
  if (!post) throw error(404, `Week "${params.slug}" not found`)

  const currentIndex = allPosts.findIndex((p) => p.slug === params.slug)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  return { post, prevPost, nextPost, weekNumber: currentIndex + 1 }
}
