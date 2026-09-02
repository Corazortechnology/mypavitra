import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
  index,
} from "drizzle-orm/pg-core";

export const campaigns = pgTable(
  "campaigns",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    festivalSlug: varchar("festival_slug", { length: 100 }),
    priority: integer("priority").default(1).notNull(),
    startsAt: timestamp("starts_at").notNull(),
    endsAt: timestamp("ends_at").notNull(),
    countryCodes: jsonb("country_codes").$type<string[]>(),
    languages: jsonb("languages").$type<string[]>(),
    isActive: boolean("is_active").default(true),
    isManualOverride: boolean("is_manual_override").default(false),
    collectionSlug: varchar("collection_slug", { length: 255 }),
    discountPercent: integer("discount_percent"),
    theme: varchar("theme", { length: 50 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [
    index("campaigns_dates_idx").on(t.startsAt, t.endsAt),
    index("campaigns_priority_idx").on(t.priority),
  ]
);

export const banners = pgTable("banners", {
  id: uuid("id").defaultRandom().primaryKey(),
  campaignId: uuid("campaign_id")
    .references(() => campaigns.id, { onDelete: "cascade" })
    .notNull(),
  desktopImage: text("desktop_image").notNull(),
  mobileImage: text("mobile_image").notNull(),
  heading: varchar("heading", { length: 500 }).notNull(),
  subheading: text("subheading"),
  ctaText: varchar("cta_text", { length: 100 }),
  ctaUrl: varchar("cta_url", { length: 500 }),
  backgroundColor: varchar("background_color", { length: 20 }),
  sortOrder: integer("sort_order").default(0),
});

export const promotions = pgTable("promotions", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  rules: jsonb("rules").notNull(),
  countryCodes: jsonb("country_codes").$type<string[]>(),
  startsAt: timestamp("starts_at"),
  endsAt: timestamp("ends_at"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  countryCode: varchar("country_code", { length: 5 }),
  source: varchar("source", { length: 100 }),
  festivalSlug: varchar("festival_slug", { length: 100 }),
  isActive: boolean("is_active").default(true),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
});

export const analyticsEvents = pgTable(
  "analytics_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    eventName: varchar("event_name", { length: 100 }).notNull(),
    sessionId: varchar("session_id", { length: 255 }),
    userId: uuid("user_id"),
    countryCode: varchar("country_code", { length: 5 }),
    currency: varchar("currency", { length: 5 }),
    payload: jsonb("payload"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("analytics_event_name_idx").on(t.eventName), index("analytics_created_idx").on(t.createdAt)]
);
