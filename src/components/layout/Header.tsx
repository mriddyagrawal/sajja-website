"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, Search, User } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Logo } from "@/components/ui/Logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet";
import { CartIcon } from "@/components/cart/CartIcon";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WishlistIcon } from "@/components/cart/WishlistIcon";
import { primaryNav } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeSearch = () => {
    setSearchOpen(false);
    searchTriggerRef.current?.focus();
  };

  return (
    <header className="sticky top-0 z-30">
      <AnnouncementBar />

      <div
        className={cn(
          "bg-surface-cream/95 supports-[backdrop-filter]:bg-surface-cream/80 border-b border-transparent backdrop-blur transition-all duration-200",
          scrolled && "border-border-default shadow-soft",
        )}
      >
        <Container>
          <div
            className={cn(
              "grid grid-cols-[1fr_auto_1fr] items-center transition-all",
              scrolled ? "h-16" : "h-20",
            )}
          >
            {/* Left: mobile menu + search */}
            <div className="flex items-center gap-1">
              <Sheet>
                <SheetTrigger
                  aria-label="Open menu"
                  className="text-ink-default hover:bg-surface-shell inline-flex h-10 w-10 items-center justify-center rounded-md transition lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                  <SheetHeader>
                    <SheetTitle>Browse Sajja</SheetTitle>
                  </SheetHeader>
                  <nav className="flex-1 overflow-y-auto px-2 py-4" aria-label="Mobile">
                    <ul className="flex flex-col">
                      {primaryNav.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className={cn(
                              "hover:bg-surface-shell flex items-center justify-between rounded-md px-4 py-3 text-base transition",
                              item.highlight && "text-brand-rose font-medium",
                            )}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <div className="border-border-default text-ink-muted border-t px-6 py-4 text-xs">
                    Crafted with care in India · WhatsApp support available
                  </div>
                </SheetContent>
              </Sheet>

              <button
                ref={searchTriggerRef}
                type="button"
                onClick={() => setSearchOpen((v) => !v)}
                aria-label="Search"
                aria-expanded={searchOpen}
                className="text-ink-default hover:bg-surface-shell inline-flex h-10 w-10 items-center justify-center rounded-md transition"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>

            {/* Center: logo */}
            <Link
              href="/"
              aria-label="Sajja — Home"
              className="flex items-center justify-center"
            >
              <Logo
                priority
                width={200}
                height={80}
                className={cn(
                  "transition-all duration-300",
                  scrolled ? "h-10" : "h-12 sm:h-14",
                )}
              />
            </Link>

            {/* Right: account, wishlist, cart */}
            <div className="flex items-center justify-end gap-1">
              <Link
                href="/account"
                aria-label="Account"
                className="text-ink-default hover:bg-surface-shell hidden h-10 w-10 items-center justify-center rounded-md transition sm:inline-flex"
              >
                <User className="h-5 w-5" />
              </Link>
              <WishlistIcon className="hidden sm:inline-flex" />
              <CartIcon />
            </div>
          </div>

          {/* Expandable search */}
          {searchOpen && (
            <div className="border-border-default border-t py-3">
              <form
                role="search"
                onSubmit={(e) => e.preventDefault()}
                onKeyDown={(e) => {
                  if (e.key === "Escape") closeSearch();
                }}
                className="mx-auto flex max-w-2xl items-center gap-3"
              >
                <Search className="text-ink-muted h-5 w-5" />
                <input
                  type="search"
                  placeholder="Search for diyas, gifts, décor…"
                  autoFocus
                  className="text-ink-charcoal placeholder:text-ink-subtle flex-1 bg-transparent text-base outline-none"
                />
                <button
                  type="button"
                  onClick={closeSearch}
                  className="text-ink-muted hover:text-ink-charcoal text-xs uppercase tracking-wider transition"
                >
                  Close
                </button>
              </form>
            </div>
          )}
        </Container>

        {/* Category nav (desktop) */}
        <div className="border-border-default hidden border-t lg:block">
          <Container>
            <nav aria-label="Primary" className="flex h-11 items-center justify-center">
              <ul className="flex items-center gap-8">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "text-ink-default hover:text-brand-rose relative text-[13px] font-medium tracking-wide transition-colors",
                        item.highlight && "text-brand-rose",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Container>
        </div>
      </div>

      <CartDrawer />
    </header>
  );
}
