import { WishlistContent } from "@/components/account/WishlistContent";

export const metadata = {
  title: "Wishlist",
  robots: { index: false, follow: false },
};

export default function WishlistPage() {
  return (
    <section aria-label="Wishlist">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-display text-ink-charcoal text-2xl">Your wishlist</h2>
        <p className="text-ink-muted text-xs">Saved on this device · {/* count appears in nav */}</p>
      </div>

      <div className="mt-6">
        <WishlistContent />
      </div>
    </section>
  );
}
