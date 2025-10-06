import { Fragment, useEffect, useMemo, useState } from 'react'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Transition } from '@headlessui/react'
import { ChevronDownIcon, CheckIcon, GlobeAltIcon } from '@heroicons/react/24/solid'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import i18n, { SUPPORTED, normLang } from '../../i18n'
import type { Lang } from '../../i18n'
import { getPostBySlug } from '@/lib/getPostsBySlug'


// Langues disponibles: vérifier correspondance avec déclaration des ressources dans i18n.ts
type Option = { code: Lang; label: string }
const OPTIONS: Option[] = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'it', label: 'Italiano' },
]

// Affiche le code pays
function displayCode(code: string) {
  return code.split('-')[0].slice(0, 2).toUpperCase();
}

function replaceLangInUrl(pathname: string, to: Lang): string {
  const parts = pathname.split('/')
  parts[1] = to
  return parts.join('/') || `/${to}`
}

export default function LanguageSwitch() {
  const nav = useNavigate()
  const { pathname, search, hash } = useLocation()
  const { lang: raw, slug } = useParams()   // Ici je récup le slug de la page article
  const current = useMemo<Lang>(() => normLang(raw), [raw])
  const [selected, setSelected] = useState<Option>(
    OPTIONS.find(o => o.code === current) ?? OPTIONS[0]
  )
  // Dispo par langue uniquement sur la vue article
  const [avail, setAvail] = useState<Partial<Record<Lang, boolean>>>({})

  // sync sur changement d'URL
  useEffect(() => {
    const normalized = normLang(raw)
    if (!(SUPPORTED as readonly string[]).includes(raw || '')) {
      const safe = replaceLangInUrl(pathname, normalized)
      nav(safe + search + hash, { replace: true })
      return
    }
    setSelected(OPTIONS.find(o => o.code === normalized) ?? OPTIONS[0])
    if (i18n.language !== normalized) i18n.changeLanguage(normalized)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raw, pathname, search, hash])

  // Détection de la disponibilité par langue sur un article
  useEffect(() => {
    if (!slug) { setAvail({}); return; } // pas d’article pas de désactivation
    let cancelled = false
    ;(async () => {
      const entries = await Promise.all(
        (SUPPORTED as readonly Lang[]).map(async (L) => {
          const res = await getPostBySlug(L, slug!)
          return [L, !!res] as const
        })
      )
      if (!cancelled) setAvail(Object.fromEntries(entries))
    })()
    return () => { cancelled = true }
  }, [slug])

  // changement utilisateur
  useEffect(() => {
    localStorage.setItem('lang', selected.code)
    if (i18n.language !== selected.code) i18n.changeLanguage(selected.code)
    const next = replaceLangInUrl(pathname, selected.code) + search + hash
    nav(next, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  return (
    <Listbox value={selected} onChange={setSelected} as="div" className="relative">

<ListboxButton className="inline-flex items-center rounded-md border border-brand-line bg-brand-card hover:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red">
  {/* Mobile icone ou code langue si pas anglais*/}
  <span className="md:hidden inline-flex h-10 w-10 items-center justify-center">
    {selected.code === 'en' ? (
      <GlobeAltIcon className="h-5 w-5 opacity-80" />
    ) : (
      <span className="text-xs font-semibold tracking-wide px-1.5 py-0.5 rounded border border-brand-line bg-white/10">
        {displayCode(selected.code)}
      </span>
    )}
    <span className="sr-only">{`Change language (current: ${selected.label})`}</span>
  </span>

  {/* Tablette et desktop on affiche la langue en clair avec icone*/}
  <span className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 text-sm">
    <GlobeAltIcon className="h-4 w-4 opacity-80" />
    <span className="text-left">{selected.label}</span>
    <ChevronDownIcon className="h-4 w-4 opacity-70" />
  </span>
</ListboxButton>
  <Transition 
    as={Fragment} enter="transition ease-out duration-100" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-75" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
    <ListboxOptions
          className="absolute right-0 z-50 mt-2 w-48 rounded-xl bg-black/90 backdrop-blur
                      ring-1 ring-white/15 shadow-xl p-1 text-sm text-white focus:outline-none"
        >
          
          {OPTIONS.map(opt => {
            const isDisabled = avail[opt.code] === false  // si seulement si on est sur une page article
            return (
              <ListboxOption
                key={opt.code}
                value={opt}
                disabled={isDisabled}
                className={[
                  "group flex items-center justify-between px-3 py-2.5 rounded-lg",
                  isDisabled
                    ? "opacity-40 cursor-not-allowed"
                    : "cursor-pointer ui-active:bg-white/10 ui-selected:font-semibold"
                ].join(" ")}
              >
                <span className="truncate">{opt.label}</span>
                <CheckIcon className="hidden ui-selected:block h-4 w-4 text-brand-red opacity-90" />
              </ListboxOption>
            )
          })}
      </ListboxOptions>
  </Transition>
    </Listbox>
  )
}