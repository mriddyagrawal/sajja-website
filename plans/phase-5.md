# Phase 5 — Payments

**Goal**: real money flows through Razorpay; COD is verified; failed payments are handled gracefully; refunds work from the admin side.

**Estimated time**: 2–3 days.

**Depends on**: Phase 4.

---

## Outcomes (definition of done)

- Razorpay Checkout opens from Phase 4 review step
- Successful payment marks order `paymentStatus: PAID`, fires confirmation email
- Failed payment returns user to checkout with a clear retry path
- Razorpay webhook handles success / failure server-side as source of truth
- COD orders require phone OTP verification before placement
- Admin can refund (full or partial) from `/admin/orders/[id]` (Phase 6)
- Razorpay live keys swapped in only after end-to-end test mode runs cleanly

---

## Razorpay flow

We use **Razorpay Orders + Checkout** (not direct payment). Standard server-trusted flow.

### Server side

1. On "Place Order" click (Phase 4 step 4):
   - Validate cart, addresses, coupon, stock
   - Create our `Order` row with `status: PENDING`, `paymentStatus: UNPAID`
   - Call Razorpay's `orders.create({ amount: total_in_paise, currency: 'INR', receipt: orderNumber, notes: { orderId } })`
   - Save returned `razorpay_order_id` on our order
   - Return `razorpay_order_id`, our `orderNumber`, public key to client

2. Client opens Razorpay Checkout with that order ID

3. Razorpay handles UPI / cards / netbanking / wallets natively — we don't touch card data

4. On success, Razorpay's success handler returns `razorpay_payment_id`, `razorpay_order_id`, `razorpay_signature`

5. Client posts those to our `POST /api/payments/verify`:
   - Server verifies signature: `HMAC_SHA256(razorpay_order_id + "|" + razorpay_payment_id, razorpay_key_secret)`
   - If valid → update order: `paymentStatus: PAID`, `status: PAID`, store IDs/signature
   - Trigger order-placed email
   - Return redirect URL to `/orders/[orderNumber]/confirmation`

6. **Also** rely on webhook (next section) as the authoritative source — never trust the client alone.

### Webhook handler `/api/webhooks/razorpay`

Razorpay sends events to a configured URL. Subscribe to:
- `payment.captured`
- `payment.failed`
- `payment.authorized` (we use auto-capture, but log anyway)
- `refund.processed`
- `refund.failed`

Verification: `HMAC_SHA256(payload, webhook_secret)` matches `X-Razorpay-Signature` header. Reject otherwise.

On `payment.captured`:
- Find order by `razorpay_order_id`
- If already `PAID`, no-op (idempotent — webhook may fire multiple times)
- Else update to `PAID` and trigger email (deduped — email sent once max)

On `payment.failed`:
- Mark `paymentStatus: FAILED`, leave `status: PENDING`
- Don't auto-cancel — let user retry from `/account/orders/[id]/retry-payment`

---

## Retry failed payment

If a user's payment fails (e.g., insufficient funds), the order exists but is unpaid. Show on confirmation page:

> Payment didn't go through. [Try again] or [Cancel order]

"Try again" creates a *new* Razorpay order tied to the same internal order — same total, same items.

---

## COD verification

To reduce COD abuse (bogus orders, refusal at delivery):

1. User picks COD on Phase 4 step 3
2. Step 4 (Review) shows OTP input
3. Send OTP to phone via Resend SMS provider, MSG91, or Clerk's phone verification API
4. User enters OTP → server verifies → order is created
5. Display COD fee (₹50) on the review screen

Cap COD eligibility:
- Order total < ₹5000 (configurable in site settings)
- Optional: only after a successful prior delivery (reduces first-time abuse)

---

## Refunds

Triggered from admin (Phase 6) — but the integration belongs here.

API: `POST /api/admin/orders/[id]/refund` (admin-only)

- Body: `{ amountPaise?: number, reason?: string }` — omit amount for full refund
- For Razorpay orders: `razorpay.payments.refund(razorpay_payment_id, { amount, notes })`
- For COD orders: refund is offline (bank transfer / UPI) — we record it but don't initiate via API. UI prompts admin to confirm they've sent the money.

Update order:
- Full refund → `paymentStatus: REFUNDED`, `status: REFUNDED`
- Partial → `paymentStatus: PARTIAL_REFUND`, keep `status`
- Append `OrderStatusEvent`

Webhook `refund.processed` confirms it landed; we update a `refundedAt` timestamp.

Customer email: "Refund initiated — should reach you in 5–7 business days" (Razorpay's actual SLA).

---

## Cancellation

- Customer can cancel from `/account/orders/[id]` if status is `PENDING`, `PAID`, but not yet `PACKED`
- On cancel:
  - If Razorpay paid → trigger full refund flow above
  - If COD → no money to refund, just mark cancelled
  - Restock items (increment stock in Sanity)
  - Email confirmation

---

## Razorpay KYC & live mode

Start in **test mode** for all dev. Switch to live only when:
- Razorpay account KYC complete (PAN, business proof, bank account — usually 1–3 days)
- End-to-end test of:
  - UPI payment
  - Card payment
  - Netbanking payment
  - Failed payment retry
  - Webhook delivery (use ngrok or Razorpay's test webhook trigger)
  - Refund

Live keys go in Vercel env. Test keys never in production. Add a `PAYMENT_MODE` env var as a belt-and-suspenders guard.

---

## Idempotency

- All payment webhooks must be idempotent
- Use `razorpay_payment_id` as a uniqueness key on `Order` (one captured payment per order)
- All side effects (email, stock decrement) guarded against double-firing

---

## Out of scope for Phase 5

- International payments / Stripe (Phase 10)
- Saved cards / one-click checkout via Razorpay customer tokens (Phase 10)
- Subscription / recurring (not applicable to this product)
- EMI plans (low value — Sajja's AOV is unlikely to warrant)

---

## Risks / gotchas

- **Webhook reliability**: Razorpay retries with exponential backoff. We must respond 2xx fast (< 5s). Do heavy work async if needed.
- **Signature verification**: get this right or you have a security hole. Use Razorpay's official Node SDK helper, not hand-rolled HMAC.
- **Test mode webhooks** require either a public URL or ngrok during dev. Razorpay's dashboard lets you replay events.
- **Currency**: always paise (integers). Floats anywhere in money math = bugs.
- **COD risk**: Sajja's COD refusal rate could be high. Monitor — if it's > 10%, add weight-based COD fees or restrict to verified phone numbers.
