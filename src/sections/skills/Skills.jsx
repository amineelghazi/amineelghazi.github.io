import SectionHeading from "../../components/common/SectionHeading.jsx";
import SkillCard from "./SkillCard.jsx";
import Certifications from "./Certifications.jsx";
import { useTr } from "../../hooks/useTr.js";
import { SKILL_CATEGORIES } from "../../data/skills.js";
import { UI } from "../../data/ui.js";
import { SECTION } from "../../utils/styles.js";

export default function Skills() {
  const tr = useTr();

  return (
    <section id="skills" className={SECTION}>
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={tr(UI.skills.title)} description={tr(UI.skills.description)} />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_CATEGORIES.map((category, i) => (
            <SkillCard key={category.key} category={category} index={i} />
          ))}
        </div>
        <Certifications />
      </div>
    </section>
  );
}
