import { cn } from "@/lib/utils";

export function Eyebrow({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "text-brand-rose inline-flex items-center gap-2 text-xs font-medium tracking-[0.22em] uppercase",
        className,
      )}
      {...rest}
    >
      <span aria-hidden className="bg-brand-gold inline-block h-px w-6" />
      {children}
    </span>
  );
}
