import { User } from '@/models/login'

/**
 * Gets user information from a JWT token stored in localStorage
 * @returns User object or null if no valid token
 */
export function getUserFromToken(): User | null {
  if (typeof window === 'undefined') return null

  try {
    const user: User = JSON.parse(localStorage.getItem('user') || '{}')
    if (!user) return null
    return {
      id: user.id,
      name: user.name,
      email: user.email || '',
    }
  } catch (error) {
    console.error('Error getting user from token:', error)
    return null
  }
}

/**
 * Gets the raw token from localStorage
 * @returns token string or null
 */
export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}

/**
 * Removes the token from localStorage
 */
export function removeToken(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('token')
}

/**
 * Stores a token in localStorage
 * @param token JWT token string
 */
export function setToken(token: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('token', token)
}
