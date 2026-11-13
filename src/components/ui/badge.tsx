import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "accent" | "muted";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-stone-100 text-editorial-fg border border-stone-200",
    outline: "border border-editorial-border text-editorial-muted bg-transparent",
    accent: "bg-editorial-accent/10 text-editorial-accent border border-editorial-accent/20",
    muted: "bg-stone-50 text-stone-500 border border-stone-200/60",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-mono font-normal tracking-wide transition-colors select-none",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
