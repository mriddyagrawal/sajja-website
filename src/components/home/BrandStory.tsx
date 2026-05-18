import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Divider } from "@/components/layout/Divider";

export function BrandStory() {
  return (
    <Section className="bg-surface-shell relative overflow-hidden">
      <div aria-hidden className="bg-brand-gold/10 absolute -right-32 -bottom-32 h-96 w-96 rounded-full blur-3xl" />
      <Container size="narrow" className="relative">
        <div className="text-center">
          <p className="font-script text-brand-rose mb-2 text-3xl sm:text-4xl">our story</p>
          <Divider variant="ornate" className="mx-auto" />

          <h2 className="font-display text-ink-charcoal mt-8 text-3xl leading-tight sm:text-4xl md:text-5xl">
            Made for moments,{" "}
            <span className="italic">passed down</span> through hands
          </h2>

          <p className="text-ink-default mx-auto mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
            Sajja began at a kitchen table with a single brass diya and an afternoon of paint.
            Today, every piece in our collection is still finished by hand — small details,
            slow craft, things meant to be kept.
          </p>

          <div className="mt-10 inline-flex">
            <Link
              href="/our-story"
              className="text-brand-rose hover:text-brand-magenta inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase transition"
            >
              Meet the maker
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
