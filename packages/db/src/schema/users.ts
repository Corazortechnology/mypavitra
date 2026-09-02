import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";

export const traditionEnum = pgEnum("tradition", ["hindu", "jain", "universal"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  passwordHash: text("password_hash"),
  role: varchar("role", { length: 50 }).default("customer").notNull(),
  preferredCountry: varchar("preferred_country", { length: 5 }).default("IN"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const addresses = pgTable(
  "addresses",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
    label: varchar("label", { length: 100 }),
    name: varchar("name", { length: 255 }).notNull(),
    line1: varchar("line1", { length: 500 }).notNull(),
    line2: varchar("line2", { length: 500 }),
    city: varchar("city", { length: 100 }).notNull(),
    state: varchar("state", { length: 100 }),
    postalCode: varchar("postal_code", { length: 20 }).notNull(),
    country: varchar("country", { length: 5 }).notNull(),
    phone: varchar("phone", { length: 20 }),
    isDefault: boolean("is_default").default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("addresses_user_idx").on(t.userId)]
);
