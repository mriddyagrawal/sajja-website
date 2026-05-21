"use client";

import { ShoppingBag } from "lucide-react";

import { useCartCount } from "@/lib/cart/hooks";
import { useCartStore } from "@/lib/cart/store";
import { cn } from "@/lib/utils";

/**
 * Header cart icon. Toggles the drawer on click and shows a count badge.
 * The bag bounces briefly when something is added — we remount the icon
 * with a `key={pulseKey}` so the CSS animation restarts on each add
 * (no setState in an effect required).
 */
export function CartIcon({ className }: { className?: string }) {
  const count = useCartCount();
  const open = useCartStore((s) => s.open);
  const pulseKey = useCartStore((s) => s.pulseKey);

  const label =
    count > 0 ? `Cart, ${count} ${count === 1 ? "item" : "items"}` : "Cart, empty";

  return (
    <button
      type="button"
      onClick={open}
      aria-label={label}
      className={cn(
        "text-ink-default hover:bg-surface-shell relative inline-flex h-10 w-10 items-center justify-center rounded-md transition",
        className,
      )}
    >
      <ShoppingBag
        key={pulseKey}
        className={cn(
          "h-5 w-5",
          pulseKey > 0 && "animate-[cart-bounce_0.5s_ease-in-out]",
        )}
      />
      {count > 0 && (
        <span
          aria-hidden
          className="bg-brand-rose text-ink-inverse absolute top-1 right-1 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] font-semibold tabular-nums"
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
