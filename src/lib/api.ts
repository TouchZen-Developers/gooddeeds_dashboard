import { loginResponse } from '@/models/login'
import apiClient, { AxiosResponse } from './api-client'
import { AxiosRequestConfig } from 'axios'
import { CategoryItem, CategoryResponse } from '@/models/category'
import { UserResponse } from '@/models/user'
import { ProductResponse } from '@/models/product'
import { WarrantyPricingItem, WarrantyPricingResponse } from '@/models/warrantyPricing'
import { CoverageDurationsResponse } from '@/models/coverageDurations'

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
  login: async (credentials: { email: string; password: string; device_name: string }) => {
    return api.post<loginResponse>('/auth/login', credentials)
  },

  logout: async () => {
    return api.post('/auth/logout')
  },

  refreshToken: async () => {
    return api.post('/auth/refresh')
  },

  forgotPassword: async (email: string) => {
    return api.post('/auth/forgot-password', { email })
  },

  resetPassword: async (token: string, password: string) => {
    return api.post('/auth/reset-password', { token, password })
  },
}

// Example usage functions for your dashboard
export const dashboardApi = {
  getDashboardData: async () => {
    return api.get('/dashboard')
  },

  getCategories: async () => {
    return api.get('/categories')
  },

  getClaims: async () => {
    return api.get('/claims')
  },

  createClaim: async (claimData: Record<string, unknown>) => {
    return api.post('/claims', claimData)
  },

  updateClaim: async (id: string, claimData: Record<string, unknown>) => {
    return api.put(`/claims/${id}`, claimData)
  },

  deleteClaim: async (id: string) => {
    return api.delete(`/claims/${id}`)
  },
}

export const categoriesApi = {
  getCategories: async (search?: string) => {
    const params = search ? { search } : {};
    return api.get<CategoryResponse>('/admin/categories', { params })
  },

  createCategory: async (categoryData: unknown) => {
    if (categoryData instanceof FormData) {
      return api.post('/admin/categories', categoryData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    }
    return api.post('/admin/categories', categoryData)
  },

  updateCategory: async (id: number, categoryData: CategoryItem | FormData) => {
    if (categoryData instanceof FormData) {
      return api.post(`/admin/categories/${id}`, categoryData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    }
    return api.put(`/admin/categories/${id}`, categoryData)
  },

  deleteCategory: async (id: number) => {
    return api.delete(`/admin/categories/${id}`)
  },
}

export const usersApi = {
  getUsers: async () => {
    return api.get<UserResponse>('/admin/users')
  },
}

export const productsApi = {
  getProducts:async (search?: string) => {
    const params = search ? { search } : {};
    return api.get<ProductResponse>('/admin/products', { params })
  },
  deleteProduct: async (id: number) => {
    return api.delete(`/admin/products/${id}`)
  },
  updateProduct: async (id: number, productData: Record<string, unknown>) => {
    return api.put(`/admin/products/${id}`, productData)
  },
  postProduct: async (productData: Record<string, unknown>) => {
    return api.post(`/admin/products`, productData)
  },
}

export const schoolDistrictsApi = {
  getSchoolDistricts: async () => {
    return api.get<ProductResponse>('/admin/school-districts')
  },
  deleteSchoolDistrict: async (id: number) => {
    return api.delete(`/admin/school-districts/${id}`)
  },
  updateSchoolDistrict: async (id: number, schoolDistrictData: Record<string, unknown>) => {
    return api.put(`/admin/school-districts/${id}`, schoolDistrictData)
  },
  postSchoolDistrict: async (schoolDistrictData: Record<string, unknown>) => {
    return api.post(`/admin/school-districts`, schoolDistrictData)
  },
}

export const warrantyPricingApi = {
  getWarrantyPricing: async (activeCategoryId: number | undefined) => {
    return api.get<WarrantyPricingResponse>('/admin/warranty-pricing', {
      params: { category_id: activeCategoryId }
    })
  },
  getCoverageDurations: async () => {
    return api.get<CoverageDurationsResponse>('/admin/coverage-durations')
  },
  deleteWarrantyPricing: async (id: number) => {
    return api.delete(`/admin/warranty-pricing/${id}`)
  },
  updateWarrantyPricing: async (id: number, params: WarrantyPricingItem) => {
    return api.put(`/admin/warranty-pricing/${id}`, params)
  },
  postWarrantyPricing: async (warrantyPricingData: WarrantyPricingItem) => {
    return api.post(`/admin/warranty-pricing`, warrantyPricingData)
  },
}

export default api
