import { pgTable, varchar, pgEnum, text, timestamp } from "drizzle-orm/pg-core";

export const roleEnums = pgEnum("role", ["user", "admin", "manager", "editor"]);

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  displayName: varchar("display_name", { length: 255 }),
  email: text("email"),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  phone: varchar("phone", { length: 15 }).unique(),
  username: varchar("username", { length: 255 }).unique(),
  image: text("image"),
  role: roleEnums("role").notNull().default("user"),
});
