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
    <header className="sticky top-0 z-50 border-b">
      <div className="h-14">
        <Container className="h-full flex items-center justify-between">
          {/* Toujours à gauche burger suivi du logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="app-menu"
              className="nav-icon-btn"
            >
              <Bars3Icon className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
            </button>

            {/* Logo change selon le thème */}
            <Link to="/" className="inline-flex items-center">
              <img
                src={LogoDark}
                alt="STR4T0TT0"
                className="brand-logo only-dark h-7 md:h-8 w-auto "
                loading="eager"
                decoding="async"
              />
              <img
                src={LogoLight}
                alt="STR4T0TT0"
                className="brand-logo only-paper h-7 md:h-8 w-auto "
                loading="eager"
                decoding="async"
              />
            </Link>
          </div>

          {/* Toujours à droite pour changer de langue */}
          <div className="flex items-center gap-3">
            <ProseThemeSwitch />
            <LanguageSwitch />
          </div>
        </Container>
      </div>

      {/* Drawer */}
      <MenuDrawer open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
