"use client";

import { motion } from "framer-motion";
import { Smartphone, QrCode, Apple, Download, ExternalLink, Check } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

const appFeatures = [
  { titleKey: "app.feature1Title", descKey: "app.feature1Desc", icon: "📦" },
  { titleKey: "app.feature2Title", descKey: "app.feature2Desc", icon: "💬" },
  { titleKey: "app.feature3Title", descKey: "app.feature3Desc", icon: "💰" },
  { titleKey: "app.feature4Title", descKey: "app.feature4Desc", icon: "🔒" },
  { titleKey: "app.feature5Title", descKey: "app.feature5Desc", icon: "🔔" },
  { titleKey: "app.feature6Title", descKey: "app.feature6Desc", icon: "📄" },
];

export default function MobileApp() {
  const { t } = useLanguage();
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              title={t("app.title")}
              subtitle={t("app.subtitle")}
              centered={false}
              className="mb-8"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {appFeatures.map((feature, i) => (
                <motion.div
                  key={feature.titleKey}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all"
                >
                  <span className="text-lg shrink-0">{feature.icon}</span>
                  <div>
                    <h4 className="text-sm font-semibold text-secondary">{t(feature.titleKey)}</h4>
                    <p className="text-xs text-gray-400">{t(feature.descKey)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="secondary" size="lg" className="gap-3 cursor-pointer w-full">
                    <Apple size={22} />
                    <div className="text-left">
                      <div className="text-[10px] opacity-70">{t("app.downloadOn")}</div>
                      <div className="text-sm font-semibold -mt-0.5">{t("app.downloadAppStore")}</div>
                    </div>
                    <ExternalLink size={14} className="opacity-50 ml-auto" />
                  </Button>
                </motion.div>
              </Link>
              <Link
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="secondary" size="lg" className="gap-3 cursor-pointer w-full">
                    <Download size={22} />
                    <div className="text-left">
                      <div className="text-[10px] opacity-70">{t("app.getItOn")}</div>
                      <div className="text-sm font-semibold -mt-0.5">{t("app.downloadGooglePlay")}</div>
                    </div>
                    <ExternalLink size={14} className="opacity-50 ml-auto" />
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-64 h-96 rounded-[2.5rem] bg-secondary p-3 shadow-2xl"
              >
                <div className="w-full h-full rounded-[2rem] bg-background overflow-hidden p-4 flex flex-col">
                  <div className="w-20 h-2 bg-gray-200 rounded-full mx-auto mb-6" />
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                      <Smartphone size={16} className="text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-secondary">TradeHub</div>
                      <div className="text-[10px] text-gray-400">Online</div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-primary/5">
                      <Check size={12} className="text-primary shrink-0" />
                      <span className="text-[9px] text-gray-600">Order #TN-9842 shipped</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50">
                      <Check size={12} className="text-green-500 shrink-0" />
                      <span className="text-[9px] text-gray-600">Payment confirmed $12,500</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50">
                      <Check size={12} className="text-blue-500 shrink-0" />
                      <span className="text-[9px] text-gray-600">New quote from Supplier</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-50">
                      <Check size={12} className="text-amber-500 shrink-0" />
                      <span className="text-[9px] text-gray-600">Quality report ready</span>
                    </div>
                  </div>
                  <div className="mt-2 p-2 rounded-xl bg-primary/10">
                    <div className="text-[10px] font-semibold text-primary">3 New Messages</div>
                    <div className="text-[9px] text-gray-400">TechWave: Order ready for inspection</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100"
              >
                <QrCode size={80} className="text-secondary" />
                <p className="text-[10px] text-gray-400 text-center mt-1">{t("app.scanToDownload")}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
