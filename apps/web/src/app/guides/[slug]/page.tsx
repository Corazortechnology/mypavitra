import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIDES, getGuideBySlug, getProductBySlug } from "@puja/catalog";
import { buildLocalizedPath } from "@puja/config";
import { getCountryConfig } from "@/lib/country";
import { buildPageMetadata } from "@/lib/seo";
import { renderGuideContent } from "@/lib/guide-content";
import { PageHero } from "@/components/layout/page-hero";
import { Breadcrumbs } from "@/components/commerce/breadcrumbs";
import { ProductGrid } from "@/components/commerce/product-grid";
import { Accordion } from "@/components/commerce/accordion";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  const country = await getCountryConfig();
  if (!guide) return { title: "Guide Not Found" };
  return buildPageMetadata(
    {
      title: guide.seoTitle,
      description: guide.seoDescription,
    },
    country,
    `/guides/${slug}`
  );
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  const country = await getCountryConfig();
  if (!guide) notFound();

  const prefix = (path: string) => buildLocalizedPath(path, country);
  const relatedProducts = guide.relatedProductSlugs
    .map((s) => getProductBySlug(s))
    .filter((p): p is NonNullable<typeof p> => p !== undefined && p.prices[country.code] !== undefined);

  return (
    <>
      <div className="container-main py-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: prefix("/") },
            { label: "Guides", href: prefix("/guides") },
            { label: guide.title },
          ]}
        />
      </div>

      <PageHero title={guide.title} description={guide.excerpt} />

      <article className="container-main py-12 max-w-3xl">
        {renderGuideContent(guide.content)}
      </article>

      {guide.faq.length > 0 && (
        <div className="container-main pb-12 max-w-3xl">
          <h2 className="text-xl font-semibold text-brown mb-4">FAQ</h2>
          <Accordion
            items={guide.faq.map((item, i) => ({
              id: `faq-${i}`,
              title: item.question,
              content: <p>{item.answer}</p>,
            }))}
          />
        </div>
      )}

      {relatedProducts.length > 0 && (
        <section className="container-main pb-16">
          <h2 className="text-xl font-semibold text-brown mb-6">Related products</h2>
          <ProductGrid products={relatedProducts} country={country} columns={3} />
        </section>
      )}
    </>
  );
}
