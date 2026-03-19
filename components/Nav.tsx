'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getClientAuth } from '@/lib/firebase-client'
import { onAuthStateChanged, signOut } from 'firebase/auth'

export default function Nav() {
  const [signedIn, setSignedIn] = useState<boolean | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const auth = getClientAuth()
    const unsub = onAuthStateChanged(auth, (user) => {
      setSignedIn(!!user)
    })
    return unsub
  }, [])

  async function handleSignOut() {
    await fetch('/api/auth/session', { method: 'DELETE' })
    await signOut(getClientAuth())
    window.location.href = '/'
  }

  function close() {
    setMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#111111]/80 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-4 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2" onClick={close}>
          <div className="w-6 h-6 bg-[#e5322d] rounded-md" />
          <span className="font-bold text-[#f0f0f0] tracking-tight">BellSense</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-6 text-sm">
          <Link href="/programs" className="text-[#9ca3af] hover:text-[#f0f0f0] transition-colors">Programs</Link>
          <Link href="/articles" className="text-[#9ca3af] hover:text-[#f0f0f0] transition-colors">Articles</Link>
          <Link href="/faq" className="text-[#9ca3af] hover:text-[#f0f0f0] transition-colors">FAQ</Link>
          {signedIn === true && (
            <Link href="/account" className="text-[#9ca3af] hover:text-[#f0f0f0] transition-colors">My Account</Link>
          )}
          {signedIn === true && (
            <button onClick={handleSignOut} className="text-[#9ca3af] hover:text-[#f0f0f0] transition-colors">
              Sign out
            </button>
          )}
          {signedIn === false && (
            <Link href="/login" className="text-[#9ca3af] hover:text-[#f0f0f0] transition-colors">Sign In</Link>
          )}
          <Link href="/buy" className="bg-[#e5322d] text-white px-3 py-1.5 rounded-md font-medium hover:bg-[#cc2d28] transition-colors">
            Get BellSense
          </Link>
        </div>

        {/* Mobile: CTA + hamburger */}
        <div className="flex sm:hidden items-center gap-3">
          <Link href="/buy" className="bg-[#e5322d] text-white px-3 py-1.5 rounded-md font-medium text-sm hover:bg-[#cc2d28] transition-colors">
            Get BellSense
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="text-[#9ca3af] hover:text-[#f0f0f0] transition-colors p-1"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden border-t border-white/10 bg-[#111111]/95 px-4 py-4 flex flex-col gap-1 text-sm">
          <Link href="/programs" onClick={close} className="py-2 text-[#9ca3af] hover:text-[#f0f0f0] transition-colors">Programs</Link>
          <Link href="/articles" onClick={close} className="py-2 text-[#9ca3af] hover:text-[#f0f0f0] transition-colors">Articles</Link>
          <Link href="/faq" onClick={close} className="py-2 text-[#9ca3af] hover:text-[#f0f0f0] transition-colors">FAQ</Link>
          {signedIn === true && (
            <Link href="/account" onClick={close} className="py-2 text-[#9ca3af] hover:text-[#f0f0f0] transition-colors">My Account</Link>
          )}
          {signedIn === false && (
            <Link href="/login" onClick={close} className="py-2 text-[#9ca3af] hover:text-[#f0f0f0] transition-colors">Sign In</Link>
          )}
          {signedIn === true && (
            <button onClick={handleSignOut} className="py-2 text-left text-[#9ca3af] hover:text-[#f0f0f0] transition-colors">
              Sign out
            </button>
          )}
        </div>
      )}
    </nav>
  )
}
