import { site } from "@/site.config";
import { Reveal } from "./ui";

export function Stats() {
  return (
    <section className="relative border-y border-line bg-ink-2/60">
      <div className="container-x grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
        {site.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 70}>
            <div className="px-2 py-9 text-center md:px-6 md:py-11">
              <div className="font-mono text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {s.value}
              </div>
              <div className="mt-2 text-sm font-medium text-white/85">{s.label}</div>
              <div className="mt-1 text-xs text-mist-2">{s.hint}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
