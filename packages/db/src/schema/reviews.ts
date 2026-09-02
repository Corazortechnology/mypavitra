import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  index,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { products } from "./catalog";
import { orders } from "./commerce";

export const reviews = pgTable(
  "reviews",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    productId: uuid("product_id")
      .references(() => products.id, { onDelete: "cascade" })
      .notNull(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    orderId: uuid("order_id").references(() => orders.id, { onDelete: "set null" }),
    rating: integer("rating").notNull(),
    title: varchar("title", { length: 255 }),
    body: text("body"),
    countryCode: varchar("country_code", { length: 5 }),
    isVerifiedPurchase: boolean("is_verified_purchase").default(false),
    status: varchar("status", { length: 20 }).default("pending"),
    helpfulCount: integer("helpful_count").default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [
    index("reviews_product_idx").on(t.productId),
    index("reviews_status_idx").on(t.status),
  ]
);

export const reviewImages = pgTable("review_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  reviewId: uuid("review_id")
    .references(() => reviews.id, { onDelete: "cascade" })
    .notNull(),
  url: text("url").notNull(),
  sortOrder: integer("sort_order").default(0),
});

export const reviewVotes = pgTable("review_votes", {
  id: uuid("id").defaultRandom().primaryKey(),
  reviewId: uuid("review_id")
    .references(() => reviews.id, { onDelete: "cascade" })
    .notNull(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  sessionId: varchar("session_id", { length: 255 }),
  isHelpful: boolean("is_helpful").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
