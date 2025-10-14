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
    inline-flex items-center gap-1.5 rounded-full
    px-3 py-1.5 text-[13px] font-medium tracking-wide
    border transition-all duration-150 will-change:transform
    bg-[color-mix(in_oklab,var(--header-bg)_90%,transparent)]
    border-[color:color-mix(in_oklab,var(--header-border)_70%,transparent)]
    hover:-translate-y-[1px]
    hover:bg-[color-mix(in_oklab,var(--header-bg)_95%,transparent)]
    html:theme-dark:hover:bg-[color-mix(in_oklab,var(--header-bg)_88%,transparent)]
    focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-str4t0tt0-primary)]
    focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--header-bg)]
    text-[color:inherit] shadow-sm
  "
      aria-label={`${label} — open category`}
    >
      <Icon
        className="h-[14px] w-[14px] text-[rgb(var(--color-str4t0tt0-primary-rgb)/0.85)]"
        aria-hidden
      />
      <span className="[font-variant-caps:all-small-caps] tracking-[0.02em]">
        {label}
      </span>
    </Link>
  );
}
