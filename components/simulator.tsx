"use client";

import { useMemo, useState } from "react";
import { site } from "@/site.config";
import { Button, Eyebrow, Reveal, SectionHeading } from "./ui";
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
        <span className="nums text-base font-semibold text-white">{display}</span>
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
          accent ? "text-brand-2" : "text-white"
        }`}
      >
        {value}
      </div>
      <div className="mt-1 text-xs text-mist-2">{label}</div>
    </div>
  );
}

export function Simulator() {
  const [mode, setMode] = useState<"brand" | "clipper">("brand");

  // Mode marque
  const [budget, setBudget] = useState<number>(S.budgetDefault);
  const [cpm, setCpm] = useState<number>(S.cpmDefault);
  const [niche, setNiche] = useState<string>(S.nichePresets[0].key);

  // Mode clippeur
  const [views, setViews] = useState<number>(S.viewsDefault);
  const [clipperCpm, setClipperCpm] = useState<number>(S.cpmDefault);

  const preset = useMemo(
    () => S.nichePresets.find((n) => n.key === niche) ?? S.nichePresets[0],
    [niche],
  );

  const brand = useMemo(() => {
    const estViews = (budget / cpm) * 1000;
    const clips = Math.max(1, Math.round(estViews / preset.viewsPerClip));
    const paidEquivalent = (estViews / 1000) * S.paidCpm;
    const multiplier = S.paidCpm / cpm;
    return { estViews, clips, paidEquivalent, multiplier };
  }, [budget, cpm, preset]);

  const clipper = useMemo(() => {
    const earnings = (views / 1000) * clipperCpm;
    const perClip = earnings / Math.max(1, Math.round(views / preset.viewsPerClip));
    const clips = Math.max(1, Math.round(views / preset.viewsPerClip));
    return { earnings, perClip, clips };
  }, [views, clipperCpm, preset]);

  return (
    <section id="simulateur" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 size-[38rem] -translate-x-1/2 rounded-full bg-brand/[0.11] blur-[130px]" />
      </div>

      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Simulateur"
            title={
              <>
                Combien de vues pour{" "}
                <span className="text-gradient">ton budget</span> ?
              </>
            }
            subtitle="Bouge les curseurs. Le calcul est le même que celui qu'on applique en campagne."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-12 max-w-5xl">
            {/* Sélecteur de mode */}
            <div
              role="group"
              aria-label="Point de vue du simulateur"
              className="mx-auto mb-6 flex w-fit rounded-full border border-line bg-surface/70 p-1 backdrop-blur"
            >
              {(
                [
                  ["brand", "Je suis une marque"],
                  ["clipper", "Je suis clippeur"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={mode === key}
                  onClick={() => setMode(key)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-2 ${
                    mode === key
                      ? "bg-brand text-white shadow-[0_6px_24px_-8px_rgba(124,92,255,.9)]"
                      : "text-mist hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="overflow-hidden rounded-3xl border border-line-2 bg-gradient-to-b from-surface-2 to-surface">
              <div className="grid gap-px bg-line md:grid-cols-[1fr_1fr]">
                {/* Contrôles */}
                <div className="bg-surface-2 p-7 md:p-9">
                  <Eyebrow className="mb-7">
                    {mode === "brand" ? "Ta campagne" : "Ton mois de clipping"}
                  </Eyebrow>

                  <div className="space-y-7">
                    {mode === "brand" ? (
                      <>
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
                        <Slider
                          id="sim-cpm"
                          label="CPM cible"
                          value={cpm}
                          min={S.cpmMin}
                          max={S.cpmMax}
                          step={S.cpmStep}
                          onChange={setCpm}
                          display={`${nfCpm.format(cpm)} / 1 000 vues`}
                        />
                      </>
                    ) : (
                      <>
                        <Slider
                          id="sim-views"
                          label="Vues générées sur le mois"
                          value={views}
                          min={S.viewsMin}
                          max={S.viewsMax}
                          step={S.viewsStep}
                          onChange={setViews}
                          display={compact(views)}
                        />
                        <Slider
                          id="sim-ccpm"
                          label="CPM de la campagne"
                          value={clipperCpm}
                          min={S.cpmMin}
                          max={S.cpmMax}
                          step={S.cpmStep}
                          onChange={setClipperCpm}
                          display={`${nfCpm.format(clipperCpm)} / 1 000 vues`}
                        />
                      </>
                    )}

                    <div>
                      <span className="text-sm text-mist">Niche</span>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {S.nichePresets.map((n) => (
                          <button
                            key={n.key}
                            type="button"
                            onClick={() => setNiche(n.key)}
                            aria-pressed={niche === n.key}
                            className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                              niche === n.key
                                ? "border-brand/60 bg-brand/15 text-white"
                                : "border-line-2 text-mist hover:border-line-2 hover:text-white"
                            }`}
                          >
                            {n.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Résultats */}
                <div className="relative bg-surface p-7 md:p-9" aria-live="polite">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-brand/15 blur-3xl"
                  />
                  <div className="relative">
                    <Eyebrow className="mb-7">Estimation</Eyebrow>

                    {mode === "brand" ? (
                      <>
                        <div className="nums text-5xl font-semibold leading-none tracking-tight text-white sm:text-6xl">
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

                        <div className="mt-7 rounded-xl border border-line bg-white/[0.02] p-4">
                          <p className="text-sm leading-relaxed text-mist">
                            Pour ces {compact(brand.estViews)} vues, une campagne publicitaire
                            classique à {nfCpm.format(S.paidCpm)} de CPM coûterait{" "}
                            <span className="nums font-semibold text-white">
                              {nfEur.format(brand.paidEquivalent)}
                            </span>
                            .
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="nums text-5xl font-semibold leading-none tracking-tight text-white sm:text-6xl">
                          {nfEur.format(clipper.earnings)}
                        </div>
                        <p className="mt-3 text-sm text-mist">de gains estimés sur le mois</p>

                        <div className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-7">
                          <Result value={`~ ${nf.format(clipper.clips)}`} label="clips à produire" />
                          <Result
                            value={nfCpm.format(clipper.perClip)}
                            label="par clip en moyenne"
                            accent
                          />
                        </div>

                        <div className="mt-7 rounded-xl border border-line bg-white/[0.02] p-4">
                          <ul className="space-y-2.5">
                            {[
                              "Aucun minimum d'abonnés pour participer",
                              "Versement automatique via Whop",
                              "Pas de plafond de gains par clip",
                            ].map((t) => (
                              <li key={t} className="flex gap-2.5 text-sm text-mist">
                                <Check className="mt-0.5 size-4 shrink-0 text-lime" />
                                {t}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Pied du simulateur */}
              <div className="flex flex-col items-center gap-4 border-t border-line bg-ink-2/60 px-7 py-6 sm:flex-row sm:justify-between md:px-9">
                <p className="flex items-start gap-2.5 text-xs leading-relaxed text-mist-2">
                  <Bolt className="mt-px size-4 shrink-0 text-mist-2" />
                  Estimation indicative. Le volume réel dépend de la niche, du format source et de
                  la qualité des montages.
                </p>
                <Button
                  href={mode === "brand" ? site.links.calendly : site.links.whopClippers}
                  variant={mode === "brand" ? "light" : "primary"}
                  arrow
                  className="w-full shrink-0 sm:w-auto"
                >
                  {mode === "brand" ? "Obtenir un devis exact" : "Rejoindre sur Whop"}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
