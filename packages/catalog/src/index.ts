export * from "./types";

export { PRODUCTS } from "./data/products";
export { CATEGORIES } from "./data/categories";
export { COLLECTIONS } from "./data/collections";
export { BUNDLES } from "./data/bundles";
export { FESTIVALS } from "./data/festivals";
export { GUIDES } from "./data/guides";

import type { CatalogProduct, ActiveCampaign } from "./types";
import { PRODUCTS } from "./data/products";
import { CATEGORIES } from "./data/categories";
import { COLLECTIONS } from "./data/collections";
import { BUNDLES } from "./data/bundles";
import { FESTIVALS } from "./data/festivals";
import { GUIDES } from "./data/guides";

export function getProductBySlug(slug: string): CatalogProduct | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): CatalogProduct[] {
  return PRODUCTS.filter((p) => p.categorySlugs.includes(categorySlug));
}

export function getProductsByCollection(collectionSlug: string): CatalogProduct[] {
  const collection = COLLECTIONS.find((c) => c.slug === collectionSlug);
  if (!collection) return [];
  return collection.productSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is CatalogProduct => p !== undefined);
}

export function searchProducts(query: string): CatalogProduct[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.searchTerms.some((term) => term.toLowerCase().includes(q)) ||
      p.categorySlugs.some((slug) => slug.includes(q))
  );
}

export function getBundleBySlug(slug: string) {
  return BUNDLES.find((b) => b.slug === slug);
}

export function getFestivalBySlug(slug: string) {
  return FESTIVALS.find((f) => f.slug === slug);
}

export function getGuideBySlug(slug: string) {
  return GUIDES.find((g) => g.slug === slug);
}

export function getCategoryBySlug(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getCollectionBySlug(slug: string) {
  return COLLECTIONS.find((c) => c.slug === slug);
}

export function getActiveCampaign(now: Date = new Date()): ActiveCampaign | undefined {
  const today = now.toISOString().slice(0, 10);

  const activeFestival = FESTIVALS.find(
    (f) => today >= f.startDate && today <= f.endDate
  );

  if (activeFestival) {
    return {
      heading: `${activeFestival.name} Puja Essentials`,
      subheading: activeFestival.description,
      ctaText: `Shop ${activeFestival.name} Collection`,
      ctaUrl: `/collections/${activeFestival.collectionSlug}`,
      festivalSlug: activeFestival.slug,
      priority: 10,
    };
  }

  const upcoming = FESTIVALS.filter((f) => f.startDate > today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate))[0];

  if (upcoming) {
    const daysUntil = Math.ceil(
      (new Date(upcoming.startDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysUntil <= 30) {
      return {
        heading: `${upcoming.name} is ${daysUntil} Days Away`,
        subheading: `Prepare your puja shelf with ${upcoming.name} essentials — samagri, diyas, and more.`,
        ctaText: `Prepare for ${upcoming.name}`,
        ctaUrl: `/festivals/${upcoming.slug}`,
        festivalSlug: upcoming.slug,
        priority: 5,
      };
    }
  }

  return {
    heading: "Everything You Need for Your Daily Puja",
    subheading:
      "Authentic puja samagri, brass items, and complete kits — quality you can see, prices you can trust.",
    ctaText: "Shop Puja Essentials",
    ctaUrl: "/collections/daily-puja",
    priority: 1,
  };
}

export function getCrossSellProducts(productSlug: string, limit = 4): CatalogProduct[] {
  const product = getProductBySlug(productSlug);
  if (!product) return [];
  return product.crossSellSlugs
    .slice(0, limit)
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is CatalogProduct => p !== undefined);
}

export function getAllProductSlugs(): string[] {
  return PRODUCTS.map((p) => p.slug);
}

export function getBestSellers(limit = 12): CatalogProduct[] {
  const bestSellerCollection = COLLECTIONS.find((c) => c.slug === "best-sellers");
  if (!bestSellerCollection) {
    return [...PRODUCTS]
      .sort((a, b) => b.reviewCount - a.reviewCount)
      .slice(0, limit);
  }
  return bestSellerCollection.productSlugs
    .slice(0, limit)
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is CatalogProduct => p !== undefined);
}
