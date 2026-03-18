import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'content/programs')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => ({ slug: f.replace('.mdx', '') }))
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const session = await getSession()
  if (!session || !session.hasPurchased) redirect('/buy')
  const { slug } = await params
  const filePath = path.join(process.cwd(), 'content/programs', `${slug}.mdx`)
  if (!fs.existsSync(filePath)) notFound()
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { content, data } = matter(raw)
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="flex items-center gap-2 text-sm text-[#9ca3af] mb-4">
        <a href="/programs" className="hover:text-[#f0f0f0]">Programs</a>
        <span>/</span>
        <span>{data.title}</span>
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight mb-2">{data.title}</h1>
      <div className="flex gap-3 text-sm text-[#9ca3af] mb-10">
        <span>{data.difficulty}</span>
        <span>·</span>
        <span>{data.weeks} weeks</span>
        <span>·</span>
        <span>{data.sessionsPerWeek}×/week</span>
        <span>·</span>
        <span>{data.archetype}</span>
      </div>
      {content.trim() ? (
        <article className="prose prose-invert prose-sm max-w-none">
          <MDXRemote source={content} />
        </article>
      ) : (
        <p className="text-[#9ca3af]">Full program detail coming soon.</p>
      )}
    </div>
  )
}
