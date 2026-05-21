import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/product/Breadcrumbs";
import { CartPageBody } from "@/components/cart/CartPageBody";

export const metadata = {
  title: "Your cart",
  description: "Review your handcrafted finds before checkout.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <Section spacing="tight" className="pt-10 sm:pt-14">
      <Container>
        <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "Your cart" }]} />
        <h1 className="font-display text-ink-charcoal mt-6 text-4xl tracking-[-0.01em] sm:text-5xl">
          Your cart
        </h1>

        <CartPageBody />
      </Container>
    </Section>
  );
}
