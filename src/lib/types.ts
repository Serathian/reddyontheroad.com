export type { RotrPost, RotrLocation, Media, Author, Tag } from '@serathian/basecamp-cms-types'

export interface PaginatedResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  hasPrevPage: boolean
  hasNextPage: boolean
}
