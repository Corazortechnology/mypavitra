import { formatPrice } from "@puja/config";
import type { CountryConfig } from "@puja/types";

interface FreeShippingBarProps {
  subtotal: number;
  country: CountryConfig;
  className?: string;
}

export function FreeShippingBar({ subtotal, country, className = "" }: FreeShippingBarProps) {
  const threshold = country.freeShippingThreshold;
  const remaining = Math.max(0, threshold - subtotal);
  const progress = Math.min(100, (subtotal / threshold) * 100);
  const qualified = remaining === 0;

  return (
    <div className={`rounded-lg bg-ivory-dark px-4 py-3 ${className}`}>
      <p className="text-sm text-brown mb-2">
        {qualified ? (
          <>
            <span className="text-saffron font-medium">✓</span> You&apos;ve unlocked free
            shipping!
          </>
        ) : (
          <>
            Add{" "}
            <span className="font-medium text-brown">
              {formatPrice(remaining, country.currency)}
            </span>{" "}
            more for free shipping
          </>
        )}
      </p>
      <div
        className="h-2 rounded-full bg-white overflow-hidden"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progress toward free shipping"
      >
        <div
          className="h-full rounded-full bg-saffron transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
