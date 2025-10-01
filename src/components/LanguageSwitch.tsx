import { Fragment, useEffect, useMemo, useState } from 'react'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Transition } from '@headlessui/react'
import { ChevronDownIcon, CheckIcon, GlobeAltIcon } from '@heroicons/react/24/solid'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import i18n, { SUPPORTED, normLang } from '../i18n'
import type { Lang } from '../i18n'

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
  const { lang: raw } = useParams()
  const current = useMemo<Lang>(() => normLang(raw), [raw])
  const [selected, setSelected] = useState<Option>(
    OPTIONS.find(o => o.code === current) ?? OPTIONS[0]
  )

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

        <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-75" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
          <ListboxOptions className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-md border border-brand-line bg-brand-card shadow-lg focus:outline-none">
            {OPTIONS.map(opt => (
              <ListboxOption key={opt.code} value={opt} className="cursor-pointer px-3 py-2 text-sm hover:bg-white/5 ui-active:bg-white/5">
                <div className="flex items-center justify-between">
                  <span className="truncate">{opt.label}</span>
                  <CheckIcon className="ui-selected:block hidden h-4 w-4 text-brand-red" />
                </div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
    </Listbox>
  )
}