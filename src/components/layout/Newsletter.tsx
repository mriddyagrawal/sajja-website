"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    // Wire to Resend audience in Phase 8
    setSubmitted(true);
  };

  return (
    <div className="bg-surface-shell border-border-default rounded-2xl border px-6 py-10 sm:px-12 sm:py-14">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-brand-rose mb-3 text-xs font-medium tracking-[0.22em] uppercase">
          Stay in the loop
        </p>
        <h3 className="font-display text-ink-charcoal text-3xl sm:text-4xl">
          Be the first to know
        </h3>
        <p className="text-ink-muted mx-auto mt-3 max-w-md text-[15px] leading-relaxed">
          New collections, festive launches, and a little 10% off your first order — straight to
          your inbox.
        </p>

        {submitted ? (
          <div className="bg-brand-rose-50 text-brand-rose border-border-rose mt-7 inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm">
            <Check className="h-4 w-4" />
            Thanks — keep an eye on your inbox.
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="text-ink-charcoal placeholder:text-ink-subtle border-border-strong focus:border-brand-rose focus:ring-brand-rose/20 h-12 flex-1 rounded-md border bg-white px-4 text-sm outline-none transition focus:ring-4"
            />
            <Button type="submit" size="lg" className="sm:w-auto">
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        )}

        <p className="text-ink-subtle mt-4 text-xs">
          By subscribing you agree to receive marketing emails. Unsubscribe any time.
        </p>
      </div>
    </div>
  );
}
