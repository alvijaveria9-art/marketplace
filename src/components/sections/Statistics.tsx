"use client";

import { motion } from "framer-motion";
import { Package, Users, Globe, Building2 } from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { useLanguage } from "@/context/LanguageContext";

const statsData = [
  { icon: Package, end: 200, suffix: "M+", label: "Products", prefix: "" },
  { icon: Users, end: 40, suffix: "M+", label: "Buyers", prefix: "" },
  { icon: Globe, end: 190, suffix: "+", label: "Countries", prefix: "" },
  { icon: Building2, end: 250, suffix: "K+", label: "Suppliers", prefix: "" },
];

export default function Statistics() {
  const { t } = useLanguage();
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("stats.title")}
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {t("stats.subtitle")}
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                <stat.icon size={30} className="text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-1">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} duration={2500} />
              </div>
              <p className="text-white/70 text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
