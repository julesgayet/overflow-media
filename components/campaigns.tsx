import { site } from "@/site.config";
import { Button, Reveal, SectionHeading } from "./ui";
import { TiltCard } from "./tilt-card";

export function Campaigns() {
  return (
    <section id="campagnes" className="relative py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Campagnes"
            title={
              <>
                Ce qui tourne <span className="text-gradient">en ce moment</span>
              </>
            }
            subtitle="Un aperçu des campagnes en cours. Le budget est plafonné à l'avance, et seules les vues vérifiées sont facturées."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {site.campaigns.map((c, i) => (
            <Reveal key={c.client} delay={i * 90}>
              <TiltCard
                className="group h-full rounded-2xl border border-line bg-surface p-6 hover:border-brand/40"
                contentClassName="flex h-full flex-col"
              >
                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{c.client}</h3>
                    <p className="mt-1 text-xs text-mist-2">{c.niche}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-medium ${
                      c.status === "En cours"
                        ? "border-lime/30 bg-lime/10 text-lime"
                        : "border-line-2 bg-surface-2 text-mist"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>

                <div className="relative mt-6 grid grid-cols-3 gap-3">
                  {[
                    ["CPM", c.cpm],
                    ["Budget", c.budget],
                    ["Vues", c.views],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <div className="text-[10px] uppercase tracking-[0.14em] text-mist-2">{k}</div>
                      <div className="nums mt-1 text-lg font-semibold text-ink">{v}</div>
                    </div>
                  ))}
                </div>

                <div className="relative mt-6">
                  <div className="flex items-center justify-between text-[11px] text-mist-2">
                    <span>Budget consommé</span>
                    <span className="nums text-mist">{c.progress}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand to-accent"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                </div>

                <div className="relative mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
                  {c.platforms.map((p) => (
                    <span
                      key={p}
                      className="rounded-md border border-line-2 bg-surface px-2 py-1 text-[10px] text-mist"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 flex flex-col items-center gap-3 text-center">
            <Button href="/reserver" variant="outline" arrow>
              Parler de votre campagne
            </Button>
            <p className="text-xs text-mist-2">
              Quinze minutes pour cadrer l&apos;objectif, le volume et le budget.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
