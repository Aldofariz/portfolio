import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      type = "button",
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-editorial-accent disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer tracking-tight";

    const variants = {
      primary:
        "bg-editorial-fg text-editorial-bg hover:bg-neutral-800 active:bg-black",
      secondary:
        "bg-stone-200 text-editorial-fg hover:bg-stone-300 active:bg-stone-400",
      outline:
        "border border-editorial-border bg-transparent text-editorial-fg hover:border-editorial-fg active:bg-stone-100",
      ghost:
        "text-editorial-fg hover:text-editorial-accent hover:bg-stone-100 active:bg-stone-200",
      danger:
        "bg-rose-700 text-white hover:bg-rose-800 active:bg-rose-900",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs uppercase tracking-wider",
      md: "h-10 px-5 text-sm",
      lg: "h-12 px-7 text-base",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
