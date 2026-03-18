'use client'
import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="border-b border-white/10 bg-[#111111]">
      <div className="mx-auto max-w-5xl px-4 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#e5322d] rounded-md" />
          <span className="font-bold text-[#f0f0f0] tracking-tight">BellSense</span>
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/articles" className="text-[#9ca3af] hover:text-[#f0f0f0] transition-colors">Articles</Link>
          <Link href="/faq" className="text-[#9ca3af] hover:text-[#f0f0f0] transition-colors">FAQ</Link>
          <Link href="/buy" className="bg-[#e5322d] text-white px-3 py-1.5 rounded-md font-medium hover:bg-[#cc2d28] transition-colors">Get BellSense</Link>
        </div>
      </div>
    </nav>
  )
}
