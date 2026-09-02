import Link from "next/link";
import { buildLocalizedPath } from "@puja/config";
import { getCountryConfig } from "@/lib/country";
import { buildPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/page-hero";
import { StaticContent } from "@/components/layout/static-content";

export async function generateMetadata() {
  const country = await getCountryConfig();
  return buildPageMetadata(
    {
      title: "International Shipping | MyPavitra",
      description:
        "International shipping guide for puja products — customs, duties, delivery times, and restricted items.",
    },
    country,
    "/shipping/international"
  );
}

export default async function InternationalShippingPage() {
  const country = await getCountryConfig();
  const prefix = (path: string) => buildLocalizedPath(path, country);

  return (
    <>
      <PageHero
        title="International Shipping"
        description="Everything you need to know about ordering puja products from India to your country."
      />
      <StaticContent>
        <h2>Countries we ship to</h2>
        <p>
          We currently deliver to the United States, United Kingdom, Canada, Australia, United Arab
          Emirates, Singapore, New Zealand, and select European countries. Select your country from
          the header to see local pricing and free shipping thresholds.
        </p>

        <h2>Customs &amp; import duties</h2>
        <p>
          International orders may be subject to import duties, taxes, and customs processing fees
          levied by your country. These charges are the responsibility of the recipient and are not
          included in the product price or shipping cost shown at checkout.
        </p>
        <p>
          Brass items and religious goods are generally permitted for personal import, but regulations
          vary by country. We recommend checking your local customs authority if unsure.
        </p>

        <h2>Delivery times</h2>
        <p>
          International delivery typically takes 7–14 business days after dispatch. Customs
          clearance can add 2–5 additional days in some countries.
        </p>

        <h2>Packaging</h2>
        <p>
          All international orders are packed securely with bubble wrap and sturdy boxes. Brass
          items are individually wrapped to prevent scratches during transit.
        </p>

        <h2>Restricted items</h2>
        <p>
          Some organic samagri items (certain incense formulations, camphor in large quantities) may
          face restrictions in specific countries. If an item cannot be shipped to your destination,
          we will contact you before processing the order.
        </p>

        <p>
          <Link href={prefix("/shipping")} className="text-saffron hover:underline">
            ← Back to shipping information
          </Link>
        </p>
      </StaticContent>
    </>
  );
}
