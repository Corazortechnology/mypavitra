"use client";

import Link from "next/link";
import { Shield, IndianRupee, Globe, Package, BookOpen, RotateCcw } from "lucide-react";
import { buildLocalizedPath } from "@puja/config";
import type { CountryConfig } from "@puja/types";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn, StaggerGrid, StaggerItem } from "@/components/motion/fade-in";
import { TempleSection } from "@/components/ui/temple-section";

const TRUST_ITEMS = [
  { icon: Shield, title: "Quality Checked", desc: "Transparent specs on every product" },
  { icon: IndianRupee, title: "Honest Pricing", desc: "Fair prices, no fake discounts" },
  { icon: Globe, title: "Ships Worldwide", desc: "India + 8 international markets" },
  { icon: Package, title: "Complete Kits", desc: "Everything in one puja kit" },
  { icon: BookOpen, title: "Puja Guides", desc: "Learn how to use every item" },
  { icon: RotateCcw, title: "Easy Returns", desc: "Hassle-free where applicable" },
];

interface TrustSectionProps {
  country: CountryConfig;
}

export function TrustSection({ country }: TrustSectionProps) {
  const prefix = (path: string) => buildLocalizedPath(path, country);

  return (
    <TempleSection variant="section" className="py-14 sm:py-20">
      <div className="container-main">
        <FadeIn className="text-center mb-12">
          <SectionHeading
            title="Why Devotees Trust Us"
            subtitle="Built on authenticity, transparency, and respect for tradition"
            align="center"
          />
        </FadeIn>

        <StaggerGrid className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {TRUST_ITEMS.map((item) => (
            <StaggerItem key={item.title}>
              <div className="group flex gap-4 p-5 sm:p-6 ornate-card hover:ring-1 hover:ring-saffron/25 transition-all duration-300 h-full">
                <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-saffron/15 to-gold/15 flex items-center justify-center group-hover:from-saffron/25 group-hover:to-gold/25 transition-colors ring-1 ring-gold/15">
                  <item.icon className="w-6 h-6 text-saffron" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="font-display text-lg text-brown">{item.title}</h3>
                  <p className="text-sm text-brown-light mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>

        {country.urlPrefix && (
          <FadeIn delay={0.2} className="mt-12">
            <div className="relative overflow-hidden p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-brown via-maroon to-brown text-cream text-center ring-2 ring-gold/20 shadow-xl">
              <div className="absolute inset-0 bg-spiritual-pattern opacity-20" aria-hidden />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-16 bg-gradient-to-b from-saffron/20 to-transparent blur-2xl" aria-hidden />
              <div className="relative">
                <p className="font-devanagari text-saffron-light text-base mb-2 tracking-widest">शुभम्</p>
                <h3 className="font-display text-xl sm:text-2xl">
                  Authentic Indian Puja Essentials — Delivered to {country.name}
                </h3>
                <p className="mt-3 text-cream/80 text-sm max-w-lg mx-auto leading-relaxed">
                  Indian name + English explanation on every product. Clear shipping estimates. Duties information where applicable.
                </p>
                <Link
                  href={prefix("/shipping/international")}
                  className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-saffron-light hover:text-white transition-colors"
                >
                  International shipping info →
                </Link>
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </TempleSection>
  );
}
