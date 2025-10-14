// éviter de répéter la même construction d’URL dans plusieurs
// composants à venir comme FeaturedPost, RelatedPosts...

//Defini les noms “internes” que j'utilise dans mon code
export type CategoryInternal = "cybersecurity" | "ai" | "crypto";

// Défini les slugs visibles dans l’URL
export type CategorySEO =
  | "cybersecurity"
  | "artificial-intelligence"
  | "cryptocurrency";

// pour retouner des URLs stricts (interne → SEO)
export const SEO_FROM_INTERNAL: Record<CategoryInternal, CategorySEO> = {
  cybersecurity: "cybersecurity",
  ai: "artificial-intelligence",
  crypto: "cryptocurrency",
} as const;

//la conversion inverse (SEO → interne)
export const INTERNAL_FROM_SEO: Record<CategorySEO, CategoryInternal> = {
  cybersecurity: "cybersecurity",
  "artificial-intelligence": "ai",
  cryptocurrency: "crypto",
} as const;

// sur valeur inconnue je retourne l’input tel quel dans les deux sens
export function toCategorySeo(input: string): CategorySEO | string {
  return SEO_FROM_INTERNAL[input as CategoryInternal] ?? input;
}

export function toCategoryInternal(input: string): CategoryInternal | string {
  return INTERNAL_FROM_SEO[input as CategorySEO] ?? input;
}

// gére la langue si non prise en charge fallback anglais
function normLang(lang: string) {
  return (lang || "en").slice(0, 2);
}

export const ROUTES = {
  // pages uniques
  home: (lang: string) => `/${normLang(lang)}`,
  about: (lang: string) => `/${normLang(lang)}/about`,
  specimen: (lang: string) => `/${normLang(lang)}/specimen`,
  // Format catégories /:lang/:category
  category: (
    lang: string,
    categoryOrInternal: CategoryInternal | CategorySEO | string
  ) => `/${normLang(lang)}/${toCategorySeo(categoryOrInternal)}`,
  // Format articles /:lang/:category/:slug
  post: (
    lang: string,
    categoryOrInternal: CategoryInternal | CategorySEO | string,
    slug: string
  ) =>
    `/${normLang(lang)}/${toCategorySeo(
      categoryOrInternal
    )}/${encodeURIComponent(slug)}`,
};
