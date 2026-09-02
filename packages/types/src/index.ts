export type CountryCode =
  | "IN"
  | "US"
  | "UK"
  | "CA"
  | "AU"
  | "AE"
  | "SG"
  | "NZ"
  | "EU";

export type CurrencyCode = "INR" | "USD" | "GBP" | "CAD" | "AUD" | "AED" | "SGD" | "NZD" | "EUR";

export type Tradition = "hindu" | "jain" | "universal";

export type LocaleCode =
  | "en-IN"
  | "en-US"
  | "en-GB"
  | "en-CA"
  | "en-AU"
  | "en-AE"
  | "en-SG"
  | "en-NZ"
  | "en-EU";

export interface CountryConfig {
  code: CountryCode;
  name: string;
  urlPrefix: string | null;
  currency: CurrencyCode;
  locale: LocaleCode;
  hreflang: string;
  flag: string;
  freeShippingThreshold: number;
  paymentProvider: "razorpay" | "stripe" | "pending";
  timezone: string;
}

export interface Money {
  amount: number;
  currency: CurrencyCode;
}

export interface SEOFields {
  title: string;
  description: string;
  keywords?: string[];
  h1: string;
  canonicalPath?: string;
  ogImage?: string;
  noindex?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type ProductImageType =
  | "hero"
  | "gallery"
  | "scale"
  | "in_use"
  | "detail"
  | "dimensions"
  | "packaging"
  | "contents";

export type CampaignPriority = number;

export interface AnalyticsContext {
  country: CountryCode;
  currency: CurrencyCode;
  device?: "mobile" | "desktop" | "tablet";
  festivalCampaign?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
}
