import { buildLocalizedPath } from "@puja/config";
import { getCountryConfig } from "@/lib/country";
import { buildPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/page-hero";
import { StaticContent } from "@/components/layout/static-content";

export async function generateMetadata() {
  const country = await getCountryConfig();
  return buildPageMetadata(
    {
      title: "Contact Us | MyPavitra",
      description:
        "Contact MyPavitra for order support, product questions, bulk enquiries, and partnership opportunities.",
    },
    country,
    "/contact"
  );
}

export default async function ContactPage() {
  const country = await getCountryConfig();

  return (
    <>
      <PageHero
        title="Contact Us"
        description="We're here to help with orders, product questions, and bulk enquiries."
      />
      <StaticContent>
        <h2>Customer support</h2>
        <p>
          Email us at{" "}
          <a href="mailto:support@mypavitra.com" className="text-saffron hover:underline">
            support@mypavitra.com
          </a>{" "}
          — we respond within one business day (Mon–Sat, 10 AM–6 PM IST).
        </p>

        <h2>Order enquiries</h2>
        <p>
          For order status, delivery updates, or address changes, please include your order number
          in your email. You can find it in your order confirmation email.
        </p>

        <h2>Bulk &amp; wholesale</h2>
        <p>
          Temples, event organisers, and retailers — write to{" "}
          <a href="mailto:bulk@mypavitra.com" className="text-saffron hover:underline">
            bulk@mypavitra.com
          </a>{" "}
          for volume pricing on samagri, brass items, and festival kits.
        </p>

        <h2>Send us a message</h2>
        <form className="space-y-4 max-w-lg not-prose" action="mailto:support@mypavitra.com" method="POST">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-brown mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-ivory-dark text-brown text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-brown mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-ivory-dark text-brown text-sm"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-brown mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-ivory-dark text-brown text-sm"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-saffron text-white font-medium text-sm hover:bg-saffron/90"
          >
            Send message
          </button>
        </form>

        <p className="text-sm text-brown-light mt-8">
          Shipping to: {country.flag} {country.name}
        </p>
      </StaticContent>
    </>
  );
}
