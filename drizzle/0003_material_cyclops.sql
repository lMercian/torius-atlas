CREATE TABLE `brand_access_tokens` (
	`id` int AUTO_INCREMENT NOT NULL,
	`brandId` int NOT NULL,
	`token` varchar(255) NOT NULL,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`expiresAt` timestamp,
	CONSTRAINT `brand_access_tokens_id` PRIMARY KEY(`id`),
	CONSTRAINT `brand_access_tokens_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `brand_colors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`brandId` int NOT NULL,
	`colorName` varchar(100) NOT NULL,
	`colorCode` varchar(7),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `brand_colors_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `brand_sizes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`brandId` int NOT NULL,
	`size` varchar(50) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `brand_sizes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_variants` (
	`id` int AUTO_INCREMENT NOT NULL,
	`productId` int NOT NULL,
	`sizeId` int NOT NULL,
	`colorId` int NOT NULL,
	`sku` varchar(100),
	`stock` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `product_variants_id` PRIMARY KEY(`id`)
);
