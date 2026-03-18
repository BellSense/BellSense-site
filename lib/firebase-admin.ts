// Firebase Admin — lazy initialization to avoid build-time crashes when env vars are absent

let _adminApp: import('firebase-admin/app').App | undefined

async function getAdminApp() {
  if (_adminApp) return _adminApp
  const { initializeApp, getApps, cert } = await import('firebase-admin/app')
  if (getApps().length > 0) {
    _adminApp = getApps()[0]
    return _adminApp
  }
  _adminApp = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  })
  return _adminApp
}

export async function getAdminDb() {
  const app = await getAdminApp()
  const { getFirestore } = await import('firebase-admin/firestore')
  return getFirestore(app)
}

export async function getAdminAuth() {
  const app = await getAdminApp()
  const { getAuth } = await import('firebase-admin/auth')
  return getAuth(app)
}
