import { Fragment, useEffect, useMemo } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { XMarkIcon, HomeIcon, UserIcon, ShieldCheckIcon, CpuChipIcon, CircleStackIcon } from "@heroicons/react/24/solid";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { normLang } from "@/i18n";

type MenuDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function MenuDrawer({ open, onClose }: MenuDrawerProps) {
  const { t } = useTranslation("menu");
  const { pathname } = useLocation();
  const { lang: rawLang } = useParams();
  const lang = useMemo(() => normLang(rawLang), [rawLang]);
  const withLang = (path: string) => {
    const base = `/${lang}`;
    const p = path || "/";
    return p === "/"
      ? `${base}/`
      : `${base}${p.startsWith("/") ? p : `/${p}`}`;
  };

  // Si on navigue, on ferme le menu
  useEffect(() => {
    if (open) onClose();

  }, [pathname]);

  // Garde le scroll bloqué tant que le menu est ouvert
  useEffect(() => {
    const el = document.documentElement;
    open ? el.classList.add("overflow-hidden") : el.classList.remove("overflow-hidden");
    return () => el.classList.remove("overflow-hidden");
  }, [open]);

  const navItems = [
    { to: withLang("/"), label: t("home"), icon: HomeIcon, disabled: false },
    // Catégories du menu reste deux à faire
    { to: withLang("/cybersecurity"), label: t("cybersecurity"), icon: ShieldCheckIcon, disabled: false },
    { to: withLang("/artificial-intelligence"), label: t("ai"), icon: CpuChipIcon, disabled: true  },
    { to: withLang("/cryptocurrency"), label: t("crypto"), icon: CircleStackIcon, disabled: true  },
    { to: withLang("/about"), label: t("about"), icon: UserIcon, disabled: false },
  ];

  // besoin de homeUrl pour le NavLink 
  const homeUrl = withLang("/");

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[60]" onClose={onClose}>
        {/* Overlay */}
        <TransitionChild
          as={Fragment}
          enter="transition-opacity ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </TransitionChild>

        {/* Panel */}
        <div className="fixed inset-0">
          <div className="absolute inset-y-0 left-0 flex max-w-full">
            <TransitionChild
              as={Fragment}
              enter="transition-all ease-out duration-200"
              enterFrom="-translate-x-full opacity-0"
              enterTo="translate-x-0 opacity-100"
              leave="transition-all ease-in duration-150"
              leaveFrom="translate-x-0 opacity-100"
              leaveTo="-translate-x-full opacity-0"
            >
              <DialogPanel
                id="app-menu"
                className="w-fit px-3 bg-[#0B0B0B] border-r border-white/10 shadow-2xl" //largeur menu
              >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                  <DialogTitle className="text-sm font-medium opacity-80">
                    {t("title")}
                  </DialogTitle>
                  <button
                    onClick={onClose}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-brand-red"
                    aria-label={t("close")}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                {/* Nav items */}
                <nav className="px-3 py-4">
                  <ul className="grid grid-cols-1 gap-3 md:gap-4 lg:gap-6"> {/* position des carrés */}
                    {navItems.map(({ to, label, icon: Icon, disabled }, idx ) => {
                      const common =
                        "relative flex flex-col items-center justify-center rounded-xl" +   // carrés arrondis
                        "aspect-square w-full max-w-[60px] md:max-w-[96px] lg:max-w-[140px] mx-auto" +  // ça doit être carré sortie desktop à corriger
                        "border border-white/10 bg-white/[0.04] transition-colors transition-transform focus:outline-none" +
                        "focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-str4t0tt0-primary-rgb)/1)]" +  //accent est  color-str4t0tt0-primary
                        "focus-visible:ring-offset-1 focus-visible:ring-offset-[#0B0B0B]";  // mise en évidence
                      
                        const iconCls = "opacity-90 mb-0.5 h-7 w-7 md:h-9 md:w-9 lg:h-8 lg:w-8";
                      
                        const labelCls = 
                        "mt-0.5 text-center leading-snug break-words" +   // césure propre
                        "max-w-[9ch] md:max-w-[14ch] lg:max-w-none " +  // longueur visuelle
                        "text-[11px] md:text-sm lg:text-base";

                      if (disabled) {
                        return (
                         <li key={`${label}-${idx}`}> {/* evite les comportement chelou avec juste <li key={to}> */}
                            <div
                              role="button"
                              aria-disabled="true"
                              className={common + " cursor-not-allowed opacity-80 hover:bg-white/[0.03]"}
                            >
                              {/* badge visible que sur desktop */}
                              <span className="hidden lg:inline absolute right-2 top-2 rounded-md border border-white/10 px-1.5 py-0.5 text-xs opacity-70">
                                {t("disabled")}
                              </span>
                              <Icon className={iconCls} />
                              <span className={labelCls}>{label}</span>
                            </div>
                          </li>
                        );
                      }

                      return (
                        <li key={`${label}-${to}`}> {/* garantir unicité ? old </li><li key={to}> */}
                          <NavLink
                            to={to}
                            end={to === homeUrl} // déclarer plus haut
                            className={({ isActive }) =>
                              [
                                common,
                                "hover:bg-white/[0.06]",
                                isActive ? "bg-white/[0.08]" : "",
                                // Survol avec léger tint + bordure rouge + halo + micro-lift
                                "hover:bg-[rgb(var(--color-str4t0tt0-primary-rgb)/0.15)]",
                                "hover:border-[rgb(var(--color-str4t0tt0-primary-rgb)/0.60)]",
                                "hover:ring-1 hover:ring-[rgb(var(--color-str4t0tt0-primary-rgb)/0.50)]",
                                 // bouton selection page active 
                                 isActive ? "bg-[rgb(var(--color-str4t0tt0-primary-rgb)/0.25)] border-[rgb(var(--color-str4t0tt0-primary-rgb)/0.70)] ring-2 ring-[rgb(var(--color-str4t0tt0-primary-rgb)/0.60)] shadow-md" : ""
                              ].join(" ")
                            }
                          >
                            <Icon className={iconCls} />
                            <span className={labelCls}>{label}</span>
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}