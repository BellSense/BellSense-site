import { cookies } from 'next/headers'
import { getAdminAuth, getAdminDb } from './firebase-admin'

const SESSION_COOKIE_NAME = 'bs_session'
const SESSION_EXPIRES_MS = 7 * 24 * 60 * 60 * 1000

export async function createSessionCookie(idToken: string) {
  const adminAuth = await getAdminAuth()
  const expiresIn = SESSION_EXPIRES_MS
  const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn })
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: expiresIn / 1000,
    path: '/',
  })
}

export async function getSession(): Promise<{ uid: string; hasPurchased: boolean } | null> {
  try {
    const cookieStore = await cookies()
    const cookie = cookieStore.get(SESSION_COOKIE_NAME)
    if (!cookie) return null
    const adminAuth = await getAdminAuth()
    const decoded = await adminAuth.verifySessionCookie(cookie.value, true)
    const adminDb = await getAdminDb()
    const userDoc = await adminDb.collection('users').doc(decoded.uid).get()
    const data = userDoc.data()
    return {
      uid: decoded.uid,
      hasPurchased: data?.hasPurchased === true,
    }
  } catch {
    return null
  }
}

export async function clearSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}
