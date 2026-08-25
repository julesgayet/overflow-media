import { Reveal, SectionHeading } from "./ui";
import { Check } from "./icons";

const steps = [
  {
    n: "01",
    title: "Brief & cadrage",
    text: "On définit ensemble l'objectif (notoriété, trafic, ventes), le CPM cible, le budget et les règles de la campagne. Tu valides la charte avant qu'un seul clip ne sorte.",
    time: "Jour 1",
  },
  {
    n: "02",
    title: "Préparation des assets",
    text: "On récupère ton contenu source, on prépare le kit clippeur : rushes, logos, polices, exemples de hooks qui marchent, do & don't.",
    time: "Jour 1–2",
  },
  {
    n: "03",
    title: "Lancement sur Whop",
    text: "La campagne est publiée auprès de la communauté. Les clippeurs postulent, sont validés, montent et publient. Les premiers clips sortent sous 48 h.",
    time: "Jour 2",
  },
  {
    n: "04",
    title: "Modération & paiement",
    text: "Chaque clip soumis est vérifié, les vues sont validées, les clippeurs sont payés au CPM automatiquement. Tu suis tout depuis un dashboard.",
    time: "En continu",
  },
];

const compare = {
  old: [
    "Budget engagé d'avance, résultat incertain",
    "Une seule créa, un seul angle testé",
    "Coût par vue souvent supérieur à 5 €",
    "Audience qui identifie la pub et scrolle",
  ],
  neu: [
    "Tu ne paies que les vues réellement générées",
    "Des centaines d'angles testés en parallèle",
    "Un CPM entre 0,50 € et 2 € selon la niche",
    "Du contenu natif, publié par de vrais comptes",
  ],
};

export function Method() {
  return (
    <section id="methode" className="relative border-y border-line bg-ink-2/40 py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="La méthode"
            title={
              <>
                Du brief aux premiers clips en{" "}
                <span className="text-gradient">48 heures</span>
              </>
            }
            subtitle="Un process rodé, quatre étapes, aucune zone d'ombre."
          />
        </Reveal>

        <div className="relative mt-16">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-line-2 to-transparent lg:block"
          />
          <div className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="relative">
                  <div className="mb-6 flex items-center gap-4 lg:block">
                    <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full border border-line-2 bg-surface font-mono text-sm font-semibold text-brand-2">
                      {s.n}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.18em] text-mist-2 lg:mt-5 lg:block">
                      {s.time}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-mist">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Comparatif */}
        <Reveal delay={120}>
          <div className="mt-20 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-line bg-surface/40 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mist-2">
                Publicité classique
              </p>
              <ul className="mt-5 space-y-3.5">
                {compare.old.map((t) => (
                  <li key={t} className="flex gap-3 text-sm text-mist">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-mist-2" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-brand/30 bg-gradient-to-b from-brand/[0.09] to-transparent p-7">
              <div
                aria-hidden
                className="absolute -right-16 -top-16 size-48 rounded-full bg-brand/20 blur-3xl"
              />
              <p className="relative text-xs font-semibold uppercase tracking-[0.18em] text-brand-2">
                Campagne de clipping
              </p>
              <ul className="relative mt-5 space-y-3.5">
                {compare.neu.map((t) => (
                  <li key={t} className="flex gap-3 text-sm text-white/90">
                    <Check className="mt-0.5 size-4 shrink-0 text-lime" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
