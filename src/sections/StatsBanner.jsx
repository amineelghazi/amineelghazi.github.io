import Reveal from "../components/common/Reveal.jsx";
import { useTr } from "../hooks/useTr.js";
import { STATS } from "../data/stats.js";

export default function StatsBanner() {
  const tr = useTr();

  return (
    <section className="border-y border-[#171d2b] bg-[#0d121c] px-4 py-12 sm:px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal key={stat.value + i} y={12} delay={i * 0.08} className="text-center sm:text-left">
            <div className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">{stat.value}</div>
            <div className="mt-1 text-sm text-slate-500">{tr(stat.label)}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
