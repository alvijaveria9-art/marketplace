"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Star, Heart, Share2, ShoppingCart, ChevronRight, MapPin, Package, Clock, Truck } from "lucide-react";
import type { Product } from "@/types";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <div className="relative p-1">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all"
              >
                <X size={18} />
              </button>

              <div className="grid md:grid-cols-2 gap-0">
                <div className="bg-gray-50 rounded-3xl p-8 flex items-center justify-center min-h-[300px] md:min-h-[450px]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full max-w-[250px] object-contain"
                  />
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant={product.badge === "Premium" ? "premium" : "primary"}>
                      {product.badge}
                    </Badge>
                    {product.verified && (
                      <Badge variant="success">
                        <ShieldCheck size={12} className="inline mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <h2 className="text-xl md:text-2xl font-bold text-secondary mb-2">{product.name}</h2>

                  <div className="flex items-center gap-1.5 mb-1">
                    <Star size={16} className="fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-gray-700">{product.rating}</span>
                    <span className="text-gray-400 text-sm">({product.reviewCount.toLocaleString()} reviews)</span>
                  </div>

                  <p className="text-sm text-gray-400 mb-4">
                    by <span className="text-secondary font-medium">{product.supplier}</span>
                    <span className="mx-1.5">•</span>
                    <span>{product.country}</span>
                  </p>

                  <div className="text-2xl font-bold text-primary mb-4">{product.priceRange}</div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-gray-50">
                      <Package size={16} className="text-primary mb-1" />
                      <p className="text-xs text-gray-400">MOQ</p>
                      <p className="text-sm font-semibold text-secondary">{product.moq}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50">
                      <Clock size={16} className="text-primary mb-1" />
                      <p className="text-xs text-gray-400">Delivery</p>
                      <p className="text-sm font-semibold text-secondary">5-8 Days</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {[
                      "High-quality materials and craftsmanship",
                      "Competitive factory-direct pricing",
                      "Custom packaging and branding available",
                      "Worldwide shipping with tracking",
                    ].map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <ChevronRight size={14} className="text-primary mt-0.5 shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="primary" size="md" className="flex-1">
                      <ShoppingCart size={18} />
                      Contact Supplier
                    </Button>
                    <Button variant="outline" size="md" className="w-11 !px-0">
                      <Heart size={18} />
                    </Button>
                    <Button variant="outline" size="md" className="w-11 !px-0">
                      <Share2 size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
