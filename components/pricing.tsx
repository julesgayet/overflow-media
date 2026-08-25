import { site } from "@/site.config";
import { Button, Reveal } from "./ui";

export function Pricing() {
  return (
    <section
      id="tarifs"
      className="relative overflow-hidden bg-[#5b34e6] bg-gradient-to-br from-[#6d4bf0] via-[#5b34e6] to-[#4726c9] py-20 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:28px_28px]"
      />

      <div className="container-x relative">
        <Reveal>
          <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                <span className="size-1.5 rounded-full bg-white" />
                Tarif
              </p>
              <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
                À partir de {site.pricing.from}
                <br className="hidden sm:block" /> {site.pricing.unit}.
              </h2>
              <ul className="mt-8 flex flex-col gap-2.5 text-sm text-white/85 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-2">
                {site.pricing.bullets.map((b, i) => (
                  <li key={b} className="flex items-center gap-3">
                    {i > 0 && (
                      <span aria-hidden className="hidden text-white/35 sm:inline">
                        /
                      </span>
                    )}
                    <span aria-hidden className="size-1 shrink-0 rounded-full bg-white/45 sm:hidden" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="shrink-0">
              <Button
                href="#simulateur"
                size="lg"
                arrow
                className="!bg-white !text-[#4726c9] !shadow-[0_10px_40px_-12px_rgba(0,0,0,.6)] hover:!bg-white/90"
              >
                Estimer ma campagne
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
