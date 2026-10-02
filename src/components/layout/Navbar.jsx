import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../icons/Icon.jsx";
import LanguageToggle from "../common/LanguageToggle.jsx";
import { useLang } from "../../hooks/useLang.js";
import { useTr } from "../../hooks/useTr.js";
import { useActiveSection } from "../../hooks/useActiveSection.js";
import { scrollToId } from "../../utils/scroll.js";
import { NAV_IDS, PROFILE } from "../../data/profile.js";
import { UI } from "../../data/ui.js";

const SCROLL_THRESHOLD = 12;

export default function Navbar() {
  const { lang } = useLang();
  const tr = useTr();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(NAV_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6">
      <nav
        className={`w-full max-w-5xl rounded-2xl border transition-colors duration-300 ${
          scrolled
            ? "border-[#232a3b] bg-[#0b0f17]/80 shadow-[0_8px_30px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <button
            onClick={() => go("hero")}
            className="text-[15px] font-semibold tracking-tight text-slate-100"
            aria-label={lang === "fr" ? "Retour à l'accueil" : "Back to home"}
          >
            {PROFILE.name}
            <span className="text-cyan-400">.</span>
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_IDS.map((id) => (
              <li key={id}>
                <button
                  onClick={() => go(id)}
                  className={`relative rounded-lg px-3.5 py-2 text-sm transition-colors ${
                    active === id ? "text-slate-100" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tr(UI.nav[id])}
                  {active === id && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-lg border border-white/10 bg-white/5"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <LanguageToggle />
            <button
              onClick={() => go("contact")}
              className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-[#0b0f17] transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              {tr(UI.contactCta)}
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle compact />
            <button
              className="text-slate-200"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
            >
              <Icon name={open ? "x" : "menu"} size={22} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden border-t border-[#232a3b] md:hidden"
            >
              <ul className="flex flex-col gap-1 px-4 py-3">
                {NAV_IDS.map((id) => (
                  <li key={id}>
                    <button
                      onClick={() => go(id)}
                      className={`w-full rounded-lg px-3 py-2.5 text-left text-sm ${
                        active === id ? "bg-white/5 text-slate-100" : "text-slate-400"
                      }`}
                    >
                      {tr(UI.nav[id])}
                    </button>
                  </li>
                ))}
                <li className="pt-2">
                  <button
                    onClick={() => go("contact")}
                    className="w-full rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-medium text-[#0b0f17]"
                  >
                    {tr(UI.contactCta)}
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
