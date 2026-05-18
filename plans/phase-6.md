# Phase 6 — Admin Panel

**Goal**: your mom (and you) can run the store day-to-day without touching code. Products live in Sanity; orders/customers live in a custom admin area.

**Estimated time**: 3–4 days.

**Depends on**: Phases 1, 4, 5.

---

## Split of responsibilities

| Concern | Tool |
|---|---|
| Add / edit products | **Sanity Studio** |
| Add / edit categories, hero, site settings | **Sanity Studio** |
| View / manage orders | **Custom `/admin` in Next app** |
| View customers | **Custom `/admin`** |
| Trigger refunds | **Custom `/admin`** |
| Coupons | **Custom `/admin`** |
| Inventory adjustments | **Sanity Studio** (until we move stock to Supabase) |
| Dashboard / metrics | **Custom `/admin`** |

Two tools is fine — Sanity is genuinely great for content; rolling our own product CMS would waste a week. Orders + customers live in our DB, so they belong in our admin.

---

## Outcomes (definition of done)

- `/admin` protected route, accessible to allowlisted emails
- Dashboard with key metrics
- Orders list with filters, search, bulk actions
- Order detail page with: full info, status change, tracking, refund, notes
- Customers list + detail
- Coupons CRUD
- Mom has been onboarded to Sanity and can add a product without help

---

## Auth & access control

Phase 0 set up Clerk. Now:

- Add a `User.role` field (`CUSTOMER | ADMIN | SUPERADMIN`)
- Middleware on `/admin/*` checks `role` from Clerk's session claims (mirrored from our DB via webhook)
- Allowlist initial admins by email in env (`ADMIN_EMAILS=mom@...,you@...`), reconciled on user creation/login
- Show a "You don't have access" page (not a redirect) if a customer hits `/admin`

---

## Pages

### `/admin` — Dashboard

Cards:
- Revenue today / this week / this month
- Orders today (count + pending count)
- New customers this week
- Low-stock products (count, link to filtered list in Sanity)
- AOV (last 30 days)

Charts:
- Daily revenue (line, last 30 days)
- Top 10 products by units sold (last 30 days)
- Order status breakdown (donut)

Use a lightweight chart lib — Recharts or visx.

### `/admin/orders`

Table view:
- Columns: Order #, Date, Customer, Items, Total, Payment, Status, Actions
- Filters: status (multi), payment status, date range, payment method, has-tracking, coupon
- Search: order number, customer email/phone, product title
- Bulk actions: mark as packed, export CSV
- Pagination: 50 per page, server-side

### `/admin/orders/[id]`

- Header: order #, date, customer (link to customer detail), current status badge
- **Items** section: each line item with image, title, qty, unit price, line total
- **Pricing** section: subtotal, shipping, COD fee, discount (with coupon code), tax, total
- **Addresses** — shipping & billing
- **Payment**: method, status, Razorpay IDs, capture/refund history
- **Shipping**: tracking number input, courier dropdown (Phase 7), "Generate label" CTA, "Mark shipped" / "Mark delivered" buttons
- **Status timeline**: chronological events
- **Notes**: customer note (read-only) + internal note (editable)
- **Actions** (right rail):
  - Change status (dropdown)
  - Add status event with note
  - Refund (full / partial) — modal with amount, reason
  - Resend confirmation email
  - Cancel order
  - Download invoice (PDF)
  - Print packing slip

All actions create `OrderStatusEvent` entries with `createdBy: adminUserId`.

### `/admin/customers`

- Table: name, email, phone, # orders, total spent, last order date, joined date
- Filter: has-orders, marketing opt-in, joined date range
- Search: name, email, phone

### `/admin/customers/[id]`

- Profile info
- Addresses
- Order history
- Lifetime value, AOV, # orders
- "Send email" / "Note" actions (notes are internal only)

### `/admin/coupons`

- CRUD on `Coupon` model (Phase 4 schema)
- Form fields: code, type, value, min subtotal, max discount, dates, usage limits, active toggle
- List shows: code, type, value, usage (n/limit), validity, active toggle
- "Duplicate" action to create a similar coupon

### `/admin/settings`

- Mirror of Sanity `siteSettings` for things admins might tweak more often:
  - Free-shipping threshold
  - COD fee, COD cap, COD eligibility rules
  - Announcement bar text
- These can also be edited in Sanity Studio; this page is a faster admin shortcut

---

## Onboarding Sanity for your mom

- Sanity Studio at `/studio` (embedded)
- Custom desk structure so it's not a flat list:
  - Products (by category)
  - Categories
  - Homepage
    - Hero slides
    - Featured collections
  - Site settings
- Tooltips on every field (use Sanity's `description` prop generously)
- Field-level validation:
  - Title required, max 80 chars
  - Slug auto-generated from title
  - At least 1 image required
  - Price > 0
  - SKU unique
- Image hotspot enabled — non-technical user just clicks the focal point, doesn't worry about crops
- Preview pane showing the product card live in Studio

Write a one-page user guide (Markdown in repo + printed/PDF for mom): how to add a product, how to update the hero, how to mark something out of stock.

---

## Permissions matrix

| Action | Customer | Admin | Superadmin |
|---|---|---|---|
| Place orders | ✅ | ✅ | ✅ |
| View own orders | ✅ | ✅ | ✅ |
| View all orders | ❌ | ✅ | ✅ |
| Update order status | ❌ | ✅ | ✅ |
| Refund | ❌ | ✅ | ✅ |
| Edit products (Sanity) | ❌ | ✅ | ✅ |
| Manage admins | ❌ | ❌ | ✅ |
| View revenue | ❌ | ✅ | ✅ |

Superadmin is just you. Mom is Admin.

---

## Audit log

Every admin action writes to an `AdminAuditLog` table: `who, when, action, targetType, targetId, before, after`. Cheap insurance against mystery state changes later.

---

## Out of scope for Phase 6

- Bulk product import / CSV (rare, add only if mom asks)
- Advanced analytics / cohort analysis (Phase 8 wires GA4; deeper analytics is post-launch)
- Email marketing campaigns (Phase 8 — basic newsletter; campaign tooling is Mailchimp / Klaviyo if needed)

---

## Risks / gotchas

- **Mom-friendly UX** — admin needs to be *boring and obvious*. No clever shortcuts, no jargon. Test by sitting with her for 30 min after Phase 6 ships.
- **Permission boundaries** — every `/admin/*` API must check role server-side, not just hide UI. Easy to miss.
- **Mobile admin** — your mom may want to mark orders shipped from her phone. Make sure `/admin/orders` is usable on mobile, not just desktop.
