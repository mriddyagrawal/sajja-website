# Phase 10 — Post-launch / Future

**Goal**: ongoing improvements driven by real customer signal. Nothing here is mandatory — pick based on what the data and customers actually ask for.

**Estimated time**: ongoing, post-launch.

**Depends on**: a live, running store with real orders.

---

## How to prioritize this list

Don't pick by what's most fun to build. After 4 weeks of live operations, you'll have:
- A list of customer-service complaints (recurring themes = top priority)
- Cart abandonment heatmaps (where do people drop?)
- Sales by product (do we even need variants? maybe just two SKUs)
- Email list growth + open rates
- RTO / refund rates
- Mom's pain points running the store

Pick the next 1–2 items from this list each month based on that. Resist building features no one asked for.

---

## Candidate features (no fixed order)

### Product variants (color, size, material)

Schema was reserved for this in Phase 1. Implementation:
- Add `Variant` type in Sanity: `{ name, options: [{ value, label, image?, stock, sku, priceDelta? }] }`
- Variant selector UI on PDP (swatches for colors, pills for sizes)
- Cart stores `variantId` per item
- Order items snapshot the variant label + image
- Stock managed per variant

Only do this once mom explicitly asks for it — managing variants takes content discipline.

### Reviews & ratings

- Star rating + text + photos (Cloudinary upload)
- Only verified buyers can review (must have a delivered order with that product)
- Auto-prompt via email 7 days after delivery
- Display on PDP with sort (newest, highest, lowest, has-photo)
- Moderation queue in admin (filter for profanity/spam, but be light-touch)

Considerations:
- Schema in Supabase: `Review { id, userId, orderItemId, productId, rating, title, body, photos, status, createdAt }`
- Status: `PENDING | APPROVED | REJECTED`
- Aggregate cached on the product (avg, count) — recompute on every approve

### Custom / made-to-order

Some pieces are bespoke. Add:
- "Request a custom piece" button on category pages
- Form: occasion, budget, timeline, reference images, preferred materials
- Routed to admin inbox + WhatsApp notification
- Manual quote → admin creates a private product or a Razorpay payment link

Don't over-engineer. The form-to-conversation flow is enough for v1.

### Gift cards

- Digital, redeemable by code at checkout
- Schema: `GiftCard { code, initialBalance, currentBalance, recipientEmail, message, scheduledFor, purchasedBy }`
- Buy page: pick amount, recipient info, scheduled send date
- Email delivery with code on the chosen date
- Redeemable at checkout (separate from coupons — gift cards reduce total, can stack with coupons)

### Returns & exchanges

- Initiate from `/account/orders/[id]/return`
- Customer picks items, reason, photo upload
- Admin approves → generates Shiprocket reverse pickup
- On receipt: refund or replace
- Track `ReturnRequest` model + status

### Loyalty / referrals

- Earn ₹1 per ₹100 spent (or similar)
- Wallet balance applied at checkout (max % of order)
- Referral: "Share your link → friend gets 10% off, you get ₹200 when they buy"
- Track via `ReferralCode` + applied on signup

Don't ship loyalty until you have repeat customers to be loyal — meaningless on a brand-new store.

### WhatsApp commerce

- WhatsApp Business API (via Twilio, MSG91, or Gupshup)
- Catalog sync
- Order flow inside WhatsApp
- Customer support inbox

Big lift. Skip unless data shows WhatsApp inbound is a serious channel.

### International shipping

- Add country selector + currency switcher (INR / USD / GBP / AED)
- IndiaPost International / DTDC International / Shiprocket Global
- HSN codes per product (for customs)
- Indian export compliance (LUT for GST exemption, GST refund flow)
- Localized pricing per region

Significant work. Only if international interest is consistent (DM volume, Instagram reach).

### Saved cards / one-click checkout

- Razorpay Customer Tokens — let returning users pay in one tap
- Save card flag on checkout
- Manage saved methods in account settings

Increases conversion measurably for repeat customers.

### Advanced search

- Algolia or Typesense (free tiers cover early scale)
- Typeahead with product images
- Synonyms, typo tolerance, regional language support

Worth doing once catalog > 100 products *or* search exit rate is high.

### Inventory in Supabase (off Sanity)

If stock-related race conditions or sync issues appear:
- Mirror stock to Supabase
- Sanity becomes content-only; stock is operational data
- Real-time inventory dashboard

### Multi-language

Indian customers are mostly English-comfortable but a Hindi version of key pages (PDP, checkout) is a strong signal of brand grounding. `next-intl`. Don't translate the whole catalog — just navigation + checkout.

### Influencer / affiliate program

- Unique discount codes per influencer
- Tracking dashboard per affiliate
- Auto-payout via Razorpay payouts
- Tools like GoAffPro or Refersion if it gets serious

### Email lifecycle automation

- Welcome series (3 emails over 2 weeks)
- Abandoned cart (3, 24, 72h)
- Post-purchase: thank you → review request → cross-sell
- Win-back: 60-day inactive
- Birthday / anniversary offers

Resend can handle simple sequences; graduate to Klaviyo if it's earning ROI.

### Festival campaign engine

Recurring big moments: Diwali, Karva Chauth, Raksha Bandhan, Holi, Navratri, Eid, Christmas, Valentine's, Mother's Day.

- Sanity "Campaign" content type: dates, hero, featured products, banner
- Auto-schedule swap of hero + announcement bar
- Email blast linked to campaign
- Post-campaign report (revenue attribution)

### Mobile app

Don't. Use PWA (add manifest, install prompt) until the data says otherwise. Apps are expensive to maintain and rarely justified for an early-stage D2C store.

---

## What to actively avoid

- **Premature scale prep**: don't introduce Redis caching, microservices, edge functions until something breaks
- **Feature bloat**: every new feature is forever maintenance
- **Designing for "future you"**: build for current customers, refactor later
- **Trends**: AI chat, AR product try-on, NFTs — they may be right someday, but only after fundamentals are nailed

---

## Cadence

- **Weekly**: review orders, errors, support volume; ship small fixes
- **Monthly**: pick 1–2 items from this list based on data; ship them
- **Quarterly**: bigger projects (returns flow, gift cards, reviews) if justified
- **Festival prep**: campaign content + landing pages 2–3 weeks before each major occasion
