/* Barre de catégorie sticky sous le header */
import { ShieldCheckIcon, CpuChipIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";
import Container from "@/components/layout/Container";

type Category = "cybersecurity" | "ai" | "crypto";

const icons: Record<Category, React.ElementType> = {
  cybersecurity: ShieldCheckIcon,
  ai: CpuChipIcon,
  crypto: CurrencyDollarIcon,
};

export default function CategoryBar({ slug }: { slug: Category }) {
  const Icon = icons[slug] ?? ShieldCheckIcon;

  return (
    <div className="sticky top-[56px] z-30 bg-black/95 backdrop-blur border-b border-white/[0.06]">
      <div className="h-11">
        <Container className="h-full flex items-center gap-2">
          <Icon className="w-5 h-5" aria-hidden />
          <span className="font-semibold uppercase tracking-wide">{slug}</span>
        </Container>
      </div>
    </div>
  );
}