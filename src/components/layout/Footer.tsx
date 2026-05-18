import Link from "next/link";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Divider } from "@/components/layout/Divider";
import { Newsletter } from "@/components/layout/Newsletter";
import { Logo } from "@/components/ui/Logo";
import { footerNav, siteConfig, socialLinks } from "@/lib/nav";

function PinterestIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden fill="currentColor" {...props}>
      <path d="M12 0a12 12 0 0 0-4.37 23.17c-.06-.94-.11-2.4.02-3.43.13-.93 1.2-5.96 1.2-5.96s-.31-.63-.31-1.55c0-1.45.84-2.54 1.89-2.54.89 0 1.32.67 1.32 1.47 0 .9-.57 2.24-.87 3.49-.24 1.04.52 1.89 1.55 1.89 1.86 0 3.29-1.96 3.29-4.79 0-2.5-1.8-4.25-4.37-4.25-2.98 0-4.72 2.23-4.72 4.53 0 .9.34 1.86.77 2.39.08.1.1.19.07.29-.08.32-.25 1.04-.29 1.18-.05.19-.15.23-.35.14-1.31-.61-2.13-2.52-2.13-4.06 0-3.3 2.4-6.34 6.92-6.34 3.63 0 6.46 2.59 6.46 6.05 0 3.61-2.28 6.52-5.44 6.52-1.06 0-2.06-.55-2.4-1.21l-.65 2.5c-.24.91-.88 2.05-1.31 2.75A12 12 0 1 0 12 0z" />
    </svg>
  );
}

const payments = [
  { label: "UPI", color: "#5f259f" },
  { label: "Visa", color: "#1a1f71" },
  { label: "Mastercard", color: "#eb001b" },
  { label: "RuPay", color: "#0a4a8c" },
  { label: "COD", color: "#231c1f" },
];

export function Footer() {
  return (
    <footer className="bg-surface-cream-dark mt-20">
      <Container>
        {/* Newsletter band — overlaps the top edge */}
        <div className="-mt-12 sm:-mt-16">
          <Newsletter />
        </div>

        <div className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" aria-label="Sajja — Home" className="inline-block">
              <Logo width={150} height={56} className="h-12" />
            </Link>
            <p className="text-ink-muted mt-5 max-w-xs text-sm leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-ink-default hover:text-brand-rose border-border-strong inline-flex h-9 w-9 items-center justify-center rounded-full border transition hover:border-current"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-ink-default hover:text-brand-rose border-border-strong inline-flex h-9 w-9 items-center justify-center rounded-full border transition hover:border-current"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href={socialLinks.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="text-ink-default hover:text-brand-rose border-border-strong inline-flex h-9 w-9 items-center justify-center rounded-full border transition hover:border-current"
              >
                <PinterestIcon className="h-4 w-4" />
              </Link>
              <Link
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-ink-default hover:text-brand-rose border-border-strong inline-flex h-9 w-9 items-center justify-center rounded-full border transition hover:border-current"
              >
                <MessageCircle className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Shop column */}
          <FooterColumn title="Shop" links={footerNav.shop} />

          {/* Help column */}
          <FooterColumn title="Help" links={footerNav.help} />

          {/* Company column */}
          <FooterColumn title="Company" links={footerNav.company} />
        </div>

        <Divider variant="line" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-6 py-8 text-xs md:flex-row md:justify-between">
          <p className="text-ink-muted text-center md:text-left">
            © {new Date().getFullYear()} {siteConfig.name}. Made with care in India.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/privacy-policy" className="text-ink-muted hover:text-ink-charcoal transition">
              Privacy
            </Link>
            <Link href="/terms-of-service" className="text-ink-muted hover:text-ink-charcoal transition">
              Terms
            </Link>
            <Link href="/refund-policy" className="text-ink-muted hover:text-ink-charcoal transition">
              Refunds
            </Link>
          </div>

          <ul aria-label="Payment methods accepted" className="flex flex-wrap items-center gap-2">
            {payments.map((p) => (
              <li
                key={p.label}
                style={{ color: p.color }}
                className="border-border-default bg-surface-ivory inline-flex h-6 items-center rounded border px-2 text-[10px] font-semibold tracking-wider uppercase"
              >
                {p.label}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-brand-rose text-xs font-semibold tracking-[0.22em] uppercase">
        {title}
      </h4>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-ink-default hover:text-brand-rose text-sm transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
