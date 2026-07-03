"use client";

import { cn } from "@/utils/cn";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl mb-12 md:mb-16", centered && "mx-auto text-center", className)}>
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight",
          light ? "text-white" : "text-secondary"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-lg md:text-xl leading-relaxed", light ? "text-white/70" : "text-gray-500")}>
          {subtitle}
        </p>
      )}
      <div className={cn("mt-6 h-1 w-16 rounded-full mx-auto", centered && "mx-auto", light ? "bg-primary" : "bg-primary")} />
    </div>
  );
}
