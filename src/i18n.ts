import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Imports statiques verifier les fichiers ici 
import en_common from './languages/en/common.json'
import en_home from './languages/en/home.json'
import en_blog from './languages/en/blog.json'
import en_footer from './languages/en/footer.json'
import en_menu from './languages/en/menu.json'
import en_tags from './languages/en/tags.json'

import fr_common from './languages/fr/common.json'
import fr_home from './languages/fr/home.json'
import fr_blog from './languages/fr/blog.json'
import fr_footer from './languages/fr/footer.json'
import fr_menu from './languages/fr/menu.json'
import fr_tags from './languages/fr/tags.json'

import it_common from './languages/it/common.json'
import it_home from './languages/it/home.json'
import it_blog from './languages/it/blog.json'
import it_footer from './languages/it/footer.json'
import it_menu from './languages/it/menu.json'
import it_tags from './languages/it/tags.json'

export const SUPPORTED = ['en','fr','it'] as const
export type Lang = typeof SUPPORTED[number]

export function normLang(l?: string): Lang {
  const code = (l || 'en').slice(0,2).toLowerCase()
  return (SUPPORTED as readonly string[]).includes(code) ? (code as Lang) : 'en'
}

export function initialLang(): Lang {
  const saved = localStorage.getItem('lang')
  if (saved) return normLang(saved)
  return normLang(navigator.language)
}

i18n
  .use(initReactI18next)
  .init({
    lng: initialLang(),
    fallbackLng: 'en',
    ns: ['common','home','blog','footer','menu','tags'], // namespaces à mettre a jour a chaque ajout de JSON
    defaultNS: 'common',
    resources: {
      // Ajout de langues, mettre à jour aussi OPTIONS dans LanguageSwitch.tsx
      // ne pas oublier de vérifier existence des fichiers JSON par langues ici
      en: { common: en_common, home: en_home, blog: en_blog, footer: en_footer, menu: en_menu, tags: en_tags },
      fr: { common: fr_common, home: fr_home, blog: fr_blog, footer: fr_footer, menu: fr_menu, tags: fr_tags },
      it: { common: it_common, home: it_home, blog: it_blog, footer: it_footer, menu: it_menu, tags: it_tags }
    },
    interpolation: { escapeValue: false }
  })

export default i18n