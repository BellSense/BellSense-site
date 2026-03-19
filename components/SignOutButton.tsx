'use client'
import { getClientAuth } from '@/lib/firebase-client'
import { signOut } from 'firebase/auth'

export default function SignOutButton() {
  async function handleSignOut() {
    await fetch('/api/auth/session', { method: 'DELETE' })
    await signOut(getClientAuth())
    window.location.href = '/'
  }

  return (
    <button
      onClick={handleSignOut}
      className="w-full text-left text-[#9ca3af] text-sm hover:text-[#f0f0f0] transition-colors py-2"
    >
      Sign out
    </button>
  )
}
