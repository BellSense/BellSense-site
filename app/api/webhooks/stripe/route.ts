import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getAdminDb } from '@/lib/firebase-admin'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: import('stripe').Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as import('stripe').Stripe.Checkout.Session
    const uid = session.metadata?.firebaseUID
    if (uid) {
      const { FieldValue } = await import('firebase-admin/firestore')
      const adminDb = await getAdminDb()
      await adminDb.collection('users').doc(uid).set(
        {
          hasPurchased: true,
          purchasedAt: FieldValue.serverTimestamp(),
          stripeCustomerId: session.customer,
        },
        { merge: true }
      )
    }
  }

  return NextResponse.json({ received: true })
}
