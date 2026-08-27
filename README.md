# Omniflux — landing page

Site vitrine d'agence de clipping, en français, prêt à déployer sur Vercel.
Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · framer-motion · TypeScript · 100 % statique.

---

## 1. Lancer en local

```bash
npm install
npm run dev
```

→ http://localhost:3000

---

## 2. ⚠️ À faire AVANT de mettre en ligne

Tout le contenu éditable est dans un seul fichier : **`site.config.ts`**.

| À remplacer | Où |
|---|---|
| Nom de l'agence (`Omniflux`) | `site.name`, `site.legalName` |
| Domaine et e-mail | `site.domain`, `site.email` |
| **Liens Whop** (`https://whop.com/ton-whop`) | `site.links.whopClippers`, `site.links.whopBrands` |
| Discord, TikTok, Instagram, X, YouTube | `site.links.*` |
| **Chiffres du bandeau** (120M+, 850+, 180K€…) | `site.stats` |
| **Campagnes affichées** | `site.campaigns` |
| **Témoignages** | `site.testimonials` |
| **Vignettes du mur de preuves** | `site.proofs` |
| SIRET, adresse, directeur de publication | `site.legal` |

> Les chiffres, campagnes et témoignages livrés sont des **exemples de démonstration**.
> Publier de faux résultats ou de faux avis constitue une pratique commerciale trompeuse
> (art. L121-2 du Code de la consommation). Remplace-les par tes vraies données, ou
> supprime les sections concernées tant que tu n'as pas de chiffres à montrer.

Pour retirer une section : commente son composant dans `app/page.tsx`.

---

## 3. Déployer sur Vercel

### Option A — via GitHub (recommandé, redéploie à chaque push)

```bash
git remote add origin git@github.com:TON-COMPTE/omniflux.git
git push -u origin main
```

Puis sur [vercel.com/new](https://vercel.com/new) : *Import Git Repository* → sélectionne le repo.
Vercel détecte Next.js seul, aucune configuration à saisir. Clique **Deploy**.

### Option B — en ligne de commande

```bash
npx vercel --prod
```

Suis les questions (login, nom du projet), le reste est auto-détecté.

### Domaine personnalisé

Dans Vercel : *Project → Settings → Domains → Add*, saisis ton domaine, puis chez ton
registrar (OVH, Namecheap…) ajoute l'enregistrement `A` ou `CNAME` affiché par Vercel.
Pense à mettre à jour `site.domain` pour que le SEO et l'image de partage pointent au bon endroit.

---

## 4. Structure

```
site.config.ts          ← tout le contenu du site
app/
  layout.tsx            métadonnées, polices, SEO
  page.tsx              assemblage des sections
  globals.css           palette, animations, utilitaires Tailwind
  opengraph-image.tsx   image de partage générée automatiquement
  icon.svg              favicon
  robots.ts / sitemap.ts
  mentions-legales/     page légale
components/
  nav · hero · stats · offer · method · campaigns
  clippers · testimonials · faq · cta · footer
  ui.tsx                boutons, titres, animation d'apparition
  icons.tsx             icônes SVG (aucune dépendance externe)
```

Une seule dépendance hors Next / React / Tailwind : **framer-motion**, qui pilote le mur
de preuves (`components/proof-arc.tsx`). Tout le reste tient en CSS et en observateurs
natifs.

---

## 5. Accessibilité & SEO

- Données structurées `ProfessionalService` + `FAQPage` (rich results Google)
- `robots.txt` et `sitemap.xml` générés
- Image Open Graph 1200×630 générée à la volée
- Animations désactivées si `prefers-reduced-motion`
- FAQ en `<details>` natif : lisible sans JavaScript
