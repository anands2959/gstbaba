import { cookies } from 'next/headers'

const SESSION_COOKIE = 'admin_session'
const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export function createSessionToken(): string {
    const secret = process.env.ADMIN_SESSION_SECRET || 'gst-baba-admin-secret-key'
    const timestamp = Date.now().toString()
    // Simple Base64 encoded token: timestamp|secret
    return btoa(`${timestamp}|${secret}`)
}

export function verifyAdminSession(token: string): boolean {
    try {
        const decoded = atob(token)
        const [timestamp, secretCheck] = decoded.split('|')
        if (!timestamp || !secretCheck) return false

        const expectedSecret = process.env.ADMIN_SESSION_SECRET || 'gst-baba-admin-secret-key'
        if (secretCheck !== expectedSecret) return false

        // Check if token is expired (7 days)
        const tokenAge = Date.now() - parseInt(timestamp)
        if (tokenAge > SESSION_MAX_AGE * 1000) return false

        return true
    } catch {
        return false
    }
}

/**
 * Helper to check if the current request has a valid admin session.
 * Used in API routes to protect endpoints.
 */
export function checkAdminSession(): boolean {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get(SESSION_COOKIE)?.value

    if (!sessionCookie) return false
    return verifyAdminSession(sessionCookie)
}
