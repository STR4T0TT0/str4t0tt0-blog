import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import UnderConstruction from "./UnderConstruction";

const SUPPORTED = ["en", "fr", "it"];

function LangWrapper() {
  const { i18n } = useTranslation();
  const { lang } = useParams(); // ex: "en" | "fr" | "it" | inconnu
  const navigate = useNavigate();

  useEffect(() => {
    const target = SUPPORTED.includes(lang) ? lang : "en";

    // Redirige si la langue n'est pas supportée
    if (lang !== target) {
      navigate(`/${target}`, { replace: true });
      return;
    }

    // Applique la langue i18n + persiste
    if (i18n.resolvedLanguage !== target) i18n.changeLanguage(target);
    localStorage.setItem("lang", target);
  }, [lang, i18n, navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#0d1117",
      }}
    >
      <UnderConstruction />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:lang" element={<LangWrapper />} />
        <Route path="/" element={<Navigate to="/en" replace />} />
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
