export interface PostMeta {
  title: string;
  slug: string;
  date: string;
  category: "cybersecurity" | "ai" | "crypto";
  tags?: string[];
  excerpt?: string;
  image?: string; // chemin vers l'image ou son fallback
  lang: "fr" | "en" | "it"; // toujours verifier décla dans le i18
  path?: string; // debug pour voir le chemin du mdx
}