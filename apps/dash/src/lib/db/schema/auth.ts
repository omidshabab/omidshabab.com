import { pgTable, bigint, varchar, pgEnum } from "drizzle-orm/pg-core";

export const roleEnums = pgEnum("role", ["user", "admin", "manager"]);

export const users = pgTable("users", {
  id: varchar("id", {
    length: 15, // change this when using custom user ids
  })
    .primaryKey()
    .unique(),
  // other user attributes
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique(),
  username: varchar("username", { length: 255 }).unique(),
  phone: varchar("phone", { length: 15 }).unique(),
  role: roleEnums("role").notNull().default("user"),
});

export const sessions = pgTable("user_session", {
  id: varchar("id", {
    length: 128,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  })
    .notNull()
    .references(() => users.id),
  activeExpires: bigint("active_expires", {
    mode: "number",
  }).notNull(),
  idleExpires: bigint("idle_expires", {
    mode: "number",
  }).notNull(),
});

export const keys = pgTable("user_key", {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  })
    .notNull()
    .references(() => users.id),
  hashedPassword: varchar("hashed_password", {
    length: 255,
  }),
});
