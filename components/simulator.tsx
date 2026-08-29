"use client";

import { useMemo, useState } from "react";
import { site } from "@/site.config";
import { Button, Eyebrow, Reveal, SectionHeading } from "./ui";
import { TiltCard } from "./tilt-card";
import { Bolt, Check } from "./icons";

const S = site.simulator;

const nf = new Intl.NumberFormat("fr-FR");
const nfEur = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
const nfCpm = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

function compact(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1).replace(".", ",")} M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)} K`;
  return nf.format(Math.round(n));
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
  id,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
  id: string;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm text-mist">
          {label}
        </label>
        <span className="nums text-base font-semibold text-ink">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        className="of-range mt-2.5"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ["--fill" as string]: `${fill}%` }}
      />
    </div>
  );
}

function Result({
  value,
  label,
  accent = false,
}: {
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div
        className={`nums text-2xl font-semibold tracking-tight sm:text-[28px] ${
          accent ? "text-brand-2" : "text-ink"
        }`}
      >
        {value}
      </div>
      <div className="mt-1 text-xs text-mist-2">{label}</div>
    </div>
  );
}

export function Simulator() {
  const [budget, setBudget] = useState<number>(S.budgetDefault);
  const [niche, setNiche] = useState<string>(S.nichePresets[0].key);

  const preset = useMemo(
    () => S.nichePresets.find((n) => n.key === niche) ?? S.nichePresets[0],
    [niche],
  );

  /*  Le CPM n'a pas de plage unique : chaque niche a la sienne (cf.
      `site.config.ts`). On le recale sur `cpmDefault` de la niche à chaque
      changement plutôt que de clamper la valeur précédente — un simple
      clamp aurait pu retomber sur une borne au lieu d'un CPM représentatif
      de la niche, et aurait rendu le changement de niche invisible si la
      valeur précédente était déjà dans la nouvelle plage.                  */
  const [cpm, setCpm] = useState<number>(preset.cpmDefault);

  function selectNiche(key: string) {
    setNiche(key);
    const next = S.nichePresets.find((n) => n.key === key);
    if (next) setCpm(next.cpmDefault);
  }

  const brand = useMemo(() => {
    const estViews = (budget / cpm) * 1000;
    const clips = Math.max(1, Math.round(estViews / preset.viewsPerClip));
    const paidEquivalent = (estViews / 1000) * S.paidCpm;
    const multiplier = S.paidCpm / cpm;
    return { estViews, clips, paidEquivalent, multiplier };
  }, [budget, cpm, preset]);


  return (
    <section id="simulateur" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      </div>

      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Simulateur"
            title={
              <>
                Combien de vues pour{" "}
                <span className="text-gradient">votre budget</span> ?
              </>
            }
            subtitle="Bouge les curseurs. Le calcul est le même que celui qu'on applique en campagne."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-12 max-w-5xl">
            {/*  Carte à plat (`maxTilt={0}`) : elle contient les curseurs. Quelques
                degrés d'inclinaison déplaceraient les bords de plusieurs dizaines
                de pixels, et la piste se déroberait sous le doigt en plein
                glissement. Il ne reste que le léger soulèvement au survol.  */}
            <TiltCard
              maxTilt={0}
              glow={false}
              className="overflow-hidden rounded-3xl border border-line-2 bg-gradient-to-b from-surface-2 to-surface"
            >
              <div className="grid gap-px bg-line md:grid-cols-[1fr_1fr]">
                {/* Contrôles */}
                <div className="bg-surface-2 p-7 md:p-9">
                  <Eyebrow className="mb-7">Votre campagne</Eyebrow>

                  <div className="space-y-7">
                    <Slider
                      id="sim-budget"
                      label="Budget de campagne"
                      value={budget}
                      min={S.budgetMin}
                      max={S.budgetMax}
                      step={S.budgetStep}
                      onChange={setBudget}
                      display={nfEur.format(budget)}
                    />
                    <div>
                      <span className="text-sm text-mist">Niche</span>
                      {/*  Grille à colonnes égales plutôt que `flex-wrap` : la largeur
                          d'une pastille en flex suit la longueur de son libellé
                          (« Business & finance » contre « Sport »), donc les lignes ne
                          s'alignaient jamais — la grille impose la même largeur de
                          cellule partout et rend les rangées symétriques.           */}
                      <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {S.nichePresets.map((n) => (
                          <button
                            key={n.key}
                            type="button"
                            onClick={() => selectNiche(n.key)}
                            aria-pressed={niche === n.key}
                            className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                              niche === n.key
                                ? "border-brand/60 bg-brand/15 text-ink"
                                : "border-line-2 text-mist hover:border-line-2 hover:text-ink"
                            }`}
                          >
                            {n.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/*  Plage et valeur par défaut dépendent de la niche choisie
                        ci-dessus (cf. `nichePresets` dans `site.config.ts`) : le
                        curseur se recale entièrement — bornes et valeur — au
                        changement de niche via `selectNiche`.                    */}
                    <Slider
                      id="sim-cpm"
                      label="CPM cible"
                      value={cpm}
                      min={preset.cpmMin}
                      max={preset.cpmMax}
                      step={S.cpmStep}
                      onChange={setCpm}
                      display={`${nfCpm.format(cpm)} / 1 000 vues`}
                    />
                  </div>
                </div>

                {/* Résultats */}
                <div className="relative bg-surface p-7 md:p-9" aria-live="polite">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-brand/5 blur-3xl"
                  />
                  <div className="relative">
                    <Eyebrow className="mb-7">Estimation</Eyebrow>

                    <div className="nums text-5xl font-semibold leading-none tracking-tight text-ink sm:text-6xl">
                      {compact(brand.estViews)}
                    </div>
                    <p className="mt-3 text-sm text-mist">vues estimées sur la campagne</p>

                    <div className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-7">
                      <Result value={`~ ${nf.format(brand.clips)}`} label="clips publiés" />
                      <Result
                        value={`×${brand.multiplier.toFixed(0)}`}
                        label="moins cher que la pub payante"
                        accent
                      />
                    </div>

                    <div className="mt-7 rounded-xl border border-line bg-surface p-4">
                      <p className="text-sm leading-relaxed text-mist">
                        Pour ces {compact(brand.estViews)} vues, une campagne publicitaire
                        classique à {nfCpm.format(S.paidCpm)} de CPM coûterait{" "}
                        <span className="nums font-semibold text-ink">
                          {nfEur.format(brand.paidEquivalent)}
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pied du simulateur */}
              <div className="flex flex-col items-center gap-4 border-t border-line bg-surface-2 px-7 py-6 sm:flex-row sm:justify-between md:px-9">
                <p className="flex items-start gap-2.5 text-xs leading-relaxed text-mist-2">
                  <Bolt className="mt-px size-4 shrink-0 text-mist-2" />
                  Estimation indicative. Le volume réel dépend de la niche, du format source et de
                  la qualité des montages.
                </p>
                <Button
                  href="/reserver"
                  variant="light"
                  arrow
                  className="w-full shrink-0 sm:w-auto"
                >
                  Obtenir un devis exact
                </Button>
              </div>
            </TiltCard>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
