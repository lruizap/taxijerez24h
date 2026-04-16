import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import translations, { Lang, langNames } from "./translations";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("taxi-lang") as Lang;
    return saved && translations[saved] ? saved : "es";
  });

  const handleSetLang = useCallback((newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem("taxi-lang", newLang);
  }, []);

  const t = useCallback(
    (key: string) => translations[lang]?.[key] || translations.es[key] || key,
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};

export { langNames };
export type { Lang };
