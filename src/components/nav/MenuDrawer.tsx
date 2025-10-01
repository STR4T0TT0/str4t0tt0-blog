import { Fragment, useEffect, useMemo } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { XMarkIcon, HomeIcon, NewspaperIcon, UserIcon } from "@heroicons/react/24/solid";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Garde le scroll bloqué tant que le menu est ouvert
  useEffect(() => {
    const el = document.documentElement;
    open ? el.classList.add("overflow-hidden") : el.classList.remove("overflow-hidden");
    return () => el.classList.remove("overflow-hidden");
  }, [open]);

  const navItems = [
    { to: withLang("/"), label: t("home"), icon: HomeIcon },
    { to: withLang("/posts"), label: t("posts"), icon: NewspaperIcon },
    { to: withLang("/about"), label: t("about"), icon: UserIcon },
  ];

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
                className="w-[84vw] max-w-xs bg-[#0B0B0B] border-r border-white/10 shadow-2xl"
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
                <nav className="px-2 py-2">
                  <ul className="space-y-1">
                    {navItems.map(({ to, label, icon: Icon }) => (
                      <li key={to}>
                        <NavLink
                          to={to}
                          end={to === homeUrl} // exact match for home
                          className={({ isActive }) =>
                            [
                              "flex items-center gap-3 rounded-lg px-3",
                              "h-12 md:h-14",
                              "text-lg md:text-xl",
                              "hover:bg-white/5",
                              isActive ? "bg-white/5 border border-white/10" : "",
                            ].join(" ")
                          }
                        >
                          <Icon className="h-5 w-5 md:h-6 md:w-6 opacity-90" />
                          <span className="truncate">{label}</span>
                        </NavLink>
                      </li>
                    ))}
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