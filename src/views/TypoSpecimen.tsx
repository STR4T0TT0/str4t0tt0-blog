import { useTranslation } from 'react-i18next'

export default function TypoSpecimen() {
  const { t } = useTranslation('common')

  const samples = [
    { cls: 'font-str4t0tt0-orbitron', label: 'Orbitron' },
    { cls: 'font-str4t0tt0-roboto', label: 'Roboto' },
    { cls: 'font-str4t0tt0-prag', label: 'Pragmatica' },
  ]

  return (
    <main className="mx-auto max-w-screen-sm p-4 space-y-8">
      <h1 className="text-2xl font-str4t0tt0-orbitron mb-6">
        {t('info')} · Typo Specimen
      </h1>

      {samples.map(s => (
        <section key={s.cls} className="space-y-2">
          <h2 className="text-lg font-bold text-str4t0tt0-primary">{s.label}</h2>
          <p className={`${s.cls} text-base`}>
            Normal 400 — Portez un whisky à ce juge blond qui fume!
          </p>
          <p className={`${s.cls} text-medium font-medium`}>
            Medium 500 — Portez un whisky à ce juge blond qui fume!
          </p>
          <p className={`${s.cls} text-bold font-bold`}>
            Bold 700 — Portez un whisky à ce juge blond qui fume!
          </p>
          <p className={`${s.cls} italic`}>
            Italic — Accents é è à ò ù î ü ç
          </p>
        </section>
      ))}
    </main>
  )
}