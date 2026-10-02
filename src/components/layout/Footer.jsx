import Icon from "../icons/Icon.jsx";
import { useTr } from "../../hooks/useTr.js";
import { PROFILE, SOCIALS } from "../../data/profile.js";
import { UI } from "../../data/ui.js";

export default function Footer() {
  const tr = useTr();

  return (
    <footer className="border-t border-[#171d2b] px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} {PROFILE.name}. {tr(UI.rights)}
        </p>
        <div className="flex gap-4">
          {SOCIALS.map(({ icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="text-slate-500 transition-colors hover:text-slate-200"
            >
              <Icon name={icon} size={17} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
