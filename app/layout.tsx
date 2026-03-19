import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const baseUrl = 'https://bellsense.app'

export const metadata: Metadata = {
  title: 'BellSense — Kettlebell Training Feedback',
  description: 'Real-time rep counting and quality scoring for kettlebell training.',
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: "BellSense — The sensor doesn't lie.",
    description: 'Real-time rep counting and quality scoring. No junk reps.',
    url: baseUrl,
    siteName: 'BellSense',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'BellSense — The sensor doesn\'t lie.' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "BellSense — The sensor doesn't lie.",
    description: 'Real-time rep counting and quality scoring. No junk reps.',
    images: ['/api/og'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${GeistSans.variable}`}>
      <body className="font-sans bg-[#111111] text-[#f0f0f0] min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
