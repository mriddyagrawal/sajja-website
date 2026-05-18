# Sajja — Glitter of occasion

E-commerce website for Sajja, a handcrafted Indian décor and gifting brand.

> Phases 0 (foundation) and 1 (catalog) are complete. See [plans/PLAN.md](./plans/PLAN.md) for the full roadmap.

---

## Quick start

```bash
pnpm install
pnpm dev          # → http://localhost:3000
```

That's it. The dev server runs at **http://localhost:3000**.

### Available scripts

| Script | Purpose |
|---|---|
| `pnpm dev` | Start the Next.js dev server with hot reload |
| `pnpm build` | Production build |
| `pnpm start` | Run the production build |
| `pnpm typecheck` | TypeScript check (no emit) |
| `pnpm lint` | ESLint |
| `pnpm format` | Prettier write |
| `pnpm format:check` | Prettier check |
| `pnpm studio:dev` | Run Sanity Studio locally → http://localhost:3333 |
| `pnpm studio:deploy` | Publish Studio to https://<projectId>.sanity.studio |

### Useful routes

| URL | What it is |
|---|---|
| `/` | Homepage — hero, value props, categories, new arrivals, bestsellers, brand story |
| `/shop` | Full catalog with sort and category chips |
| `/shop/decor`, `/shop/pooja-festive`, `/shop/gifting` | Category pages |
| `/shop/new-arrivals`, `/shop/bestsellers` | Virtual collections (driven by product flags) |
| `/products/[slug]` | Product detail page with image gallery, JSON-LD, related products |
| `/style-guide` | Internal: every brand color, type scale, component variant |

---

## Tech stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** with brand tokens via `@theme` in [src/app/globals.css](./src/app/globals.css)
- **Radix UI** primitives wrapped shadcn-style (Sheet, Slot, etc.)
- **Lucide** icons
- **Sanity** for headless content (products, categories, hero, settings) — runs as a standalone Studio
- **Cormorant Garamond** (display) + **Inter** (body) + **Tangerine** (script accent) via `next/font`

External services for later phases (Supabase, Clerk, Razorpay, Resend, Cloudinary, Shiprocket) are documented in `.env.example`.

---

## File layout

```
sajja-website/
├── plans/                       # Phase-by-phase build plans
├── public/
│   ├── sajja-logo.png           # Logo (152K, optimized to ~24K via next/image)
│   ├── favicon-32.png
│   └── apple-touch-icon.png
├── sanity.config.ts             # Standalone Sanity Studio config
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout, fonts, metadata
│   │   ├── page.tsx             # Homepage (Hero + ValueProps + Categories + rails + Story)
│   │   ├── globals.css          # Tailwind v4 + brand design tokens
│   │   ├── shop/page.tsx        # Catalog
│   │   ├── shop/[category]/     # Category pages (incl. virtual: new-arrivals, bestsellers)
│   │   ├── products/[slug]/     # Product detail (SSG)
│   │   └── style-guide/         # Internal design reference
│   ├── components/
│   │   ├── layout/              # Header, Footer, Container, Section, Newsletter, Eyebrow, Divider
│   │   ├── home/                # Hero, ValueProps, CategoryPreview, BrandStory
│   │   ├── product/             # ProductCard, Grid, Rail, PriceTag, ImageGallery, etc.
│   │   ├── shop/                # ShopToolbar (sort + category chips)
│   │   └── ui/                  # Button, Logo, Sheet
│   ├── lib/
│   │   ├── nav.ts               # Nav data, site config
│   │   ├── products.ts          # Client-safe sort helpers
│   │   └── utils.ts             # cn() helper
│   └── sanity/
│       ├── client.ts            # Sanity client (null when not configured)
│       ├── data.ts              # Unified data layer (Sanity OR mock fallback)
│       ├── env.ts               # Env validation, isConfigured flag
│       ├── image.ts             # urlFor / urlForSized helpers
│       ├── mock.ts              # 10 sample products for dev without Sanity
│       ├── queries.ts           # GROQ queries
│       ├── types.ts             # Product/Category/etc types + formatPrice
│       └── schemas/             # Studio schemas (product, category, hero, settings)
├── .env.example                 # All future env vars, documented
├── eslint.config.mjs
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

---

## Content & catalog (Phase 1)

### Now: 10 mock products

The site is fully shoppable with built-in mock data covering Décor, Pooja & Festive, and Gifting. Browse `/shop`, click into any product, and you'll see real PDPs with image galleries, prices, related products, and JSON-LD for SEO.

### Next: real content via Sanity

Sanity is the CMS your mom will use to add products. When you're ready to switch from mock to real data:

1. **Create a Sanity project** at [sanity.io/manage](https://sanity.io/manage) (free). Name it `sajja`. Use the `production` dataset.

2. **Add the project ID to `.env.local`:**
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=<your-project-id>
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

3. **Deploy the Studio** so your mom can access it at `https://sajja.sanity.studio`:
   ```bash
   pnpm studio:deploy
   ```
   First time, this asks for a Studio hostname — `sajja` works.

4. **Add CORS origins** in [sanity.io/manage](https://sanity.io/manage) → API → CORS:
   - `http://localhost:3000` (with credentials)
   - Your production URL when you deploy

5. **Add products in the Studio** — title, price (in paise: ₹1490 = 149000), images, category, etc.

6. **Restart `pnpm dev`** — the site now reads from Sanity. Mock data is the fallback.

To develop schemas locally without deploying: `pnpm studio:dev` → http://localhost:3333.

> Why not embed Studio in the Next app? Sanity 5's Studio bundle uses React 19's experimental `useEffectEvent` API, which the stable React 19 build doesn't export — breaks production builds. The standalone Studio sidesteps this entirely and is what most teams use anyway (mom gets a real URL to bookmark).

---

## Design tokens

All colors, fonts, radii, and shadows are in [src/app/globals.css](./src/app/globals.css) under `@theme`. Tailwind v4 turns each variable into a utility class automatically — e.g. `--color-brand-rose` becomes `bg-brand-rose`, `text-brand-rose`, `border-brand-rose`.

Tweak the palette by editing those CSS variables. No JS config to touch.

---

## Notes

### Logo

The current logo is a 152K PNG (~24K optimized per request via `next/image`). The original SVG you provided was a 4.9MB raster trace — gitignored, kept locally only. If you ever get a clean vector export, drop it into `public/sajja-logo.svg` and update [Logo.tsx](./src/components/ui/Logo.tsx).

### Tailwind v4

CSS-first config. There's no `tailwind.config.ts` — everything is in [globals.css](./src/app/globals.css) under `@theme {}`. PostCSS plugin is `@tailwindcss/postcss`.

### Prices in paise

All prices are stored as integers in paise (₹1 = 100 paise). Use `formatPrice(paise)` from [src/sanity/types.ts](./src/sanity/types.ts) to render. Avoids float-precision bugs in totals.

### Mobile responsiveness

Mobile-first. At < 1024px the desktop nav row hides, hamburger appears, hero stacks. Product rails become horizontal scroll on mobile.

### Accessibility

- Skip-to-content link
- Focus rings on every interactive element
- `aria-label` on icon-only buttons
- Reduced-motion respected
- Image gallery has keyboard arrow nav
- Breadcrumbs use proper landmark semantics

---

## What's next

[plans/phase-2.md](./plans/phase-2.md) — Cart. Add-to-cart on PDP currently flashes a success state without storing anything; Phase 2 wires the Zustand store, cart drawer, and `/cart` page.

---

## Troubleshooting

**Port 3000 in use** — `lsof -ti:3000 | xargs kill -9`, or `PORT=3001 pnpm dev`.

**Sanity Studio won't deploy** — first time you may need to log in: `pnpm sanity login`.

**Build fails with `useEffectEvent`** — you've reintroduced an embedded Studio path. Keep Studio standalone.
