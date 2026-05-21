import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { isAuthConfigured } from "@/lib/auth/env";

type AuthGateProps = {
  /** Section title — e.g. "Orders", "Addresses". */
  feature: string;
  blurb?: string;
};

/**
 * Used by /account/orders, /account/addresses, /account profile until
 * we either (a) have Clerk wired and the user is signed in, or
 * (b) Phase 4 lands and there's actual data to show.
 */
export function AuthGate({ feature, blurb }: AuthGateProps) {
  const message = isAuthConfigured
    ? `Sign in to view your ${feature.toLowerCase()}.`
    : `${feature} unlock once we wire up accounts. Until then, your wishlist is saved on this device.`;

  return (
    <div className="border-border-default rounded-2xl border border-dashed py-16 px-6 text-center sm:py-20">
      <span
        aria-hidden
        className="bg-surface-shell text-ink-muted inline-flex h-12 w-12 items-center justify-center rounded-full"
      >
        <Lock className="h-5 w-5" />
      </span>
      <h2 className="font-display text-ink-charcoal mt-5 text-2xl sm:text-3xl">
        {feature} {isAuthConfigured ? "are gated" : "coming soon"}
      </h2>
      <p className="text-ink-muted mx-auto mt-2 max-w-md text-sm leading-relaxed">
        {blurb ?? message}
      </p>

      {isAuthConfigured ? (
        <Link
          href="/sign-in"
          className="bg-brand-rose text-ink-inverse hover:bg-brand-magenta mt-6 inline-flex h-11 items-center gap-2 rounded-md px-5 text-sm font-medium"
        >
          Sign in
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : (
        <Link
          href="/shop"
          className="text-brand-rose hover:text-brand-magenta mt-6 inline-flex items-center gap-2 text-sm font-medium"
        >
          Keep shopping
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
