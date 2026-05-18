"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { urlForSized } from "@/sanity/image";
import type { SanityImage } from "@/sanity/types";

type ImageGalleryProps = {
  images: SanityImage[];
  title: string;
};

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [active, setActive] = useState(0);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length]);

  const current = images[active];

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[88px_1fr]">
      {/* Thumbnails — vertical on desktop, horizontal on mobile (after main image) */}
      <ol className="order-2 flex gap-2 overflow-x-auto lg:order-1 lg:flex-col lg:overflow-visible">
        {images.map((img, i) => (
          <li key={i} className="shrink-0">
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1} of ${images.length}`}
              aria-current={i === active}
              className={cn(
                "bg-surface-shell relative block aspect-square w-20 overflow-hidden rounded-md transition lg:w-full",
                i === active
                  ? "outline-brand-rose outline-2 outline-offset-2"
                  : "opacity-70 hover:opacity-100",
              )}
            >
              <Image
                src={urlForSized(img, { w: 200, q: 60 })}
                alt={img.alt || `${title} — image ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          </li>
        ))}
      </ol>

      {/* Main image */}
      <div className="bg-surface-shell relative order-1 aspect-square overflow-hidden rounded-2xl lg:order-2">
        {current && (
          <Image
            src={urlForSized(current, { w: 1400, q: 80 })}
            alt={current.alt || title}
            fill
            sizes="(max-width: 1024px) 100vw, 700px"
            priority
            className="object-cover"
          />
        )}

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => setActive((i) => (i - 1 + images.length) % images.length)}
              className="text-ink-charcoal hover:bg-surface-cream absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-white/85 p-2 opacity-0 backdrop-blur-sm transition focus-visible:opacity-100 group-hover:opacity-100 sm:opacity-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => setActive((i) => (i + 1) % images.length)}
              className="text-ink-charcoal hover:bg-surface-cream absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-white/85 p-2 opacity-0 backdrop-blur-sm transition focus-visible:opacity-100 group-hover:opacity-100 sm:opacity-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <span className="bg-ink-charcoal/70 text-ink-inverse absolute right-3 bottom-3 rounded-full px-2.5 py-0.5 text-[11px] tracking-wide tabular-nums">
              {active + 1} / {images.length}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
