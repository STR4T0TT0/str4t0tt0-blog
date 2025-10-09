import { Fragment, useEffect, useMemo, useState } from 'react'

import { 
  Listbox, 
  ListboxButton, 
  ListboxOptions, 
  ListboxOption, 
  Transition 
} from '@headlessui/react'

import { ChevronDownIcon, CheckIcon, GlobeAltIcon } from '@heroicons/react/24/solid'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import i18n, { SUPPORTED, normLang } from '@/i18n'
import type { Lang } from '@/i18n'
import { getPostsByCategory } from '@/lib/getPostsByCategory';
import { getPostBySlug } from '@/lib/getPostBySlug';

type Option = { code: Lang; label: string }
const OPTIONS: Option[] = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'it', label: 'Italiano' },
];

function displayCode(code: string) {
  return code.split('-')[0].slice(0, 2).toUpperCase();
}

// Utilitaires de normalisation
function stripDatePrefix(s: string | undefined) {
  if (!s) return '';
  return s.replace(/^\d{4}-\d{2}-\d{2}-/, '');
}
function canonicalizeSlug(s: string | undefined) {
  if (!s) return '';
  return String(s).trim().toLowerCase().replace(/[^a-z0-9\- ]/g, '').replace(/\s+/g, '-');
}
function normalizeKey(meta: any, filenameSlug: string | undefined) {

// On travaille uniquement sur le front-matter.slug.
// fallback sur le nom de  sans date
  const fm = canonicalizeSlug(meta?.slug);
  if (fm) return fm;
  return canonicalizeSlug(stripDatePrefix(filenameSlug));
}

// Un peu lourd mais permet de gérer tous les URLs possibles
const internalFromSeo = {
  "cybersecurity": "cybersecurity",
  "artificial-intelligence": "ai",
  "cryptocurrency": "crypto",
} as const;

const seoFromCat = {
  cybersecurity: "cybersecurity",
  ai: "artificial-intelligence",
  crypto: "cryptocurrency",
} as const;

export default function LanguageSwitch() {
  const nav = useNavigate();
  const { pathname, search, hash } = useLocation();
  const { lang: raw, category,slug } = useParams();
  const current = useMemo<Lang>(() => normLang(raw), [raw]);
  const [selected, setSelected] = useState<Option>(OPTIONS.find(o => o.code === current) ?? OPTIONS[0]);
  // liens exacts par langue quand on est sur un article
  const [links, setLinks] = useState<Partial<Record<Lang, string>>>({});

  useEffect(() => {
    const normalized = normLang(raw);
    if (!(SUPPORTED as readonly string[]).includes(raw || '')) {
      const safe = buildTarget(normalized); 
      nav(safe, { replace: true });
      return;
    }
    setSelected(OPTIONS.find(o => o.code === normalized) ?? OPTIONS[0]);
    if (i18n.language !== normalized) i18n.changeLanguage(normalized);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [raw, pathname, search, hash]);

  // Liens pour les articles par langue 
  useEffect(() => {
    if (!slug || !category) { setLinks({}); return; }

    let cancelled = false;
    (async () => {

      // Lire la langue de l'article courant (utile si on arrive d'une langue non supportée)
      const currentLang = normLang(raw);
      const currentPost = await getPostBySlug(currentLang, slug);
      const targetKey = normalizeKey(currentPost?.meta, slug);

      // On utilise la catégorie interne et le slug SEO pour construire l'URL
      const internalCat = (globalThis as any).internalFromSeo
        ? (globalThis as any).internalFromSeo[category as any] ?? 'cybersecurity'
        : (() => {
            // fallback local si pas en scope 
            // aka ne pas modifier les defs existantes si elles sont déjà là
            const m: any = { cybersecurity: 'cybersecurity', 'artificial-intelligence': 'ai', cryptocurrency: 'crypto' };
            return m[category as any] ?? 'cybersecurity';
          })();
      const categorySeo = (globalThis as any).seoFromCat
        ? (globalThis as any).seoFromCat[internalCat as any] ?? category
        : (() => {
            const m: any = { cybersecurity: 'cybersecurity', ai: 'artificial-intelligence', crypto: 'cryptocurrency' };
            return m[internalCat as any] ?? category;
          })();

      // type pormise pour éviter TS2488/TS7053
      type LangLinkEntry = readonly [Lang, string | null];
      const entries: ReadonlyArray<LangLinkEntry> = await Promise.all(
        (SUPPORTED as readonly Lang[]).map(async (L): Promise<LangLinkEntry> => {
          const posts = await getPostsByCategory(L, internalCat as any);
          const match = posts.find((p: any) => normalizeKey(p.meta, p.slug) === targetKey);
          const url = match ? `/${L}/${categorySeo}/${match.slug}${search}${hash}` : null;
          return [L, url] as const;
        })
      );

      if (!cancelled) {
        const obj: Partial<Record<Lang, string>> = {};
        for (const [L, url] of entries) {
          if (url) obj[L] = url;
        }
        setLinks(obj);
      }

    })();
    return () => { cancelled = true; };
  }, [slug, category, search, hash]);

  // URL cible si article vs si pas article
  const buildTarget = (to: Lang) => {
    // Contexte article : on garde la category du chemin
    if (slug && category) {
      // Si article et si le lien existe pour la langue cible
      const url = links[to];
      if (url) return url;
      // sinon on masque; utile si une langue non définie est injectée dans l'URL
      const internalCat = internalFromSeo[category as keyof typeof internalFromSeo] ?? "cybersecurity";
      const categorySeo = seoFromCat[internalCat as keyof typeof seoFromCat] ?? category;
      return `/${to}/${categorySeo}/${slug}${search}${hash}`;

      }
    // Autres pages je remplace juste la langue
    const parts = pathname.split('/');
    if (parts.length > 1) parts[1] = to;
    return parts.join('/') + search + hash || `/${to}${search}${hash}`;
  };

  // Quand on change de langue
  useEffect(() => {
    localStorage.setItem('lang', selected.code);
    if (i18n.language !== selected.code) i18n.changeLanguage(selected.code);
    // On n'affiche que les langues disponibles 
    nav(buildTarget(selected.code), { replace: true });
  }, [selected]);

  // Page article : afficher que les langues qui ont un lien
  // Page non-article : afficher toutes les langues.
  const visibleOptions = (slug && category)
    ? OPTIONS.filter(o => !!links[o.code])
    : OPTIONS;

  return (
    <Listbox value={selected} onChange={setSelected} as="div" className="relative">

      <ListboxButton className="inline-flex items-center rounded-md border border-white/15 bg-white/5 hover:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red">
        <span className="md:hidden inline-flex h-10 w-10 items-center justify-center">
          {selected.code === 'en'
            ? <GlobeAltIcon className="h-5 w-5 opacity-80" />
            : <span className="text-xs font-semibold tracking-wide px-1.5 py-0.5 rounded border border-white/15 bg-white/10">
                {displayCode(selected.code)}
              </span>
          }
          <span className="sr-only">{`Change language (current: ${selected.label})`}</span>
        </span>
        <span className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 text-sm">
          <GlobeAltIcon className="h-4 w-4 opacity-80" />
          <span className="text-left">{selected.label}</span>
          <ChevronDownIcon className="h-4 w-4 opacity-70" />
        </span>
      </ListboxButton>

      <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-75" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
        {/* Menu déroulant */}
        <ListboxOptions className="absolute right-0 z-50 mt-2 w-48 rounded-xl bg-black/90 backdrop-blur ring-1 ring-white/15 shadow-xl p-1 text-sm text-white focus:outline-none">
          {visibleOptions.map(opt => {
            const disabled = false;
            return (
              <ListboxOption
                key={opt.code}
                value={opt}
                disabled={disabled}
                className={[
                  "group flex items-center justify-between px-3 py-2.5 rounded-lg",
                  disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer ui-active:bg-white/10 ui-selected:font-semibold"
                ].join(" ")}
              >
                <span className="truncate">{opt.label}</span>
                <CheckIcon className="hidden ui-selected:block h-4 w-4 text-brand-red opacity-90" />
              </ListboxOption>
            );
          })}
        </ListboxOptions>
      </Transition>
    </Listbox>
  );
}