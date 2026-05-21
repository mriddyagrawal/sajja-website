import { AuthGate } from "@/components/account/AuthGate";
import { getAuthUser } from "@/lib/auth/server";

export const metadata = {
  title: "Profile",
  robots: { index: false, follow: false },
};

export default async function ProfilePage() {
  const user = await getAuthUser();

  if (!user) {
    return (
      <AuthGate
        feature="Profile"
        blurb="Sign in to manage your name, contact details, and preferences. Until then, your wishlist still works — saved on this device."
      />
    );
  }

  return (
    <section aria-label="Profile">
      <h2 className="font-display text-ink-charcoal text-2xl">
        Welcome, {user.firstName ?? "friend"}
      </h2>
      <p className="text-ink-muted mt-2 text-sm">
        Manage your profile, addresses, and orders.
      </p>

      <dl className="border-border-default mt-8 grid divide-y rounded-2xl border bg-white sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <Field label="Name">
          {[user.firstName, user.lastName].filter(Boolean).join(" ") || "—"}
        </Field>
        <Field label="Email">{user.email ?? "—"}</Field>
      </dl>

      <p className="text-ink-subtle mt-4 text-xs">
        Edit profile and account settings coming with Phase 3 polish.
      </p>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="p-5">
      <dt className="text-ink-muted text-[11px] tracking-[0.22em] uppercase">{label}</dt>
      <dd className="text-ink-charcoal mt-1 text-sm">{children}</dd>
    </div>
  );
}
