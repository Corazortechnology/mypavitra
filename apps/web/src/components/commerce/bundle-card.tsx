"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Package, ArrowRight } from "lucide-react";
import { buildLocalizedPath, formatPrice } from "@puja/config";
import type { CatalogBundle } from "@puja/catalog";
import type { CountryConfig } from "@puja/types";
import { BUNDLE_IMAGES } from "@/lib/images";

export type BundleCardBundle = Pick<
  CatalogBundle,
  "slug" | "name" | "description" | "itemSlugs" | "prices"
>;

interface BundleCardProps {
  bundle: BundleCardBundle;
  country: CountryConfig;
}

export function BundleCard({ bundle, country }: BundleCardProps) {
  const pricing = bundle.prices[country.code];
  const href = buildLocalizedPath(`/bundles/${bundle.slug}`, country);
  const imageUrl = BUNDLE_IMAGES[bundle.slug] ?? BUNDLE_IMAGES["daily-puja-starter-kit"]!;
  const itemCount = bundle.itemSlugs.reduce((sum, item) => sum + item.qty, 0);
  const savingsPercent =
    pricing && pricing.individual > pricing.bundle
      ? Math.round(((pricing.individual - pricing.bundle) / pricing.individual) * 100)
      : null;

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="h-full">
      <Link href={href} className="group flex flex-col h-full ornate-card overflow-hidden transition-all duration-300">
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-b from-cream to-ivory-dark/20">
          <Image
            src={imageUrl}
            alt={bundle.name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 1024px) 50vw, 25vw"
            unoptimized={imageUrl.endsWith(".svg")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brown/70 via-brown/15 to-transparent" />
          {savingsPercent !== null && savingsPercent > 0 && (
            <span className="absolute top-3 right-3 text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r from-saffron to-gold text-white shadow-lg ring-1 ring-gold/30">
              Save {savingsPercent}%
            </span>
          )}
          <div className="absolute bottom-3 left-3 flex items-center gap-2 text-cream text-sm font-medium">
            <Package className="w-4 h-4 text-saffron-light" />
            {itemCount} items
          </div>
        </div>

        <div className="flex flex-col flex-1 p-5 gap-2 border-t border-gold/10">
          <h3 className="font-display text-lg text-brown group-hover:text-saffron transition-colors">
            {bundle.name}
          </h3>
          <p className="text-sm text-brown-light line-clamp-2 flex-1">{bundle.description}</p>

          {pricing && (
            <div className="pt-3 flex items-center justify-between border-t border-gold/10">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-lg font-semibold text-brown">
                  {formatPrice(pricing.bundle, country.currency)}
                </span>
                {pricing.individual > pricing.bundle && (
                  <span className="text-sm text-brown-light line-through">
                    {formatPrice(pricing.individual, country.currency)}
                  </span>
                )}
              </div>
              <ArrowRight className="w-5 h-5 text-saffron opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
