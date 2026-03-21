'use client'
import { useState } from 'react'
import Link from 'next/link'
import { getClientAuth } from '@/lib/firebase-client'
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth'

export default function LoginPage() {
  const [mode, setMode] = useState<'idle' | 'email'>('idle')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [resetSent, setResetSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function afterAuth(idToken: string) {
    const res = await fetch('/api/auth/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error ?? `Session error (${res.status})`)
    window.location.href = '/account'
  }

  async function handleEmailSignIn(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const auth = getClientAuth()
      const cred = await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password)
      const idToken = await cred.user.getIdToken()
      await afterAuth(idToken)
    } catch (err: unknown) {
      const code = (err as { code?: string }).code
      if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setError('Incorrect email or password.')
      } else if (code === 'auth/invalid-email') {
        setError('Please enter a valid email address.')
      } else {
        setError(err instanceof Error ? err.message : 'Sign-in failed')
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleApple() {
    setLoading(true)
    setError('')
    try {
      const auth = getClientAuth()
      const provider = new OAuthProvider('apple.com')
      const cred = await signInWithPopup(auth, provider)
      const idToken = await cred.user.getIdToken()
      await afterAuth(idToken)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Apple sign-in failed')
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setLoading(true)
    setError('')
    try {
      const auth = getClientAuth()
      const provider = new GoogleAuthProvider()
      const cred = await signInWithPopup(auth, provider)
      const idToken = await cred.user.getIdToken()
      await afterAuth(idToken)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed')
    } finally {
      setLoading(false)
    }
  }

  async function handleForgotPassword() {
    if (!email) { setError('Enter your email above first.'); return }
    try {
      const auth = getClientAuth()
      await sendPasswordResetEmail(auth, email.trim().toLowerCase())
      setResetSent(true)
      setError('')
    } catch {
      setError('Could not send reset email. Check the address and try again.')
    }
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-20">
      <h1 className="text-3xl font-extrabold tracking-tight mb-2">Welcome back</h1>
      <p className="text-[#9ca3af] mb-10">Sign in to access your programs and account.</p>

      {mode === 'idle' && (
        <div className="space-y-3">
          <button
            onClick={handleApple}
            disabled={loading}
            className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-[#1a1a1a] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 border border-white/20"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
            </svg>
            Continue with Apple
          </button>
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full bg-white text-black py-3 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            Continue with Google
          </button>
          <button
            onClick={() => setMode('email')}
            className="w-full bg-white/5 border border-white/10 py-3 px-4 rounded-lg font-medium hover:bg-white/10 transition-colors"
          >
            Sign in with email
          </button>
        </div>
      )}

      {mode === 'email' && (
        <form onSubmit={handleEmailSignIn} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#f0f0f0] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#e5322d]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-[#f0f0f0] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#e5322d]"
          />
          {error && <p className="text-[#e5322d] text-sm">{error}</p>}
          {resetSent && <p className="text-green-400 text-sm">Password reset email sent — check your inbox.</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#e5322d] text-white py-3 rounded-lg font-bold hover:bg-[#cc2d28] transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
          <button
            type="button"
            onClick={handleForgotPassword}
            className="w-full text-[#9ca3af] hover:text-[#f0f0f0] transition-colors text-sm py-1"
          >
            Forgot password?
          </button>
          <button
            type="button"
            onClick={() => setMode('idle')}
            className="w-full text-[#9ca3af] hover:text-[#f0f0f0] transition-colors text-sm py-1"
          >
            ← Back
          </button>
        </form>
      )}

      {error && mode === 'idle' && <p className="text-[#e5322d] text-sm mt-3">{error}</p>}

      <p className="text-[#9ca3af] text-sm mt-10">
        Don&apos;t have an account?{' '}
        <Link href="/buy" className="text-[#f0f0f0] hover:text-white underline">
          Get BellSense →
        </Link>
      </p>
    </div>
  )
}
