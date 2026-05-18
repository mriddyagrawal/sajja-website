import createImageUrlBuilder from "@sanity/image-url";
import type { Image as SanityImageRef } from "sanity";
import { dataset, projectId } from "./env";
import type { SanityImage } from "./types";

const builder = projectId
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

/**
 * Build an optimized Sanity image URL. Returns the raw URL untouched
 * if the input is already a plain string (e.g. mock data using Unsplash).
 */
export function urlFor(source: SanityImage | SanityImageRef | string): string {
  if (typeof source === "string") return source;
  if ("url" in source && typeof source.url === "string") return source.url;
  if (!builder) return "";
  return builder.image(source as SanityImageRef).url();
}

export function urlForSized(
  source: SanityImage | string,
  options: { w?: number; h?: number; q?: number } = {},
): string {
  const { w = 800, q = 75 } = options;
  if (typeof source === "string") return source;
  if (!builder) return source.url;
  // If our SanityImage already has a URL (mock), return it sized via query string when possible
  if (source.url && source.url.startsWith("http")) {
    const sep = source.url.includes("?") ? "&" : "?";
    return `${source.url}${sep}w=${w}&q=${q}&auto=format,compress`;
  }
  return builder.image(source.url).width(w).quality(q).url();
}
