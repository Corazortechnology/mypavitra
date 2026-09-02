/**
 * MyPavitra product images — locally generated, product-specific SVGs.
 * Regenerate: node scripts/generate-product-images.mjs
 */

const local = (folder: string, slug: string) => `/images/${folder}/${slug}.svg`;

export const HERO_IMAGE = "/images/hero/main.svg";
export const HERO_IMAGE_ALT = "Brass diya — MyPavitra puja essentials";

/** All 26 product slugs → dedicated image */
export const PRODUCT_IMAGES: Record<string, string> = {
  "brass-diya-classic": local("products", "brass-diya-classic"),
  "brass-diya-set-of-5": local("products", "brass-diya-set-of-5"),
  "brass-hanging-diya-pair": local("products", "brass-hanging-diya-pair"),
  "brass-puja-thali-medium": local("products", "brass-puja-thali-medium"),
  "brass-puja-bell-medium": local("products", "brass-puja-bell-medium"),
  "brass-kalash-medium": local("products", "brass-kalash-medium"),
  "brass-camphor-holder": local("products", "brass-camphor-holder"),
  "cotton-wicks-pack": local("products", "cotton-wicks-pack"),
  "pure-camphor-tablets": local("products", "pure-camphor-tablets"),
  "kumkum-vermillion": local("products", "kumkum-vermillion"),
  "chandan-sandalwood-paste": local("products", "chandan-sandalwood-paste"),
  "akshat-unbroken-rice": local("products", "akshat-unbroken-rice"),
  "sandalwood-incense-sticks": local("products", "sandalwood-incense-sticks"),
  "jain-brass-samai": local("products", "jain-brass-samai"),
  "jain-brass-camphor-holder": local("products", "jain-brass-camphor-holder"),
  "ganesh-idol-brass-small": local("products", "ganesh-idol-brass-small"),
  "lakshmi-idol-brass-small": local("products", "lakshmi-idol-brass-small"),
  "copper-lota-500ml": local("products", "copper-lota-500ml"),
  "tambe-ka-kalash": local("products", "tambe-ka-kalash"),
  "daily-puja-samagri-kit": local("products", "daily-puja-samagri-kit"),
  "loban-dhoop-cups": local("products", "loban-dhoop-cups"),
  "rudraksha-mala-108": local("products", "rudraksha-mala-108"),
  "diwali-gift-hamper": local("products", "diwali-gift-hamper"),
  "brass-aarti-diya": local("products", "brass-aarti-diya"),
  "copper-puja-thali": local("products", "copper-puja-thali"),
  "tulsi-mala-108": local("products", "tulsi-mala-108"),
};

export const CATEGORY_IMAGES: Record<string, string> = {
  "puja-samagri": local("categories", "puja-samagri"),
  "brass-puja-items": local("categories", "brass-puja-items"),
  "copper-puja-items": local("categories", "copper-puja-items"),
  diyas: local("categories", "diyas"),
  "puja-kits": local("categories", "puja-kits"),
  "incense-dhoop": local("categories", "incense-dhoop"),
  "idols-murtis": local("categories", "idols-murtis"),
  "jain-puja-products": local("categories", "jain-puja-products"),
  "puja-gifts": local("categories", "puja-gifts"),
  "pooja-thali": local("categories", "pooja-thali"),
  kalash: local("categories", "kalash"),
  mala: local("categories", "mala"),
};

export const BUNDLE_IMAGES: Record<string, string> = {
  "daily-puja-starter-kit": local("bundles", "daily-puja-starter-kit"),
  "diwali-complete-puja-kit": local("bundles", "diwali-complete-puja-kit"),
  "new-home-puja-kit": local("bundles", "new-home-puja-kit"),
  "jain-puja-essentials": local("bundles", "jain-puja-essentials"),
  "brass-puja-essentials-set": local("bundles", "brass-puja-essentials-set"),
};

export const FESTIVAL_IMAGES: Record<string, string> = {
  diwali: local("festivals", "diwali"),
  navratri: local("festivals", "navratri"),
  "ganesh-chaturthi": local("festivals", "ganesh-chaturthi"),
  dhanteras: local("festivals", "dhanteras"),
  paryushan: local("festivals", "paryushan"),
  "mahavir-jayanti": local("festivals", "mahavir-jayanti"),
};

export function getProductImage(slug: string, categorySlugs: string[]): string {
  if (PRODUCT_IMAGES[slug]) return PRODUCT_IMAGES[slug];
  for (const cat of categorySlugs) {
    if (CATEGORY_IMAGES[cat]) return CATEGORY_IMAGES[cat];
  }
  return CATEGORY_IMAGES["puja-samagri"] ?? HERO_IMAGE;
}

export function getCategoryImage(slug: string): string {
  return CATEGORY_IMAGES[slug] ?? CATEGORY_IMAGES["puja-samagri"]!;
}

export function getBundleImage(slug: string): string {
  return BUNDLE_IMAGES[slug] ?? BUNDLE_IMAGES["daily-puja-starter-kit"]!;
}

export function getFestivalImage(slug: string): string {
  return FESTIVAL_IMAGES[slug] ?? FESTIVAL_IMAGES["diwali"]!;
}

/** All image assets for review page */
export const IMAGE_MANIFEST = {
  products: Object.entries(PRODUCT_IMAGES).map(([slug, src]) => ({ slug, src })),
  categories: Object.entries(CATEGORY_IMAGES).map(([slug, src]) => ({ slug, src })),
  bundles: Object.entries(BUNDLE_IMAGES).map(([slug, src]) => ({ slug, src })),
  festivals: Object.entries(FESTIVAL_IMAGES).map(([slug, src]) => ({ slug, src })),
};
