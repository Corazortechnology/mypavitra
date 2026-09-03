"use client";

import Image from "next/image";
import Link from "next/link";
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
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden ornate-card transition-[box-shadow,transform] duration-[var(--duration-medium)] ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-md hover:shadow-brown/5 motion-reduce:transform-none"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-b from-cream to-ivory-dark/20">
        <Image
          src={imageUrl}
          alt={bundle.name}
          fill
          className="object-contain p-4 transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out-expo)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          sizes="(max-width: 1024px) 50vw, 25vw"
          unoptimized={imageUrl.endsWith(".svg")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown/70 via-brown/15 to-transparent" />
        {savingsPercent !== null && savingsPercent > 0 && (
          <span className="absolute top-3 right-3 rounded bg-brass px-3 py-1.5 text-xs font-semibold text-white">
            Save {savingsPercent}%
          </span>
        )}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-sm font-medium text-cream">
          <Package className="h-4 w-4 text-gold-light" />
          {itemCount} items
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 border-t border-gold/10 p-5">
        <h3 className="font-display text-lg text-brown transition-colors duration-[var(--duration-fast)] group-hover:text-saffron">
          {bundle.name}
        </h3>
        <p className="line-clamp-2 flex-1 text-sm text-brown-light">{bundle.description}</p>

        {pricing && (
          <div className="flex items-center justify-between border-t border-gold/10 pt-3">
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
            <ArrowRight className="h-5 w-5 text-saffron opacity-0 transition-[opacity,transform] duration-[var(--duration-medium)] group-hover:translate-x-0.5 group-hover:opacity-100" />
          </div>
        )}
      </div>
    </Link>
  );
}
