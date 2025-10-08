import { useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import CategoryBar from "@/components/nav/CategoryBar";
import PostCardMobile from "@/components/posts/PostCardMobile";
import { getPostsByCategory } from "@/lib/getPostsByCategory";
import type { PostMeta } from "@/types/post";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import Container from "@/components/layout/Container";

const PAGE_SIZE = 6;

export default function CategoryView() {
  const { lang, category } = useParams();
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
      .then((res) => setAllPosts(res))
      .catch(() => setAllPosts([]));
  }, [lang, catInternal]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisible((v) => Math.min(v + PAGE_SIZE, allPosts.length));
      }
    }, { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, [allPosts.length]);

  const chunk = useMemo(() => allPosts.slice(0, visible), [allPosts, visible]);

  if (!catInternal) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      <CategoryBar slug={catInternal as any} />
      <main className="pt-[44px] pb-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {chunk.map((post) => (
              <PostCardMobile key={post.path ?? `${post.lang}-${post.slug}`} post={post} />
            ))}
          </div>
          <div ref={sentinelRef} />
          {visible >= allPosts.length && allPosts.length > 0 && (
            <div className="mt-6 flex items-center justify-center">
              <EllipsisHorizontalIcon className="h-6 w-6 text-white/50" aria-hidden />
            </div>
          )}
          {allPosts.length === 0 && (
            <p className="mt-6 text-center text-sm text-white/60">Aucun article.</p>
          )}
        </Container>
      </main>
    </div>
  );
}