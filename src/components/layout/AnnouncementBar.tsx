"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "sajja:dismissed-announcement";

/**
 * Subscribe to changes in our localStorage key so the bar reacts to other
 * tabs dismissing the announcement.
 */
function subscribe(callback: () => void) {
  const handler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) === "1";
}

function getServerSnapshot() {
  // On SSR we don't know — render visible. Client effect will hide if dismissed.
  return false;
}

export function AnnouncementBar() {
  const storedDismissed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [localDismissed, setLocalDismissed] = useState(false);

  const dismissed = storedDismissed || localDismissed;

  const handleDismiss = useCallback(() => {
    setLocalDismissed(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // localStorage unavailable — fine
    }
  }, []);

  if (dismissed) return null;

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
