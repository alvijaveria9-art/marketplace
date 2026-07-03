"use client";

import { cn } from "@/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "success" | "warning" | "info" | "premium";
  className?: string;
}

export default function Badge({ children, variant = "primary", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide",
        {
          "bg-primary/10 text-primary": variant === "primary",
          "bg-emerald-50 text-emerald-700": variant === "success",
          "bg-amber-50 text-amber-700": variant === "warning",
          "bg-blue-50 text-blue-700": variant === "info",
          "bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800": variant === "premium",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
