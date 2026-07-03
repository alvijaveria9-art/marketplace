"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="relative py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-secondary to-secondary-light" />
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }} />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
              <Mail size={30} className="text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Ahead in Global Trade
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-lg mx-auto">
              Get weekly insights, market trends, and exclusive supplier offers delivered to your inbox
            </p>
          </motion.div>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-md mx-auto"
          >
            <div
              className={`flex items-center gap-2 p-1.5 rounded-2xl transition-all duration-300 ${
                focused
                  ? "bg-white shadow-xl shadow-black/10 ring-2 ring-primary"
                  : "bg-white/10 backdrop-blur-sm"
              }`}
            >
              <div className="flex-1 flex items-center gap-2 pl-3">
                <Mail size={18} className={focused ? "text-primary" : "text-gray-400"} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 bg-transparent text-sm py-2 focus:outline-none placeholder-gray-400 text-secondary"
                />
              </div>
              <Button type="submit" variant="primary" size="sm" className="rounded-xl">
                {subscribed ? (
                  <CheckCircle size={18} />
                ) : (
                  <Send size={18} />
                )}
                <span className="hidden sm:inline">{subscribed ? "Subscribed!" : "Subscribe"}</span>
              </Button>
            </div>
            <p className="text-white/40 text-xs mt-3">
              Join 250,000+ professionals. No spam, unsubscribe anytime.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
