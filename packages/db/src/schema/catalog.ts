import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  decimal,
  jsonb,
  pgEnum,
  index,
  uniqueIndex,
  primaryKey,
} from "drizzle-orm/pg-core";
import { traditionEnum } from "./users";

export const productStatusEnum = pgEnum("product_status", ["draft", "active", "archived"]);

export const products = pgTable(
  "products",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    skuBase: varchar("sku_base", { length: 100 }),
    status: productStatusEnum("status").default("draft").notNull(),
    tradition: traditionEnum("tradition").default("universal"),
    hsnCode: varchar("hsn_code", { length: 20 }),
    countryOfOrigin: varchar("country_of_origin", { length: 5 }).default("IN"),
    weightG: integer("weight_g"),
    lengthCm: decimal("length_cm", { precision: 8, scale: 2 }),
    widthCm: decimal("width_cm", { precision: 8, scale: 2 }),
    heightCm: decimal("height_cm", { precision: 8, scale: 2 }),
    material: varchar("material", { length: 255 }),
    crossSellRules: jsonb("cross_sell_rules").$type<string[]>(),
    searchTerms: jsonb("search_terms").$type<string[]>(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [index("products_status_idx").on(t.status), index("products_tradition_idx").on(t.tradition)]
);

export const productVariants = pgTable(
  "product_variants",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    productId: uuid("product_id")
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    sku: varchar("sku", { length: 100 }).notNull().unique(),
    name: varchar("name", { length: 255 }),
    weightG: integer("weight_g"),
    sortOrder: integer("sort_order").default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("variants_product_idx").on(t.productId)]
);

export const productContent = pgTable(
  "product_content",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    productId: uuid("product_id")
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    locale: varchar("locale", { length: 10 }).default("en-IN").notNull(),
    name: varchar("name", { length: 500 }).notNull(),
    subtitle: varchar("subtitle", { length: 500 }),
    indianName: varchar("indian_name", { length: 255 }),
    shortDescription: text("short_description"),
    description: text("description"),
    whatIsIt: text("what_is_it"),
    traditionalUse: text("traditional_use"),
    howToUse: text("how_to_use"),
    careInstructions: text("care_instructions"),
    whatsIncluded: text("whats_included"),
    ritualGuide: text("ritual_guide"),
    faq: jsonb("faq").$type<{ question: string; answer: string }[]>(),
    seoTitle: varchar("seo_title", { length: 255 }),
    seoDescription: text("seo_description"),
    seoKeywords: jsonb("seo_keywords").$type<string[]>(),
    h1: varchar("h1", { length: 255 }),
  },
  (t) => [uniqueIndex("product_content_locale_idx").on(t.productId, t.locale)]
);

export const productImages = pgTable(
  "product_images",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    productId: uuid("product_id")
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    url: text("url").notNull(),
    alt: varchar("alt", { length: 500 }),
    type: varchar("type", { length: 50 }).default("gallery"),
    sortOrder: integer("sort_order").default(0),
  },
  (t) => [index("product_images_product_idx").on(t.productId)]
);

export const productPrices = pgTable(
  "product_prices",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    variantId: uuid("variant_id")
      .references(() => productVariants.id, { onDelete: "cascade" })
      .notNull(),
    countryCode: varchar("country_code", { length: 5 }).notNull(),
    mrp: decimal("mrp", { precision: 12, scale: 2 }),
    sellingPrice: decimal("selling_price", { precision: 12, scale: 2 }).notNull(),
    compareAtPrice: decimal("compare_at_price", { precision: 12, scale: 2 }),
  },
  (t) => [uniqueIndex("prices_variant_country_idx").on(t.variantId, t.countryCode)]
);

export const productAvailability = pgTable(
  "product_availability",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    productId: uuid("product_id")
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    countryCode: varchar("country_code", { length: 5 }).notNull(),
    available: boolean("available").default(true).notNull(),
    restrictionNote: text("restriction_note"),
  },
  (t) => [uniqueIndex("availability_product_country_idx").on(t.productId, t.countryCode)]
);

export const inventory = pgTable(
  "inventory",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    variantId: uuid("variant_id")
      .references(() => productVariants.id, { onDelete: "cascade" })
      .notNull()
      .unique(),
    quantity: integer("quantity").default(0).notNull(),
    reserved: integer("reserved").default(0).notNull(),
    lowStockThreshold: integer("low_stock_threshold").default(5),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  }
);

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    parentId: uuid("parent_id"),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }).notNull(),
    tradition: traditionEnum("tradition").default("universal"),
    description: text("description"),
    introContent: text("intro_content"),
    heroImage: text("hero_image"),
    bannerImage: text("banner_image"),
    seoTitle: varchar("seo_title", { length: 255 }),
    seoDescription: text("seo_description"),
    seoKeywords: jsonb("seo_keywords").$type<string[]>(),
    h1: varchar("h1", { length: 255 }),
    faq: jsonb("faq").$type<{ question: string; answer: string }[]>(),
    relatedCategoryIds: jsonb("related_category_ids").$type<string[]>(),
    festivalSlugs: jsonb("festival_slugs").$type<string[]>(),
    countryAvailability: jsonb("country_availability").$type<string[]>(),
    sortOrder: integer("sort_order").default(0),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [index("categories_parent_idx").on(t.parentId)]
);

export const categoryProducts = pgTable(
  "category_products",
  {
    categoryId: uuid("category_id")
      .references(() => categories.id, { onDelete: "cascade" })
      .notNull(),
    productId: uuid("product_id")
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    sortOrder: integer("sort_order").default(0),
  },
  (t) => [primaryKey({ columns: [t.categoryId, t.productId] })]
);

export const collections = pgTable("collections", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }).default("manual"),
  tradition: traditionEnum("tradition").default("universal"),
  description: text("description"),
  introContent: text("intro_content"),
  heroImage: text("hero_image"),
  seoTitle: varchar("seo_title", { length: 255 }),
  seoDescription: text("seo_description"),
  h1: varchar("h1", { length: 255 }),
  faq: jsonb("faq").$type<{ question: string; answer: string }[]>(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const collectionProducts = pgTable(
  "collection_products",
  {
    collectionId: uuid("collection_id")
      .references(() => collections.id, { onDelete: "cascade" })
      .notNull(),
    productId: uuid("product_id")
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    sortOrder: integer("sort_order").default(0),
  },
  (t) => [primaryKey({ columns: [t.collectionId, t.productId] })]
);

export const bundles = pgTable("bundles", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  tradition: traditionEnum("tradition").default("universal"),
  heroImage: text("hero_image"),
  seoTitle: varchar("seo_title", { length: 255 }),
  seoDescription: text("seo_description"),
  h1: varchar("h1", { length: 255 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const bundleItems = pgTable("bundle_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  bundleId: uuid("bundle_id")
    .references(() => bundles.id, { onDelete: "cascade" })
    .notNull(),
  variantId: uuid("variant_id")
    .references(() => productVariants.id, { onDelete: "cascade" })
    .notNull(),
  quantity: integer("quantity").default(1).notNull(),
});

export const bundlePrices = pgTable(
  "bundle_prices",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    bundleId: uuid("bundle_id")
      .references(() => bundles.id, { onDelete: "cascade" })
      .notNull(),
    countryCode: varchar("country_code", { length: 5 }).notNull(),
    bundlePrice: decimal("bundle_price", { precision: 12, scale: 2 }).notNull(),
    individualValue: decimal("individual_value", { precision: 12, scale: 2 }),
  },
  (t) => [uniqueIndex("bundle_prices_country_idx").on(t.bundleId, t.countryCode)]
);

export const crossSellRules = pgTable(
  "cross_sell_rules",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    sourceProductId: uuid("source_product_id")
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    targetProductId: uuid("target_product_id")
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    ruleType: varchar("rule_type", { length: 50 }).default("complementary"),
    priority: integer("priority").default(0),
  },
  (t) => [index("cross_sell_source_idx").on(t.sourceProductId)]
);

export const searchSynonyms = pgTable("search_synonyms", {
  id: uuid("id").defaultRandom().primaryKey(),
  term: varchar("term", { length: 255 }).notNull(),
  synonyms: jsonb("synonyms").$type<string[]>().notNull(),
  locale: varchar("locale", { length: 10 }).default("en"),
});
