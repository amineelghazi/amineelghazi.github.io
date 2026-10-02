import Icon from "../../components/icons/Icon.jsx";
import Reveal from "../../components/common/Reveal.jsx";
import { useTr } from "../../hooks/useTr.js";
import { ACCENTS, CARD, CHIP, ICON_BOX } from "../../utils/styles.js";

export default function SkillCard({ category, index }) {
  const tr = useTr();
  const accent = ACCENTS[category.accent];

  return (
    <Reveal delay={index * 0.08} className={`${CARD} p-6 transition-all duration-300 ${accent.hover}`}>
      <div className="flex items-center gap-3">
        <div className={`${ICON_BOX} ${accent.text}`}>
          <Icon name={category.icon} size={18} aria-hidden="true" />
        </div>
        <h3 className="text-base font-medium text-slate-100">{tr(category.title)}</h3>
      </div>
      <ul className="mt-5 flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <li key={skill} className={`${CHIP} text-sm text-slate-300`}>
            {skill}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
