'use client'
import { useState } from 'react'
import { getClientAuth } from '@/lib/firebase-client'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth'

export default function BuyPage() {
  const [mode, setMode] = useState<'idle' | 'signin' | 'signup'>('idle')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [resetSent, setResetSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function startCheckout(idToken: string) {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    })
    const data = await res.json()
    if (res.status === 409 || data.error === 'sold_out') {
      setError('Due to overwhelming demand, we have capped the beta user price. If you would still like to be a beta user please join the waitlist at bellsense.app/beta.')
      return
    }
    if (data.url) window.location.href = data.url
  }

  async function afterAuth(idToken: string) {
    const res = await fetch('/api/auth/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error ?? `Session error (${res.status})`)
    if (data.hasPurchased) {
      window.location.href = '/account'
    } else {
      await startCheckout(idToken)
    }
  }

  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const auth = getClientAuth()
      const trimmedEmail = email.trim().toLowerCase()
      let cred
      if (mode === 'signup') {
        cred = await createUserWithEmailAndPassword(auth, trimmedEmail, password)
      } else {
        cred = await signInWithEmailAndPassword(auth, trimmedEmail, password)
      }
      const idToken = await cred.user.getIdToken()
      await afterAuth(idToken)
    } catch (err: unknown) {
      const code = (err as { code?: string }).code
      if (code === 'auth/invalid-email') setError('Please enter a valid email address.')
      else if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') setError('Incorrect email or password.')
      else if (code === 'auth/email-already-in-use') setError('An account with this email already exists. Try signing in instead.')
      else setError(err instanceof Error ? err.message : 'Authentication failed')
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

  async function handleApple() {
    setLoading(true)
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

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="grid sm:grid-cols-2 gap-12 items-start">
        {/* Product card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="w-12 h-12 bg-[#e5322d] rounded-xl mb-6" />
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">BellSense Sensor</h1>
          <p className="text-[#9ca3af] mb-6 leading-relaxed">
            Kettlebell-mounted IMU sensor + iOS app with lifetime access. Seven exercises. Real-time feedback.
          </p>
          <div className="flex items-baseline gap-3 mb-1">
            <div className="text-4xl font-extrabold">$60</div>
            <div className="text-xl text-[#9ca3af] line-through">$120</div>
          </div>
          <p className="text-sm text-[#e5322d] font-medium mb-1">Beta pricing — 50% off retail.</p>
          <p className="text-sm text-[#9ca3af] mb-8">One-time purchase. No subscription.</p>
          <ul className="space-y-2 text-sm text-[#9ca3af]">
            {[
              'BellSense hardware sensor',
              'iOS app — lifetime access',
              '7 exercises tracked',
              'Per-rep quality scoring',
              'Program library included',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-[#e5322d]">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Auth / checkout */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Get started</h2>
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
                onClick={() => setMode('signup')}
                className="w-full bg-white/5 border border-white/10 py-3 px-4 rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                Sign up with email
              </button>
              <button
                onClick={() => setMode('signin')}
                className="w-full text-[#9ca3af] hover:text-[#f0f0f0] transition-colors text-sm py-2"
              >
                Already have an account? Sign in
              </button>
            </div>
          )}
          {(mode === 'signup' || mode === 'signin') && (
            <form onSubmit={handleEmailAuth} className="space-y-3">
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
                {loading ? 'Processing...' : mode === 'signup' ? 'Create account & buy' : 'Sign in'}
              </button>
              {mode === 'signin' && (
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="w-full text-[#9ca3af] hover:text-[#f0f0f0] transition-colors text-sm py-1"
                >
                  Forgot password?
                </button>
              )}
              <button
                type="button"
                onClick={() => setMode('idle')}
                className="w-full text-[#9ca3af] hover:text-[#f0f0f0] transition-colors text-sm py-1"
              >
                ← Back
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
