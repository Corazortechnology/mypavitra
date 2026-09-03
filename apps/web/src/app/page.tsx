import Link from "next/link";
import {
  getBestSellers,
  getActiveCampaign,
  BUNDLES,
  GUIDES,
} from "@puja/catalog";
import { getCountryConfig } from "@/lib/country";
import { HeroCampaign } from "@/components/home/hero-campaign";
import { PopularCategories } from "@/components/home/popular-categories";
import { ShopByPurpose } from "@/components/home/shop-by-purpose";
import { TrustSection } from "@/components/home/trust-section";
import { ProductGrid } from "@/components/commerce/product-grid";
import { BundleCard } from "@/components/commerce/bundle-card";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { buildLocalizedPath } from "@puja/config";
import { SectionHeading } from "@/components/ui/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { TempleSection } from "@/components/ui/temple-section";
import { ArrowRight, BookOpen } from "lucide-react";

export default async function HomePage() {
  const country = await getCountryConfig();
  const prefix = (path: string) => buildLocalizedPath(path, country);
  const campaign = getActiveCampaign();
  const bestSellers = getBestSellers(8).filter(
    (p) => p.prices[country.code] !== undefined
  );
  const featuredBundles = BUNDLES.filter((b) => b.prices[country.code]).slice(0, 4);
  const featuredGuides = GUIDES.slice(0, 3);

  return (
    <>
      <HeroCampaign
        country={country}
        campaign={
          campaign
            ? {
                heading: campaign.heading,
                subheading: campaign.subheading,
                ctaText: campaign.ctaText,
                ctaUrl: campaign.ctaUrl,
              }
            : undefined
        }
      />
      <PopularCategories country={country} />

      {bestSellers.length > 0 && (
        <TempleSection variant="subtle" className="py-14 sm:py-16">
          <div className="container-main">
            <FadeIn direction="up" className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
              <SectionHeading
                title="Best Sellers"
                subtitle="Most loved by devotees across India and abroad"
              />
              <Link
                href={prefix("/collections/best-sellers")}
                className="inline-flex items-center gap-1 text-sm font-medium text-saffron hover:gap-2 transition-all"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeIn>
            <ProductGrid products={bestSellers} country={country} />
          </div>
        </TempleSection>
      )}

      <TempleSection variant="section" className="py-14 sm:py-16 border-y border-gold/10">
        <div className="container-main">
          <FadeIn direction="up" className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
            <SectionHeading
              title="Featured Puja Kits"
              subtitle="Complete sets — save time, money, and effort"
            />
            <Link
              href={prefix("/bundles")}
              className="inline-flex items-center gap-1 text-sm font-medium text-saffron hover:gap-2 transition-all"
            >
              View all kits <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {featuredBundles.map((bundle) => (
              <BundleCard key={bundle.slug} bundle={bundle} country={country} />
            ))}
          </div>
        </div>
      </TempleSection>

      <ShopByPurpose country={country} />

      {featuredGuides.length > 0 && (
        <TempleSection variant="subtle" className="py-14 sm:py-16">
          <div className="container-main">
            <FadeIn direction="up" className="mb-8">
              <SectionHeading
                title="Puja Guides"
                subtitle="Learn what you need and how to use it — written for families in India and abroad"
              />
            </FadeIn>
            <div className="grid sm:grid-cols-3 gap-4">
              {featuredGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={prefix(`/guides/${guide.slug}`)}
                  className="group block h-full p-6 ornate-card transition-[box-shadow,transform] duration-[var(--duration-medium)] ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-md hover:shadow-brown/5 motion-reduce:transform-none"
                >
                  <BookOpen className="mb-3 h-8 w-8 text-saffron/80 transition-transform duration-[var(--duration-fast)] group-hover:translate-x-0.5" />
                  <h3 className="line-clamp-2 font-display text-lg text-brown transition-colors duration-[var(--duration-fast)] group-hover:text-saffron">
                    {guide.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-brown-light">{guide.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </TempleSection>
      )}

      <TrustSection country={country} />
      <NewsletterSection />
    </>
  );
}
