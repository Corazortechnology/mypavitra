import { BUNDLES } from "@puja/catalog";
import { buildLocalizedPath } from "@puja/config";
import { getCountryConfig } from "@/lib/country";
import { buildPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/page-hero";
import { BundleCard } from "@/components/commerce/bundle-card";

export async function generateMetadata() {
  const country = await getCountryConfig();
  return buildPageMetadata(
    {
      title: "Puja Kits & Bundles | Save on Complete Sets",
      description:
        "Shop curated puja kits and bundles — daily puja starter, Diwali complete set, new home puja, and Jain essentials. Save vs buying separately.",
    },
    country,
    "/bundles"
  );
}

export default async function BundlesPage() {
  const country = await getCountryConfig();

  return (
    <>
      <PageHero
        title="Puja Kits & Bundles"
        description="Complete puja sets curated by our team — save time and money with bundled essentials for daily worship, festivals, and special occasions."
      />

      <div className="container-main py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BUNDLES.filter((b) => b.prices[country.code]).map((bundle) => (
            <BundleCard key={bundle.slug} bundle={bundle} country={country} />
          ))}
        </div>
      </div>
    </>
  );
}
