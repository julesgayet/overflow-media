import { GlowCard, Reveal, SectionHeading } from "./ui";
import { Scissors, Users, Chart, Shield, Wallet, Layers } from "./icons";

const items = [
  {
    icon: Scissors,
    title: "Découpage & montage",
    text: "On transforme tes lives, podcasts et vidéos longues en clips verticaux calibrés pour chaque plateforme : hook dans les 2 premières secondes, sous-titres dynamiques, format natif.",
  },
  {
    icon: Users,
    title: "Réseau de clippeurs",
    text: "Une communauté de créateurs vérifiés, briefés et notés. On recrute, on filtre et on anime — tu n'as jamais à gérer un seul monteur en direct.",
  },
  {
    icon: Layers,
    title: "Diffusion multi-comptes",
    text: "Publication coordonnée sur TikTok, Reels et Shorts à partir de dizaines de comptes, pour multiplier les chances qu'un clip perce sans cannibaliser ton compte principal.",
  },
  {
    icon: Chart,
    title: "Tracking & reporting",
    text: "Dashboard des vues validées, du CPM réel et du budget consommé. Un rapport clair en fin de campagne : ce qui a performé, ce qu'on garde, ce qu'on coupe.",
  },
  {
    icon: Shield,
    title: "Modération & conformité",
    text: "Chaque clip est relu avant validation : respect de la charte, pas de contresens, pas de vues frauduleuses. Ta marque ne se retrouve jamais où elle ne devrait pas.",
  },
  {
    icon: Wallet,
    title: "Paiements automatisés",
    text: "Toute la rémunération passe par Whop : soumission des liens, vérification des vues, versement au CPM. Aucune facture à traiter de ton côté.",
  },
];

export function Offer() {
  return (
    <section id="offre" className="relative py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Pour les marques & créateurs"
            title={
              <>
                Une machine à vues,{" "}
                <span className="text-gradient">clé en main</span>
              </>
            }
            subtitle="Tu fournis le contenu source et le budget. On s'occupe du reste — du premier montage au dernier virement."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <Reveal key={it.title} delay={(i % 3) * 90}>
                <GlowCard className="h-full">
                  <span className="mb-5 grid size-11 place-items-center rounded-xl border border-line-2 bg-white/[0.04] text-brand-2">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight">{it.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-mist">{it.text}</p>
                </GlowCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
