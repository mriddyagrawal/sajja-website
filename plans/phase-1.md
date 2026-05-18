# Phase 1 — Product Catalog

**Goal**: a real, browsable shop. Visitors can land on the homepage, browse categories, view products, and see real photography and copy — even though they can't yet buy anything.

**Estimated time**: 3–5 days.

**Depends on**: Phase 0.

---

## Outcomes (definition of done)

- Homepage renders all sections from [PLAN.md §2](./PLAN.md#2-landing-page-vs-shop-first) with real Sanity content
- `/shop`, `/shop/[category]`, `/products/[slug]` all working
- Sort and filter functional on `/shop`
- Search returns relevant products
- 10+ real products loaded in Sanity, with proper photography
- All pages have correct SEO meta + OG images
- Lighthouse perf ≥ 90 on key pages

---

## Data model (Sanity)

### `product`
```ts
{
  title: string                      // "Brass Diya Set of 5"
  slug: { current: string }          // "brass-diya-set-of-5"
  category: reference -> category
  subcategory?: reference -> category
  price: number                      // INR, in paise (avoid floats)
  mrp?: number                       // crossed-out original price
  shortDescription: string           // 1-2 lines for cards
  description: portableText          // rich for PDP
  images: image[]                    // first = primary
  inStock: boolean
  stockCount?: number
  sku: string
  tags: string[]                     // "festive", "diwali", "gifting"
  weightGrams?: number
  dimensions?: { l: number; w: number; h: number }   // cm
  materials?: string[]
  careInstructions?: portableText
  craftedBy?: string                 // artisan / region credit
  variants?: variant[]               // unused in Phase 1, schema ready for Phase 10
  isFeatured: boolean
  isBestseller: boolean
  isNew: boolean                     // auto-set by createdAt < 30 days
  publishedAt: datetime
  seo: { title?, description?, ogImage? }
}
```

### `category`
```ts
{
  title: string
  slug: { current: string }
  parent?: reference -> category     // for subcategories
  image: image
  description?: portableText
  order: number                      // for sort in nav
}
```

### `homepageHero`
```ts
{
  slides: [{
    headline: string
    subhead?: string
    ctaLabel: string
    ctaHref: string
    image: image
    imageMobile?: image
    textPosition: 'left' | 'right' | 'center'
  }]
}
```

### `siteSettings` (singleton)
```ts
{
  announcementBar: string
  whatsappNumber: string
  supportEmail: string
  shippingThreshold: number          // free-shipping bar
  socialLinks: { instagram, facebook, pinterest, ... }
}
```

---

## Routes / pages

### `/` — Homepage
1. `<HeroCarousel>` — pulls from `homepageHero` singleton
2. `<CategoryGrid>` — top-level categories from Sanity
3. `<ProductRail title="New Arrivals">` — filtered by `isNew`
4. `<ProductRail title="Bestsellers">` — filtered by `isBestseller`
5. `<BrandStoryStrip>` — static block, links to `/our-story`
6. `<InstagramStrip>` — phase 8 will make this dynamic; placeholder grid for now
7. `<NewsletterBand>` — captures emails (no backend yet — store in Supabase table or use Resend audience)

### `/shop` — All products
- Server-rendered grid, 24 products per page
- **Sort**: Newest / Price ↑ / Price ↓ / Popularity (popularity = order count, fallback to `isBestseller`)
- **Filter**: category checkbox group, price range slider, in-stock toggle
- Filters use URL query params (shareable links)
- Pagination via "Load more" button + `?page=` for SSR / SEO

### `/shop/[category]` — Category page
- Hero strip with category image + description
- Same grid + filters minus the category filter
- Subcategories shown as chips above the grid (if any)

### `/products/[slug]` — Product detail page
- **Image gallery**: 4–6 images, click to zoom, swipe on mobile
- **Right column**:
  - Title
  - Price block (price + MRP strikethrough + % off if applicable)
  - Short description
  - Quantity stepper
  - "Add to Cart" CTA (functional in Phase 2 — inert button + tooltip for now)
  - "Wishlist" heart (Phase 3)
  - Trust strip: "Handcrafted in India · Ships in 3–5 days · Easy returns"
- **Tabs below**: Details · Materials & Care · Shipping & Returns
- **"You may also like"** rail — same category, exclude current product
- **Breadcrumbs**: Home / Category / Product

### `/search?q=...`
- Server-side fuzzy match on title, tags, short description
- Reuses the `/shop` grid layout
- Empty state: "No results for 'X'. Try browsing…" → categories

---

## Components to build

- `<ProductCard>` — image (square), title, price (with MRP), wishlist heart, "Add to cart" on hover (desktop)
- `<ProductGrid>` — responsive 2/3/4 column
- `<ProductRail>` — horizontal scroll on mobile, grid on desktop
- `<FilterSidebar>` — sticky on desktop, bottom-sheet on mobile
- `<SortDropdown>`
- `<PriceTag>` — handles MRP + discount % consistently
- `<ImageGallery>` — main + thumbnails, keyboard nav, zoom on hover
- `<QuantityStepper>`
- `<Breadcrumbs>`

---

## Search implementation

Start simple: server route that queries Sanity with GROQ `match` on title + tags. If results feel weak by the end of Phase 1, swap in **Algolia** or **Typesense** (free tier of either is plenty).

Don't over-engineer search in Phase 1. Revisit after real product count > 50.

---

## SEO

- `generateMetadata` on every dynamic route
- Open Graph image: auto-generated via `@vercel/og` using the product's primary image + price overlay
- JSON-LD `Product` schema on PDP (price, availability, image, brand)
- `BreadcrumbList` schema on category and product pages

---

## Content tasks (parallel to dev)

This is the slow part. Start early.

- [ ] Shoot/collect product photography for at least 10 hero products (consistent background, lighting)
- [ ] Write short + long descriptions for each
- [ ] Categorize: Décor / Pooja & Festive / Gifting / (others as needed)
- [ ] Tag products with festival/occasion tags (Diwali, Karva Chauth, Raksha Bandhan, Housewarming)
- [ ] Hero slide copy (2–3 slides) + imagery
- [ ] Homepage brand story paragraph (2–3 lines)

---

## Out of scope for Phase 1

- Add to cart (Phase 2)
- Wishlist persistence (Phase 3 — heart can toggle local state for now)
- Reviews (Phase 10)
- Variants (Phase 10)

---

## Risks / gotchas

- **Image weights** — handcrafted product photography tends to be huge. Enforce Cloudinary/Sanity transforms (max 1600px, AVIF). Audit on every PR.
- **Sanity GROQ caching** — use `next: { revalidate: 60 }` or webhooks-based on-demand revalidation. Don't fetch with `no-store` for product pages.
- **Empty states everywhere** — design for "0 products in this category", "no search results", "no filters match".
