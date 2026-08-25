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
            title="Les questions qu'on nous pose"
            subtitle="Il en manque une ? Écris-nous, on répond sous 24 h."
          />
        </Reveal>

        <div className="mx-auto mt-14 max-w-3xl divide-y divide-line border-y border-line">
          {site.faq.map((f, i) => (
            <Reveal key={f.q} delay={Math.min(i, 4) * 60}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
                  <span className="text-[15px] font-medium tracking-tight text-white transition-colors group-hover:text-brand-2 md:text-base">
                    {f.q}
                  </span>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line-2 text-mist transition-all duration-300 group-open:rotate-45 group-open:border-brand/50 group-open:text-brand-2">
                    <Plus className="size-3.5" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 text-sm leading-relaxed text-mist">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
