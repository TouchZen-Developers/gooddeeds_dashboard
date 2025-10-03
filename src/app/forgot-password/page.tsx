"use client";
import React, { useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Button from '@/components/Button/Button'

import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'

import { loginFormSchema } from '@/lib/validation-schemas'
import { authApi } from '@/lib/api'
import { setToken } from '@/lib/jwt-utils'
import Image from 'next/image';
import { Label } from '@/components/ui/label';

const formSchema = loginFormSchema
const ForgotPasswordPage = () => {
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
    <div className="min-h-screen bg-buffer-50 flex flex-col bg-gray-10">

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="rounded-2xl overflow-hidden flex flex-col md:flex-row">

          {/* Login Form */}
          <div className="p-8 md:p-12 flex-grow-0 flex-shrink-0 basis-[560px] bg-white">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Forgot Password?</h1>
            <p className="text-gray-600 mb-3 text-center">Don’t worry! It occurs. Please enter the email address linked with your account.</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-4 mb-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormControl>
                          <>
                            <FormLabel htmlFor="email">Email Address</FormLabel>
                            <Input
                              id="email"
                              placeholder="Enter your email"
                              type="email"
                              autoComplete="email"
                              {...field}
                            />
                          </>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="">

                  <Button type="submit"
                    className="w-full bg-black text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors "

                    disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? 'Sending...' : 'Send Code'}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPasswordPage;