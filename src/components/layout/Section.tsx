import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  as?: "section" | "div" | "article";
  spacing?: "tight" | "default" | "loose";
};

const spacingMap: Record<NonNullable<SectionProps["spacing"]>, string> = {
  tight: "py-10 sm:py-14",
  default: "py-16 sm:py-20 lg:py-24",
  loose: "py-20 sm:py-28 lg:py-32",
};

export function Section({
  as: Component = "section",
  spacing = "default",
  className,
  ...rest
}: SectionProps) {
  return <Component className={cn(spacingMap[spacing], className)} {...rest} />;
}
