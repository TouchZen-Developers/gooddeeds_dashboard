export interface BeneficiaryResponse {
  success: boolean
  data: Data
}

export interface Data {
  current_page: number
  data: Beneficiary[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Link[]
  next_page_url: any
  path: string
  per_page: number
  prev_page_url: any
  to: number
  total: number
}

export interface Beneficiary {
  id: number
  user_id: number
  family_size: number
  address: string
  city: string
  state: string
  zip_code: string
  affected_event: string
  statement: string
  family_photo_url?: string
  created_at: string
  updated_at: string
  status: string
  processed_at: any
  user: User
}

export interface User {
  id: number
  name: string
  first_name: string
  last_name: string
  email: string
  phone_number: string
  role: string
}

export interface Link {
  url?: string
  label: string
  page?: number
  active: boolean
}
