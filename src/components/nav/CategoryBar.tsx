/* Barre de catégorie sticky sous le header */
import { ShieldCheckIcon, CpuChipIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";
import Container from "@/components/layout/Container";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

type Category = "cybersecurity" | "ai" | "crypto";

const icons: Record<Category, React.ElementType> = {
  cybersecurity: ShieldCheckIcon,
  ai: CpuChipIcon,
  crypto: CurrencyDollarIcon,
};

export default function CategoryBar({ slug }: { slug: Category }) {
  const Icon = icons[slug] ?? ShieldCheckIcon;
  
  // récupère la langue à partir de l'URL 
  const { pathname } = useLocation();
  const langFromUrl = (pathname.split("/")[1] || "en").slice(0,2);

  // référence explicite au namespace dans blog.json
  const { t } = useTranslation("blog", { keyPrefix: "categories" });
  const label = t(slug, { lng: langFromUrl, defaultValue: slug });

  return (
    <div className="sticky top-[56px] z-30 bg-black/95 backdrop-blur border-b border-white/[0.06]" aria-label={label}>
      <div className="h-11">
        <Container className="h-full flex items-center gap-2">
          <Icon className="w-5 h-5" aria-hidden />
          <span className="font-semibold uppercase tracking-wide">{label}</span>
        </Container>
      </div>
    </div>
  );
}