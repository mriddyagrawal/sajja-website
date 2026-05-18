# Phase 7 — Shipping & Logistics

**Goal**: orders ship reliably. Customers see real shipping options, accurate ETAs, and trackable parcels. Admin generates labels with one click.

**Estimated time**: 2 days.

**Depends on**: Phases 4, 6.

---

## Outcomes (definition of done)

- Pincode serviceability check on cart + checkout
- Real shipping rates pulled from Shiprocket at checkout
- "Generate label" in admin creates an AWB and downloads the label PDF
- Tracking number + courier saved on order
- Customer can track via `/account/orders/[id]/track` (and via the same page on the public guest URL)
- Tracking-updated emails sent (shipped, out for delivery, delivered)

---

## Why Shiprocket

- Aggregates Delhivery, Bluedart, Ekart, DTDC, India Post — gives best rates per pincode automatically
- Single API, single dashboard
- Free tier with pay-per-shipment pricing
- COD handling built in
- Established with Indian D2C brands

Alternatives: Delhivery direct (cheaper at scale, more setup), Pickrr, ShipKaro. Default to Shiprocket unless KYC is blocking.

---

## Integration

### Setup
- Shiprocket account + KYC
- Pickup location registered (your mom's address / warehouse)
- API token in env (`SHIPROCKET_EMAIL`, `SHIPROCKET_PASSWORD` — token is short-lived; cache in Redis or refresh on each request)

### Pincode serviceability

`POST /api/shipping/serviceability` with `{ pincode, weight, codAmount? }`

Calls Shiprocket's serviceability endpoint, returns:
- `{ deliverable: boolean, estimatedDays: number, rate: number, codAvailable: boolean }`

Used:
- On cart page — quick check ("Delivers to your pincode in 4–6 days")
- On checkout step 1 — locks user in only if pincode is deliverable
- On product page — optional widget: "Delivers to [your pincode]" with a "Change" link

Cache results per `(pincode, weightBucket)` for 24h to reduce API calls.

### Rate at checkout

On Phase 4 step 2, replace the flat-rate placeholder:
- Hit serviceability with cart weight + value
- Show the rate; surface a free-shipping note if subtotal ≥ threshold
- Save chosen rate snapshot on the order

### Label generation (admin)

On `/admin/orders/[id]`, "Generate label" button:
1. Build Shiprocket order: items, addresses, weight, dimensions, payment method, COD amount
2. Call `orders/create/adhoc` → returns `shipment_id` + `order_id`
3. Assign AWB: `courier/assign/awb` → returns `awb_code` + `courier_name`
4. Generate label: `courier/generate/label` → PDF URL
5. Save `trackingNumber`, `courierName`, `shippedAt`, `status: SHIPPED` on our order
6. Trigger "Your order is on the way" email with tracking link

### Tracking

Two ways:
1. **Shiprocket tracking page** — easiest, redirect to their URL
2. **Embed** — call `courier/track/awb/{awb}` and render our own timeline

Start with (1) — link to Shiprocket's tracking page. Upgrade to (2) post-launch if the redirect feels off-brand.

### Webhooks

Shiprocket fires webhooks on status changes. Subscribe to:
- `shipped`
- `in transit`
- `out for delivery`
- `delivered`
- `RTO initiated` / `RTO delivered`
- `lost` / `damaged`

Map to our `OrderStatus`. Send customer emails on:
- Shipped
- Out for delivery
- Delivered

---

## Packaging

Out of code scope, but worth a note in this phase:

- Packaging design (kraft box, gold seal, thank-you note) sets brand perception
- A short "How we pack" video on Instagram drives trust
- Include a small printed insert with: thank-you note, care instructions, social handles, "Tag us @sajja for a 10% off code"

(Bring this up with your mom — it's high-leverage and low-cost.)

---

## RTO (Return-To-Origin) handling

When COD is refused at delivery → RTO → package comes back. Add an order action:
- "Mark RTO received" → restocks items, marks order `CANCELLED` (with internal note: RTO)
- Track RTO rate in dashboard

---

## Out of scope for Phase 7

- International shipping (Phase 10)
- Multiple pickup locations
- Hyperlocal / same-day (not relevant for handcrafted)
- Returns logistics (Phase 10 — needs a proper returns flow)

---

## Risks / gotchas

- **Weight accuracy** — Shiprocket charges by volumetric weight. Add `weightGrams` + `dimensions` to product schema *and use them* — otherwise the courier surcharges and admin has to reconcile manually.
- **Address normalization** — Indian addresses are messy. Add a free-text "landmark" field, validate pincode format, but don't be strict on line1/line2.
- **API rate limits** — Shiprocket throttles. Cache serviceability aggressively.
- **Token refresh** — Shiprocket auth token expires every ~10 days. Build refresh logic; don't let it 401 in production.
