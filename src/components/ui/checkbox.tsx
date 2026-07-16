"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  "aria-label"?: string;
}

export function Checkbox({ checked = false, onCheckedChange, className, ...rest }: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "grid h-[18px] w-[18px] flex-none place-items-center rounded-[5px] border transition-colors",
        checked
          ? "border-[var(--ac)] bg-[var(--ac)] text-white"
          : "border-input bg-background hover:border-[var(--ac)]",
        className
      )}
      {...rest}
    >
      {checked && <Check size={13} strokeWidth={3} />}
    </button>
  );
}
