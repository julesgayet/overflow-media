import Link from "next/link";
import { formatDate } from "@/lib/format";
import { Nav } from "./nav";
import { Footer } from "./footer";

/* ── Charpente commune aux pages de contenu (SEO / GEO) ───────────────────
 *  Même rôle que `legal.tsx` pour les pages légales : une seule mise en page
 *  pour toutes les pages éditoriales à venir (`/prix-clipping`,
 *  `/agence-de-clipping`, …), pour qu'elles ne divergent pas au fil des
 *  retouches.
 *
 *  La colonne est volontairement étroite (`max-w-2xl`) : ces pages se lisent,
 *  elles ne se scannent pas comme la home.
 * ------------------------------------------------------------------------ */

export function ArticlePage({
  title,
  lede,
  updated,
  children,
}: {
  title: string;
  lede: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="container-x pb-24 pt-32 md:pb-32 md:pt-40">
        <article className="mx-auto max-w-2xl">
          <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.03em] md:text-5xl">
            {title}
          </h1>
          {/*  Le chapô est la portion la plus souvent extraite telle quelle
              par un moteur de réponse : il doit se suffire à lui-même.    */}
          <p className="mt-6 text-pretty text-lg leading-relaxed text-ink">{lede}</p>
          {/*  <time dateTime> : la date lisible par la machine, à côté de la
              date lisible par l'humain. C'est le signal de fraîcheur.    */}
          <p className="nums mt-4 text-xs text-mist-2">
            Mis à jour le <time dateTime={updated}>{formatDate(updated)}</time>
          </p>

          <div className="mt-14 space-y-12 text-[15px] leading-relaxed text-mist">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

export function Section({
  heading,
  id,
  children,
}: {
  heading: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="mb-4 text-xl font-semibold tracking-tight text-ink">{heading}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

/*  Une réponse courte et autoportante, mise en évidence. C'est le bloc qu'un
 *  LLM cite : il nomme l'entité, donne le chiffre, et reste juste si on
 *  l'extrait seul de la page.                                               */
export function KeyAnswer({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-brand/30 bg-surface-2 p-6 text-[15px] leading-relaxed text-ink">
      {children}
    </div>
  );
}

export function DataTable({
  head,
  rows,
  caption,
}: {
  head: string[];
  rows: string[][];
  caption?: string;
}) {
  return (
    <figure className="my-2">
      <div className="overflow-x-auto rounded-2xl border border-line">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-surface-2">
              {head.map((h) => (
                <th key={h} className="px-4 py-3 font-medium text-ink">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]} className="border-b border-line last:border-0">
                {r.map((c, i) => (
                  <td key={i} className={`px-4 py-3 ${i === 0 ? "text-ink" : "nums text-mist"}`}>
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && <figcaption className="mt-3 text-xs text-mist-2">{caption}</figcaption>}
    </figure>
  );
}

export function ArticleCta({ label, href = "/reserver" }: { label: string; href?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-full bg-brand px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
    >
      {label}
    </Link>
  );
}
