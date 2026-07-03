"use client";

import { cn } from "@/utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export default function Card({ children, className, hover = false, glass = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl transition-all duration-500",
        glass
          ? "bg-white/70 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/5"
          : "bg-white border border-gray-100/50 shadow-sm shadow-black/5",
        hover && "hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}
