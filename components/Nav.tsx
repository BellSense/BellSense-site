'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getClientAuth } from '@/lib/firebase-client'
import { onAuthStateChanged } from 'firebase/auth'

export default function Nav() {
  const [signedIn, setSignedIn] = useState<boolean | null>(null)

  useEffect(() => {
    const auth = getClientAuth()
    const unsub = onAuthStateChanged(auth, (user) => {
      setSignedIn(!!user)
    })
    return unsub
  }, [])

  return (
    <nav className="border-b border-white/10 bg-[#111111]">
      <div className="mx-auto max-w-5xl px-4 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#e5322d] rounded-md" />
          <span className="font-bold text-[#f0f0f0] tracking-tight">BellSense</span>
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/programs" className="text-[#9ca3af] hover:text-[#f0f0f0] transition-colors">Programs</Link>
          <Link href="/articles" className="text-[#9ca3af] hover:text-[#f0f0f0] transition-colors">Articles</Link>
          <Link href="/faq" className="text-[#9ca3af] hover:text-[#f0f0f0] transition-colors">FAQ</Link>
          {signedIn === true && (
            <Link href="/account" className="text-[#9ca3af] hover:text-[#f0f0f0] transition-colors">My Account</Link>
          )}
          {signedIn === false && (
            <Link href="/login" className="text-[#9ca3af] hover:text-[#f0f0f0] transition-colors">Sign In</Link>
          )}
          <Link href="/buy" className="bg-[#e5322d] text-white px-3 py-1.5 rounded-md font-medium hover:bg-[#cc2d28] transition-colors">Get BellSense</Link>
        </div>
      </div>
    </nav>
  )
}
