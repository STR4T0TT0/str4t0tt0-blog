import { useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import CategoryBar from "@/components/nav/CategoryBar";
import PostCardMobile from "@/components/posts/PostCardMobile";
import { getPostsByCategory } from "@/lib/getPostsByCategory";
import type { PostMeta } from "@/types/post";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

const PAGE_SIZE = 6;

export default function CategoryView() {
  const { lang, category } = useParams(); // ici je récupère langue et la catégorie
  const seoToInternal = {
    "cybersecurity": "cybersecurity",
    "artificial-intelligence": "ai",
    "cryptocurrency": "crypto",
  } as const;
  const catInternal = category && seoToInternal[category as keyof typeof seoToInternal];

  const [allPosts, setAllPosts] = useState<PostMeta[]>([]);
  const [visible, setVisible] = useState<number>(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {    
    if (!lang || !catInternal) return;
    const _lang = lang as "fr" | "en" | "it";
      getPostsByCategory(_lang, catInternal)
        .then((res) => {
       console.log("[CategoryView] loaded posts:", res.length); //debug verif chargement nb articles
      setAllPosts(res);
     })
     .catch((err) => {
       console.error("[CategoryView] load error:", err);
               setAllPosts([]);
      });
  }, [lang, catInternal]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible((v) => Math.min(v + PAGE_SIZE, allPosts.length));
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [allPosts.length]);

  const chunk = useMemo(() => allPosts.slice(0, visible), [allPosts, visible]);

 /*  if (!catInternal) return null; */
  // Si la catégorie n'est pas reconnue → mini 404 locale (évite écran blanc)
  if (!catInternal) {
    return (
      <div className="min-h-screen bg-black text-white">
       <main className="px-4 pt-6 pb-20 text-sm text-gray-600">
          Unknown category: <code>{category}</code>
       </main>
     </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <CategoryBar slug={catInternal as any} />
      {/* Réserve la hauteur de la CategoryBar (h-11 = 44px) */}
      <div className="h-11" aria-hidden /> {/* réserve la place */}
     <main className="px-4 pb-20 pt-[44px]">
        {/* Grille responsive avec mobile 1, tablette 2, desktop 3 colonnes */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
         {chunk.map((post) => (
            <PostCardMobile
              key={post.path ?? `${post.lang}-${post.slug}`}
              post={post}
            />
          ))}
        </div>
        <div ref={sentinelRef} />
        {visible >= allPosts.length && allPosts.length > 0 && (
          <div className="mt-6 flex items-center justify-center">
            <CheckBadgeIcon className="h-6 w-6 text-white/50" aria-hidden />
          </div>
        )}
        {allPosts.length === 0 && (
          <p className="mt-6 text-center text-sm text-white/60">Aucun article.</p>
        )}
      </main>
    </div>
  );
}