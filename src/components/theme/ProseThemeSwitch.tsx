import { useProseTheme } from "./useProseTheme";
import { useTranslation } from "react-i18next";
import { Switch } from "@headlessui/react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function ProseThemeSwitch() {
  const { theme, setTheme, toggle } = useProseTheme();
  const next = theme === "theme-dark" ? "theme-paper" : "theme-dark";
  const { t } = useTranslation("common");
  const isDark = theme === "theme-dark";

  return (
    <div className="flex items-center">
      {/* MOBILE : bouton icône, même logique que le bouton langue */}
      <button
        type="button"
        onClick={toggle}
        className="nav-icon-btn md:!hidden"
        aria-label={t(`theme.${next}`)}
        aria-pressed={isDark}
        data-active={isDark ? "true" : "false"}
      >
        {isDark ? (
          <MoonIcon className="h-5 w-5" />
        ) : (
          <SunIcon className="h-5 w-5" />
        )}
      </button>

      {/* TABLET/DESKTOP : HeadlessUI Switch avec soleil/lune */}
      <Switch
        checked={isDark}
        onChange={(checked) => setTheme(checked ? "theme-dark" : "theme-paper")}
        className="relative hidden md:inline-flex h-8 w-16 items-center rounded-full border
                   border-[var(--header-border)] bg-[var(--header-bg)]
                   focus:outline-none focus-visible:ring-2
                   focus-visible:ring-[--color-str4t0tt0-primary]
                   focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--header-bg)]"
        aria-label={t(`theme.${next}`)}
      >
        {/* Icônes dans le switch */}
        <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
          <SunIcon className="h-4 w-4 opacity-80" aria-hidden />
          <MoonIcon className="h-4 w-4 opacity-80" aria-hidden />
        </span>
        {/* Thumb */}
        <span
          className={`inline-block h-6 w-6 transform rounded-full transition 
              bg-black/15 html:theme-dark:bg-white/25
              ${isDark ? "translate-x-8" : "translate-x-1"}`}
        />
      </Switch>
    </div>
  );
}
