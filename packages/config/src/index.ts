import type { CountryCode, CountryConfig } from "@puja/types";

export const DEFAULT_COUNTRY: CountryCode = "IN";

export const BRAND = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME ?? "MyPavitra",
  tagline: "Traditional products. Thoughtfully sourced.",
  domain: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mypavitra.com",
} as const;

export const COUNTRIES: Record<CountryCode, CountryConfig> = {
  IN: {
    code: "IN",
    name: "India",
    urlPrefix: null,
    currency: "INR",
    locale: "en-IN",
    hreflang: "en-IN",
    flag: "🇮🇳",
    freeShippingThreshold: 999,
    paymentProvider: "razorpay",
    timezone: "Asia/Kolkata",
  },
  US: {
    code: "US",
    name: "United States",
    urlPrefix: "us",
    currency: "USD",
    locale: "en-US",
    hreflang: "en-US",
    flag: "🇺🇸",
    freeShippingThreshold: 49,
    paymentProvider: "pending",
    timezone: "America/New_York",
  },
  UK: {
    code: "UK",
    name: "United Kingdom",
    urlPrefix: "uk",
    currency: "GBP",
    locale: "en-GB",
    hreflang: "en-GB",
    flag: "🇬🇧",
    freeShippingThreshold: 39,
    paymentProvider: "pending",
    timezone: "Europe/London",
  },
  CA: {
    code: "CA",
    name: "Canada",
    urlPrefix: "ca",
    currency: "CAD",
    locale: "en-CA",
    hreflang: "en-CA",
    flag: "🇨🇦",
    freeShippingThreshold: 59,
    paymentProvider: "pending",
    timezone: "America/Toronto",
  },
  AU: {
    code: "AU",
    name: "Australia",
    urlPrefix: "au",
    currency: "AUD",
    locale: "en-AU",
    hreflang: "en-AU",
    flag: "🇦🇺",
    freeShippingThreshold: 69,
    paymentProvider: "pending",
    timezone: "Australia/Sydney",
  },
  AE: {
    code: "AE",
    name: "United Arab Emirates",
    urlPrefix: "ae",
    currency: "AED",
    locale: "en-AE",
    hreflang: "en-AE",
    flag: "🇦🇪",
    freeShippingThreshold: 149,
    paymentProvider: "pending",
    timezone: "Asia/Dubai",
  },
  SG: {
    code: "SG",
    name: "Singapore",
    urlPrefix: "sg",
    currency: "SGD",
    locale: "en-SG",
    hreflang: "en-SG",
    flag: "🇸🇬",
    freeShippingThreshold: 59,
    paymentProvider: "pending",
    timezone: "Asia/Singapore",
  },
  NZ: {
    code: "NZ",
    name: "New Zealand",
    urlPrefix: "nz",
    currency: "NZD",
    locale: "en-NZ",
    hreflang: "en-NZ",
    flag: "🇳🇿",
    freeShippingThreshold: 79,
    paymentProvider: "pending",
    timezone: "Pacific/Auckland",
  },
  EU: {
    code: "EU",
    name: "Europe",
    urlPrefix: "eu",
    currency: "EUR",
    locale: "en-EU",
    hreflang: "en-EU",
    flag: "🇪🇺",
    freeShippingThreshold: 49,
    paymentProvider: "pending",
    timezone: "Europe/Berlin",
  },
};

export const COUNTRY_LIST = Object.values(COUNTRIES);

export const URL_PREFIX_TO_COUNTRY: Record<string, CountryCode> = Object.fromEntries(
  COUNTRY_LIST.filter((c) => c.urlPrefix).map((c) => [c.urlPrefix!, c.code])
) as Record<string, CountryCode>;

export function getCountryByCode(code: CountryCode): CountryConfig {
  return COUNTRIES[code];
}

export function getCountryByUrlPrefix(prefix: string | null | undefined): CountryConfig {
  if (!prefix) return COUNTRIES[DEFAULT_COUNTRY];
  const code = URL_PREFIX_TO_COUNTRY[prefix.toLowerCase()];
  return code ? COUNTRIES[code] : COUNTRIES[DEFAULT_COUNTRY];
}

export function buildLocalizedPath(path: string, country: CountryConfig): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!country.urlPrefix) return normalized;
  if (normalized === "/") return `/${country.urlPrefix}`;
  return `/${country.urlPrefix}${normalized}`;
}

export function formatPrice(amount: number, currency: CountryConfig["currency"]): string {
  const locales: Record<CountryConfig["currency"], string> = {
    INR: "en-IN",
    USD: "en-US",
    GBP: "en-GB",
    CAD: "en-CA",
    AUD: "en-AU",
    AED: "en-AE",
    SGD: "en-SG",
    NZD: "en-NZ",
    EUR: "de-DE",
  };

  return new Intl.NumberFormat(locales[currency], {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "INR" ? 0 : 2,
  }).format(amount);
}

export const SHOP_BY_PURPOSE = [
  { slug: "daily-puja", name: "Daily Puja", tradition: "hindu" as const },
  { slug: "jain-daily-puja", name: "Jain Daily Puja", tradition: "jain" as const },
  { slug: "new-home", name: "New Home", tradition: "universal" as const },
  { slug: "housewarming", name: "Housewarming", tradition: "universal" as const },
  { slug: "wedding", name: "Wedding", tradition: "universal" as const },
  { slug: "diwali", name: "Diwali", tradition: "hindu" as const },
  { slug: "navratri", name: "Navratri", tradition: "hindu" as const },
  { slug: "ganesh-puja", name: "Ganesh Puja", tradition: "hindu" as const },
  { slug: "lakshmi-puja", name: "Lakshmi Puja", tradition: "hindu" as const },
  { slug: "jain-puja", name: "Jain Puja", tradition: "jain" as const },
  { slug: "gifting", name: "Gifting", tradition: "universal" as const },
  { slug: "temple", name: "Temple", tradition: "universal" as const },
  { slug: "office-puja", name: "Office Puja", tradition: "universal" as const },
] as const;

export const CAMPAIGN_PRIORITIES = {
  EVERGREEN: 1,
  MINOR_FESTIVAL: 50,
  MAJOR_FESTIVAL: 100,
  MANUAL_OVERRIDE: 999,
} as const;
