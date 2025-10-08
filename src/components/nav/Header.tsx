import { Link } from "react-router-dom";
import { useState } from "react";
import { Bars3Icon } from '@heroicons/react/24/solid';
import MenuDrawer from "@/components/nav/MenuDrawer";
import LogoDark from '@/assets/brand/logo-str4t0tt0-dark.svg';
import LanguageSwitch from './LanguageSwitch';
import Container from "@/components/layout/Container";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
  <header className="sticky top-0 z-50 bg-black border-b border-white/10">
    <div className="h-14">
      <Container className="h-full flex items-center justify-between">
            {/* Toujours à gauche burger + logo */}
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

            {/* Toujours à droite pour changer de langue */}
            <div className="flex items-center">
              <LanguageSwitch />
        </div>
      </Container>
    </div>

      {/* Drawer */}
      <MenuDrawer open={open} onClose={() => setOpen(false)} />
  </header>
  );
}