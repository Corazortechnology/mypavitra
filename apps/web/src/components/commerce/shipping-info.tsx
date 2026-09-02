import Link from "next/link";
import { buildLocalizedPath, formatPrice } from "@puja/config";
import type { CountryConfig } from "@puja/types";

interface ShippingInfoProps {
  country: CountryConfig;
  className?: string;
}

const DELIVERY_ESTIMATES: Record<CountryConfig["code"], string> = {
  IN: "3–5 business days",
  US: "7–12 business days",
  UK: "7–12 business days",
  CA: "7–14 business days",
  AU: "7–14 business days",
  AE: "7–12 business days",
  SG: "7–12 business days",
  NZ: "7–14 business days",
  EU: "7–14 business days",
};

export function ShippingInfo({ country, className = "" }: ShippingInfoProps) {
  const isInternational = country.code !== "IN";
  const deliveryEstimate = DELIVERY_ESTIMATES[country.code];
  const prefix = (path: string) => buildLocalizedPath(path, country);

  return (
    <div
      className={`rounded-xl border border-ivory-dark bg-white p-5 space-y-3 ${className}`}
    >
      <div className="flex items-start gap-3">
        <span className="text-xl" aria-hidden>
          {country.flag}
        </span>
        <div>
          <p className="font-medium text-brown">
            Ships to {country.name}
          </p>
          <p className="text-sm text-brown-light mt-0.5">
            Est. delivery: {deliveryEstimate}
          </p>
        </div>
      </div>

      <p className="text-sm text-brown-light">
        Free delivery on orders above{" "}
        <span className="font-medium text-brown">
          {formatPrice(country.freeShippingThreshold, country.currency)}
        </span>
      </p>

      {isInternational && (
        <p className="text-xs text-brown-light border-t border-ivory-dark pt-3">
          International orders may be subject to import duties and taxes levied by
          your country. These are the recipient&apos;s responsibility and are not
          included in the product price.{" "}
          <Link
            href={prefix("/shipping/international")}
            className="text-saffron hover:underline"
          >
            Learn more
          </Link>
        </p>
      )}
    </div>
  );
}
