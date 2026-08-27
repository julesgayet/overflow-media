import { site } from "@/site.config";
import { listSectionMedia } from "@/lib/media";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { ProofArc } from "@/components/proof-arc";
import { FeedMath } from "@/components/feed-math";
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: `https://${site.domain}`,
  email: site.email,
  areaServed: "FR",
  serviceType: "Agence de clipping / marketing d'influence",
  mainEntity: {
    "@type": "FAQPage",
    mainEntity: site.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      {/*  L'ordre des sections est la seule chose que ce fichier décide.
          Il doit rester aligné sur l'ordre des liens de `nav.tsx` et de la
          colonne « Agence » du footer, sinon la navigation contredit la page. */}
      <main>
        <Hero />
        <Simulator />
        <Pricing />
        <FeedMath clips={listSectionMedia("mecanique")} />
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
