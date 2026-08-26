import { site } from "@/site.config";
import { Badge, Button, CountUp, Reveal } from "./ui";
import { Sparkle, TikTok, Instagram, YouTube } from "./icons";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-[72px]">
      {/*  Décor : une grille très pâle, rien d'autre. Les halos néon de la
          version sombre viraient au gris sale sur fond clair.                */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(23,23,26,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(23,23,26,.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_20%,#000,transparent)]" />
      </div>

      <div className="container-x pb-14 pt-20 md:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <Badge icon={<Sparkle className="size-3.5 text-brand" />}>
              Agence de clipping française · Paiements via Whop
            </Badge>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-7 text-balance text-[2.6rem] font-semibold leading-[1.03] tracking-[-0.035em] sm:text-6xl md:text-7xl">
              Des millions de vues.
              <br />
              <span className="text-gradient">Payées à la performance.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-mist md:text-lg">
              {site.name} découpe votre contenu long en centaines de clips verticaux, les diffuse via
              un réseau de comptes vérifiés, et ne facture que les vues réellement générées.
              À partir de {site.pricing.from} {site.pricing.unit}.
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
