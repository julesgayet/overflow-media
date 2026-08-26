import { site } from "@/site.config";
import { Reveal, SectionHeading } from "./ui";

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Retours"
            title={
              <>
                Ce qu&apos;en disent{" "}
                <span className="text-gradient">les deux côtés</span>
              </>
            }
            subtitle="Une campagne ne tient que si la marque et les clippeurs y trouvent leur compte."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {site.testimonials.map((t, i) => (
            <Reveal key={t.author + i} delay={i * 90}>
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7">
                <span
                  className={`mb-5 w-fit rounded-full border px-2.5 py-1 text-[10px] font-medium ${
                    t.side === "brand"
                      ? "border-brand/30 bg-brand/10 text-brand-2"
                      : "border-accent/30 bg-accent/10 text-accent"
                  }`}
                >
                  {t.side === "brand" ? "Côté marque" : "Côté clippeur"}
                </span>
                <blockquote className="flex-1 text-[15px] leading-relaxed text-mist">
                  « {t.quote} »
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-5">
                  <div className="text-sm font-medium text-ink">{t.author}</div>
                  <div className="mt-0.5 text-xs text-mist-2">{t.role}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
