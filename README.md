# Sajja — Glitter of occasion

E-commerce website for Sajja, a handcrafted Indian décor and gifting brand.

> Phase 0 (foundation) is complete. See [plans/PLAN.md](./plans/PLAN.md) for the full roadmap.

---

## Quick start

```bash
# Install dependencies
pnpm install

# Start the dev server
pnpm dev

# Open http://localhost:3000
```

That's it. The dev server runs at **http://localhost:3000**. The internal style guide lives at **http://localhost:3000/style-guide**.

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

---

## Tech stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** with brand tokens via `@theme` in [src/app/globals.css](./src/app/globals.css)
- **shadcn-style** primitives over **Radix UI** (Sheet, Slot, etc.)
- **Lucide** icons
- **Cormorant Garamond** (display) + **Inter** (body) + **Tangerine** (script accent) via `next/font`

External services (Sanity, Supabase, Clerk, Razorpay, Resend, Cloudinary, Shiprocket) are wired in later phases — see the `.env.example` for what comes when.

---

## File layout

```
sajja-website/
├── plans/                  # Phase-by-phase build plans
├── public/
│   ├── sajja-logo.svg      # Your logo (transparent SVG)
│   ├── sajja-logo.png      # PNG fallback
│   └── favicon.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout, fonts, metadata
│   │   ├── page.tsx        # Homepage (Hero + ValueProps + Categories + Story)
│   │   ├── style-guide/    # Internal design system reference
│   │   └── globals.css     # Tailwind v4 + brand design tokens
│   ├── components/
│   │   ├── layout/         # Header, Footer, Container, Section, Newsletter
│   │   ├── home/           # Hero, ValueProps, CategoryPreview, BrandStory
│   │   └── ui/             # Button, Logo, Sheet
│   └── lib/
│       ├── nav.ts          # Nav data, site config
│       └── utils.ts        # cn() helper
├── .env.example            # All future env vars, documented
├── eslint.config.mjs
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

---

## What's on the screen right now

Open http://localhost:3000 and you'll see:

1. **Announcement bar** (top, dismissible) — "Free shipping over ₹2000…"
2. **Header** — search left, logo center, account/wishlist/cart right, category nav below. Sticky on scroll (shrinks). Mobile: hamburger drawer.
3. **Hero** — brand headline with rose gradient, "The Diwali Edit" placeholder card, decorative mandala flourishes.
4. **Value props** — Made by hand / Considered materials / Delivered with care.
5. **Categories** — four shoppable category cards (links will work once Phase 1 wires products).
6. **Brand story strip** — short "Meet the maker" teaser.
7. **Newsletter band** — overlapping the footer, with a success state.
8. **Footer** — four columns, social links, legal links, payment-method chips.

And at http://localhost:3000/style-guide you'll find every brand color, type scale, button variant, divider, and form control — used during development to catch visual regressions.

---

## Design tokens

All colors, fonts, radii, and shadows are defined in [src/app/globals.css](./src/app/globals.css) under `@theme`. Tailwind v4 turns each variable into a utility class automatically — e.g. `--color-brand-rose` becomes `bg-brand-rose`, `text-brand-rose`, `border-brand-rose`.

To tweak the palette, edit those CSS variables. Nothing else needs to change.

---

## Notes & gotchas

### 1. Your logo SVG is 4.9MB

The `Sajja logo.svg` you provided is a **traced raster** — tens of thousands of bezier paths plus embedded mask filters. That's far too heavy for a web logo (we want under 50KB, ideally under 10KB).

The site renders it via `next/image` with `unoptimized`. It works, but every page load ships ~5MB extra.

**Recommended fix** before Phase 1:

- Open the source file in Illustrator / Affinity / Figma and re-export as a clean SVG, OR
- Have a designer rebuild the wordmark + flourishes as native vector paths
- Target: under 30KB

If you don't have a clean version, I can build a hand-crafted SVG that closely matches the original. Just ask.

### 2. Tailwind v4 specifics

Tailwind v4 is **CSS-first**. There's no `tailwind.config.ts` — everything is in [src/app/globals.css](./src/app/globals.css). New colors / tokens go in `@theme { }` in CSS, not in a JS config. The PostCSS plugin is `@tailwindcss/postcss`, not `tailwindcss`.

### 3. No external services yet

Sanity, Supabase, Clerk, Razorpay, Resend, Cloudinary, and Shiprocket are **not wired** in Phase 0. The `.env.example` documents what each later phase needs. When we get to Phase 1, create a Sanity project and we'll plug it in.

### 4. Mobile responsiveness

Mobile-first. Try at < 1024px width — desktop nav row hides, hamburger appears, hero stacks. Try the announcement-bar dismiss (top right ×) and the mobile menu (top left ☰).

### 5. Accessibility baseline

- Skip-to-content link (Tab on page load)
- Focus rings on every interactive element
- `aria-label` on icon-only buttons
- Reduced-motion preference respected

---

## What's next

Detailed plans for every phase live in [plans/](./plans/). The next file to open is [plans/phase-1.md](./plans/phase-1.md) — Product Catalog. Phase 1 needs:

1. A Sanity account + project
2. 10+ real products with photography
3. Category structure decided

Once you have a Sanity project ID, I'll wire it up.

---

## Troubleshooting

**Port 3000 in use** — kill it with `lsof -ti:3000 | xargs kill -9`, or set `PORT=3001 pnpm dev`.

**Fonts look unstyled on first load** — `next/font` swaps the font face. The flash is brief; production builds preload.

**Logo missing** — make sure `public/sajja-logo.svg` exists. If you rename the file, update [src/components/ui/Logo.tsx](./src/components/ui/Logo.tsx) accordingly.
