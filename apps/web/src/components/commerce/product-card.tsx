"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { buildLocalizedPath } from "@puja/config";
import type { CatalogProduct } from "@puja/catalog";
import type { CountryConfig } from "@puja/types";
import { getProductImage } from "@/lib/images";
import { PriceDisplay } from "./price-display";

export type ProductCardProduct = Pick<
  CatalogProduct,
  | "slug"
  | "name"
  | "indianName"
  | "imageEmoji"
  | "imageColor"
  | "rating"
  | "reviewCount"
  | "prices"
  | "inStock"
  | "categorySlugs"
>;

interface ProductCardProps {
  product: ProductCardProduct;
  country: CountryConfig;
}

export function ProductCard({ product, country }: ProductCardProps) {
  const price = product.prices[country.code];
  const href = buildLocalizedPath(`/products/${product.slug}`, country);
  const imageUrl = getProductImage(product.slug, product.categorySlugs ?? []);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link href={href} className="group flex flex-col h-full ornate-card hover:-translate-y-0 transition-all duration-300">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-cream to-ivory-dark/30">
          {/* Corner temple motif */}
          <span className="absolute top-2 left-2 text-gold/40 text-xs z-10" aria-hidden>✦</span>
          <span className="absolute top-2 right-2 text-gold/40 text-xs z-10" aria-hidden>✦</span>

          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            unoptimized={imageUrl.endsWith(".svg")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brown/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {!product.inStock && (
            <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-maroon/90 text-cream backdrop-blur-sm">
              Out of stock
            </span>
          )}

          <span className="absolute top-3 right-3 w-10 h-10 rounded-full bg-gradient-to-br from-saffron/90 to-gold text-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg shadow-saffron/30">
            <ShoppingBag className="w-4 h-4" />
          </span>
        </div>

        <div className="flex flex-col flex-1 p-4 gap-2 border-t border-gold/10">
          {product.indianName && (
            <p className="text-xs text-gold font-devanagari line-clamp-1">{product.indianName}</p>
          )}
          <h3 className="text-sm font-medium text-brown line-clamp-2 group-hover:text-saffron transition-colors leading-snug font-display">
            {product.name}
          </h3>

          {price && <PriceDisplay price={price} country={country} size="sm" />}

          {product.rating > 0 && (
            <p className="text-xs text-brown-light mt-auto flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-saffron text-saffron" />
              {product.rating.toFixed(1)}
              {product.reviewCount > 0 && (
                <span className="text-brown-light/60">({product.reviewCount})</span>
              )}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
