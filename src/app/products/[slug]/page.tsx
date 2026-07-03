"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, Heart, ShieldCheck, Star, Share2, ShoppingCart,
  Check, ChevronDown, Package, Truck, Clock, MapPin, Phone,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import ProductImageCarousel from "@/components/ui/ProductImageCarousel";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products } from "@/data/products";
import { suppliers } from "@/data/suppliers";
import { useLanguage } from "@/context/LanguageContext";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { t, dir } = useLanguage();
  const [favorite, setFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");

  const product = products.find((p) => p.slug === slug);
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-secondary mb-2">Product not found</h2>
          <Button variant="outline" onClick={() => router.push("/")}>
            <ArrowLeft size={16} /> Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const supplier = suppliers.find((s) => s.name === product.supplier);

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-6 transition-colors">
          <ArrowLeft size={16} />
          {t("common.back")}
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="relative aspect-square bg-white rounded-3xl border border-gray-100/50 overflow-hidden shadow-sm">
              <ProductImageCarousel
                images={product.images || [product.image]}
                alt={product.name}
                className="w-full h-full object-contain p-8"
                loading="eager"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant="primary">{product.badge}</Badge>
              </div>
              <div className="absolute top-4 right-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setFavorite(!favorite)}
                  className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm"
                >
                  <Heart
                    size={18}
                    className={favorite ? "fill-red-500 text-red-500" : "text-gray-400"}
                  />
                </motion.button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => {
                const imgs = product.images || [product.image];
                return (
                  <div
                    key={i}
                    className="aspect-square bg-white rounded-xl border border-gray-100/50 overflow-hidden cursor-pointer hover:border-primary/30 transition-colors"
                  >
                    <img
                      src={imgs[i % imgs.length]}
                      alt={`${product.name} thumbnail ${i + 1}`}
                      className="w-full h-full object-contain p-3"
                    />
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.verified && (
                  <ShieldCheck size={16} className="text-blue-500" />
                )}
                <span className="text-sm text-gray-500">{product.supplier}</span>
                <span className="text-gray-300">•</span>
                <span className="text-sm text-gray-500">{product.country}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-secondary leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-gray-700">{product.rating}</span>
                  <span className="text-gray-400 text-sm">({product.reviewCount.toLocaleString()} {t("product.reviews")})</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/5 to-transparent rounded-2xl p-6">
              <p className="text-sm text-gray-500 mb-1">{t("product.price")}</p>
              <p className="text-3xl font-bold text-primary">{product.priceRange}</p>
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-medium">{t("product.moq")}:</span> {product.moq}
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="primary" size="lg" className="flex-1">
                <ShoppingCart size={20} />
                {t("hero.cta1")}
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                <Share2 size={20} />
                {t("product.share")}
              </Button>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <div className="flex gap-1 mb-4">
                {(["description", "specs", "reviews"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab
                        ? "bg-primary text-white shadow-lg shadow-primary/25"
                        : "text-gray-500 hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {t(`product.${tab}`)}
                  </button>
                ))}
              </div>

              {activeTab === "description" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-gray-600 leading-relaxed space-y-3"
                >
                  <p>{product.description || `Premium quality ${product.name.toLowerCase()} manufactured by ${product.supplier}.`}</p>
                  {product.features && (
                    <ul className="space-y-1.5">
                      {product.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check size={14} className="text-primary shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                  <p>
                    With {product.rating} stars from {product.reviewCount.toLocaleString()} reviews,
                    this is one of our most popular products in this category.
                  </p>
                </motion.div>
              )}

              {activeTab === "specs" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  {[
                    { labelKey: "product.material", value: "Premium quality" },
                    { labelKey: "product.warranty", value: "12 months" },
                    { labelKey: "product.certification", value: "ISO 9001, CE" },
                    { labelKey: "product.packaging", value: "Standard export packing" },
                    { labelKey: "product.delivery", value: "15-25 working days" },
                    { labelKey: "product.payment", value: "T/T, L/C, PayPal" },
                  ].map((spec) => (
                    <div key={spec.labelKey} className="flex items-center justify-between py-2 px-3 rounded-xl bg-gray-50">
                      <span className="text-sm text-gray-500">{t(spec.labelKey)}</span>
                      <span className="text-sm font-medium text-secondary">{spec.value}</span>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === "reviews" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  {[
                    { name: "Ahmed K.", rating: 5, text: "Excellent product quality. Fast shipping and great communication.", date: "2 weeks ago" },
                    { name: "Maria S.", rating: 4, text: "Good value for money. Would recommend to other buyers.", date: "1 month ago" },
                    { name: "James T.", rating: 5, text: "Consistent quality every time we order. Trusted supplier.", date: "2 months ago" },
                  ].map((review) => (
                    <div key={review.name} className="p-4 rounded-xl bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-sm text-secondary">{review.name}</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={i < review.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{review.text}</p>
                      <p className="text-xs text-gray-400 mt-1">{review.date}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {supplier && (
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-lg font-semibold text-secondary mb-4">{t("product.supplier")}</h3>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50">
                  <div className="w-16 h-16 rounded-xl bg-white border border-gray-100 flex items-center justify-center shrink-0">
                    <img src={supplier.logo} alt="" className="w-12 h-12 object-contain" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-secondary">{supplier.name}</h4>
                      {supplier.verified && <ShieldCheck size={16} className="text-blue-500" />}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span>{supplier.rating}</span>
                      <span className="text-gray-300">•</span>
                      <span>{supplier.yearsInBusiness} years</span>
                      <span className="text-gray-300">•</span>
                      <span>{supplier.country}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-2">
                      <span className="flex items-center gap-1"><Clock size={12} /> {supplier.responseTime}</span>
                      <span className="flex items-center gap-1"><Package size={12} /> {supplier.productsCount} products</span>
                    </div>
                  </div>
                  <Button variant="primary" size="sm">
                    <Phone size={14} />
                    {t("product.contact")}
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-secondary mb-6">{t("product.related")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products
              .filter((p) => {
                if (p.id === product.id) return false;
                if (p.category !== product.category) return false;
                if (product.tags && p.tags) {
                  return p.tags.some((t) => product.tags?.includes(t));
                }
                return true;
              })
              .sort((a, b) => {
                const aScore = a.tags && product.tags ? a.tags.filter((t) => product.tags?.includes(t)).length : 0;
                const bScore = b.tags && product.tags ? b.tags.filter((t) => product.tags?.includes(t)).length : 0;
                return bScore - aScore;
              })
              .slice(0, 4)
              .map((p) => (
                <Link key={p.id} href={`/products/${p.slug}`}>
                  <div className="group bg-white rounded-2xl border border-gray-100/50 p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className="aspect-square bg-gray-50 rounded-xl mb-3 overflow-hidden relative">
                      <ProductImageCarousel
                        images={p.images || [p.image]}
                        alt={p.name}
                        className="w-full h-full object-contain p-4"
                      />
                    </div>
                    <h3 className="text-sm font-semibold text-secondary line-clamp-1">{p.name}</h3>
                    <p className="text-sm font-bold text-primary mt-1">{p.priceRange}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
