"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { buildLocalizedPath } from "@puja/config";
import type { CountryConfig } from "@puja/types";
import { HERO_IMAGE, HERO_IMAGE_ALT } from "@/lib/images";
import { TempleBackground } from "@/components/ui/temple-background";
import { FloatingDiyas } from "@/components/ui/floating-diyas";
import { TempleArchFrame } from "@/components/ui/temple-arch-frame";

interface HeroCampaignProps {
  country: CountryConfig;
  campaign?: {
    heading: string;
    subheading: string;
    ctaText: string;
    ctaUrl: string;
  };
}

const DEFAULT = {
  heading: "Everything You Need for Your Daily Puja",
  subheading:
    "Authentic puja samagri, brass items, and complete kits — quality you can see, prices you can trust.",
  ctaText: "Shop Puja Essentials",
  ctaUrl: "/categories/puja-samagri",
};

export function HeroCampaign({ country, campaign = DEFAULT }: HeroCampaignProps) {
  const prefix = (path: string) => buildLocalizedPath(path, country);

  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center">
      <TempleBackground variant="hero" />
      <FloatingDiyas count={8} />

      <div className="container-main relative z-[2] py-16 md:py-24 lg:py-28 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-devanagari text-saffron-light/90 text-sm sm:text-base mb-4 text-shadow-temple"
          >
            ॐ शुभम् · सत्य · शुद्ध · श्रद्धा
          </motion.p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-gold/30 text-gold-light text-xs font-medium mb-6">
            <span className="animate-diya-flicker">🪔</span>
            {country.code === "IN"
              ? "India's Trusted Puja Store"
              : `Delivered to ${country.name}`}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] text-cream leading-[1.12] text-shadow-temple">
            {campaign.heading}
          </h1>
          <p className="font-devanagari text-gold-light/90 text-base mt-3 tracking-wide">
            पवित्र पूजा · शुद्ध सामग्री · सच्चे मूल्य
          </p>

          <p className="mt-6 text-base sm:text-lg text-cream/80 max-w-lg leading-relaxed">
            {campaign.subheading}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-4">
            <Link
              href={prefix(campaign.ctaUrl)}
              className="btn-shine inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-saffron via-saffron-light to-gold text-white font-semibold shadow-xl shadow-saffron/30 hover:shadow-2xl hover:shadow-saffron/40 hover:-translate-y-1 transition-all duration-300 ring-2 ring-gold/20"
            >
              {campaign.ctaText}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={prefix("/categories/puja-kits")}
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-gold/40 text-cream font-semibold hover:border-saffron-light hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              View Puja Kits
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-12 flex flex-wrap gap-8 text-sm text-cream/70"
          >
            {[
              { icon: "🪔", text: "Authentic products" },
              { icon: "🌍", text: "Ships to 9 countries" },
              { icon: "📿", text: "Hindu & Jain" },
            ].map((item, i) => (
              <motion.span
                key={item.text}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="flex items-center gap-2.5"
              >
                <span className="text-lg animate-diya-flicker">{item.icon}</span>
                {item.text}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <TempleArchFrame>
            <div className="relative aspect-[4/3] bg-gradient-to-b from-cream to-ivory">
              <Image
                src={HERO_IMAGE}
                alt={HERO_IMAGE_ALT}
                fill
                priority
                className="object-contain p-8"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-brown/80 to-transparent">
                <p className="font-display text-cream text-xl">Daily Puja, Done Right</p>
                <p className="text-cream/75 text-sm mt-1 font-devanagari">दीप · समग्री · पूजा किट</p>
              </div>
            </div>
          </TempleArchFrame>

          <motion.div
            animate={{ y: [0, -14, 0], rotate: [0, 3, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-2 sm:right-2 w-20 h-20 rounded-full bg-gradient-to-br from-saffron to-gold flex items-center justify-center text-3xl shadow-2xl shadow-saffron/50 ring-4 ring-gold/30 animate-diya-flicker"
            aria-hidden
          >
            🪔
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade into ivory */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ivory to-transparent z-[1]" />
    </section>
  );
}
