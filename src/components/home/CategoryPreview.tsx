import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/layout/Eyebrow";

type Category = {
  title: string;
  href: string;
  blurb: string;
  hue: "rose" | "coral" | "gold" | "magenta";
};

const categories: Category[] = [
  {
    title: "Décor",
    href: "/shop/decor",
    blurb: "Statement pieces for your home — painted, sculpted and gilded.",
    hue: "rose",
  },
  {
    title: "Pooja & Festive",
    href: "/shop/pooja-festive",
    blurb: "Diyas, idols and torans for every celebration in the calendar.",
    hue: "gold",
  },
  {
    title: "Gifting",
    href: "/shop/gifting",
    blurb: "Bundled, boxed and ready to give — for the people you love most.",
    hue: "coral",
  },
  {
    title: "New Arrivals",
    href: "/shop/new-arrivals",
    blurb: "Just off the workbench — the latest pieces, fresh from the studio.",
    hue: "magenta",
  },
];

const hueStyles: Record<Category["hue"], string> = {
  rose: "from-brand-rose-100 to-brand-rose-200",
  coral: "from-brand-coral-light to-brand-coral/40",
  gold: "from-brand-gold-light to-brand-gold/40",
  magenta: "from-brand-rose-200 to-brand-magenta/30",
};

export function CategoryPreview() {
  return (
    <Section>
      <Container>
        <div className="mb-12 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Shop by category</Eyebrow>
            <h2 className="font-display text-ink-charcoal mt-4 text-3xl sm:text-4xl">
              Four collections, one feeling
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-brand-rose hover:text-brand-magenta inline-flex items-center gap-2 text-sm font-medium tracking-wide transition"
          >
            See everything
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <li key={cat.href}>
              <Link
                href={cat.href}
                className="group hover:shadow-lift relative block aspect-[3/4] overflow-hidden rounded-2xl border border-white/40 transition-all duration-300"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${hueStyles[cat.hue]} transition-transform duration-500 group-hover:scale-105`}
                />
                <Ornament className="absolute -top-10 -right-10 h-44 w-44 text-white/30 transition-transform duration-700 group-hover:rotate-12" />
                <div className="relative flex h-full flex-col justify-end p-6">
                  <h3 className="font-display text-ink-charcoal text-2xl sm:text-3xl">
                    {cat.title}
                  </h3>
                  <p className="text-ink-charcoal/75 mt-2 max-w-[18ch] text-sm leading-snug">
                    {cat.blurb}
                  </p>
                  <span className="text-brand-rose-700 mt-4 inline-flex items-center gap-1 text-xs font-semibold tracking-[0.15em] uppercase">
                    Shop now
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function Ornament({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="0.8" fill="none">
        <circle cx="100" cy="100" r="80" />
        <circle cx="100" cy="100" r="60" />
        <circle cx="100" cy="100" r="40" />
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * Math.PI) / 6;
          return (
            <ellipse
              key={i}
              cx={100 + Math.cos(angle) * 70}
              cy={100 + Math.sin(angle) * 70}
              rx="14"
              ry="6"
              transform={`rotate(${(angle * 180) / Math.PI} ${100 + Math.cos(angle) * 70} ${100 + Math.sin(angle) * 70})`}
            />
          );
        })}
      </g>
    </svg>
  );
}
