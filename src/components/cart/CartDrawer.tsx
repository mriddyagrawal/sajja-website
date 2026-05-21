"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/Sheet";
import { Button } from "@/components/ui/Button";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { CartEmpty } from "@/components/cart/CartEmpty";
import { FreeShippingBar } from "@/components/cart/FreeShippingBar";
import { useCartStore, selectIsEmpty, selectSubtotal } from "@/lib/cart/store";
import { formatPrice } from "@/sanity/types";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore(selectSubtotal);
  const empty = useCartStore(selectIsEmpty);
  const open = useCartStore((s) => s.open);
  const close = useCartStore((s) => s.close);
  const setOpen = (next: boolean) => (next ? open() : close());

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="right" className="p-0">
        <SheetHeader>
          <SheetTitle>
            Your cart{" "}
            <span className="text-ink-muted ml-1 text-sm font-normal">
              ({items.reduce((s, i) => s + i.quantity, 0)})
            </span>
          </SheetTitle>
        </SheetHeader>

        {empty ? (
          <CartEmpty variant="compact" onAction={close} />
        ) : (
          <>
            <div className="border-border-default border-b px-6 py-4">
              <FreeShippingBar />
            </div>

            <ul className="flex-1 overflow-y-auto px-6 py-5">
              {items.map((item, idx) => (
                <li
                  key={item.productId}
                  className={idx === 0 ? "pb-5" : "border-border-default border-t py-5"}
                >
                  <CartItemRow item={item} variant="compact" onLinkNavigate={close} />
                </li>
              ))}
            </ul>

            <div className="border-border-default bg-surface-cream-dark/40 border-t px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-ink-muted text-sm">Subtotal</span>
                <span className="font-display text-ink-charcoal text-xl">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-ink-subtle mt-1 text-xs">
                Shipping and taxes calculated at checkout.
              </p>

              <div className="mt-4 grid gap-2">
                <Button size="lg" asChild>
                  <Link href="/cart" onClick={close}>
                    View cart &amp; checkout
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="md" variant="ghost" onClick={close}>
                  Continue shopping
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
