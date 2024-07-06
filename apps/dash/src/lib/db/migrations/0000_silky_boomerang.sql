DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('user', 'admin', 'manager');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "locale" AS ENUM('en', 'fa');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "type" AS ENUM('free', 'paid');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_key" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"hashed_password" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_session" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"user_id" varchar(15) NOT NULL,
	"active_expires" bigint NOT NULL,
	"idle_expires" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth_user" (
	"id" varchar(15) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255),
	"username" varchar(255),
	"phone" varchar(15),
	"role" "role" DEFAULT 'user' NOT NULL,
	CONSTRAINT "auth_user_id_unique" UNIQUE("id"),
	CONSTRAINT "auth_user_email_unique" UNIQUE("email"),
	CONSTRAINT "auth_user_username_unique" UNIQUE("username"),
	CONSTRAINT "auth_user_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"title" varchar(150) NOT NULL,
	"desc" text NOT NULL,
	"image" varchar(500) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"published" boolean DEFAULT false,
	"user_id" varchar(256) NOT NULL,
	"locale" "locale" DEFAULT 'en' NOT NULL,
	"type" "type" DEFAULT 'free' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscriptions" (
	"user_id" varchar(255),
	"stripe_customer_id" varchar(255),
	"stripe_subscription_id" varchar(255),
	"stripe_price_id" varchar(255),
	"stripe_current_period_end" timestamp,
	CONSTRAINT "subscriptions_user_id_stripe_customer_id_pk" PRIMARY KEY("user_id","stripe_customer_id"),
	CONSTRAINT "subscriptions_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "subscriptions_stripe_customer_id_unique" UNIQUE("stripe_customer_id"),
	CONSTRAINT "subscriptions_stripe_subscription_id_unique" UNIQUE("stripe_subscription_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_key" ADD CONSTRAINT "user_key_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_session" ADD CONSTRAINT "user_session_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
