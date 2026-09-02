"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@puja/config";
import type { ProductPrice } from "@puja/catalog";
import type { CountryConfig } from "@puja/types";
import { AddToCartButton } from "./add-to-cart-button";

interface StickyAddToCartProps {
  slug: string;
  name: string;
  price: ProductPrice;
  country: CountryConfig;
  inStock?: boolean;
  showAfterScroll?: number;
}

export function StickyAddToCart({
  slug,
  name,
  price,
  country,
  inStock = true,
  showAfterScroll = 400,
}: StickyAddToCartProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > showAfterScroll);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfterScroll]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden border-t border-ivory-dark bg-white/95 backdrop-blur-sm shadow-[0_-4px_12px_rgba(61,41,20,0.08)]">
      <div className="container-main flex items-center gap-3 py-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-brown truncate">{name}</p>
          <p className="text-sm font-semibold text-saffron">
            {formatPrice(price.selling, country.currency)}
          </p>
        </div>
        <AddToCartButton
          slug={slug}
          disabled={!inStock}
          size="sm"
          className="flex-shrink-0"
        >
          {inStock ? "Add to Cart" : "Out of Stock"}
        </AddToCartButton>
      </div>
    </div>
  );
}
