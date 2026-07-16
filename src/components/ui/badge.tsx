import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "secondary" | "outline" | "success" | "accent";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  rounded?: boolean;
}

const variants: Record<BadgeVariant, string> = {
  secondary: "bg-secondary text-secondary-foreground border border-transparent",
  outline: "bg-transparent text-foreground border border-border",
  success: "text-[var(--success)] border border-transparent bg-[color-mix(in_srgb,var(--success)_12%,transparent)]",
  accent: "bg-ac text-white border border-transparent",
};

export function Badge({ className, variant = "secondary", rounded = true, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-[12px] font-semibold leading-none",
        rounded ? "rounded-full" : "rounded-md",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
