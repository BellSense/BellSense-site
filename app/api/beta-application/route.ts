import { NextRequest, NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase-admin'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, experience, style, notes } = body

    if (!name?.trim() || !email?.trim() || !experience || !style) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const db = await getAdminDb()
    await db.collection('betaApplications').add({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      experience,
      style,
      notes: notes?.trim() || '',
      submittedAt: new Date(),
      status: 'pending',
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Beta application error:', err)
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
  }
}
