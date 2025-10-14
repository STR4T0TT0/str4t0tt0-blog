import { Link } from "react-router-dom";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import MenuDrawer from "@/components/nav/MenuDrawer";
import LogoDark from "@/assets/brand/logo-str4t0tt0-dark.svg";
import LogoLight from "@/assets/brand/logo-str4t0tt0-light.svg";
import LanguageSwitch from "./LanguageSwitch";
import Container from "@/components/layout/Container";
import ProseThemeSwitch from "@/components/theme/ProseThemeSwitch";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="
         sticky top-0 z-50
         bg-white/80 dark:bg-zinc-900/70
         supports-[backdrop-filter]:backdrop-blur-md


         
       "
    >
      <div className="min-h-16 py-2.5">
        <Container className="h-full flex items-center justify-between gap-3">
          {/* Toujours à gauche burger suivi du logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="app-menu"
              className="nav-icon-btn"
            >
              <Bars3Icon className="h-5 w-5 md:h-7 md:w-7 lg:h-8 lg:w-8" />
            </button>

            {/* Logo change selon le thème */}
            <Link to="/" className="inline-flex items-center">
              <img
                src={LogoDark}
                alt="STR4T0TT0"
                className="brand-logo only-dark h-6 md:h-8 w-auto "
                loading="eager"
                decoding="async"
              />
              <img
                src={LogoLight}
                alt="STR4T0TT0"
                className="brand-logo only-paper h-6 md:h-8 w-auto "
                loading="eager"
                decoding="async"
              />
            </Link>
          </div>

          {/* Contrôles toujours à droite : Langue suivi du sélecteur de thème tout à droite */}
          <div className="flex items-center gap-3">
            <LanguageSwitch />
            <ProseThemeSwitch />
          </div>
        </Container>
      </div>

      {/* Drawer */}
      <MenuDrawer open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
