type Lang = 'en' | 'fr' | 'it'

type PostModule = {
  default: React.ComponentType
  frontmatter?: Record<string, any>
}

const globs: Record<Lang, Record<string, unknown>> = {
  en: import.meta.glob('/src/content/en/posts/**/*.{md,mdx}', { eager: true }),
  fr: import.meta.glob('/src/content/fr/posts/**/*.{md,mdx}', { eager: true }),
  it: import.meta.glob('/src/content/it/posts/**/*.{md,mdx}', { eager: true }),
}

export async function loadPosts(lang: Lang) {
  const modules = globs[lang]
  const posts: any[] = []
  const PLACEHOLDER = '/content/shared/image-str4t0tt0-fallback-neutral-lg.webp'

  for (const [path, mod] of Object.entries(modules)) {
    const m = mod as PostModule
    if (!m?.default) continue

    const data = (m as any).frontmatter || {}

    const safeTitle = (data?.title ?? '').toString().trim() || '(untitled)'
    const safeSlug =
      (data?.slug ?? '')
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\- ]/g, '')
        .replace(/\s+/g, '-') ||
      safeTitle.toLowerCase().replace(/\s+/g, '-')

    const safeDate = (() => {
      const d = data?.date ? new Date(data.date) : new Date()
      return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString()
    })()

    const safeExcerpt = (data?.excerpt ?? '').toString()
    const safeImage = (() => {
      const img = (data?.image ?? '').toString().trim()
      return img !== '' ? img : PLACEHOLDER
    })()

    posts.push({
      title: safeTitle,
      slug: safeSlug,
      date: safeDate,
      category: data?.category,
      tags: Array.isArray(data?.tags) ? data.tags : [],
      excerpt: safeExcerpt,
      image: safeImage,
      draft: !!data?.draft,
      lang,
      path,
      // bonus : on garde le composant pour un rendu “full article” si besoin
      Component: m.default,
      meta: data,
    })
  }

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return posts
}