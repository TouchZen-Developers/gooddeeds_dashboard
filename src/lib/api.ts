import { loginResponse } from '@/models/login'
import apiClient, { AxiosResponse } from './api-client'
import { AxiosRequestConfig } from 'axios'
import { Beneficiary, BeneficiaryResponse } from '@/models/beneficiary'

// Generic API utility functions
export const api = {
  // GET request
  get: async <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.get(url, config)
    return response.data
  },

  // POST request
  post: async <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.post(url, data, config)
    return response.data
  },

  // PUT request
  put: async <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.put(url, data, config)
    return response.data
  },

  // PATCH request
  patch: async <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.patch(url, data, config)
    return response.data
  },

  // DELETE request
  delete: async <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.delete(url, config)
    return response.data
  },
}

// Authentication specific API calls
export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    return api.post<loginResponse>('/login', credentials)
  },

  logout: async () => {
    return api.post('/auth/logout')
  },

  forgotPassword: async (email: string) => {
    return api.post('/auth/forgot-password', { email })
  },

  resetPassword: async (token: string, password: string) => {
    return api.post('/auth/reset-password', { token, password })
  },
}

export const beneficiariesApi = {
  getBeneficiaries: async ({ status }: { status?: string }) => {
    return api.get<BeneficiaryResponse>('/admin/beneficiaries', { params: { status } })
  },

  getBeneficiariesStatistics: async () => {
    return api.get<BeneficiaryResponse>('/admin/beneficiaries/statistics')
  },

  getBeneficiary: async (id: number) => {
    return api.get<Beneficiary>(`/admin/beneficiaries/${id}`)
  },

  approveBeneficiary: async (id: number) => {
    return api.post(`/admin/beneficiaries/${id}/approve`)
  },

  rejectBeneficiary: async (id: number) => {
    return api.post(`/admin/beneficiaries/${id}/reject`)
  },
}

export const affectedEventsApi = {
  getAffectedEvents: async () => {
    return api.get<BeneficiaryResponse>('/admin/affected-events')
  },
  createAffectedEvent: async () => {
    return api.post<BeneficiaryResponse>('/admin/affected-events')
  },
}

export const categoriesApi = {
  getCategories: async () => {
    return api.get('/admin/categories')
  },
  createCategory: async (category: FormData) => {
    return api.post('/admin/categories', category, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  updateCategory: async (id: number, category: FormData) => {
    return api.post(`/admin/categories/${id}`, category, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  deleteCategory: async (id: number) => {
    return api.delete(`/admin/categories/${id}`)
  },
}

export const amazonItemsApi = {
  getProducts: async () => {
    return api.get('/admin/products')
  },
  createBulkProducts: async (products: any) => {
    return api.post('/admin/products/bulk-import', products)
  },
  updateProduct: async (id: number, product: FormData) => {
    return api.post(`/admin/products/${id}`, product)
  },
  deleteProduct: async (id: number) => {
    return api.delete(`/admin/products/${id}`)
  },
}


export default api
