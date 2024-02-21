CREATE TABLE IF NOT EXISTS "customers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"cpf" varchar(11) NOT NULL,
	"birth_date" date NOT NULL,
	"license_type" varchar(1) NOT NULL,
	"gender" varchar NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	CONSTRAINT "customers_id_unique" UNIQUE("id"),
	CONSTRAINT "customers_cpf_unique" UNIQUE("cpf")
);
