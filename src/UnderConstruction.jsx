import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import "./underconstruction.css";
import bg from "./assets/underconstruction-str4t0tt0-1920.webp";

export default function UnderConstruction() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("title");
  }, [t]);

  return (
    <main className="uc" style={{ "--bgImg": `url(${bg})` }}>
      <div className="uc-card">
        <h1>{t("uc.h1")}</h1>
        <p>{t("uc.p1")}</p>
        <p className="muted">{t("uc.p2")}</p>

        <nav className="uc-links" aria-label="Primary links">
          <a
            href="https://medium.com/@str4t0tt0"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("uc.links.medium")}
          </a>
          <a
            href="https://raindrop.io/str4t0tt0"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("uc.links.raindrop")}
          </a>
          <a
            href="https://github.com/str4t0tt0"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("uc.links.github")}
          </a>
        </nav>
      </div>
    </main>
  );
}
