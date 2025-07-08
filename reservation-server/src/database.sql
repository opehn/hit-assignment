-- main.customers definition

CREATE TABLE `customers` (
  `isDeleted` tinyint NOT NULL DEFAULT '0',
  `createdDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `createdById` varchar(255) DEFAULT NULL,
  `updatedDateTime` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `updatedById` varchar(255) DEFAULT NULL,
  `deletedDateTime` timestamp NULL DEFAULT NULL,
  `deletedById` varchar(255) DEFAULT NULL,
  `id` varchar(36) NOT NULL,
  `email` varchar(255) NOT NULL COMMENT '이메일',
  `password` varchar(255) NOT NULL COMMENT '비밀번호',
  `name` varchar(255) NOT NULL COMMENT '이름',
  `isActive` tinyint NOT NULL DEFAULT '1' COMMENT '회원 활성 여부',
  `mobile` varchar(20) NOT NULL COMMENT '전화번호',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_76a96507e573f7b489a416e3c2` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='일반 회원 정보';

-- main.menu_categories definition

CREATE TABLE `menu_categories` (
  `isDeleted` tinyint NOT NULL DEFAULT '0',
  `createdDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `createdById` varchar(255) DEFAULT NULL,
  `updatedDateTime` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `updatedById` varchar(255) DEFAULT NULL,
  `deletedDateTime` timestamp NULL DEFAULT NULL,
  `deletedById` varchar(255) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT '메뉴 카테고리 이름',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='메뉴 카테고리';

-- main.menus definition

CREATE TABLE `menus` (
  `isDeleted` tinyint NOT NULL DEFAULT '0',
  `createdDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `createdById` varchar(255) DEFAULT NULL,
  `updatedDateTime` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `updatedById` varchar(255) DEFAULT NULL,
  `deletedDateTime` timestamp NULL DEFAULT NULL,
  `deletedById` varchar(255) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `menuCategoryId` int NOT NULL COMMENT '메뉴 카테고리 ID',
  `storeId` int NOT NULL COMMENT '식당 ID',
  `name` varchar(255) NOT NULL COMMENT '메뉴 이름',
  `price` int NOT NULL COMMENT '가격',
  `description` text NOT NULL COMMENT '메뉴 설명',
  PRIMARY KEY (`id`),
  KEY `FK_05661302de27328af97b2d25aa6` (`menuCategoryId`),
  KEY `FK_536db50c0b165a67020313d02f9` (`storeId`),
  KEY `idx_menu_search` (`isDeleted`,`name`,`price`),
  CONSTRAINT `FK_05661302de27328af97b2d25aa6` FOREIGN KEY (`menuCategoryId`) REFERENCES `menu_categories` (`id`),
  CONSTRAINT `FK_536db50c0b165a67020313d02f9` FOREIGN KEY (`storeId`) REFERENCES `stores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='식당 메뉴';

-- main.owners definition

CREATE TABLE `owners` (
  `isDeleted` tinyint NOT NULL DEFAULT '0',
  `createdDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `createdById` varchar(255) DEFAULT NULL,
  `updatedDateTime` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `updatedById` varchar(255) DEFAULT NULL,
  `deletedDateTime` timestamp NULL DEFAULT NULL,
  `deletedById` varchar(255) DEFAULT NULL,
  `id` varchar(36) NOT NULL,
  `email` varchar(255) NOT NULL COMMENT '이메일',
  `password` varchar(255) NOT NULL COMMENT '비밀번호',
  `name` varchar(255) NOT NULL COMMENT '이름',
  `isActive` tinyint NOT NULL DEFAULT '1' COMMENT '회원 활성 여부',
  `mobile` varchar(20) NOT NULL COMMENT '전화번호',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_8031f4f87de6cc40481b98fbc6` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='식당 주인 정보';

-- main.reservation_menus definition

CREATE TABLE `reservation_menus` (
  `isDeleted` tinyint NOT NULL DEFAULT '0',
  `createdDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `createdById` varchar(255) DEFAULT NULL,
  `updatedDateTime` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `updatedById` varchar(255) DEFAULT NULL,
  `deletedDateTime` timestamp NULL DEFAULT NULL,
  `deletedById` varchar(255) DEFAULT NULL,
  `reservationId` int NOT NULL COMMENT '예약 ID',
  `menuId` int NOT NULL COMMENT '메뉴 ID',
  `name` varchar(100) NOT NULL COMMENT '예약 당시 메뉴 이름',
  `price` int NOT NULL COMMENT '예약 당시 메뉴 가격',
  PRIMARY KEY (`reservationId`,`menuId`),
  KEY `FK_19e1887a192c73a3bcaf2b5c9e8` (`menuId`),
  CONSTRAINT `FK_052c1a3d3868f3bbb7d5afa88aa` FOREIGN KEY (`reservationId`) REFERENCES `reservations` (`id`),
  CONSTRAINT `FK_19e1887a192c73a3bcaf2b5c9e8` FOREIGN KEY (`menuId`) REFERENCES `menus` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='예약 메뉴 정보';

-- main.reservations definition

CREATE TABLE `reservations` (
  `isDeleted` tinyint NOT NULL DEFAULT '0',
  `createdDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `createdById` varchar(255) DEFAULT NULL,
  `updatedDateTime` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `updatedById` varchar(255) DEFAULT NULL,
  `deletedDateTime` timestamp NULL DEFAULT NULL,
  `deletedById` varchar(255) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `customerId` varchar(255) NOT NULL COMMENT '고객 ID',
  `storeId` int NOT NULL COMMENT '식당 ID',
  `mobile` varchar(20) NOT NULL COMMENT '예약자 번호',
  `date` varchar(20) NOT NULL COMMENT '예약 날짜 (YYYY-MM-DD)',
  `startTime` varchar(20) NOT NULL COMMENT '예약 시작 시간 (HH:MM)',
  `endTime` varchar(20) NOT NULL COMMENT '예약 종료 시간 (HH:MM)',
  `guestCount` int NOT NULL COMMENT '인원수',
  PRIMARY KEY (`id`),
  KEY `FK_487ec4ed757eed0d34c7ddee79b` (`customerId`),
  KEY `idx_reservation_conflict` (`storeId`,`date`,`isDeleted`,`startTime`,`endTime`),
  KEY `idx_reservation_search` (`date`,`guestCount`,`mobile`),
  CONSTRAINT `FK_487ec4ed757eed0d34c7ddee79b` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`),
  CONSTRAINT `FK_d9b06ac057c3631d8e08300adc4` FOREIGN KEY (`storeId`) REFERENCES `stores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='예약 정보';

-- main.stores definition

CREATE TABLE `stores` (
  `isDeleted` tinyint NOT NULL DEFAULT '0',
  `createdDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `createdById` varchar(255) DEFAULT NULL,
  `updatedDateTime` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `updatedById` varchar(255) DEFAULT NULL,
  `deletedDateTime` timestamp NULL DEFAULT NULL,
  `deletedById` varchar(255) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `ownerId` varchar(255) NOT NULL COMMENT '식당 주인 ID',
  `name` varchar(100) NOT NULL COMMENT '식당 이름',
  `address` varchar(255) NOT NULL COMMENT '주소',
  `startTime` varchar(20) NOT NULL COMMENT '운영 시작 시간 (HH:MM)',
  `endTime` varchar(20) NOT NULL COMMENT '운영 마감 시간 (HH:MM)',
  `mobile` varchar(20) NOT NULL COMMENT '전화번호',
  `description` text COMMENT '식당 설명',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_1524355991f71352ed12ee6ef7` (`ownerId`,`name`),
  CONSTRAINT `FK_a447ba082271c05997a61df26df` FOREIGN KEY (`ownerId`) REFERENCES `owners` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='식당 정보';