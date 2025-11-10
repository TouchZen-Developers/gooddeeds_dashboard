export interface EventsResponse {
  success: boolean
  data: Data
}

export interface Data {
  current_page: number
  data: Event[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Link[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

export interface Event {
  id: number
  name: string
  is_active: boolean
  created_at: string
  updated_at: string
  image_url?: string
  is_featured: boolean
  total_families: number
}

export interface Link {
  url?: string
  label: string
  page?: number
  active: boolean
}
