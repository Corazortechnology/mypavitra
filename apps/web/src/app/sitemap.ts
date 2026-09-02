import type { MetadataRoute } from "next";
import {
  getAllProductSlugs,
  CATEGORIES,
  COLLECTIONS,
  BUNDLES,
  FESTIVALS,
  GUIDES,
} from "@puja/catalog";
import { SHOP_BY_PURPOSE, BRAND, COUNTRY_LIST } from "@puja/config";

function localizedUrls(path: string): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  entries.push({
    url: `${BRAND.domain}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.8,
  });

  for (const country of COUNTRY_LIST) {
    if (!country.urlPrefix) continue;
    entries.push({
      url: `${BRAND.domain}/${country.urlPrefix}${path === "/" ? "" : path}`,
      lastModified: new Date(),
      changeFrequency: path === "/" ? "daily" : "weekly",
      priority: path === "/" ? 0.9 : 0.7,
    });
  }

  return entries;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/categories",
    "/bundles",
    "/festivals",
    "/guides",
    "/search",
    "/about",
    "/contact",
    "/faq",
    "/shipping",
    "/shipping/international",
    "/returns",
    "/privacy",
    "/terms",
  ];

  const entries: MetadataRoute.Sitemap = staticPaths.flatMap(localizedUrls);

  for (const slug of getAllProductSlugs()) {
    entries.push(...localizedUrls(`/products/${slug}`));
  }

  for (const cat of CATEGORIES) {
    entries.push(...localizedUrls(`/categories/${cat.slug}`));
  }

  for (const col of COLLECTIONS) {
    entries.push(...localizedUrls(`/collections/${col.slug}`));
  }

  for (const bundle of BUNDLES) {
    entries.push(...localizedUrls(`/bundles/${bundle.slug}`));
  }

  for (const festival of FESTIVALS) {
    entries.push(...localizedUrls(`/festivals/${festival.slug}`));
  }

  for (const guide of GUIDES) {
    entries.push(...localizedUrls(`/guides/${guide.slug}`));
  }

  for (const purpose of SHOP_BY_PURPOSE) {
    entries.push(...localizedUrls(`/shop-by-purpose/${purpose.slug}`));
  }

  return entries;
}
