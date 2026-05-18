# Phase 2 — Cart

**Goal**: users can add products to a cart, adjust quantities, and persist that cart across reloads and devices (once logged in).

**Estimated time**: 2–3 days.

**Depends on**: Phase 1.

---

## Outcomes (definition of done)

- "Add to Cart" works on PDP and `<ProductCard>` hover
- Cart drawer opens from the right on every page
- `/cart` full page works for the desktop checkout flow
- Cart persists across reloads (localStorage)
- Cart syncs to Supabase once user logs in (Phase 3 hook-in)
- Free-shipping progress bar shows on cart drawer + page
- Subtotal, item count badge in header all reactive

---

## State management

**Zustand** with a `persist` middleware to localStorage. Keep it minimal — no extra libs.

```ts
type CartItem = {
  productId: string
  slug: string
  title: string
  image: string
  unitPrice: number      // paise
  quantity: number
  // future: variantId, selectedOptions
}

type CartStore = {
  items: CartItem[]
  isOpen: boolean
  add: (item: CartItem) => void
  remove: (productId: string) => void
  updateQty: (productId: string, qty: number) => void
  clear: () => void
  open: () => void
  close: () => void
  // derived
  subtotal: () => number
  itemCount: () => number
}
```

Server-side cart (Supabase) added in Phase 3 once we have user IDs.

---

## UI: cart drawer

Triggered by the cart icon in the header, or after adding an item.

Structure:
- Header: "Your Cart (3)" + close button
- Free shipping progress bar: *"Add ₹350 more for free shipping"* (fills as subtotal grows)
- Item list:
  - Thumbnail (60×60)
  - Title (clickable → PDP)
  - Price
  - Quantity stepper
  - Remove (trash icon)
- Subtotal line at bottom
- "Checkout" primary CTA (inert in Phase 2, wired in Phase 4)
- "Continue shopping" ghost button (closes drawer)

**Empty state**: illustration + "Your cart is empty" + "Browse new arrivals" CTA.

---

## UI: full cart page (`/cart`)

Same data, more breathing room:
- 2-column layout on desktop (items left, summary right)
- Single column on mobile
- Same free-shipping progress
- Promo code input (functional in Phase 4)
- Order summary card on the right:
  - Subtotal
  - Estimated shipping (computed in Phase 7; placeholder for now)
  - Estimated total
  - "Proceed to checkout" CTA

---

## Add-to-cart UX

- Click triggers add → toast or drawer auto-opens (drawer is better — confirms the action visibly)
- Show a small confirmation animation on the cart icon (pulse + count badge update)
- If product out of stock, button is disabled with "Out of Stock" label
- Stock check on add — if `stockCount` exists and `quantity + new > stockCount`, cap and show "Only N available" toast

---

## "You may also like" — cart upsell

Below the items, show 4 related products (same category, popular).

---

## Persistence

### Anonymous (no login)
- Cart in localStorage only, indefinite
- Server doesn't know about it

### Logged in
- On login, merge localStorage cart with server cart (server is source of truth, but merge by adding new items + summing quantities)
- On every mutation, write through to `Cart` table in Supabase
- On logout, snapshot current state to localStorage so the user doesn't lose their cart

Server schema (Prisma):
```prisma
model Cart {
  id        String   @id @default(cuid())
  userId    String   @unique
  items     CartItem[]
  updatedAt DateTime @updatedAt
}
model CartItem {
  id        String @id @default(cuid())
  cartId    String
  productId String
  quantity  Int
  cart      Cart   @relation(fields: [cartId], references: [id], onDelete: Cascade)
}
```

We don't snapshot price here — price is always pulled live from Sanity. Price snapshot happens at order creation (Phase 4).

---

## Free-shipping threshold

Pulled from `siteSettings.shippingThreshold` (Sanity). Default ₹2000.

`<FreeShippingBar>` shows:
- Progress: `min(subtotal / threshold, 1)`
- Message:
  - `subtotal < threshold` → "Add ₹X more for free shipping"
  - `subtotal >= threshold` → "🎉 You've unlocked free shipping" (no emoji in the actual UI unless approved)

---

## Edge cases

- **Stale cart items**: if a product is deleted/unpublished after being added, show "This item is no longer available" and disable that row at checkout
- **Price changed**: if the price changed since the user added it, show the new price + a small "Price updated" note. Don't silently change without indication.
- **Multiple tabs**: Zustand `persist` reads from localStorage on focus — handle a storage event listener to keep tabs in sync

---

## Out of scope for Phase 2

- Coupons (Phase 4)
- Real shipping calculation (Phase 7)
- Variants (Phase 10)
- Wishlist → cart move (Phase 3)
