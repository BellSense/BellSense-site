import type { Metadata } from 'next'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import SignOutButton from '@/components/SignOutButton'

export const metadata: Metadata = {
  title: 'Account — BellSense',
  description: 'Manage your BellSense account and access your training programs.',
}

export default async function AccountPage({ searchParams }: { searchParams: Promise<{ success?: string }> }) {
  const session = await getSession()
  if (!session || !session.hasPurchased) redirect('/buy')
  const params = await searchParams
  const success = params.success === 'true'

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      {success && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-8 text-green-400 text-sm">
          Purchase complete! You now have full access to BellSense.
        </div>
      )}
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">Account</h1>
      <div className="space-y-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="font-bold mb-1">BellSense Sensor</h2>
          <p className="text-[#9ca3af] text-sm mb-4">Lifetime access · Activated</p>
          <a
            href="https://apps.apple.com"
            className="inline-block bg-[#e5322d] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#cc2d28] transition-colors"
          >
            Download iOS App
          </a>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="font-bold mb-1">Programs</h2>
          <p className="text-[#9ca3af] text-sm mb-4">Access all 9 training programs</p>
          <a href="/programs" className="text-[#e5322d] text-sm font-medium hover:underline">
            Browse programs →
          </a>
        </div>
        <SignOutButton />
      </div>
    </div>
  )
}
