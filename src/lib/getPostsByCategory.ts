import { loadPosts } from "./loadPosts";
import type { PostMeta } from "@/types/post";

const PLACEHOLDER = "/content/shared/placeholder.webp";
type Lang = "fr" | "en" | "it";
type Category = "cybersecurity" | "ai" | "crypto";

/**
 * Retourne les posts d'une catégorie pour une langue
 * - exclut les drafts
 * - applique une image par défaut si l'image manque
 * - conserve l'ordre par date décroissante (fait dans loadPosts)
 */

export async function getPostsByCategory(
  lang: Lang,
  category: Category
): Promise<PostMeta[]> {
  const all = await loadPosts(lang);

  return all
    .filter((p: any) => !p.draft && p.category === category)
    .map((p: any) => ({
      ...p,
      image: p.image && p.image.trim() !== "" ? p.image : PLACEHOLDER,
    })) as PostMeta[];
}