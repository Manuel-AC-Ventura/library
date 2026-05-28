import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'library-jwt-secret-change-in-production'
)

const publicRoutes = ['/login']
const staticRoutes = ['/_next', '/favicon', '/api']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (staticRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  const token = request.cookies.get('library_session')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    await jwtVerify(token, JWT_SECRET)
    return NextResponse.next()
  } catch {
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('library_session')
    return response
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
