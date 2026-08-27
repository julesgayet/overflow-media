import { site } from "@/site.config";
import { Marquee } from "./marquee";
import { Reveal, SectionHeading } from "./ui";

/*  Pas de photo : les avatars « stock » d'inconnus accolés à une citation
 *  fabriquée seraient plus trompeurs que le placeholder texte actuel — voir
 *  l'avertissement de site.config.ts sur les faux avis (art. L121-2). Les
 *  initiales reprennent le motif déjà en place ailleurs sur le site (kit de
 *  suivi des versements, components/how.tsx).                              */
function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function TestimonialCard({ quote, author, role }: (typeof site.testimonials)[number]) {
  return (
    <figure className="flex h-full w-[320px] shrink-0 flex-col rounded-2xl border border-line bg-surface p-6">
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-line-2 text-xs font-semibold text-mist">
          {initials(author)}
        </span>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-ink">{author}</div>
          <div className="truncate text-xs text-mist-2">{role}</div>
        </div>
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-mist">
        « {quote} »
      </blockquote>
    </figure>
  );
}

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
                <span className="text-gradient">les marques</span>
              </>
            }
            subtitle="Ce que disent les marques qui nous ont confié leur contenu."
          />
        </Reveal>
      </div>

      {/*  En dehors du container-x : la bande défile pleine largeur, le
          dégradé de bord masque la coupe sur les côtés de l'écran.          */}
      <Reveal delay={100}>
        <div className="relative mt-14 w-full overflow-hidden">
          <Marquee pauseOnHover duration="32s" className="py-2">
            {site.testimonials.map((t, i) => (
              <TestimonialCard key={t.author + i} {...t} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ground to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ground to-transparent sm:w-32" />
        </div>
      </Reveal>
    </section>
  );
}
