"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag } from "lucide-react";
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
    <Link
      href={href}
      className="group flex h-full flex-col ornate-card transition-[box-shadow,transform] duration-[var(--duration-medium)] ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-md hover:shadow-brown/5 motion-reduce:transform-none"
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-cream to-ivory-dark/30">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-[var(--duration-slow)] ease-[var(--ease-out-expo)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          unoptimized={imageUrl.endsWith(".svg")}
        />

        {!product.inStock && (
          <span className="absolute top-3 left-3 rounded bg-maroon/90 px-2.5 py-1 text-xs font-semibold text-cream backdrop-blur-sm">
            Out of stock
          </span>
        )}

        <span className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-temple/90 text-cream opacity-0 shadow-md transition-[opacity,transform] duration-[var(--duration-medium)] ease-[var(--ease-out-expo)] group-hover:opacity-100 motion-reduce:transition-none">
          <ShoppingBag className="h-4 w-4" />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 border-t border-gold/10 p-4">
        {product.indianName && (
          <p className="line-clamp-1 font-devanagari text-xs text-gold">{product.indianName}</p>
        )}
        <h3 className="line-clamp-2 font-display text-sm font-medium leading-snug text-brown transition-colors duration-[var(--duration-fast)] group-hover:text-saffron">
          {product.name}
        </h3>

        {price && <PriceDisplay price={price} country={country} size="sm" />}

        {product.rating > 0 && (
          <p className="mt-auto flex items-center gap-1 text-xs text-brown-light">
            <Star className="h-3.5 w-3.5 fill-saffron text-saffron" />
            {product.rating.toFixed(1)}
            {product.reviewCount > 0 && (
              <span className="text-brown-light/60">({product.reviewCount})</span>
            )}
          </p>
        )}
      </div>
    </Link>
  );
}
