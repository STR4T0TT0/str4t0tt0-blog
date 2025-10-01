import Header from './components/Header'
import { useTranslation } from 'react-i18next'

export default function App() {
  const { t } = useTranslation()
  return (
    <div className="min-h-dvh bg-brand-bg text-brand-fg">
      <Header />
      <main className="mx-auto max-w-screen-sm p-4">
        <h1 className="text-2xl font-display mb-2">{t('welcome')}</h1>
        <p className="text-sm opacity-80">{t('info')}</p>
      </main>
    </div>
  )
}