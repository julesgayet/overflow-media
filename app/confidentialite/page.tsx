import type { Metadata } from "next";
import { site } from "@/site.config";
import { Identity, LegalPage, LegalSection } from "@/components/legal";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment Omniflux collecte, utilise et conserve vos données personnelles : finalités, base légale, durées de conservation et exercice de vos droits RGPD.",
  alternates: { canonical: "/confidentialite" },
  robots: { index: false, follow: true },
};

export default function Confidentialite() {
  return (
    <LegalPage title="Politique de confidentialité">
      <p>
        Cette politique décrit les données personnelles traitées par ce site, leurs finalités,
        et les droits dont vous disposez au titre du RGPD (règlement UE 2016/679). Ce site est un
        site vitrine : il ne propose ni création de compte, ni espace client. Les seules données
        traitées sont celles liées à une prise de contact ou à une réservation de créneau.
      </p>

      <LegalSection heading="1. Responsable du traitement">
        <Identity />
      </LegalSection>

      <LegalSection heading="2. Données collectées, finalités et bases légales">
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-surface-2 text-xs uppercase tracking-wide text-mist-2">
                <th className="px-4 py-3 font-medium">Donnée</th>
                <th className="px-4 py-3 font-medium">Finalité</th>
                <th className="px-4 py-3 font-medium">Base légale</th>
                <th className="px-4 py-3 font-medium">Conservation</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Nom, e-mail, créneau choisi (Cal.com)",
                  "Organiser le rendez-vous de cadrage",
                  "Mesures précontractuelles",
                  "Durée définie par Cal.com",
                ],
                [
                  "Nom, société, contenu de l'e-mail",
                  "Répondre à une demande de campagne",
                  "Mesures précontractuelles",
                  "Durée de l'échange + 3 ans",
                ],
                [
                  "Nom, e-mail, société (client sous contrat)",
                  "Exécution et facturation de la campagne",
                  "Exécution du contrat",
                  "Durée du contrat + 10 ans (obligations comptables)",
                ],
              ].map((row) => (
                <tr key={row[0]} className="border-b border-line last:border-0">
                  {row.map((cell, i) => (
                    <td key={i} className="px-4 py-3 align-top text-mist">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Aucune donnée personnelle n&apos;est utilisée à des fins de publicité ciblée, ni
          revendue, ni cédée à des tiers à des fins commerciales.
        </p>
      </LegalSection>

      <LegalSection heading="3. Sous-traitants">
        <p>
          Les prestataires suivants sont susceptibles de traiter des données personnelles pour le
          compte de l&apos;éditeur :
        </p>
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-surface-2 text-xs uppercase tracking-wide text-mist-2">
                <th className="px-4 py-3 font-medium">Prestataire</th>
                <th className="px-4 py-3 font-medium">Rôle</th>
                <th className="px-4 py-3 font-medium">Localisation</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Vercel Inc.", "Hébergement du site", site.legal.hostRegion],
                ["Cal, Inc. (Cal.com)", "Prise de rendez-vous", "États-Unis"],
              ].map((row) => (
                <tr key={row[0]} className="border-b border-line last:border-0">
                  {row.map((cell, i) => (
                    <td key={i} className="px-4 py-3 align-top text-mist">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Le transfert de données vers Cal, Inc. (États-Unis) s&apos;appuie sur les clauses
          contractuelles types de la Commission européenne, à défaut de décision
          d&apos;adéquation applicable. Sa propre politique de confidentialité régit le
          traitement qu&apos;elle effectue.
        </p>
      </LegalSection>

      <LegalSection heading="4. Cookies">
        <p>
          Ce site ne dépose lui-même aucun cookie publicitaire, ni cookie de mesure
          d&apos;audience, et n&apos;utilise aucun outil d&apos;analytics.
        </p>
        <p>
          La page de réservation intègre un calendrier fourni par Cal.com : à son chargement,
          votre navigateur se connecte aux serveurs de Cal, Inc., qui peut déposer les cookies
          strictement nécessaires à son fonctionnement (maintien de la session de réservation).
          Ce dépôt relève de l&apos;exemption de consentement prévue par l&apos;article 82 de la
          loi Informatique et Libertés pour les cookies strictement nécessaires au service
          demandé : c&apos;est pourquoi aucun bandeau de consentement n&apos;est présenté sur ce
          site.
        </p>
        <p>
          Si un outil de mesure d&apos;audience ou un traceur tiers venait à être ajouté, un
          bandeau de consentement conforme serait mis en place et cette page serait mise à jour
          au préalable.
        </p>
      </LegalSection>

      <LegalSection heading="5. Vos droits">
        <p>
          Vous disposez des droits d&apos;accès, de rectification, d&apos;effacement, de
          limitation, d&apos;opposition et de portabilité prévus aux articles 15 à 22 du RGPD.
          Pour les exercer, écrivez à{" "}
          <a href={`mailto:${site.email}`} className="text-brand hover:underline">
            {site.email}
          </a>
          . Vous disposez également du droit d&apos;introduire une réclamation auprès de la CNIL
          (www.cnil.fr).
        </p>
      </LegalSection>

      <LegalSection heading="6. Modifications">
        <p>
          Toute modification substantielle de la présente politique est publiée sur cette page
          avant son entrée en vigueur.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
