"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

import { useWishlistCount } from "@/lib/wishlist/hooks";
import { cn } from "@/lib/utils";

export function WishlistIcon({ className }: { className?: string }) {
  const count = useWishlistCount();
  const label = count > 0 ? `Wishlist, ${count} saved` : "Wishlist";

  return (
    <Link
      href="/account/wishlist"
      aria-label={label}
      className={cn(
        "text-ink-default hover:bg-surface-shell relative inline-flex h-10 w-10 items-center justify-center rounded-md transition",
        className,
      )}
    >
      <Heart className="h-5 w-5" />
      {count > 0 && (
        <span
          aria-hidden
          className="bg-brand-rose text-ink-inverse absolute top-1 right-1 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] font-semibold tabular-nums"
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
