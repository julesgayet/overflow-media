import type { Metadata } from "next";
import { site } from "@/site.config";
import { Host, Identity, LegalPage, LegalSection } from "@/components/legal";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Identité de l'éditeur du site omniflux.fr, hébergeur et contact, conformément à la LCEN.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

export default function MentionsLegales() {
  return (
    <LegalPage title="Mentions légales">
      <p>
        Informations relatives à l&apos;éditeur et à l&apos;hébergeur du site, conformément à
        l&apos;article 6 III-1 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans
        l&apos;économie numérique (LCEN).
      </p>

      <LegalSection heading="1. Éditeur du site">
        <Identity />
      </LegalSection>

      <LegalSection heading="2. Hébergeur">
        <p>Le site est hébergé par :</p>
        <Host />
      </LegalSection>

      <LegalSection heading="3. Propriété intellectuelle">
        <p>
          L&apos;ensemble des éléments composant ce site (code, interface, identité visuelle,
          textes, visuels) est protégé par le droit de la propriété intellectuelle et demeure la
          propriété exclusive de l&apos;éditeur, sauf mention contraire. Toute reproduction ou
          représentation, totale ou partielle, sans autorisation écrite préalable est interdite.
        </p>
        <p>
          Les clients conservent l&apos;intégralité des droits sur le contenu source qu&apos;ils
          transmettent. Les modalités de licence sur les clips produits sont précisées dans les{" "}
          <a href="/cgv" className="text-brand hover:underline">
            Conditions générales de vente
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="4. Signalement de contenu illicite">
        <p>
          Tout contenu manifestement illicite peut être signalé à l&apos;adresse{" "}
          <a href={`mailto:${site.email}`} className="text-brand hover:underline">
            {site.email}
          </a>
          . L&apos;éditeur s&apos;engage à traiter les signalements dans les meilleurs délais.
        </p>
      </LegalSection>

      <LegalSection heading="5. Données personnelles et cookies">
        <p>
          Le traitement des données personnelles est décrit dans la{" "}
          <a href="/confidentialite" className="text-brand hover:underline">
            Politique de confidentialité
          </a>
          , qui précise également les cookies déposés par ce site.
        </p>
      </LegalSection>

      <LegalSection heading="6. Droit applicable">
        <p>
          Droit français. Tout litige relatif à l&apos;utilisation du site relève de la
          compétence du {site.legal.court}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
