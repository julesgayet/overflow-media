import { site } from "@/site.config";
import { Button, Reveal, SectionHeading } from "./ui";
import { Check, Wallet, Clock, Target, Bolt } from "./icons";

const perks = [
  {
    icon: Wallet,
    title: "Payé au CPM, pas au forfait",
    text: "Tu touches un montant fixe pour 1 000 vues. Un clip qui explose, c'est ton gain qui explose — sans plafond par vidéo.",
  },
  {
    icon: Clock,
    title: "Paiement rapide et traçable",
    text: "Tu soumets tes liens sur Whop, les vues sont vérifiées, le virement part. Pas de relance, pas de « on te paie le mois prochain ».",
  },
  {
    icon: Target,
    title: "Des briefs qui t'évitent de deviner",
    text: "Rushes fournis, hooks qui fonctionnent, formats validés. Tu montes, tu publies — tu ne perds pas trois heures à chercher l'angle.",
  },
  {
    icon: Bolt,
    title: "Aucun minimum d'abonnés",
    text: "On juge le montage, pas la taille du compte. Beaucoup de nos meilleurs clippeurs ont démarré avec un compte créé la veille.",
  },
];

const requirements = [
  "Savoir monter un clip vertical propre (CapCut suffit)",
  "Publier régulièrement, en respectant le brief",
  "Un compte Whop pour recevoir tes paiements",
  "Aucune vue achetée — contrôle systématique",
];

export function Clippers() {
  return (
    <section
      id="clippeurs"
      className="relative overflow-hidden border-y border-line bg-surface-2 py-24 md:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      </div>

      <div className="container-x">
        <div className="grid items-start gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <SectionHeading
                center={false}
                eyebrow="Pour les clippeurs"
                title={
                  <>
                    Monte des clips.
                    <br />
                    <span className="text-gradient">Encaisse tes vues.</span>
                  </>
                }
                subtitle="Rejoins la communauté, choisis une campagne, publie. Tu es payé sur les vues que tu génères, vérifiées et versées via Whop."
              />
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href={site.links.whopClippers} size="lg" arrow>
                  Rejoindre sur Whop
                </Button>
                <Button href={site.links.discord} variant="outline" size="lg">
                  Rejoindre le Discord
                </Button>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-10 rounded-2xl border border-line bg-surface p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mist-2">
                  Ce qu&apos;il te faut
                </p>
                <ul className="mt-4 space-y-3">
                  {requirements.map((r) => (
                    <li key={r} className="flex gap-3 text-sm text-mist">
                      <Check className="mt-0.5 size-4 shrink-0 text-lime" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {perks.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={i * 90}>
                  <div className="h-full rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-line-2">
                    <span className="mb-5 grid size-11 place-items-center rounded-xl border border-line-2 bg-surface text-accent">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="text-base font-semibold tracking-tight">{p.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-mist">{p.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
