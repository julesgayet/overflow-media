"use client";

import type { CSSProperties } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";

/* ── Étapes en fiches épinglées ────────────────────────────────────────────
 *  Fiches dispersées et légèrement pivotées, reliées par un trait pointillé
 *  qui défile. Adapté d'un composant communautaire, avec trois écarts :
 *
 *  1. Un seul accent. L'original alternait orange / bleu / violet ; la charte
 *     n'autorise qu'une couleur qui parle, donc tout est en cobalt.
 *  2. Typographie du site. L'original imposait Comic Sans en dur sur le
 *     numéro — ici c'est la phase (AVANT / PENDANT / APRÈS) qui occupe cette
 *     place : elle porte l'information, là où « 01 » ne fait que compter.
 *  3. `motion/react` → `framer-motion`, seul paquet installé.
 *
 *  Le fond ligné est la seule texture de la page hors grille du hero : elle
 *  est assumée, c'est la surface sur laquelle les fiches sont épinglées.
 * ------------------------------------------------------------------------ */

export type PinnedStep = {
  /** Mot-repère affiché en grand, en cobalt. */
  phase: string;
  title: string;
  text: string;
};

/** Positions et inclinaisons, pensées pour trois fiches sur 800 px de haut. */
const POSITIONS = [
  { className: "md:absolute md:top-0 md:left-[15%]", rotate: "rotate-[7deg]" },
  { className: "md:absolute md:top-[120px] md:right-[15%]", rotate: "rotate-[-7deg]" },
  { className: "md:absolute md:top-[450px] md:left-[15%]", rotate: "rotate-[7deg]" },
];

const HEIGHT = 800;

/*  Le trait relie la fiche 1 à la 2, puis la 2 à la 3. Coordonnées calées sur
    POSITIONS dans un repère de 1000 de large — les modifier ensemble.       */
const PATH = "M 290 150 C 500 150, 550 270, 710 270 C 850 270, 500 350, 290 450";

function Pin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
    </svg>
  );
}

function Card({ step, position }: { step: PinnedStep; position: (typeof POSITIONS)[number] }) {
  return (
    <div
      className={`relative w-full transition-transform duration-300 hover:z-30 hover:scale-[1.03] md:w-[280px] ${position.rotate} ${position.className}`}
    >
      <div className="rounded-3xl border border-line bg-surface p-2 shadow-[0_12px_30px_-14px_rgba(23,23,26,0.25)]">
        <Pin className="mx-auto mb-5 size-7 text-brand" />
        <div className="rounded-2xl border border-line bg-surface-2 p-5">
          <span className="block text-2xl font-semibold uppercase tracking-[0.06em] text-brand">
            {step.phase}
          </span>
          <h3 className="mt-4 text-xl font-semibold leading-tight tracking-tight text-ink">
            {step.title}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-mist">{step.text}</p>
        </div>
      </div>
    </div>
  );
}

export function PinnedSteps({ steps }: { steps: readonly PinnedStep[] }) {
  const reduce = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative">
        {/*  Fond ligné, et dégradés qui l'éteignent sur les côtés pour qu'il
            ne bute pas net sur les bords de la section.                     */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(var(--color-ink) 1px, transparent 1px)",
            backgroundSize: "100% 32px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-ground to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-ground to-transparent"
        />

        <div
          className="relative z-10 mx-auto flex w-full max-w-[1000px] flex-col space-y-8 md:block md:h-[var(--h)] md:space-y-0"
          style={{ ["--h" as string]: `${HEIGHT}px` } as CSSProperties}
        >
          {steps.length > 1 && (
            <svg
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 z-0 hidden h-full w-full md:block"
              viewBox={`0 0 1000 ${HEIGHT}`}
              preserveAspectRatio="none"
            >
              <m.path
                d={PATH}
                stroke="currentColor"
                className="text-line-2"
                strokeWidth="2"
                strokeDasharray="8 6"
                fill="none"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                /*  Le décalage boucle sur un multiple de 14 (8+6) pour que la
                    reprise soit invisible. Coupé si l'utilisateur a demandé
                    moins de mouvement : c'est une animation permanente.      */
                initial={{ strokeDashoffset: 0 }}
                animate={reduce ? undefined : { strokeDashoffset: -140 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          )}

          {steps.map((step, i) => (
            <Card key={step.phase} step={step} position={POSITIONS[i % POSITIONS.length]} />
          ))}
        </div>
      </div>
    </LazyMotion>
  );
}
