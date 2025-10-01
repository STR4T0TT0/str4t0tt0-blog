import type { MDXContent } from 'mdx/types'

export type Lang = 'en' | 'fr' | 'it'

export type PageFront = {
  id: string          // ex: "about"
  slug: string        // ex: "about"
  lang: Lang          // "en" | "fr" | "it"
  title: string
  description?: string
  updated?: string
  cover?: string
}

type MdxModule = {
  default: MDXContent
  frontmatter?: Partial<PageFront> // ← tolérant: le FM peut manquer
}

/* ---------- Glob tolérant ----------
   - Vite accepte plusieurs import.meta.glob ; on fusionne les résultats.
   - Cas 1: /content à la racine du projet
   - Cas 2: /src/content (certains templates rangent le contenu sous /src)
*/
const modulesRoot = import.meta.glob('/content/**/*.mdx', { eager: true }) as Record<string, MdxModule>
const modulesSrc  = import.meta.glob('/src/content/**/*.mdx', { eager: true }) as Record<string, MdxModule>
const modules: Record<string, MdxModule> = { ...modulesRoot, ...modulesSrc }

export type Page = PageFront & { Component: MDXContent; path: string }

// Normalisations
const normalizeId = (v?: unknown) => String(v ?? '').trim().toLowerCase()
const normalizeSlug = (slug?: unknown, id?: string) => {
  const s = String(slug ?? '').trim()
  if (s) return s
  if (id) return id
  return 'about'
}
const normalizeLang = (v?: unknown): Lang => {
  const raw = String(v ?? 'en').slice(0, 2).toLowerCase()
  return (['en', 'fr', 'it'] as const).includes(raw as Lang) ? (raw as Lang) : 'en'
}
const normalizeTitle = (v?: unknown) => {
  const t = String(v ?? '').trim()
  return t || 'Untitled'
}

// Construit la liste des pages
export const allPages: Page[] = Object.entries(modules).map(([path, mod]) => {
  const fm = mod.frontmatter ?? {}
  const id = normalizeId(fm.id)
  const lang = normalizeLang(fm.lang)
  const slug = normalizeSlug(fm.slug, id)
  const title = normalizeTitle(fm.title)

  return {
    id,
    slug,
    lang,
    title,
    description: fm.description,
    updated: fm.updated,
    cover: fm.cover,
    Component: mod.default,
    path,
  }
})

/** Récupère la page ABOUT pour une langue donnée */
export function getAbout(lang: Lang) {
  return allPages.find((p) => p.id === 'about' && p.lang === lang)
}

/** Liste les traductions disponibles pour un id (ex: "about") */
export function getTranslations(id: string) {
  const needle = id.trim().toLowerCase()
  return allPages
    .filter((p) => p.id === needle)
    .map((p) => ({ lang: p.lang, slug: p.slug }))
}

// DEBUG 
if (import.meta.env.DEV) {
  const matched = Object.keys(modules)
  // Logs compacts
  // eslint-disable-next-line no-console
  console.log('[content] matched mdx:', matched.length ? matched : '(none)')
  // eslint-disable-next-line no-console
  console.log('[content] pages:', allPages.map((p) => ({ id: p.id, lang: p.lang, slug: p.slug })))

  if (!matched.length) {
    // eslint-disable-next-line no-console
    console.warn(
      '[content] No MDX files matched. Check that your content is in /content/** or /src/content/** and that Vite root is the project root.'
    )
  }
}