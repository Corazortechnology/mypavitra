import type { CountryCode, FAQItem, Tradition } from "@puja/types";

export interface ProductPrice {
  mrp?: number;
  selling: number;
}

export interface CatalogProduct {
  id: string;
  slug: string;
  sku: string;
  name: string;
  indianName?: string;
  subtitle: string;
  categorySlugs: string[];
  collectionSlugs: string[];
  tradition: Tradition;
  prices: Partial<Record<CountryCode, ProductPrice>>;
  imageEmoji: string;
  imageColor: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  material?: string;
  weight?: string;
  dimensions?: string;
  countryOfOrigin?: string;
  shortDescription: string;
  description: string;
  whatIsIt: string;
  traditionalUse: string;
  howToUse: string;
  careInstructions?: string;
  whatsIncluded?: string;
  faq: FAQItem[];
  crossSellSlugs: string[];
  searchTerms: string[];
  countryAvailability: CountryCode[];
}

export interface CatalogCategory {
  slug: string;
  name: string;
  tradition: Tradition;
  description: string;
  introContent: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  parentSlug?: string;
  faq: FAQItem[];
  productSlugs: string[];
}

export interface CatalogBundle {
  slug: string;
  name: string;
  description: string;
  tradition: Tradition;
  h1: string;
  itemSlugs: { slug: string; qty: number }[];
  prices: Partial<Record<CountryCode, { bundle: number; individual: number }>>;
  collectionSlugs: string[];
}

export interface CatalogFestival {
  slug: string;
  name: string;
  tradition: Tradition;
  description: string;
  introContent: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  startDate: string;
  endDate: string;
  collectionSlug: string;
  bundleSlugs: string[];
  guideSlugs: string[];
  faq: FAQItem[];
}

export interface CatalogGuide {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tradition: Tradition;
  category: string;
  seoTitle: string;
  seoDescription: string;
  faq: FAQItem[];
  relatedProductSlugs: string[];
  relatedCollectionSlugs: string[];
}

export interface CatalogCollection {
  slug: string;
  name: string;
  description: string;
  introContent: string;
  h1: string;
  tradition: Tradition;
  productSlugs: string[];
}

export interface ActiveCampaign {
  heading: string;
  subheading: string;
  ctaText: string;
  ctaUrl: string;
  festivalSlug?: string;
  priority: number;
}

export function mkPrices(inr: number, mrpInr?: number): Partial<Record<CountryCode, ProductPrice>> {
  const mrp = mrpInr ?? Math.round(inr * 1.28);
  return {
    IN: { selling: inr, mrp },
    US: { selling: +(inr / 83 * 1.35).toFixed(2), mrp: +((mrp / 83) * 1.35).toFixed(2) },
    UK: { selling: +(inr / 105 * 1.35).toFixed(2), mrp: +((mrp / 105) * 1.35).toFixed(2) },
    CA: { selling: +(inr / 61 * 1.35).toFixed(2), mrp: +((mrp / 61) * 1.35).toFixed(2) },
    AU: { selling: +(inr / 54 * 1.35).toFixed(2), mrp: +((mrp / 54) * 1.35).toFixed(2) },
    AE: { selling: +(inr / 22.6 * 1.35).toFixed(2), mrp: +((mrp / 22.6) * 1.35).toFixed(2) },
    SG: { selling: +(inr / 61.5 * 1.35).toFixed(2), mrp: +((mrp / 61.5) * 1.35).toFixed(2) },
    NZ: { selling: +(inr / 50 * 1.35).toFixed(2), mrp: +((mrp / 50) * 1.35).toFixed(2) },
    EU: { selling: +(inr / 90 * 1.35).toFixed(2), mrp: +((mrp / 90) * 1.35).toFixed(2) },
  };
}

export const ALL_COUNTRIES: CountryCode[] = ["IN", "US", "UK", "CA", "AU", "AE", "SG", "NZ", "EU"];
