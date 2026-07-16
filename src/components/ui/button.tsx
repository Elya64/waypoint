"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "secondary";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** pill = fully rounded (default, matches Waypoint CTAs) */
  pill?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap select-none " +
  "transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-ac/40 " +
  "disabled:opacity-50 disabled:pointer-events-none cursor-pointer font-sans";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]",
  secondary: "bg-secondary text-secondary-foreground hover:bg-[var(--secondary-hover)] border border-border",
  outline: "bg-background text-foreground border border-border hover:bg-[var(--outline-hover)]",
  ghost: "bg-transparent text-foreground hover:bg-[var(--ghost-hover)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13.5px]",
  md: "h-10 px-5 text-[14.5px]",
  lg: "h-12 px-7 text-[15.5px]",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", pill = true, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], pill ? "rounded-full" : "rounded-[10px]", className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const iconSizes: Record<Size, string> = { sm: "h-9 w-9", md: "h-10 w-10", lg: "h-12 w-12" };

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], iconSizes[size], "rounded-full p-0", className)}
      {...props}
    />
  )
);
IconButton.displayName = "IconButton";
