import { notFound } from "next/navigation";
import {
  CATEGORIES,
  getCategoryBySlug,
  getProductsByCategory,
} from "@puja/catalog";
import { buildLocalizedPath, BRAND } from "@puja/config";
import { getCountryConfig } from "@/lib/country";
import { buildPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/page-hero";
import { Breadcrumbs } from "@/components/commerce/breadcrumbs";
import { ProductGrid } from "@/components/commerce/product-grid";
import { Accordion } from "@/components/commerce/accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { getCategoryImage } from "@/lib/images";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  const country = await getCountryConfig();
  if (!category) return { title: "Category Not Found" };
  return buildPageMetadata(
    {
      title: category.seoTitle,
      description: category.seoDescription,
    },
    country,
    `/categories/${slug}`
  );
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  const country = await getCountryConfig();
  if (!category) notFound();

  const products = getProductsByCategory(slug).filter(
    (p) => p.prices[country.code] !== undefined
  );
  const prefix = (path: string) => buildLocalizedPath(path, country);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: category.name,
    description: category.description,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${BRAND.domain}${prefix(`/products/${product.slug}`)}`,
      name: product.name,
    })),
  };

  return (
    <>
      <JsonLd data={itemListJsonLd} />

      <div className="container-main py-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: prefix("/") },
            { label: "Categories", href: prefix("/categories") },
            { label: category.name },
          ]}
        />
      </div>

      <PageHero
        title={category.h1}
        description={category.description}
        imageUrl={getCategoryImage(slug)}
        eyebrow="ॐ शुभम्"
      />

      <div className="container-main py-12 space-y-12">
        <div className="prose prose-brown max-w-3xl">
          <p className="text-brown-light leading-relaxed">{category.introContent}</p>
        </div>

        <section>
          <h2 className="text-xl font-semibold text-brown mb-6">
            {category.name} ({products.length})
          </h2>
          <ProductGrid products={products} country={country} />
        </section>

        {category.faq.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-brown mb-4">Frequently asked questions</h2>
            <Accordion
              items={category.faq.map((item, i) => ({
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
