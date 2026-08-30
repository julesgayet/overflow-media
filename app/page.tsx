import type { Metadata } from "next";
import { site } from "@/site.config";
import { listSectionMedia } from "@/lib/media";
import { breadcrumbs, faqPage, graph, jsonLdScript } from "@/lib/seo";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { ProofArc } from "@/components/proof-arc";
import { FeedMath } from "@/components/feed-math";
import { OrganicMath } from "@/components/organic-math";
import { Audiences } from "@/components/audiences";
import { How } from "@/components/how";
import { Simulator } from "@/components/simulator";
import { Pricing } from "@/components/pricing";
import { Campaigns } from "@/components/campaigns";
import { Verification } from "@/components/verification";
import { Testimonials } from "@/components/testimonials";
import { Faq } from "@/components/faq";
import { Cta } from "@/components/cta";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/*  Le @graph de la page d'accueil : socle d'entités (`lib/seo.ts`) + la FAQ,
 *  qui est le seul bloc éligible à un rich result ici, + le fil d'Ariane.    */
const jsonLd = graph(
  faqPage(site.faq),
  breadcrumbs([{ name: "Accueil", path: "/" }]),
);

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(jsonLd)}
      />
      <Nav />
      {/*  L'ordre des sections est la seule chose que ce fichier décide.
          Il doit rester aligné sur l'ordre des liens de `nav.tsx` et de la
          colonne « Agence » du footer, sinon la navigation contredit la page. */}
      <main>
        <Hero />
        <OrganicMath />
        <Simulator />
        <Pricing />
        <FeedMath
          clips={listSectionMedia("mecanique")}
          sources={listSectionMedia("sources", false)}
        />
        <Audiences />
        <How clips={listSectionMedia("methode")} />
        <Campaigns />
        <Verification />
        <ProofArc clips={listSectionMedia("preuves")} />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
