import { createBrowserRouter, Navigate, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import i18n, { normLang, SUPPORTED, type Lang } from '../i18n'
import Home from '../views/home'
import Header from '../components/nav/Header'
import TypoSpecimen from '../views/TypoSpecimen' 
// pages uniques, voir plus loin dans le code pour la modification de la route
import AboutPage from '../views/AboutPage'
import CategoryView from '../views/CategoryView'

function LangGuardLayout() {
  const { pathname, search, hash } = useLocation()
  const nav = useNavigate()
  const { lang: raw } = useParams()
  const lang = normLang(raw)
  

  // redirige /, /de, /xx → /en (ou /fr / it si valide)
  if (!raw || !(SUPPORTED as readonly string[]).includes(raw)) {
    const parts = pathname.split('/')
    parts[1] = lang
    const safe = parts.join('/') || `/${lang}`
    // évite boucles d'historique
    nav(safe + search + hash, { replace: true })
    return null
  }

  // sync i18n avec l'URL
  if (i18n.language !== lang) i18n.changeLanguage(lang as Lang)

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/en" replace /> },
  {
    path: '/:lang',
    element: <LangGuardLayout />,
    children: [
      { index: true, element: <Home /> },
      // ajouter ici les pages uniques comme pour la page about
      { path: 'about', element: <AboutPage /> },
      { path: 'specimen', element: <TypoSpecimen /> },  // page orpheline pour tests typo
      { path: ':category', element: <CategoryView /> }, // navigation en /langue/categorie
      // { path: 'article/:slug', element: <Article /> }, // plus tard
    ]
  },
  // catch-all → /en
  { path: '*', element: <Navigate to="/en" replace /> }
])