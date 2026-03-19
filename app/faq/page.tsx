import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ — BellSense',
  description: 'Common questions about the BellSense sensor, iOS app, compatible exercises, and pricing.',
}

const faqs = [
  {
    q: 'What exercises does BellSense track?',
    a: 'Seven exercises: hardstyle swing, snatch, clean, goblet squat, 1-arm row, overhead press, and Turkish get-up.',
  },
  {
    q: 'Do I need a subscription?',
    a: 'No. BellSense is a one-time purchase. The sensor and iOS app are included with no recurring fees.',
  },
  {
    q: 'What kettlebells are compatible?',
    a: 'BellSense mounts beneath the kettlebell handle. No modifications required.',
  },
  {
    q: 'Does it work without the sensor?',
    a: 'No. The hardware sensor is required for rep counting and quality scoring.',
  },
  {
    q: 'What iPhone is required?',
    a: 'Any iPhone running iOS 16 or later with Bluetooth support.',
  },
  {
    q: 'How accurate is the rep counting?',
    a: 'BellSense uses a 208 Hz IMU with signal processing tuned to eliminate false positives. Expect sub-1% error on validated exercises.',
  },
  {
    q: 'Can I use it for heart rate monitoring?',
    a: 'The iOS app supports any Bluetooth heart rate monitor. The BellSense sensor itself does not include heart rate hardware.',
  },
  {
    q: 'How do I contact support?',
    a: 'Email support@bellsense.app. We typically respond within 24 hours.',
  },
]

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight mb-10">FAQ</h1>
      <div className="space-y-4">
        {faqs.map((f) => (
          <div key={f.q} className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h2 className="font-bold mb-2">{f.q}</h2>
            <p className="text-[#9ca3af] text-sm leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
