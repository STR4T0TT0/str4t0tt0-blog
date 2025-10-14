import { useEffect, useState } from "react";

export type ProseTheme = "theme-dark" | "theme-paper";
const KEY = "proseTheme";

export function useProseTheme() {
  const [theme, setTheme] = useState<ProseTheme>(() => {
    const saved = (localStorage.getItem(KEY) as ProseTheme) || "theme-dark";
    return saved;
  });

  useEffect(() => {
    const root = document.documentElement; // <html>
    root.classList.remove("theme-dark", "theme-paper");
    root.classList.add(theme);
    localStorage.setItem(KEY, theme);
  }, [theme]);

  // évite de réécrire la logique partout
  const toggle = () =>
    setTheme((t) => (t === "theme-dark" ? "theme-paper" : "theme-dark"));

  return { theme, setTheme, toggle } as const;
}
