import type { Metadata } from "next";
import { site } from "@/site.config";
import { article, breadcrumbs, faqPage, graph, jsonLdScript, webPage } from "@/lib/seo";
import { ArticlePage, ArticleCta, DataTable, KeyAnswer, Section } from "@/components/article";

/*  Page cible de « prix clipping » / « cpm clipping » / « combien coûte le
 *  clipping ». Intention informationnelle, pas commerciale : elle répond
 *  d'abord, elle vend ensuite. C'est ce qui la rend citable par un moteur de
 *  réponse — une page qui commence par un argumentaire n'est jamais reprise.
 *
 *  ⚠️ Aucun chiffre n'est écrit en dur ici : tout vient de `site.config.ts`,
 *  pour que la page ne puisse pas contredire le simulateur de la home.      */

const { cpmMin, cpmMax, cpmDefault, paidCpm, budgetMin } = site.simulator;

const eur = (n: number) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const int = (n: number) => Math.round(n).toLocaleString("fr-FR");

/*  Une estimation ne s'affiche pas à la vue près : « 4 166 667 vues » donne
 *  une fausse impression d'exactitude sur un chiffre qui est, par nature,
 *  une projection. Arrondi à trois chiffres significatifs.                  */
const approx = (n: number) => {
  const mag = 10 ** (Math.floor(Math.log10(n)) - 2);
  return int(Math.round(n / mag) * mag);
};

/** Vues obtenues pour un budget donné, au CPM passé. */
const views = (budget: number, cpm: number) => (budget / cpm) * 1000;

const BUDGETS = [budgetMin, 2000, 5000, 15000];

const cheaper = Math.floor(paidCpm / cpmMin);

const faq = [
  {
    q: "Combien coûte une campagne de clipping ?",
    a: `Chez ${site.name}, le clipping se facture au CPM, entre ${eur(cpmMin)} € et ${eur(cpmMax)} € pour 1 000 vues selon l'audience visée. Un budget de ${int(5000)} € au CPM moyen de ${eur(cpmDefault)} € représente environ ${approx(views(5000, cpmDefault))} vues. Le budget est plafonné à l'avance : il n'est jamais dépassé.`,
  },
  {
    q: "Qu'est-ce qu'un CPM en clipping ?",
    a: "Le CPM (coût pour mille) est le prix payé pour 1 000 vues générées. En clipping, il est fixe et connu avant le lancement : il n'y a pas d'enchères comme sur les régies publicitaires, donc pas de dérive de coût en cours de campagne.",
  },
  {
    q: `Pourquoi le CPM varie-t-il entre ${eur(cpmMin)} € et ${eur(cpmMax)} € ?`,
    a: "Le prix dépend de la difficulté à toucher l'audience demandée. Une campagne sans contrainte de ciblage se situe en bas de la fourchette ; restreindre le pays, le genre ou la tranche d'âge réduit l'inventaire de comptes diffuseurs mobilisables et fait monter le CPM.",
  },
  {
    q: "Y a-t-il un budget minimum ?",
    a: `Le budget de départ est de ${int(budgetMin)} €. En dessous, le volume de clips produits est trop faible pour que les algorithmes aient de quoi arbitrer, et la campagne perd l'effet de test en parallèle qui fait la valeur du clipping.`,
  },
  {
    q: "Le clipping est-il moins cher que la publicité payante ?",
    a: `Oui, d'un ordre de grandeur. Le CPM d'une campagne publicitaire classique tourne autour de ${eur(paidCpm)} €, contre ${eur(cpmMin)} € à ${eur(cpmMax)} € en clipping — soit jusqu'à ${cheaper} fois moins cher à volume de vues égal. La contrepartie est que le clipping ne permet pas le ciblage fin d'une régie publicitaire.`,
  },
  {
    q: "Que se passe-t-il si la campagne dépasse le budget ?",
    a: "Elle ne le dépasse pas. Le budget est plafonné dès le lancement : une fois le volume de vues correspondant atteint, la campagne s'arrête. Il n'y a ni abonnement, ni facturation complémentaire.",
  },
  {
    q: "Paye-t-on les vues qui n'ont pas été produites ?",
    a: "Non. Vous ne réglez que les vues réellement générées et validées après contrôle. Les vues issues de comptes écartés en cours de campagne ne sont pas facturées.",
  },
];

const TITLE = "Prix du clipping en France : CPM, budget et exemples de campagnes";

export const metadata: Metadata = {
  title: TITLE,
  description: `Combien coûte une campagne de clipping ? CPM de ${eur(cpmMin)} € à ${eur(cpmMax)} € pour 1 000 vues, budget à partir de ${int(budgetMin)} €. Grille de prix, exemples chiffrés et comparaison avec la publicité payante.`,
  alternates: { canonical: "/prix-clipping" },
  openGraph: {
    type: "article",
    title: TITLE,
    description: `CPM, budget minimum et exemples chiffrés d'une campagne de clipping en France.`,
    url: `https://${site.domain}/prix-clipping`,
  },
};

const PATH = "/prix-clipping";

/*  Dates propres à cette page, pas celles des mentions légales : une page de
 *  contenu et un document juridique ne se mettent pas à jour au même rythme.
 *  À réviser dès que les chiffres bougent — `dateModified` est ce que Google
 *  et les moteurs de réponse regardent avant de reprendre un prix.          */
const PUBLISHED = "2026-08-30";
const UPDATED = "2026-08-30";

const jsonLd = graph(
  webPage({
    path: PATH,
    name: TITLE,
    description: metadata.description as string,
    modified: UPDATED,
  }),
  article({
    path: PATH,
    headline: TITLE,
    description: metadata.description as string,
    published: PUBLISHED,
    modified: UPDATED,
  }),
  faqPage(faq, PATH),
  breadcrumbs([
    { name: "Accueil", path: "/" },
    { name: "Prix du clipping", path: PATH },
  ]),
);

export default function PrixClipping() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />
      <ArticlePage
        title={"Prix du clipping\u00A0: combien coûte une campagne en France\u00A0?"}
        lede={`Le clipping se facture au CPM — un prix fixe pour 1 000 vues générées. En France, comptez entre ${eur(cpmMin)} € et ${eur(cpmMax)} € pour 1 000 vues selon l'audience visée, sur un budget plafonné à l'avance. Cette page détaille ce qui fait varier ce prix, ce qu'un budget donné rapporte en vues, et comment le clipping se compare à la publicité payante.`}
        updated={UPDATED}
      >
        <KeyAnswer>
          <strong className="font-semibold">En résumé.</strong> Une campagne de clipping se
          facture entre <span className="nums">{eur(cpmMin)} €</span> et{" "}
          <span className="nums">{eur(cpmMax)} €</span> pour 1 000 vues, à partir de{" "}
          <span className="nums">{int(budgetMin)} €</span> de budget. À un CPM moyen de{" "}
          <span className="nums">{eur(cpmDefault)} €</span>, un budget de{" "}
          <span className="nums">5 000 €</span> représente environ{" "}
          <span className="nums">{approx(views(5000, cpmDefault))} vues</span>. Le budget est
          plafonné : il n&apos;est jamais dépassé, et seules les vues réellement produites sont
          facturées.
        </KeyAnswer>

        <Section heading="Comment se facture le clipping" id="modele">
          <p>
            Le clipping ne se vend ni à la vidéo, ni à l&apos;abonnement, ni à l&apos;enchère. Il se
            vend au <strong className="font-medium text-ink">CPM</strong> : un montant fixe pour
            1 000 vues générées, arrêté avant le lancement et valable pour toute la campagne.
          </p>
          <p>
            Ce modèle a une conséquence directe : le coût ne dérive pas en cours de route. Sur une
            régie publicitaire, le CPM monte quand la concurrence sur votre audience monte — vous
            découvrez le prix réel après coup. En clipping, le prix est connu d&apos;avance et le
            budget agit comme un plafond dur.
          </p>
        </Section>

        <Section heading={`Ce qui fait varier le CPM entre ${eur(cpmMin)} € et ${eur(cpmMax)} €`} id="variation">
          <p>
            Un seul facteur explique l&apos;essentiel de l&apos;écart :{" "}
            <strong className="font-medium text-ink">la difficulté à toucher l&apos;audience
            demandée</strong>. Plus le ciblage est restreint, moins il y a de comptes diffuseurs
            mobilisables, et plus le CPM monte.
          </p>
          <ul className="ml-5 list-disc space-y-2 marker:text-mist-2">
            <li>
              <strong className="font-medium text-ink">Sans contrainte de ciblage</strong> — audience
              mondiale, tous genres, tous âges : bas de fourchette, autour de{" "}
              <span className="nums">{eur(cpmMin)} €</span>.
            </li>
            <li>
              <strong className="font-medium text-ink">Ciblage géographique</strong> — un pays
              précis réduit mécaniquement l&apos;inventaire disponible.
            </li>
            <li>
              <strong className="font-medium text-ink">Ciblage démographique</strong> — restreindre
              le genre ou la tranche d&apos;âge cumule ses effets avec le pays.
            </li>
          </ul>
          <p>
            Une campagne qui cumule les trois contraintes se rapproche du haut de fourchette
            (<span className="nums">{eur(cpmMax)} €</span>). C&apos;est le prix de la précision :
            à budget égal, un ciblage serré achète moins de vues, mais des vues plus pertinentes.
          </p>
        </Section>

        <Section heading="Ce qu'un budget rapporte en vues" id="exemples">
          <p>
            Le calcul est direct : <span className="nums">vues = budget ÷ CPM × 1 000</span>. Voici
            ce que donnent les budgets les plus courants, au CPM moyen de{" "}
            <span className="nums">{eur(cpmDefault)} €</span> et aux deux bornes de la fourchette.
          </p>
          <DataTable
            head={["Budget", `Au CPM ${eur(cpmMin)} €`, `Au CPM ${eur(cpmDefault)} €`, `Au CPM ${eur(cpmMax)} €`]}
            rows={BUDGETS.map((b) => [
              `${int(b)} €`,
              `${approx(views(b, cpmMin))} vues`,
              `${approx(views(b, cpmDefault))} vues`,
              `${approx(views(b, cpmMax))} vues`,
            ])}
            caption={`Estimations à budget plafonné. Le budget de départ est de ${int(budgetMin)} € : en dessous, le nombre de clips produits est trop faible pour que la campagne ait un effet de test en parallèle.`}
          />
          <p>
            Ces volumes ne sont pas des garanties de performance commerciale : ce sont des vues
            achetées à un prix connu. Ce qu&apos;elles rapportent dépend de votre offre, de votre
            contenu source et de l&apos;angle des clips.
          </p>
        </Section>

        <Section heading={"Clipping ou publicité payante\u00A0: la comparaison de coût"} id="vs-publicite">
          <p>
            Le CPM d&apos;une campagne publicitaire classique se situe autour de{" "}
            <span className="nums">{eur(paidCpm)} €</span>. Face à{" "}
            <span className="nums">{eur(cpmMin)} €</span> en clipping, l&apos;écart est d&apos;un
            ordre de grandeur — jusqu&apos;à <span className="nums">{cheaper} fois</span> moins cher
            à volume de vues égal.
          </p>
          <DataTable
            head={["", "Clipping", "Publicité payante"]}
            rows={[
              ["CPM indicatif", `${eur(cpmMin)} – ${eur(cpmMax)} €`, `~ ${eur(paidCpm)} €`],
              ["Modèle", "Prix fixe", "Enchères"],
              ["Budget", "Plafonné à l'avance", "Variable selon la concurrence"],
              ["Ciblage", "Pays, genre, âge", "Fin et paramétrable"],
              ["Format", "Clips natifs, feed organique", "Encart identifié comme publicité"],
            ]}
          />
          <p>
            L&apos;arbitrage n&apos;est pas seulement financier. Une régie publicitaire cible
            beaucoup plus finement ; le clipping, lui, passe par le feed organique, où le contenu
            n&apos;est pas identifié comme une publicité. Les deux leviers se cumulent plus
            qu&apos;ils ne se remplacent.
          </p>
        </Section>

        <Section heading="Questions fréquentes sur le prix" id="faq">
          <div className="space-y-6">
            {faq.map((f) => (
              <div key={f.q}>
                <h3 className="mb-2 font-medium text-ink">{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section heading="Chiffrer votre campagne">
          <p>
            Le simulateur de la page d&apos;accueil calcule vos vues à partir de votre budget et de
            votre ciblage. Pour un chiffrage ferme, un appel de {site.calcom.duration} suffit : on
            cadre l&apos;objectif, on fixe le CPM et vous repartez avec un budget chiffré, sans
            engagement.
          </p>
          <div className="pt-2">
            <ArticleCta label="Obtenir un chiffrage" />
          </div>
        </Section>
      </ArticlePage>
    </>
  );
}
