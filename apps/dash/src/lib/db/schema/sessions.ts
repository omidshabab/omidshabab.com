import {pgTable, varchar, bigint} from "drizzle-orm/pg-core";
import {users} from "@/lib/db/schema/users";

export const sessions = pgTable("sessions", {
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