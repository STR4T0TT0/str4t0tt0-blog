import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import fr from "./fr.json";
import it from "./it.json";

// Gstion en sous repertoire permet de mutualiser l’autorité du domaine principal
const resources = {
  en: { translation: en },
  fr: { translation: fr },
  it: { translation: it },
};

// fallback sur l'anglais restaure le dernier choix si on navigue direct sur une page interne
const stored =
  typeof window !== "undefined" ? localStorage.getItem("lang") : null;

i18n.use(initReactI18next).init({
  resources,
  lng: stored || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
