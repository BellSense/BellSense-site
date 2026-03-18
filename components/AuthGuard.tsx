'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getClientAuth, getClientDb } from '@/lib/firebase-client'
import { doc, getDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const auth = getClientAuth()
    const db = getClientDb()
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace('/buy')
        return
      }
      const snap = await getDoc(doc(db, 'users', user.uid))
      if (!snap.data()?.hasPurchased) {
        router.replace('/buy')
        return
      }
      setChecking(false)
    })
    return () => unsub()
  }, [router])

  if (checking) return <div className="min-h-screen bg-[#111111] flex items-center justify-center text-[#9ca3af]">Loading...</div>
  return <>{children}</>
}
