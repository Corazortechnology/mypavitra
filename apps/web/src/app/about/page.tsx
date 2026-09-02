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
      title: "About Us | MyPavitra",
      description:
        "MyPavitra is India's trusted specialist for authentic puja samagri, brass items, and spiritual products — delivered worldwide.",
    },
    country,
    "/about"
  );
}

export default async function AboutPage() {
  const country = await getCountryConfig();
  const prefix = (path: string) => buildLocalizedPath(path, country);

  return (
    <>
      <PageHero
        title="About MyPavitra"
        description="Traditional products. Thoughtfully sourced. Delivered with care."
      />
      <StaticContent>
        <h2>Our mission</h2>
        <p>
          MyPavitra was founded with a simple belief: every home deserves access to authentic,
          high-quality puja items at honest prices. We source directly from trusted artisans in
          Moradabad, Gujarat, and across India — cutting out unnecessary middlemen so you pay for
          quality, not markup.
        </p>

        <h2>What we sell</h2>
        <p>
          From daily puja samagri — kumkum, chandan, camphor, and wicks — to handcrafted brass
          diyas, bells, thalis, and complete festival kits, our catalog covers everything you need
          for Hindu and Jain worship at home and abroad.
        </p>

        <h2>Quality you can trust</h2>
        <p>
          Every brass item is inspected for finish and weight. Every samagri product is sourced from
          established suppliers with proper labelling and freshness guarantees. We stand behind
          every order with responsive customer support and a straightforward returns policy.
        </p>

        <h2>Worldwide delivery</h2>
        <p>
          We ship across India and to the United States, United Kingdom, Canada, Australia, UAE,
          Singapore, New Zealand, and Europe. Whether you are setting up your first home altar or
          restocking for Diwali, MyPavitra delivers to your door.
        </p>

        <p>
          <Link href={prefix("/contact")} className="text-saffron hover:underline">
            Get in touch →
          </Link>
        </p>
      </StaticContent>
    </>
  );
}
