import {
  pgTable,
  bigint,
  varchar,
  pgEnum,
  timestamp,
  text,
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
  googleId: varchar("google_id", { length: 255 }),
  image: varchar("image", { length: 255 }),
  role: roleEnums("role").notNull().default("user"),
});

export const accounts = pgTable("accounts", {
  id: varchar("id", {
    length: 15, // change this when using custom user ids
  })
    .primaryKey()
    .unique(),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id),
  provider: varchar("provider").notNull(), // google, github
  providerUserId: varchar("provider_user_id").notNull(),
  accessToken: varchar("access_token").notNull(),
  refreshToken: varchar("refresh_token"),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }),
});

export const tokens = pgTable("tokens", {
  id: varchar("id", {
    length: 15, // change this when using custom user ids
  })
    .primaryKey()
    .unique(),
  userId: varchar("user_id", {
    length: 15,
  })
    .notNull()
    .references(() => users.id),
  code: varchar("code").notNull(),
  sentAt: timestamp("sent_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const keys = pgTable("passwords", {
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
