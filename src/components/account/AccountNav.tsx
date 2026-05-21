"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, MapPin, Package, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWishlistCount } from "@/lib/wishlist/hooks";

const navItems = [
  { href: "/account", label: "Profile", icon: User },
  { href: "/account/orders", label: "Orders", icon: Package },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
] as const;

export function AccountNav() {
  const pathname = usePathname();
  const wishlistCount = useWishlistCount();

  return (
    <nav aria-label="Account" className="lg:sticky lg:top-32">
      <ul className="border-border-default bg-surface-ivory flex gap-2 overflow-x-auto rounded-xl border p-2 lg:flex-col lg:gap-0.5 lg:overflow-visible">
        {navItems.map((item) => {
          const active =
            item.href === "/account"
              ? pathname === "/account"
              : pathname?.startsWith(item.href);
          const Icon = item.icon;
          const badge = item.href === "/account/wishlist" && wishlistCount > 0 ? wishlistCount : null;

          return (
            <li key={item.href} className="shrink-0 lg:shrink">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex w-full items-center gap-3 rounded-md px-3.5 py-2.5 text-sm transition",
                  active
                    ? "bg-brand-rose-50 text-brand-rose font-medium"
                    : "text-ink-default hover:bg-surface-shell",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="flex-1 whitespace-nowrap">{item.label}</span>
                {badge !== null && (
                  <span
                    aria-hidden
                    className={cn(
                      "inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-semibold tabular-nums",
                      active ? "bg-brand-rose text-ink-inverse" : "bg-surface-shell text-ink-default",
                    )}
                  >
                    {badge}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
