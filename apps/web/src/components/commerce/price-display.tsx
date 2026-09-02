import { formatPrice } from "@puja/config";
import type { ProductPrice } from "@puja/catalog";
import type { CountryConfig } from "@puja/types";

export function getSavingsPercent(price: ProductPrice): number | null {
  if (!price.mrp || price.mrp <= price.selling) return null;
  return Math.round(((price.mrp - price.selling) / price.mrp) * 100);
}

interface PriceDisplayProps {
  price: ProductPrice;
  country: CountryConfig;
  size?: "sm" | "md" | "lg";
  showSavings?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: { selling: "text-sm font-semibold", mrp: "text-xs", badge: "text-[10px] px-1.5 py-0.5" },
  md: { selling: "text-base font-semibold", mrp: "text-sm", badge: "text-xs px-2 py-0.5" },
  lg: { selling: "text-xl font-semibold", mrp: "text-base", badge: "text-xs px-2 py-0.5" },
} as const;

export function PriceDisplay({
  price,
  country,
  size = "md",
  showSavings = true,
  className = "",
}: PriceDisplayProps) {
  const savings = getSavingsPercent(price);
  const styles = sizeClasses[size];

  return (
    <div className={`flex flex-wrap items-baseline gap-x-2 gap-y-1 ${className}`}>
      <span className={`${styles.selling} text-brown`}>
        {formatPrice(price.selling, country.currency)}
      </span>
      {price.mrp && price.mrp > price.selling && (
        <span className={`${styles.mrp} text-brown-light line-through`}>
          {formatPrice(price.mrp, country.currency)}
        </span>
      )}
      {showSavings && savings !== null && savings > 0 && (
        <span
          className={`${styles.badge} rounded-full bg-saffron/10 text-saffron font-medium`}
        >
          {savings}% off
        </span>
      )}
    </div>
  );
}
