import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getAdminAuth } from '@/lib/firebase-admin'

export async function POST(req: NextRequest) {
  const { idToken } = await req.json()
  if (!idToken) return NextResponse.json({ error: 'Missing idToken' }, { status: 401 })

  let uid: string
  try {
    const adminAuth = await getAdminAuth()
    const decoded = await adminAuth.verifyIdToken(idToken)
    uid = decoded.uid
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: 9900, // $99.00 — update to real price
          product_data: {
            name: 'BellSense Sensor',
            description: 'Kettlebell-mounted IMU sensor + iOS app lifetime access',
          },
        },
        quantity: 1,
      },
    ],
    metadata: { firebaseUID: uid },
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/account?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/buy`,
  })

  return NextResponse.json({ url: session.url })
}
