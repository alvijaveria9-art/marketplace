"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Heart, ShieldCheck, Star, Search, SlidersHorizontal,
  X, Check, ChevronDown, ArrowUpDown,
} from "lucide-react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ProductImageCarousel from "@/components/ui/ProductImageCarousel";
import Footer from "@/components/layout/Footer";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { cn } from "@/utils/cn";
import { useLanguage } from "@/context/LanguageContext";

const countries = [...new Set(products.map((p) => p.country))].sort();
const priceRanges = [
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $500", min: 50, max: 500 },
  { label: "$500 - $5,000", min: 500, max: 5000 },
  { label: "$5,000+", min: 5000, max: Infinity },
];

function parsePrice(priceRange: string): number {
  const match = priceRange.match(/\$?([\d,]+)/);
  return match ? parseInt(match[1].replace(/,/g, ""), 10) : 0;
}

export default function ProductsPage() {
  const { t } = useLanguage();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [priceFilter, setPriceFilter] = useState<string>("");
  const [minRating, setMinRating] = useState<number>(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.supplier.toLowerCase().includes(q) ||
          p.country.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedCountry) {
      result = result.filter((p) => p.country === selectedCountry);
    }

    if (priceFilter) {
      const range = priceRanges.find((r) => r.label === priceFilter);
      if (range) {
        result = result.filter((p) => {
          const price = parsePrice(p.priceRange);
          return price >= range.min && price < range.max;
        });
      }
    }

    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    if (verifiedOnly) {
      result = result.filter((p) => p.verified);
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => parsePrice(a.priceRange) - parsePrice(b.priceRange));
        break;
      case "price-high":
        result.sort((a, b) => parsePrice(b.priceRange) - parsePrice(a.priceRange));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [search, selectedCategory, selectedCountry, priceFilter, minRating, verifiedOnly, sortBy]);

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedCountry("");
    setPriceFilter("");
    setMinRating(0);
    setVerifiedOnly(false);
    setSortBy("popularity");
    setSearch("");
  };

  const hasFilters = selectedCategory || selectedCountry || priceFilter || minRating > 0 || verifiedOnly;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors shrink-0">
              <ArrowLeft size={16} />
              {t("common.back")}
            </Link>
            <div className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <Search size={18} className="text-gray-400 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("products.searchPlaceholder")}
                className="flex-1 bg-transparent text-sm outline-none"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-gray-400 hover:text-gray-600">
                  <X size={16} />
                </button>
              )}
            </div>
            <Button
              variant={showFilters ? "primary" : "outline"}
              size="sm"
              className="shrink-0 cursor-pointer"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={16} />
              {t("products.filters")}
              {hasFilters && (
                <span className="ml-1 w-2 h-2 rounded-full bg-primary inline-block" />
              )}
            </Button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 pb-2 flex flex-wrap items-center gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(selectedCategory === cat.id ? "" : cat.id)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                        selectedCategory === cat.id
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-500 border-gray-200 hover:border-primary/30"
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 pb-4">
                  <div className="relative">
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="appearance-none px-3 py-1.5 rounded-lg bg-gray-50 text-xs font-medium text-gray-500 border border-gray-200 pr-8 outline-none cursor-pointer hover:border-primary/30"
                    >
                      <option value="">{t("products.allCountries")}</option>
                      {countries.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <select
                      value={priceFilter}
                      onChange={(e) => setPriceFilter(e.target.value)}
                      className="appearance-none px-3 py-1.5 rounded-lg bg-gray-50 text-xs font-medium text-gray-500 border border-gray-200 pr-8 outline-none cursor-pointer hover:border-primary/30"
                    >
                      <option value="">{t("products.allPrices")}</option>
                      {priceRanges.map((r) => (
                        <option key={r.label} value={r.label}>{r.label}</option>
                      ))}
                    </select>
                    <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <select
                      value={minRating.toString()}
                      onChange={(e) => setMinRating(Number(e.target.value))}
                      className="appearance-none px-3 py-1.5 rounded-lg bg-gray-50 text-xs font-medium text-gray-500 border border-gray-200 pr-8 outline-none cursor-pointer hover:border-primary/30"
                    >
                      <option value="0">{t("products.anyRating")}</option>
                      <option value="4">4+ Stars</option>
                      <option value="4.5">4.5+ Stars</option>
                      <option value="4.8">4.8+ Stars</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none px-3 py-1.5 rounded-lg bg-gray-50 text-xs font-medium text-gray-500 border border-gray-200 pr-8 outline-none cursor-pointer hover:border-primary/30"
                    >
                      <option value="popularity">{t("products.sort.popularity")}</option>
                      <option value="price-low">{t("products.sort.priceLow")}</option>
                      <option value="price-high">{t("products.sort.priceHigh")}</option>
                      <option value="rating">{t("products.sort.rating")}</option>
                      <option value="name">{t("products.sort.name")}</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>

                  <button
                    onClick={() => setVerifiedOnly(!verifiedOnly)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                      verifiedOnly
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-gray-50 text-gray-500 border-gray-200 hover:border-primary/30"
                    )}
                  >
                    <Check size={12} />
                    {t("products.verifiedOnly")}
                  </button>

                  {hasFilters && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-primary transition-colors"
                    >
                      <X size={12} />
                      {t("products.clear")}
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-secondary">{t("products.allProducts")}</h1>
            {selectedCategory && (
              <Badge variant="primary" className="capitalize">
                {categories.find((c) => c.id === selectedCategory)?.name || selectedCategory}
                <button onClick={() => setSelectedCategory("")} className="ml-1.5 hover:opacity-70">
                  <X size={12} />
                </button>
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-400">{filtered.length} {t("products.of")} {products.length} products</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="group bg-white rounded-2xl border border-gray-100/50 overflow-hidden hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-500"
            >
              <Link href={`/products/${product.slug}`}>
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  <ProductImageCarousel
                    images={product.images || [product.image]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant={product.badge === "Premium" ? "premium" : "primary"}>{product.badge}</Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm text-gray-500 capitalize">
                      {categories.find((c) => c.id === product.category)?.name || product.category}
                    </span>
                  </div>
                </div>
              </Link>
              <div className="relative">
                <button
                  onClick={() => {
                    const next = new Set(favorites);
                    if (next.has(product.id)) next.delete(product.id);
                    else next.add(product.id);
                    setFavorites(next);
                  }}
                  className="absolute top-2 right-2 z-10 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                >
                  <Heart size={16} className={cn(favorites.has(product.id) ? "fill-red-500 text-red-500" : "text-gray-400")} />
                </button>
              <Link href={`/products/${product.slug}`}>
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      {product.verified && <ShieldCheck size={14} className="text-blue-500" />}
                      <span className="text-xs text-gray-400 truncate">{product.supplier}</span>
                      <span className="text-xs text-gray-300">•</span>
                      <span className="text-xs text-gray-400">{product.country}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-secondary leading-snug mb-2 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
                      <span className="text-xs text-gray-400">({product.reviewCount})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-primary">{product.priceRange}</p>
                      <span className="text-[11px] text-gray-400">MOQ: {product.moq}</span>
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-2">{t("products.noResults")}</p>
            <Button variant="outline" size="sm" onClick={clearFilters} className="cursor-pointer">
              {t("products.clearFilters")}
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
