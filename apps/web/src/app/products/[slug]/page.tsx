import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getAllProductSlugs,
  getCrossSellProducts,
} from "@puja/catalog";
import { buildLocalizedPath, BRAND } from "@puja/config";
import { getCountryConfig } from "@/lib/country";
import { buildPageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/commerce/breadcrumbs";
import { PriceDisplay } from "@/components/commerce/price-display";
import { AddToCartButton } from "@/components/commerce/add-to-cart-button";
import { ShippingInfo } from "@/components/commerce/shipping-info";
import { Accordion } from "@/components/commerce/accordion";
import { ProductGrid } from "@/components/commerce/product-grid";
import { ProductGallery } from "@/components/commerce/product-gallery";
import { PlaceInRoom } from "@/components/commerce/place-in-room";
import { StickyAddToCart } from "@/components/commerce/sticky-add-to-cart";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@puja/ui";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const country = await getCountryConfig();
  if (!product) return { title: "Product Not Found" };
  return buildPageMetadata(
    {
      title: `${product.name} | ${BRAND.name}`,
      description: product.shortDescription,
    },
    country,
    `/products/${slug}`
  );
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const country = await getCountryConfig();
  if (!product) notFound();

  const price = product.prices[country.code];
  if (!price) notFound();

  const prefix = (path: string) => buildLocalizedPath(path, country);
  const crossSells = getCrossSellProducts(slug);
  const categorySlug = product.categorySlugs[0];

  const specs = [
    product.material && { label: "Material", value: product.material },
    product.weight && { label: "Weight", value: product.weight },
    product.dimensions && { label: "Dimensions", value: product.dimensions },
    product.countryOfOrigin && { label: "Origin", value: product.countryOfOrigin },
    { label: "SKU", value: product.sku },
  ].filter(Boolean) as { label: string; value: string }[];

  const accordionItems = [
    {
      id: "description",
      title: "Description",
      content: <p>{product.description}</p>,
      defaultOpen: true,
    },
    {
      id: "what-is-it",
      title: "What is it?",
      content: <p>{product.whatIsIt}</p>,
    },
    {
      id: "traditional-use",
      title: "Traditional use",
      content: <p>{product.traditionalUse}</p>,
    },
    {
      id: "how-to-use",
      title: "How to use",
      content: <p>{product.howToUse}</p>,
    },
    ...(specs.length > 0
      ? [
          {
            id: "specs",
            title: "Specifications",
            content: (
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                {specs.map((s) => (
                  <div key={s.label}>
                    <dt className="text-brown font-medium">{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
            ),
          },
        ]
      : []),
    ...(product.careInstructions
      ? [
          {
            id: "care",
            title: "Care instructions",
            content: <p>{product.careInstructions}</p>,
          },
        ]
      : []),
    ...(product.whatsIncluded
      ? [
          {
            id: "included",
            title: "What's included",
            content: <p>{product.whatsIncluded}</p>,
          },
        ]
      : []),
    {
      id: "shipping",
      title: "Shipping & delivery",
      content: (
        <p>
          We ship to {country.name} with estimated delivery in{" "}
          {country.code === "IN" ? "3–5" : "7–14"} business days. Free shipping on
          orders above the threshold shown above.
        </p>
      ),
    },
    ...(product.faq.length > 0
      ? [
          {
            id: "faq",
            title: "FAQ",
            content: (
              <dl className="space-y-4">
                {product.faq.map((item) => (
                  <div key={item.question}>
                    <dt className="font-medium text-brown">{item.question}</dt>
                    <dd className="mt-1">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            ),
          },
        ]
      : []),
  ];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    sku: product.sku,
    brand: { "@type": "Brand", name: BRAND.name },
    offers: {
      "@type": "Offer",
      price: price.selling,
      priceCurrency: country.currency,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${BRAND.domain}${prefix(`/products/${slug}`)}`,
    },
    ...(product.rating > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviewCount,
      },
    }),
  };

  return (
    <>
      <JsonLd data={productJsonLd} />

      <div className="container-main py-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: prefix("/") },
            ...(categorySlug
              ? [
                  { label: "Categories", href: prefix("/categories") },
                  {
                    label: categorySlug.replace(/-/g, " "),
                    href: prefix(`/categories/${categorySlug}`),
                  },
                ]
              : []),
            { label: product.name },
          ]}
        />
      </div>

      <div className="container-main pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          <div className="space-y-6">
            <ProductGallery
              slug={slug}
              name={product.name}
              categorySlugs={product.categorySlugs}
              imageEmoji={product.imageEmoji}
              imageColor={product.imageColor}
            />
            <PlaceInRoom
              slug={slug}
              name={product.name}
              categorySlugs={product.categorySlugs}
            />
          </div>

          <div className="space-y-6">
            {product.indianName && (
              <p className="text-gold font-devanagari text-lg tracking-wide">{product.indianName}</p>
            )}
            <h1 className="font-display text-2xl md:text-3xl lg:text-4xl text-brown leading-tight">{product.name}</h1>
            <p className="text-brown-light">{product.subtitle}</p>

            {product.rating > 0 && (
              <p className="text-sm text-brown-light">
                <span className="text-saffron">★</span> {product.rating.toFixed(1)} (
                {product.reviewCount} reviews)
              </p>
            )}

            <PriceDisplay price={price} country={country} size="lg" />
            <p className="text-sm text-brown-light">{product.shortDescription}</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <AddToCartButton
                slug={slug}
                disabled={!product.inStock}
                fullWidth
                size="lg"
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </AddToCartButton>
              <Link href={prefix("/checkout")} className="flex-1">
                <Button variant="outline" size="lg" fullWidth disabled={!product.inStock}>
                  Buy Now
                </Button>
              </Link>
            </div>

            <ShippingInfo country={country} />
          </div>
        </div>

        <section className="mt-16">
          <h2 className="text-xl font-semibold text-brown mb-4">Product details</h2>
          <Accordion items={accordionItems} />
        </section>

        {crossSells.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-semibold text-brown mb-6">You may also like</h2>
            <ProductGrid products={crossSells} country={country} />
          </section>
        )}
      </div>

      <StickyAddToCart
        slug={slug}
        name={product.name}
        price={price}
        country={country}
        inStock={product.inStock}
      />
    </>
  );
}
