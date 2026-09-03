import type { CountryConfig } from "@puja/types";
import { ProductCard, type ProductCardProduct } from "./product-card";

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

/** Stillness by default — cards use CSS hover, not entrance cascades */
export function ProductGrid({
  products,
  country,
  columns = 4,
  className = "",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="py-12 text-center text-brown-light">No products found.</p>
    );
  }

  return (
    <div className={`grid ${columnClasses[columns]} gap-4 md:gap-6 ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} country={country} />
      ))}
    </div>
  );
}
