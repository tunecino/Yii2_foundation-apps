-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 08, 2016 at 10:48 PM
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
  `user_id` int(11) NOT NULL,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_image_owner1_idx` (`owner_id`),
  KEY `fk_image_user1_idx` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=21 ;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`id`, `owner_id`, `name`, `url`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 1, 'A Curious Look to Sky', 'http://lorempixel.com/640/640/people/1/', 1, 1452034614, 1452284767),
(2, 3, 'Road 01', 'https://source.unsplash.com/CoD2Q92UaEg/860x660', 1, 1452035199, 1452206776),
(3, 1, 'Bench Time', 'http://lorempixel.com/620/640/fashion/6/', 1, 1452036015, 1452212080),
(4, 1, 'fashion 9', 'http://lorempixel.com/640/640/fashion/9/', 1, 1452204648, 1452206844),
(5, 3, 'Road 02', 'https://source.unsplash.com/YD1uvthZwg4/860x660', 1, 1452206086, 1452206851),
(6, 3, 'the elegant touch', 'https://source.unsplash.com/omKdUQ9R3Zo/860x660', 1, 1452206336, 1452206858),
(7, 3, 'my new shoes', 'https://source.unsplash.com/ssrbaKvxaos/660x660', 1, 1452207158, 1452207856),
(8, 3, 'fun time', 'https://source.unsplash.com/ob6O_xd67O0/660x660', 1, 1452207334, 1452207562),
(9, 3, 'Terminal E-12', 'https://source.unsplash.com/2TlAsvhqiL0/660x660', 1, 1452207434, 1452210785),
(10, 3, 'fresh air', 'https://source.unsplash.com/nuRYwOJryyk/860x660', 1, 1452208132, 1452212224),
(11, 3, 'sunset', 'https://source.unsplash.com/6p6WDodvR2Y/860x660', 1, 1452208221, 1452208614),
(12, 3, 'Road 03', 'https://source.unsplash.com/GKR1tBkmW3M/660x660', 1, 1452208380, 1452211310),
(13, 3, 'cookies', 'https://source.unsplash.com/eqsEZNCm4-c/660x660', 1, 1452208749, 1452208787),
(14, 3, 'Road 04', 'https://source.unsplash.com/ISHD1ovpJ-k/660x660', 1, 1452208972, 1452209078),
(15, 3, 'Road 05', 'https://source.unsplash.com/xFjAftU8lMY/860x660', 1, 1452209023, 1452209082),
(16, 3, 'red face', 'https://source.unsplash.com/cSQw4uqF_Hc/660x660', 1, 1452209923, 1452212240),
(17, 3, 'Bench Time', 'https://source.unsplash.com/3f4sQIums6k/660x660', 1, 1452210088, 1452210631),
(18, 3, 'red cherries', 'https://source.unsplash.com/GoKXJaQoLQs/660x660', 1, 1452210572, 1452210880);

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
(3, 1),
(7, 1),
(14, 1),
(13, 2),
(18, 2),
(2, 3),
(5, 3),
(8, 3),
(10, 3),
(11, 3),
(12, 3),
(15, 3),
(16, 3),
(17, 3),
(1, 4),
(3, 4),
(4, 4),
(6, 4),
(7, 4),
(9, 4),
(17, 4),
(1, 5),
(3, 5),
(7, 5),
(8, 5),
(9, 5),
(14, 5),
(3, 6),
(4, 6),
(6, 6),
(7, 6),
(8, 7),
(9, 8),
(11, 9),
(12, 9),
(10, 10),
(16, 10);

-- --------------------------------------------------------

--
-- Table structure for table `owner`
--

CREATE TABLE IF NOT EXISTS `owner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dns` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `owner`
--

INSERT INTO `owner` (`id`, `dns`) VALUES
(1, 'lorempixel.com'),
(2, 'placekitten.com'),
(3, 'unsplash.com');

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE IF NOT EXISTS `session` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `auth_key` varchar(45) NOT NULL,
  `retained` bit(1) DEFAULT b'0',
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_session_user1` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`id`, `user_id`, `auth_key`, `retained`, `created_at`, `updated_at`) VALUES
(1, 1, 'Shyqq8GUiQHIYXdf0nhXAqvIjKl3RaO-', b'0', 1452032777, 1452032777),
(2, 1, '9ExJC0OJoLtdzQhsxuxmGA8U_YtR88WC', b'0', 1452200170, 1452200170),
(5, 2, 'ChkBXHpbF_nqrCuJuKYPCt5PloyHLWoV', b'0', 1452211861, 1452211861),
(7, 1, '2fzGBQ0XcZcGIXC_Yi21AAC_tQi9v-4F', b'0', 1452284745, 1452284745),
(8, 2, 'gEEp_6yUGQPekwaBZOYFPjwyx8nN296P', b'1', 1452289420, 1452289420);

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

CREATE TABLE IF NOT EXISTS `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `tag`
--

INSERT INTO `tag` (`id`, `name`) VALUES
(1, 'buildings'),
(2, 'food'),
(3, 'nature'),
(4, 'people'),
(5, 'city'),
(6, 'fashion'),
(7, 'objects'),
(8, 'technology'),
(9, 'water'),
(10, 'animals');

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password_hash`, `password_reset_token`, `email`, `status`, `created_at`, `updated_at`) VALUES
(1, 'tunecino', '$2y$13$9LlGJn9rSUOyelcVsbmuFeombOJI6iry88FEqyXGoN6lTYB7rygj.', NULL, 'tunecino@gmail.com', 10, 1452032777, 1452032777),
(2, 'demo', '$2y$13$o2Vb3UWuMWnLVEFaOYqXT.9UlDSZdUwXPKX9xg.MdBX11hkI5AvEe', NULL, 'demo@example.com', 10, 1452211503, 1452211503);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `fk_image_owner1` FOREIGN KEY (`owner_id`) REFERENCES `owner` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_image_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `image_has_tag`
--
ALTER TABLE `image_has_tag`
  ADD CONSTRAINT `fk_image_has_tag_image1` FOREIGN KEY (`image_id`) REFERENCES `image` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_image_has_tag_tag1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `fk_session_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
