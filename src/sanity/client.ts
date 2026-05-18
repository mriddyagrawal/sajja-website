import { createClient } from "next-sanity";
import { apiVersion, dataset, isConfigured, projectId, readToken } from "./env";

/**
 * Sanity client. Returns `null` when no project is configured so callers
 * fall back to mock data. Once `NEXT_PUBLIC_SANITY_PROJECT_ID` is set
 * in `.env.local`, this becomes a real client.
 */
export const sanityClient = isConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === "production",
      token: readToken,
      perspective: "published",
    })
  : null;
