"use client";

import { useMemo, useState } from "react";
import { site } from "@/site.config";
import { Button, Eyebrow, Reveal, SectionHeading } from "./ui";
import { TiltCard } from "./tilt-card";
import { Bolt, Check } from "./icons";

const S = site.simulator;
const A = S.audience;

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

/*  Un axe de ciblage = un menu déroulant. Les pastilles occupaient trois
    grilles entières dans une carte déjà dense ; trois `<select>` natifs
    tiennent sur une seule ligne, et le sélecteur natif reste le meilleur
    contrôle au doigt sur mobile.                                          */
function Select({
  id,
  label,
  options,
  value,
  onChange,
}: {
  id: string;
  label: string;
  options: readonly { key: string; label: string }[];
  value: string;
  onChange: (key: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm text-mist">
        {label}
      </label>
      <div className="relative mt-2.5">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          //  `appearance-none` retire la flèche système, qu'on redessine
          //  ci-dessous : celle de macOS est claire et invisible sur le fond
          //  sombre de la carte.
          className="w-full appearance-none rounded-xl border border-line-2 bg-surface py-2.5 pl-3.5 pr-9 text-sm text-ink transition-colors hover:border-brand/50 focus:border-brand/60 focus:outline-none"
        >
          {options.map((o) => (
            <option key={o.key} value={o.key} className="bg-surface text-ink">
              {o.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-mist-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}

export function Simulator() {
  const [budget, setBudget] = useState<number>(S.budgetDefault);
  const [cpm, setCpm] = useState<number>(S.cpmDefault);

  const [country, setCountry] = useState<string>(A.countries[0].key);
  const [gender, setGender] = useState<string>(A.genders[0].key);
  const [age, setAge] = useState<string>(A.ages[0].key);

  const brand = useMemo(() => {
    const estViews = (budget / cpm) * 1000;
    const paidEquivalent = (estViews / 1000) * S.paidCpm;
    const multiplier = S.paidCpm / cpm;
    return { estViews, paidEquivalent, multiplier };
  }, [budget, cpm]);

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

                    {/*  Les trois axes sur une ligne : ils se lisent comme une
                        seule phrase de ciblage, et la carte reste courte.  */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <Select
                        id="sim-pays"
                        label="Pays"
                        options={A.countries}
                        value={country}
                        onChange={setCountry}
                      />
                      <Select
                        id="sim-genre"
                        label="Genre"
                        options={A.genders}
                        value={gender}
                        onChange={setGender}
                      />
                      <Select
                        id="sim-age"
                        label="Âge"
                        options={A.ages}
                        value={age}
                        onChange={setAge}
                      />
                    </div>

                    {/*  Plage unique, indépendante du ciblage : le CPM est ce que
                        la marque décide de payer les 1 000 vues, pas une
                        conséquence de l'audience choisie.                      */}
                    <Slider
                      id="sim-cpm"
                      label="CPM cible"
                      value={cpm}
                      min={S.cpmMin}
                      max={S.cpmMax}
                      step={S.cpmStep}
                      onChange={setCpm}
                      display={`${nfCpm.format(cpm)} / 1 000 vues`}
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

                    {/*  En toutes lettres, pas en « 2,4 M » : la marque doit pouvoir
                        comparer ce chiffre à un devis, où les vues sont
                        toujours données au chiffre près.                     */}
                    <div className="nums text-4xl font-semibold leading-none tracking-tight text-ink sm:text-5xl">
                      {nf.format(Math.round(brand.estViews))}
                    </div>
                    <p className="mt-3 text-sm text-mist">vues estimées sur la campagne</p>

                    <div className="mt-8 border-t border-line pt-7">
                      <Result
                        value={`×${brand.multiplier.toFixed(0)}`}
                        label="moins cher que la pub payante"
                        accent
                      />
                    </div>

                    <div className="mt-7 rounded-xl border border-line bg-surface p-4">
                      <p className="text-sm leading-relaxed text-mist">
                        Pour ces {nf.format(Math.round(brand.estViews))} vues, une campagne publicitaire
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
                  Estimation indicative. Le volume réel dépend de l'audience visée, du format source
                  et de la qualité des montages.
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
