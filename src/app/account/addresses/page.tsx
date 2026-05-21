import { AuthGate } from "@/components/account/AuthGate";

export const metadata = {
  title: "Addresses",
  robots: { index: false, follow: false },
};

export default function AddressesPage() {
  return (
    <AuthGate
      feature="Addresses"
      blurb="Save shipping addresses for faster checkout. Available once accounts are wired up."
    />
  );
}
