"use client";

import Link from "next/link";
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
        <FadeIn direction="up">
          <SectionHeading
            title="Shop by Purpose"
            subtitle="Not sure what category you need? Start with what you're preparing for."
          />
        </FadeIn>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {SHOP_BY_PURPOSE.map((purpose) => {
            const Icon = PURPOSE_ICONS[purpose.slug] ?? Flame;
            return (
              <Link
                key={purpose.slug}
                href={prefix(`/shop-by-purpose/${purpose.slug}`)}
                className="group flex h-full flex-col gap-3 p-5 sm:p-6 ornate-card transition-[box-shadow,transform] duration-[var(--duration-medium)] ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-md hover:shadow-brown/5 motion-reduce:transform-none"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brass/10 ring-1 ring-brass/15 transition-colors duration-[var(--duration-fast)] group-hover:bg-brass/15">
                  <Icon className="h-5 w-5 text-saffron" />
                </span>
                <div>
                  <h3 className="font-display text-sm sm:text-base font-medium text-brown transition-colors duration-[var(--duration-fast)] group-hover:text-saffron">
                    {purpose.name}
                  </h3>
                  {purpose.tradition === "jain" && (
                    <span className="mt-2 inline-block rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold ring-1 ring-gold/20 bg-gold/10">
                      Jain
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </TempleSection>
  );
}
