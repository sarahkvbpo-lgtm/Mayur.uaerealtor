CREATE TABLE `enquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`service` text NOT NULL,
	`location` text NOT NULL,
	`property_type` text NOT NULL,
	`budget` text NOT NULL,
	`timeline` text NOT NULL,
	`message` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`contact_method` text NOT NULL,
	`consent` integer NOT NULL,
	`created_at` text NOT NULL
);
