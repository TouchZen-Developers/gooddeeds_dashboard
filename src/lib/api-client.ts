import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add authorization header
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage (only on client side)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    
    console.log('API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      headers: config.headers,
    })
    
    return config
  },
  (error: AxiosError) => {
    console.error('API Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor to handle common responses and errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    })
    
    return response
  },
  (error: AxiosError) => {
    console.error('API Response Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data,
    })
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    }
    
    if (error.response?.status === 403) {
      // Forbidden - user doesn't have permission
      console.warn('Access forbidden - insufficient permissions')
    }
    
    if (error.response?.status && error.response.status >= 500) {
      // Server error
      console.error('Server error occurred')
    }
    
    return Promise.reject(error)
  }
)

export default apiClient

// Export types for convenience
export type { AxiosResponse, AxiosError, InternalAxiosRequestConfig }
