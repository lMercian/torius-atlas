CREATE TABLE `product_videos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`productId` int NOT NULL,
	`videoUrl` text NOT NULL,
	`title` varchar(255),
	`description` text,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `product_videos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `product_videos` ADD CONSTRAINT `product_videos_productId_products_id_fk` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;