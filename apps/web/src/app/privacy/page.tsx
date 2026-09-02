import { getCountryConfig } from "@/lib/country";
import { buildPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/page-hero";
import { StaticContent } from "@/components/layout/static-content";

export async function generateMetadata() {
  const country = await getCountryConfig();
  return buildPageMetadata(
    {
      title: "Privacy Policy | MyPavitra",
      description: "How MyPavitra collects, uses, and protects your personal information.",
    },
    country,
    "/privacy"
  );
}

export default async function PrivacyPage() {
  await getCountryConfig();

  return (
    <>
      <PageHero title="Privacy Policy" description="Last updated: August 2026" />
      <StaticContent>
        <h2>Information we collect</h2>
        <p>
          When you place an order, subscribe to our newsletter, or contact us, we collect your
          name, email address, phone number, and shipping address. Payment information is processed
          securely by our payment partners (Razorpay, Stripe) and is not stored on our servers.
        </p>

        <h2>How we use your information</h2>
        <ul>
          <li>Process and fulfil your orders</li>
          <li>Send order confirmations and shipping updates</li>
          <li>Respond to customer support enquiries</li>
          <li>Send festival alerts and puja guides (with your consent)</li>
          <li>Improve our website and product offerings</li>
        </ul>

        <h2>Cookies</h2>
        <p>
          We use essential cookies to maintain your shopping cart and country preference. Analytics
          cookies help us understand how visitors use our site. You can disable non-essential cookies
          in your browser settings.
        </p>

        <h2>Data sharing</h2>
        <p>
          We do not sell your personal information. We share data only with service providers
          necessary to operate our business — payment processors, shipping carriers, and email
          delivery services — under strict confidentiality agreements.
        </p>

        <h2>Data retention</h2>
        <p>
          Order records are retained for 7 years for tax and legal compliance. Newsletter
          subscriptions can be cancelled at any time via the unsubscribe link in any email.
        </p>

        <h2>Your rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal data by emailing{" "}
          <a href="mailto:privacy@mypavitra.com" className="text-saffron hover:underline">
            privacy@mypavitra.com
          </a>
          .
        </p>

        <h2>Contact</h2>
        <p>
          For privacy-related questions, contact us at{" "}
          <a href="mailto:privacy@mypavitra.com" className="text-saffron hover:underline">
            privacy@mypavitra.com
          </a>
          .
        </p>
      </StaticContent>
    </>
  );
}
