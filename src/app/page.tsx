"use client"
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'


export default function RootPage() {
  // if there is no token in the url, redirect to /login
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);
  if (token) {
    router.push(`/dashboard/families`);
    return <div>Redirecting to dashboard...</div>;
  }
  return '';
}
