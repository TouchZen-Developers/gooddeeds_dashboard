export interface CategoriesResponse {
  success: boolean
  data: Data
}

export interface Data {
  categories: Category[]
  pagination: Pagination
}

export interface Category {
  id: number
  name: string
  product_count: number
  icon_url: string | null
  created_at: string
  updated_at: string
}

export interface Pagination {
  current_page: number
  last_page: number
  per_page: number
  total: number
}
