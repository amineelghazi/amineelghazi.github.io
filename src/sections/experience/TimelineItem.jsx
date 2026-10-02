import Reveal from "../../components/common/Reveal.jsx";
import { useTr } from "../../hooks/useTr.js";

export default function TimelineItem({ item, index, isLast }) {
  const tr = useTr();
  const isWork = item.type === "work";

  return (
    <Reveal x={-16} y={0} margin={-80} delay={index * 0.08} className="relative pb-10 pl-10 last:pb-0">
      {!isLast && <span className="absolute left-[7px] top-3 h-full w-px bg-[#232a3b]" aria-hidden="true" />}
      <span
        className={`absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border ${
          isWork ? "border-cyan-500/60 bg-cyan-500/10" : "border-violet-500/60 bg-violet-500/10"
        }`}
        aria-hidden="true"
      >
        <span className={`h-1.5 w-1.5 rounded-full ${isWork ? "bg-cyan-400" : "bg-violet-400"}`} />
      </span>

      <div className="text-xs font-medium uppercase tracking-wide text-slate-500">{tr(item.period)}</div>
      <h3 className="mt-1.5 text-base font-medium text-slate-100">{tr(item.title)}</h3>
      <div className="text-sm text-slate-400">{tr(item.org)}</div>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">{tr(item.description)}</p>
    </Reveal>
  );
}
