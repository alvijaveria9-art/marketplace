"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Smartphone, Shirt, Cog, Car, Armchair, Refrigerator,
  HardHat, Sparkles, Package, Wheat, Trophy, HeartPulse,
  Gamepad2, Pen, Apple, Dog, Gem, BookOpen, Baby, Wrench, X,
} from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { categories } from "@/data/categories";
import { cn } from "@/utils/cn";
import { useLanguage } from "@/context/LanguageContext";

const iconMap: Record<string, React.ElementType> = {
  Smartphone, Shirt, Cog, Car, Armchair, Refrigerator,
  HardHat, Sparkles, Package, Wheat, Trophy, HeartPulse,
  Gamepad2, Pen, Apple, Dog, Gem, BookOpen, Baby, Wrench,
};

export default function Categories() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null);

  return (
    <section id="categories" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t("categories.title")}
          subtitle={t("categories.browse").replace("{count}", String(categories.length))}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
          {categories.map((category, i) => {
            const Icon = iconMap[category.icon] || Package;
            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedCategory(category)}
                className="group relative flex flex-col items-center text-center p-4 rounded-2xl bg-gray-50/50 border border-gray-100/50 hover:border-primary/20 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div
                    className="absolute bottom-2 left-2 w-8 h-8 rounded-lg flex items-center justify-center bg-white/90 backdrop-blur-sm"
                  >
                    <Icon size={16} style={{ color: category.color }} />
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-secondary mb-0.5">{category.name}</h3>
                <p className="text-xs text-gray-400">{category.productCount} {t("categories.products")}</p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {selectedCategory && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setSelectedCategory(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-40 rounded-2xl overflow-hidden mb-6">
              <img src={selectedCategory.image} alt={selectedCategory.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-4">
                <h3 className="text-xl font-bold text-white">{selectedCategory.name}</h3>
                <p className="text-sm text-white/70">{selectedCategory.productCount} products available</p>
              </div>
              <button
                onClick={() => setSelectedCategory(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              {t("categories.modal.title").replace("{name}", selectedCategory.name.toLowerCase())}
            </p>
            <div className="flex gap-3">
              <Button variant="primary" size="md" className="flex-1" onClick={() => setSelectedCategory(null)}>
                {t("categories.modal.browse").replace("{name}", selectedCategory.name)}
              </Button>
              <Button variant="outline" size="md" onClick={() => setSelectedCategory(null)}>
                {t("categories.modal.close")}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
