export type NavLink = {
  label: string;
  href: string;
  highlight?: boolean;
};

export const primaryNav: NavLink[] = [
  { label: "Shop All", href: "/shop" },
  { label: "Décor", href: "/shop/decor" },
  { label: "Pooja & Festive", href: "/shop/pooja-festive" },
  { label: "Gifting", href: "/shop/gifting" },
  { label: "New Arrivals", href: "/shop/new-arrivals" },
  { label: "Sale", href: "/shop/sale", highlight: true },
  { label: "Our Story", href: "/our-story" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  shop: [
    { label: "All Products", href: "/shop" },
    { label: "New Arrivals", href: "/shop/new-arrivals" },
    { label: "Bestsellers", href: "/shop/bestsellers" },
    { label: "Sale", href: "/shop/sale" },
    { label: "Gift Cards", href: "/gift-cards" },
  ],
  help: [
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Shipping", href: "/shipping-policy" },
    { label: "Returns & Refunds", href: "/refund-policy" },
    { label: "Order Tracking", href: "/track" },
    { label: "Size Guide", href: "/size-guide" },
  ],
  company: [
    { label: "Our Story", href: "/our-story" },
    { label: "Craftsmanship", href: "/craftsmanship" },
    { label: "Wholesale", href: "/wholesale" },
    { label: "Press", href: "/press" },
  ],
};

export const socialLinks = {
  instagram: "https://instagram.com/sajja",
  facebook: "https://facebook.com/sajja",
  pinterest: "https://pinterest.com/sajja",
  whatsapp: "https://wa.me/911234567890",
};

export const siteConfig = {
  name: "Sajja",
  tagline: "Glitter of occasion",
  description:
    "Handcrafted Indian décor, festive pieces, and gifts — made with care, made for occasions.",
  url: "https://sajja.in",
  email: "hello@sajja.in",
  phone: "+91 12345 67890",
  whatsapp: socialLinks.whatsapp,
  shippingThreshold: 2000,
};
