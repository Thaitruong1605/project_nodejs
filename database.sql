-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.19-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.1.0.6116
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for project-nodejs
CREATE DATABASE IF NOT EXISTS `project-nodejs` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `project-nodejs`;

-- Dumping structure for table project-nodejs.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `o_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `o_date` date NOT NULL,
  `o_totalamount` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `o_address` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `o_isPaid` int(11) NOT NULL DEFAULT 0,
  `pmt_id` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`o_id`),
  KEY `FK_orders_users` (`username`),
  KEY `FK_orders_payments` (`pmt_id`),
  CONSTRAINT `FK_orders_payments` FOREIGN KEY (`pmt_id`) REFERENCES `payments` (`pmt_id`),
  CONSTRAINT `FK_orders_users` FOREIGN KEY (`username`) REFERENCES `users` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table project-nodejs.orders: ~25 rows (approximately)
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` (`o_id`, `username`, `o_date`, `o_totalamount`, `o_address`, `o_isPaid`, `pmt_id`) VALUES
	(29, 'admin', '2021-03-21', '120000000', 'Cần Thơ', 1, 1),
	(30, 'admin', '2021-03-22', '190000000', 'Vĩnh long', 1, 1),
	(31, 'admin', '2021-03-27', '190000000', 'Vĩnh long', 1, 1),
	(32, 'admin', '2021-03-29', '190000000', 'Hậu Giang', 1, 1),
	(33, 'admin', '2021-04-10', '80000000', 'Vĩnh long', 1, 1),
	(34, 'admin', '2021-04-15', '190000000', 'Vĩnh long', 1, 1),
	(35, 'admin', '2021-04-24', '190000000', 'Vĩnh long', 1, 1),
	(36, 'admin', '2021-05-31', '190000000', 'Vĩnh long', 1, 1),
	(37, 'admin', '2020-05-31', '190000000', 'Vĩnh long', 1, 1),
	(44, 'admin', '2021-05-31', '190000000', 'Vĩnh long', 1, 1),
	(45, 'admin', '2021-05-31', '190000000', 'Vĩnh long', 1, 1),
	(46, 'admin', '2021-05-31', '190000000', 'Vĩnh long', 1, 1),
	(51, 'admin', '2021-05-31', '190000000', 'Vĩnh long', 1, 1),
	(52, 'admin', '2021-05-31', '190000000', 'Vĩnh long', 1, 1),
	(53, 'admin', '2021-05-31', '190000000', 'Vĩnh long', 1, 1),
	(54, 'admin', '2021-05-31', '190000000', 'Vĩnh long', 1, 1),
	(55, 'admin', '2021-05-31', '280000000', 'Vĩnh long', 1, 1),
	(56, 'admin', '2021-05-31', '1150000000', 'Vĩnh long', 1, 1),
	(57, 'admin', '2021-06-01', '120000000', 'Vĩnh long', 1, 1),
	(58, 'admin', '2021-06-01', '190000000', 'Cái Răng, Cần Thơ', 1, 1),
	(59, 'admin', '2021-06-01', '80000000', 'Cái Răng, Cần Thơ', 1, 1),
	(60, 'admin', '2021-06-01', '40000000', 'Cái Răng, Cần Thơ', 1, 1),
	(61, 'user1', '2021-06-02', '5060000000', 'Cái Răng, Cần Thơ', 0, 2),
	(62, 'user1', '2021-06-03', '120000000', 'Cái Răng, Cần Thơ', 0, 2),
	(63, 'user2', '2021-06-03', '1450000000', 'Châu Thành A, Hậu Giang', 0, 3);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;

-- Dumping structure for table project-nodejs.order_details
CREATE TABLE IF NOT EXISTS `order_details` (
  `o_id` int(11) NOT NULL,
  `p_id` int(11) NOT NULL,
  `odp_price` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `odp_number` int(11) NOT NULL,
  PRIMARY KEY (`o_id`,`p_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table project-nodejs.order_details: ~47 rows (approximately)
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` (`o_id`, `p_id`, `odp_price`, `odp_number`) VALUES
	(29, 5, '80000000', 1),
	(30, 4, '40000000', 1),
	(30, 5, '80000000', 1),
	(30, 6, '70000000', 1),
	(32, 4, '40000000', 1),
	(32, 6, '70000000', 1),
	(33, 5, '80000000', 1),
	(34, 4, '40000000', 1),
	(34, 6, '70000000', 1),
	(35, 4, '40000000', 1),
	(35, 6, '70000000', 1),
	(39, 4, '40000000', 1),
	(39, 6, '70000000', 1),
	(40, 4, '40000000', 1),
	(40, 5, '80000000', 1),
	(40, 6, '70000000', 1),
	(48, 4, '40000000', 1),
	(48, 5, '80000000', 1),
	(48, 6, '70000000', 1),
	(49, 4, '40000000', 1),
	(49, 5, '80000000', 1),
	(49, 6, '70000000', 1),
	(50, 4, '40000000', 1),
	(50, 6, '70000000', 1),
	(51, 4, '40000000', 1),
	(51, 5, '80000000', 1),
	(51, 6, '70000000', 1),
	(52, 4, '40000000', 1),
	(52, 5, '80000000', 1),
	(52, 6, '70000000', 1),
	(53, 4, '40000000', 1),
	(53, 5, '80000000', 1),
	(53, 6, '70000000', 1),
	(54, 4, '40000000', 1),
	(54, 5, '80000000', 1),
	(54, 6, '70000000', 1),
	(55, 4, '40000000', 5),
	(55, 5, '80000000', 1),
	(56, 4, '40000000', 1),
	(56, 5, '80000000', 13),
	(56, 6, '70000000', 1),
	(58, 4, '40000000', 1),
	(58, 5, '80000000', 1),
	(58, 6, '70000000', 1),
	(59, 4, '40000000', 2),
	(60, 4, '40000000', 1),
	(61, 4, '40000000', 32),
	(61, 8, '90000000', 42),
	(62, 4, '40000000', 1),
	(62, 7, '80000000', 1),
	(63, 6, '70000000', 15),
	(63, 7, '80000000', 5);
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;

-- Dumping structure for table project-nodejs.payments
CREATE TABLE IF NOT EXISTS `payments` (
  `pmt_id` int(11) NOT NULL AUTO_INCREMENT,
  `pmt_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`pmt_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table project-nodejs.payments: ~2 rows (approximately)
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` (`pmt_id`, `pmt_name`) VALUES
	(1, 'Tiền mặt'),
	(2, 'Chuyển khoản'),
	(3, 'Ví điện tử');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;

-- Dumping structure for table project-nodejs.products
CREATE TABLE IF NOT EXISTS `products` (
  `p_id` int(11) NOT NULL AUTO_INCREMENT,
  `p_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `p_price` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `p_date` date NOT NULL,
  `p_number` int(11) NOT NULL,
  `p_description` text COLLATE utf8_unicode_ci NOT NULL,
  `s_id` int(11) NOT NULL,
  `t_id` int(11) NOT NULL,
  PRIMARY KEY (`p_id`),
  KEY `FK_products_types` (`t_id`),
  KEY `FK_products_sizes` (`s_id`),
  CONSTRAINT `FK_products_sizes` FOREIGN KEY (`s_id`) REFERENCES `sizes` (`s_id`),
  CONSTRAINT `FK_products_types` FOREIGN KEY (`t_id`) REFERENCES `types` (`t_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table project-nodejs.products: ~8 rows (approximately)
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` (`p_id`, `p_name`, `p_price`, `p_date`, `p_number`, `p_description`, `s_id`, `t_id`) VALUES
	(4, 'Epipremnum pinnatum-Dragon tail', '40000000', '2021-03-09', 50, ' Chậu 3 gốc', 1, 1),
	(5, 'Bàng Singapore ', '80000000', '2020-05-29', 10, 'cao 45cm, 3 ngọn', 1, 1),
	(6, 'Môn quan âm', '70000000', '2020-03-05', 20, '', 1, 1),
	(7, 'Hồng bụi Tố nữ đỏ cam', '80000000', '2020-05-31', 100, '', 1, 2),
	(8, 'Hồng bụi cắt cành', '90000000', '2021-05-28', 10, 'Màu vàng viền trắng, Beatric', 2, 2),
	(9, 'Hồng bán leo Soeur', '90000000', '2021-05-27', 20, 'Màu hồng melot', 1, 2),
	(10, 'Trầu bà lá nhung', '90000000', '2021-06-03', 20, 'Mô tả Trầu bà lá nhung', 1, 1),
	(11, 'homalomena rubescens ', '150000000', '2021-12-05', 20, 'Mô tả cho homalomena rubescens ', 3, 1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;

-- Dumping structure for table project-nodejs.product_images
CREATE TABLE IF NOT EXISTS `product_images` (
  `pi_id` int(11) NOT NULL AUTO_INCREMENT,
  `pi_path` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `p_id` int(11) NOT NULL,
  PRIMARY KEY (`pi_id`) USING BTREE,
  UNIQUE KEY `p_id` (`p_id`),
  CONSTRAINT `FK_product_image_products` FOREIGN KEY (`p_id`) REFERENCES `products` (`p_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table project-nodejs.product_images: ~8 rows (approximately)
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` (`pi_id`, `pi_path`, `p_id`) VALUES
	(14, '1622298717719-ID4.jpg', 4),
	(15, '1622298699351-ID5.jpg', 5),
	(16, '1622299101008-ID6.jpg', 6),
	(17, '1622556712016-ID7.jpg', 7),
	(18, '1622556722671-ID8.jpg', 8),
	(19, '1622556731995-ID9.jpg', 9),
	(20, '1622697280374-ID10.jpg', 10),
	(21, '1622697700185-ID11.jpg', 11);
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;

-- Dumping structure for table project-nodejs.sizes
CREATE TABLE IF NOT EXISTS `sizes` (
  `s_id` int(11) NOT NULL AUTO_INCREMENT,
  `s_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`s_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table project-nodejs.sizes: ~3 rows (approximately)
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` (`s_id`, `s_name`) VALUES
	(1, 'Nhỏ'),
	(2, 'Trung bình'),
	(3, 'Lớn');
/*!40000 ALTER TABLE `sizes` ENABLE KEYS */;

-- Dumping structure for table project-nodejs.types
CREATE TABLE IF NOT EXISTS `types` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT,
  `t_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`t_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table project-nodejs.types: ~2 rows (approximately)
/*!40000 ALTER TABLE `types` DISABLE KEYS */;
INSERT INTO `types` (`t_id`, `t_name`) VALUES
	(1, 'Cây kiểng'),
	(2, 'Hoa hồng');
/*!40000 ALTER TABLE `types` ENABLE KEYS */;

-- Dumping structure for table project-nodejs.users
CREATE TABLE IF NOT EXISTS `users` (
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `phoneNumber` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `birthday` date DEFAULT NULL,
  `isMale` int(1) NOT NULL,
  `is_admin` int(1) NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phoneNumber` (`phoneNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table project-nodejs.users: ~3 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`username`, `name`, `password`, `email`, `phoneNumber`, `address`, `birthday`, `isMale`, `is_admin`) VALUES
	('admin', 'Quản trị viên', '$2b$10$Wd5eZpSDsLdrG7lIcTGAveCLaJdKZZeEdYCQaMh2icuEQmFSoSVqm', 'admin@shop.com', '0123456789', 'Cần Thơ', '2020-01-01', 1, 1),
	('user1', 'Người dùng 1 updateed', '$2b$10$IrBnv4cfoWeRS3wP2EGfzOuvbS36LY36T9D7No.9HAFfsOqur05Nm', 'user11@gmail.com', '0706823212', 'Ninh Kiều, Cần Thơ', '1999-08-31', 0, 0),
	('user2', 'Người dùng 2', '$2b$10$U76OrqDs2KOnYh/Wl/PZcu6Uv9RBIGEDPGUymEm147L8Uek9P0rFe', 'user2@gmail.com', '0706823123', 'Châu Thành A, Hậu Giang', '1970-12-10', 0, 0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
