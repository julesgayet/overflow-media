import { site } from "@/site.config";
import { Reveal, SectionHeading } from "./ui";
import { Shield } from "./icons";

export function Verification() {
  return (
    <section id="verification" className="relative py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Vérification"
            title={
              <>
                Des vues <span className="text-gradient">réelles</span>, ou rien
              </>
            }
            subtitle="C'est le point faible du clipping, et c'est là qu'on met le plus de contrôle. Trois barrières, avant, pendant et après la campagne."
          />
        </Reveal>

        <div className="relative mt-16">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-[7px] hidden h-px bg-gradient-to-r from-transparent via-line-2 to-transparent md:block"
          />
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {site.verification.map((v, i) => (
              <Reveal key={v.phase} delay={i * 100}>
                <div className="relative">
                  <span
                    aria-hidden
                    className="relative z-10 mb-6 flex size-4 items-center justify-center"
                  >
                    <span className="absolute size-4 rounded-full bg-brand/25" />
                    <span className="size-2 rounded-full bg-brand-2" />
                  </span>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-2">
                    {v.phase}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight">{v.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-mist">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={200}>
          <div className="mt-16 grid gap-4 rounded-2xl border border-line bg-surface p-7 sm:grid-cols-2 md:p-9">
            <div className="flex gap-4">
              <Shield className="mt-0.5 size-5 shrink-0 text-lime" />
              <p className="text-sm leading-relaxed text-mist">
                <span className="font-medium text-ink">Traçable.</span> Lien en bio et appel à
                l&apos;action sur chaque clip : vous voyez d&apos;où vient le trafic.
              </p>
            </div>
            <div className="flex gap-4">
              <Shield className="mt-0.5 size-5 shrink-0 text-lime" />
              <p className="text-sm leading-relaxed text-mist">
                <span className="font-medium text-ink">Sanctionné.</span> Un compte pris à
                gonfler ses vues est exclu et ses gains en attente sont annulés.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
