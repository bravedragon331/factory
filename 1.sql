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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

/*Data for the table `auth` */

insert  into `auth`(`id`,`user`,`page`,`r`,`w`,`d`,`status`,`create_at`) values 
(3,'de76ff03-1604-4946-b90d-a702bdb6d657',2,1,1,1,1,'2018-04-30 05:20:33'),
(4,'de76ff03-1604-4946-b90d-a702bdb6d657',3,1,1,1,1,'2018-04-30 05:20:36'),
(5,'de76ff03-1604-4946-b90d-a702bdb6d657',4,1,1,1,1,'2018-04-30 05:20:39'),
(6,'de76ff03-1604-4946-b90d-a702bdb6d657',5,1,1,1,1,'2018-04-30 05:20:42'),
(7,'de76ff03-1604-4946-b90d-a702bdb6d657',6,1,1,1,1,'2018-04-30 05:20:45'),
(8,'de76ff03-1604-4946-b90d-a702bdb6d657',7,1,1,1,1,'2018-04-30 05:20:48'),
(9,'de76ff03-1604-4946-b90d-a702bdb6d657',8,1,1,1,1,'2018-04-30 05:20:51'),
(10,'de76ff03-1604-4946-b90d-a702bdb6d657',9,1,1,1,1,'2018-04-30 05:20:54'),
(11,'de76ff03-1604-4946-b90d-a702bdb6d657',10,1,1,1,1,'2018-04-30 05:20:57'),
(12,'de76ff03-1604-4946-b90d-a702bdb6d657',11,1,1,1,1,'2018-04-30 05:21:00'),
(13,'de76ff03-1604-4946-b90d-a702bdb6d657',12,1,1,1,1,'2018-04-30 05:21:01'),
(14,'de76ff03-1604-4946-b90d-a702bdb6d657',13,1,1,1,1,'2018-04-30 05:21:03'),
(15,'de76ff03-1604-4946-b90d-a702bdb6d657',14,1,1,1,1,'2018-04-30 05:21:09'),
(18,'de76ff03-1604-4946-b90d-a702bdb6d657',1,1,1,1,1,'2018-04-30 05:53:13');

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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

/*Data for the table `customer` */

insert  into `customer`(`id`,`name`,`type`,`address`,`contact`,`email`,`phone`,`profileimage`,`status`,`created_at`) values 
(20,'Customer',60,'Address','Contact','customer@email.com','Phone','36271icjgib6h8z',1,'2018-04-27 21:42:06'),
(21,'Fabric Customer',76,'Address','123','coolherobader@gmail.com','123','3627ad8jgjfhsko',1,'2018-04-28 16:35:16'),
(22,'Mat Customer',77,'Address','12345','mat@customer.com','12345','3627azkjgjgokef',1,'2018-04-28 17:08:32');

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Data for the table `cut` */

insert  into `cut`(`id`,`orderid`,`po`,`color`,`lote`,`yds`,`cutdate`,`cutord`,`size1`,`size2`,`size3`,`size4`,`size5`,`size6`,`size7`,`size8`,`size9`,`size10`,`envio`,`lienzos`,`ydsetique`,`malo`,`faltante`,`ydsused`,`bies`,`total`,`qtyrollo`,`tendedor`) values 
(3,6,14,'R','','1','2018-04-27','1','1','1','1','','','','','','','','','','','','','','','','',''),
(4,6,14,'R','2','','','32','','','','','','','','','','','','','','','','','','','',''),
(5,7,18,'R','123','123','','1','','','','','','','','','','','123','','','','','','','','',''),
(6,7,18,'R','123','231','2018-04-28','2','','','','','','','','','','','123','','','','','','','','',''),
(7,7,18,'R','123','12','2018-04-28','3','12','12','12','','','','','','','','123','','','','','','','','',''),
(8,7,18,'R','123','123','2018-04-28','4','123','123','21','','','','','','','','12312','','','','','','','','','');

/*Table structure for table `department` */

DROP TABLE IF EXISTS `department`;

CREATE TABLE `department` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `factory` int(10) NOT NULL,
  `name` varchar(20) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

/*Data for the table `department` */

insert  into `department`(`id`,`factory`,`name`,`status`,`created_at`) values 
(34,26,'Dep1',1,'2018-04-27 21:46:11'),
(35,26,'Dep2',1,'2018-04-27 21:46:14'),
(36,27,'Dep3',1,'2018-04-27 21:46:18');

/*Table structure for table `fabric` */

DROP TABLE IF EXISTS `fabric`;

CREATE TABLE `fabric` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `code` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `fabric` */

insert  into `fabric`(`id`,`code`,`name`,`status`,`create_at`) values 
(5,'c1','Fabric1',1,'2018-04-27 22:12:35'),
(6,'c2','Fabric2',1,'2018-04-27 22:12:40');

/*Table structure for table `fabricin` */

DROP TABLE IF EXISTS `fabricin`;

CREATE TABLE `fabricin` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `po` int(10) DEFAULT NULL,
  `color` varchar(30) DEFAULT NULL,
  `fabrictype` int(10) DEFAULT NULL,
  `fabric` int(10) DEFAULT NULL,
  `rcvd` varchar(30) DEFAULT NULL,
  `kg` varchar(30) DEFAULT NULL,
  `yds` varchar(30) DEFAULT NULL,
  `roll` varchar(30) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

/*Data for the table `fabricin` */

insert  into `fabricin`(`id`,`po`,`color`,`fabrictype`,`fabric`,`rcvd`,`kg`,`yds`,`roll`,`lote`,`rack`,`date`,`customer`,`rib`,`rechazo`,`ret`,`bad`,`note`) values 
(20,14,'R',61,5,'1','13','13','13','','','2018-04-27',21,'','','','',''),
(21,17,'B',61,5,'2','12','32','12','','','',21,'','','','',''),
(23,14,'R',61,5,'21','12','2','2','2','','',21,'','','','',''),
(24,14,'R',61,5,'12','12','12','12','12','12','2018-04-28',21,'','','','',''),
(25,14,'R',61,5,'3','23','23','0','12','12','2018-04-27',21,'','','','',''),
(26,14,'R',61,5,'25','3','4','4','','','',21,'','','','','');

/*Table structure for table `fabricout` */

DROP TABLE IF EXISTS `fabricout`;

CREATE TABLE `fabricout` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `po` int(10) DEFAULT NULL,
  `color` varchar(30) DEFAULT NULL,
  `fabrictype` int(10) DEFAULT NULL,
  `fabric` int(10) DEFAULT NULL,
  `rcvd` varchar(30) DEFAULT NULL,
  `kg` varchar(30) DEFAULT NULL,
  `yds` varchar(30) DEFAULT NULL,
  `roll` varchar(30) DEFAULT NULL,
  `date` varchar(30) DEFAULT NULL,
  `customer` int(10) DEFAULT NULL,
  `rib` varchar(30) DEFAULT NULL,
  `rechazo` varchar(30) DEFAULT NULL,
  `ret` varchar(30) DEFAULT NULL,
  `bad` varchar(30) DEFAULT NULL,
  `note` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `fabricout` */

insert  into `fabricout`(`id`,`po`,`color`,`fabrictype`,`fabric`,`rcvd`,`kg`,`yds`,`roll`,`date`,`customer`,`rib`,`rechazo`,`ret`,`bad`,`note`) values 
(4,14,'R',61,5,'12','','','','',21,'','','','',''),
(5,15,'Y',62,5,'1','','','','',21,'','','','',''),
(6,15,'Y',61,5,'2','','','','',35,'','','','',''),
(7,14,'R',61,5,'2','','','','',34,'','','','','');

/*Table structure for table `factory` */

DROP TABLE IF EXISTS `factory`;

CREATE TABLE `factory` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `status` smallint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

/*Data for the table `factory` */

insert  into `factory`(`id`,`name`,`status`,`created_at`) values 
(26,'Fac1',1,'2018-04-27 21:45:58'),
(27,'Fac2',1,'2018-04-27 21:46:02');

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `finishmaterialgroup` */

insert  into `finishmaterialgroup`(`id`,`code`,`name`,`customer`,`finishmaterial1`,`finishmaterial2`,`finishmaterial3`,`finishmaterial4`,`finishmaterial5`,`finishmaterial6`,`finishmaterial7`,`finishmaterial8`,`finishmaterial9`,`finishmaterial10`,`status`,`created_at`) values 
(4,'f1','FMGroup1',20,23,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,'2018-04-27 21:45:35');

/*Table structure for table `follower` */

DROP TABLE IF EXISTS `follower`;

CREATE TABLE `follower` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `followingid` int(100) DEFAULT NULL,
  `following` varchar(100) DEFAULT NULL,
  `follower` varchar(100) DEFAULT NULL,
  `followername` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

/*Data for the table `materialin` */

insert  into `materialin`(`id`,`po`,`material`,`materialtype`,`size`,`ordernumber`,`loss`,`need`,`rcvd`,`date`,`customer`,`invoice`,`quantity`,`note`) values 
(5,'14',21,1,'64','3','3.15','3.15','1','2018-04-27',22,'',0,''),
(7,'14',21,1,'65','2','2.1','2.1','0003','',22,'003',4,'4'),
(8,'14',22,1,'63','3','3.15','3.15','','',22,'',5,''),
(9,'18',21,1,'63','123',NULL,'126.69','123',NULL,22,'',12,''),
(12,'14',21,1,'63','3','3.15','3.15','5','',22,'',4,'');

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `materialout` */

insert  into `materialout`(`id`,`po`,`material`,`materialtype`,`size`,`ordernumber`,`loss`,`need`,`rcvd`,`date`,`department`,`invoice`,`quantity`,`note`) values 
(4,'14',21,1,'63','3',NULL,'3.15','1','',34,'',1,NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

/*Data for the table `orderdetail` */

insert  into `orderdetail`(`id`,`orderid`,`style`,`po`,`shipdate`,`color`,`colorname`,`s1`,`s2`,`s3`,`s4`,`s5`,`s6`,`s7`,`s8`,`s9`,`s10`,`body`,`trim`,`priority`,`priorityname`) values 
(14,6,'s-01','po-01','2018-04-27','R','Red',3,3,2,0,0,0,0,0,0,0,'12','12','N','Normal'),
(15,6,'s-02','po-02','2018-04-27','Y','Yellow',6,3,4,0,0,0,0,0,0,0,'21','12','H','High'),
(16,6,'s-03','po-03','2018-04-28','Y','Yellow',3,4,2,0,0,0,0,0,0,0,'32','12','cc','Completed'),
(17,6,'s-02','po-01','2018-04-28','B','Blue',12,23,12,0,0,0,0,0,0,0,'12','12','C','Canceled'),
(18,7,'s123','123','2018-04-28','R','Red',123,123,123,0,0,0,0,0,0,0,'7','','-1','Not Selected'),
(19,7,'s123','123','2018-04-28','B','Blue',123,12,12,0,0,0,0,0,0,0,'','','-1','Not Selected');

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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

/*Data for the table `orderfabric` */

insert  into `orderfabric`(`id`,`orderid`,`yarncode`,`fabrictypecode`,`fabriccode`,`width`,`weight`,`created_at`) values 
(23,6,NULL,'61','5','12','13','2018-04-27 22:16:45'),
(24,6,NULL,'62','5','32','12','2018-04-27 22:19:05'),
(25,7,NULL,'61','5','123','123','2018-04-28 18:50:08');

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `orders` */

insert  into `orders`(`id`,`date`,`handler`,`handlername`,`name`,`buyer`,`buyername`,`style`,`product`,`sizegroup`,`sizegroupname`,`productgroup`,`productgroupname`,`finishgroup`,`finishgroupname`,`season`,`quantity`,`amount`,`price`,`fabricmargin`,`materialmargin`,`files`,`created_at`) values 
(6,'2018-04-27 03:00:00','e6d53884-6b01-442f-b363-62058da0c9d4','First Last','o-001','20','Customer','s-01','p-01','6','s1','5','p1','4','f1','s-01','12','12','1','5','5',NULL,'2018-04-27 21:57:58'),
(7,'2018-04-28 03:00:00','e6d53884-6b01-442f-b363-62058da0c9d4','First Last','1234','20','Customer','123','123','6','s1','5','p1','4','f1','123','123','123','1.3','3','3','362788cjgjm67mr.png,362788cjgjmsuwa.png,362788cjgjmti30.png,362788cjgjmtmky.png','2018-04-28 18:41:05');

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
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8;

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
(74,'C','Canceled','Priority',' ',1,'2018-04-27 07:51:55'),
(75,'cc','Completed','Priority',' ',1,'2018-04-27 07:52:05'),
(76,'F','Fabric','Customer Type','Fabric',1,'2018-04-28 16:34:54'),
(77,'M','Material','Customer Type','M',1,'2018-04-28 17:08:06'),
(78,'K','Kg','Unit','',1,'2018-04-28 18:07:49'),
(79,'1','1','Color','',1,'2018-04-30 17:44:16'),
(80,'2','2','Color','',1,'2018-04-30 17:44:19'),
(81,'3','3','Color','',1,'2018-04-30 17:44:21'),
(82,'4','4','Color','',1,'2018-04-30 17:44:23'),
(83,'5','5','Color','',1,'2018-04-30 17:44:25'),
(84,'6','6','Color','',1,'2018-04-30 17:44:27'),
(85,'7','7','Color','',1,'2018-04-30 17:44:29'),
(86,'8','8','Color','',1,'2018-04-30 17:44:32'),
(87,'9','9','Color','',1,'2018-04-30 17:44:34'),
(88,'10','10','Color','',1,'2018-04-30 17:44:54'),
(89,'11','11','Color','',1,'2018-04-30 17:44:56'),
(90,'12','12','Color','',1,'2018-04-30 17:44:58'),
(91,'13','13','Color','',1,'2018-04-30 17:45:00'),
(92,'14','14','Color','',1,'2018-04-30 17:45:02'),
(93,'15','15','Color','',1,'2018-04-30 17:45:04'),
(94,'16','16','Color','',1,'2018-04-30 17:45:06'),
(95,'17','17','Color','',1,'2018-04-30 17:45:09'),
(96,'18','18','Color','',1,'2018-04-30 17:45:14'),
(97,'19','19','Color','',1,'2018-04-30 17:45:18'),
(98,'20','20','Color','',1,'2018-04-30 17:45:22'),
(99,'21','21','Color','',1,'2018-04-30 17:47:36'),
(100,'22','22','Color','',1,'2018-04-30 17:47:38'),
(101,'23','23','Color','',1,'2018-04-30 17:47:40'),
(102,'24','24','Color','',1,'2018-04-30 17:47:42');

/*Table structure for table `printout` */

DROP TABLE IF EXISTS `printout`;

CREATE TABLE `printout` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `orderid` int(10) DEFAULT NULL,
  `po` int(10) DEFAULT NULL,
  `color` varchar(30) DEFAULT NULL,
  `printdate` varchar(30) DEFAULT NULL,
  `invoice` varchar(30) DEFAULT NULL,
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `printout` */

insert  into `printout`(`id`,`orderid`,`po`,`color`,`printdate`,`invoice`,`size1`,`size2`,`size3`,`size4`,`size5`,`size6`,`size7`,`size8`,`size9`,`size10`) values 
(1,6,15,'Y','2018-05-02','002','5','3','','','','','','','',''),
(2,7,19,'B','2018-05-02','001','','','32','','','','','','',''),
(3,6,14,'R','2018-05-02','001','4','','','','','','','','',''),
(4,6,16,'Y','2018-05-02','001','12','12','12','','','','','','','');

/*Table structure for table `printreturn` */

DROP TABLE IF EXISTS `printreturn`;

CREATE TABLE `printreturn` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `orderid` int(10) DEFAULT NULL,
  `po` int(10) DEFAULT NULL,
  `color` varchar(30) DEFAULT NULL,
  `printdate` varchar(30) DEFAULT NULL,
  `invoice` varchar(30) DEFAULT NULL,
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `printreturn` */

insert  into `printreturn`(`id`,`orderid`,`po`,`color`,`printdate`,`invoice`,`size1`,`size2`,`size3`,`size4`,`size5`,`size6`,`size7`,`size8`,`size9`,`size10`) values 
(1,6,17,'B','2018-05-02','01','12','','','','','','','','','');

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

/*Data for the table `productmaterialgroup` */

insert  into `productmaterialgroup`(`id`,`code`,`name`,`customer`,`productmaterial1`,`productmaterial2`,`productmaterial3`,`productmaterial4`,`productmaterial5`,`productmaterial6`,`productmaterial7`,`productmaterial8`,`productmaterial9`,`productmaterial10`,`status`,`created_at`) values 
(5,'p1','PMaterialGroup1',20,21,22,24,24,-1,-1,-1,-1,-1,-1,1,'2018-04-27 21:44:51'),
(6,'p2','PMaterialGroup2',20,24,21,22,22,-1,-1,-1,-1,-1,-1,1,'2018-04-27 21:45:10');

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `sizegroup` */

insert  into `sizegroup`(`id`,`code`,`name`,`customer`,`size1`,`size2`,`size3`,`size4`,`size5`,`size6`,`size7`,`size8`,`size9`,`size10`,`status`,`created_at`) values 
(6,'s1','sGroup1',20,63,64,65,-1,-1,-1,-1,-1,-1,-1,1,'2018-04-27 21:44:13'),
(7,'s2','sGroup2',20,66,64,-1,-1,-1,-1,-1,-1,-1,-1,1,'2018-04-27 21:44:25');

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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

/*Data for the table `submaterial` */

insert  into `submaterial`(`id`,`code`,`name`,`unit`,`type1`,`type2`,`status`,`created_at`) values 
(21,'p1','PMaterial1',72,'Product Material','P1',0,'2018-04-27 21:42:42'),
(22,'p2','PMaterial2',72,'Product Material','P2',1,'2018-04-27 21:43:04'),
(23,'f1','FMaterial1',73,'Finish Material','F1',1,'2018-04-27 21:43:18'),
(24,'f2','FMaterial2',73,'Product Material','F2',1,'2018-04-27 21:43:33');

/*Table structure for table `token` */

DROP TABLE IF EXISTS `token`;

CREATE TABLE `token` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userid` varchar(300) DEFAULT NULL,
  `token` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
('de76ff03-1604-4946-b90d-a702bdb6d657','monitor@admin.com','$2a$08$T7HjSrG9LkGoNjly22jvneaI3zLJCOFkCE.Ic1.Ptts9P5XpbDvXm','Bader','Al',-1,-1,-1,'12345',-1,1,1,0,'2018-04-26 22:47:13'),
('e6d53884-6b01-442f-b363-62058da0c9d4','bravedragon623@yandex.com','$2a$08$2H5CllQNXvnR5FBKiOQiW.fQOZW1BCu2a3Td1GIbF6XuoFMc8kzcu','First','Last',26,34,-1,'12345',68,1,0,0,'2018-04-27 21:49:55');

/*Table structure for table `washout` */

DROP TABLE IF EXISTS `washout`;

CREATE TABLE `washout` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `orderid` int(10) DEFAULT NULL,
  `po` int(10) DEFAULT NULL,
  `color` varchar(30) DEFAULT NULL,
  `washdate` varchar(30) DEFAULT NULL,
  `invoice` varchar(30) DEFAULT NULL,
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `washout` */

insert  into `washout`(`id`,`orderid`,`po`,`color`,`washdate`,`invoice`,`size1`,`size2`,`size3`,`size4`,`size5`,`size6`,`size7`,`size8`,`size9`,`size10`) values 
(1,6,17,'B','2018-05-02','001','12','32','','','','','','','',''),
(2,6,16,'Y','2018-05-02','02','21','','23','','','','','','','');

/*Table structure for table `washreturn` */

DROP TABLE IF EXISTS `washreturn`;

CREATE TABLE `washreturn` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `orderid` int(10) DEFAULT NULL,
  `po` int(10) DEFAULT NULL,
  `color` varchar(30) DEFAULT NULL,
  `washdate` varchar(30) DEFAULT NULL,
  `invoice` varchar(30) DEFAULT NULL,
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `washreturn` */

insert  into `washreturn`(`id`,`orderid`,`po`,`color`,`washdate`,`invoice`,`size1`,`size2`,`size3`,`size4`,`size5`,`size6`,`size7`,`size8`,`size9`,`size10`) values 
(1,7,19,'B','2018-05-02','1','12','','','','','','','','',''),
(2,6,15,'Y','2018-05-02','01','1','2','','','','','','','','');

/*Table structure for table `yarn` */

DROP TABLE IF EXISTS `yarn`;

CREATE TABLE `yarn` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `code` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `yarn` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
