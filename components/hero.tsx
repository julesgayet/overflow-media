import { site } from "@/site.config";
import { Button, CountUp, Reveal } from "./ui";
import { TikTok, Instagram, YouTube } from "./icons";
import { ParticleField } from "./particle-field";

/*  Calculé plutôt que codé en dur : le multiplicateur affiché ne peut jamais
 *  se désynchroniser du CPM affiché juste à côté (`site.pricing.from`). Arrondi
 *  à l'entier inférieur pour rester une affirmation vraie, jamais gonflée.   */
const cheaperMultiplier = Math.floor(site.simulator.paidCpm / site.pricing.fromValue);

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[72px]">
      {/*  Décor : le seul réseau de particules cobalt. La grille pâle qui se
          trouvait ici entrait en conflit avec le maillage — deux trames
          régulières superposées, illisibles.                                 */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <ParticleField />
      </div>

      <div className="container-x pb-14 pt-20 md:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal delay={80}>
            <h1 className="text-balance text-[2.6rem] font-semibold leading-[1.03] tracking-[-0.035em] sm:text-6xl md:text-7xl">
              Votre marque, partout.
              <br />
              <span className="text-gradient">Sur tous les écrans, tout le temps.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-mist md:text-lg">
              {site.name} transforme votre contenu en millions de vues, diffusées en continu sur
              TikTok, Reels et Shorts. Votre marque est partout — à partir de {site.pricing.from} de
              CPM, {cheaperMultiplier}x moins cher que la pub payante.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/reserver" variant="primary" size="lg" arrow>
                Lancer une campagne
              </Button>
              <Button href="#simulateur" variant="outline" size="lg">
                Estimer mes vues
              </Button>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs text-mist-2">
              <span className="flex items-center gap-2">
                <TikTok className="size-4" /> TikTok
              </span>
              <span className="flex items-center gap-2">
                <Instagram className="size-4" /> Instagram Reels
              </span>
              <span className="flex items-center gap-2">
                <YouTube className="size-4" /> YouTube Shorts
              </span>
              <span className="hidden h-3 w-px bg-line-2 sm:block" />
              <span>En ligne en 48 h · sans engagement</span>
            </div>
          </Reveal>
        </div>

        {/* Chiffres clés */}
        <Reveal delay={400}>
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 divide-line rounded-2xl border border-line bg-surface md:grid-cols-4 md:divide-x">
            {site.stats.map((s) => (
              <div key={s.label} className="px-4 py-7 text-center md:px-6">
                <div className="text-3xl font-semibold tracking-tight text-ink md:text-[2rem]">
                  <CountUp to={s.to} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm font-medium text-ink">{s.label}</div>
                <div className="mt-1 text-xs text-mist-2">{s.hint}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

    </section>
  );
}
