import { createContext, useCallback, useMemo, useState } from "react";

export const DEFAULT_LANG = "fr";

export const LanguageContext = createContext({
  lang: DEFAULT_LANG,
  toggleLang: () => {},
});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(DEFAULT_LANG);
  const toggleLang = useCallback(() => setLang((l) => (l === "fr" ? "en" : "fr")), []);
  const value = useMemo(() => ({ lang, toggleLang }), [lang, toggleLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
