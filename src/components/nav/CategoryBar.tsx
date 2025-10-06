/* Barre de catégorie sticky sous le header */
import { ShieldCheckIcon, CpuChipIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";

type Category = "cybersecurity" | "ai" | "crypto";

const icons: Record<Category, React.ElementType> = {
  cybersecurity: ShieldCheckIcon,
  ai: CpuChipIcon,
  crypto: CurrencyDollarIcon,
};

export default function CategoryBar({ slug }: { slug: Category }) {
  const Icon = icons[slug] ?? ShieldCheckIcon;

  return (
   <div className="sticky top-[56px] z-30 bg-black/95 backdrop-blur border-b border-white/[0.06] shadow-[inset_0_-1px_0_rgba(255,255,255,0.04)]">
   {/* h-11 aka 44px explicite pour éviter tout recouvrement */}
   <div className="h-11 px-4 flex items-center gap-2">
        <Icon className="w-5 h-5" aria-hidden />
        <span className="font-semibold uppercase tracking-wide">{slug}</span>
      </div>
    </div>
  );
}