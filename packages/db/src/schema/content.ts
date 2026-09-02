import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  jsonb,
  date,
  integer,
} from "drizzle-orm/pg-core";
import { traditionEnum } from "./users";

export const festivals = pgTable("festivals", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  tradition: traditionEnum("tradition").default("hindu"),
  description: text("description"),
  introContent: text("intro_content"),
  heroImage: text("hero_image"),
  collectionId: uuid("collection_id"),
  seoTitle: varchar("seo_title", { length: 255 }),
  seoDescription: text("seo_description"),
  h1: varchar("h1", { length: 255 }),
  faq: jsonb("faq").$type<{ question: string; answer: string }[]>(),
  relatedGuideSlugs: jsonb("related_guide_slugs").$type<string[]>(),
  countryRelevance: jsonb("country_relevance").$type<string[]>(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const festivalYears = pgTable("festival_years", {
  id: uuid("id").defaultRandom().primaryKey(),
  festivalId: uuid("festival_id").notNull(),
  year: integer("year").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  campaignId: uuid("campaign_id"),
});

export const guides = pgTable("guides", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 500 }).notNull(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  tradition: traditionEnum("tradition").default("universal"),
  category: varchar("category", { length: 100 }),
  seoTitle: varchar("seo_title", { length: 255 }),
  seoDescription: text("seo_description"),
  faq: jsonb("faq").$type<{ question: string; answer: string }[]>(),
  internalLinks: jsonb("internal_links").$type<{ label: string; url: string }[]>(),
  relatedProductIds: jsonb("related_product_ids").$type<string[]>(),
  relatedCollectionSlugs: jsonb("related_collection_slugs").$type<string[]>(),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 500 }).notNull(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  coverImage: text("cover_image"),
  author: varchar("author", { length: 255 }),
  seoTitle: varchar("seo_title", { length: 255 }),
  seoDescription: text("seo_description"),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const shopByPurpose = pgTable("shop_by_purpose", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  tradition: traditionEnum("tradition").default("universal"),
  description: text("description"),
  introContent: text("intro_content"),
  heroImage: text("hero_image"),
  collectionId: uuid("collection_id"),
  seoTitle: varchar("seo_title", { length: 255 }),
  seoDescription: text("seo_description"),
  h1: varchar("h1", { length: 255 }),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true),
});

export const landingPages = pgTable("landing_pages", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 500 }).notNull(),
  content: text("content").notNull(),
  template: varchar("template", { length: 50 }).default("default"),
  seoTitle: varchar("seo_title", { length: 255 }),
  seoDescription: text("seo_description"),
  countryCodes: jsonb("country_codes").$type<string[]>(),
  isPublished: boolean("is_published").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
