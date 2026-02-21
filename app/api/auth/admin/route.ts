import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { createSessionToken, verifyAdminSession } from '@/utils/adminAuth'

const SESSION_COOKIE = 'admin_session'
const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

// GET: Check auth status
export async function GET() {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get(SESSION_COOKIE)?.value

    if (!sessionCookie || !verifyAdminSession(sessionCookie)) {
        return NextResponse.json({ authenticated: false })
    }

    return NextResponse.json({ authenticated: true })
}

// POST: Login
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { email, password } = body

        const adminEmail = (process.env.ADMIN_USER_ID || '').trim()
        const adminPassword = (process.env.ADMIN_PASSWORD || '').trim()

        if (!adminEmail || !adminPassword) {
            return NextResponse.json(
                { error: 'Admin credentials not configured on server' },
                { status: 500 }
            )
        }

        if (email !== adminEmail || password !== adminPassword) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            )
        }

        // Create session
        const token = createSessionToken()
        const cookieStore = cookies()

        cookieStore.set(SESSION_COOKIE, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: SESSION_MAX_AGE,
        })

        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Login failed' },
            { status: 500 }
        )
    }
}

// DELETE: Logout
export async function DELETE() {
    const cookieStore = cookies()

    cookieStore.set(SESSION_COOKIE, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 0,
    })

    return NextResponse.json({ success: true })
}
