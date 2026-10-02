import Reveal from "./Reveal.jsx";

export default function SectionHeading({ title, description, center = false }) {
  return (
    <Reveal y={12} margin={-80} duration={0.5} className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <h2 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-base leading-relaxed text-slate-400">{description}</p>}
    </Reveal>
  );
}
