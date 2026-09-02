import type { CountryConfig, SEOFields } from "@puja/types";
import { BRAND } from "@puja/config";

export function buildPageMetadata(
  seo: Partial<SEOFields>,
  country: CountryConfig,
  path = "/"
) {
  const prefix = country.urlPrefix ? `/${country.urlPrefix}` : "";
  const canonical = `${BRAND.domain}${prefix}${path}`;

  return {
    title: seo.title ?? BRAND.name,
    description: seo.description ?? BRAND.tagline,
    alternates: { canonical },
    openGraph: {
      title: seo.title ?? BRAND.name,
      description: seo.description ?? BRAND.tagline,
      url: canonical,
      siteName: BRAND.name,
      locale: country.locale.replace("-", "_"),
      type: "website" as const,
      ...(seo.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image" as const,
      title: seo.title ?? BRAND.name,
      description: seo.description ?? BRAND.tagline,
    },
    ...(seo.noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND.name,
    url: BRAND.domain,
    description:
      "Trusted specialist for authentic Indian puja and spiritual products — delivered to India and worldwide.",
    sameAs: [],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND.name,
    url: BRAND.domain,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BRAND.domain}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
