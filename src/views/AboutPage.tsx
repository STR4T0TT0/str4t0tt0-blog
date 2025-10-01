import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { getAbout, getTranslations, type Lang } from '@/content/pages'
import { normLang } from '@/i18n'

//debug
//console.log("AboutPage mounted")

export default function AboutPage() {
  const { lang: raw } = useParams()
  const lang = useMemo(() => normLang(raw) as Lang, [raw])

  const page = getAbout(lang)
  if (!page) return <main className="p-6">Not found</main>

  // SEO à revoir plus tard
  useEffect(() => {
    document.title = page.title
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', page.description ?? page.title)
  }, [page.title, page.description])

  const Component = page.Component
  const versions = getTranslations('about')

  return (
    <main className="mx-auto max-w-2xl px-4 py-6 sm:py-8">
      <article>
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{page.title}</h1>
          {page.description && <p className="mt-2 opacity-80">{page.description}</p>}
        </header>

        <div className="prose prose-invert">
          <Component />
        </div>

        {page.updated && (
          <p className="mt-6 text-sm opacity-70">
            {new Date(page.updated).toLocaleDateString()}
          </p>
        )}
      </article>

      {/* je garde ? switch de langue  */}
      <nav className="mt-6 flex gap-3 text-sm opacity-80">
        {versions.map(v => (
          <a key={v.lang} href={`/${v.lang}/${page.slug}`} className="underline">
            {v.lang.toUpperCase()}
          </a>
        ))}
      </nav>
    </main>
  )
}