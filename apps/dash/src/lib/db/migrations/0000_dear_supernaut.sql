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
DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('user', 'admin', 'manager', 'editor');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "accounts" (
	"user_id" text NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"provider_account_id" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "accounts_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "books" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"title" varchar(150) NOT NULL,
	"desc" text NOT NULL,
	"image" varchar(500) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"published" boolean DEFAULT false,
	"user_id" varchar(256) NOT NULL,
	"locale" "locale" DEFAULT 'en' NOT NULL,
	"type" "type" DEFAULT 'free' NOT NULL,
	"tags" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "books_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "components" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"title" varchar(150) NOT NULL,
	"desc" text NOT NULL,
	"image" varchar(500) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"published" boolean DEFAULT false,
	"user_id" varchar(256) NOT NULL,
	"locale" "locale" DEFAULT 'en' NOT NULL,
	"type" "type" DEFAULT 'free' NOT NULL,
	"tags" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "components_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "courses" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"title" varchar(150) NOT NULL,
	"desc" text NOT NULL,
	"image" varchar(500) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"published" boolean DEFAULT false,
	"user_id" varchar(256) NOT NULL,
	"locale" "locale" DEFAULT 'en' NOT NULL,
	"type" "type" DEFAULT 'free' NOT NULL,
	"tags" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "courses_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "keys" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "podcasts" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"title" varchar(150) NOT NULL,
	"desc" text NOT NULL,
	"image" varchar(500) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"published" boolean DEFAULT false,
	"user_id" varchar(256) NOT NULL,
	"locale" "locale" DEFAULT 'en' NOT NULL,
	"type" "type" DEFAULT 'free' NOT NULL,
	"tags" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "podcasts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolios" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"title" varchar(150) NOT NULL,
	"desc" text NOT NULL,
	"image" varchar(500) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"published" boolean DEFAULT false,
	"user_id" varchar(256) NOT NULL,
	"locale" "locale" DEFAULT 'en' NOT NULL,
	"type" "type" DEFAULT 'free' NOT NULL,
	"tags" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "portfolios_slug_unique" UNIQUE("slug")
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
	"tags" text[] DEFAULT ARRAY[]::text[] NOT NULL,
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
CREATE TABLE IF NOT EXISTS "verification_tokens" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verification_tokens_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"display_name" varchar(255),
	"email" text,
	"email_verified" timestamp,
	"phone" varchar(15),
	"username" varchar(255),
	"image" text,
	"role" "role" DEFAULT 'user' NOT NULL,
	CONSTRAINT "users_phone_unique" UNIQUE("phone"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
