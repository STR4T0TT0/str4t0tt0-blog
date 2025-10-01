import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

export default function Home() {
  const { t } = useTranslation(['home','common'])
  const { lang = 'en' } = useParams()

  return (
    <main className="mx-auto max-w-screen-sm p-4 space-y-4">
      <h1 className="text-2xl font-display mb-2">{t('home:welcome')}</h1>
      <p className="opacity-80">{t('home:subtitle')}</p>

      {/* 🔗 Lien debug specimen */}
      <div className="mt-6">
        <Link
          to={`/${lang}/specimen`}
          className="inline-block rounded bg-neutral-900 px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800 hover:text-red-700"
        >
          👉 Debug Typo Specimen
        </Link>
      </div>
    </main>
  )
}