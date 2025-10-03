'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'

import { loginFormSchema } from '@/lib/validation-schemas'
import { authApi } from '@/lib/api'
import { setToken } from '@/lib/jwt-utils'

const formSchema = loginFormSchema

export default function LoginPreview() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      // Use our API client for login
      const response = await authApi.login({
        email: values.email,
        password: values.password,
        device_name: "admin"
      })

      if (response?.token) {
        setToken(response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
        toast.success('Login successful!')
        router.push('/dashboard')
      } else {
        toast.error('Login failed: No token received')
      }
    } catch (error) {
      let errorMessage = 'Login failed. Please try again.'

      // Type guard to check if error has the expected structure
      if (error && typeof error === 'object' && 'response' in error) {
        const apiError = error as { response?: { data?: { message?: string } } }
        errorMessage = apiError.response?.data?.message || errorMessage
      }
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="johndoe@mail.com"
                    type="email"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <div className="flex justify-between items-center">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Link
                    href="forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <FormControl>
                  <PasswordInput
                    id="password"
                    placeholder="******"
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
