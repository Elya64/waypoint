import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: "md" | "lg";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputSize = "md", ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-[10px] border border-input bg-background text-foreground font-sans",
        "px-4 outline-none transition-shadow placeholder:text-muted-foreground",
        "focus-visible:ring-2 focus-visible:ring-ac/30",
        inputSize === "lg" ? "h-[52px] text-[17px]" : "h-10 text-[15px]",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
