import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/* ============================================================================
   ICONES — remplacement de lucide-react par des SVG inline
   ----------------------------------------------------------------------------
   Raison du correctif : la page blanche vient presque toujours d'une erreur
   JS silencieuse au moment de l'import du module (version incompatible,
   package non installé, ou chargement via CDN sans build adapté). React
   n'affiche alors strictement rien, sans message visible. En définissant les
   icônes localement en SVG, on retire complètement cette dépendance externe
   et donc ce point de défaillance — tout en gardant le même rendu visuel.
   ========================================================================= */

function iconBase({ size = 24, className = "", children, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}

const Menu = (props) =>
  iconBase({
    ...props,
    children: (
      <>
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </>
    ),
  });

const X = (props) =>
  iconBase({
    ...props,
    children: (
      <>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </>
    ),
  });

const ArrowUpRight = (props) =>
  iconBase({
    ...props,
    children: (
      <>
        <path d="M7 7h10v10" />
        <path d="M7 17 17 7" />
      </>
    ),
  });

const Github = (props) =>
  iconBase({
    ...props,
    children: (
      <>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </>
    ),
  });

const Linkedin = (props) =>
  iconBase({
    ...props,
    children: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  });

const Mail = (props) =>
  iconBase({
    ...props,
    children: (
      <>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </>
    ),
  });

const MapPin = (props) =>
  iconBase({
    ...props,
    children: (
      <>
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  });

const Download = (props) =>
  iconBase({
    ...props,
    children: (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
      </>
    ),
  });

const ExternalLink = (props) =>
  iconBase({
    ...props,
    children: (
      <>
        <path d="M15 3h6v6" />
        <path d="M10 14 21 3" />
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      </>
    ),
  });

const Code2 = (props) =>
  iconBase({
    ...props,
    children: (
      <>
        <path d="m18 16 4-4-4-4" />
        <path d="m6 8-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </>
    ),
  });

const Server = (props) =>
  iconBase({
    ...props,
    children: (
      <>
        <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
        <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
        <line x1="6" x2="6.01" y1="6" y2="6" />
        <line x1="6" x2="6.01" y1="18" y2="18" />
      </>
    ),
  });

const Database = (props) =>
  iconBase({
    ...props,
    children: (
      <>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5V19A9 3 0 0 0 21 19V5" />
        <path d="M3 12A9 3 0 0 0 21 12" />
      </>
    ),
  });

const Wrench = (props) =>
  iconBase({
    ...props,
    children: (
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    ),
  });

const Send = (props) =>
  iconBase({
    ...props,
    children: (
      <>
        <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
        <path d="m21.854 2.147-10.94 10.939" />
      </>
    ),
  });

const CheckCircle2 = (props) =>
  iconBase({
    ...props,
    children: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  });

const Circle = (props) =>
  iconBase({
    ...props,
    children: <circle cx="12" cy="12" r="10" />,
  });

const Shield = (props) =>
  iconBase({
    ...props,
    children: (
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    ),
  });

const Phone = (props) =>
  iconBase({
    ...props,
    children: (
      <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
    ),
  });

const PROFILE = {
  name: "Amine El Ghazi",
  role: "Développeur Full-Stack & Cybersécurité",
  availability: "Disponible pour un stage",
  bio: "Étudiant en Techniques de l'informatique, je conçois des applications full-stack avec NestJS et React, et je développe des jeux 2D avec Unity. Curieux et rigoureux, je m'investis aussi en cybersécurité à travers des certifications Hack The Box. Je cherche un stage où mettre ces compétences au service de projets concrets.",
  location: "Montréal, QC, Canada",
  email: "amineelghazi100@hotmail.com",
  phone: "438-410-1304",

  cvUrl: "/Amine_El_Ghazi_CV.pdf",
  socials: {
    github: "https://github.com/amineelghazi",
    linkedin: "https://linkedin.com/in/amineelghazi",
  },
};

const NAV_LINKS = [
  { id: "hero", label: "Accueil" },
  { id: "skills", label: "Compétences" },
  { id: "projects", label: "Projets" },
  { id: "experience", label: "Parcours" },
  { id: "contact", label: "Contact" },
];

const STATS = [
  { value: "5+", label: "Langages maîtrisés" },
  { value: "2", label: "Projets collégiaux livrés" },
  { value: "3", label: "Certifications HTB en cours" },
  { value: "2027", label: "Fin de formation prévue" },
];

const SKILL_CATEGORIES = [
  {
    key: "languages",
    title: "Langages",
    icon: Code2,
    accent: "cyan",
    skills: [
      { name: "JavaScript / TypeScript", level: 80 },
      { name: "Java", level: 75 },
      { name: "C#", level: 75 },
      { name: "Python", level: 65 },
      { name: "SQL", level: 70 },
    ],
  },
  {
    key: "frameworks",
    title: "Frameworks",
    icon: Server,
    accent: "violet",
    skills: [
      { name: "NestJS", level: 78 },
      { name: "React", level: 78 },
      { name: "Unity", level: 70 },
      { name: "Spring", level: 55 },
      { name: "Flask", level: 55 },
    ],
  },
  {
    key: "database",
    title: "Bases de données",
    icon: Database,
    accent: "emerald",
    skills: [
      { name: "PostgreSQL", level: 72 },
      { name: "MongoDB", level: 65 },
      { name: "SQLite", level: 60 },
    ],
  },
  {
    key: "tools",
    title: "Outils & Pratiques",
    icon: Wrench,
    accent: "cyan",
    skills: [
      { name: "Git / GitHub", level: 85 },
      { name: "Docker", level: 65 },
      { name: "REST API", level: 78 },
      { name: "Agile / Scrum", level: 70 },
      { name: "Linux / WSL", level: 65 },
    ],
  },
];

const CERTIFICATIONS = [
  { name: "HTB Certified Penetration Testing Specialist (CPTS)", level: 44 },
  { name: "HTB Certified Web Exploitation Specialist (CWES)", level: 41 },
  { name: "HTB Certified Junior Cybersecurity Associate (CJCA)", level: 34 },
];

const PROJECTS = [
  {
    id: "u-owl",
    title: "U-Owl — Location de camions en temps réel",
    description:
      "Projet collégial de location de camions avec visualisation en temps réel de la disponibilité du stock sur une carte interactive. Développement du frontend (localisation live, UX), de la communication frontend-backend et de l'authentification, contribution ponctuelle au backend, et conteneurisation avec Docker.",
    tags: ["React", "TypeScript", "Vite", "NestJS", "Docker"],
    image: "/u-owl.png",
    liveUrl: null,
    codeUrls: [
      { label: "Frontend", url: "https://github.com/Khaled-AbHe/U-Owl-Frontend" },
      { label: "Backend", url: "https://github.com/Khaled-AbHe/U-Owl-Backend" },
    ],
    gradient: "from-cyan-500/20 via-cyan-500/5 to-transparent",
    accentText: "text-cyan-400",
  },
  {
    id: "cinetrack",
    title: "CineTrack — Découverte & suivi de films/séries",
    description:
      "Plateforme collégiale de découverte et de suivi de films et séries (fiches, favoris, commentaires) intégrant une API externe pour les métadonnées. Product Owner pour une équipe de 6 développeurs (gestion Jira, epics, spécification des exigences) ; développement de la vérification de compte par courriel et de la fonctionnalité de favoris de bout en bout.",
    tags: ["C#", "WPF", "SQL", "Jira", "Gestion de produit"],
    image: "/cinetrack.png",
    liveUrl: null,
    codeUrls: [],
    gradient: "from-violet-500/20 via-violet-500/5 to-transparent",
    accentText: "text-violet-400",
  },
];

const EXPERIENCE = [
  {
    id: "exp-1",
    period: "Février 2026 — Mai 2026",
    title: "Product Owner & Développeur — CineTrack",
    org: "Projet collégial",
    description:
      "Product Owner pour une équipe de 6 développeurs : gestion du projet sur Jira, rédaction des epics et cas d'utilisation. Développement de la vérification de compte par courriel et de la fonctionnalité de favoris de bout en bout (base de données, ViewModels WPF).",
    type: "work",
  },
  {
    id: "exp-2",
    period: "Janvier 2026 — Mai 2026",
    title: "Développeur Full-Stack — U-Owl",
    org: "Projet collégial",
    description:
      "Développement du frontend React/TypeScript (localisation de stock en temps réel), implémentation de la communication frontend-backend et de l'authentification, contribution au backend NestJS et déploiement avec Docker.",
    type: "work",
  },
  {
    id: "exp-3",
    period: "2023 — 2027",
    title: "Technique de l'informatique (420.B0)",
    org: "Cégep Marie-Victorin",
    description:
      "Formation collégiale en développement logiciel, avec un intérêt marqué pour la cybersécurité et les bonnes pratiques (REST API, Agile/Scrum, UML, MVC).",
    type: "education",
  },
];

const CODE_SNIPPET = `const architect = (idea) => {
  const design = plan(idea);
  const system = build(design, {
    scalable: true,
    tested: true,
  });

  return ship(system);
};`;

/* ============================================================================
   HELPERS
   ========================================================================= */

const ACCENT_STYLES = {
  cyan: {
    text: "text-cyan-400",
    bg: "bg-cyan-500",
    ring: "ring-cyan-500/40",
    border: "hover:border-cyan-500/50",
    glow: "hover:shadow-[0_0_40px_-12px_rgba(6,182,212,0.45)]",
  },
  violet: {
    text: "text-violet-400",
    bg: "bg-violet-500",
    ring: "ring-violet-500/40",
    border: "hover:border-violet-500/50",
    glow: "hover:shadow-[0_0_40px_-12px_rgba(139,92,246,0.45)]",
  },
  emerald: {
    text: "text-emerald-400",
    bg: "bg-emerald-500",
    ring: "ring-emerald-500/40",
    border: "hover:border-emerald-500/50",
    glow: "hover:shadow-[0_0_40px_-12px_rgba(16,185,129,0.45)]",
  },
};

function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0]);

  useEffect(() => {
    const observers = [];
    const options = { rootMargin: "-45% 0px -50% 0px", threshold: 0 };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(id);
        });
      }, options);
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds]);

  return active;
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ============================================================================
   NAVBAR
   ========================================================================= */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(NAV_LINKS.map((l) => l.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 sm:px-6 pt-4">
      <nav
        className={`w-full max-w-5xl rounded-2xl border transition-colors duration-300 ${
          scrolled
            ? "border-[#232a3b] bg-[#0b0f17]/80 backdrop-blur-xl shadow-[0_8px_30px_-15px_rgba(0,0,0,0.6)]"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          <button
            onClick={() => handleNavClick("hero")}
            className="text-[15px] font-semibold tracking-tight text-slate-100"
            aria-label="Retour à l'accueil"
          >
            {PROFILE.name}
            <span className="text-cyan-400">.</span>
          </button>

          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3.5 py-2 text-sm rounded-lg transition-colors ${
                    activeSection === link.id
                      ? "text-slate-100"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-white/5 border border-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <button
              onClick={() => handleNavClick("contact")}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-[#0b0f17] transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Me contacter
            </button>
          </div>

          <button
            className="md:hidden text-slate-200"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-[#232a3b]"
            >
              <ul className="flex flex-col gap-1 px-4 py-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => handleNavClick(link.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm ${
                        activeSection === link.id
                          ? "bg-white/5 text-slate-100"
                          : "text-slate-400"
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
                <li className="pt-2">
                  <button
                    onClick={() => handleNavClick("contact")}
                    className="w-full rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-medium text-[#0b0f17]"
                  >
                    Me contacter
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

/* ============================================================================
   HERO
   ========================================================================= */

function Hero() {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTyped(CODE_SNIPPET.slice(0, i));
      if (i >= CODE_SNIPPET.length) clearInterval(interval);
    }, 18);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center px-4 sm:px-6 pt-28 pb-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/4 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute top-1/3 right-0 h-[380px] w-[380px] rounded-full bg-violet-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#232a3b] bg-[#161b26]/60 px-3.5 py-1.5 text-xs text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {PROFILE.availability}
          </div>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
          
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
              {PROFILE.role}
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg">
            {PROFILE.bio}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollToId("projects")}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-cyan-500/10 transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Voir mes projets
              <ArrowUpRight size={16} />
            </button>
            <a
              href={PROFILE.cvUrl}
              className="inline-flex items-center gap-2 rounded-xl border border-[#232a3b] bg-[#161b26]/60 px-5 py-3 text-sm font-medium text-slate-200 backdrop-blur transition-colors hover:border-slate-600"
            >
              <Download size={16} />
              Télécharger CV
            </a>
            <a
              href={PROFILE.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Profil GitHub"
              className="inline-flex items-center gap-2 rounded-xl border border-[#232a3b] bg-[#161b26]/60 px-4 py-3 text-sm font-medium text-slate-200 backdrop-blur transition-colors hover:border-slate-600"
            >
              <Github size={16} />
              GitHub
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="relative"
        >
          <div className="rounded-2xl border border-[#232a3b] bg-[#0e1420]/80 shadow-2xl shadow-black/40 backdrop-blur">
            <div className="flex items-center gap-1.5 border-b border-[#232a3b] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-3 text-xs text-slate-500">architecture.ts</span>
            </div>
            <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed">
              <code className="font-mono text-slate-300">
                {typed}
                <span className="animate-pulse text-cyan-400">▌</span>
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================================
   STATS BANNER
   ========================================================================= */

function StatsBanner() {
  return (
    <section className="border-y border-[#171d2b] bg-[#0d121c] px-4 sm:px-6 py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-4">
        {STATS.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            className="text-center sm:text-left"
          >
            <div className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
              {stat.value}
            </div>
            <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================================
   SKILLS
   ========================================================================= */

function SkillCard({ category, index }) {
  const Icon = category.icon;
  const accent = ACCENT_STYLES[category.accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className={`group rounded-2xl border border-[#232a3b] bg-[#161b26]/60 p-6 backdrop-blur transition-all duration-300 ${accent.border} ${accent.glow}`}
    >
      <div className="flex items-center gap-3">
        <div className={`rounded-lg border border-[#232a3b] bg-[#0e1420] p-2 ${accent.text}`}>
          <Icon size={18} aria-hidden="true" />
        </div>
        <h3 className="text-base font-medium text-slate-100">{category.title}</h3>
      </div>

      <ul className="mt-5 space-y-4">
        {category.skills.map((skill) => (
          <li key={skill.name}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300">{skill.name}</span>
              <span className="text-slate-500">{skill.level}%</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#0e1420]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                className={`h-full rounded-full ${accent.bg}`}
              />
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function Skills() {
  return (
    <section id="skills" className="px-4 sm:px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Compétences techniques"
          description="Un ensemble d'outils choisis pour livrer des produits robustes, du premier prototype à la mise en production."
        />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_CATEGORIES.map((category, idx) => (
            <SkillCard category={category} index={idx} key={category.key} />
          ))}
        </div>

        <Certifications />
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45 }}
      className="mt-6 rounded-2xl border border-[#232a3b] bg-[#161b26]/60 p-6 backdrop-blur sm:p-8"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-lg border border-[#232a3b] bg-[#0e1420] p-2 text-emerald-400">
          <Shield size={18} aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-base font-medium text-slate-100">
            Certifications en cours — Hack The Box
          </h3>
          <p className="text-sm text-slate-500">
            Progression actuelle de mes parcours de certification en cybersécurité.
          </p>
        </div>
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {CERTIFICATIONS.map((cert) => (
          <li key={cert.name}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300">{cert.name}</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#0e1420]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${cert.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full rounded-full bg-emerald-500"
              />
            </div>
            <div className="mt-1 text-xs text-slate-500">{cert.level}% complété</div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

/* ============================================================================
   SECTION HEADING (shared)
   ========================================================================= */

function SectionHeading({ title, description, align = "left" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}
    >
      <h2 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-slate-400">
          {description}
        </p>
      )}
    </motion.div>
  );
}

/* ============================================================================
   PROJECTS
   ========================================================================= */

function ProjectCard({ project, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#232a3b] bg-[#161b26]/60 backdrop-blur transition-colors duration-300 hover:border-slate-600"
    >
      <div
        className={`relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br ${project.gradient} border-b border-[#232a3b]`}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={`Aperçu du projet ${project.title}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <Code2
            size={40}
            className={`${project.accentText} opacity-70 transition-transform duration-500 group-hover:scale-110`}
            aria-hidden="true"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-medium text-slate-100">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-[#232a3b] bg-[#0e1420] px-2.5 py-1 text-xs text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#232a3b] pt-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-200 hover:text-cyan-400"
            >
              <ExternalLink size={15} />
              Démo live
            </a>
          )}

          {project.codeUrls?.length === 1 && (
            <a
              href={project.codeUrls[0].url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-slate-200"
            >
              <Github size={15} />
              Code source
            </a>
          )}

          {project.codeUrls?.length > 1 &&
            project.codeUrls.map((repo) => (
              <a
                key={repo.label}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-slate-200"
              >
                <Github size={15} />
                {repo.label}
              </a>
            ))}

          {!project.liveUrl && !project.codeUrls?.length && (
            <span className="text-sm text-slate-500">
              Projet académique — code non public
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function Projects() {
  return (
    <section id="projects" className="px-4 sm:px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          title="Projets vedettes"
          description="Des projets collégiaux conçus en équipe, du cahier des charges à la mise en production."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.map((project, idx) => (
            <ProjectCard project={project} index={idx} key={project.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   EXPERIENCE / TIMELINE
   ========================================================================= */

function TimelineItem({ item, index, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="relative pl-10 pb-10 last:pb-0"
    >
      {!isLast && (
        <span className="absolute left-[7px] top-3 h-full w-px bg-[#232a3b]" aria-hidden="true" />
      )}
      <span
        className={`absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border ${
          item.type === "work"
            ? "border-cyan-500/60 bg-cyan-500/10"
            : "border-violet-500/60 bg-violet-500/10"
        }`}
        aria-hidden="true"
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            item.type === "work" ? "bg-cyan-400" : "bg-violet-400"
          }`}
        />
      </span>

      <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {item.period}
      </div>
      <h3 className="mt-1.5 text-base font-medium text-slate-100">{item.title}</h3>
      <div className="text-sm text-slate-400">{item.org}</div>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">
        {item.description}
      </p>
    </motion.div>
  );
}

function Experience() {
  return (
    <section id="experience" className="px-4 sm:px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          title="Parcours & expérience"
          description="Les étapes qui ont construit mon approche du développement logiciel."
        />
        <div className="mt-12">
          {EXPERIENCE.map((item, idx) => (
            <TimelineItem
              item={item}
              index={idx}
              isLast={idx === EXPERIENCE.length - 1}
              key={item.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   CONTACT
   ========================================================================= */

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | sent

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setStatus("submitting");
      // Remplace ce bloc par ton appel API / service d'envoi d'email.
      setTimeout(() => {
        setStatus("sent");
      }, 900);
    },
    []
  );

  if (status === "sent") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-[#232a3b] bg-[#161b26]/60 p-10 text-center backdrop-blur">
        <CheckCircle2 className="text-emerald-400" size={32} />
        <h3 className="mt-4 text-lg font-medium text-slate-100">Message envoyé</h3>
        <p className="mt-2 max-w-xs text-sm text-slate-400">
          Merci pour votre message, je reviens vers vous rapidement.
        </p>
        <button
          onClick={() => {
            setForm({ name: "", email: "", subject: "", message: "" });
            setStatus("idle");
          }}
          className="mt-6 text-sm font-medium text-cyan-400 hover:text-cyan-300"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[#232a3b] bg-[#161b26]/60 p-6 backdrop-blur sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm text-slate-300">
            Nom
          </label>
          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange("name")}
            placeholder="Votre nom"
            className="mt-1.5 w-full rounded-lg border border-[#232a3b] bg-[#0e1420] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-colors focus:border-cyan-500/60"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm text-slate-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange("email")}
            placeholder="vous@exemple.com"
            className="mt-1.5 w-full rounded-lg border border-[#232a3b] bg-[#0e1420] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-colors focus:border-cyan-500/60"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="subject" className="text-sm text-slate-300">
          Sujet
        </label>
        <input
          id="subject"
          type="text"
          required
          value={form.subject}
          onChange={handleChange("subject")}
          placeholder="Sujet de votre message"
          className="mt-1.5 w-full rounded-lg border border-[#232a3b] bg-[#0e1420] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-colors focus:border-cyan-500/60"
        />
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="text-sm text-slate-300">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange("message")}
          placeholder="Décrivez votre projet..."
          className="mt-1.5 w-full resize-none rounded-lg border border-[#232a3b] bg-[#0e1420] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-colors focus:border-cyan-500/60"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Circle className="animate-spin" size={16} />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send size={16} />
            Envoyer le message
          </>
        )}
      </button>
    </form>
  );
}

function Contact() {
  const socialLinks = [
    { icon: Github, label: "GitHub", href: PROFILE.socials.github },
    { icon: Linkedin, label: "LinkedIn", href: PROFILE.socials.linkedin },
  ];

  return (
    <section id="contact" className="px-4 sm:px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Discutons de votre projet"
          description="Une idée, un besoin technique ou simplement envie d'échanger : je réponds sous 24 à 48h."
        />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-between gap-8">
            <div className="space-y-4">
              <a
                href={`mailto:${PROFILE.email}`}
                className="flex items-center gap-3 rounded-xl border border-[#232a3b] bg-[#161b26]/60 p-4 text-sm text-slate-300 backdrop-blur transition-colors hover:border-slate-600"
              >
                <span className="rounded-lg border border-[#232a3b] bg-[#0e1420] p-2 text-cyan-400">
                  <Mail size={16} />
                </span>
                {PROFILE.email}
              </a>
              <a
                href={`tel:${PROFILE.phone.replace(/[^0-9+]/g, "")}`}
                className="flex items-center gap-3 rounded-xl border border-[#232a3b] bg-[#161b26]/60 p-4 text-sm text-slate-300 backdrop-blur transition-colors hover:border-slate-600"
              >
                <span className="rounded-lg border border-[#232a3b] bg-[#0e1420] p-2 text-emerald-400">
                  <Phone size={16} />
                </span>
                {PROFILE.phone}
              </a>
              <div className="flex items-center gap-3 rounded-xl border border-[#232a3b] bg-[#161b26]/60 p-4 text-sm text-slate-300 backdrop-blur">
                <span className="rounded-lg border border-[#232a3b] bg-[#0e1420] p-2 text-violet-400">
                  <MapPin size={16} />
                </span>
                {PROFILE.location}
              </div>
            </div>

            <div>
              <div className="text-sm text-slate-500">Retrouvez-moi aussi sur</div>
              <div className="mt-3 flex gap-3">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="rounded-lg border border-[#232a3b] bg-[#161b26]/60 p-3 text-slate-300 backdrop-blur transition-colors hover:border-slate-600 hover:text-slate-100"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   FOOTER
   ========================================================================= */

function Footer() {
  const socialLinks = [
    { icon: Github, label: "GitHub", href: PROFILE.socials.github },
    { icon: Linkedin, label: "LinkedIn", href: PROFILE.socials.linkedin },
  ];

  return (
    <footer className="border-t border-[#171d2b] px-4 sm:px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} {PROFILE.name}. Tous droits réservés.
        </p>
        <div className="flex gap-4">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="text-slate-500 transition-colors hover:text-slate-200"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ============================================================================
   ROOT COMPONENT
   ========================================================================= */

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[#0b0f17] font-sans text-slate-200 antialiased selection:bg-cyan-500/20 selection:text-cyan-200">
      <Navbar />
      <main>
        <Hero />
        <StatsBanner />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}