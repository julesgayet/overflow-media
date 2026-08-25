"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";
import { site } from "@/site.config";
import { Arrow } from "./icons";

const NAMESPACE = "campagne";
const CAL_LINK = `${site.calcom.username}/${site.calcom.event}`;

type State = "loading" | "ready" | "failed";

export function Booking() {
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    let cancelled = false;

    // Filet de sécurité : si le script externe ne répond pas, on bascule
    // sur le lien e-mail plutôt que de laisser un cadre vide.
    const timeout = window.setTimeout(() => {
      if (!cancelled) setState((s) => (s === "loading" ? "failed" : s));
    }, 12000);

    (async () => {
      try {
        const cal = await getCalApi({ namespace: NAMESPACE });
        if (cancelled) return;

        cal("ui", {
          theme: "dark",
          layout: "month_view",
          hideEventTypeDetails: false,
          cssVarsPerTheme: {
            light: { "cal-brand": "#7c5cff" },
            dark: {
              "cal-brand": "#a78bfa",
              "cal-bg": "#0d0d17",
              "cal-bg-emphasis": "#1e1e30",
            },
          },
        });

        cal("on", {
          action: "linkReady",
          callback: () => {
            if (!cancelled) setState("ready");
          },
        });
        cal("on", {
          action: "linkFailed",
          callback: () => {
            if (!cancelled) setState("failed");
          },
        });
      } catch {
        if (!cancelled) setState("failed");
      }
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, []);

  if (state === "failed") {
    return (
      <div className="rounded-2xl border border-line bg-surface px-7 py-14 text-center">
        <p className="text-lg font-medium text-white">
          Le calendrier est momentanément indisponible
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-mist">
          Écris-nous directement, on te propose un créneau dans la journée.
        </p>
        <a
          href={`mailto:${site.email}?subject=Lancer%20une%20campagne%20de%20clipping`}
          className="group mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-ink transition-colors hover:bg-white/90"
        >
          {site.email}
          <Arrow className="size-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    );
  }

  return (
    <div className="relative min-h-[34rem] w-full overflow-hidden rounded-2xl border border-line bg-surface">
      {state === "loading" && (
        <div className="absolute inset-0 z-10 grid place-items-center bg-surface" aria-hidden>
          <div className="flex flex-col items-center gap-3">
            <span className="size-6 animate-spin rounded-full border-2 border-line-2 border-t-brand-2" />
            <span className="text-xs text-mist-2">Chargement du calendrier…</span>
          </div>
        </div>
      )}
      <Cal
        namespace={NAMESPACE}
        calLink={CAL_LINK}
        style={{ width: "100%" }}
        config={{
          layout: "month_view",
          theme: "dark",
          // Sans ça, le canevas du document embarqué reste blanc sous le calendrier
          "ui.color-scheme": "dark",
        }}
      />
    </div>
  );
}
