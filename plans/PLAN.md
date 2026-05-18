# Sajja — E-commerce Website Plan

> "Glitter of occasion" — handcrafted Indian decorative and festive pieces.

This is the master plan. Each phase has its own detailed file in this folder.

---

## 1. Brand direction

Everything visual flows from the Sajja logo:

- **Tagline**: *Glitter of occasion* → festive, decorative, gift-worthy
- **Audience**: Indian households shopping for festive décor, pooja, gifting; a parallel international audience interested in artisanal Indian goods (phase 10+)
- **Tone**: warm, refined, celebratory — not cluttered, not bargain-bin

### Color palette (draft tokens)

| Token | Hex | Usage |
|---|---|---|
| `brand.rose` | `#B43A6B` | Primary brand, CTAs, links |
| `brand.magenta` | `#8E2A57` | Hover, accents |
| `brand.coral` | `#E27A5F` | Secondary accents, badges |
| `brand.gold` | `#C9A24A` | Foil-style accents, dividers, highlights |
| `surface.cream` | `#FBF6EE` | Page background |
| `surface.ivory` | `#FFFFFF` | Cards |
| `ink.charcoal` | `#231C1F` | Body text |
| `ink.muted` | `#6B5C61` | Secondary text |

Fine-tune against the actual logo gradient once Phase 0 starts.

### Typography

- **Display/Headings**: Cormorant Garamond *or* Fraunces (decide in Phase 0)
- **Body**: Inter or DM Sans
- **Accent/Decorative** (sparingly, e.g. section eyebrows): a handwritten serif like Tangerine — only on hero/festive moments

### Motif system

- Subtle gold paisley/mandala dividers
- Foil-style underline flourishes on headings (echoing the swirl in the logo)
- Generous whitespace, cream background
- Product photography on warm neutral backgrounds — keep consistent

---

## 2. Landing page vs. shop-first

**Decision: hybrid, shop-first.** No separate landing page. The homepage *is* the shop, with personality on top. Mirrors the Bombay Store reference and converts better.

Homepage structure (top → bottom):
1. **Hero** — rotating banner (2–3 slides), festive campaigns
2. **Category grid** — Décor · Pooja & Festive · Gifting · New Arrivals
3. **New arrivals** rail
4. **Bestsellers** rail
5. **Brand story strip** — short, links to full About page
6. **Instagram / UGC strip**
7. **Newsletter band**
8. **Footer**

---

## 3. Tech stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| CMS / products | Sanity |
| Database | PostgreSQL via Supabase |
| ORM | Prisma |
| Auth | Clerk (email + phone OTP) |
| Payments | Razorpay + Cash on Delivery |
| Images | Cloudinary (Sanity-hosted as fallback) |
| Email | Resend |
| Shipping | Shiprocket |
| Hosting | Vercel |
| Analytics | Vercel Analytics + GA4 |

Detailed reasoning in [phase-0.md](./phase-0.md).

---

## 4. Header

**Top utility strip** (slim, dismissible): `Free shipping over ₹2000 · Ships across India · WhatsApp us`

**Main bar**:
- Left: Search icon (expands inline on click; full search on mobile)
- Center: Sajja logo (centered, mirrors Bombay Store)
- Right: Account · Wishlist · Cart (with count badge)

**Category nav row** (below main bar, desktop only):
`Shop All · Décor · Pooja & Festive · Gifting · New Arrivals · Sale · Our Story · Contact`

Mega-menu on hover for categories with sub-collections.

**Mobile**: hamburger left, logo center, cart right. Search/account in drawer.

Sticky on scroll (shrinks slightly after 80px).

---

## 5. Footer

Four-column grid + bottom bar:

1. **Brand** — logo, 2-line tagline, social icons (IG primary, then FB, Pinterest, WhatsApp)
2. **Shop** — All Products, New Arrivals, Bestsellers, Sale, Gift Cards
3. **Help** — Contact, FAQ, Shipping, Returns & Refunds, Order Tracking, Size Guide
4. **Company** — Our Story, Craftsmanship, Wholesale / Bulk Orders, Press

**Newsletter band** above footer: *"Be the first to know — 10% off your first order"*

**Bottom bar**: `© 2026 Sajja · Privacy · Terms · Payment logos · Made with care in India`

---

## 6. Phases (overview)

| # | Phase | Est. days | File |
|---|---|---|---|
| 0 | Foundation & design system | 1–2 | [phase-0.md](./phase-0.md) |
| 1 | Product catalog | 3–5 | [phase-1.md](./phase-1.md) |
| 2 | Cart | 2–3 | [phase-2.md](./phase-2.md) |
| 3 | User accounts | 2–3 | [phase-3.md](./phase-3.md) |
| 4 | Checkout & orders | 3–4 | [phase-4.md](./phase-4.md) |
| 5 | Payments | 2–3 | [phase-5.md](./phase-5.md) |
| 6 | Admin panel | 3–4 | [phase-6.md](./phase-6.md) |
| 7 | Shipping & logistics | 2 | [phase-7.md](./phase-7.md) |
| 8 | Content, SEO & marketing | 2–3 | [phase-8.md](./phase-8.md) |
| 9 | Polish & launch | 2–3 | [phase-9.md](./phase-9.md) |
| 10 | Post-launch / future | ongoing | [phase-10.md](./phase-10.md) |

Total to launch (Phases 0–9): **~22–32 focused days** of work.

---

## 7. Non-negotiables across all phases

- **Mobile-first** — most Indian e-commerce traffic is mobile
- **Lighthouse 90+** on launch (perf, a11y, SEO, best practices)
- **Accessibility** — keyboard nav, ARIA labels, AA contrast on all brand colors against backgrounds
- **No fake urgency / dark patterns** — clean, honest UX
- **Owner-editable content** — your mom should be able to add a product or change hero copy without touching code (Sanity handles this)
- **Backups** — daily DB backup, weekly off-site copy
- **Type-safety end-to-end** — TypeScript everywhere, Zod for runtime validation at API boundaries

---

## 8. Repo layout (target after Phase 0)

```
sajja-website/
├── apps/
│   └── web/                # Next.js app
│       ├── app/            # App Router
│       ├── components/
│       ├── lib/
│       ├── styles/
│       └── public/
├── packages/
│   └── ui/                 # Optional — shared components if we ever go multi-app
├── studio/                 # Sanity Studio
├── prisma/                 # Schema + migrations
├── plans/                  # This folder
└── README.md
```

We'll start single-app (no monorepo) and only split into `apps/` + `packages/` if we add a second surface (admin app, etc.). See [phase-0.md](./phase-0.md).
