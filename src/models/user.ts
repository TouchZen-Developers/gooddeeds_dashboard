export interface UserResponse {
  success: boolean
  data: User
}

export interface User {
  current_page: number
  data: UserItem[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Link[]
  next_page_url: unknown
  path: string
  per_page: number
  prev_page_url: unknown
  to: number
  total: number
}

export interface UserItem {
  id: number
  name: string
  email: string
  email_verified_at?: string
  is_email_verified: boolean
  roles: Role[]
  profile: unknown
  created_at: string
  updated_at: string
}

export interface Role {
  id: number
  name: string
  slug: string
}

export interface Link {
  url?: string
  label: string
  page?: number
  active: boolean
}
