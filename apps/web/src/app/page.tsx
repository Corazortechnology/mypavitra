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
            <FadeIn className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
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
          <FadeIn className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
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
            <FadeIn className="mb-8">
              <SectionHeading
                title="Puja Guides"
                subtitle="Learn what you need and how to use it — written for families in India and abroad"
              />
            </FadeIn>
            <div className="grid sm:grid-cols-3 gap-4">
              {featuredGuides.map((guide, i) => (
                <FadeIn key={guide.slug} delay={i * 0.08}>
                  <Link
                    href={prefix(`/guides/${guide.slug}`)}
                    className="group block p-6 ornate-card hover:ring-1 hover:ring-saffron/30 transition-all duration-300 h-full"
                  >
                    <BookOpen className="w-8 h-8 text-saffron/80 mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-display text-lg text-brown group-hover:text-saffron transition-colors line-clamp-2">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-brown-light mt-2 line-clamp-2">{guide.excerpt}</p>
                  </Link>
                </FadeIn>
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
