import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-32 text-center">
      <p className="text-[#e5322d] text-xs font-bold uppercase tracking-widest mb-4">404</p>
      <h1 className="text-4xl font-extrabold tracking-tight mb-4">Page not found</h1>
      <p className="text-[#9ca3af] mb-8">This page doesn&apos;t exist or has been moved.</p>
      <Link
        href="/"
        className="inline-block bg-[#e5322d] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#cc2d28] transition-colors"
      >
        Back to home
      </Link>
    </div>
  )
}
