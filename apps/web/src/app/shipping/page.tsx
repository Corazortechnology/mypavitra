import Link from "next/link";
import { formatPrice, buildLocalizedPath } from "@puja/config";
import { getCountryConfig } from "@/lib/country";
import { buildPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/page-hero";
import { StaticContent } from "@/components/layout/static-content";

export async function generateMetadata() {
  const country = await getCountryConfig();
  return buildPageMetadata(
    {
      title: "Shipping Information | MyPavitra",
      description:
        "Delivery times, free shipping thresholds, and shipping rates for puja orders across India and worldwide.",
    },
    country,
    "/shipping"
  );
}

export default async function ShippingPage() {
  const country = await getCountryConfig();
  const prefix = (path: string) => buildLocalizedPath(path, country);

  return (
    <>
      <PageHero
        title="Shipping Information"
        description={`Delivering authentic puja products to ${country.name} and worldwide.`}
      />
      <StaticContent>
        <h2>Free shipping</h2>
        <p>
          Enjoy free standard shipping on orders above{" "}
          <strong>{formatPrice(country.freeShippingThreshold, country.currency)}</strong> delivered
          to {country.name}.
        </p>

        <h2>Delivery times</h2>
        <ul>
          <li>
            <strong>India:</strong> 3–5 business days (metro cities), 5–7 days (other locations)
          </li>
          <li>
            <strong>International:</strong> 7–14 business days depending on destination and customs
            processing
          </li>
        </ul>

        <h2>Shipping rates</h2>
        <p>
          {country.code === "IN"
            ? "Flat ₹49 shipping on orders below the free shipping threshold. Free shipping on qualifying orders."
            : "Flat $12 USD equivalent shipping on international orders below the free shipping threshold."}
        </p>

        <h2>Order tracking</h2>
        <p>
          You will receive a tracking link by email once your order is dispatched. Allow 24 hours
          after dispatch for tracking to activate.
        </p>

        <h2>Festival season</h2>
        <p>
          During Diwali, Navratri, and other peak periods, please order at least 10 days before your
          needed date. We prioritise festival orders but cannot guarantee delivery if ordered too
          late.
        </p>

        <h2>International orders</h2>
        <p>
          Shipping to countries outside India? See our{" "}
          <Link href={prefix("/shipping/international")}>international shipping guide</Link> for
          customs, duties, and delivery details.
        </p>
      </StaticContent>
    </>
  );
}
