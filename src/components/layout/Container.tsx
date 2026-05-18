import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "default" | "wide" | "narrow";
};

const sizes: Record<NonNullable<ContainerProps["size"]>, string> = {
  default: "max-w-[1280px]",
  wide: "max-w-[1440px]",
  narrow: "max-w-[880px]",
};

export function Container({ className, size = "default", ...rest }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-8 lg:px-12", sizes[size], className)} {...rest} />
  );
}
