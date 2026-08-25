import { site } from "@/site.config";
import { Button, Reveal, SectionHeading } from "./ui";

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
            subtitle="Chaque campagne est ouverte aux clippeurs validés. Le budget est bloqué à l'avance : si tu produis les vues, tu es payé."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {site.campaigns.map((c, i) => (
            <Reveal key={c.client} delay={i * 90}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/70 p-6 transition-colors hover:border-brand/40">
                {/* Filigrane */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-4 top-16 select-none text-6xl font-bold tracking-tighter text-white/[0.03] transition-transform duration-500 group-hover:scale-105"
                >
                  {c.client.split(" ")[0]}
                </span>

                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold tracking-tight">{c.client}</h3>
                    <p className="mt-1 text-xs text-mist-2">{c.niche}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-medium ${
                      c.status === "En cours"
                        ? "border-lime/30 bg-lime/10 text-lime"
                        : "border-amber-400/30 bg-amber-400/10 text-amber-300"
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
                      <div className="nums mt-1 text-lg font-semibold text-white">{v}</div>
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
                      className="rounded-md border border-line-2 bg-white/[0.03] px-2 py-1 text-[10px] text-mist"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 flex flex-col items-center gap-3 text-center">
            <Button href={site.links.whopClippers} variant="outline" arrow>
              Voir toutes les campagnes sur Whop
            </Button>
            <p className="text-xs text-mist-2">
              Les campagnes changent chaque semaine — l&apos;accès se fait via notre espace Whop.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
