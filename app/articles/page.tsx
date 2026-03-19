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

const ARTICLE_ORDER = [
  'philosophy',
  'warning-this-will-make-you-work-harder',
  'the-pause-button-is-your-friend',
  'how-to-get-a-good-score',
  'why-interval-training',
  'full-body-tension',
  'strength-the-bellsense-way',
  'workout-stack-overview',
  'workout-stack-breathing',
  'workout-stack-abs',
  'workout-stack-ballistics',
  'workout-stack-strength',
  'workout-stack-cooldown',
  'taking-care-of-your-hands',
]

function getArticles(): ArticleMeta[] {
  const dir = path.join(process.cwd(), 'content/articles')
  if (!fs.existsSync(dir)) return []
  const articles = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf-8')
      const { data } = matter(raw)
      return data as ArticleMeta
    })
  return articles.sort((a, b) => {
    const ai = ARTICLE_ORDER.indexOf(a.slug)
    const bi = ARTICLE_ORDER.indexOf(b.slug)
    if (ai === -1 && bi === -1) return 0
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })
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
