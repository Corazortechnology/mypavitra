import { notFound } from "next/navigation";
import { getProductsByCollection, getCollectionBySlug } from "@puja/catalog";
import { SHOP_BY_PURPOSE, buildLocalizedPath } from "@puja/config";
import { getCountryConfig } from "@/lib/country";
import { buildPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/page-hero";
import { Breadcrumbs } from "@/components/commerce/breadcrumbs";
import { ProductGrid } from "@/components/commerce/product-grid";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SHOP_BY_PURPOSE.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const purpose = SHOP_BY_PURPOSE.find((p) => p.slug === slug);
  const country = await getCountryConfig();
  if (!purpose) return { title: "Not Found" };
  return buildPageMetadata(
    {
      title: `${purpose.name} — Puja Essentials | MyPavitra`,
      description: `Shop puja products for ${purpose.name.toLowerCase()} — curated essentials for your worship and celebration needs.`,
    },
    country,
    `/shop-by-purpose/${slug}`
  );
}

const PURPOSE_DESCRIPTIONS: Record<string, string> = {
  "daily-puja":
    "Everything for your morning and evening puja — diyas, thali, samagri, incense, and brass essentials for daily worship at home.",
  "jain-daily-puja":
    "Jain-specific puja items — rice offerings, camphor, incense, and brass vessels for daily Ashta Prakari puja.",
  "new-home":
    "Griha pravesh and new home puja essentials — kalash, murtis, samagri, and complete kits for housewarming ceremonies.",
  housewarming:
    "Traditional housewarming puja sets — brass kalash, diyas, incense, and samagri for your new home blessing.",
  wedding:
    "Wedding and marriage ceremony puja items — brass thali, kalash, diyas, and gifting sets for auspicious occasions.",
  diwali:
    "Complete Diwali puja shopping — Lakshmi murti, brass diyas, samagri, and gift hampers for the festival of lights.",
  navratri:
    "Navratri puja essentials — brass kalash for ghatasthapana, samagri, diyas, and incense for nine nights of worship.",
  "ganesh-puja":
    "Ganesh Chaturthi and Ganesh puja items — murtis, modak prasad essentials, samagri, and brass thali sets.",
  "lakshmi-puja":
    "Lakshmi puja essentials — murtis, brass diyas, coins, samagri, and thali for prosperity worship.",
  "jain-puja":
    "Complete Jain puja product range — rice, camphor, incense, brass items, and festival essentials.",
  gifting:
    "Thoughtful puja gift sets — brass diyas, incense hampers, and complete kits for festivals and special occasions.",
  temple:
    "Temple-grade puja supplies — larger brass items, bulk samagri, and durable vessels for community worship.",
  "office-puja":
    "Compact puja sets for office and workplace — small thali, diyas, samagri, and brass essentials.",
};

export default async function ShopByPurposePage({ params }: PageProps) {
  const { slug } = await params;
  const purpose = SHOP_BY_PURPOSE.find((p) => p.slug === slug);
  const country = await getCountryConfig();
  if (!purpose) notFound();

  const prefix = (path: string) => buildLocalizedPath(path, country);
  const collection = getCollectionBySlug(slug);
  const products = collection
    ? getProductsByCollection(slug).filter((p) => p.prices[country.code] !== undefined)
    : [];

  const description =
    PURPOSE_DESCRIPTIONS[slug] ??
    `Curated puja products for ${purpose.name.toLowerCase()} — authentic items sourced from trusted Indian suppliers.`;

  return (
    <>
      <div className="container-main py-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: prefix("/") },
            { label: "Shop by Purpose", href: prefix("/") },
            { label: purpose.name },
          ]}
        />
      </div>

      <PageHero title={`Shop for ${purpose.name}`} description={description} />

      <div className="container-main py-12">
        {products.length > 0 ? (
          <ProductGrid products={products} country={country} />
        ) : (
          <div className="text-center py-12">
            <p className="text-brown-light mb-4">
              Browse our categories for {purpose.name.toLowerCase()} essentials.
            </p>
            <a href={prefix("/categories")} className="text-saffron hover:underline font-medium">
              View all categories →
            </a>
          </div>
        )}
      </div>
    </>
  );
}
