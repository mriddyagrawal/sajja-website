# Phase 3 — User Accounts

**Goal**: customers can create accounts, log in, save addresses, build wishlists, and view a placeholder "orders" section (filled in Phase 4).

**Estimated time**: 2–3 days.

**Depends on**: Phase 0 (Clerk scaffold) and Phase 2 (cart merge on login).

---

## Outcomes (definition of done)

- Sign up / log in works via email *and* phone OTP
- `/account` dashboard with sub-pages: Orders (stub), Addresses, Wishlist, Profile
- Cart merges from localStorage to server on login
- Wishlist persists for logged-in users
- Logout works cleanly; cart is preserved locally

---

## Auth: Clerk setup

- Email magic link **or** password
- Phone OTP — critical for Indian users; many don't keep up with email
- Google sign-in as a third option
- Branded sign-in page (custom Clerk theme matching brand tokens — not the default purple)

Sign-up captures:
- First name, last name
- Email *and* phone (one required, both encouraged)
- Marketing consent checkbox (separate from terms)

---

## Data model

```prisma
model User {
  id            String    @id              // Clerk user ID
  email         String?   @unique
  phone         String?   @unique
  firstName     String?
  lastName      String?
  marketingOptIn Boolean  @default(false)
  createdAt     DateTime  @default(now())
  addresses     Address[]
  wishlist      WishlistItem[]
  cart          Cart?
  orders        Order[]                    // populated in Phase 4
}

model Address {
  id           String  @id @default(cuid())
  userId       String
  user         User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  label        String?                      // "Home", "Office"
  fullName     String
  phone        String
  line1        String
  line2        String?
  landmark     String?
  city         String
  state        String
  pincode      String
  country      String  @default("IN")
  isDefault    Boolean @default(false)
  type         AddressType @default(SHIPPING)
}

enum AddressType { SHIPPING BILLING BOTH }

model WishlistItem {
  id        String   @id @default(cuid())
  userId    String
  productId String                          // Sanity ID
  addedAt   DateTime @default(now())
  @@unique([userId, productId])
}
```

---

## Webhook: Clerk → Supabase

When a user signs up in Clerk, mirror to our `User` table via Clerk webhook (`/api/webhooks/clerk`).

Events to handle:
- `user.created` → insert
- `user.updated` → update name/email/phone
- `user.deleted` → soft-delete or hard-delete per policy (default: soft-delete with `deletedAt`)

Verify webhook signature using Clerk's signing secret.

---

## Pages

### `/sign-in` and `/sign-up`
Clerk-hosted components, themed to match. Don't roll our own.

### `/account` — dashboard
Sidebar nav (desktop) / tabs (mobile):
- **Profile** — name, email, phone, marketing opt-in
- **Orders** — stub list ("No orders yet — start shopping"); fully wired in Phase 4
- **Addresses** — list + add/edit/delete; default toggle
- **Wishlist** — grid of `<ProductCard>` with "Move to cart" CTA
- **Logout** — bottom of sidebar

Mobile: each section is its own page `/account/orders`, `/account/addresses`, etc.

### `/account/addresses`
- List existing addresses
- "Add new address" → modal with form
- Each address card: label, name, full address, phone, "Edit" / "Delete" / "Set as default"
- Form fields: full name, phone, line1, line2 (optional), landmark (optional), city, state (dropdown of 28 states + 8 UTs), pincode (6-digit validation), country (IN default, disabled in Phase 3)
- Pincode validation: format only (6 digits). Serviceability check comes in Phase 7.

### `/account/wishlist`
- Grid of wishlisted products
- Heart icon on each product page toggles wishlist
- Optimistic UI: toggle instantly, then sync to server
- Empty state: "Save items you love. Hover over a product and tap the heart."

---

## Cart merge on login

When `user.isSignedIn` flips from false → true (Clerk hook), call `/api/cart/merge`:

1. Server reads existing `Cart` for `userId` (or creates one)
2. Client sends localStorage cart items
3. Server merges:
   - If product not in server cart → add
   - If product already in server cart → sum quantities (cap at `stockCount` if known)
4. Server returns merged cart; client replaces local state

After merge, all subsequent mutations write through to server.

On logout, take a snapshot of server cart → write to localStorage → clear Zustand state on next reload. Or simpler: leave Zustand alone, since localStorage already holds it.

---

## Wishlist

- Heart on `<ProductCard>` and PDP
- If logged out: toggle stores in localStorage; prompt to log in to keep across devices (toast only, not a blocker)
- If logged in: instant toggle, server sync via API route

---

## Profile editing

- Edit first name, last name, marketing opt-in (Clerk-managed for email/phone changes — these require verification flows that Clerk handles)
- Save button disabled until something changes
- Success toast on save

---

## Out of scope for Phase 3

- Orders content (Phase 4)
- Reviews from order (Phase 10)
- Saved payment methods (Razorpay handles this on their side via customer tokens — Phase 5)
- 2FA — Clerk supports it; enable as a toggle in Profile but don't force

---

## Risks / gotchas

- **Clerk free tier** is 10k MAU — comfortable for launch. Watch costs once we scale.
- **PII** (addresses, phone) must be encrypted at rest — Supabase does this by default, but verify
- **Cart merge race condition** — if a user opens two tabs and logs in on one while the other has items, decide canonical: server wins, but additively (merge). Document this in code.
- **Phone OTP cost** — Clerk uses Twilio under the hood; check SMS pricing for India. Alternative: MSG91 if cost becomes a concern.
