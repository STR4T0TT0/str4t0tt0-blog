// éviter de répéter la même construction d’URL dans plusieurs 
// composants à venir comme FeaturedPost, RelatedPosts...
export const ROUTES = {
  home: (lang: string) => `/${lang}`,
  about: (lang: string) => `/${lang}/about`,
  specimen: (lang: string) => `/${lang}/specimen`,

  // catégorie SEO directe sous /:lang (ex: /en/cybersecurity)
  category: (lang: string, categorySeo: string) => `/${lang}/${categorySeo}`,

  // article sous /:lang/:category/:slug
  post: (lang: string, categorySeo: string, slug: string) =>
    `/${lang}/${categorySeo}/${slug}`,
} as const;