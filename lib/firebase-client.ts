import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'

let _app: FirebaseApp | undefined
let _auth: Auth | undefined
let _db: Firestore | undefined

function getApp(): FirebaseApp {
  if (_app) return _app
  const existing = getApps()
  if (existing.length > 0) {
    _app = existing[0]
    return _app
  }
  _app = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
  })
  return _app
}

export function getClientAuth(): Auth {
  if (!_auth) _auth = getAuth(getApp())
  return _auth
}

export function getClientDb(): Firestore {
  if (!_db) _db = getFirestore(getApp())
  return _db
}
