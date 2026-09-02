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
      title: "Terms of Service | MyPavitra",
      description: "Terms and conditions for using the MyPavitra website and placing orders.",
    },
    country,
    "/terms"
  );
}

export default async function TermsPage() {
  const country = await getCountryConfig();
  const prefix = (path: string) => buildLocalizedPath(path, country);

  return (
    <>
      <PageHero title="Terms of Service" description="Last updated: August 2026" />
      <StaticContent>
        <h2>Agreement</h2>
        <p>
          By accessing mypavitra.com and placing an order, you agree to these Terms of Service. If
          you do not agree, please do not use our website.
        </p>

        <h2>Products &amp; pricing</h2>
        <p>
          All prices are displayed in your selected country&apos;s currency and include applicable
          taxes where required. We reserve the right to correct pricing errors and to modify prices
          without notice. Product images are representative; actual items may vary slightly in
          finish due to handcrafted nature.
        </p>

        <h2>Orders &amp; payment</h2>
        <p>
          An order is confirmed only after successful payment processing. We reserve the right to
          cancel orders due to stock unavailability, pricing errors, or suspected fraud. You will
          receive a full refund for any cancelled order.
        </p>

        <h2>Shipping</h2>
        <p>
          Delivery times are estimates, not guarantees. See our{" "}
          <Link href={prefix("/shipping")} className="text-saffron hover:underline">
            shipping page
          </Link>{" "}
          for details. Risk of loss passes to you upon delivery to the carrier.
        </p>

        <h2>Returns</h2>
        <p>
          Returns are governed by our{" "}
          <Link href={prefix("/returns")} className="text-saffron hover:underline">
            returns policy
          </Link>
          . By placing an order, you acknowledge and accept these terms.
        </p>

        <h2>Intellectual property</h2>
        <p>
          All content on this website — text, images, logos, and product descriptions — is owned by
          MyPavitra and protected by copyright law. Unauthorised reproduction is prohibited.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          MyPavitra is not liable for indirect, incidental, or consequential damages arising from
          use of our products or website. Our total liability for any claim shall not exceed the
          amount paid for the relevant order.
        </p>

        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of India. Disputes shall be subject to the exclusive
          jurisdiction of courts in New Delhi, India.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms? Email{" "}
          <a href="mailto:legal@mypavitra.com" className="text-saffron hover:underline">
            legal@mypavitra.com
          </a>
          .
        </p>
      </StaticContent>
    </>
  );
}
