import { boolean, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const AIOutput = pgTable("AIOutput", {
  id: serial("id").primaryKey(),
  formData: varchar("formData").notNull(),
  aiResponse: text("aiResponse"),
  templateName: varchar("templateName").notNull(),
  templateSlug: varchar("templateSlug").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
});

export const UserSubscription = pgTable("UserSubscription", {
  id: serial("id").primaryKey(),
  email: varchar("email"),
  userName: varchar("userName"),
  status: boolean("status"),
  paymentId: varchar("paymentId"),
  joinDate: varchar("joinDate"),
});
