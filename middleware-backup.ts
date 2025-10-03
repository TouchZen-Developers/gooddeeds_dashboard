import { NextResponse, type NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Example: protect dashboard pages and API endpoints except a public auth/login endpoint
  const isDashboard = pathname.startsWith('/dashboard')
  const isProtectedApi = pathname.startsWith('/api') && !pathname.startsWith('/api/public')

  if (!(isDashboard || isProtectedApi)) {
    return NextResponse.next()
  }

  const token = req.cookies.get('token')?.value
  if (!token) {
    // For API calls return 401 JSON; for pages redirect
    if (pathname.startsWith('/api')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  const res = NextResponse.next()
  res.headers.set('x-authenticated', 'true')
  return res
}

// Add /api. Exclude Next internals for perf.
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
  ],
}
