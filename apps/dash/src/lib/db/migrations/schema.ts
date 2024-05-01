import { pgTable, varchar, foreignKey, bigint, text, boolean, timestamp, primaryKey, unique } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const authUser = pgTable("auth_user", {
	id: varchar("id", { length: 15 }).primaryKey().notNull(),
	name: varchar("name", { length: 255 }),
	email: varchar("email", { length: 255 }),
	username: varchar("username", { length: 255 }),
});

export const userKey = pgTable("user_key", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	userId: varchar("user_id", { length: 15 }).notNull().references(() => authUser.id),
	hashedPassword: varchar("hashed_password", { length: 255 }),
});

export const userSession = pgTable("user_session", {
	id: varchar("id", { length: 128 }).primaryKey().notNull(),
	userId: varchar("user_id", { length: 15 }).notNull().references(() => authUser.id),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	activeExpires: bigint("active_expires", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	idleExpires: bigint("idle_expires", { mode: "number" }).notNull(),
});

export const posts = pgTable("posts", {
	id: varchar("id", { length: 191 }).primaryKey().notNull(),
	title: varchar("title").notNull(),
	desc: text("desc").notNull(),
	published: boolean("published").default(false).notNull(),
	userId: varchar("user_id", { length: 256 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	image: varchar("image").default(''::text).notNull(),
});

export const subscriptions = pgTable("subscriptions", {
	userId: varchar("user_id", { length: 255 }).notNull(),
	stripeCustomerId: varchar("stripe_customer_id", { length: 255 }).notNull(),
	stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
	stripePriceId: varchar("stripe_price_id", { length: 255 }),
	stripeCurrentPeriodEnd: timestamp("stripe_current_period_end", { mode: 'string' }),
},
(table) => {
	return {
		subscriptionsUserIdStripeCustomerIdPk: primaryKey({ columns: [table.userId, table.stripeCustomerId], name: "subscriptions_user_id_stripe_customer_id_pk"})
		subscriptionsUserIdUnique: unique("subscriptions_user_id_unique").on(table.userId),
		subscriptionsStripeCustomerIdUnique: unique("subscriptions_stripe_customer_id_unique").on(table.stripeCustomerId),
		subscriptionsStripeSubscriptionIdUnique: unique("subscriptions_stripe_subscription_id_unique").on(table.stripeSubscriptionId),
	}
});