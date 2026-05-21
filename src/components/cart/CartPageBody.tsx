"use client";

import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { CartEmpty } from "@/components/cart/CartEmpty";
import { FreeShippingBar } from "@/components/cart/FreeShippingBar";
import { useHydrated } from "@/lib/cart/hooks";
import { selectIsEmpty, selectSubtotal, useCartStore } from "@/lib/cart/store";
import { formatPrice } from "@/sanity/types";
import { siteConfig } from "@/lib/nav";

const SHIPPING_THRESHOLD_PAISE = siteConfig.shippingThreshold * 100;
const FALLBACK_SHIPPING = 9900; // ₹99 — placeholder until Phase 7 wires Shiprocket

export function CartPageBody() {
  const hydrated = useHydrated();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore(selectSubtotal);
  const empty = useCartStore(selectIsEmpty);

  // Don't render anything from the persisted state until hydration completes —
  // otherwise the page flashes "empty" before the items appear.
  if (!hydrated) {
    return (
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
        <div className="space-y-6">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="bg-surface-shell/60 h-32 animate-pulse rounded-xl"
              aria-hidden
            />
          ))}
        </div>
        <div className="bg-surface-shell/60 h-72 animate-pulse rounded-xl" aria-hidden />
      </div>
    );
  }

  if (empty) {
    return <CartEmpty variant="wide" />;
  }

  const shippingFee = subtotal >= SHIPPING_THRESHOLD_PAISE ? 0 : FALLBACK_SHIPPING;
  const total = subtotal + shippingFee;

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start lg:gap-12">
      {/* Items */}
      <section aria-label="Cart items" className="space-y-6">
        {/* Header row (desktop only) */}
        <div className="text-ink-muted hidden grid-cols-[7rem_1fr_auto] gap-4 border-b border-border-default pb-3 text-[11px] tracking-[0.22em] uppercase sm:grid">
          <span>Item</span>
          <span></span>
          <span className="text-right">Subtotal</span>
        </div>

        <ul className="divide-border-default divide-y">
          {items.map((item, idx) => (
            <li key={item.productId} className={idx === 0 ? "pb-6" : "py-6"}>
              <CartItemRow item={item} variant="wide" />
            </li>
          ))}
        </ul>

        <Link
          href="/shop"
          className="text-brand-rose hover:text-brand-magenta inline-flex items-center gap-2 text-sm font-medium tracking-wide transition"
        >
          ← Continue shopping
        </Link>
      </section>

      {/* Summary */}
      <aside aria-label="Order summary" className="lg:sticky lg:top-32">
        <div className="bg-surface-shell border-border-default rounded-2xl border p-6 sm:p-8">
          <h2 className="font-display text-ink-charcoal text-2xl">Order summary</h2>

          <div className="mt-5">
            <FreeShippingBar />
          </div>

          <dl className="border-border-default mt-6 space-y-3 border-t pt-5 text-sm">
            <div className="flex items-baseline justify-between">
              <dt className="text-ink-muted">Subtotal</dt>
              <dd className="text-ink-charcoal font-medium tabular-nums">
                {formatPrice(subtotal)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between">
              <dt className="text-ink-muted">Shipping</dt>
              <dd className="text-ink-charcoal font-medium tabular-nums">
                {shippingFee === 0 ? (
                  <span className="text-success">Free</span>
                ) : (
                  formatPrice(shippingFee)
                )}
              </dd>
            </div>
            <p className="text-ink-subtle text-xs">
              Estimated. Taxes calculated at checkout.
            </p>
          </dl>

          <div className="border-border-default mt-5 flex items-baseline justify-between border-t pt-5">
            <span className="font-display text-ink-charcoal text-xl">Total</span>
            <span className="font-display text-ink-charcoal text-2xl tabular-nums">
              {formatPrice(total)}
            </span>
          </div>

          <div className="mt-6">
            <label className="text-ink-muted text-xs tracking-[0.18em] uppercase">
              Promo code
            </label>
            <div className="mt-1 flex gap-2">
              <input
                type="text"
                placeholder="Enter code"
                disabled
                aria-label="Promo code"
                className="border-border-strong text-ink-charcoal placeholder:text-ink-subtle h-10 flex-1 rounded-md border bg-white px-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
              />
              <Button size="sm" variant="secondary" disabled>
                Apply
              </Button>
            </div>
            <p className="text-ink-subtle mt-1.5 text-[11px]">
              Coupons unlock at checkout in Phase 4.
            </p>
          </div>

          <Button size="lg" className="mt-6 w-full" disabled>
            <Lock className="h-4 w-4" />
            Checkout (Phase 4)
            <ArrowRight className="h-4 w-4" />
          </Button>

          <p className="text-ink-subtle mt-3 text-center text-[11px]">
            Secure checkout · UPI · Cards · COD coming soon
          </p>
        </div>
      </aside>
    </div>
  );
}
