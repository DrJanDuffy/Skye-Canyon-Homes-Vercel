import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  address: text("address").notNull(),
  price: integer("price").notNull(),
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: text("bathrooms").notNull(),
  sqft: integer("sqft").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  status: text("status").notNull().default("active"),
  featured: boolean("featured").default(false),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  timeframe: text("timeframe"),
  priceRange: text("price_range"),
  message: text("message"),
  source: text("source").notNull().default("website"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const marketStats = pgTable("market_stats", {
  id: serial("id").primaryKey(),
  medianPrice: text("median_price").notNull(),
  daysOnMarket: integer("days_on_market").notNull(),
  homesSold: integer("homes_sold").notNull(),
  activeListings: integer("active_listings").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});

export const insertMarketStatsSchema = createInsertSchema(marketStats).omit({
  id: true,
  updatedAt: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type MarketStats = typeof marketStats.$inferSelect;
export type InsertMarketStats = z.infer<typeof insertMarketStatsSchema>;
