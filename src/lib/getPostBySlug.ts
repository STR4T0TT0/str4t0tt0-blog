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

function toSlug(input: string) {
  return input
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\- ]/g, '')
    .replace(/\s+/g, '-')
}

export async function getPostBySlug(lang: Lang, slug?: string) {
  if (!slug) return null
  const modules = globs[lang]

  for (const [path, mod] of Object.entries(modules)) {
    const m = mod as PostModule
    if (!m?.default) continue

    const data = (m as any).frontmatter || {}
    const candidate =
      (data?.slug && toSlug(data.slug)) ||
      (data?.title && toSlug(data.title)) ||
      path.split('/').pop()!.replace(/\.mdx?$/, '')

    if (candidate === slug) {
        return {
        meta: data,
        Component: m.default,
        path,
        slug: candidate,
      }
    }
  }

  return null
}