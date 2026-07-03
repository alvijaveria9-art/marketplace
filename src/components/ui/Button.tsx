"use client";

import { forwardRef } from "react";
import { cn } from "@/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 cursor-pointer select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.97]":
              variant === "primary",
            "bg-secondary text-white hover:bg-secondary-light shadow-lg active:scale-[0.97]":
              variant === "secondary",
            "border-2 border-primary text-primary hover:bg-primary hover:text-white active:scale-[0.97]":
              variant === "outline",
            "text-secondary hover:bg-secondary/5 active:scale-[0.97]":
              variant === "ghost",
          },
          {
            "px-4 py-2 text-sm gap-2": size === "sm",
            "px-6 py-3 text-base gap-2.5": size === "md",
            "px-8 py-4 text-lg gap-3": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
