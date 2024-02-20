CREATE TABLE `customers` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`cpf` text(11) NOT NULL,
	`birth_date` integer NOT NULL,
	`license_type` text(1) NOT NULL,
	`gender` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `customers_id_unique` ON `customers` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `customers_cpf_unique` ON `customers` (`cpf`);