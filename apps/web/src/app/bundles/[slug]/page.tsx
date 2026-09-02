import Link from "next/link";
import { notFound } from "next/navigation";
import { BUNDLES, getBundleBySlug, getProductBySlug } from "@puja/catalog";
import { buildLocalizedPath, formatPrice } from "@puja/config";
import { getCountryConfig } from "@/lib/country";
import { buildPageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/page-hero";
import { Breadcrumbs } from "@/components/commerce/breadcrumbs";
import { AddToCartButton } from "@/components/commerce/add-to-cart-button";
import { PriceDisplay } from "@/components/commerce/price-display";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BUNDLES.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const bundle = getBundleBySlug(slug);
  const country = await getCountryConfig();
  if (!bundle) return { title: "Bundle Not Found" };
  return buildPageMetadata(
    {
      title: `${bundle.name} | MyPavitra`,
      description: bundle.description,
    },
    country,
    `/bundles/${slug}`
  );
}

export default async function BundlePage({ params }: PageProps) {
  const { slug } = await params;
  const bundle = getBundleBySlug(slug);
  const country = await getCountryConfig();
  if (!bundle) notFound();

  const pricing = bundle.prices[country.code];
  if (!pricing) notFound();

  const prefix = (path: string) => buildLocalizedPath(path, country);
  const savings = pricing.individual - pricing.bundle;
  const savingsPercent =
    pricing.individual > pricing.bundle
      ? Math.round((savings / pricing.individual) * 100)
      : 0;

  const items = bundle.itemSlugs
    .map((item) => {
      const product = getProductBySlug(item.slug);
      if (!product) return null;
      const price = product.prices[country.code]?.selling;
      return { product, qty: item.qty, price };
    })
    .filter(Boolean) as {
    product: NonNullable<ReturnType<typeof getProductBySlug>>;
    qty: number;
    price: number | undefined;
  }[];

  return (
    <>
      <div className="container-main py-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: prefix("/") },
            { label: "Puja Kits", href: prefix("/bundles") },
            { label: bundle.name },
          ]}
        />
      </div>

      <PageHero title={bundle.h1} description={bundle.description} />

      <div className="container-main py-12">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-saffron/10 via-ivory to-gold/10 flex items-center justify-center text-[8rem] border border-ivory-dark">
            📦
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-2xl font-semibold text-brown">
                {formatPrice(pricing.bundle, country.currency)}
              </span>
              {pricing.individual > pricing.bundle && (
                <span className="text-lg text-brown-light line-through">
                  {formatPrice(pricing.individual, country.currency)}
                </span>
              )}
              {savingsPercent > 0 && (
                <span className="text-sm font-medium px-2 py-1 rounded-full bg-saffron/10 text-saffron">
                  Save {savingsPercent}% ({formatPrice(savings, country.currency)})
                </span>
              )}
            </div>

            <AddToCartButton slug={slug} type="bundle" size="lg" fullWidth>
              Add Kit to Cart
            </AddToCartButton>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-brown mb-4">
            What&apos;s included ({items.length} products)
          </h2>
          <ul className="divide-y divide-ivory-dark border border-ivory-dark rounded-xl overflow-hidden list-none p-0 m-0">
            {items.map(({ product, qty, price }) => (
              <li key={product.slug} className="flex items-center gap-4 p-4 bg-white">
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: product.imageColor }}
                >
                  {product.imageEmoji}
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={prefix(`/products/${product.slug}`)}
                    className="font-medium text-brown hover:text-saffron"
                  >
                    {product.name}
                  </Link>
                  <p className="text-sm text-brown-light">Qty: {qty}</p>
                </div>
                {price !== undefined && (
                  <PriceDisplay
                    price={{ selling: price * qty }}
                    country={country}
                    size="sm"
                    showSavings={false}
                  />
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
