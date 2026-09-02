import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FESTIVALS,
  getFestivalBySlug,
  getBundleBySlug,
  getGuideBySlug,
  getProductsByCollection,
} from "@puja/catalog";
import { buildLocalizedPath } from "@puja/config";
import { getCountryConfig } from "@/lib/country";
import { buildPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/page-hero";
import { Breadcrumbs } from "@/components/commerce/breadcrumbs";
import { ProductGrid } from "@/components/commerce/product-grid";
import { BundleCard } from "@/components/commerce/bundle-card";
import { Accordion } from "@/components/commerce/accordion";
import { FESTIVAL_IMAGES } from "@/lib/images";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return FESTIVALS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const festival = getFestivalBySlug(slug);
  const country = await getCountryConfig();
  if (!festival) return { title: "Festival Not Found" };
  return buildPageMetadata(
    {
      title: festival.seoTitle,
      description: festival.seoDescription,
    },
    country,
    `/festivals/${slug}`
  );
}

export default async function FestivalPage({ params }: PageProps) {
  const { slug } = await params;
  const festival = getFestivalBySlug(slug);
  const country = await getCountryConfig();
  if (!festival) notFound();

  const prefix = (path: string) => buildLocalizedPath(path, country);
  const products = getProductsByCollection(festival.collectionSlug).filter(
    (p) => p.prices[country.code] !== undefined
  );
  const bundles = festival.bundleSlugs
    .map((s) => getBundleBySlug(s))
    .filter((b) => b && b.prices[country.code]);
  const guides = festival.guideSlugs
    .map((s) => getGuideBySlug(s))
    .filter(Boolean);

  return (
    <>
      <div className="container-main py-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: prefix("/") },
            { label: "Festivals", href: prefix("/festivals") },
            { label: festival.name },
          ]}
        />
      </div>

      <PageHero
        title={festival.h1}
        description={festival.description}
        imageUrl={FESTIVAL_IMAGES[festival.slug]}
        eyebrow={festival.name}
      />

      <div className="container-main py-12 space-y-12">
        <p className="text-brown-light max-w-3xl leading-relaxed">{festival.introContent}</p>

        {bundles.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-brown mb-6">Festival kits</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bundles.map(
                (bundle) =>
                  bundle && <BundleCard key={bundle.slug} bundle={bundle} country={country} />
              )}
            </div>
          </section>
        )}

        {products.length > 0 && (
          <section>
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-xl font-semibold text-brown">Shop {festival.name} essentials</h2>
              <Link
                href={prefix(`/collections/${festival.collectionSlug}`)}
                className="text-sm text-saffron hover:underline"
              >
                View collection →
              </Link>
            </div>
            <ProductGrid products={products} country={country} />
          </section>
        )}

        {guides.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-brown mb-4">Puja guides</h2>
            <ul className="grid sm:grid-cols-2 gap-4 list-none p-0 m-0">
              {guides.map(
                (guide) =>
                  guide && (
                    <li key={guide.slug}>
                      <Link
                        href={prefix(`/guides/${guide.slug}`)}
                        className="block p-5 rounded-xl border border-ivory-dark bg-white hover:border-saffron/40 transition-colors"
                      >
                        <h3 className="font-medium text-brown hover:text-saffron">{guide.title}</h3>
                        <p className="mt-1 text-sm text-brown-light line-clamp-2">{guide.excerpt}</p>
                      </Link>
                    </li>
                  )
              )}
            </ul>
          </section>
        )}

        {festival.faq.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-brown mb-4">FAQ</h2>
            <Accordion
              items={festival.faq.map((item, i) => ({
                id: `faq-${i}`,
                title: item.question,
                content: <p>{item.answer}</p>,
              }))}
            />
          </section>
        )}
      </div>
    </>
  );
}
