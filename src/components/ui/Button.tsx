"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap rounded-md transition-colors disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-rose [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-rose text-ink-inverse hover:bg-brand-magenta active:bg-brand-rose-700 shadow-soft",
        secondary:
          "bg-surface-ivory text-ink-charcoal border border-border-strong hover:bg-surface-shell",
        ghost: "text-ink-default hover:bg-surface-shell",
        link: "text-brand-rose underline-offset-4 hover:underline",
        gold: "bg-brand-gold text-ink-charcoal hover:bg-brand-gold-dark hover:text-ink-inverse shadow-soft",
        outline:
          "border border-brand-rose text-brand-rose hover:bg-brand-rose hover:text-ink-inverse",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
