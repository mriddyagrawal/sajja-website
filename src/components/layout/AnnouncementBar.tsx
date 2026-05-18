"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "sajja:dismissed-announcement";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (window.localStorage.getItem(STORAGE_KEY) === "1") {
      setDismissed(true);
    }
  }, []);

  if (mounted && dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // localStorage unavailable — fine
    }
  };

  return (
    <div className="bg-brand-rose text-ink-inverse relative">
      <div className="mx-auto flex max-w-[1280px] items-center justify-center gap-3 px-12 py-2 text-center text-[12px] tracking-[0.08em] sm:text-xs">
        <span className="hidden sm:inline-flex items-center gap-2">
          <span className="bg-brand-gold/80 h-1 w-1 rounded-full" aria-hidden />
          Free shipping across India on orders over ₹2000
          <span className="bg-brand-gold/80 h-1 w-1 rounded-full" aria-hidden />
          Crafted by hand, just for you
        </span>
        <span className="sm:hidden">Free shipping on orders over ₹2000</span>
      </div>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss announcement"
        className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
