import { site } from "@/site.config";
import { Plus } from "./icons";
import { Reveal, SectionHeading } from "./ui";

export function Faq() {
  return (
    <section id="faq" className="relative border-t border-line py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title={
              <>
                Tout ce que tu veux{" "}
                <span className="text-gradient">savoir</span>
              </>
            }
            subtitle="Il en manque une ? Écris-nous, on répond sous 24 h."
          />
        </Reveal>

        <div className="mx-auto mt-14 max-w-3xl space-y-3">
          {site.faq.map((f, i) => (
            <Reveal key={f.q} delay={Math.min(i, 4) * 55}>
              <details className="group rounded-2xl border border-line bg-surface/60 transition-colors open:border-brand/40 open:bg-surface-2 hover:border-line-2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                  <span className="text-[15px] font-medium tracking-tight text-white md:text-base">
                    {f.q}
                  </span>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line-2 text-mist transition-all duration-300 group-open:rotate-45 group-open:border-brand/50 group-open:text-brand-2">
                    <Plus className="size-3.5" />
                  </span>
                </summary>
                <p className="px-6 pb-6 text-sm leading-relaxed text-mist">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
