/* Barre de catégorie sticky sous le header */
import { ShieldCheckIcon, CpuChipIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";
import Container from "../layout/Container";

type Category = "cybersecurity" | "ai" | "crypto";

const icons: Record<Category, React.ElementType> = {
  cybersecurity: ShieldCheckIcon,
  ai: CpuChipIcon,
  crypto: CurrencyDollarIcon,
};

export default function CategoryBar({ slug }: { slug: Category }) {
  const Icon = icons[slug] ?? ShieldCheckIcon;

  return (
    <div className="sticky top-[56px] z-30 bg-black/95 backdrop-blur">
      {/* Espace avec les cartes article de h-11 aka 44px  éviter tout recouvrement */}
      <Container className="h-11 flex items-center gap-2 relative">
        {/* souligne la catégorie pour bien visualier la séparation avec le contenu
        séparateur plus discret avec bg-white/12 ou bg-white/15
        laisse comme ca pour l'instant pour avoir une référence lors des tests */}
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10" />
        <Icon className="w-5 h-5" aria-hidden />
        <span className="font-semibold uppercase tracking-wide">{slug}</span>
      </Container>
    </div>
  );
}