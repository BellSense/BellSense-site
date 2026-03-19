import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In — BellSense',
  description: 'Sign in to your BellSense account to access training programs and your purchase.',
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children
}
