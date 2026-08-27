import { site } from "@/site.config";
import { PinnedSteps } from "./pinned-steps";
import { Reveal, SectionHeading } from "./ui";
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

      </div>
    </section>
  );
}
