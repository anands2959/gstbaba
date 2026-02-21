import { type NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from './utils/adminAuth'

const SESSION_COOKIE = 'admin_session'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Only protect admin sub-routes (settings, users, plans, etc.)
    // The main /auth/anand/admin page handles its own auth state (shows login or dashboard)
    if (pathname.startsWith('/auth/anand/admin/')) {
        const sessionCookie = request.cookies.get(SESSION_COOKIE)?.value

        if (!sessionCookie || !verifyAdminSession(sessionCookie)) {
            const loginUrl = new URL('/auth/anand/admin', request.url)
            return NextResponse.redirect(loginUrl)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/auth/anand/admin/:path*',
    ],
}
