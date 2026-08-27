import { site } from "@/site.config";
import { PinnedSteps } from "./pinned-steps";
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

        <Reveal delay={100}>
          <div className="mt-16">
            <PinnedSteps steps={site.verification} />
          </div>
        </Reveal>

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
