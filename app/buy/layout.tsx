import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get BellSense — One-Time Purchase, No Subscription',
  description: 'BellSense sensor + lifetime iOS app access. Seven exercises tracked. Real-time rep quality feedback.',
}

export default function BuyLayout({ children }: { children: React.ReactNode }) {
  return children
}
