import Icon from "../icons/Icon.jsx";
import { useLang } from "../../hooks/useLang.js";

export default function LanguageToggle({ compact = false }) {
  const { lang, toggleLang } = useLang();
  const tone = (l) => (lang === l ? "text-slate-100" : "text-slate-500");

  return (
    <button
      onClick={toggleLang}
      aria-label={lang === "fr" ? "Switch to English" : "Passer en français"}
      className={`inline-flex items-center gap-1.5 rounded-lg border border-[#232a3b] bg-[#161b26]/60 text-slate-200 backdrop-blur transition-colors hover:border-slate-600 ${
        compact ? "px-3 py-2 text-xs" : "px-3.5 py-2 text-sm"
      }`}
    >
      <Icon name="globe" size={compact ? 14 : 15} />
      <span className={tone("fr")}>FR</span>
      <span className="text-slate-600">/</span>
      <span className={tone("en")}>EN</span>
    </button>
  );
}
