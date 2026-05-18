"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/product/QuantityStepper";
import type { Product } from "@/sanity/types";

type AddToCartButtonProps = {
  product: Product;
  className?: string;
};

/**
 * Phase 1: visually complete add-to-cart UX with no cart wiring.
 * Phase 2 will replace the local `added` state with the Zustand cart store.
 */
export function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const outOfStock = !product.inStock || (product.stockCount != null && product.stockCount <= 0);

  const onAdd = () => {
    if (outOfStock) return;
    // Phase 2: call cart.add({ productId, quantity })
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  if (outOfStock) {
    return (
      <div className={className}>
        <Button disabled size="lg" className="w-full">
          Sold out
        </Button>
        <p className="text-ink-muted mt-2 text-xs">
          Tell us you want it — we may craft another.{" "}
          <a className="text-brand-rose hover:underline" href="/contact">
            Notify me
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-stretch gap-3">
        <QuantityStepper
          value={qty}
          onChange={setQty}
          max={product.stockCount ?? 99}
        />
        <Button size="lg" onClick={onAdd} className="flex-1">
          {added ? (
            <>
              <Check className="h-4 w-4" />
              Added
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" />
              Add to cart
            </>
          )}
        </Button>
      </div>

      {product.stockCount != null && product.stockCount <= 5 && (
        <p className="text-brand-rose mt-3 text-xs font-medium">
          Only {product.stockCount} left in this batch
        </p>
      )}
    </div>
  );
}
