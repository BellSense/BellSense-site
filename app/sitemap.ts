import type { MetadataRoute } from 'next'

const base = 'https://bellsense.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/buy`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/programs`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/articles`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/faq`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
