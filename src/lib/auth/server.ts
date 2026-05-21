import "server-only";
import { isAuthConfigured } from "./env";

/**
 * Server-side auth helpers. Centralizes the "is anyone signed in?"
 * check so pages don't need to know whether Clerk is wired or not.
 *
 * When Clerk isn't configured, all routes are treated as unauthenticated
 * (no errors, no crashes, just no signed-in user). When Clerk IS
 * configured, this calls Clerk's `auth()` from a server component.
 */

export type AuthUser = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
};

export async function getAuthUser(): Promise<AuthUser | null> {
  if (!isAuthConfigured) return null;

  // Dynamic import keeps Clerk out of the bundle when not configured.
  const { currentUser } = await import("@clerk/nextjs/server");
  const user = await currentUser();
  if (!user) return null;

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.emailAddresses[0]?.emailAddress ?? null,
  };
}
