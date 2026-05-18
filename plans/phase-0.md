# Phase 0 — Foundation & Design System

**Goal**: stand up the project skeleton, design tokens, layout primitives, and core services so every later phase has a stable base.

**Estimated time**: 1–2 days.

---

## Outcomes (definition of done)

- Next.js app deployed to Vercel under the real domain (or a staging subdomain) showing a styled "Coming soon" homepage with the Sajja logo
- Tailwind theme wired to brand tokens; fonts loading via `next/font`
- `<Header>` and `<Footer>` rendered (static content for now — no live cart/account state yet)
- Sanity Studio reachable at `/studio` with a placeholder schema
- Supabase project created, Prisma initialized with an empty migration
- Clerk, Resend, Cloudinary, Razorpay accounts created (keys in `.env.local` and Vercel env)
- `.env.example` checked in
- README updated with setup instructions

---

## Tasks

### 0.1 Project init
- [ ] `pnpm create next-app@latest` with TS, Tailwind, App Router, ESLint, `src/` directory
- [ ] Add Prettier + Tailwind plugin; configure import sort
- [ ] Set up Husky + lint-staged for pre-commit format/lint
- [ ] Configure absolute imports (`@/`)

### 0.2 Design system
- [ ] Add brand colors and spacing to `tailwind.config.ts` under `theme.extend.colors.brand`, `surface`, `ink`
- [ ] Wire fonts via `next/font` (Cormorant Garamond + Inter; load only weights used)
- [ ] Install shadcn/ui; generate `Button`, `Input`, `Sheet`, `Dialog`, `DropdownMenu`, `Badge`, `Card`
- [ ] Override shadcn primitives to use brand tokens (no leftover slate/zinc colors anywhere)
- [ ] Create a `/style-guide` route showing every color, type scale, and component variant — handy for visual QA across phases (can be removed before launch)

### 0.3 Layout primitives
- [ ] `<Container>` — max-width 1280, horizontal padding responsive
- [ ] `<Section>` — vertical rhythm wrapper
- [ ] `<Eyebrow>` — small uppercase label used above headings
- [ ] `<Divider>` — gold paisley/foil SVG divider for section breaks

### 0.4 Header & Footer
- [ ] Static `<Header>` with the structure from [PLAN.md](./PLAN.md#4-header)
- [ ] Cart/account icons present but inert (link to `#` for now)
- [ ] Sticky behavior + scroll-shrink
- [ ] Mobile hamburger drawer (Sheet) with nav links
- [ ] Static `<Footer>` with all four columns + newsletter band + bottom bar (no backend wiring yet)

### 0.5 Sanity
- [ ] `pnpm create sanity@latest` in `/studio` (or embed via `next-sanity/studio` if we want everything in one Next app — decide here)
- [ ] Define minimum schemas as stubs: `product`, `category`, `homepageHero`, `siteSettings`
- [ ] Connect web app via `@sanity/client` with read-only token
- [ ] Image pipeline through `next-sanity-image` or direct CDN URLs

> **Decision in this phase**: embedded Studio (`/studio` inside the Next app) is simpler to deploy and good enough for one editor. Choose embedded unless we have a reason not to.

### 0.6 Database
- [ ] Create Supabase project (region: closest to India — `ap-south-1` Mumbai)
- [ ] Add Prisma; configure `DATABASE_URL` + `DIRECT_URL`
- [ ] Empty initial migration so the pipeline is live
- [ ] Set up Supabase row-level security baseline (we'll add policies per phase)

### 0.7 Auth scaffold
- [ ] Create Clerk app; add publishable + secret keys to env
- [ ] Install `@clerk/nextjs`; wrap root layout in `<ClerkProvider>`
- [ ] No UI yet — but middleware in place so we can protect routes later

### 0.8 Transactional services
- [ ] Resend account + domain verification kicked off (SPF/DKIM DNS — may take a day to propagate, start now)
- [ ] Cloudinary account; configure upload preset for admin uploads (used in Phase 6)
- [ ] Razorpay test-mode keys in env (used in Phase 5)

### 0.9 Deployment
- [ ] Push to GitHub; connect Vercel
- [ ] Add all env vars to Vercel (preview + production)
- [ ] Custom domain wired (or staging subdomain if domain not bought yet)
- [ ] "Coming soon" homepage live and shareable

### 0.10 Docs
- [ ] Update `README.md`: stack, prerequisites, env setup, dev/build/lint commands
- [ ] Add `.env.example` with every key (no values)
- [ ] Add `CONTRIBUTING.md` lite — branch naming, commit style, PR template

---

## Decisions to make in this phase

1. **Embedded Sanity Studio vs. separate** — recommend embedded
2. **Cormorant Garamond vs. Fraunces** — print a sample of both on the homepage placeholder and pick
3. **Domain** — if not bought yet, do it now (sajja.in / sajjastore.com / shopsajja.com — check availability)
4. **pnpm vs. npm** — recommend pnpm for speed

---

## Out of scope for Phase 0

- Real product data (Phase 1)
- Cart functionality (Phase 2)
- Any auth UI (Phase 3)
- Anything user-facing beyond the static landing placeholder

---

## Risks / gotchas

- **Resend DNS propagation** can take up to 48h — start it on day 1
- **Razorpay KYC** required for live mode (PAN, bank account, GST optional). Test mode works immediately. Start KYC before Phase 5.
- **Supabase free tier** has connection limits. Use Prisma's connection pooling (`pgbouncer=true&connection_limit=1` on serverless).
