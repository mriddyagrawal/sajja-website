import { AuthGate } from "@/components/account/AuthGate";

export const metadata = {
  title: "Orders",
  robots: { index: false, follow: false },
};

export default function OrdersPage() {
  return (
    <AuthGate
      feature="Orders"
      blurb="Your order history will live here. Lands in Phase 4 when checkout goes live."
    />
  );
}
