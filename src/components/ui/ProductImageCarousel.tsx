"use client";

import { useState, useEffect, useCallback } from "react";

interface Props {
  images: string[];
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  interval?: number;
}

export default function ProductImageCarousel({
  images,
  alt,
  className = "w-full h-full object-cover",
  loading = "lazy",
  interval = 2000,
}: Props) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1 || paused) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [next, interval, images.length, paused]);

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={i === 0 ? alt : `${alt} - view ${i + 1}`}
          loading={loading}
          className={`${className} absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ zIndex: i === current ? 1 : 0 }}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === current ? "bg-white w-3" : "bg-white/50"
              }`}
              aria-label={`View ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
