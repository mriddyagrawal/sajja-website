"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;
const SheetPortal = DialogPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-40 bg-ink-charcoal/40 backdrop-blur-[2px] transition-opacity duration-200 data-[state=closed]:opacity-0 data-[state=open]:opacity-100",
      className,
    )}
    {...props}
  />
));
SheetOverlay.displayName = "SheetOverlay";

type SheetContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  side?: "left" | "right" | "top" | "bottom";
};

const sideClasses: Record<NonNullable<SheetContentProps["side"]>, string> = {
  right:
    "inset-y-0 right-0 h-full w-[88%] max-w-md border-l data-[state=closed]:translate-x-full",
  left: "inset-y-0 left-0 h-full w-[88%] max-w-md border-r data-[state=closed]:-translate-x-full",
  top: "inset-x-0 top-0 w-full border-b data-[state=closed]:-translate-y-full",
  bottom: "inset-x-0 bottom-0 w-full border-t data-[state=closed]:translate-y-full",
};

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 bg-surface-cream border-border-default flex flex-col shadow-lift transition-transform ease-in-out data-[state=closed]:duration-200 data-[state=open]:duration-300",
        sideClasses[side],
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        className="absolute top-4 right-4 rounded-md p-2 text-ink-muted transition hover:bg-surface-shell hover:text-ink-charcoal focus-visible:outline-2 focus-visible:outline-brand-rose"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = "SheetContent";

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("border-border-default border-b px-6 py-5", className)} {...props} />
);

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("font-display text-ink-charcoal text-xl", className)}
    {...props}
  />
));
SheetTitle.displayName = "SheetTitle";

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-ink-muted text-sm", className)}
    {...props}
  />
));
SheetDescription.displayName = "SheetDescription";

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
