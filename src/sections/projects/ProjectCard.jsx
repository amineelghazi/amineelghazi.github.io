import Icon from "../../components/icons/Icon.jsx";
import Reveal from "../../components/common/Reveal.jsx";
import { useTr } from "../../hooks/useTr.js";
import { UI } from "../../data/ui.js";
import { CARD, CHIP } from "../../utils/styles.js";
import ImageCarousel from "../../components/common/ImageCarousel.jsx";

function getCodeLinks(project, tr) {
  if (project.codeUrls.length === 1) {
    return [{ label: tr(UI.projects.code), url: project.codeUrls[0].url }];
  }
  return project.codeUrls;
}

export default function ProjectCard({ project, index }) {
  const tr = useTr();
  const codeLinks = getCodeLinks(project, tr);
  const images = project.images?.length
    ? project.images
    : project.image
      ? [project.image]
      : [];

  return (
    <Reveal
      delay={index * 0.1}
      duration={0.5}
      y={20}
      whileHover={{ y: -6 }}
      className={`group flex flex-col overflow-hidden ${CARD} transition-colors duration-300 hover:border-slate-600`}
    >
      <div
        className={`h-44 overflow-hidden border-b border-[#232a3b] bg-gradient-to-br ${project.gradient}`}
      >
        <ImageCarousel images={images} alt={tr(project.title)} />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-medium text-slate-100">
          {tr(project.title)}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
          {tr(project.description)}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className={`${CHIP} text-xs text-slate-400`}>
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#232a3b] pt-4">
          {codeLinks.map((repo) => (
            <a
              key={repo.label}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-slate-200"
            >
              <Icon name="github" size={15} />
              {repo.label}
            </a>
          ))}
          {codeLinks.length === 0 && (
            <span className="text-sm text-slate-500">
              {tr(UI.projects.noCode)}
            </span>
          )}
        </div>
      </div>
    </Reveal>
  );
}
