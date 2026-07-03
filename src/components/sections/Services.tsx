"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Handshake, Ship, ClipboardCheck, Banknote, Warehouse as WarehouseIcon, FileText, X,
} from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { services } from "@/data/services";
import type { Service } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

const iconMap: Record<string, React.ElementType> = {
  Handshake, Ship, ClipboardCheck, Banknote, Warehouse: WarehouseIcon, FileText,
};

const serviceDetails: Record<string, { benefits: string[]; process: string[]; cta: string }> = {
  sv1: {
    benefits: ["AI-powered supplier matching", "Personalized recommendations", "Verified partner network"],
    process: ["Submit requirements", "AI analyzes best matches", "Get connected with top suppliers"],
    cta: "Start Business Matching",
  },
  sv2: {
    benefits: ["End-to-end freight forwarding", "Real-time shipment tracking", "Customs clearance support"],
    process: ["Book shipment", "Warehouse pickup", "Door-to-door delivery"],
    cta: "Get Logistics Quote",
  },
  sv3: {
    benefits: ["Third-party quality checks", "Production stage inspections", "Compliance certification"],
    process: ["Schedule inspection", "Expert on-site check", "Receive detailed report"],
    cta: "Book Inspection",
  },
  sv4: {
    benefits: ["Flexible financing options", "Supply chain financing", "Letters of credit"],
    process: ["Apply for financing", "Quick approval", "Funds disbursed"],
    cta: "Apply for Financing",
  },
  sv5: {
    benefits: ["Secure storage facilities", "Inventory management", "Order fulfillment"],
    process: ["Store products", "Manage inventory", "Ship on demand"],
    cta: "Explore Warehousing",
  },
  sv6: {
    benefits: ["Documentation support", "Compliance guidance", "Regulatory expertise"],
    process: ["Submit documents", "Expert review", "Complete clearance"],
    cta: "Get Import Help",
  },
};

export default function Services() {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t("services.title")}
          subtitle={t("services.subtitle")}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Handshake;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative bg-white rounded-2xl border border-gray-100/50 p-6 overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedService(service)}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 group-hover:bg-primary/10 transition-colors duration-500" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-5 group-hover:from-primary group-hover:to-primary-dark transition-all duration-500">
                    <Icon size={26} className="text-primary group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary mb-3">{service.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>
                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:gap-2 transition-all cursor-pointer">
                      {t("news.readMore")}
                      <span className="ml-1 group-hover:ml-2 transition-all">→</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {selectedService && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setSelectedService(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white relative">
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30"
              >
                <X size={16} />
              </button>
              {(() => {
                const Icon = iconMap[selectedService.icon] || Handshake;
                return <Icon size={36} className="mb-3" />;
              })()}
              <h3 className="text-2xl font-bold">{selectedService.title}</h3>
              <p className="text-white/80 text-sm mt-1">{selectedService.description}</p>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-secondary mb-3">{t("services.benefits")}</h4>
                <div className="space-y-2">
                  {(serviceDetails[selectedService.id]?.benefits || ["Quality service", "Expert support", "Fast turnaround"]).map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-secondary mb-3">{t("services.howItWorks")}</h4>
                <div className="space-y-2">
                  {(serviceDetails[selectedService.id]?.process || ["Submit request", "We review", "Get started"]).map((p, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-primary">{i + 1}</span>
                      </div>
                      {p}
                    </div>
                  ))}
                </div>
              </div>
              <Button variant="primary" size="md" className="w-full cursor-pointer">
                {(serviceDetails[selectedService.id]?.cta || "Get Started")}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
