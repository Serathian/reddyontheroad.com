import { mockPosts } from '$lib/mock/posts'
import type { PayloadListResponse, RotrPost } from '$lib/types'

// Toggle to false when the real CMS is ready
const USE_MOCK = true

const CMS_URL =
  typeof import.meta !== 'undefined'
    ? (import.meta.env?.PUBLIC_CMS_URL ?? 'https://cms.jake-reddy.com')
    : 'https://cms.jake-reddy.com'

export async function fetchAllPosts(): Promise<RotrPost[]> {
  if (USE_MOCK) return mockPosts

  const url = `${CMS_URL}/api/rotr_posts?where[status][equals]=published&sort=published_at&depth=2&limit=100`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`CMS fetch failed: ${res.status}`)
  const data: PayloadListResponse<RotrPost> = await res.json()
  return data.docs
}

export async function fetchPost(slug: string): Promise<RotrPost | null> {
  if (USE_MOCK) return mockPosts.find((p) => p.slug === slug) ?? null

  const url = `${CMS_URL}/api/rotr_posts?where[slug][equals]=${encodeURIComponent(slug)}&depth=2&limit=1`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`CMS fetch failed: ${res.status}`)
  const data: PayloadListResponse<RotrPost> = await res.json()
  return data.docs[0] ?? null
}
