import SectionHeading from "../../components/common/SectionHeading.jsx";
import TimelineItem from "./TimelineItem.jsx";
import { useTr } from "../../hooks/useTr.js";
import { EXPERIENCE } from "../../data/experience.js";
import { UI } from "../../data/ui.js";
import { SECTION } from "../../utils/styles.js";

export default function Experience() {
  const tr = useTr();

  return (
    <section id="experience" className={SECTION}>
      <div className="mx-auto max-w-3xl">
        <SectionHeading title={tr(UI.experience.title)} description={tr(UI.experience.description)} />
        <div className="mt-12">
          {EXPERIENCE.map((item, i) => (
            <TimelineItem key={item.id} item={item} index={i} isLast={i === EXPERIENCE.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
