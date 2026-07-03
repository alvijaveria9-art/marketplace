"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, Star, Package, MessageCircle, X, Mail, Phone, Send } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { suppliers } from "@/data/suppliers";
import type { Supplier } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

export default function VerifiedSuppliers() {
  const { t } = useLanguage();
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [messageMode, setMessageMode] = useState<"contact" | "message" | "email">("contact");
  const [messageText, setMessageText] = useState("");

  const openContact = (supplier: Supplier, mode: "message" | "email") => {
    setSelectedSupplier(supplier);
    setMessageMode(mode);
    setMessageText("");
  };

  const handleSendMessage = () => {
    if (!selectedSupplier || !messageText.trim()) return;
    const encoded = encodeURIComponent(messageText);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
    setSelectedSupplier(null);
  };

  const handleSendEmail = () => {
    if (!selectedSupplier) return;
    const subject = encodeURIComponent(`Inquiry for ${selectedSupplier.name}`);
    const body = encodeURIComponent(
      `Dear ${selectedSupplier.name},\n\nI am interested in learning more about your products. Please provide me with further information.\n\nThank you.`
    );
    window.open(`mailto:info@${selectedSupplier.name.toLowerCase().replace(/\s+/g, "")}.com?subject=${subject}&body=${body}`, "_blank");
    setSelectedSupplier(null);
  };

  return (
    <section id="suppliers" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t("suppliers.title")}
          subtitle={t("suppliers.subtitle")}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliers.map((supplier, i) => (
            <motion.div
              key={supplier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group bg-white rounded-2xl border border-gray-100/50 p-6 hover:shadow-xl hover:shadow-black/5 transition-all duration-500 cursor-pointer"
              onClick={() => { setSelectedSupplier(supplier); setMessageMode("contact"); }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                  <img src={supplier.logo} alt={supplier.name} className="w-12 h-12 object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-secondary truncate">{supplier.name}</h3>
                    {supplier.verified && (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ShieldCheck size={18} className="text-blue-500 shrink-0" />
                      </motion.div>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-gray-700">{supplier.rating}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-500">{supplier.country}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-1">{supplier.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="text-center p-2.5 rounded-xl bg-gray-50">
                  <Clock size={14} className="mx-auto text-primary mb-1" />
                  <p className="text-[11px] font-medium text-secondary">{supplier.responseTime}</p>
                  <p className="text-[10px] text-gray-400">{t("suppliers.response")}</p>
                </div>
                <div className="text-center p-2.5 rounded-xl bg-gray-50">
                  <Package size={14} className="mx-auto text-primary mb-1" />
                  <p className="text-[11px] font-medium text-secondary">{supplier.productsCount.toLocaleString()}</p>
                  <p className="text-[10px] text-gray-400">{t("suppliers.products")}</p>
                </div>
                <div className="text-center p-2.5 rounded-xl bg-gray-50">
                  <ShieldCheck size={14} className="mx-auto text-primary mb-1" />
                  <p className="text-[11px] font-medium text-secondary">{supplier.yearsInBusiness}+ yrs</p>
                  <p className="text-[10px] text-gray-400">{t("suppliers.inBusiness")}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1 cursor-pointer"
                  onClick={(e) => { e.stopPropagation(); openContact(supplier, "message"); }}
                >
                  <MessageCircle size={16} />
                  {t("suppliers.sendMessage")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 cursor-pointer"
                  onClick={(e) => { e.stopPropagation(); openContact(supplier, "email"); }}
                >
                  <Mail size={16} />
                  {t("suppliers.sendEmail")}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedSupplier && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setSelectedSupplier(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {messageMode === "contact" ? (
              <>
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                      <img src={selectedSupplier.logo} alt={selectedSupplier.name} className="w-12 h-12 object-contain" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-secondary">{selectedSupplier.name}</h3>
                        {selectedSupplier.verified && (
                          <Badge variant="success">
                            <ShieldCheck size={12} className="inline mr-1" />
                            {t("suppliers.verified")}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{selectedSupplier.country}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedSupplier(null)}
                    className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 shrink-0"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="text-center p-3 rounded-xl bg-gray-50">
                    <Star size={16} className="mx-auto text-amber-400 mb-1" />
                    <p className="text-sm font-bold text-secondary">{selectedSupplier.rating}</p>
                    <p className="text-xs text-gray-400">{t("suppliers.rating")}</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-gray-50">
                    <Package size={16} className="mx-auto text-primary mb-1" />
                    <p className="text-sm font-bold text-secondary">{selectedSupplier.productsCount.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">{t("suppliers.products")}</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-gray-50">
                    <Clock size={16} className="mx-auto text-primary mb-1" />
                    <p className="text-sm font-bold text-secondary">{selectedSupplier.responseTime}</p>
                    <p className="text-xs text-gray-400">{t("suppliers.response")}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-6">
                  {selectedSupplier.description}. {t("suppliers.yearsExperience", { years: String(selectedSupplier.yearsInBusiness) })}
                </p>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full cursor-pointer"
                    onClick={() => setMessageMode("message")}
                  >
                    <MessageCircle size={16} />
                    {t("suppliers.sendMessage")}
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full cursor-pointer"
                    onClick={() => setMessageMode("email")}
                  >
                    <Mail size={16} />
                    {t("suppliers.sendEmail")}
                  </Button>
                </div>
              </>
            ) : messageMode === "message" ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-secondary">
                    Message to {selectedSupplier.name}
                  </h3>
                  <button
                    onClick={() => setSelectedSupplier(null)}
                    className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 shrink-0"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 mb-4">
                  <Phone size={16} className="text-primary" />
                  <span className="text-sm text-gray-600">{t("suppliers.whatsappMessage")}</span>
                </div>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder={t("suppliers.typeMessage")}
                  rows={4}
                  className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm outline-none resize-none mb-4"
                />
                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    size="md"
                    className="flex-1 cursor-pointer"
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                  >
                    <Send size={16} />
                    {t("suppliers.sendWhatsApp")}
                  </Button>
                  <Button variant="ghost" size="md" className="cursor-pointer" onClick={() => setMessageMode("contact")}>
                    {t("common.back")}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-secondary">
                    {t("suppliers.emailTo", { name: selectedSupplier.name })}
                  </h3>
                  <button
                    onClick={() => setSelectedSupplier(null)}
                    className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 shrink-0"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 mb-4">
                  <Mail size={16} className="text-primary" />
                  <span className="text-sm text-gray-600">
                    info@{selectedSupplier.name.toLowerCase().replace(/\s+/g, "")}.com
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  {t("suppliers.emailDescription", { name: selectedSupplier.name })}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    size="md"
                    className="flex-1 cursor-pointer"
                    onClick={handleSendEmail}
                  >
                    <Mail size={16} />
                    {t("suppliers.openEmailClient")}
                  </Button>
                  <Button variant="ghost" size="md" className="cursor-pointer" onClick={() => setMessageMode("contact")}>
                    {t("common.back")}
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
