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
CREATE DATABASE /*!32312 IF NOT EXISTS*/`project` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `project`;

/*Table structure for table `inspection` */

DROP TABLE IF EXISTS `inspection`;

CREATE TABLE `inspection` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `buyer` int(10) DEFAULT NULL,
  `orderid` int(10) DEFAULT NULL,
  `date` varchar(30) DEFAULT NULL,
  `color` varchar(30) DEFAULT NULL,
  `n1` varchar(10) DEFAULT NULL,
  `n2` varchar(10) DEFAULT NULL,
  `n3` varchar(10) DEFAULT NULL,
  `n4` varchar(10) DEFAULT NULL,
  `n5` varchar(10) DEFAULT NULL,
  `n6` varchar(10) DEFAULT NULL,
  `n7` varchar(10) DEFAULT NULL,
  `n8` varchar(10) DEFAULT NULL,
  `n9` varchar(10) DEFAULT NULL,
  `n10` varchar(10) DEFAULT NULL,
  `n11` varchar(10) DEFAULT NULL,
  `n12` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

/*Data for the table `inspection` */

insert  into `inspection`(`id`,`name`,`buyer`,`orderid`,`date`,`color`,`n1`,`n2`,`n3`,`n4`,`n5`,`n6`,`n7`,`n8`,`n9`,`n10`,`n11`,`n12`) values 
(10,'Bryan',23,8,'2018-05-24','Red','11','2','3','5','7','','','','','','',''),
(11,'Bryan',24,9,'2018-05-24','-1','','2','','','','','','','','','',''),
(12,'Bryan',23,11,'2018-05-24','-1','','','3','','','','','','','','',''),
(13,'Sara',23,11,'2018-05-24','-1','','','','4','','','','','','','',''),
(14,'Atom',25,11,'2018-05-24','-1','11','','','23','','','','','','','','');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
