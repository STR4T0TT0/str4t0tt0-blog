import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SUPPORTED, type Lang } from "@/i18n";
import type { ComponentType } from "react";
import type { PostMeta } from "@/types/post";

import { getPostBySlug } from "@/lib/getPostBySlug";
import { getPostsByCategory } from "@/lib/getPostsByCategory";

import Container from "@/components/layout/Container";
import PostCardMobile from "@/components/posts/PostCardMobile";
import CategoryPill from "@/components/nav/CategoryPill";

const internalFromSeo = {
  cybersecurity: "cybersecurity",
  "artificial-intelligence": "ai",
  cryptocurrency: "crypto",
} as const;

const seoFromCat = {
  cybersecurity: "cybersecurity",
  ai: "artificial-intelligence",
  crypto: "cryptocurrency",
} as const;

export default function ArticleView() {
  const { lang = "en", category = "cybersecurity", slug = "" } = useParams();
  const [state, setState] = useState<{
    Component: ComponentType<any>;
    title: string;
    date?: string;
  } | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [langsAvailable, setLangsAvailable] = useState<Lang[]>([]);
  const [countdown, setCountdown] = useState(5);
  const [related, setRelated] = useState<PostMeta[]>([]);
  const { t } = useTranslation(["blog", "menu", "common"]);

  useEffect(() => {
    const L = lang as Lang;
    getPostBySlug(L, slug).then(async (res) => {
      if (!res) {
        setState(null);
        setNotFound(true);
        const checks = await Promise.all(
          (SUPPORTED as readonly Lang[]).map(
            async (X) => [X, !!(await getPostBySlug(X, slug))] as const
          )
        );
        const avail = checks
          .filter(([, ok]) => ok)
          .map(([X]) => X)
          .filter((X) => X !== L);
        setLangsAvailable(avail);
        document.title = "STR4T0TT0 | 404";
        return;
      }
      const title = (res.meta?.title ?? "").toString();
      const date = res.meta?.date as string | undefined;
      document.title = `STR4T0TT0 | ${title}`;
      // pas de string HTML avec MDX on donne le composant à rendre
      setState({ Component: res.Component, title, date });
      setNotFound(false);
      setLangsAvailable([]);
    });
  }, [lang, slug]);

  const catInternal =
    internalFromSeo[category as keyof typeof internalFromSeo] ??
    "cybersecurity";
  const backTo = `/${lang}/${seoFromCat[catInternal]}`;
  const catLabel = t(`menu:${catInternal}`);

  // related
  useEffect(() => {
    const L = lang as Lang;
    const cat =
      internalFromSeo[category as keyof typeof internalFromSeo] ??
      "cybersecurity";
    getPostsByCategory(L, cat).then((res) => {
      const others = res.filter((p) => p.slug !== slug).slice(0, 6);
      setRelated(others);
    });
  }, [lang, category, slug]);

  // auto redirect for notFound
  useEffect(() => {
    if (!notFound) return;
    setCountdown(5);
    const id = setInterval(() => {
      setCountdown((s) => {
        if (s <= 1) {
          clearInterval(id);
          window.location.assign(backTo);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [notFound, backTo]);

  return (
    <div className="page">
      {/* Meta-bar sticky : pill catégorie + date */}
      <nav
        className="sticky top-[56px] z-30 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        aria-label="Article context"
      >
        <div className="h-11">
          <Container className="h-full flex items-center justify-between gap-3">
            <CategoryPill
              lang={lang}
              category={catInternal as any}
              label={catLabel}
            />
            {state?.date && (
              <time className="text-xs text-muted" dateTime={state.date}>
                {new Date(state.date).toLocaleDateString()}
              </time>
            )}
          </Container>
        </div>
      </nav>
      <main className="pt-[44px] pb-20">
        <Container>
          {notFound ? (
            <div className="space-y-4">
              <p className="text-sm">
                {t("blog:notAvailable", {
                  lang: t(`common:languages.${lang}`, {
                    defaultValue: (lang || "en").toUpperCase(),
                  }),
                })}
              </p>
              {langsAvailable.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {langsAvailable.map((L) => (
                    <Link
                      key={L}
                      to={`/${L}/${seoFromCat[catInternal]}/${slug}`}
                      className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 ring-1 border-muted/0 bg-black/5 hover:bg-black/10 text-sm
                                 html:theme-paper:bg-black/5 html:theme-paper:hover:bg-black/10
                                 html:theme-dark:bg-white/5  html:theme-dark:hover:bg-white/10
                                 html:theme-dark:ring-white/15 html:theme-paper:ring-black/15"
                    >
                      {t("blog:viewIn", {
                        lang: t(`common:languages.${L}`, {
                          defaultValue: L.toUpperCase(),
                        }),
                      })}
                    </Link>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between">
                <Link
                  to={backTo}
                  className="inline-flex items-center gap-2 text-sm underline underline-offset-2"
                >
                  ← {t("blog:goToCategory", { category: catLabel })}
                </Link>
                <span className="text-xs text-white/60">
                  {t("blog:autoRedirect", { s: countdown })}
                </span>
              </div>
            </div>
          ) : !state ? (
            <p className="text-sm text-muted">Loading…</p>
          ) : (
            <>
              <article className="prose max-w-none prose-headings:scroll-mt-[116px]">
                {/*  Rendu MDX on neutraliser les éventuels h1 du contenu.
                ajouter components={{ h1: () => null }} dans la balise*/}
                <state.Component />
              </article>

              <hr className="my-8 border border-muted" />

              {/* Bandeau + suggestions */}
              <h2 className="mb-4 text-sm font-semibold tracking-wide text-muted">
                {t("blog:readMoreInCategory", { category: catLabel })}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((post, i) => (
                  <div
                    key={post.path ?? post.slug}
                    className={i > 2 ? "hidden md:block" : ""}
                  >
                    <PostCardMobile post={post} />
                  </div>
                ))}
              </div>
            </>
          )}
        </Container>
      </main>
    </div>
  );
}
