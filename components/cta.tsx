import { site } from "@/site.config";
import { Button, Eyebrow, Reveal } from "./ui";
import { Arrow, Check } from "./icons";

const points = [
  "On cadre ton objectif et ta niche",
  "On te donne une estimation de vues et un CPM",
  "Tu repars avec un budget chiffré, sans engagement",
];

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

            <Eyebrow className="justify-center">Passer à l&apos;action</Eyebrow>

            <h2 className="mx-auto mt-6 max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl md:text-5xl">
              Ton contenu mérite mieux que{" "}
              <span className="text-gradient">quelques milliers de vues</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-mist">
              {site.calcom.duration} au téléphone pour cadrer ta campagne, estimer tes vues et te
              donner un CPM cible. Sans engagement.
            </p>

            <ul className="mx-auto mt-9 flex max-w-2xl flex-col items-start justify-center gap-3 text-left sm:flex-row sm:gap-6">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-mist">
                  <Check className="mt-0.5 size-4 shrink-0 text-lime" />
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/reserver" variant="light" size="lg" arrow>
                Lancer une campagne
              </Button>
              <Button href={site.links.whopClippers} variant="outline" size="lg">
                Devenir clippeur
              </Button>
            </div>

            <p className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-mist-2">
              Ou écris-nous directement :
              <a
                href={`mailto:${site.email}?subject=Lancer%20une%20campagne%20de%20clipping`}
                className="group inline-flex items-center gap-1.5 font-medium text-white transition-colors hover:text-brand-2"
              >
                {site.email}
                <Arrow className="size-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
