"use client";

import Link from "next/link";
import { Shield, IndianRupee, Globe, Package, BookOpen, RotateCcw } from "lucide-react";
import { buildLocalizedPath } from "@puja/config";
import type { CountryConfig } from "@puja/types";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
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
        <FadeIn direction="up" className="mb-12 text-center">
          <SectionHeading
            title="Why Devotees Trust Us"
            subtitle="Built on authenticity, transparency, and respect for tradition"
            align="center"
          />
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.title}
              className="group flex h-full gap-4 p-5 sm:p-6 ornate-card"
            >
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-brass/10 ring-1 ring-brass/15">
                <item.icon className="h-6 w-6 text-saffron" strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="font-display text-lg text-brown">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-brown-light">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {country.urlPrefix && (
          <FadeIn direction="up" className="mt-12">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-brown via-maroon to-brown p-8 text-center text-cream ring-1 ring-gold/20 sm:p-10">
              <div className="relative">
                <h3 className="font-display text-xl sm:text-2xl">
                  Authentic Indian Puja Essentials — Delivered to {country.name}
                </h3>
                <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-cream/80">
                  Indian name + English explanation on every product. Clear shipping estimates.
                  Duties information where applicable.
                </p>
                <Link
                  href={prefix("/shipping/international")}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-saffron-light transition-colors duration-[var(--duration-fast)] hover:text-white"
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
