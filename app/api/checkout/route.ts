import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getAdminAuth, getAdminDb } from '@/lib/firebase-admin'

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

  // Inventory cap — count confirmed purchases before creating a session
  const BETA_INVENTORY_LIMIT = 20
  const adminDb = await getAdminDb()
  const purchasedSnap = await adminDb
    .collection('users')
    .where('hasPurchased', '==', true)
    .count()
    .get()
  if (purchasedSnap.data().count >= BETA_INVENTORY_LIMIT) {
    return NextResponse.json({ error: 'sold_out' }, { status: 409 })
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price: 'price_1TEwAfRxwufIF74IPe8ZrEPa', // $60 beta price
        quantity: 1,
      },
    ],
    shipping_address_collection: { allowed_countries: ['US'] },
    phone_number_collection: { enabled: true },
    metadata: { firebaseUID: uid },
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/account?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/buy`,
  })

  return NextResponse.json({ url: session.url })
}
