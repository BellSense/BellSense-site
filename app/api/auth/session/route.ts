import { NextRequest, NextResponse } from 'next/server'
import { createSessionCookie, clearSessionCookie, getSession } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json()
    if (!idToken) return NextResponse.json({ error: 'Missing idToken' }, { status: 400 })
    await createSessionCookie(idToken)
    // Return hasPurchased so the client can route returning buyers to /account
    // instead of always pushing them into Stripe checkout.
    const session = await getSession()
    return NextResponse.json({ status: 'ok', hasPurchased: session?.hasPurchased ?? false })
  } catch (err) {
    console.error('[session] POST error:', err)
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE() {
  await clearSessionCookie()
  return NextResponse.json({ status: 'ok' })
}
