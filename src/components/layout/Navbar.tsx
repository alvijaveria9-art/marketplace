"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Globe, ChevronDown, ShoppingBag, User, LogOut } from "lucide-react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useLanguage, type Language } from "@/context/LanguageContext";

const navLinks = [
  { key: "nav.home", href: "/" },
  { key: "nav.categories", href: "/#categories" },
  { key: "nav.products", href: "/products" },
  { key: "nav.suppliers", href: "/#suppliers" },
  { key: "nav.services", href: "/#services" },
  { key: "nav.pricing", href: "/#pricing" },
  { key: "nav.about", href: "/#about" },
  { key: "nav.contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { t, lang, setLang } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-sm shadow-black/5"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <motion.div
                className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag className="text-white" size={20} />
              </motion.div>
              <span className="text-xl font-bold text-secondary tracking-tight">
                Trade<span className="text-primary">Hub</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary rounded-lg hover:bg-primary/5 transition-colors relative group inline-block"
                  >
                    {t(link.key)}
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform rounded-full" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 rounded-xl text-gray-500 hover:text-primary hover:bg-primary/5 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search size={20} />
              </motion.button>

              <div className="relative">
                <motion.button
                  onClick={() => setLangOpen(!langOpen)}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary/5 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Globe size={16} />
                  <span>{lang.toUpperCase()}</span>
                  <ChevronDown size={14} />
                </motion.button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-32 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 overflow-hidden"
                    >
                      {(["en", "ur"] as Language[]).map((l) => (
                        <button
                          key={l}
                          onClick={() => { setLang(l); setLangOpen(false); }}
                          className={`w-full px-4 py-2.5 text-sm text-left hover:bg-primary/5 transition-colors ${
                            lang === l ? "text-primary font-semibold bg-primary/5" : "text-gray-600"
                          }`}
                        >
                          {l === "en" ? "🇬🇧 English" : "🇵🇰 اردو"}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {user ? (
                <div className="relative">
                  <motion.button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary/5 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <User size={14} className="text-primary" />
                    </div>
                    <span className="hidden sm:inline max-w-[100px] truncate">{user.name}</span>
                  </motion.button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 overflow-hidden"
                      >
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-semibold text-secondary">{user.name}</p>
                          <p className="text-xs text-gray-400 truncate">{user.email}</p>
                        </div>
                        <button
                          onClick={() => { logout(); setUserMenuOpen(false); }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={14} />
                          {t("auth.logout")}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link href="/login">
                    <Button variant="ghost" size="sm">{t("nav.login")}</Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="primary" size="sm">{t("nav.signup")}</Button>
                  </Link>
                </div>
              )}

              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2.5 rounded-xl text-gray-500 hover:text-primary hover:bg-primary/5 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-100 overflow-hidden"
            >
              <div className="max-w-3xl mx-auto px-4 py-4">
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                  <Search size={20} className="text-gray-400 shrink-0" />
                  <input
                    type="text"
                    placeholder={t("search.placeholder")}
                    className="flex-1 bg-transparent text-sm text-secondary placeholder-gray-400 focus:outline-none"
                    autoFocus
                  />
                  <kbd className="hidden sm:inline-flex px-2 py-0.5 text-xs text-gray-400 bg-gray-100 rounded-lg">⌘K</kbd>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl p-6 pt-20 overflow-y-auto"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-base font-medium text-gray-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </div>

              <div className="mt-3 flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-50">
                <Globe size={16} className="text-gray-400" />
                <span className="text-sm text-gray-500">{t("nav.language")}:</span>
                <div className="flex gap-1">
                  {(["en", "ur"] as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setMobileOpen(false); }}
                      className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                        lang === l ? "bg-primary text-white" : "text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {l === "en" ? "EN" : "اردو"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-3">
                {user ? (
                  <div className="flex flex-col gap-3">
                    <div className="px-4 py-3 rounded-xl bg-gray-50">
                      <p className="text-sm font-semibold text-secondary">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                    <button
                      onClick={() => { logout(); setMobileOpen(false); }}
                      className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-red-500 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                    >
                      <LogOut size={16} />
                      {t("auth.logout")}
                    </button>
                  </div>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" className="w-full">{t("nav.login")}</Button>
                    </Link>
                    <Link href="/signup" onClick={() => setMobileOpen(false)}>
                      <Button variant="primary" className="w-full">{t("nav.signup")}</Button>
                    </Link>
                  </>
                )}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
