"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck, Lock, BadgeCheck, Globe, Headphones,
  Truck, SearchCheck, Warehouse,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { whyChooseUs } from "@/data/services";
import { useLanguage } from "@/context/LanguageContext";

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck, Lock, BadgeCheck, Globe, Headphones,
  Truck, SearchCheck, Warehouse,
};

export default function WhyChooseUs() {
  const { t } = useLanguage();

  const translationKeys: Record<string, [string, string]> = {
    w1: ["whychooseus.verified.title", whyChooseUs[0].description],
    w2: ["whychooseus.payments.title", whyChooseUs[1].description],
    w3: ["whychooseus.assurance.title", whyChooseUs[2].description],
    w4: ["whychooseus.shipping.title", whyChooseUs[3].description],
    w5: ["whychooseus.support.title", whyChooseUs[4].description],
    w6: ["whychooseus.delivery.title", whyChooseUs[5].description],
    w7: ["whychooseus.inspection.title", whyChooseUs[6].description],
    w8: ["whychooseus.warehousing.title", whyChooseUs[7].description],
  };

  return (
    <section id="whychooseus" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t("whychooseus.title")}
          subtitle={t("whychooseus.subtitle")}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyChooseUs.map((item, i) => {
            const Icon = iconMap[item.icon] || ShieldCheck;
            const [titleKey, desc] = translationKeys[item.id] || [item.id, item.description];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -5 }}
                className="group bg-white rounded-2xl p-6 border border-gray-100/50 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                  <Icon size={24} className="text-primary group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-lg font-semibold text-secondary mb-2">{t(titleKey)}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}