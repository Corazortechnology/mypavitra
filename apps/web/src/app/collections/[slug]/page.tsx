import { notFound } from "next/navigation";
import { COLLECTIONS, getCollectionBySlug, getProductsByCollection } from "@puja/catalog";
import { buildLocalizedPath } from "@puja/config";
import { getCountryConfig } from "@/lib/country";
import { buildPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/page-hero";
import { Breadcrumbs } from "@/components/commerce/breadcrumbs";
import { ProductGrid } from "@/components/commerce/product-grid";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  const country = await getCountryConfig();
  if (!collection) return { title: "Collection Not Found" };
  return buildPageMetadata(
    {
      title: `${collection.name} | MyPavitra`,
      description: collection.description,
    },
    country,
    `/collections/${slug}`
  );
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  const country = await getCountryConfig();
  if (!collection) notFound();

  const products = getProductsByCollection(slug).filter(
    (p) => p.prices[country.code] !== undefined
  );
  const prefix = (path: string) => buildLocalizedPath(path, country);

  return (
    <>
      <div className="container-main py-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: prefix("/") },
            { label: "Collections", href: prefix("/categories") },
            { label: collection.name },
          ]}
        />
      </div>

      <PageHero title={collection.h1} description={collection.description} />

      <div className="container-main py-12 space-y-8">
        <p className="text-brown-light max-w-3xl leading-relaxed">{collection.introContent}</p>
        <ProductGrid products={products} country={country} />
      </div>
    </>
  );
}
