import { NextRequest, NextResponse } from 'next/server'

const PROTECTED_PATHS = ['/programs', '/account']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isProtected = PROTECTED_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + '/')
  )
  if (!isProtected) return NextResponse.next()

  const session = req.cookies.get('bs_session')
  if (!session) {
    return NextResponse.redirect(new URL('/buy', req.url))
  }
  // Full verification happens in the page/layout server component
  return NextResponse.next()
}

export const config = {
  matcher: ['/programs/:path*', '/account/:path*'],
}
