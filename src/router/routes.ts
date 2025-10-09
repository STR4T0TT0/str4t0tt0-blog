// éviter de répéter la même construction d’URL dans plusieurs 
// composants à venir comme FeaturedPost, RelatedPosts...

// pour retouner des URLs compréhensibles
const seoFromCat = {
  cybersecurity: "cybersecurity",
  ai: "artificial-intelligence",
  crypto: "cryptocurrency",
 } as const;

function toCategorySeo(input: string) {
 return seoFromCat[input as keyof typeof seoFromCat] ?? input;
 }

export const ROUTES = {
  home: (lang: string) => `/${lang}`,
  about: (lang: string) => `/${lang}/about`,
  specimen: (lang: string) => `/${lang}/specimen`,

  // catégorie SEO directe sous /:lang (ex: /en/cybersecurity)
  category: (lang: string, categoryOrInternal: string) => 
    `/${lang}/${toCategorySeo(categoryOrInternal)}`,

  // article sous /:lang/:category/:slug
  post: (lang: string, categoryOrInternal: string, slug: string) =>
    `/${lang}/${toCategorySeo(categoryOrInternal)}/${slug}`,
} as const;