import SectionHeading from "../../components/common/SectionHeading.jsx";
import ProjectCard from "./ProjectCard.jsx";
import { useTr } from "../../hooks/useTr.js";
import { PROJECTS } from "../../data/projects.js";
import { UI } from "../../data/ui.js";
import { SECTION } from "../../utils/styles.js";

export default function Projects() {
  const tr = useTr();

  return (
    <section id="projects" className={SECTION}>
      <div className="mx-auto max-w-4xl">
        <SectionHeading title={tr(UI.projects.title)} description={tr(UI.projects.description)} />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
