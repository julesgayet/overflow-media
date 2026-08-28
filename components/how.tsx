"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal, SectionHeading } from "./ui";
import { Check } from "./icons";
import { TiltCard } from "./tilt-card";
import { Clip } from "./clip";

const steps = [
  {
    n: "01",
    title: "Brief.",
    text: "Vous choisissez l'objectif, les plateformes, le CPM cible et le budget. Nous préparons le kit de diffusion : rushes, charte, hooks qui fonctionnent, do & don't.",
    meta: "Jour 1",
  },
  {
    n: "02",
    title: "Diffusion.",
    text: "La campagne est lancée. Des centaines de comptes vérifiés montent, publient et testent des angles en parallèle sur TikTok, Reels et Shorts.",
    meta: "Jour 2 → J+30",
  },
  {
    n: "03",
    title: "Paiement.",
    text: "Chaque clip est modéré, chaque vue est vérifiée. Le réseau est rémunéré automatiquement, et vous suivez le budget consommé en direct.",
    meta: "En continu",
  },
];

/* ── Panneaux visuels ─────────────────────────────────────────────────────── */

type PanelProps = { clips?: string[] };

function BriefPanel(_props: PanelProps) {
  const rows = [
    ["Objectif", "Trafic & notoriété"],
    ["Plateformes", "TikTok · Reels · Shorts"],
    ["CPM cible", "0,90 €"],
    ["Budget", "5 000 €"],
  ];
  return (
    <TiltCard className="rounded-2xl border border-line-2 bg-surface-2 p-6">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-medium text-ink">
          <span className="size-1.5 rounded-full bg-brand-2" />
          Nouvelle campagne
        </span>
        <span className="rounded-md border border-line-2 px-2 py-1 text-[10px] text-mist">
          Brouillon
        </span>
      </div>
      <dl className="mt-6 space-y-px overflow-hidden rounded-xl border border-line">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between bg-surface px-4 py-3.5">
            <dt className="text-xs text-mist-2">{k}</dt>
            <dd className="nums text-sm font-medium text-ink">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 flex items-center gap-2 rounded-lg bg-brand/10 px-4 py-3 text-xs text-brand-2">
        <Check className="size-4 shrink-0" />
        Brief validé — prêt à publier
      </div>
    </TiltCard>
  );
}

/*  Grille « Diffusion en cours » : une case = un clip, alimentée par les
 *  fichiers de `public/media/methode/` (découverts au build, cf. lib/media.ts).
 *  Sans aucun fichier, la grille reste `PLACEHOLDER_CELLS` carrés abstraits.
 */
const PLACEHOLDER_CELLS = 32;

function SpreadPanel({ clips = [] }: PanelProps) {
  const count = clips.length || PLACEHOLDER_CELLS;
  return (
    <TiltCard className="rounded-2xl border border-line-2 bg-surface-2 p-6">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-medium text-ink">
          <span className="size-1.5 animate-pulse rounded-full bg-lime" />
          Diffusion en cours
        </span>
        <span className="nums text-xs text-mist">320 comptes</span>
      </div>
      <div className="mt-6 grid grid-cols-8 gap-1.5">
        {Array.from({ length: count }).map((_, i) => (
          <span
            key={i}
            className="group/cell relative aspect-[9/16] overflow-hidden rounded-[3px] bg-brand/25 transition-transform duration-200 ease-out hover:z-10 hover:scale-[1.5]"
            style={{ animationDelay: `${(i % 8) * 160 + Math.floor(i / 8) * 90}ms` }}
          >
            {clips[i] && (
              <Clip src={clips[i]} className="absolute inset-0 h-full w-full object-cover" />
            )}
          </span>
        ))}
      </div>
    </TiltCard>
  );
}

function PayoutPanel(_props: PanelProps) {
  const rows = [
    ["@clip.marco", "1,2 M", "1 080 €"],
    ["@edits.lina", "740 K", "666 €"],
    ["@shorts.yanis", "410 K", "369 €"],
    ["@vertical.co", "205 K", "184 €"],
  ];
  return (
    <TiltCard className="rounded-2xl border border-line-2 bg-surface-2 p-6">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-medium text-ink">
          <span className="size-1.5 rounded-full bg-lime" />
          Versements au réseau
        </span>
        <span className="text-[10px] uppercase tracking-[0.16em] text-mist-2">Automatique</span>
      </div>
      <div className="mt-6 space-y-px overflow-hidden rounded-xl border border-line">
        {rows.map(([who, views, amount]) => (
          <div key={who} className="flex items-center gap-3 bg-surface px-4 py-3.5">
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-line-2 text-[10px] font-semibold text-mist">
              {who.slice(1, 3).toUpperCase()}
            </span>
            <span className="min-w-0 flex-1 truncate text-xs text-ink">{who}</span>
            <span className="nums text-xs text-mist-2">{views}</span>
            <span className="nums text-sm font-semibold text-lime">{amount}</span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-center text-[11px] text-mist-2">
        vues vérifiées avant chaque versement
      </p>
    </TiltCard>
  );
}

const panels = [BriefPanel, SpreadPanel, PayoutPanel];

export function How({ clips = [] }: { clips?: string[] }) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section id="methode" className="relative py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="La méthode"
            title={
              <>
                Trois mouvements,
                <br />
                <span className="text-gradient">quarante-huit heures</span>
              </>
            }
            subtitle="Un process rodé, aucune zone d'ombre, aucun intermédiaire à relancer."
          />
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Panneau collant (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative">
                {panels.map((Panel, i) => (
                  <div
                    key={i}
                    className={`transition-all duration-500 ${
                      active === i
                        ? "opacity-100"
                        : "pointer-events-none absolute inset-0 translate-y-3 opacity-0"
                    }`}
                    aria-hidden={active !== i}
                  >
                    <Panel clips={clips} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Étapes */}
          <div>
            {steps.map((s, i) => {
              const Panel = panels[i];
              return (
                <div
                  key={s.n}
                  data-index={i}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  className="border-b border-line py-12 last:border-0 lg:min-h-[62vh] lg:py-16"
                >
                  <span className="nums text-xs font-medium text-brand-2">{s.n}</span>
                  <h3
                    className={`mt-4 text-4xl font-semibold tracking-[-0.03em] transition-colors duration-500 sm:text-5xl ${
                      /*  L'étape inactive s'efface, mais reste lisible : sur fond
                          clair l'ancien gris de bordure tombait à 1,35:1.      */
                      active === i ? "text-ink" : "text-mist-2"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-mist">{s.text}</p>
                  <p className="mt-5 text-xs uppercase tracking-[0.18em] text-mist-2">{s.meta}</p>

                  {/* Panneau inline (mobile) */}
                  <div className="mt-8 lg:hidden">
                    <Panel clips={clips} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
