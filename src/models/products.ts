export interface ProductsResponse {
  success: boolean
  data: Data
}

export interface Data {
  current_page: number
  data: Product[]
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

export interface Product {
  id: number
  url: string
  provider: string
  external_id: string
  domain: string
  title: string
  description: string | null
  price?: string
  currency: string
  image_url: string
  features: string[]
  specifications: Specification[]
  availability?: string
  rating: string
  review_count: number | null
  brand: string
  model: string | null
  category_id: number
  is_active: boolean
  is_featured: boolean
  created_at: string
  updated_at: string
  category: Category
}

export interface Specification {
  name: string
  value: string
}

export interface Category {
  id: number
  name: string
  icon_url: string
  created_at: string
  updated_at: string
}

export interface Link {
  url?: string
  label: string
  page?: number
  active: boolean
}
