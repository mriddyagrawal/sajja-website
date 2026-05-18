import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Divider } from "@/components/layout/Divider";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Style guide",
  robots: { index: false, follow: false },
};

const colorGroups = [
  {
    name: "Brand",
    tokens: [
      { name: "brand-rose", hex: "#b43a6b" },
      { name: "brand-magenta", hex: "#8e2a57" },
      { name: "brand-coral", hex: "#e27a5f" },
      { name: "brand-gold", hex: "#c9a24a" },
      { name: "brand-gold-light", hex: "#e6cd91" },
      { name: "brand-gold-dark", hex: "#9c7b34" },
    ],
  },
  {
    name: "Surface",
    tokens: [
      { name: "surface-cream", hex: "#fbf6ee" },
      { name: "surface-cream-dark", hex: "#f3eada" },
      { name: "surface-shell", hex: "#f8efe5" },
      { name: "surface-ivory", hex: "#ffffff" },
    ],
  },
  {
    name: "Ink",
    tokens: [
      { name: "ink-charcoal", hex: "#231c1f" },
      { name: "ink-default", hex: "#2a2226" },
      { name: "ink-muted", hex: "#6b5c61" },
      { name: "ink-subtle", hex: "#9a8a90" },
    ],
  },
];

export default function StyleGuidePage() {
  return (
    <>
      <Section spacing="tight">
        <Container>
          <Eyebrow>Internal · Phase 0</Eyebrow>
          <h1 className="font-display text-ink-charcoal mt-4 text-4xl sm:text-5xl">
            Sajja style guide
          </h1>
          <p className="text-ink-muted mt-3 max-w-2xl text-base">
            Live reference for design tokens and components. Used during development to catch
            regressions and to align with the brand. Not indexed.
          </p>
        </Container>
      </Section>

      <Section spacing="tight">
        <Container>
          <h2 className="font-display text-ink-charcoal text-2xl">Colors</h2>
          <Divider className="mt-3 mb-8" />
          <div className="space-y-10">
            {colorGroups.map((group) => (
              <div key={group.name}>
                <h3 className="text-ink-muted mb-4 text-xs font-semibold tracking-[0.22em] uppercase">
                  {group.name}
                </h3>
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                  {group.tokens.map((t) => (
                    <li
                      key={t.name}
                      className="border-border-default overflow-hidden rounded-lg border bg-white"
                    >
                      <div className="h-20" style={{ backgroundColor: t.hex }} />
                      <div className="px-3 py-2">
                        <p className="text-ink-charcoal text-xs font-medium">{t.name}</p>
                        <p className="text-ink-muted font-mono text-[10px] uppercase">{t.hex}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="tight">
        <Container>
          <h2 className="font-display text-ink-charcoal text-2xl">Typography</h2>
          <Divider className="mt-3 mb-8" />
          <div className="space-y-6">
            <div>
              <p className="text-ink-muted mb-2 text-xs tracking-[0.22em] uppercase">Display · Cormorant Garamond</p>
              <p className="font-display text-ink-charcoal text-6xl">The glitter of every occasion</p>
            </div>
            <div>
              <p className="text-ink-muted mb-2 text-xs tracking-[0.22em] uppercase">H2 · 4xl</p>
              <h2 className="font-display text-ink-charcoal text-4xl">Made by hand, made for you</h2>
            </div>
            <div>
              <p className="text-ink-muted mb-2 text-xs tracking-[0.22em] uppercase">Body · Inter</p>
              <p className="text-ink-default max-w-2xl text-base leading-relaxed">
                Every Sajja piece is shaped, painted and finished by a real artisan — never
                mass-produced. Considered materials, slow craft, things meant to be kept.
              </p>
            </div>
            <div>
              <p className="text-ink-muted mb-2 text-xs tracking-[0.22em] uppercase">Script · Tangerine</p>
              <p className="font-script text-brand-rose text-5xl">our story</p>
            </div>
            <div>
              <p className="text-ink-muted mb-2 text-xs tracking-[0.22em] uppercase">Eyebrow</p>
              <Eyebrow>Shop by category</Eyebrow>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="tight">
        <Container>
          <h2 className="font-display text-ink-charcoal text-2xl">Buttons</h2>
          <Divider className="mt-3 mb-8" />
          <div className="flex flex-wrap items-center gap-4">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="gold">Gold</Button>
            <Button variant="link">Link style</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button>Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </Container>
      </Section>

      <Section spacing="tight">
        <Container>
          <h2 className="font-display text-ink-charcoal text-2xl">Dividers</h2>
          <Divider className="mt-3 mb-8" />
          <div className="space-y-10">
            <Divider />
            <Divider variant="ornate" />
          </div>
        </Container>
      </Section>

      <Section spacing="tight">
        <Container>
          <h2 className="font-display text-ink-charcoal text-2xl">Form controls</h2>
          <Divider className="mt-3 mb-8" />
          <div className="grid max-w-md gap-4">
            <label className="text-ink-default text-sm">
              Email
              <input
                type="email"
                placeholder="you@example.com"
                className="text-ink-charcoal placeholder:text-ink-subtle border-border-strong focus:border-brand-rose focus:ring-brand-rose/20 mt-1 block h-11 w-full rounded-md border bg-white px-3 text-sm outline-none focus:ring-4"
              />
            </label>
          </div>
        </Container>
      </Section>
    </>
  );
}
