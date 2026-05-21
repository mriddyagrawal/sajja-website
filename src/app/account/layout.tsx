import type { ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/product/Breadcrumbs";
import { AccountNav } from "@/components/account/AccountNav";

export const metadata = {
  title: "Account",
  robots: { index: false, follow: false },
};

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <Section spacing="tight" className="pt-10 sm:pt-14">
      <Container>
        <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "Account" }]} />
        <h1 className="font-display text-ink-charcoal mt-6 text-4xl tracking-[-0.01em] sm:text-5xl">
          Your account
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-12">
          <AccountNav />
          <div>{children}</div>
        </div>
      </Container>
    </Section>
  );
}
