import { parseFrontmatter } from "./parseFrontmatter";

const globs = {
  en: import.meta.glob('/src/content/en/posts/**/*.md', { query: '?raw' }),
  fr: import.meta.glob('/src/content/fr/posts/**/*.md', { query: '?raw' }),
  it: import.meta.glob('/src/content/it/posts/**/*.md', { query: '?raw' }),
};

export async function getPostBySlug(lang: "en" | "fr" | "it", slug?: string) {
  if (!slug) return null;
  const entries = Object.entries(globs[lang]);
  for (const [path, loader] of entries) {
    const mod: any = await loader();
    const raw: unknown = mod?.default ?? mod;
    if (typeof raw !== 'string') continue;
    const { data, body } = parseFrontmatter(raw);
    const s = (data?.slug ?? '')
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\- ]/g, '')
      .replace(/\s+/g, '-') ||
      (data?.title ?? '').toString().toLowerCase().replace(/\s+/g, '-');

    if (s === slug) {
      return {
        meta: data,
        html: body, // rendu markdown simplifié (on affiche brut ici)
      };
    }
  }
  return null;
}