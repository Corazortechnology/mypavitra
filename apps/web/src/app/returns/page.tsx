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
      title: "Returns & Refunds | MyPavitra",
      description:
        "MyPavitra return and refund policy for puja samagri, brass items, and kits — 7-day returns on eligible products.",
    },
    country,
    "/returns"
  );
}

export default async function ReturnsPage() {
  const country = await getCountryConfig();
  const prefix = (path: string) => buildLocalizedPath(path, country);

  return (
    <>
      <PageHero
        title="Returns & Refunds"
        description="We want you to be completely satisfied with your puja products."
      />
      <StaticContent>
        <h2>7-day return window</h2>
        <p>
          You may return eligible items within 7 days of delivery for a full refund or exchange.
          Items must be unused, in original packaging, and in resalable condition.
        </p>

        <h2>Eligible items</h2>
        <ul>
          <li>Brass puja items (diyas, bells, thalis, kalash) — unused, original packaging</li>
          <li>Idols and murtis — unused, no damage</li>
          <li>Puja kits and bundles — unopened, all items intact</li>
        </ul>

        <h2>Non-returnable items</h2>
        <ul>
          <li>Opened or used samagri (kumkum, chandan, camphor, wicks, akshat)</li>
          <li>Incense and dhoop once packaging is opened</li>
          <li>Custom or personalised orders</li>
        </ul>

        <h2>How to initiate a return</h2>
        <p>
          Email{" "}
          <a href="mailto:support@mypavitra.com" className="text-saffron hover:underline">
            support@mypavitra.com
          </a>{" "}
          with your order number and reason for return. We will provide a return shipping label
          (India) or instructions (international) within one business day.
        </p>

        <h2>Refunds</h2>
        <p>
          Refunds are processed within 5–7 business days after we receive and inspect the returned
          item. The refund will be credited to your original payment method.
        </p>

        <h2>Damaged or wrong items</h2>
        <p>
          Received a damaged or incorrect item? Contact us within 48 hours with photos. We will
          arrange a free replacement or full refund — no return shipping needed.
        </p>

        <p>
          Questions? Visit our{" "}
          <Link href={prefix("/contact")} className="text-saffron hover:underline">
            contact page
          </Link>{" "}
          or{" "}
          <Link href={prefix("/faq")} className="text-saffron hover:underline">
            FAQ
          </Link>
          .
        </p>
      </StaticContent>
    </>
  );
}
