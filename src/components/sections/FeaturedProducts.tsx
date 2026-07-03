"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Eye, ArrowsUpFromLine, ShieldCheck, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ProductImageCarousel from "@/components/ui/ProductImageCarousel";
import { products } from "@/data/products";
import { cn } from "@/utils/cn";
import { useLanguage } from "@/context/LanguageContext";

export default function FeaturedProducts() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [compare, setCompare] = useState<Set<string>>(new Set());
  const { t } = useLanguage();

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleCompare = (id: string) => {
    setCompare((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section id="products" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t("products.title")}
          subtitle={t("products.subtitle")}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative bg-white rounded-2xl border border-gray-100/50 overflow-hidden hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-500"
            >
              <Link href={`/products/${product.slug}`}>
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  <ProductImageCarousel
                    images={product.images || [product.image]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge variant={product.badge === "Premium" ? "premium" : "primary"}>
                      {product.badge}
                    </Badge>
                  </div>
                </div>
              </Link>
              <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => { e.preventDefault(); toggleFavorite(product.id); }}
                  className={cn(
                    "w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm transition-all",
                    favorites.has(product.id) ? "text-red-500" : "text-gray-400 hover:text-red-400"
                  )}
                >
                  <Heart size={16} className={cn(favorites.has(product.id) && "fill-current")} />
                </motion.button>
                <Link href={`/products/${product.slug}`}>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm text-gray-400 hover:text-primary transition-colors cursor-pointer"
                  >
                    <Eye size={16} />
                  </motion.div>
                </Link>
              </div>
              <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                <div className="bg-white/95 backdrop-blur-sm p-3 flex gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1 text-xs cursor-pointer"
                    onClick={(e) => { e.preventDefault(); toggleCompare(product.id); }}
                  >
                    <ArrowsUpFromLine size={14} />
                    {compare.has(product.id) ? t("product.added") : t("product.compare")}
                  </Button>
                  <Link href={`/products/${product.slug}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full text-xs cursor-pointer">
                      {t("product.quickView")}
                    </Button>
                  </Link>
                </div>
              </div>
              <Link href={`/products/${product.slug}`}>
                <div className="p-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    {product.verified && (
                      <ShieldCheck size={14} className="text-blue-500" />
                    )}
                    <span className="text-xs text-gray-400">{product.supplier}</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs text-gray-400">{product.country}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-secondary leading-snug mb-2 line-clamp-2 hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
                    <span className="text-xs text-gray-400">({product.reviewCount.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-primary">{product.priceRange}</p>
                      <p className="text-xs text-gray-400">{t("product.moq")}: {product.moq}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link href="/products">
            <Button variant="outline" size="lg" className="cursor-pointer">
              {t("products.viewAll")}
              <ArrowRight size={18} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
