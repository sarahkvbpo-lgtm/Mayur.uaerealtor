import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const enquiries = sqliteTable("enquiries", {
  id: text("id").primaryKey(),
  service: text("service").notNull(),
  location: text("location").notNull(),
  propertyType: text("property_type").notNull(),
  budget: text("budget").notNull(),
  timeline: text("timeline").notNull(),
  message: text("message").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  contactMethod: text("contact_method").notNull(),
  consent: integer("consent", { mode: "boolean" }).notNull(),
  createdAt: text("created_at").notNull(),
});
