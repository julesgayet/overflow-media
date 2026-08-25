type P = React.SVGProps<SVGSVGElement>;

const base = (p: P) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...p,
});

export const Scissors = (p: P) => (
  <svg {...base(p)}>
    <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
    <path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12" />
  </svg>
);
export const Users = (p: P) => (
  <svg {...base(p)}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
export const Wallet = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 8.5A2.5 2.5 0 0 1 5.5 6H18a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z" />
    <path d="M3 8.5V7a2 2 0 0 1 1.4-1.91l9.4-2.95A1.4 1.4 0 0 1 15.6 3.5V6" />
    <path d="M21 11.5h-3.5a1.5 1.5 0 0 0 0 3H21" />
  </svg>
);
export const Chart = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="m7 15 3.5-4 3 2.5L20 7" />
  </svg>
);
export const Shield = (p: P) => (
  <svg {...base(p)}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
export const Bolt = (p: P) => (
  <svg {...base(p)}>
    <path d="M13 2 4.09 12.97a1 1 0 0 0 .77 1.63h5.14l-1 7.4 8.9-10.97a1 1 0 0 0-.77-1.63h-5.14z" />
  </svg>
);
export const Target = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" />
  </svg>
);
export const Play = (p: P) => (
  <svg {...base(p)} fill="currentColor" stroke="none">
    <path d="M6 4.5v15a1 1 0 0 0 1.52.85l12.5-7.5a1 1 0 0 0 0-1.7L7.52 3.65A1 1 0 0 0 6 4.5" />
  </svg>
);
export const Arrow = (p: P) => (
  <svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const Check = (p: P) => (
  <svg {...base(p)} strokeWidth={2}><path d="m5 12.5 4.5 4.5L19 7" /></svg>
);
export const Plus = (p: P) => (
  <svg {...base(p)} strokeWidth={2}><path d="M12 5v14M5 12h14" /></svg>
);
export const Sparkle = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3 9 9M15 15l2.7 2.7M17.7 6.3 15 9M9 15l-2.7 2.7" />
  </svg>
);
export const Clock = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5.2l3.2 2" /></svg>
);
export const Layers = (p: P) => (
  <svg {...base(p)}>
    <path d="m12 2 9 5-9 5-9-5z" /><path d="m3 12 9 5 9-5" /><path d="m3 17 9 5 9-5" />
  </svg>
);

/* ── Réseaux ───────────────────────────────────────────────────────────── */
export const TikTok = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-1.79-2.46V9.79a5.68 5.68 0 1 0 4.88 5.62V9.01a7.35 7.35 0 0 0 4.29 1.38V7.3a4.29 4.29 0 0 1-3.23-1.48" />
  </svg>
);
export const Instagram = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="3.8" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);
export const YouTube = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M23 12s0-3.6-.46-5.33a2.78 2.78 0 0 0-1.95-1.96C18.86 4.25 12 4.25 12 4.25s-6.86 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96C1 8.4 1 12 1 12s0 3.6.46 5.33c.26.95 1 1.7 1.95 1.96 1.73.46 8.59.46 8.59.46s6.86 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96C23 15.6 23 12 23 12M9.75 15.27V8.73L15.5 12z" />
  </svg>
);
export const XIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M17.53 3h3.02l-6.6 7.54L21.7 21h-6.08l-4.76-6.22L5.4 21H2.38l7.05-8.06L2.3 3h6.23l4.3 5.69zm-1.06 16.15h1.67L7.6 4.74H5.8z" />
  </svg>
);
export const Discord = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M19.3 5.34A16.7 16.7 0 0 0 15.16 4c-.2.36-.43.84-.59 1.22a15.5 15.5 0 0 0-4.6 0A11 11 0 0 0 9.37 4a16.6 16.6 0 0 0-4.15 1.34C2.6 9.25 1.89 13.06 2.25 16.8a16.8 16.8 0 0 0 5.08 2.57c.41-.56.78-1.16 1.09-1.79-.6-.22-1.17-.5-1.71-.82l.42-.33a12 12 0 0 0 10.24 0l.42.33c-.54.32-1.11.6-1.71.82.31.63.68 1.23 1.09 1.79a16.7 16.7 0 0 0 5.08-2.57c.42-4.33-.72-8.1-2.95-11.46M8.85 14.52c-.99 0-1.8-.91-1.8-2.03s.79-2.04 1.8-2.04 1.82.92 1.8 2.04c0 1.12-.8 2.03-1.8 2.03m6.64 0c-.99 0-1.8-.91-1.8-2.03s.79-2.04 1.8-2.04 1.82.92 1.8 2.04c0 1.12-.79 2.03-1.8 2.03" />
  </svg>
);
