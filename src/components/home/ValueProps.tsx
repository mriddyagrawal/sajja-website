import { Gem, Leaf, Truck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

const values = [
  {
    icon: Gem,
    title: "Made by hand",
    body: "Every piece is shaped, painted and finished by a real artisan — never mass-produced.",
  },
  {
    icon: Leaf,
    title: "Considered materials",
    body: "Brass, terracotta, fabric and wood — sourced locally and chosen to last for years.",
  },
  {
    icon: Truck,
    title: "Delivered with care",
    body: "Hand-packed orders shipped across India in 3–5 days. Free above ₹2000.",
  },
];

export function ValueProps() {
  return (
    <Section spacing="tight" className="border-border-default bg-surface-cream border-y">
      <Container>
        <ul className="grid gap-10 sm:grid-cols-3">
          {values.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <div className="bg-brand-rose-50 text-brand-rose mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-ink-charcoal text-xl">{title}</h3>
              <p className="text-ink-muted mt-2 max-w-xs text-sm leading-relaxed">{body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
