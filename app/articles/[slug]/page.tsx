import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'content/articles')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => ({ slug: f.replace('.mdx', '') }))
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const filePath = path.join(process.cwd(), 'content/articles', `${slug}.mdx`)
  if (!fs.existsSync(filePath)) notFound()
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { content, data } = matter(raw)
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight mb-2">{data.title}</h1>
      <p className="text-[#9ca3af] text-sm mb-10">{data.date}</p>
      <article className="prose prose-invert prose-sm max-w-none">
        <MDXRemote source={content} />
      </article>
    </div>
  )
}
