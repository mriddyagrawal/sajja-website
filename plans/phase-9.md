# Phase 9 — Polish & Launch

**Goal**: the site is production-ready. Performance is fast, accessibility is solid, every state is designed, and we have a launch plan.

**Estimated time**: 2–3 days.

**Depends on**: Phases 0–8.

---

## Outcomes (definition of done)

- Lighthouse: Perf, A11y, SEO, Best Practices all ≥ 90 on Home, Shop, PDP, Cart, Checkout
- All states designed: loading, empty, error, success — for every async surface
- Mobile QA passed on at least 3 real devices (iOS Safari, Android Chrome, an older Android)
- No console errors in production build
- Error tracking wired (Sentry)
- DB backup schedule running
- Soft launch to ~10 friends/family completed, top issues fixed
- Real KYC / live payments verified end-to-end with one real ₹10 transaction
- Public launch checklist signed off

---

## Performance pass

- Image audit: every `<Image>` has correct `sizes`, all images served as AVIF/WebP via Cloudinary or Sanity
- Font subsetting + `display: swap`
- Third-party scripts deferred (GA4, Clarity, embeds) — use `next/script` with `strategy="afterInteractive"` or `lazyOnload`
- Cart drawer + checkout = client components only where needed; rest stays server-rendered
- `revalidate` strategy reviewed per route
- Route prefetching tuned (default Next behavior is fine; verify slow connections)
- Bundle analyzer run; remove anything > 50KB that isn't earning its place
- Lighthouse CI on PRs (GitHub Action) — blocks merges that regress

## Accessibility pass

- All interactive elements keyboard-reachable, with visible focus rings
- ARIA labels on icon-only buttons (cart, search, account, wishlist, close, etc.)
- All form fields have `<label>`
- Modals trap focus and restore it on close
- Color contrast AA verified for all brand color usage (especially rose-on-cream — likely needs darkening)
- Alt text on every product image (pulled from Sanity field)
- Skip-to-content link
- Reduced-motion preference respected (carousel auto-rotate, hover animations)

Tools: axe DevTools, Lighthouse, manual keyboard nav.

## Mobile QA

Test on at least:
- iPhone (iOS Safari) — 1 modern + 1 older if possible
- Android Chrome — mid-range device
- Android with system font size at +25%

Things that break on mobile but not desktop:
- Sticky cart drawer with overscroll
- Form keyboards covering the submit button
- Touch targets < 44px
- Horizontal scroll bleed from rails

## States to design (every async surface)

For each: cart, wishlist, addresses, orders list, search, product list, PDP:
- Loading (skeleton or spinner)
- Empty (illustration + helpful CTA)
- Error (friendly message + retry)
- Stale / partial (when offline or slow)

## Error handling

- `app/error.tsx` and `app/not-found.tsx` styled on-brand, not stock
- Per-route error boundaries for cart, checkout, account, admin
- Sentry wired (or PostHog Error Tracking if you're already using PostHog)
- Server errors logged with request context; never leak stack traces to clients

## Security checklist

- HTTPS only (Vercel default)
- HSTS header
- CSP — start with report-only, tighten before launch
- All admin routes server-side role-checked
- All write API routes rate-limited (Upstash Redis or Vercel KV — cheap)
- No secrets in client bundles (verify with `next build` output)
- Webhook signatures verified (Clerk, Razorpay, Shiprocket)
- Dependabot / Renovate enabled

## Backups

- Supabase: daily automatic backups (paid plan or self-managed pg_dump cron)
- Sanity: built-in version history; weekly export of dataset as a backup
- Decide retention: 30 days for both
- Test a restore once before launch

## Soft launch

- Invite ~10 friends/family
- Give them coupons, ask them to actually buy something
- Watch session recordings (Clarity)
- Collect feedback in a shared doc
- Fix top 5 issues
- Then announce publicly

## Launch checklist (the day-of)

- [ ] DNS pointed to Vercel, SSL active
- [ ] Razorpay live keys deployed (after KYC done)
- [ ] Shiprocket live integration verified
- [ ] Real ₹10 test transaction completed and refunded
- [ ] Sitemap submitted to Google Search Console
- [ ] GA4 receiving events
- [ ] Sentry receiving errors
- [ ] Admin team has logins and has run through the order flow
- [ ] Customer service email is being monitored
- [ ] WhatsApp number is live and someone is on the other end
- [ ] Newsletter welcome flow tested
- [ ] Coupon for launch ("SAJJA10") created
- [ ] Instagram announcement post scheduled
- [ ] Press / friends-list email drafted
- [ ] Out-of-stock products hidden, in-stock count accurate
- [ ] Backup verified
- [ ] On-call plan: who handles bugs in the first 48h

## Day 1–7 monitoring

- Twice-daily sweep: order list, error tracking, GA4 real-time
- Track: orders, AOV, conversion rate (sessions → orders), bounce rate, top exit pages
- Fast iteration on copy / UX based on what real users do

---

## Out of scope for Phase 9

- Anything from Phase 10
- Re-platforming or major redesigns based on early feedback — schedule those, don't react

---

## Risks / gotchas

- **KYC delays** — Razorpay live mode and Shiprocket KYC can each take days. Start them at the beginning of Phase 5 and Phase 7, not at Phase 9.
- **Launch-day bugs are inevitable** — schedule a quiet day, no other commitments
- **Going dark on Instagram is wasteful** — build anticipation 2–3 weeks before launch (BTS posts, the maker's story, sneak peeks)
