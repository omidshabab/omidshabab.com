import {pgTable, timestamp, varchar} from "drizzle-orm/pg-core";
import {users} from "@/lib/db/schema/users";

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