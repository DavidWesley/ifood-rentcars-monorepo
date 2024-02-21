ALTER TABLE "vehicles" ALTER COLUMN "year" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "vehicles" ALTER COLUMN "year" SET NOT NULL;