import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-auto">
      <div className="mx-auto max-w-5xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#9ca3af]">
        <span>© 2026 BellSense. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="hover:text-[#f0f0f0] transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-[#f0f0f0] transition-colors">Terms</Link>
          <a href="mailto:support@bellsense.app" className="hover:text-[#f0f0f0] transition-colors">Support</a>
        </div>
      </div>
    </footer>
  )
}
