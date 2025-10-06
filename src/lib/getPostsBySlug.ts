import { parseFrontmatter } from "./parseFrontmatter";
import { marked } from "marked";

type Lang = "en" | "fr" | "it";

const globs: Record<Lang, Record<string, () => Promise<unknown>>> = {
  en: import.meta.glob("/src/content/en/posts/**/*.md", { query: "?raw" }),
  fr: import.meta.glob("/src/content/fr/posts/**/*.md", { query: "?raw" }),
  it: import.meta.glob("/src/content/it/posts/**/*.md", { query: "?raw" }),
};

export async function getPostBySlug(lang: Lang, slug: string) {
  const modules = globs[lang];
  for (const [path, loader] of Object.entries(modules)) {
    const mod: any = await loader();
    const raw = (mod?.default ?? mod) as string;
    if (typeof raw !== "string") continue;

    const { data, body } = parseFrontmatter(raw);
    const fmSlug = (data?.slug ?? "").toString().trim().toLowerCase();
    if (fmSlug === slug) {
      const html = marked.parse(body ?? "");
      return { meta: data, html, path };
    }
  }
  return null;
}