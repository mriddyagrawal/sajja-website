/**
 * Sanity environment configuration.
 *
 * Until the user creates a real Sanity project and populates `.env.local`,
 * this module reports `isConfigured = false` and downstream code falls back
 * to the mock data in `./mock.ts`.
 */

export const apiVersion = "2025-01-15";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";

export const readToken = process.env.SANITY_API_READ_TOKEN;

export const studioBasePath = "/studio";

export const isConfigured = Boolean(projectId);
