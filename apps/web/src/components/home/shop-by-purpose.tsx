"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, Home, Gift, Sparkles } from "lucide-react";
import { buildLocalizedPath, SHOP_BY_PURPOSE } from "@puja/config";
import type { CountryConfig } from "@puja/types";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { TempleSection } from "@/components/ui/temple-section";

const PURPOSE_ICONS: Record<string, typeof Flame> = {
  "daily-puja": Flame,
  "jain-daily-puja": Sparkles,
  "new-home": Home,
  diwali: Sparkles,
  gifting: Gift,
};

interface ShopByPurposeProps {
  country: CountryConfig;
}

export function ShopByPurpose({ country }: ShopByPurposeProps) {
  const prefix = (path: string) => buildLocalizedPath(path, country);

  return (
    <TempleSection variant="section" className="py-14 sm:py-16 border-y border-gold/10">
      <div className="container-main">
        <FadeIn>
          <SectionHeading
            title="Shop by Purpose"
            subtitle="Not sure what category you need? Start with what you're preparing for."
          />
        </FadeIn>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {SHOP_BY_PURPOSE.map((purpose, i) => {
            const Icon = PURPOSE_ICONS[purpose.slug] ?? Flame;
            return (
              <motion.div
                key={purpose.slug}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
              >
                <Link
                  href={prefix(`/shop-by-purpose/${purpose.slug}`)}
                  className="group flex flex-col gap-3 p-5 sm:p-6 ornate-card hover:ring-1 hover:ring-saffron/30 transition-all duration-300 h-full"
                >
                  <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-saffron/20 to-gold/20 flex items-center justify-center group-hover:from-saffron/35 group-hover:to-gold/35 transition-colors ring-1 ring-gold/20">
                    <Icon className="w-5 h-5 text-saffron" />
                  </span>
                  <div>
                    <h3 className="font-display font-medium text-brown group-hover:text-saffron transition-colors text-sm sm:text-base">
                      {purpose.name}
                    </h3>
                    {purpose.tradition === "jain" && (
                      <span className="inline-block mt-2 text-[10px] font-semibold uppercase tracking-wider text-gold bg-gold/10 px-2 py-0.5 rounded ring-1 ring-gold/20">
                        Jain
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </TempleSection>
  );
}
