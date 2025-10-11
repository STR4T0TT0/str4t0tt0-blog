import { useProseTheme } from "./useProseTheme";
import { useTranslation } from "react-i18next";

export default function ProseThemeSwitch() {
  const { theme, setTheme } = useProseTheme();
  const next = theme === "theme-dark" ? "theme-paper" : "theme-dark";
  const { t } = useTranslation("common");

  return (
    <button
      onClick={() => setTheme(next)}
      className="text-xs px-2 py-1 border border-white/20 rounded hover:bg-white/10"
      aria-label={t(`theme.${next}`)}
    >
      {t(`theme.${theme === "theme-dark" ? "dark" : "paper"}`)}
    </button>
  );
}
