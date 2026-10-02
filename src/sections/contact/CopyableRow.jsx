import { useState } from "react";
import Icon from "../../components/icons/Icon.jsx";
import ContactRow from "./ContactRow.jsx";
import { useTr } from "../../hooks/useTr.js";
import { UI } from "../../data/ui.js";

const COPIED_FEEDBACK_MS = 1500;

export default function CopyableRow({ icon, value, href, accent }) {
  const tr = useTr();
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
    } catch {
      window.location.href = href; // clipboard unavailable: fall back to the link
    }
  };

  return (
    <ContactRow icon={icon} accent={accent}>
      <a href={href} className="flex-1 text-sm text-slate-300 hover:text-slate-100">
        {value}
      </a>
      <button
        onClick={handleCopy}
        className="shrink-0 text-xs font-medium text-slate-500 transition-colors hover:text-cyan-400"
      >
        {copied ? (
          <span className="inline-flex items-center gap-1 text-emerald-400">
            <Icon name="check" size={13} />
            {tr(UI.contact.copied)}
          </span>
        ) : (
          tr(UI.contact.copy)
        )}
      </button>
    </ContactRow>
  );
}
