import { parseFrontmatter } from './parseFrontmatter';

type Lang = 'en' | 'fr' | 'it';

// .md sont des assets traités via vite.config: assetsInclude 
const globs: Record<Lang, Record<string, () => Promise<unknown>>> = {
  en: import.meta.glob('/src/content/en/posts/**/*.md', { query: '?raw' }),
  fr: import.meta.glob('/src/content/fr/posts/**/*.md', { query: '?raw' }),
  it: import.meta.glob('/src/content/it/posts/**/*.md', { query: '?raw' }),
};

export async function loadPosts(lang: Lang) {
  const modules = globs[lang];
  const posts: any[] = [];
  // fallback si pas d'image dans le frontmatter depuis public
  const PLACEHOLDER = '/content/shared/image-str4t0tt0-fallback-neutral-lg.webp';
  // Pour éviter de planter le site si FM absent ou erroné
  const CATS = new Set(['cybersecurity', 'ai', 'crypto']);


  for (const [path, loader] of Object.entries(modules)) {
    const mod: any = await loader();                // module ESM
    const raw: unknown = mod?.default ?? mod;       // string avec le contenu
    if (typeof raw !== 'string') continue;

    const { data } = parseFrontmatter(raw);         // plus de Buffer, parse côté browser
    const safeTitle =(data?.title ?? '').toString().trim() || '(untitled)';
// un peu lourd mais cela évite les retours vides...
    const safeSlug =
          (data?.slug ?? '')
          .toString()
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9\- ]/g, '')
          .replace(/\s+/g, '-') ||
       safeTitle.toLowerCase().replace(/\s+/g, '-');
    
       const safeDate = (() => {
      const d = data?.date ? new Date(data.date) : new Date();
     return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
      })();
const safeExcerpt = (data?.excerpt ?? '').toString();
    const safeImage = (() => {
      const img = (data?.image ?? '').toString().trim();
      return img !== '' ? img : PLACEHOLDER;
    })();

    // déduire la catégorie depuis le chemin si absente FM
    const fromPath = path.match(/\/posts\/([^/]+)\//)?.[1];
    const catFromPath = fromPath && CATS.has(fromPath) ? (fromPath as 'cybersecurity'|'ai'|'crypto') : undefined;
 
    // Soit le FM est valide soit on remplace avec la cat du dossier
    const catFromFM = (typeof data?.category === 'string' && CATS.has(data.category))
      ? (data.category as 'cybersecurity'|'ai'|'crypto')
      : undefined;
    const finalCategory = catFromFM ?? catFromPath;

    // DEBUG : alerte si FM différent dossier
    if (catFromFM && catFromPath && catFromFM !== catFromPath) {
      console.warn('[loadPosts] category mismatch FM vs path:', { path, fm: catFromFM, folder: catFromPath });
    }
    
    // Gestion du post ici
    
    posts.push({
      title: safeTitle,
      slug: safeSlug,
      date: safeDate,
      category: finalCategory,
      tags: Array.isArray(data?.tags) ? data.tags : [],
      excerpt: safeExcerpt,
      image: safeImage,
      draft: !!data?.draft,
      lang,
      path,
    });
  }

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}