CREATE TABLE IF NOT EXISTS "vehicles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(8) NOT NULL,
	"type" text NOT NULL,
	"brand" text DEFAULT '' NOT NULL,
	"model" text DEFAULT '' NOT NULL,
	"color" text DEFAULT '' NOT NULL,
	"year" integer DEFAULT 2024,
	"mass" numeric NOT NULL,
	"rental_rate" numeric NOT NULL,
	"license_type" varchar(1) NOT NULL,
	"available" boolean DEFAULT true NOT NULL,
	"popularity" integer DEFAULT 0 NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	CONSTRAINT "vehicles_id_unique" UNIQUE("id"),
	CONSTRAINT "vehicles_name_unique" UNIQUE("name")
);
