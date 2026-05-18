import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

export function Breadcrumbs({ crumbs, className }: { crumbs: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="text-ink-muted flex flex-wrap items-center gap-1">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="inline-flex items-center gap-1">
              {c.href && !last ? (
                <Link href={c.href} className="hover:text-brand-rose transition">
                  {c.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className="text-ink-charcoal">
                  {c.label}
                </span>
              )}
              {!last && <ChevronRight className="text-ink-subtle h-3.5 w-3.5" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
