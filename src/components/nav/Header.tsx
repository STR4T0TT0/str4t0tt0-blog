import { Link } from "react-router-dom";
import { useState } from "react";
import { Bars3Icon } from '@heroicons/react/24/solid';
import MenuDrawer from "@/components/nav/MenuDrawer";
import LogoDark from '@/assets/brand/logo-str4t0tt0-dark.svg';
import LanguageSwitch from "@/components/nav/LanguageSwitch";
import Container from "@/components/layout/Container";


export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur h-[60px]">
       <Container className="h-full relative">
            {/* hairline localisée à la largeur du container 
            séparateur plus discret avec bg-white/12 ou bg-white/15
            laisse comme ca pour l'instant pour avoir une référence lors des tests
            */}
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10" />
        <div className="flex items-center justify-between h-full">
          {/* Left : burger + logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="app-menu"
              className="inline-flex items-center justify-center h-11 w-11 md:h-12 md:w-12 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white/90 focus:outline-none focus:ring-2 focus:ring-brand-red"
            >
              <Bars3Icon className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
            </button>

            {/* Logo */}
<Link to="/" className="flex items-center">
  <img
    src={LogoDark}
    alt="STR4T0TT0"
    className="h-7 md:h-8 w-auto" // avec 7 on est proche de 28px de haut
    loading="eager"
    decoding="async"
  />
</Link>
          </div>

          {/* Right : LanguageSwitch */}
          <div className="flex items-center">
            <LanguageSwitch />
          </div>
        </div>
      </Container>

      {/* Drawer */}
      <MenuDrawer open={open} onClose={() => setOpen(false)} />
    </header>
  );
}