import { cn } from "@/lib/utils";

type DividerProps = {
  className?: string;
  variant?: "line" | "ornate";
};

export function Divider({ className, variant = "line" }: DividerProps) {
  if (variant === "ornate") {
    return (
      <div className={cn("flex items-center justify-center gap-3", className)} aria-hidden>
        <span className="from-brand-gold/0 via-brand-gold to-brand-gold/0 h-px w-20 bg-gradient-to-r" />
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="text-brand-gold"
        >
          <path
            d="M7 1L8.5 5.5L13 7L8.5 8.5L7 13L5.5 8.5L1 7L5.5 5.5L7 1Z"
            fill="currentColor"
          />
        </svg>
        <span className="from-brand-gold via-brand-gold to-brand-gold/0 h-px w-20 bg-gradient-to-r" />
      </div>
    );
  }

  return <div className={cn("divider-gold", className)} aria-hidden />;
}
