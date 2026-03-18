import { NextRequest, NextResponse } from 'next/server'
import { createSessionCookie, clearSessionCookie } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { idToken } = await req.json()
  if (!idToken) return NextResponse.json({ error: 'Missing idToken' }, { status: 400 })
  await createSessionCookie(idToken)
  return NextResponse.json({ status: 'ok' })
}

export async function DELETE() {
  await clearSessionCookie()
  return NextResponse.json({ status: 'ok' })
}
