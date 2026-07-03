"use client";

import { createContext, useContext, useState, useCallback } from "react";

export type Language = "en" | "ur";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string, vars?: Record<string, string>) => string;
  dir: "ltr" | "rtl";
}

const translations: Record<string, { en: string; ur: string }> = {
  "nav.home": { en: "Home", ur: "ہوم" },
  "nav.categories": { en: "Categories", ur: "زمرہ جات" },
  "nav.products": { en: "Products", ur: "مصنوعات" },
  "nav.suppliers": { en: "Suppliers", ur: "فراہم کنندگان" },
  "nav.services": { en: "Services", ur: "خدمات" },
  "nav.pricing": { en: "Pricing", ur: "قیمت" },
  "nav.about": { en: "About", ur: "ہمارے بارے میں" },
  "nav.contact": { en: "Contact", ur: "رابطہ" },
  "nav.login": { en: "Log In", ur: "لاگ ان" },
  "nav.signup": { en: "Sign Up", ur: "سائن اپ" },
  "nav.search": { en: "Search products, suppliers, categories...", ur: "مصنوعات، فراہم کنندگان، زمرہ جات تلاش کریں..." },
  "nav.language": { en: "Language", ur: "زبان" },
  "hero.headline": { en: "Global B2B Marketplace for Smart Business", ur: "سمارٹ بزنس کے لیے عالمی B2B مارکیٹ پلیس" },
  "hero.subtitle": { en: "Connect with verified suppliers worldwide. Source quality products, negotiate directly, and grow your business with confidence on the most trusted B2B platform.", ur: "دنیا بھر سے تصدیق شدہ فراہم کنندگان سے جڑیں۔ معیاری مصنوعات حاصل کریں، براہ راست گفت و شنید کریں، اور اعتماد کے ساتھ اپنے کاروبار کو بڑھائیں۔" },
  "hero.cta1": { en: "Start Sourcing", ur: "سورسنگ شروع کریں" },
  "hero.cta2": { en: "Become Supplier", ur: "فراہم کنندہ بنیں" },
  "hero.badge": { en: "Trusted by 40M+ buyers worldwide", ur: "دنیا بھر میں 40 ملین+ خریداروں کا اعتماد" },
  "categories.title": { en: "Explore Categories", ur: "زمرہ جات دریافت کریں" },
  "categories.subtitle": { en: "Browse millions of products across 10 major categories from global suppliers", ur: "عالمی فراہم کنندگان سے 10 بڑے زمروں میں لاکھوں مصنوعات دیکھیں" },
  "products.title": { en: "Featured Products", ur: "نمایاں مصنوعات" },
  "products.subtitle": { en: "Hand-picked products from verified suppliers with competitive pricing", ur: "تصدیق شدہ فراہم کنندگان سے مسابقتی قیمتوں پر منتخب مصنوعات" },
  "products.viewAll": { en: "View All Products", ur: "تمام مصنوعات دیکھیں" },
  "suppliers.title": { en: "Verified Suppliers", ur: "تصدیق شدہ فراہم کنندگان" },
  "suppliers.subtitle": { en: "Connect with trusted, verified suppliers with proven track records", ur: "قابل اعتماد، تصدیق شدہ فراہم کنندگان سے جڑیں" },
  "suppliers.contact": { en: "Contact Supplier", ur: "فراہم کنندہ سے رابطہ کریں" },
  "whychooseus.title": { en: "Why Choose TradeHub", ur: "ٹریڈ ہب کیوں منتخب کریں" },
  "whychooseus.subtitle": { en: "We provide everything you need for safe, efficient global trade", ur: "ہم محفوظ، موثر عالمی تجارت کے لیے ہر ضروری چیز فراہم کرتے ہیں" },
  "services.title": { en: "Our Services", ur: "ہماری خدمات" },
  "services.subtitle": { en: "Comprehensive trade services to support your global business journey", ur: "آپ کے عالمی کاروباری سفر کے لیے جامع تجارتی خدمات" },
  "stats.title": { en: "Trusted by Businesses Worldwide", ur: "دنیا بھر کے کاروباروں کا اعتماد" },
  "stats.subtitle": { en: "Our platform connects millions of buyers and suppliers across the globe", ur: "ہمارا پلیٹ فارم دنیا بھر میں لاکھوں خریداروں اور فراہم کنندگان کو جوڑتا ہے" },
  "testimonials.title": { en: "What Our Clients Say", ur: "ہمارے کلائنٹ کیا کہتے ہیں" },
  "testimonials.subtitle": { en: "Trusted by businesses of all sizes across the globe", ur: "دنیا بھر میں ہر سائز کے کاروباروں کا اعتماد" },
  "app.title": { en: "Trade on the Go", ur: "چلتے پھرتے تجارت کریں" },
  "app.subtitle": { en: "Download our mobile app and manage your business from anywhere", ur: "ہمارا موبائل ایپ ڈاؤن لوڈ کریں اور کہیں سے بھی اپنے کاروبار کا انتظام کریں" },
  "app.feature1": { en: "Real-time order tracking and notifications", ur: "ریئل ٹائم آرڈر ٹریکنگ اور اطلاعات" },
  "app.feature2": { en: "Instant messaging with suppliers worldwide", ur: "دنیا بھر کے فراہم کنندگان سے فوری پیغام رسانی" },
  "app.feature3": { en: "Quick price comparison and negotiation tools", ur: "فوری قیمت موازنہ اور گفت و شنید کے اوزار" },
  "app.feature4": { en: "Secure payment processing on the go", ur: "چلتے پھرتے محفوظ ادائیگی کی کارروائی" },
  "app.store": { en: "App Store", ur: "ایپ اسٹور" },
  "app.googleplay": { en: "Google Play", ur: "گوگل پلے" },
  "news.title": { en: "Latest News", ur: "تازہ ترین خبریں" },
  "news.subtitle": { en: "Stay informed with the latest trends and insights in global trade", ur: "عالمی تجارت میں تازہ ترین رجحانات اور بصیرت سے باخبر رہیں" },
  "news.readMore": { en: "Read More", ur: "مزید پڑھیں" },
  "news.viewAll": { en: "View All Articles", ur: "تمام مضامین دیکھیں" },
  "newsletter.title": { en: "Stay Ahead in Global Trade", ur: "عالمی تجارت میں آگے رہیں" },
  "newsletter.subtitle": { en: "Get weekly insights, market trends, and exclusive supplier offers delivered to your inbox", ur: "ہفتہ وار بصیرت، مارکیٹ کے رجحانات، اور خصوصی فراہم کنندہ پیشکشیں اپنے ان باکس میں حاصل کریں" },
  "newsletter.placeholder": { en: "Enter your email address", ur: "اپنا ای میل پتہ درج کریں" },
  "newsletter.button": { en: "Subscribe", ur: "سبسکرائب کریں" },
  "newsletter.success": { en: "Subscribed!", ur: "سبسکرائب ہو گیا!" },
  "newsletter.footer": { en: "Join 250,000+ professionals. No spam, unsubscribe anytime.", ur: "250,000+ پیشہ ور افراد میں شامل ہوں۔ کوئی اسپام نہیں، کسی بھی وقت ان سبسکرائب کریں۔" },
  "footer.description": { en: "The world's leading B2B marketplace connecting verified suppliers with global buyers. Empowering smart business since 2018.", ur: "دنیا کی معتبر B2B مارکیٹ پلیس جو تصدیق شدہ فراہم کنندگان کو عالمی خریداروں سے جوڑتی ہے۔ 2018 سے سمارٹ کاروبار کو بااختیار بنانا۔" },
  "footer.company": { en: "Company", ur: "کمپنی" },
  "footer.about": { en: "About Us", ur: "ہمارے بارے میں" },
  "footer.team": { en: "Our Team", ur: "ہماری ٹیم" },
  "footer.careers": { en: "Careers", ur: "کیریئرز" },
  "footer.press": { en: "Press", ur: "پریس" },
  "footer.blog": { en: "Blog", ur: "بلاگ" },
  "footer.products": { en: "Products", ur: "مصنوعات" },
  "footer.product.electronics": { en: "Electronics", ur: "الیکٹرانکس" },
  "footer.product.fashion": { en: "Fashion", ur: "فیشن" },
  "footer.product.machinery": { en: "Machinery", ur: "مشینری" },
  "footer.product.automotive": { en: "Automotive", ur: "آٹوموٹیو" },
  "footer.product.furniture": { en: "Furniture", ur: "فرنیچر" },
  "footer.suppliers": { en: "Suppliers", ur: "فراہم کنندگان" },
  "footer.supplier.become": { en: "Become a Supplier", ur: "فراہم کنندہ بنیں" },
  "footer.supplier.dashboard": { en: "Supplier Dashboard", ur: "فراہم کنندہ ڈیش بورڈ" },
  "footer.supplier.verification": { en: "Verification", ur: "تصدیق" },
  "footer.supplier.stories": { en: "Success Stories", ur: "کامیابی کی کہانیاں" },
  "footer.support": { en: "Support", ur: "سپورٹ" },
  "footer.support.help": { en: "Help Center", ur: "مدد" },
  "footer.support.contact": { en: "Contact Us", ur: "رابطہ کریں" },
  "footer.support.faq": { en: "FAQs", ur: "اکثر پوچھے گئے سوالات" },
  "footer.support.shipping": { en: "Shipping Info", ur: "شپنگ کی معلومات" },
  "footer.support.returns": { en: "Returns", ur: "واپسی" },
  "footer.legal": { en: "Legal", ur: "قانونی" },
  "footer.legal.terms": { en: "Terms of Service", ur: "خدمات کی شرائط" },
  "footer.legal.privacy": { en: "Privacy Policy", ur: "رازداری کی پالیسی" },
  "footer.legal.cookie": { en: "Cookie Policy", ur: "کوکی پالیسی" },
  "footer.legal.ip": { en: "Intellectual Property", ur: "دانشورانہ املاک" },
  "footer.copyright": { en: "All rights reserved.", ur: "جملہ حقوق محفوظ ہیں۔" },
  "hero.badgeText": { en: "Trusted by 40M+ buyers worldwide", ur: "دنیا بھر میں 40 ملین+ خریداروں کا اعتماد" },
  "hero.stats.suppliers": { en: "Suppliers", ur: "فراہم کنندگان" },
  "hero.stats.buyers": { en: "Buyers", ur: "خریدار" },
  "hero.stats.countries": { en: "Countries", ur: "ممالک" },
  "hero.stats.products": { en: "Products", ur: "مصنوعات" },
  "categories.browse": { en: "Browse millions of products across {count} major categories from global suppliers", ur: "عالمی فراہم کنندگان سے {count} بڑے زمروں میں لاکھوں مصنوعات دیکھیں" },
  "categories.modal.title": { en: "Browse millions of {name} products from verified suppliers worldwide. Find the best prices, quality products, and reliable partners for your business.", ur: "دنیا بھر سے تصدیق شدہ فراہم کنندگان سے {name} مصنوعات دریافت کریں۔ بہترین قیمتیں، معیاری مصنوعات، اور قابل اعتماد شراکت دار تلاش کریں۔" },
  "categories.modal.browse": { en: "Browse {name}", ur: "{name} دیکھیں" },
  "categories.modal.close": { en: "Close", ur: "بند کریں" },
  "categories.products": { en: "products", ur: "مصنوعات" },
  "products.searchPlaceholder": { en: "Search products, suppliers, categories...", ur: "مصنوعات، فراہم کنندگان، زمرہ جات تلاش کریں..." },
  "products.filters": { en: "Filters", ur: "فلٹرز" },
  "products.allCountries": { en: "All Countries", ur: "تمام ممالک" },
  "products.allPrices": { en: "All Prices", ur: "تمام قیمتیں" },
  "products.anyRating": { en: "Any Rating", ur: "کوئی بھی درجہ بندی" },
  "products.verifiedOnly": { en: "Verified Only", ur: "صرف تصدیق شدہ" },
  "products.clear": { en: "Clear", ur: "صاف کریں" },
  "products.allProducts": { en: "All Products", ur: "تمام مصنوعات" },
  "products.noResults": { en: "No products found matching your criteria", ur: "آپ کے معیار سے مطابقت رکھنے والی کوئی مصنوعات نہیں ملی" },
  "products.clearFilters": { en: "Clear Filters", ur: "فلٹرز صاف کریں" },
  "products.of": { en: "of", ur: "میں سے" },
  "products.sort.popularity": { en: "Popularity", ur: "مقبولیت" },
  "products.sort.priceLow": { en: "Price: Low to High", ur: "قیمت: کم سے زیادہ" },
  "products.sort.priceHigh": { en: "Price: High to Low", ur: "قیمت: زیادہ سے کم" },
  "products.sort.rating": { en: "Rating", ur: "درجہ بندی" },
  "products.sort.name": { en: "Name", ur: "نام" },
  "product.notFound": { en: "Product not found", ur: "مصنوعات نہیں ملی" },
  "product.backToHome": { en: "Back to Home", ur: "ہوم پیج پر واپس جائیں" },
  "product.share": { en: "Share", ur: "شیئر کریں" },
  "product.material": { en: "Material", ur: "مواد" },
  "product.warranty": { en: "Warranty", ur: "وارنٹی" },
  "product.certification": { en: "Certification", ur: "سرٹیفیکیشن" },
  "product.packaging": { en: "Packaging", ur: "پیکجنگ" },
  "product.delivery": { en: "Delivery", ur: "ڈیلیوری" },
  "product.payment": { en: "Payment", ur: "ادائیگی" },
  "product.contact": { en: "Contact", ur: "رابطہ کریں" },
  "suppliers.sendMessage": { en: "Send Message", ur: "پیغام بھیجیں" },
  "suppliers.sendEmail": { en: "Send Email", ur: "ای میل بھیجیں" },
  "suppliers.verified": { en: "Verified", ur: "تصدیق شدہ" },
  "suppliers.response": { en: "Response", ur: "جواب" },
  "suppliers.products": { en: "Products", ur: "مصنوعات" },
  "suppliers.inBusiness": { en: "In Business", ur: "کاروبار میں" },
  "suppliers.rating": { en: "Rating", ur: "درجہ بندی" },
  "app.feature1Title": { en: "Real-time order tracking", ur: "ریئل ٹائم آرڈر ٹریکنگ" },
  "app.feature1Desc": { en: "Monitor your orders from production to delivery with live updates", ur: "لائیو اپ ڈیٹس کے ساتھ پروڈکشن سے ڈیلیوری تک اپنے آرڈرز کی نگرانی کریں" },
  "app.feature2Title": { en: "Instant messaging", ur: "فوری پیغام رسانی" },
  "app.feature2Desc": { en: "Chat directly with suppliers worldwide in real-time", ur: "دنیا بھر کے فراہم کنندگان سے براہ راست حقیقی وقت میں چیٹ کریں" },
  "app.feature3Title": { en: "Price comparison", ur: "قیمت کا موازنہ" },
  "app.feature3Desc": { en: "Compare prices across multiple suppliers instantly", ur: "متعدد فراہم کنندگان کی قیمتوں کا فوری موازنہ کریں" },
  "app.feature4Title": { en: "Secure payments", ur: "محفوظ ادائیگیاں" },
  "app.feature4Desc": { en: "Protected payment gateway with buyer protection", ur: "خریدار کے تحفظ کے ساتھ محفوظ ادائیگی گیٹ وے" },
  "app.feature5Title": { en: "Push notifications", ur: "پش اطلاعات" },
  "app.feature5Desc": { en: "Get alerts for new messages, orders, and deals", ur: "نئے پیغامات، آرڈرز اور ڈیلز کے لیے الرٹس حاصل کریں" },
  "app.feature6Title": { en: "Document management", ur: "دستاویز کا انتظام" },
  "app.feature6Desc": { en: "Upload, sign, and manage trade documents on the go", ur: "چلتے پھرتے تجارتی دستاویزات اپ لوڈ، دستخط اور ان کا نظم کریں" },
  "app.downloadAppStore": { en: "App Store", ur: "ایپ اسٹور" },
  "app.downloadGooglePlay": { en: "Google Play", ur: "گوگل پلے" },
  "app.downloadOn": { en: "Download on", ur: "ڈاؤن لوڈ کریں" },
  "app.getItOn": { en: "Get it on", ur: "حاصل کریں" },
  "app.scanToDownload": { en: "Scan to download", ur: "ڈاؤن لوڈ کرنے کے لیے اسکین کریں" },
  "news.allArticles": { en: "All Articles", ur: "تمام مضامین" },
  "news.save": { en: "Save", ur: "محفوظ کریں" },
  "news.shareArticle": { en: "Share Article", ur: "مضمون شیئر کریں" },
  "news.minRead": { en: "min read", ur: "منٹ پڑھائی" },
  "news.backToHome": { en: "Back to Home", ur: "ہوم پیج پر واپس جائیں" },
  "whychooseus.verified.title": { en: "Verified Suppliers", ur: "تصدیق شدہ فراہم کنندگان" },
  "whychooseus.payments.title": { en: "Secure Payments", ur: "محفوظ ادائیگیاں" },
  "whychooseus.assurance.title": { en: "Trade Assurance", ur: "تجارتی یقین دہانی" },
  "whychooseus.shipping.title": { en: "Worldwide Shipping", ur: "عالمی شپنگ" },
  "whychooseus.support.title": { en: "24/7 Support", ur: "24/7 سپورٹ" },
  "whychooseus.delivery.title": { en: "Fast Delivery", ur: "تیز ترسیل" },
  "whychooseus.inspection.title": { en: "Quality Inspection", ur: "معیار کا معائنہ" },
  "whychooseus.warehousing.title": { en: "Global Warehousing", ur: "عالمی گودام" },
  "services.benefits": { en: "Key Benefits", ur: "اہم فوائد" },
  "services.howItWorks": { en: "How It Works", ur: "یہ کیسے کام کرتا ہے" },
  "services.learnMore": { en: "Learn More", ur: "مزید جانیں" },
  "services.getStarted": { en: "Get Started", ur: "شروع کریں" },
  "product.moq": { en: "MOQ", ur: "کم از کم آرڈر" },
  "product.rating": { en: "Rating", ur: "درجہ بندی" },
  "product.compare": { en: "Compare", ur: "موازنہ کریں" },
  "product.added": { en: "Added", ur: "شامل ہو گیا" },
  "product.quickView": { en: "Quick View", ur: "فوری منظر" },
  "product.favorite": { en: "Favorite", ur: "پسندیدہ" },
  "product.details": { en: "Product Details", ur: "مصنوعات کی تفصیلات" },
  "product.description": { en: "Description", ur: "تفصیل" },
  "product.specs": { en: "Specifications", ur: "خصوصیات" },
  "product.reviews": { en: "Reviews", ur: "جائزے" },
  "product.related": { en: "Related Products", ur: "متعلقہ مصنوعات" },
  "product.supplier": { en: "Supplier Information", ur: "فراہم کنندہ کی معلومات" },
  "product.price": { en: "Price Range", ur: "قیمت کی حد" },
  "product.country": { en: "Country", ur: "ملک" },
  "auth.loginTitle": { en: "Welcome Back", ur: "خوش آمدید" },
  "auth.loginSubtitle": { en: "Sign in to your TradeHub account", ur: "اپنے ٹریڈ ہب اکاؤنٹ میں سائن ان کریں" },
  "auth.signupTitle": { en: "Create Account", ur: "اکاؤنٹ بنائیں" },
  "auth.signupSubtitle": { en: "Join millions of businesses on TradeHub", ur: "ٹریڈ ہب پر لاکھوں کاروباروں میں شامل ہوں" },
  "auth.name": { en: "Full Name", ur: "پورا نام" },
  "auth.email": { en: "Email Address", ur: "ای میل پتہ" },
  "auth.password": { en: "Password", ur: "پاس ورڈ" },
  "auth.noAccount": { en: "Don't have an account?", ur: "اکاؤنٹ نہیں ہے؟" },
  "auth.hasAccount": { en: "Already have an account?", ur: "پہلے سے اکاؤنٹ ہے؟" },
  "auth.signupLink": { en: "Sign up", ur: "سائن اپ کریں" },
  "auth.loginLink": { en: "Log in", ur: "لاگ ان کریں" },
  "auth.logout": { en: "Log Out", ur: "لاگ آؤٹ" },
  "auth.error.required": { en: "All fields are required", ur: "تمام فیلڈز ضروری ہیں" },
  "auth.error.password": { en: "Password must be at least 6 characters", ur: "پاس ورڈ کم از کم 6 حروف کا ہونا چاہیے" },
  "search.placeholder": { en: "Search products, suppliers, categories...", ur: "مصنوعات، فراہم کنندگان، زمرہ جات تلاش کریں..." },
  "common.loading": { en: "Loading...", ur: "لوڈ ہو رہا ہے..." },
  "common.error": { en: "Error", ur: "خرابی" },
  "common.back": { en: "Back", ur: "واپس" },
  "suppliers.yearsExperience": { en: "With {years} years of experience, they are a trusted partner in the industry.", ur: "{years} سال کے تجربے کے ساتھ، وہ صنعت میں ایک قابل اعتماد پارٹنر ہیں۔" },
  "suppliers.whatsappMessage": { en: "WhatsApp Message", ur: "واٹس ایپ پیغام" },
  "suppliers.typeMessage": { en: "Type your message here...", ur: "اپنا پیغام یہاں ٹائپ کریں..." },
  "suppliers.sendWhatsApp": { en: "Send via WhatsApp", ur: "واٹس ایپ کے ذریعے بھیجیں" },
  "suppliers.emailTo": { en: "Email to {name}", ur: "{name} کو ای میل کریں" },
  "suppliers.emailDescription": { en: "Your default email client will open with a pre-filled inquiry message for {name}.", ur: "آپ کا ڈیفالٹ ای میل کلائنٹ {name} کے لیے پہلے سے بھرے ہوئے انکوائری پیغام کے ساتھ کھلے گا۔" },
  "suppliers.openEmailClient": { en: "Open Email Client", ur: "ای میل کلائنٹ کھولیں" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("tradehub_lang", newLang);
    }
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string>): string => {
      let val = translations[key]?.[lang] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          val = val.replace(`{${k}}`, v);
        }
      }
      return val;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir: lang === "ur" ? "rtl" : "ltr" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
