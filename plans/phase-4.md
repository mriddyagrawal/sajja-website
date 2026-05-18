# Phase 4 — Checkout & Orders

**Goal**: end-to-end checkout flow from "Proceed to checkout" through to a confirmed order — minus the payment integration (that's Phase 5, but stubbed here).

**Estimated time**: 3–4 days.

**Depends on**: Phases 2 (cart) and 3 (addresses).

---

## Outcomes (definition of done)

- Multi-step checkout works: Address → Shipping → Payment → Review
- Guest checkout supported (collects email + phone without account creation)
- Coupon codes apply (basic % off and flat off)
- Order record created on checkout completion (status `pending`)
- Order confirmation page with order number + summary
- Confirmation email sent via Resend
- `/account/orders` shows real orders for logged-in users
- `/account/orders/[id]` shows order detail with status timeline

---

## Data model

```prisma
model Order {
  id              String        @id @default(cuid())
  orderNumber     String        @unique         // e.g. "SAJ-2026-00042"
  userId          String?                       // null = guest
  user            User?         @relation(fields: [userId], references: [id])
  guestEmail      String?
  guestPhone      String?

  items           OrderItem[]

  // Pricing (all in paise, snapshot at order time)
  subtotal        Int
  shippingFee     Int           @default(0)
  codFee          Int           @default(0)
  discount        Int           @default(0)
  tax             Int           @default(0)
  total           Int

  couponCode      String?

  // Addresses (snapshot — denormalized so changes to user's address book don't affect history)
  shippingAddress Json
  billingAddress  Json

  // Status
  status          OrderStatus   @default(PENDING)
  paymentStatus   PaymentStatus @default(UNPAID)
  paymentMethod   PaymentMethod?

  // Razorpay refs (filled in Phase 5)
  razorpayOrderId    String?
  razorpayPaymentId  String?
  razorpaySignature  String?

  // Shipping (filled in Phase 7)
  trackingNumber  String?
  courierName     String?
  shippedAt       DateTime?
  deliveredAt     DateTime?

  notes           String?       // customer note
  internalNotes   String?       // admin

  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
  statusHistory   OrderStatusEvent[]
}

model OrderItem {
  id          String  @id @default(cuid())
  orderId     String
  order       Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId   String                                 // Sanity ID
  productSlug String
  title       String                                 // snapshot
  image       String                                 // snapshot
  unitPrice   Int                                    // snapshot, paise
  quantity    Int
  lineTotal   Int                                    // unitPrice * quantity
  sku         String?
}

model OrderStatusEvent {
  id        String       @id @default(cuid())
  orderId   String
  order     Order        @relation(fields: [orderId], references: [id], onDelete: Cascade)
  status    OrderStatus
  note      String?
  createdAt DateTime     @default(now())
  createdBy String?                                  // userId or "system"
}

enum OrderStatus {
  PENDING         // created, not paid
  PAID            // payment confirmed
  PACKED          // admin marks ready to ship
  SHIPPED
  OUT_FOR_DELIVERY
  DELIVERED
  CANCELLED
  REFUNDED
  FAILED          // payment failed
}

enum PaymentStatus { UNPAID PAID FAILED REFUNDED PARTIAL_REFUND }
enum PaymentMethod { RAZORPAY COD }

model Coupon {
  id            String   @id @default(cuid())
  code          String   @unique
  type          DiscountType                         // PERCENT | FLAT
  value         Int                                  // % (0-100) or paise
  minSubtotal   Int?                                 // paise
  maxDiscount   Int?                                 // paise (cap for %)
  startsAt      DateTime?
  expiresAt     DateTime?
  usageLimit    Int?                                 // total uses across all users
  perUserLimit  Int?
  usedCount     Int      @default(0)
  isActive      Boolean  @default(true)
  createdAt     DateTime @default(now())
}

enum DiscountType { PERCENT FLAT }
```

Snapshots matter: title, image, unitPrice are denormalized into `OrderItem` so the order is stable even if the product is later edited or deleted in Sanity.

---

## Checkout flow

Single page `/checkout` with stepper (or progress dots) — not multiple routes, to keep state simple. Use a state machine (XState lite or a discriminated union reducer) to manage steps.

### Step 1 — Address
- Logged in: pick from saved addresses or "Add new"
- Guest: form with email + phone + full address
- "Bill to same address" toggle
- Validate pincode format (Phase 7 adds serviceability)
- Next button enabled when valid

### Step 2 — Shipping
- Show shipping options:
  - **Standard** (₹X, 5–7 days)
  - **Express** (₹Y, 2–3 days) — optional, may skip in v1
- Pull rates from Shiprocket API in Phase 7; flat-rate placeholder for Phase 4
- Free if subtotal ≥ threshold

### Step 3 — Payment
- Two options (radio):
  - **Razorpay** (UPI, Cards, Netbanking, Wallets) — wired in Phase 5
  - **Cash on Delivery** — adds ₹50 COD fee (configurable)
- COD requires phone verification (OTP) — phase 5 wires this; phase 4 trusts the phone

### Step 4 — Review
- Items, addresses, shipping, payment method
- Coupon code input
- Final total
- **Place Order** CTA
- Terms checkbox: "I agree to the Terms of Service and Refund Policy"

On Place Order:
1. Validate cart (server-side: prices, stock)
2. Create `Order` with `status: PENDING`, `paymentStatus: UNPAID`
3. If Razorpay → redirect/popup to Razorpay (Phase 5)
4. If COD → mark `paymentStatus: PAID` (since money is collected at delivery; we treat COD as paid for our workflow), `status: PAID`, send confirmation
5. Decrement stock
6. Clear cart
7. Redirect to `/orders/[orderNumber]/confirmation`

---

## Order number format

`SAJ-YYYY-NNNNN`, e.g. `SAJ-2026-00042`.

Sequential within a year, padded to 5 digits. Use a Postgres sequence per year, or compute via `select count(*) from "Order" where year(createdAt) = ...` then format. Sequence is cleaner.

---

## Coupon validation logic

When applied:
1. Look up by code (case-insensitive); if not found → error
2. Check `isActive`, `startsAt <= now <= expiresAt`
3. Check `usageLimit` vs `usedCount`
4. Check `perUserLimit` (count user's prior orders with this coupon)
5. Check `minSubtotal`
6. Compute discount:
   - `PERCENT`: `min(subtotal * value / 100, maxDiscount ?? Infinity)`
   - `FLAT`: `min(value, subtotal)`
7. Return computed discount

Validate again server-side at order placement (never trust client-computed discount).

---

## Stock decrement

When order is placed:
- Wrap order creation + stock decrement in a Prisma transaction
- If any item is out of stock by the time we hit the server (race condition), abort and surface a per-item error to the user

For Phase 4 we treat Sanity as the source of stock truth — but writes go through our API (we'll use Sanity's write API with a server-only token). If this turns out to be slow, consider mirroring stock to Supabase. **Decision punted to first real load test.**

---

## Order confirmation page (`/orders/[orderNumber]/confirmation`)

- "Thank you, [first name]!" with order number
- Order summary (items, totals, address)
- "What happens next" timeline (visual): Order placed → We're packing → Shipped → Delivered
- "Track your order" CTA → `/account/orders/[id]` (or public tracking page for guests)
- "Continue shopping" link
- Triggers confirmation email (Resend) with same info

Guest checkout: order can be accessed via `/orders/[orderNumber]?token=...` where token is a signed URL also emailed to the guest.

---

## `/account/orders`

- List of orders, newest first
- Each row: order number, date, status badge, total, "View" link
- Filters: status, date range
- Empty state: "No orders yet"

## `/account/orders/[id]`

- Full order details (same layout as confirmation)
- Status timeline with timestamps
- "Need help?" button → opens WhatsApp / contact form pre-filled with order number
- "Cancel order" button — only if `status` is `PENDING` or `PAID` and not yet `PACKED`. Triggers refund flow in Phase 5.
- "Download invoice" — PDF generated server-side (use `@react-pdf/renderer`)

---

## Transactional emails (Resend)

Phase 4 sends:
- **Order placed** — on creation (COD orders), or on payment success (Razorpay orders, in Phase 5)
- **Order cancelled** — on customer cancel

Email design:
- Plain, branded (logo header, cream background, gold accents)
- Clear order summary
- CTA to track / contact support
- Reuse a `<TransactionalLayout>` React Email component for consistency

---

## Out of scope for Phase 4

- Actual Razorpay redirect / payment capture (Phase 5)
- Shipping label generation (Phase 7)
- Returns flow (Phase 10)
- Reviews after delivery (Phase 10)

---

## Risks / gotchas

- **Tax**: GST handling. Sajja is likely below the ₹40L turnover threshold initially → no GST. Schema has a `tax` field anyway; set to 0 for now. **Confirm with an accountant before going live.**
- **Invoice format** — needs GSTIN if registered. Punt invoice design until GST decision is made.
- **Race conditions on stock** — guard with a Prisma transaction + serializable isolation if needed.
- **Guest checkout abuse** — rate-limit `POST /api/orders` per IP / phone.
