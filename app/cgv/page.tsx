import type { Metadata } from "next";
import { site } from "@/site.config";
import { LegalPage, LegalSection } from "@/components/legal";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  robots: { index: false, follow: true },
};

export default function Cgv() {
  return (
    <LegalPage title="Conditions générales de vente">
      <p>
        Les présentes conditions régissent les campagnes de clipping commandées auprès de{" "}
        {site.name}. Elles sont acceptées lors de la validation du brief de campagne.
      </p>

      <LegalSection heading="1. Définitions">
        <ul className="list-disc space-y-2 pl-5">
          <li>« Agence » : {site.name}, éditeur du présent site.</li>
          <li>
            « Client » : la personne morale ou physique agissant dans le cadre de son activité
            professionnelle, qui commande une campagne.
          </li>
          <li>
            « Réseau » : l&apos;ensemble des comptes diffuseurs, vérifiés par l&apos;Agence, sur
            lesquels les clips sont publiés.
          </li>
          <li>
            « Campagne » : la prestation définie d&apos;un commun accord dans le brief — objectif,
            plateformes, CPM, budget, durée.
          </li>
          <li>« Vue vérifiée » : une vue ayant passé les contrôles anti-fraude de l&apos;article 6.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="2. Objet">
        <p>
          L&apos;Agence découpe le contenu long remis par le Client en clips verticaux, les fait
          publier par le Réseau sur TikTok, Instagram Reels et YouTube Shorts, et facture au
          Client les vues vérifiées générées, dans la limite du budget plafonné convenu.
          L&apos;Agence n&apos;est pas partie aux relations entre le Client et les plateformes de
          diffusion, dont les propres conditions d&apos;utilisation s&apos;appliquent.
        </p>
      </LegalSection>

      <LegalSection heading="3. Commande et brief">
        <p>
          Toute campagne démarre par un brief écrit, validé par les deux parties, précisant
          l&apos;objectif, les plateformes ciblées, le CPM applicable et le budget maximal. Le
          Client garantit disposer des droits nécessaires sur le contenu source qu&apos;il
          transmet et être en mesure d&apos;en accorder l&apos;usage dans les conditions de
          l&apos;article 7.
        </p>
      </LegalSection>

      <LegalSection heading="4. Prix et facturation">
        <p>
          La prestation est facturée au CPM (coût pour 1 000 vues vérifiées) convenu dans le
          brief, à partir de {site.pricing.from} {site.pricing.unit}. Le budget indiqué dans le
          brief constitue un plafond : la facturation s&apos;arrête dès qu&apos;il est atteint,
          sans dépassement automatique.
        </p>
        <p>
          Chaque campagne est un engagement ponctuel, sans reconduction automatique : aucun
          abonnement récurrent n&apos;est souscrit du seul fait d&apos;une première campagne. À
          l&apos;issue de la validation du brief, l&apos;Agence transmet au Client un lien de
          paiement sécurisé correspondant au budget convenu ; la campagne démarre à
          réception du paiement. Le paiement est encaissé via un prestataire de paiement tiers,
          dans les conditions de ses propres conditions d&apos;utilisation.
        </p>
      </LegalSection>

      <LegalSection heading="5. Droit de rétractation">
        <p>
          Le droit de rétractation de 14 jours prévu par le code de la consommation bénéficie aux
          consommateurs. Le Client agissant dans le cadre de son activité professionnelle, ce
          droit ne s&apos;applique pas de plein droit à la présente prestation. Les conditions
          d&apos;annulation propres à chaque campagne sont, le cas échéant, précisées dans le
          brief contractuel.
        </p>
      </LegalSection>

      <LegalSection heading="6. Vérification anti-fraude">
        <p>Seules les vues suivantes sont facturées au Client :</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="font-medium text-ink">Avant</span> — chaque compte du Réseau est
            vérifié avant d&apos;entrer en campagne (historique, audience, régularité).
          </li>
          <li>
            <span className="font-medium text-ink">Pendant</span> — chaque clip soumis est relu :
            respect du brief, de la charte et des règles de la plateforme.
          </li>
          <li>
            <span className="font-medium text-ink">Après</span> — les pics de vues anormaux sont
            contrôlés ; seules les vues humaines validées sont facturées.
          </li>
        </ul>
        <p>
          Un compte pris en fraude est exclu du Réseau, et les vues concernées ne sont pas
          facturées au Client.
        </p>
      </LegalSection>

      <LegalSection heading="7. Propriété intellectuelle et licence">
        <p>
          Le Client reste propriétaire de son contenu source et des clips produits à partir de
          celui-ci. Il accorde à l&apos;Agence, ainsi qu&apos;au Réseau chargé de la diffusion,
          une licence limitée à la publication des clips sur les plateformes prévues au brief,
          pour la durée de la campagne.
        </p>
      </LegalSection>

      <LegalSection heading="8. Responsabilité">
        <p>
          L&apos;Agence est tenue à une obligation de moyens quant à la production et à la
          diffusion des clips ; le volume de vues obtenu dépend de facteurs qu&apos;elle ne
          maîtrise pas entièrement (algorithmes des plateformes, réception du contenu par le
          public). Sauf faute lourde ou dolosive, sa responsabilité est plafonnée au montant
          facturé au titre de la campagne concernée.
        </p>
      </LegalSection>

      <LegalSection heading="9. Droit applicable et juridiction">
        <p>
          Droit français. À défaut de résolution amiable, tout litige relève de la compétence
          exclusive du {site.legal.court}.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
