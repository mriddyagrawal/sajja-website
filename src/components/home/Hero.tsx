import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Layered decorative background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="from-brand-rose-50 via-surface-cream to-surface-shell absolute inset-0 bg-gradient-to-br" />
        <div className="bg-brand-rose/15 absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full blur-3xl" />
        <div className="bg-brand-gold/20 absolute -right-32 -bottom-32 h-[420px] w-[420px] rounded-full blur-3xl" />
        <SubtlePattern className="absolute inset-0 h-full w-full opacity-[0.04]" />
      </div>

      <Container>
        <div className="relative grid items-center gap-10 py-20 sm:py-28 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-36">
          <div className="text-center lg:text-left">
            <p className="text-brand-rose mb-6 inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.3em] uppercase">
              <span className="bg-brand-gold inline-block h-px w-10" />
              Handcrafted. Heartfelt.
            </p>

            <h1 className="font-display text-ink-charcoal text-4xl leading-[1.05] tracking-[-0.01em] sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">The glitter</span>
              <span className="text-gradient-rose block italic">of every occasion</span>
            </h1>

            <p className="text-ink-muted mx-auto mt-7 max-w-md text-base leading-relaxed sm:text-lg lg:mx-0">
              Beautifully handcrafted décor, festive pieces and gifts — shaped, painted and finished
              by hand to make your celebrations a little more magical.
            </p>

            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-4 lg:items-start lg:justify-start">
              <Button size="lg" asChild>
                <Link href="/shop">
                  Explore the collection
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <Link href="/our-story">Read our story</Link>
              </Button>
            </div>

            <ul className="text-ink-muted mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs tracking-wide sm:text-[13px] lg:justify-start">
              <li className="inline-flex items-center gap-2">
                <Dot /> Made in India
              </li>
              <li className="inline-flex items-center gap-2">
                <Dot /> Ships nationwide
              </li>
              <li className="inline-flex items-center gap-2">
                <Dot /> Easy returns
              </li>
            </ul>
          </div>

          {/* Decorative card / hero visual placeholder */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="from-brand-rose to-brand-magenta border-brand-gold/40 shadow-lift relative aspect-[4/5] overflow-hidden rounded-[28px] border bg-gradient-to-br">
              {/* Inner ornament */}
              <div aria-hidden className="absolute inset-6 rounded-[20px] border border-white/20" />
              <Mandala className="absolute -top-20 -right-20 h-[360px] w-[360px] text-white/15" />
              <Mandala className="absolute -bottom-24 -left-24 h-[300px] w-[300px] text-white/10" />

              <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white">
                <div>
                  <p className="text-brand-gold-light text-[10px] font-medium tracking-[0.3em] uppercase">
                    Coming this season
                  </p>
                  <h2 className="font-display mt-4 text-3xl leading-tight italic sm:text-4xl">
                    The Diwali Edit
                  </h2>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/85">
                    Diyas, idols, torans and gifting — handpicked for the festival of lights.
                  </p>
                </div>

                <div className="flex items-end justify-between">
                  <div className="text-[11px] tracking-[0.2em] uppercase text-white/70">
                    Photography incoming
                  </div>
                  <Link
                    href="/shop"
                    className="border-brand-gold-light/60 text-brand-gold-light hover:bg-brand-gold-light hover:text-brand-magenta inline-flex h-10 items-center gap-2 rounded-full border px-4 text-xs font-medium tracking-wider uppercase transition"
                  >
                    Notify me
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Floating gold accent */}
            <div
              aria-hidden
              className="bg-brand-gold border-surface-cream absolute -top-4 -right-4 hidden h-20 w-20 rotate-12 items-center justify-center rounded-full border-4 text-center text-[10px] leading-tight font-semibold tracking-[0.15em] text-white uppercase sm:flex"
            >
              Crafted
              <br />
              by hand
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Dot() {
  return <span aria-hidden className="bg-brand-gold h-1 w-1 rounded-full" />;
}

function Mandala({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="0.6">
        <circle cx="100" cy="100" r="40" />
        <circle cx="100" cy="100" r="60" />
        <circle cx="100" cy="100" r="80" />
        <circle cx="100" cy="100" r="95" />
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * Math.PI) / 8;
          const x1 = 100 + Math.cos(angle) * 40;
          const y1 = 100 + Math.sin(angle) * 40;
          const x2 = 100 + Math.cos(angle) * 95;
          const y2 = 100 + Math.sin(angle) * 95;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * Math.PI) / 6;
          const cx = 100 + Math.cos(angle) * 70;
          const cy = 100 + Math.sin(angle) * 70;
          return <circle key={`p-${i}`} cx={cx} cy={cy} r="6" fill="currentColor" fillOpacity="0.3" />;
        })}
      </g>
    </svg>
  );
}

function SubtlePattern({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <pattern id="paisley-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1.2" fill="currentColor" className="text-brand-rose" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#paisley-dots)" />
    </svg>
  );
}
