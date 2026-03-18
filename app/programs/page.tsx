import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
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
  if (!session || !session.hasPurchased) redirect('/buy')
  const programs = getPrograms()
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight mb-2">Programs</h1>
      <p className="text-[#9ca3af] mb-10">8 programs across 4 archetypes. All included with your purchase.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {programs.map((p) => (
          <Link
            key={p.slug}
            href={`/programs/${p.slug}`}
            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#9ca3af] uppercase tracking-wider">{p.difficulty}</span>
              <span className="text-xs text-[#9ca3af]">{p.weeks}wk · {p.sessionsPerWeek}×/wk</span>
            </div>
            <h2 className="font-bold mb-1">{p.title}</h2>
            <p className="text-[#9ca3af] text-sm">{p.bestFor}</p>
          </Link>
        ))}
        {programs.length === 0 && <p className="text-[#9ca3af]">Programs coming soon.</p>}
      </div>
    </div>
  )
}
