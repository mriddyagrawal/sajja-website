# Phase 8 — Content, SEO & Marketing

**Goal**: the site has the supporting content that builds trust and drives discovery. Search engines understand the catalog. Newsletter, social, and analytics are wired.

**Estimated time**: 2–3 days.

**Depends on**: Phase 1.

---

## Outcomes (definition of done)

- All policy pages live (Shipping, Returns, Privacy, Terms, FAQ)
- About / Our Story page is genuinely good
- Contact page with form + WhatsApp button
- Newsletter signup captures emails to Resend audience
- All product / category pages have correct meta tags, OG images, structured data
- `sitemap.xml` and `robots.txt` served correctly
- GA4 + Vercel Analytics tracking
- Google Search Console verified, sitemap submitted
- Instagram feed embedded on homepage

---

## Pages

### `/our-story`

The single most-important page after the catalog itself. Handcrafted brands sell the maker, not the product. Structure:

- Hero: portrait of your mom, headline ("From [her name]'s hands to your home"), 2-line subhead
- Story sections (long-form, photos interspersed):
  - Origins — why she started
  - Craft — what techniques, what materials
  - Process — photos of work in progress
  - Values — sustainability, regional sourcing, fair pricing, whatever's true
- Closing CTA: "Shop her work"
- Quotes / press mentions (if any)

Use Sanity with portable text + image blocks so this page is editable.

### `/craftsmanship`

Deeper on the *how*. Steps with photos. Materials list. Time per piece. Bullet what's NOT mass-produced.

### `/contact`

- Form: name, email, subject, message (Resend → support email)
- WhatsApp CTA: "Faster on WhatsApp →" deep-linked to your number
- Operating hours
- Physical address (if applicable — useful for SEO local pack even without walk-ins)

### `/faq`

Group by:
- Ordering & Payment
- Shipping & Delivery
- Returns & Refunds
- Care & Maintenance
- Custom Orders
- Wholesale

10–20 questions total. Each answer short and direct.

### Legal pages
- `/privacy-policy`
- `/terms-of-service`
- `/refund-policy`
- `/shipping-policy`

Draft from a reputable template (e.g. Shopify policy generator), then have a lawyer review *before* taking real payments. India's DPDPA (2023) compliance matters here.

### `/wholesale` (or `/bulk-orders`)

Form for B2B / bulk inquiries. Captures: name, business name, GSTIN (optional), product interest, quantity, timeline, message.

---

## Blog (optional, recommended)

Sanity-powered, simple. `/blog`, `/blog/[slug]`.

Topics that drive SEO + sales:
- "5 ways to style brass diyas this Diwali"
- "Gifting guide: Karva Chauth essentials"
- "How to care for your handcrafted decor"
- "The story behind [a specific technique]"

Don't over-invest. 4–6 evergreen posts at launch, then post quarterly. Better to have nothing than a stale blog.

---

## SEO

### Per-page
- `generateMetadata` on every route (title, description, OG image)
- Title format: `{Page Title} — Sajja | Glitter of Occasion`
- Per-product OG image auto-generated via `@vercel/og`

### Structured data (JSON-LD)
- Homepage: `Organization` + `WebSite` (with `SearchAction`)
- PDP: `Product` (name, image, description, brand, offers with price/availability)
- Categories: `ItemList` + `BreadcrumbList`
- Blog: `Article`
- FAQ: `FAQPage`

### Sitemap + robots
- `app/sitemap.ts` — dynamic; pulls all product slugs, category slugs, blog slugs from Sanity
- `app/robots.ts` — allow all except `/admin`, `/api`, `/studio`, `/account`

### Internal linking
- Related products on PDP
- Category cross-links in footer / homepage
- Blog → product links

### Indexing
- Submit sitemap to Google Search Console after launch
- Submit to Bing Webmaster Tools too (cheap insurance)
- Monitor coverage report weekly for the first month

---

## Newsletter

- Resend has audiences — use them. No need for Mailchimp/Klaviyo yet.
- Footer + homepage band signup form → adds to Resend audience
- Welcome email auto-fires with a 10% off coupon (code created in Phase 6, single-use per email)
- Plan to send 1–2 emails a month:
  - New collection / new product launches
  - Festival campaigns
  - Restock alerts

If volume grows past Resend's audience features (~10k contacts), migrate to Klaviyo.

---

## Analytics

### GA4
- Standard pageview, scroll, outbound click tracking via Google Tag Manager (or `next/third-parties` GA component for simplicity — recommended)
- Custom events:
  - `view_item`, `view_item_list`, `select_item`
  - `add_to_cart`, `remove_from_cart`, `view_cart`
  - `begin_checkout`, `add_shipping_info`, `add_payment_info`
  - `purchase` (with order ID, value, items)
- Set up GA4 e-commerce reports

### Vercel Analytics
- Free with hosting; enable
- Web Vitals tracked automatically

### Microsoft Clarity (optional, free)
- Session recordings + heatmaps
- Genuinely useful in the first month to see how real users navigate

---

## Social

### Instagram
- Embed feed on homepage. Use **EmbedSocial** or **Curator.io** free tiers, or `instagram-feed` widget. Keep latency low — don't block the page.
- Cross-link products → Instagram posts where shown

### Pinterest
- Add `rel="me"` on home for ownership
- Pinterest Save button on PDP images (lightweight)
- Rich Pins via Open Graph

### WhatsApp Business
- "Chat on WhatsApp" floating button (bottom-right, mobile only or both)
- Use **wa.me/<number>?text=Hi%20Sajja...** deep link
- Eventually graduate to WhatsApp Business API for catalog / order flow (Phase 10)

---

## Trust signals

Sprinkle these where they fit:
- "Handcrafted in India" badge near price on PDP
- "Ships within 3–5 days" near CTA
- "Secure payment" / "Easy returns" strip on PDP and checkout
- Customer photos / testimonials on homepage strip (once we have some — even 3 is fine to start)

---

## Out of scope for Phase 8

- Influencer / affiliate program (Phase 10)
- SEO-targeted programmatic pages (gifting hub for each occasion etc.) — useful eventually
- Advanced marketing automation (lifecycle emails beyond welcome) — Phase 10

---

## Risks / gotchas

- **Legal pages** — don't ship without lawyer review (especially Privacy Policy under DPDPA). Real but boring.
- **Image overhead** on About / Story — these pages tempt huge hero images. Stay disciplined with Cloudinary transforms.
- **GA4 setup** — easy to over-instrument. Stick to the standard e-commerce events; resist custom dimensions until you have a question to answer.
