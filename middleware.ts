import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  // Protect individual program pages and account, but NOT the /programs index
  const isProtected =
    pathname.startsWith('/programs/') ||
    pathname === '/account' ||
    pathname.startsWith('/account/')

  if (!isProtected) return NextResponse.next()

  const session = req.cookies.get('bs_session')
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  // Full verification happens in the page/layout server component
  return NextResponse.next()
}

export const config = {
  matcher: ['/programs/:path*', '/account/:path*'],
}
