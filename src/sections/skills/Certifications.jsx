import { motion } from "framer-motion";
import Icon from "../../components/icons/Icon.jsx";
import Reveal from "../../components/common/Reveal.jsx";
import { useTr } from "../../hooks/useTr.js";
import { CERTIFICATIONS } from "../../data/skills.js";
import { UI } from "../../data/ui.js";
import { CARD, ICON_BOX } from "../../utils/styles.js";

export default function Certifications() {
  const tr = useTr();

  return (
    <Reveal className={`mt-6 ${CARD} p-6 sm:p-8`}>
      <div className="flex items-center gap-3">
        <div className={`${ICON_BOX} text-emerald-400`}>
          <Icon name="shield" size={18} aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-base font-medium text-slate-100">{tr(UI.cert.title)}</h3>
          <p className="text-sm text-slate-500">{tr(UI.cert.description)}</p>
        </div>
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {CERTIFICATIONS.map((cert) => (
          <li key={cert.name}>
            <span className="text-sm text-slate-300">{cert.name}</span>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#0e1420]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${cert.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full bg-emerald-500"
              />
            </div>
            <div className="mt-1 text-xs text-slate-500">
              {cert.level}
              {tr(UI.cert.complete)}
            </div>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
