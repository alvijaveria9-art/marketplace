"use client";

import { ShoppingBag, Mail, Phone, MapPin, ChevronRight, Globe, MessageCircle, Camera, Users, Video } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = {
    company: [t("footer.about"), t("footer.team"), t("footer.careers"), t("footer.press"), t("footer.blog")],
    products: [t("footer.product.electronics"), t("footer.product.fashion"), t("footer.product.machinery"), t("footer.product.automotive"), t("footer.product.furniture")],
    suppliers: [t("footer.supplier.become"), t("footer.supplier.dashboard"), t("footer.supplier.verification"), t("footer.supplier.stories")],
    support: [t("footer.support.help"), t("footer.support.contact"), t("footer.support.faq"), t("footer.support.shipping"), t("footer.support.returns")],
    legal: [t("footer.legal.terms"), t("footer.legal.privacy"), t("footer.legal.cookie"), t("footer.legal.ip")],
  };

  const socialLinks = [
    { icon: Globe, href: "#" },
    { icon: MessageCircle, href: "#" },
    { icon: Camera, href: "#" },
    { icon: Users, href: "#" },
    { icon: Video, href: "#" },
  ];

  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <ShoppingBag className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Trade<span className="text-primary">Hub</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              {t("footer.description")}
            </p>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <a href="mailto:alvijaveria9@gmail.com" className="flex items-center gap-3 hover:text-primary transition-colors">
                <Mail size={16} className="text-primary" />
                alvijaveria9@gmail.com
              </a>
               <a href="tel:+923280277542" className="flex items-center gap-3 hover:text-primary transition-colors">
                <Phone size={16} className="text-primary" />
                03280277542
              </a>
              <span className="flex items-center gap-3">
                <MapPin size={16} className="text-primary shrink-0" />
                Punjab, Pakistan
              </span>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80 mb-4 capitalize">
                {t(`footer.${category}`)}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-primary transition-colors flex items-center gap-1 group"
                    >
                      <ChevronRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={`social-${index}`}
                href={social.href}
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary/20 hover:text-primary transition-all"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-primary transition-colors">English</a>
            <span>|</span>
            <a href="#" className="hover:text-primary transition-colors">عربي</a>
            <span>|</span>
            <a href="#" className="hover:text-primary transition-colors">中文</a>
            <span>|</span>
            <a href="#" className="hover:text-primary transition-colors">Español</a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} TradeHub. {t("footer.copyright")}</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary transition-colors">{t("footer.legal.privacy")}</a>
            <a href="#" className="hover:text-primary transition-colors">{t("footer.legal.terms")}</a>
            <a href="#" className="hover:text-primary transition-colors">{t("footer.legal.cookie")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}