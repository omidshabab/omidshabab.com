import {pgTable, timestamp, varchar} from "drizzle-orm/pg-core";
import {users} from "@/lib/db/schema/users";

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