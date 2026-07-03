"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, ArrowRight, User, X, Share2, Bookmark, Clock } from "lucide-react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { newsItems } from "@/data/news";
import type { NewsItem } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

const articleContents: Record<string, { paragraphs: string[]; tags: string[] }> = {
  n1: {
    paragraphs: [
      "The Global Trade Summit 2026 has concluded with groundbreaking agreements that are set to reshape international commerce in the ASEAN region. Industry leaders from over 40 countries participated in what experts are calling the most significant trade dialogue of the decade.",
      "Key highlights include new digital trade corridors between Singapore, Vietnam, and Indonesia, potentially reducing cross-border transaction times by up to 60%. The agreements focus heavily on digital transformation, sustainable supply chains, and SME empowerment.",
      "With ASEAN's middle class projected to reach 400 million by 2030, these developments present unprecedented opportunities for B2B buyers and suppliers looking to expand into one of the world's fastest-growing economic regions.",
    ],
    tags: ["ASEAN", "Trade Summit", "Digital Trade", "2026"],
  },
  n2: {
    paragraphs: [
      "Sustainability has moved from a buzzword to a business imperative in the B2B sector. Companies across the globe are fundamentally restructuring their supply chains to meet evolving environmental standards and consumer expectations.",
      "A recent survey of 2,000 procurement leaders reveals that 78% now consider sustainability credentials as important as price when selecting suppliers. This shift is driving innovation in eco-friendly packaging, carbon-neutral shipping, and circular economy practices.",
      "Leading platforms are introducing carbon footprint tracking features, allowing buyers to compare the environmental impact of different sourcing options alongside traditional metrics like price and delivery time.",
    ],
    tags: ["Sustainability", "Green Supply Chain", "Eco-Friendly", "Trends"],
  },
  n3: {
    paragraphs: [
      "Artificial intelligence is revolutionizing global supply chain management, with early adopters reporting efficiency gains of 30-40% across their logistics operations. From predictive analytics to autonomous warehouses, AI is touching every aspect of modern trade.",
      "Machine learning algorithms now predict demand patterns with unprecedented accuracy, enabling just-in-time inventory management that reduces warehousing costs by up to 25%. AI-powered route optimization is cutting shipping times and fuel consumption simultaneously.",
      "The next frontier is AI-driven negotiation tools that analyze market conditions, supplier performance, and historical data to recommend optimal pricing and terms in real-time, fundamentally changing how B2B deals are struck.",
    ],
    tags: ["AI", "Logistics", "Supply Chain", "Technology"],
  },
  n4: {
    paragraphs: [
      "Navigating the complex landscape of international tariffs requires constant vigilance as trade policies evolve. Recent changes in major economies are creating both challenges and opportunities for global buyers and sellers.",
      "Our comprehensive guide breaks down the latest tariff structures across key markets including the US, EU, China, and India. We provide practical strategies for minimizing duty costs through proper classification, free trade agreements, and strategic sourcing locations.",
      "Expert tips include leveraging Free Trade Zones, understanding rules of origin, and working with experienced customs brokers. Staying informed about policy changes can save businesses thousands of dollars per shipment.",
    ],
    tags: ["Tariffs", "Trade Policy", "Customs", "Guides"],
  },
};

export default function NewsPage() {
  const { t } = useLanguage();
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors">
            <ArrowLeft size={16} />
            {t("news.backToHome")}
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-secondary mb-2">{t("news.allArticles")}</h1>
        <p className="text-gray-400 mb-8">{t("news.subtitle")}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {newsItems.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              onClick={() => setSelectedArticle(item)}
              className="group bg-white rounded-2xl border border-gray-100/50 overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col sm:flex-row"
            >
              <div className="sm:w-56 h-48 sm:h-auto bg-gray-50 overflow-hidden shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="info">{item.category}</Badge>
                  <span className="text-xs text-gray-400">{item.date}</span>
                </div>
                <h3 className="text-base font-semibold text-secondary leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1">{item.excerpt}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400">{item.author}</span>
                  <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    {t("news.readMore")} <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {selectedArticle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setSelectedArticle(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="bg-white rounded-3xl max-w-xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 bg-gray-100">
              <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <button onClick={() => setSelectedArticle(null)} className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center">
                <X size={16} />
              </button>
              <div className="absolute bottom-4 left-4">
                <Badge variant="info">{selectedArticle.category}</Badge>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                <span className="flex items-center gap-1"><Calendar size={12} />{selectedArticle.date}</span>
                <span className="flex items-center gap-1"><User size={12} />{selectedArticle.author}</span>
                <span className="flex items-center gap-1"><Clock size={12} />5 {t("news.minRead")}</span>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">{selectedArticle.title}</h3>
              <div className="space-y-4 mb-6">
                {(articleContents[selectedArticle.id]?.paragraphs || [selectedArticle.excerpt]).map((p, i) => (
                  <p key={i} className="text-sm text-gray-600 leading-relaxed">{p}</p>
                ))}
              </div>
              {articleContents[selectedArticle.id]?.tags && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {articleContents[selectedArticle.id].tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-500 font-medium">#{tag}</span>
                  ))}
                </div>
              )}
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <Button variant="primary" size="sm" className="flex-1 cursor-pointer">
                  {t("news.shareArticle")} <Share2 size={14} />
                </Button>
                <Button variant="outline" size="sm" className="cursor-pointer">
                  <Bookmark size={14} /> {t("news.save")}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      <Footer />
    </div>
  );
}
