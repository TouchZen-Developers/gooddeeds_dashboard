"use client";
import React, { useState } from 'react';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Loader2, Eye, EyeOff } from 'lucide-react'
import OtpInput from 'react-otp-input';
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
import { authApi } from '@/lib/api'

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ["password_confirmation"],
})
const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showOtpPage, setShowOtpPage] = useState(false)
  const [showResetPasswordPage, setShowResetPasswordPage] = useState(false)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationToken, setVerificationToken] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      password_confirmation: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      await authApi.forgotPassword(values.email)
      toast.success('Password reset code sent! Check your email.')
      setEmail(values.email)
      setShowOtpPage(true)
    } catch (error) {
      let errorMessage = 'Failed to send reset code. Please try again.'

      if (error && typeof error === 'object' && 'response' in error) {
        const apiError = error as { response?: { data?: { message?: string } } }
        errorMessage = apiError.response?.data?.message || errorMessage
      }
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }


  const handleVerifyOtp = async () => {
    const otpCode = otp;
    if (otpCode.length !== 4) {
      toast.error('Please enter all 4 digits')
      return
    }

    setIsVerifying(true)
    try {
      const response = await authApi.verifyOtp({ email, otp: otpCode })
      const token = (response as { verification_token?: string })?.verification_token

      if (token) {
        setVerificationToken(token)
        setShowOtpPage(false)
        setShowResetPasswordPage(true)
        toast.success('OTP verified successfully!')
      } else {
        toast.error('Verification token not received')
      }
    } catch (error) {
      let errorMessage = 'Invalid OTP. Please try again.'

      if (error && typeof error === 'object' && 'response' in error) {
        const apiError = error as { response?: { data?: { message?: string } } }
        errorMessage = apiError.response?.data?.message || errorMessage
      }
      toast.error(errorMessage)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResendOtp = async () => {
    setIsLoading(true)
    try {
      await authApi.forgotPassword(email)
      toast.success('OTP resent successfully!')
      setOtp('')
    } catch {
      toast.error('Failed to resend OTP')
    } finally {
      setIsLoading(false)
    }
  }

  async function onResetPassword(values: z.infer<typeof resetPasswordSchema>) {
    setIsLoading(true)
    try {
      await authApi.resetPassword({
        verification_token: verificationToken,
        password: values.password,
        password_confirmation: values.password_confirmation,
      })
      toast.success('Password reset successfully!')
      // Redirect to login or handle next step
      window.location.href = '/login'
    } catch (error) {
      let errorMessage = 'Failed to reset password. Please try again.'

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

          {!showOtpPage && !showResetPasswordPage ? (
            /* Email Form */
            <div className="p-8 md:p-12 flex-grow-0 flex-shrink-0 basis-[560px] bg-white">
              <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Forgot Password?</h1>
              <p className="text-gray-600 mb-3 text-center">Don&apos;t worry! It occurs. Please enter the email address linked with your account.</p>
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
          ) : showOtpPage ? (
            /* OTP Verification Form */
            <div className="p-8 md:p-12 flex-grow-0 flex-shrink-0 basis-[560px] bg-white">
              <h1 className="text-3xl font-bold text-gray-900 mb-3 text-center">OTP Verification</h1>
              <p className="text-gray-600 mb-8 text-center">
                Enter the verification code we just sent on your email address.
              </p>

              <div className="flex justify-center gap-3 mb-8">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={4}
                  renderSeparator={<span></span>}
                  renderInput={(props) => <input
                    {...props} />}
                  inputStyle={{
                    width: '3rem',
                    height: '3rem',
                    margin: '20px 0.5rem',
                    fontSize: '1rem',
                    borderRadius: 4,
                    border: '2px solid rgba(0,0,0,0.3)',
                  }}
                />
              </div>

              <Button
                onClick={handleVerifyOtp}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-full font-medium transition-colors mb-4"
                disabled={isVerifying}
              >
                {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isVerifying ? 'Verifying...' : 'Verify'}
              </Button>

              <p className="text-center text-gray-600">
                Don&apos;t received code?{' '}
                <button
                  onClick={handleResendOtp}
                  className="text-blue-600 hover:underline font-medium"
                  disabled={isLoading}
                >
                  Resend
                </button>
              </p>
            </div>
          ) : (
            /* Reset Password Form */
            <div className="p-8 md:p-12 flex-grow-0 flex-shrink-0 basis-[560px] bg-white">
              <h1 className="text-3xl font-bold text-gray-900 mb-3 text-center">Create new password</h1>
              <p className="text-gray-600 mb-8 text-center text-sm">
                Your new password must be unique from those previously used.
              </p>

              <Form {...resetPasswordForm}>
                <form onSubmit={resetPasswordForm.handleSubmit(onResetPassword)} className="space-y-6">
                  <FormField
                    control={resetPasswordForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="password">New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              id="password"
                              placeholder="Enter password"
                              type={showPassword ? "text" : "password"}
                              autoComplete="new-password"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={resetPasswordForm.control}
                    name="password_confirmation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="password_confirmation">Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              id="password_confirmation"
                              placeholder="Enter password"
                              type={showConfirmPassword ? "text" : "password"}
                              autoComplete="new-password"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-full font-medium transition-colors"
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? 'Resetting...' : 'Reset Password'}
                  </Button>
                </form>
              </Form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ForgotPasswordPage;