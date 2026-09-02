import type { CatalogBundle } from "../types";
import { ALL_COUNTRIES } from "../types";
import { PRODUCTS } from "./products";

function mkBundlePrices(
  bundleInr: number,
  individualInr: number
): CatalogBundle["prices"] {
  const convert = (inr: number): Record<string, number> => ({
    IN: inr,
    US: +(inr / 83 * 1.35).toFixed(2),
    UK: +(inr / 105 * 1.35).toFixed(2),
    CA: +(inr / 61 * 1.35).toFixed(2),
    AU: +(inr / 54 * 1.35).toFixed(2),
    AE: +(inr / 22.6 * 1.35).toFixed(2),
    SG: +(inr / 61.5 * 1.35).toFixed(2),
    NZ: +(inr / 50 * 1.35).toFixed(2),
    EU: +(inr / 90 * 1.35).toFixed(2),
  });
  const bundle = convert(bundleInr);
  const individual = convert(individualInr);
  return Object.fromEntries(
    ALL_COUNTRIES.map((code) => [
      code,
      { bundle: bundle[code]!, individual: individual[code]! },
    ])
  ) as CatalogBundle["prices"];
}

function sumIndividual(itemSlugs: { slug: string; qty: number }[]): number {
  return itemSlugs.reduce((total, item) => {
    const product = PRODUCTS.find((p) => p.slug === item.slug);
    const inr = product?.prices.IN?.selling ?? 0;
    return total + inr * item.qty;
  }, 0);
}

function bundle(
  partial: Omit<CatalogBundle, "prices"> & { bundleInr: number }
): CatalogBundle {
  const { bundleInr, itemSlugs, ...rest } = partial;
  const individualInr = sumIndividual(itemSlugs);
  return {
    ...rest,
    itemSlugs,
    prices: mkBundlePrices(bundleInr, individualInr),
  };
}

export const BUNDLES: CatalogBundle[] = [
  bundle({
    slug: "daily-puja-starter-kit",
    name: "Daily Puja Starter Kit",
    description:
      "Brass diya, thali, bell, and a full samagri kit — everything to start daily puja in one bundle. Save 15% vs buying separately.",
    tradition: "universal",
    h1: "Daily Puja Starter Kit — Complete Beginner Set",
    itemSlugs: [
      { slug: "brass-diya-classic", qty: 1 },
      { slug: "brass-puja-thali-medium", qty: 1 },
      { slug: "brass-puja-bell-medium", qty: 1 },
      { slug: "daily-puja-samagri-kit", qty: 1 },
    ],
    bundleInr: 2699,
    collectionSlugs: ["daily-puja", "best-sellers"],
  }),

  bundle({
    slug: "diwali-complete-puja-kit",
    name: "Diwali Complete Puja Kit",
    description:
      "Five diyas, Lakshmi & Ganesh murtis, thali, samagri, and incense — the complete Diwali Lakshmi puja set.",
    tradition: "hindu",
    h1: "Diwali Complete Puja Kit",
    itemSlugs: [
      { slug: "brass-diya-set-of-5", qty: 1 },
      { slug: "lakshmi-idol-brass-small", qty: 1 },
      { slug: "ganesh-idol-brass-small", qty: 1 },
      { slug: "brass-puja-thali-medium", qty: 1 },
      { slug: "kumkum-vermillion", qty: 1 },
      { slug: "pure-camphor-tablets", qty: 1 },
      { slug: "sandalwood-incense-sticks", qty: 1 },
    ],
    bundleInr: 3999,
    collectionSlugs: ["diwali-puja"],
  }),

  bundle({
    slug: "new-home-puja-kit",
    name: "New Home Puja Kit",
    description:
      "Kalash, thali, dhoop, samagri, and diyas for griha pravesh and mandir setup in your new home.",
    tradition: "hindu",
    h1: "New Home Puja Kit — Griha Pravesh Set",
    itemSlugs: [
      { slug: "brass-kalash-medium", qty: 1 },
      { slug: "brass-puja-thali-medium", qty: 1 },
      { slug: "brass-diya-set-of-5", qty: 1 },
      { slug: "loban-dhoop-cups", qty: 1 },
      { slug: "akshat-unbroken-rice", qty: 1 },
      { slug: "kumkum-vermillion", qty: 1 },
      { slug: "daily-puja-samagri-kit", qty: 1 },
    ],
    bundleInr: 4499,
    collectionSlugs: ["new-home-puja"],
  }),

  bundle({
    slug: "jain-puja-essentials",
    name: "Jain Puja Essentials Bundle",
    description:
      "Brass samai, Jain camphor holder, wicks, and camphor — complete daily Jain puja setup.",
    tradition: "jain",
    h1: "Jain Puja Essentials Bundle",
    itemSlugs: [
      { slug: "jain-brass-samai", qty: 1 },
      { slug: "jain-brass-camphor-holder", qty: 1 },
      { slug: "cotton-wicks-pack", qty: 2 },
      { slug: "pure-camphor-tablets", qty: 1 },
      { slug: "sandalwood-incense-sticks", qty: 1 },
    ],
    bundleInr: 1599,
    collectionSlugs: ["jain-essentials", "daily-puja"],
  }),

  bundle({
    slug: "brass-puja-essentials-set",
    name: "Brass Puja Essentials Set",
    description:
      "Our five bestselling brass items — diya, thali, bell, aarti diya, and camphor holder — at a bundle price.",
    tradition: "universal",
    h1: "Brass Puja Essentials Set",
    itemSlugs: [
      { slug: "brass-diya-classic", qty: 1 },
      { slug: "brass-puja-thali-medium", qty: 1 },
      { slug: "brass-puja-bell-medium", qty: 1 },
      { slug: "brass-aarti-diya", qty: 1 },
      { slug: "brass-camphor-holder", qty: 1 },
    ],
    bundleInr: 2199,
    collectionSlugs: ["brass-essentials", "best-sellers"],
  }),
];
