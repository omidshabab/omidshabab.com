ALTER TABLE "user_key" RENAME TO "passwords";--> statement-breakpoint
ALTER TABLE "user_session" RENAME TO "sessions";--> statement-breakpoint
ALTER TABLE "passwords" DROP CONSTRAINT "user_key_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "sessions" DROP CONSTRAINT "user_session_user_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "passwords" ADD CONSTRAINT "passwords_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
