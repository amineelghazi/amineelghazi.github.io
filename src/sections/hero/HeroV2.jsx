import { useLang } from "../../hooks/useLang.js";
import { scrollToId } from "../../utils/scroll.js";

const copy = {
  fr: {
    eyebrow: "Développeur logiciel",
    title: "Salut, je suis Amine El Ghazi.",
    subtitle:
      "Étudiant en développement logiciel, passionné par le web, la cybersécurité et la création de produits robustes.",
    ctaProjects: "Voir mes projets",
    ctaContact: "Me contacter",
  },
  en: {
    eyebrow: "Software developer",
    title: "Hi, I'm Amine El Ghazi.",
    subtitle:
      "Software development student, passionate about the web, cybersecurity and building robust products.",
    ctaProjects: "View my projects",
    ctaContact: "Contact me",
  },
};

export function HeroV2() {
  const { lang } = useLang();
  const t = copy[lang] ?? copy.fr;

  return (
    <section
      id="hero"
      className="flex min-h-screen items-center px-6 pt-24"
    >
      <div className="mx-auto w-full max-w-5xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-cyan-400">
          {t.eyebrow}
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
          {t.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-400">{t.subtitle}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <button
            onClick={() => scrollToId("projects")}
            className="rounded-lg bg-white px-5 py-2.5 font-medium text-slate-900 transition hover:bg-slate-200"
          >
            {t.ctaProjects}
          </button>
          <button
            onClick={() => scrollToId("contact")}
            className="rounded-lg border border-slate-700 px-5 py-2.5 font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
          >
            {t.ctaContact}
          </button>
        </div>
      </div>
    </section>
  );
}