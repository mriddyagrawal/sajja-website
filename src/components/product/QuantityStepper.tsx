"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type QuantityStepperProps = {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  className?: string;
};

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: QuantityStepperProps) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div
      className={cn(
        "border-border-strong bg-surface-ivory inline-flex h-11 items-center rounded-md border",
        className,
      )}
    >
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="text-ink-default hover:bg-surface-shell flex h-full w-10 items-center justify-center rounded-l-md transition disabled:opacity-30"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-10 text-center text-sm font-medium tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="text-ink-default hover:bg-surface-shell flex h-full w-10 items-center justify-center rounded-r-md transition disabled:opacity-30"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
