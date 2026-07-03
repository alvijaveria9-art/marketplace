"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Users, Globe } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

const stats = [
  {
    icon: Shield, value: "250K+", labelKey: "hero.stats.suppliers",
    img: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=80&h=80&fit=crop",
  },
  {
    icon: Users, value: "40M+", labelKey: "hero.stats.buyers",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=80&h=80&fit=crop",
  },
  {
    icon: Globe, value: "190+", labelKey: "hero.stats.countries",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=80&h=80&fit=crop",
  },
  {
    icon: Shield, value: "200M+", labelKey: "hero.stats.products",
    img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=80&h=80&fit=crop",
  },
];

export default function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      containerRef.current.style.setProperty("--mouse-x", String(x));
      containerRef.current.style.setProperty("--mouse-y", String(y));
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-white to-primary/5">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          style={{ transform: "translate(calc(var(--mouse-x, 0) * 30px), calc(var(--mouse-y, 0) * 30px))" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          style={{ transform: "translate(calc(var(--mouse-x, 0) * -20px), calc(var(--mouse-y, 0) * -20px))" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {t("hero.badge")}
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-secondary leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t("hero.headline")}
            </motion.h1>

            <motion.p
              className="mt-6 text-lg md:text-xl text-gray-500 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/products">
                <Button variant="primary" size="lg" className="animate-pulse-glow cursor-pointer">
                  {t("hero.cta1")}
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Link href="/#suppliers">
                <Button variant="outline" size="lg" className="cursor-pointer">
                  {t("hero.cta2")}
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {stats.map((stat) => (
                <div key={stat.labelKey} className="flex items-center gap-3 group">
                  <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all shrink-0">
                    <img
                      src={stat.img}
                      alt={t(stat.labelKey)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-secondary">{stat.value}</div>
                    <div className="text-xs text-gray-400">{t(stat.labelKey)}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="hidden lg:block relative h-[600px]">
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <svg viewBox="0 0 500 500" className="w-full h-full">
                <circle cx="250" cy="250" r="180" fill="none" stroke="#FF6A00" strokeWidth="1" opacity="0.15" strokeDasharray="8 4" />
                <circle cx="250" cy="250" r="120" fill="none" stroke="#2563EB" strokeWidth="1" opacity="0.15" strokeDasharray="6 4" />
                <circle cx="250" cy="250" r="60" fill="none" stroke="#10B981" strokeWidth="1" opacity="0.15" strokeDasharray="4 4" />
                <circle cx="250" cy="250" r="8" fill="#FF6A00" opacity="0.3" />
                {[
                  { x: 250, y: 70 },
                  { x: 410, y: 160 },
                  { x: 410, y: 340 },
                  { x: 250, y: 430 },
                  { x: 90, y: 340 },
                  { x: 90, y: 160 },
                ].map((dot, i) => (
                  <g key={i}>
                    <circle cx={dot.x} cy={dot.y} r="4" fill="#FF6A00" opacity="0.5">
                      <animate attributeName="r" values="4;6;4" dur={`${2 + i}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.5;1;0.5" dur={`${2 + i}s`} repeatCount="indefinite" />
                    </circle>
                    <line x1="250" y1="250" x2={dot.x} y2={dot.y} stroke="#FF6A00" strokeWidth="0.5" opacity="0.12" />
                  </g>
                ))}
              </svg>
            </motion.div>

            {[
              { src: "https://images.unsplash.com/photo-1572569979132-b4f10c9ec185?w=80&h=80&fit=crop", x: "50%", y: "14%", dur: 5, del: 0 },
              { src: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=80&h=80&fit=crop", x: "82%", y: "32%", dur: 4.5, del: 0.3 },
              { src: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=80&h=80&fit=crop", x: "82%", y: "68%", dur: 5.5, del: 0.6 },
              { src: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=80&h=80&fit=crop", x: "50%", y: "86%", dur: 4, del: 0.9 },
              { src: "https://images.unsplash.com/photo-1711418235199-171c8ecb9d12?w=80&h=80&fit=crop", x: "18%", y: "68%", dur: 5, del: 0.2 },
              { src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=80&h=80&fit=crop", x: "18%", y: "32%", dur: 4.8, del: 0.5 },
            ].map((item, i) => (
              <div
                key={i}
                className="absolute"
                style={{ left: item.x, top: item.y, marginLeft: "-24px", marginTop: "-24px" }}
              >
                <motion.div
                  className="w-12 h-12"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: item.dur, repeat: Infinity, ease: "easeInOut", delay: item.del }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden ring-2 ring-white shadow-xl">
                    <img src={item.src} className="w-full h-full object-cover" alt="" />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
