import { site } from "@/site.config";
import { Button, Reveal } from "./ui";
import { Arrow } from "./icons";

export function Cta() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/[0.13] blur-[140px]" />
      </div>

      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line-2 bg-gradient-to-b from-surface-2 to-surface px-7 py-14 text-center md:px-16 md:py-20">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent"
            />
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
              Ton contenu mérite mieux que{" "}
              <span className="text-gradient">quelques milliers de vues</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-mist">
              Dis-nous ce que tu veux pousser et sur quel budget. On te revient sous 24 h avec
              une estimation de vues, un CPM cible et un calendrier.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={site.links.calendly} variant="light" size="lg" arrow>
                Lancer une campagne
              </Button>
              <Button href={site.links.whopClippers} variant="outline" size="lg">
                Devenir clippeur
              </Button>
            </div>

            <div className="mt-10 flex flex-col items-center gap-2 text-sm text-mist-2">
              <span>Ou écris-nous directement :</span>
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-2 font-medium text-white transition-colors hover:text-brand-2"
              >
                {site.email}
                <Arrow className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
