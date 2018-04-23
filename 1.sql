/*
SQLyog Community v12.3.2 (64 bit)
MySQL - 5.6.26 : Database - project
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`project` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `project`;

/*Table structure for table `auth` */

DROP TABLE IF EXISTS `auth`;

CREATE TABLE `auth` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user` varchar(100) NOT NULL,
  `page` int(10) NOT NULL,
  `r` int(1) DEFAULT '1',
  `w` int(1) DEFAULT '1',
  `d` int(1) DEFAULT '1',
  `status` int(1) DEFAULT '1',
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `auth` */

/*Table structure for table `customer` */

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `type` int(10) DEFAULT NULL,
  `address` varchar(300) DEFAULT NULL,
  `contact` varchar(30) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `profileimage` varchar(30) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

/*Data for the table `customer` */

insert  into `customer`(`id`,`name`,`type`,`address`,`contact`,`email`,`phone`,`profileimage`,`status`,`created_at`) values 
(15,'Bader Alshehri',38,'Tahlia Street','123','coolherobader@gmail.com','123','3627ce4jg1lp1rr',1,'2018-04-16 05:09:02'),
(16,'Bryan',39,'Test','Test','test@admin.com','123','3627ct0jg3h78zn',1,'2018-04-17 12:38:45'),
(17,'Terd',39,'sdf','sdf','sdf@sdsdf','sdf','3627ct0jg3h7k5y',1,'2018-04-17 12:38:59');

/*Table structure for table `department` */

DROP TABLE IF EXISTS `department`;

CREATE TABLE `department` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `factory` int(10) NOT NULL,
  `name` varchar(20) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

/*Data for the table `department` */

insert  into `department`(`id`,`factory`,`name`,`status`,`created_at`) values 
(29,22,'Department1',1,'2018-04-16 04:56:32'),
(30,22,'Department2',1,'2018-04-16 04:56:36');

/*Table structure for table `fabric` */

DROP TABLE IF EXISTS `fabric`;

CREATE TABLE `fabric` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `code` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `fabric` */

insert  into `fabric`(`id`,`code`,`name`,`status`,`create_at`) values 
(1,'c1','Code1',1,'2018-04-17 19:08:40'),
(2,'c2','Code2',1,'2018-04-17 19:08:47');

/*Table structure for table `factory` */

DROP TABLE IF EXISTS `factory`;

CREATE TABLE `factory` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `status` smallint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

/*Data for the table `factory` */

insert  into `factory`(`id`,`name`,`status`,`created_at`) values 
(22,'Factory1',1,'2018-04-16 04:56:18'),
(23,'Factory2',1,'2018-04-16 04:56:22');

/*Table structure for table `finishmaterialgroup` */

DROP TABLE IF EXISTS `finishmaterialgroup`;

CREATE TABLE `finishmaterialgroup` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `code` varchar(30) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `customer` int(10) DEFAULT NULL,
  `finishmaterial1` int(10) DEFAULT NULL,
  `finishmaterial2` int(10) DEFAULT NULL,
  `finishmaterial3` int(10) DEFAULT NULL,
  `finishmaterial4` int(10) DEFAULT NULL,
  `finishmaterial5` int(10) DEFAULT NULL,
  `finishmaterial6` int(10) DEFAULT NULL,
  `finishmaterial7` int(10) DEFAULT NULL,
  `finishmaterial8` int(10) DEFAULT NULL,
  `finishmaterial9` int(10) DEFAULT NULL,
  `finishmaterial10` int(10) DEFAULT NULL,
  `status` smallint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `finishmaterialgroup` */

insert  into `finishmaterialgroup`(`id`,`code`,`name`,`customer`,`finishmaterial1`,`finishmaterial2`,`finishmaterial3`,`finishmaterial4`,`finishmaterial5`,`finishmaterial6`,`finishmaterial7`,`finishmaterial8`,`finishmaterial9`,`finishmaterial10`,`status`,`created_at`) values 
(1,'f1','f1',16,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,'2018-04-17 13:03:41'),
(2,'f2','f2',16,9,9,-1,-1,-1,-1,-1,-1,-1,-1,1,'2018-04-17 13:03:48');

/*Table structure for table `follower` */

DROP TABLE IF EXISTS `follower`;

CREATE TABLE `follower` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `followingid` int(100) DEFAULT NULL,
  `following` varchar(100) DEFAULT NULL,
  `follower` varchar(100) DEFAULT NULL,
  `followername` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

/*Data for the table `follower` */

insert  into `follower`(`id`,`followingid`,`following`,`follower`,`followername`) values 
(8,16,'test@admin.com','bravedragon623@yandex.com','Test Test'),
(10,16,'test@admin.com','coolherobader@gmail.com','Bader Alshehri'),
(11,16,'test@admin.com','bryancho31@gmail.com','Bryan Cho');

/*Table structure for table `line` */

DROP TABLE IF EXISTS `line`;

CREATE TABLE `line` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `factory` int(10) NOT NULL,
  `department` int(10) NOT NULL,
  `name` varchar(20) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `line` */

/*Table structure for table `orderdetail` */

DROP TABLE IF EXISTS `orderdetail`;

CREATE TABLE `orderdetail` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `orderid` int(10) DEFAULT NULL,
  `style` varchar(30) DEFAULT NULL,
  `po` varchar(30) DEFAULT NULL,
  `shipdate` varchar(30) DEFAULT NULL,
  `color` varchar(30) DEFAULT NULL,
  `colorname` varchar(30) DEFAULT NULL,
  `s1` float DEFAULT NULL,
  `s2` float DEFAULT NULL,
  `s3` float DEFAULT NULL,
  `s4` float DEFAULT NULL,
  `s5` float DEFAULT NULL,
  `s6` float DEFAULT NULL,
  `s7` float DEFAULT NULL,
  `s8` float DEFAULT NULL,
  `s9` float DEFAULT NULL,
  `s10` float DEFAULT NULL,
  `body` varchar(30) DEFAULT NULL,
  `trim` varchar(30) DEFAULT NULL,
  `priority` varchar(30) DEFAULT NULL,
  `priorityname` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `orderdetail` */

insert  into `orderdetail`(`id`,`orderid`,`style`,`po`,`shipdate`,`color`,`colorname`,`s1`,`s2`,`s3`,`s4`,`s5`,`s6`,`s7`,`s8`,`s9`,`s10`,`body`,`trim`,`priority`,`priorityname`) values 
(1,1,'s-123-123','po-0001','2018-04-21','c1','Red',10,5,5,0,0,0,0,0,0,0,'10','10','c3','High');

/*Table structure for table `orderfabric` */

DROP TABLE IF EXISTS `orderfabric`;

CREATE TABLE `orderfabric` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `orderid` int(10) DEFAULT NULL,
  `yarncode` varchar(30) DEFAULT NULL,
  `yarncodename` varchar(30) DEFAULT NULL,
  `fabrictypecode` varchar(30) DEFAULT NULL,
  `fabrictypecodename` varchar(30) DEFAULT NULL,
  `fabriccode` varchar(30) DEFAULT NULL,
  `fabriccodename` varchar(30) DEFAULT NULL,
  `width` varchar(30) DEFAULT NULL,
  `weight` varchar(30) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

/*Data for the table `orderfabric` */

insert  into `orderfabric`(`id`,`orderid`,`yarncode`,`yarncodename`,`fabrictypecode`,`fabrictypecodename`,`fabriccode`,`fabriccodename`,`width`,`weight`,`created_at`) values 
(8,7,'c1','Code1','c1','Fabric Type Code','c1','Code1','12','32','2018-04-18 10:11:47'),
(9,7,'c1','Code1','c3','Fabric Type Code3','c1','Code1','1234','123','2018-04-18 10:12:51'),
(10,12,'-1','Not Selected','-1','Not Selected','-1','Not Selected','12','32','2018-04-18 14:16:28'),
(11,13,'c1','Code1','c1','Fabric Type Code','c2','Code2','32','123.435','2018-04-18 17:04:33');

/*Table structure for table `orders` */

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `handler` varchar(100) NOT NULL,
  `handlername` varchar(100) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `buyer` varchar(100) NOT NULL,
  `buyername` varchar(100) DEFAULT NULL,
  `style` varchar(100) NOT NULL,
  `product` varchar(100) NOT NULL,
  `sizegroup` varchar(30) DEFAULT NULL,
  `sizegroupname` varchar(30) DEFAULT NULL,
  `productgroup` varchar(30) DEFAULT NULL,
  `productgroupname` varchar(30) DEFAULT NULL,
  `finishgroup` varchar(30) DEFAULT NULL,
  `finishgroupname` varchar(30) DEFAULT NULL,
  `season` varchar(30) DEFAULT NULL,
  `quantity` varchar(30) DEFAULT NULL,
  `amount` varchar(30) DEFAULT NULL,
  `files` varchar(300) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `orders` */

insert  into `orders`(`id`,`date`,`handler`,`handlername`,`name`,`buyer`,`buyername`,`style`,`product`,`sizegroup`,`sizegroupname`,`productgroup`,`productgroupname`,`finishgroup`,`finishgroupname`,`season`,`quantity`,`amount`,`files`,`created_at`) values 
(1,'2018-04-21 03:00:00','6be5206b-d03a-4f60-b3dc-9eb0761322c1','Bader Alshehri','o-123-123','16','Bryan','s-123-123','p-123-123','1','s1','1','p1','1','f1','123','123','123','3627e7ojg96r653.jpg','2018-04-21 12:32:27');

/*Table structure for table `other` */

DROP TABLE IF EXISTS `other`;

CREATE TABLE `other` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `code` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `type1` varchar(30) DEFAULT NULL,
  `type2` varchar(30) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;

/*Data for the table `other` */

insert  into `other`(`id`,`code`,`name`,`type1`,`type2`,`status`,`created_at`) values 
(38,'c1','Seller','Customer Type','c1',1,'2018-04-16 05:08:21'),
(39,'c2','Buyer','Customer Type','c2',1,'2018-04-16 05:08:32'),
(40,'c1','XL','Size','c1',1,'2018-04-16 05:10:01'),
(41,'c2','L','Size','c2',1,'2018-04-17 12:40:35'),
(42,'c3','XXL','Size','c3',1,'2018-04-17 12:40:56'),
(43,'c1','p1','Product Material','c1',1,'2018-04-17 12:41:27'),
(44,'c2','p2','Product Material','p2',1,'2018-04-17 12:41:50'),
(45,'c1','f1','Finish Material','f1',1,'2018-04-17 12:42:10'),
(46,'c2','f2','Finish Material','f2',1,'2018-04-17 12:42:24'),
(47,'c1','Fabric Type Code','Fabric Type','type2',1,'2018-04-17 18:46:10'),
(48,'c2','Fabric Type Code2','Fabric Type','c2',1,'2018-04-17 18:46:25'),
(49,'c3','Fabric Type Code3','Fabric Type','c3',1,'2018-04-17 18:46:42'),
(50,'c1','Low','Priority','low',1,'2018-04-18 01:24:23'),
(51,'c2','Normal','Priority','Normal',0,'2018-04-18 01:24:38'),
(52,'c3','High','Priority','High',1,'2018-04-18 01:24:50'),
(53,'c1','Red','Color','Red',1,'2018-04-18 01:25:28'),
(54,'c2','Yellow','Color','c2',1,'2018-04-18 01:25:40'),
(55,'c3','Green','Color','c3',1,'2018-04-18 01:25:51');

/*Table structure for table `productmaterialgroup` */

DROP TABLE IF EXISTS `productmaterialgroup`;

CREATE TABLE `productmaterialgroup` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `code` varchar(30) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `customer` int(10) DEFAULT NULL,
  `productmaterial1` int(10) DEFAULT NULL,
  `productmaterial2` int(10) DEFAULT NULL,
  `productmaterial3` int(10) DEFAULT NULL,
  `productmaterial4` int(10) DEFAULT NULL,
  `productmaterial5` int(10) DEFAULT NULL,
  `productmaterial6` int(10) DEFAULT NULL,
  `productmaterial7` int(10) DEFAULT NULL,
  `productmaterial8` int(10) DEFAULT NULL,
  `productmaterial9` int(10) DEFAULT NULL,
  `productmaterial10` int(10) DEFAULT NULL,
  `status` smallint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `productmaterialgroup` */

insert  into `productmaterialgroup`(`id`,`code`,`name`,`customer`,`productmaterial1`,`productmaterial2`,`productmaterial3`,`productmaterial4`,`productmaterial5`,`productmaterial6`,`productmaterial7`,`productmaterial8`,`productmaterial9`,`productmaterial10`,`status`,`created_at`) values 
(1,'p1','p1',16,8,11,-1,-1,-1,-1,-1,-1,-1,-1,1,'2018-04-17 13:03:27'),
(2,'p2','p2',16,8,11,12,12,-1,-1,-1,-1,-1,-1,1,'2018-04-17 13:03:33');

/*Table structure for table `resettoken` */

DROP TABLE IF EXISTS `resettoken`;

CREATE TABLE `resettoken` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userid` varchar(300) DEFAULT NULL,
  `token` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `resettoken` */

/*Table structure for table `sizegroup` */

DROP TABLE IF EXISTS `sizegroup`;

CREATE TABLE `sizegroup` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `code` varchar(30) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `customer` int(10) DEFAULT NULL,
  `size1` int(10) DEFAULT NULL,
  `size2` int(10) DEFAULT NULL,
  `size3` int(10) DEFAULT NULL,
  `size4` int(10) DEFAULT NULL,
  `size5` int(10) DEFAULT NULL,
  `size6` int(10) DEFAULT NULL,
  `size7` int(10) DEFAULT NULL,
  `size8` int(10) DEFAULT NULL,
  `size9` int(10) DEFAULT NULL,
  `size10` int(10) DEFAULT NULL,
  `status` smallint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `sizegroup` */

insert  into `sizegroup`(`id`,`code`,`name`,`customer`,`size1`,`size2`,`size3`,`size4`,`size5`,`size6`,`size7`,`size8`,`size9`,`size10`,`status`,`created_at`) values 
(1,'s1','s1',16,40,41,42,-1,-1,-1,-1,-1,-1,-1,1,'2018-04-17 13:03:02'),
(2,'s2','s2',16,40,41,-1,-1,-1,-1,-1,-1,-1,-1,1,'2018-04-17 13:03:11'),
(3,'s3','s3',17,40,41,-1,-1,-1,-1,-1,-1,-1,-1,1,'2018-04-17 13:04:45');

/*Table structure for table `submaterial` */

DROP TABLE IF EXISTS `submaterial`;

CREATE TABLE `submaterial` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `code` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `type1` varchar(30) DEFAULT NULL,
  `type2` varchar(30) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

/*Data for the table `submaterial` */

insert  into `submaterial`(`id`,`code`,`name`,`type1`,`type2`,`status`,`created_at`) values 
(8,'c1','c1','Product Material','c1',0,'2018-04-16 05:02:36'),
(9,'c2','c2','Finish Material','c2',0,'2018-04-16 05:02:51'),
(10,'c3','c3','Others','c3',0,'2018-04-16 05:03:38'),
(11,'c4','c4','Product Material','c4',0,'2018-04-16 05:04:16'),
(12,'c5','c5','Product Material','c5',0,'2018-04-16 05:06:51');

/*Table structure for table `token` */

DROP TABLE IF EXISTS `token`;

CREATE TABLE `token` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userid` varchar(300) DEFAULT NULL,
  `token` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `token` */

insert  into `token`(`id`,`userid`,`token`) values 
(1,'6be5206b-d03a-4f60-b3dc-9eb076','$2a$08$s63eh/mfMKztERGpy/mWPO8'),
(2,'6e6eefc3-eaa6-4258-8aeb-f218e1','$2a$08$.y1t5XaiPIuBYebln5Htnu4'),
(3,'b452a2e8-3a28-4f9c-b60a-e9f3b6','$2a$08$3er9B3zWrES98PgnxvZ11.t');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` varchar(100) NOT NULL,
  `email` varchar(30) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `firstname` varchar(20) DEFAULT NULL,
  `lastname` varchar(20) DEFAULT NULL,
  `factory` int(10) DEFAULT NULL,
  `department` int(10) DEFAULT NULL,
  `line` int(10) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `position` int(10) DEFAULT NULL,
  `type` int(1) DEFAULT '1',
  `status` tinyint(1) DEFAULT '1',
  `active` tinyint(1) DEFAULT '0',
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `users` */

insert  into `users`(`id`,`email`,`password`,`firstname`,`lastname`,`factory`,`department`,`line`,`phone`,`position`,`type`,`status`,`active`,`create_at`) values 
('1e41e4dc-a17c-40cb-962d-210d3447177c','bryancho31@gmail.com','$2a$08$/EB8FLWYv0JqiGOrlZAoX.HrXrMe/jhloeLrxA2uhPWnurS3SjvMu','Bryan','Cho',22,29,-1,'asdf',-1,0,1,0,'2018-04-17 12:39:54'),
('6be5206b-d03a-4f60-b3dc-9eb0761322c1','coolherobader@gmail.com','$2a$08$7g0Jl/u3DJtrKQq30Q13ouSD35R7g/EaCGyqckmRi4ZtBjkxr97MK','Bader','Alshehri',-1,-1,-1,'12345',-1,1,1,1,'2018-04-16 05:15:08'),
('6e6eefc3-eaa6-4258-8aeb-f218e1585f19','bravedragon623@yandex.com','$2a$08$yo6o6f/dRNkwNS8W/UXh9erv2b60HngoEFy9DBCRDlCdZkwW9rcqS','Test','Test',22,29,-1,'12345',-1,1,1,1,'2018-04-18 11:53:35'),
('729f5b0e-a136-419f-a509-168029ed66f3','tehd@hdf.g','$2a$08$yKVDeSgtmyA5tT.RrkuW1eA12.1spGQXMzLLdVlxDkf/r7df5ugmu','Tesr','Tds',22,29,-1,'1231',-1,1,1,0,'2018-04-17 12:39:36'),
('b452a2e8-3a28-4f9c-b60a-e9f3b60d28ad','monitor@admin.com','$2a$08$KsN1us59mp.r4LOr.DBaxu5zInQeUPVR68NJjnZVZojeNLrkyeI9e','Bader','Alshehri',22,29,-1,'12345',-1,0,1,1,'2018-04-16 04:42:21');

/*Table structure for table `yarn` */

DROP TABLE IF EXISTS `yarn`;

CREATE TABLE `yarn` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `code` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `yarn` */

insert  into `yarn`(`id`,`code`,`name`,`status`,`create_at`) values 
(1,'c1','Code1',1,'2018-04-17 19:08:23'),
(2,'c2','Code2',1,'2018-04-17 19:08:27');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
