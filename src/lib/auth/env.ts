/**
 * Auth environment helpers. Until the user creates a Clerk app and adds
 * NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY to .env.local, `isAuthConfigured`
 * reports false and `<AuthProvider>` becomes a passthrough so the app
 * still runs.
 */

export const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";

export const isAuthConfigured = Boolean(publishableKey);
