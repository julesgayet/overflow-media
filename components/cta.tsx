import { site } from "@/site.config";
import { Booking } from "./booking";
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
        <div className="absolute left-1/2 top-1/3 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/[0.13] blur-[140px]" />
      </div>

      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">Réserver un créneau</Eyebrow>
            <h2 className="mt-5 text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl md:text-5xl">
              Ton contenu mérite mieux que{" "}
              <span className="text-gradient">quelques milliers de vues</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-mist">
              {site.calcom.duration} au téléphone, et tu sais si le clipping vaut le coup pour toi.
              Choisis un créneau ci-dessous.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <ul className="mx-auto mt-10 flex max-w-3xl flex-col justify-center gap-3 sm:flex-row sm:gap-7">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm text-mist">
                <Check className="mt-0.5 size-4 shrink-0 text-lime" />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={160}>
          <div className="mx-auto mt-12 max-w-4xl">
            <Booking />
          </div>
        </Reveal>

        <Reveal delay={220}>
          <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center gap-6 border-t border-line pt-9 sm:flex-row sm:justify-between">
            <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-mist-2">
              Pas le bon moment ?
              <a
                href={`mailto:${site.email}?subject=Lancer%20une%20campagne%20de%20clipping`}
                className="group inline-flex items-center gap-1.5 font-medium text-white transition-colors hover:text-brand-2"
              >
                {site.email}
                <Arrow className="size-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </p>
            <Button href={site.links.whopClippers} variant="outline">
              Je suis clippeur, pas une marque
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
