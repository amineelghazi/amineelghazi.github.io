import { LanguageProvider } from "./context/LanguageContext.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import StatsBanner from "./sections/StatsBanner.jsx";
import Skills from "./sections/skills/Skills.jsx";
import Projects from "./sections/projects/Projects.jsx";
import Experience from "./sections/experience/Experience.jsx";
import Contact from "./sections/contact/Contact.jsx";
import { HeroV2 } from "./sections/hero/HeroV2.jsx";

function Page() {
  return (
    <div className="min-h-screen bg-[#0b0f17] font-sans text-slate-200 antialiased selection:bg-cyan-500/20 selection:text-cyan-200">
      <Navbar />
      <main>
        <HeroV2 />
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

export default function Portfolio() {
  return (
    <LanguageProvider>
      <Page />
    </LanguageProvider>
  );
}
