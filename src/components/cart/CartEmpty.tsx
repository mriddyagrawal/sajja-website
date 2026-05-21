import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

type CartEmptyProps = {
  className?: string;
  /** Variant tunes spacing/typography between drawer and full page. */
  variant?: "compact" | "wide";
  onAction?: () => void;
};

export function CartEmpty({ className, variant = "compact", onAction }: CartEmptyProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center text-center",
        variant === "compact" ? "px-6 py-14" : "py-24",
        className,
      )}
    >
      <span
        aria-hidden
        className="bg-brand-rose-50 text-brand-rose inline-flex h-16 w-16 items-center justify-center rounded-full"
      >
        <ShoppingBag className="h-7 w-7" />
      </span>

      <h2
        className={cn(
          "font-display text-ink-charcoal mt-5",
          variant === "compact" ? "text-2xl" : "text-3xl sm:text-4xl",
        )}
      >
        Your cart is empty
      </h2>
      <p className="text-ink-muted mx-auto mt-2 max-w-xs text-sm leading-relaxed">
        Save the pieces you love and they&apos;ll wait for you here.
      </p>

      <Link
        href="/shop"
        onClick={onAction}
        className="bg-brand-rose text-ink-inverse hover:bg-brand-magenta mt-7 inline-flex h-11 items-center gap-2 rounded-md px-5 text-sm font-medium transition"
      >
        Browse the shop
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
