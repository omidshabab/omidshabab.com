import {
  pgTable,
  varchar,
  pgEnum,
} from "drizzle-orm/pg-core";

export const roleEnums = pgEnum("role", ["user", "admin", "manager"]);

export const users = pgTable("users", {
  id: varchar("id", {
    length: 15, // change this when using custom user ids
  })
    .primaryKey()
    .unique(),
  // other user attributes
  name: varchar("name", { length: 255 }),
  displayName: varchar("display_name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique(),
  username: varchar("username", { length: 255 }).unique(),
  phone: varchar("phone", { length: 15 }).unique(),
  image: varchar("image", { length: 255 }),
  role: roleEnums("role").notNull().default("user"),
  googleId: varchar("google_id", { length: 255 }),
});

export const passwords = pgTable("passwords", {
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
