import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface ArticleMeta {
  title: string
  slug: string
  date: string
  description: string
}

function getArticles(): ArticleMeta[] {
  const dir = path.join(process.cwd(), 'content/articles')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf-8')
      const { data } = matter(raw)
      return data as ArticleMeta
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default function ArticlesPage() {
  const articles = getArticles()
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight mb-10">Articles</h1>
      <div className="space-y-4">
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`/articles/${a.slug}`}
            className="block bg-white/5 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors"
          >
            <h2 className="font-bold mb-1">{a.title}</h2>
            <p className="text-[#9ca3af] text-sm">{a.description}</p>
          </Link>
        ))}
        {articles.length === 0 && (
          <p className="text-[#9ca3af]">Articles coming soon.</p>
        )}
      </div>
    </div>
  )
}
