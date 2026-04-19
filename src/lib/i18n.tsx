import React, { createContext, useContext, useEffect, useState } from "react";
import ar from "../locales/ar";
import en from "../locales/en";
import tr from "../locales/tr";

export type Language = "ar" | "en" | "tr";

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  dir: "rtl" | "ltr";
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);
const dictionaries = { ar, en, tr };

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window === "undefined") return "ar";
    const savedLang = localStorage.getItem("lang") as Language | null;
    return savedLang && ["ar", "en", "tr"].includes(savedLang) ? savedLang : "ar";
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: unknown = dictionaries[lang];
    for (const k of keys) {
      if (!value || typeof value !== "object" || !(k in value)) return key;
      value = (value as Record<string, unknown>)[k];
    }
    return typeof value === "string" ? value : key;
  };

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    document.documentElement.style.fontFamily = lang === "ar" ? "'Cairo', 'Tajawal', sans-serif" : "'Inter', sans-serif";
  }, [lang, dir]);

  return <I18nContext.Provider value={{ lang, setLang, t, dir }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within an I18nProvider");
  return context;
}
