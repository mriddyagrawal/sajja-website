import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { isAuthConfigured } from "./env";

/**
 * Wraps the app in Clerk when configured. When NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
 * isn't set, renders children directly — useful during early dev so the
 * site still works.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  if (!isAuthConfigured) return <>{children}</>;

  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#b43a6b",
          colorBackground: "#fbf6ee",
          colorText: "#231c1f",
          colorTextSecondary: "#6b5c61",
          colorInputBackground: "#ffffff",
          fontFamily: "var(--font-body)",
          borderRadius: "0.5rem",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
