import { Fragment, useEffect, useMemo } from "react";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";

import {
  XMarkIcon,
  HomeIcon,
  UserIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  CircleStackIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

import { NavLink, useLocation, useParams } from "react-router-dom";
import { useProseTheme } from "@/components/theme/useProseTheme";

import { useTranslation } from "react-i18next";
import { normLang } from "@/i18n";

type MenuDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function MenuDrawer({ open, onClose }: MenuDrawerProps) {
  const { theme, setTheme } = useProseTheme();
  const next = theme === "theme-dark" ? "theme-paper" : "theme-dark";

  const { t } = useTranslation("menu");
  const { pathname } = useLocation();
  const { t: tCommon } = useTranslation("common"); // pour les libellés du switch
  const { lang: rawLang } = useParams();
  const lang = useMemo(() => normLang(rawLang), [rawLang]);

  // Préfixe toujours la route avec la langue (/fr/..., /en/...)
  const withLang = (path: string) => {
    const base = `/${lang}`;
    const p = path || "/";
    return p === "/" ? `${base}/` : `${base}${p.startsWith("/") ? p : `/${p}`}`;
  };

  // Ferme le menu dès qu'on navigue
  useEffect(() => {
    if (open) onClose();
  }, [pathname]);

  // Bloque le scroll quand le menu est ouvert
  useEffect(() => {
    const el = document.documentElement;
    open
      ? el.classList.add("overflow-hidden")
      : el.classList.remove("overflow-hidden");
    return () => el.classList.remove("overflow-hidden");
  }, [open]);

  const navItems = [
    { to: withLang("/"), label: t("home"), icon: HomeIcon, disabled: false },
    {
      to: withLang("/cybersecurity"),
      label: t("cybersecurity"),
      icon: ShieldCheckIcon,
      disabled: false,
    },
    {
      to: withLang("/artificial-intelligence"),
      label: t("ai"),
      icon: CpuChipIcon,
      disabled: true,
    },
    {
      to: withLang("/cryptocurrency"),
      label: t("crypto"),
      icon: CircleStackIcon,
      disabled: true,
    },
    {
      to: withLang("/about"),
      label: t("about"),
      icon: UserIcon,
      disabled: false,
    },
  ];

  // Nécessaire pour que "/" soit considéré actif uniquement sur l'accueil
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
                className="w-fit px-3 drawer shadow-2xl"
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

                {/* Navigation de items */}
                <nav className="px-3 py-4">
                  <ul className="grid grid-cols-1 gap-3 md:gap-4 lg:gap-6">
                    {navItems.map(
                      ({ to, label, icon: Icon, disabled }, idx) => {
                        /**
                         * Un item disabled ne doit pas réagir au hover ni au focus.
                         * - baseBox : disposition en carré et centré
                         * - enabled : on ajoute "group" pour activer group-hover
                         * - disabled : rendu figé + pas de group (donc aucun hover)
                         *
                         * ATTENTION A LA CONCATENATION : chaque string doit commencer par un espace !
                         */
                        const baseBox =
                          "relative flex flex-col items-center justify-center rounded-xl" +
                          " aspect-square w-full max-w-[60px] md:max-w-[96px] lg:max-w-[140px] mx-auto" +
                          " transition-colors focus:outline-none";
                        const commonEnabled = "group " + baseBox;
                        const commonDisabled =
                          baseBox + " cursor-not-allowed opacity-60";

                        // Enfants (icône + label)
                        // Enabled : héritent de la couleur du parent (hover/active).
                        const iconEnabled =
                          "mb-0.5 h-7 w-7 md:h-9 md:w-9 lg:h-8 lg:w-8 transition-colors";
                        const labelEnabled =
                          "mt-0.5 text-center leading-tight break-normal transition-colors" +
                          " max-w-[12ch] md:max-w-[14ch] lg:max-w-none text-[10px] md:text-sm lg:text-base";

                        // Disabled : couleur figée et atténuée, aucune réaction au hover.
                        const iconDisabled =
                          "mb-0.5 h-7 w-7 md:h-9 md:w-9 lg:h-8 lg:w-8 nav-disabled-icon";
                        const labelDisabled =
                          "mt-0.5 text-center leading-tight break-normal" +
                          " max-w-[12ch] md:max-w-[14ch] lg:max-w-none text-[10px] md:text-sm lg:text-base nav-disabled-label";

                        if (disabled) {
                          return (
                            <li key={`${label}-${idx}`}>
                              <div
                                role="button"
                                aria-disabled="true"
                                tabIndex={-1}
                                className={commonDisabled}
                              >
                                {/* Badge "Soon- Bientôt-Presto" est visible seulement sur desktop */}
                                <span className="hidden lg:inline absolute right-2 top-2 rounded-md border border-white/10 px-1.5 py-0.5 text-xs opacity-70">
                                  {t("disabled")}
                                </span>
                                <Icon className={iconDisabled} />
                                <span className={labelDisabled}>{label}</span>
                              </div>
                            </li>
                          );
                        }

                        return (
                          <li key={`${label}-${to}`}>
                            {(() => {
                              const normalize = (s: string) =>
                                s.replace(/\/+$/, "");
                              const current = normalize(pathname);
                              const target = normalize(to);
                              const isHome = target === normalize(homeUrl);

                              // Accueil passe en actif seulement si URL exacte.
                              // Autres pages : exact OU sous-routes.
                              const active = isHome
                                ? current === target
                                : current === target ||
                                  current.startsWith(target + "/");

                              // Logique de toggle pas d'empilement text-white + text-[...]
                              return (
                                <NavLink
                                  to={to}
                                  end={to === homeUrl}
                                  className={[
                                    commonEnabled,
                                    "nav-link", // couleur par défaut pilotée par le thème
                                    // actif = on redéfinit la variable
                                    active
                                      ? "[--nav-link-color:rgb(var(--color-str4t0tt0-primary-rgb)/1)]"
                                      : "",
                                    // hover = on redéfinit la variable aussi
                                    "hover:[--nav-link-color:rgb(var(--color-str4t0tt0-primary-rgb)/1)]",
                                    "focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-str4t0tt0-primary-rgb)/0.6)]",
                                    "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--drawer-bg)]",
                                  ].join(" ")}
                                >
                                  <Icon className={iconEnabled} />
                                  <span className={labelEnabled}>{label}</span>
                                </NavLink>
                              );
                            })()}
                          </li>
                        );
                      }
                    )}
                  </ul>
                </nav>
                {/* --- Commutateur de thème toujours en dernier --- */}
                <div className="sticky bottom-0 px-4 pb-4 pt-3 drawer-footer">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={theme === "theme-paper"}
                    onClick={() => setTheme(next)}
                    className="w-full rounded-xl px-3 py-3 border menu-toggle
                               focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-str4t0tt0-primary-rgb)/.7)]"
                  >
                    <span className="flex flex-col items-center gap-1">
                      {/* Icône montre toujours  état courant pour une meilleure compréhension */}
                      {theme === "theme-dark" ? (
                        <MoonIcon className="h-6 w-6" aria-hidden="true" />
                      ) : (
                        <SunIcon className="h-6 w-6" aria-hidden="true" />
                      )}
                      <span className="text-sm font-medium">
                        {theme === "theme-dark"
                          ? tCommon("theme.dark")
                          : tCommon("theme.paper")}
                      </span>
                      <span className="text-[11px] opacity-70">
                        {theme === "theme-dark"
                          ? t("switch_to", { mode: tCommon("theme.paper") })
                          : t("switch_to", { mode: tCommon("theme.dark") })}
                      </span>
                    </span>
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
