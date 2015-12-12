-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 06, 2015 at 03:18 PM
-- Server version: 5.5.46-0ubuntu0.14.04.2
-- PHP Version: 5.5.9-1ubuntu4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `mydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE IF NOT EXISTS `image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner_id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_image_owner1_idx` (`owner_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`id`, `owner_id`, `name`, `url`) VALUES
(2, 2, 'image_name', 'http://lorempixel.com/400/200/sports/1/'),
(3, 2, 'man', 'http://lorempixel.com/400/400/people/3/'),
(4, 2, 'sport 3', 'http://lorempixel.com/400/200/sports/3/'),
(5, 2, 'fashion 2', 'http://lorempixel.com/g/400/400/fashion/8'),
(6, 1, 'fashion 9', 'http://lorempixel.com/400/400/fashion/9'),
(7, 2, 'sport 6', 'http://lorempixel.com/400/400/people/1'),
(8, 2, 'sport 76', 'http://lorempixel.com/400/200/sports/7'),
(9, 1, 'man', 'http://lorempixel.com/400/400/people/8'),
(10, 1, 'test', 'http://lorempixel.com/400/200/sports/3'),
(11, 1, 'http://lorempixel.com/400/200/sports/2/', 'http://lorempixel.com/400/200/sports/2/'),
(12, 1, 'hh', 'http://lorempixel.com/400/200/sports/2/'),
(13, 1, 'large', 'http://lorempixel.com/400/400/people/5'),
(14, 1, 'j', 'http://lorempixel.com/200/400/'),
(15, 1, 'sport77', 'http://lorempixel.com/400/200/sports/7'),
(16, 1, 'foot', 'http://lorempixel.com/400/200/sports/6'),
(17, 1, 'moto', 'http://lorempixel.com/400/200/sports/5');

-- --------------------------------------------------------

--
-- Table structure for table `image_has_tag`
--

CREATE TABLE IF NOT EXISTS `image_has_tag` (
  `image_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  PRIMARY KEY (`image_id`,`tag_id`),
  KEY `fk_image_has_tag_tag1_idx` (`tag_id`),
  KEY `fk_image_has_tag_image1_idx` (`image_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `image_has_tag`
--

INSERT INTO `image_has_tag` (`image_id`, `tag_id`) VALUES
(2, 2),
(3, 2),
(4, 2),
(5, 2),
(2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `owner`
--

CREATE TABLE IF NOT EXISTS `owner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dns` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `owner`
--

INSERT INTO `owner` (`id`, `dns`) VALUES
(1, 'lorempixel.com'),
(2, 'www.yiiframework.com');

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

CREATE TABLE IF NOT EXISTS `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `tag`
--

INSERT INTO `tag` (`id`, `name`) VALUES
(1, 'tag 01'),
(2, 'tag 02'),
(3, 'tag 03'),
(4, 'tag 04');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `password_reset_token` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT '10',
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `session` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `auth_key` varchar(45) NOT NULL,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

ALTER TABLE `session`
  ADD CONSTRAINT `fk_session_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password_hash`, `password_reset_token`, `email`, `status`, `created_at`, `updated_at`) VALUES
(1, 'tunecino', '$2y$13$uSvt/EnuF9uDwkqXY1gq.Oza8wEDqdYB.0PAduPi0RDoX9DVBWxne', NULL, 'tunecino@a.a', 10, 1449274079, 1449359907),
(2, 'salem', '$2y$13$w8xOCG4xHxF2wCn4wDgb.Op.Ny3acCp7QZwbjmtHX7pXWrGtuy5XS', NULL, 'salem@a.a', 10, 1449328335, 1449353083);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `fk_image_owner1` FOREIGN KEY (`owner_id`) REFERENCES `owner` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `image_has_tag`
--
ALTER TABLE `image_has_tag`
  ADD CONSTRAINT `fk_image_has_tag_image1` FOREIGN KEY (`image_id`) REFERENCES `image` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_image_has_tag_tag1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
