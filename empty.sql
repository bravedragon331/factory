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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

/*Data for the table `customer` */

/*Table structure for table `cut` */

DROP TABLE IF EXISTS `cut`;

CREATE TABLE `cut` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `orderid` int(10) DEFAULT NULL,
  `po` int(10) DEFAULT NULL,
  `color` varchar(30) DEFAULT NULL,
  `lote` varchar(30) DEFAULT NULL,
  `yds` varchar(30) DEFAULT NULL,
  `cutdate` varchar(30) DEFAULT NULL,
  `cutord` varchar(30) DEFAULT NULL,
  `size1` varchar(30) DEFAULT NULL,
  `size2` varchar(30) DEFAULT NULL,
  `size3` varchar(30) DEFAULT NULL,
  `size4` varchar(30) DEFAULT NULL,
  `size5` varchar(30) DEFAULT NULL,
  `size6` varchar(30) DEFAULT NULL,
  `size7` varchar(30) DEFAULT NULL,
  `size8` varchar(30) DEFAULT NULL,
  `size9` varchar(30) DEFAULT NULL,
  `size10` varchar(30) DEFAULT NULL,
  `envio` varchar(30) DEFAULT NULL,
  `lienzos` varchar(30) DEFAULT NULL,
  `ydsetique` varchar(30) DEFAULT NULL,
  `malo` varchar(30) DEFAULT NULL,
  `faltante` varchar(30) DEFAULT NULL,
  `ydsused` varchar(30) DEFAULT NULL,
  `bies` varchar(30) DEFAULT NULL,
  `total` varchar(30) DEFAULT NULL,
  `qtyrollo` varchar(30) DEFAULT NULL,
  `tendedor` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `cut` */

/*Table structure for table `department` */

DROP TABLE IF EXISTS `department`;

CREATE TABLE `department` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `factory` int(10) NOT NULL,
  `name` varchar(20) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

/*Data for the table `department` */

/*Table structure for table `fabric` */

DROP TABLE IF EXISTS `fabric`;

CREATE TABLE `fabric` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `code` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `fabric` */

/*Table structure for table `fabricin` */

DROP TABLE IF EXISTS `fabricin`;

CREATE TABLE `fabricin` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `po` int(10) DEFAULT NULL,
  `color` varchar(30) DEFAULT NULL,
  `fabrictype` int(10) DEFAULT NULL,
  `fabric` int(10) DEFAULT NULL,
  `rcvd` varchar(30) DEFAULT NULL,
  `kg` float DEFAULT NULL,
  `yds` float DEFAULT NULL,
  `roll` float DEFAULT NULL,
  `lote` varchar(30) DEFAULT NULL,
  `rack` varchar(30) DEFAULT NULL,
  `date` varchar(30) DEFAULT NULL,
  `customer` int(10) DEFAULT NULL,
  `rib` varchar(30) DEFAULT NULL,
  `rechazo` varchar(30) DEFAULT NULL,
  `ret` varchar(30) DEFAULT NULL,
  `bad` varchar(30) DEFAULT NULL,
  `note` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

/*Data for the table `fabricin` */

/*Table structure for table `fabricout` */

DROP TABLE IF EXISTS `fabricout`;

CREATE TABLE `fabricout` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `po` int(10) DEFAULT NULL,
  `color` varchar(30) DEFAULT NULL,
  `fabrictype` int(10) DEFAULT NULL,
  `fabric` int(10) DEFAULT NULL,
  `rcvd` varchar(30) DEFAULT NULL,
  `kg` float DEFAULT NULL,
  `yds` float DEFAULT NULL,
  `roll` float DEFAULT NULL,
  `date` varchar(30) DEFAULT NULL,
  `customer` int(10) DEFAULT NULL,
  `rib` varchar(30) DEFAULT NULL,
  `rechazo` varchar(30) DEFAULT NULL,
  `ret` varchar(30) DEFAULT NULL,
  `bad` varchar(30) DEFAULT NULL,
  `note` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `fabricout` */

/*Table structure for table `factory` */

DROP TABLE IF EXISTS `factory`;

CREATE TABLE `factory` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `status` smallint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

/*Data for the table `factory` */

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `finishmaterialgroup` */

/*Table structure for table `follower` */

DROP TABLE IF EXISTS `follower`;

CREATE TABLE `follower` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `followingid` int(100) DEFAULT NULL,
  `following` varchar(100) DEFAULT NULL,
  `follower` varchar(100) DEFAULT NULL,
  `followername` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

/*Data for the table `follower` */

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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `line` */

/*Table structure for table `materialin` */

DROP TABLE IF EXISTS `materialin`;

CREATE TABLE `materialin` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `po` varchar(30) DEFAULT NULL,
  `material` int(10) DEFAULT NULL,
  `materialtype` tinyint(1) DEFAULT NULL,
  `size` varchar(30) DEFAULT NULL,
  `ordernumber` varchar(10) DEFAULT NULL,
  `loss` varchar(10) DEFAULT NULL,
  `need` varchar(10) DEFAULT NULL,
  `rcvd` varchar(30) DEFAULT NULL,
  `date` varchar(30) DEFAULT NULL,
  `customer` int(10) DEFAULT NULL,
  `invoice` varchar(30) DEFAULT NULL,
  `quantity` int(30) DEFAULT NULL,
  `note` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `materialin` */

/*Table structure for table `materialout` */

DROP TABLE IF EXISTS `materialout`;

CREATE TABLE `materialout` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `po` varchar(30) DEFAULT NULL,
  `material` int(10) DEFAULT NULL,
  `materialtype` tinyint(1) DEFAULT NULL,
  `size` varchar(30) DEFAULT NULL,
  `ordernumber` varchar(10) DEFAULT NULL,
  `loss` varchar(10) DEFAULT NULL,
  `need` varchar(10) DEFAULT NULL,
  `rcvd` varchar(30) DEFAULT NULL,
  `date` varchar(30) DEFAULT NULL,
  `department` int(10) DEFAULT NULL,
  `invoice` varchar(30) DEFAULT NULL,
  `quantity` int(30) DEFAULT NULL,
  `note` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `materialout` */

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

/*Data for the table `orderdetail` */

/*Table structure for table `orderfabric` */

DROP TABLE IF EXISTS `orderfabric`;

CREATE TABLE `orderfabric` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `orderid` int(10) DEFAULT NULL,
  `yarncode` varchar(30) DEFAULT NULL,
  `fabrictypecode` varchar(30) DEFAULT NULL,
  `fabriccode` varchar(30) DEFAULT NULL,
  `width` varchar(30) DEFAULT NULL,
  `weight` varchar(30) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

/*Data for the table `orderfabric` */

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
  `price` varchar(30) DEFAULT NULL,
  `fabricmargin` varchar(30) DEFAULT '5',
  `materialmargin` varchar(30) DEFAULT '5',
  `files` varchar(300) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `orders` */

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
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8;

/*Data for the table `other` */

insert  into `other`(`id`,`code`,`name`,`type1`,`type2`,`status`,`created_at`) values 
(56,'R','Red','Color','Red',1,'2018-04-26 22:48:27'),
(57,'B','Blue','Color','Blue',1,'2018-04-26 22:48:44'),
(58,'Y','Yellow','Color','Yellow',1,'2018-04-26 22:48:59'),
(59,'S','Seller','Customer Type','Seller',1,'2018-04-26 22:49:19'),
(60,'B','Buyer','Customer Type','Buyer',1,'2018-04-26 22:49:39'),
(61,'O','FabricOne','Fabric Type','One',1,'2018-04-26 22:50:13'),
(62,'T','FabricTwo','Fabric Type','Two',1,'2018-04-26 22:50:28'),
(63,'XXS','XXS','Size','XXS',1,'2018-04-26 22:53:24'),
(64,'XS','XS','Size','XS',1,'2018-04-26 22:53:31'),
(65,'S','S','Size','S',1,'2018-04-26 22:53:38'),
(66,'L','L','Size','L',1,'2018-04-26 22:53:46'),
(67,'P 1','Customer Manager','Position','P 1',1,'2018-04-26 23:00:03'),
(68,'P 2','System Manager','Position','P 2',1,'2018-04-26 23:00:20'),
(69,'N','Normal','Priority','Normal',1,'2018-04-26 23:07:08'),
(70,'H','High','Priority','H',1,'2018-04-26 23:07:20'),
(71,'L','Low','Priority','L',1,'2018-04-26 23:07:29'),
(72,'c1','Kg','Unit','Kg',1,'2018-04-27 06:59:12'),
(73,'c2','T','Unit','T',1,'2018-04-27 06:59:27'),
(74,'C','Canceled','Priority',' ',1,'2018-04-27 07:51:55'),
(75,'cc','Completed','Priority',' ',1,'2018-04-27 07:52:05');

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `productmaterialgroup` */

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `sizegroup` */

/*Table structure for table `submaterial` */

DROP TABLE IF EXISTS `submaterial`;

CREATE TABLE `submaterial` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `code` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `unit` int(10) DEFAULT NULL,
  `type1` varchar(30) DEFAULT NULL,
  `type2` varchar(30) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

/*Data for the table `submaterial` */

/*Table structure for table `token` */

DROP TABLE IF EXISTS `token`;

CREATE TABLE `token` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userid` varchar(300) DEFAULT NULL,
  `token` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `token` */

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
  `type` int(1) DEFAULT '0',
  `status` tinyint(1) DEFAULT '1',
  `active` tinyint(1) DEFAULT '0',
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `users` */

insert  into `users`(`id`,`email`,`password`,`firstname`,`lastname`,`factory`,`department`,`line`,`phone`,`position`,`type`,`status`,`active`,`create_at`) values 
('de76ff03-1604-4946-b90d-a702bdb6d657','sew@admin.com','$2a$08$T7HjSrG9LkGoNjly22jvneaI3zLJCOFkCE.Ic1.Ptts9P5XpbDvXm','Bader','Al',-1,-1,-1,'12345',-1,1,1,0,'2018-04-26 22:47:13');

/*Table structure for table `yarn` */

DROP TABLE IF EXISTS `yarn`;

CREATE TABLE `yarn` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `code` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `yarn` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
