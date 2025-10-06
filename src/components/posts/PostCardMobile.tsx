import type { PostMeta } from "@/types/post";

export default function PostCardMobile({ post }: { post: PostMeta }) {
  const title = (post.title ?? "").toString().trim() || "(untitled)";
  const d = new Date(post.date);
  const dateStr = isNaN(d.getTime()) ? "" : d.toLocaleDateString();

  return (
    <article className="rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/10">
      {/* Image avec ratio fixe 16:9 */}
      <div className="aspect-[16/9] w-full overflow-hidden">
        <img
          src={post.image}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="px-3 pb-3 pt-2">
        <h2 className="text-base font-semibold leading-snug">{title}</h2>
        {dateStr && <p className="text-xs text-white/60 mt-1">{dateStr}</p>}
      </div>
    </article>
  );
}