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
    <figure className="w-[210px] shrink-0 rounded-xl border border-line bg-surface p-4">
      <div className="flex items-center gap-2.5">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-line-2 text-[10px] font-semibold text-mist">
          {initials(author)}
        </span>
        <div className="min-w-0">
          <div className="truncate text-xs font-medium text-ink">{author}</div>
          <div className="truncate text-[10px] text-mist-2">{role}</div>
        </div>
      </div>
      <blockquote className="mt-3 text-xs leading-relaxed text-mist">« {quote} »</blockquote>
    </figure>
  );
}

/*  Colonnes : la 1re et la 3e défilent vers le bas, la 2e et la 4e vers le
 *  haut (`reverse`). `repeat={4}` (au lieu de 3 dans la démo d'origine) :
 *  avec seulement 2 avis réels, chaque copie est deux fois plus courte que
 *  dans l'original à 9 avis — il faut plus de copies pour couvrir la
 *  hauteur de la boîte sans laisser de trou pendant la boucle.             */
const columns = [{ reverse: false }, { reverse: true }, { reverse: false }, { reverse: true }];

export function Testimonials() {
  return (
    <section id="avis" className="relative py-24 md:py-32">
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

        {/*  Les avis réels, accessibles : la grille ci-dessous est purement
            décorative (le même contenu y tourne en boucle et en double sur
            4 colonnes) et masquée aux lecteurs d'écran.                     */}
        <ul className="sr-only">
          {site.testimonials.map((t) => (
            <li key={t.author}>
              « {t.quote} » — {t.author}, {t.role}
            </li>
          ))}
        </ul>

        <Reveal delay={100}>
          <div
            aria-hidden
            className="relative mt-14 flex h-[420px] w-full items-center justify-center overflow-hidden rounded-3xl border border-line bg-surface-2 [perspective:300px]"
          >
            <div
              className="flex flex-row items-center gap-4"
              style={{
                transform:
                  "translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
              }}
            >
              {columns.map((c, i) => (
                <Marquee
                  key={i}
                  vertical
                  pauseOnHover
                  reverse={c.reverse}
                  duration={i % 2 === 0 ? "26s" : "31s"}
                >
                  {site.testimonials.map((t, j) => (
                    <TestimonialCard key={t.author + j} {...t} />
                  ))}
                </Marquee>
              ))}

              {/*  Dégradés de bord : enfants du même conteneur incliné que
                  les colonnes, pour suivre la perspective plutôt que de
                  rester plaqués à plat par-dessus.                          */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-surface-2 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-surface-2 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-surface-2 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-surface-2 to-transparent" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
