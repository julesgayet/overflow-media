import Link from "next/link";
import { site } from "@/site.config";
import { Footer } from "./footer";
import { Arrow } from "./icons";

/* ── Charpente commune aux pages légales ──────────────────────────────────
 *  Mentions légales, CGV et Politique de confidentialité partagent la même
 *  mise en page : lien retour, titre, date de mise à jour, sections en
 *  <h2>/<p>. Garder la même charpente évite que les trois pages divergent
 *  visuellement au fil des retouches.
 * ------------------------------------------------------------------------ */

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
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

        <div className="mt-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
          <span className="nums text-xs text-mist-2">Mis à jour le {site.legal.lastUpdated}</span>
        </div>

        <div className="mt-12 max-w-2xl space-y-10 text-sm leading-relaxed text-mist">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 text-base font-semibold text-ink">{heading}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

/** Identité de l'éditeur — reprise à l'identique partout où la LCEN ou le RGPD l'exigent. */
export function Identity() {
  const l = site.legal;
  return (
    <p>
      {l.legalName}
      <br />
      {l.legalForm}
      <br />
      SIREN : {l.siren} — SIRET : {l.siret}
      <br />
      {l.rcs}
      <br />
      {l.vatNumber}
      <br />
      Siège : {l.address}
      <br />
      Directeur de la publication : {l.director}
      <br />
      Contact :{" "}
      <a href={`mailto:${site.email}`} className="text-brand hover:underline">
        {site.email}
      </a>
    </p>
  );
}

export function Host() {
  const l = site.legal;
  return (
    <p>
      {l.host}
      <br />
      Région de déploiement : {l.hostRegion}
    </p>
  );
}
