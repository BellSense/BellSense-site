import { getSession } from '@/lib/auth'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

interface ProgramMeta {
  title: string
  slug: string
  difficulty: string
  weeks: number
  sessionsPerWeek: number
  archetype: string
  bestFor: string
}

function getPrograms(): ProgramMeta[] {
  const dir = path.join(process.cwd(), 'content/programs')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf-8')
      const { data } = matter(raw)
      return data as ProgramMeta
    })
}

export default async function ProgramsPage() {
  const session = await getSession()
  const hasPurchased = session?.hasPurchased ?? false
  const programs = getPrograms()

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight mb-2">Programs</h1>
      <p className="text-[#9ca3af] mb-10">8 programs across 4 archetypes. All included with your purchase.</p>

      {!hasPurchased && (
        <div className="bg-[#e5322d]/10 border border-[#e5322d]/30 rounded-xl px-6 py-4 mb-8 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm text-[#f0f0f0]">
            Full program access is included with your BellSense purchase.
          </p>
          <div className="flex gap-3 text-sm shrink-0">
            <Link href="/login" className="text-[#9ca3af] hover:text-[#f0f0f0] transition-colors">
              Sign in
            </Link>
            <Link href="/buy" className="bg-[#e5322d] text-white px-4 py-1.5 rounded-md font-medium hover:bg-[#cc2d28] transition-colors">
              Get BellSense
            </Link>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {programs.map((p) => {
          const cardContent = (
            <>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#9ca3af] uppercase tracking-wider">{p.difficulty}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#9ca3af]">{p.weeks}wk · {p.sessionsPerWeek}×/wk</span>
                  {!hasPurchased && (
                    <span className="text-[#9ca3af] text-xs">🔒</span>
                  )}
                </div>
              </div>
              <h2 className="font-bold mb-1 group-hover:text-white transition-colors">{p.title}</h2>
              <p className="text-[#9ca3af] text-sm">{p.bestFor}</p>
            </>
          )

          if (hasPurchased) {
            return (
              <Link
                key={p.slug}
                href={`/programs/${p.slug}`}
                className="group bg-white/5 border border-white/10 border-l-2 border-l-white/10 rounded-xl p-6 hover:border-l-[#e5322d] hover:bg-white/[0.07] transition-all duration-200"
              >
                {cardContent}
              </Link>
            )
          }

          return (
            <div
              key={p.slug}
              className="bg-white/5 border border-white/10 rounded-xl p-6 opacity-60 cursor-not-allowed"
            >
              {cardContent}
            </div>
          )
        })}
        {programs.length === 0 && <p className="text-[#9ca3af]">Programs coming soon.</p>}
      </div>
    </div>
  )
}
