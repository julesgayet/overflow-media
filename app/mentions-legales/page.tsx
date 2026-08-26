import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/site.config";
import { Footer } from "@/components/footer";
import { Arrow } from "@/components/icons";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false, follow: true },
};

export default function MentionsLegales() {
  return (
    <>
      <main className="container-x py-24 md:py-32">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-ink"
        >
          <Arrow className="size-4 rotate-180 transition-transform group-hover:-translate-x-1" />
          Retour à l&apos;accueil
        </Link>

        <h1 className="mt-10 text-4xl font-semibold tracking-tight md:text-5xl">
          Mentions légales
        </h1>

        <div className="mt-12 max-w-2xl space-y-10 text-sm leading-relaxed text-mist">
          <section>
            <h2 className="mb-3 text-base font-semibold text-ink">Éditeur du site</h2>
            <p>
              {site.legalName}
              <br />
              SIRET : {site.legal.siret}
              <br />
              Siège : {site.legal.address}
              <br />
              Directeur de la publication : {site.legal.director}
              <br />
              Contact :{" "}
              <a href={`mailto:${site.email}`} className="text-brand-2 hover:underline">
                {site.email}
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-ink">Hébergement</h2>
            <p>{site.legal.host}</p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-ink">Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus présents sur ce site (textes, éléments graphiques,
              identité visuelle) est la propriété de {site.legalName}, sauf mention contraire.
              Toute reproduction ou représentation, totale ou partielle, sans autorisation
              écrite préalable est interdite.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-ink">Données personnelles</h2>
            <p>
              Ce site ne dépose aucun cookie de mesure d&apos;audience ni de traceur publicitaire.
              La page de réservation intègre un calendrier fourni par <strong>Cal.com</strong> : à
              son chargement, votre navigateur se connecte aux serveurs de Cal.com, qui peut
              déposer les cookies nécessaires à son fonctionnement et traiter les informations que
              vous saisissez pour réserver un créneau (nom, e-mail, créneau choisi). Ce traitement
              est régi par la politique de confidentialité de Cal, Inc.
            </p>
            <p className="mt-4">
              Les autres données traitées sont celles que vous nous transmettez volontairement par
              e-mail, utilisées uniquement pour répondre à votre demande et conservées le temps de
              l&apos;échange commercial. Conformément au RGPD, vous disposez d&apos;un droit
              d&apos;accès, de rectification, d&apos;opposition et de suppression, que vous pouvez
              exercer à l&apos;adresse {site.email}.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-ink">Prestations</h2>
            <p>
              Les campagnes de clipping et la rémunération des clippeurs sont opérées via la
              plateforme Whop, soumise à ses propres conditions générales. Les modalités précises
              de chaque campagne (CPM, budget, plateformes, durée) sont définies dans le brief
              contractuel remis avant son lancement.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
