"use client";

import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { MandalaBg } from "@/components/ui/mandala-bg";
import { FloatingDiyas } from "@/components/ui/floating-diyas";

export function NewsletterSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-brown via-maroon to-brown" />
      <MandalaBg className="w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15 animate-mandala-spin" />
      <div className="absolute inset-0 bg-spiritual-pattern opacity-10" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,rgba(232,132,26,0.2),transparent)]" />
      <FloatingDiyas count={4} />

      <div className="container-main relative z-[1] text-center max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 text-saffron-light mb-4">
            <span className="text-xl animate-diya-flicker">🪔</span>
            <span className="font-devanagari text-sm tracking-[0.3em]">शुभ आमंत्रण</span>
            <span className="text-xl animate-diya-flicker">🪔</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-cream text-shadow-temple">
            Festival Alerts & Puja Guides
          </h2>
          <p className="mt-4 text-cream/75 text-sm sm:text-base leading-relaxed">
            Get puja checklists, festival offers, and helpful guides — no spam, ever.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          action="/api/newsletter"
          method="POST"
          onSubmit={async (e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            await fetch("/api/newsletter", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: fd.get("email") }),
            });
            alert("Thank you for subscribing!");
            e.currentTarget.reset();
          }}
        >
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-light/50" />
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              required
              className="w-full pl-10 pr-4 py-3.5 rounded-xl text-brown text-sm bg-cream shadow-lg border border-gold/20 focus:ring-2 focus:ring-saffron outline-none"
              aria-label="Email address"
            />
          </div>
          <button
            type="submit"
            className="btn-shine px-7 py-3.5 rounded-xl bg-gradient-to-r from-saffron to-saffron-light text-white font-semibold shadow-lg shadow-saffron/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap ring-2 ring-gold/20"
          >
            Subscribe
          </button>
        </motion.form>
      </div>
    </section>
  );
}
