"use client";

import { Check, Truck } from "lucide-react";
import { useCartSubtotal } from "@/lib/cart/hooks";
import { formatPrice } from "@/sanity/types";
import { siteConfig } from "@/lib/nav";
import { cn } from "@/lib/utils";

const THRESHOLD_PAISE = siteConfig.shippingThreshold * 100;

export function FreeShippingBar({ className }: { className?: string }) {
  const subtotal = useCartSubtotal();
  const remaining = Math.max(THRESHOLD_PAISE - subtotal, 0);
  const reached = remaining === 0;
  const pct = Math.min((subtotal / THRESHOLD_PAISE) * 100, 100);

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-ink-default flex items-center gap-2 text-xs">
        {reached ? (
          <>
            <Check className="text-success h-4 w-4 shrink-0" />
            <span>
              <strong className="text-success font-semibold">You&apos;ve unlocked free shipping</strong>
            </span>
          </>
        ) : (
          <>
            <Truck className="text-brand-rose h-4 w-4 shrink-0" />
            <span>
              Add <strong className="text-ink-charcoal">{formatPrice(remaining)}</strong> more for
              free shipping
            </span>
          </>
        )}
      </p>
      <div
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progress toward free shipping"
        className="bg-surface-shell h-1.5 w-full overflow-hidden rounded-full"
      >
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-500 ease-out",
            reached ? "bg-success" : "bg-brand-rose",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
