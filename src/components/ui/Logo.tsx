import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

export function Logo({ className, width = 220, height = 220, priority }: LogoProps) {
  return (
    <Image
      src="/sajja-logo.png"
      alt="Sajja — Glitter of occasion"
      width={width}
      height={height}
      priority={priority}
      sizes="(max-width: 640px) 160px, 220px"
      className={cn("w-auto select-none", className)}
    />
  );
}
