// navigation sticky sous les catégories et les articles
import { Link } from "react-router-dom";
import { ROUTES } from "@/router/routes";
import {
  ShieldCheckIcon,
  CpuChipIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

type Category = "cybersecurity" | "ai" | "crypto";

const icons: Record<Category, React.ElementType> = {
  cybersecurity: ShieldCheckIcon,
  ai: CpuChipIcon,
  crypto: CurrencyDollarIcon,
};

export default function CategoryPill({
  lang,
  category,
  label,
}: {
  lang: string;
  category: Category;
  label: string;
}) {
  const Icon = icons[category] ?? ShieldCheckIcon;
  const href = ROUTES.category(lang, category);

  return (
    <Link
      to={href}
      className="
        inline-flex items-center gap-2 rounded-full
        px-3 py-1.5 text-[13px] font-semibold tracking-wide border
        transition-colors hover:opacity-90
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        focus-visible:ring-[--color-accent] focus-visible:ring-offset-background
        border-neutral-300 bg-white text-neutral-900
        dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100
      "
      aria-label={`${label} — open category`}
    >
      <Icon className="w-4 h-4" aria-hidden />
      <span className="uppercase">{label}</span>
    </Link>
  );
}
