import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  label?: string;
  title?: string;
  withDivider?: boolean;
}

export function Section({
  id,
  label,
  title,
  withDivider = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24",
        withDivider && "border-t border-editorial-border",
        className
      )}
      {...props}
    >
      {(label || title) && (
        <div className="mb-10 md:mb-14 space-y-2">
          {label && (
            <p className="font-mono text-xs uppercase tracking-widest text-editorial-muted">
              {label}
            </p>
          )}
          {title && (
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-editorial-fg">
              {title}
            </h2>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
