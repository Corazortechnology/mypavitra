"use client";

import type { CountryConfig } from "@puja/types";
import { ProductCard, type ProductCardProduct } from "./product-card";
import { StaggerGrid, StaggerItem } from "@/components/motion/fade-in";

interface ProductGridProps {
  products: ProductCardProduct[];
  country: CountryConfig;
  columns?: 2 | 3 | 4;
  className?: string;
}

const columnClasses = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
} as const;

export function ProductGrid({
  products,
  country,
  columns = 4,
  className = "",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="text-center text-brown-light py-12">No products found.</p>
    );
  }

  return (
    <StaggerGrid className={`grid ${columnClasses[columns]} gap-4 md:gap-6 ${className}`}>
      {products.map((product) => (
        <StaggerItem key={product.slug}>
          <ProductCard product={product} country={country} />
        </StaggerItem>
      ))}
    </StaggerGrid>
  );
}
