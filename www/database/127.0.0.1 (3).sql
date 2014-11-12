-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Окт 30 2014 г., 18:25
-- Версия сервера: 5.5.25
-- Версия PHP: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `rod_dvir_hotel`
--
CREATE DATABASE `rod_dvir_hotel` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `rod_dvir_hotel`;

-- --------------------------------------------------------

--
-- Структура таблицы `hotel_info`
--

CREATE TABLE IF NOT EXISTS `hotel_info` (
  `address` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `id_2` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `hotel_info`
--

INSERT INTO `hotel_info` (`address`, `email`, `id`) VALUES
('м. Львів, вул. Скнилівська, 75б', 'dfghjklпв', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `hotel_phones`
--

CREATE TABLE IF NOT EXISTS `hotel_phones` (
  `phone` varchar(255) NOT NULL,
  `id` int(3) NOT NULL AUTO_INCREMENT,
  UNIQUE KEY `phone_numbers` (`phone`),
  UNIQUE KEY `id_2` (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Дамп данных таблицы `hotel_phones`
--

INSERT INTO `hotel_phones` (`phone`, `id`) VALUES
('+380973406802', 2),
('+380973406809', 6),
('+380630239496', 7);

-- --------------------------------------------------------

--
-- Структура таблицы `rooms`
--

CREATE TABLE IF NOT EXISTS `rooms` (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `comments` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `price` double NOT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `rooms`
--

INSERT INTO `rooms` (`id`, `type`, `comments`, `price`) VALUES
('101', '1', '', 100),
('102', '2', '', 100),
('201', '3', '', 150),
('202', '1', '', 100),
('203', '2', '', 100),
('301', '1', '', 100),
('302', '2', '', 100),
('303', '3', '', 150),
('304', '1', '', 100);

-- --------------------------------------------------------

--
-- Структура таблицы `rooms_types`
--

CREATE TABLE IF NOT EXISTS `rooms_types` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `comment` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Дамп данных таблицы `rooms_types`
--

INSERT INTO `rooms_types` (`id`, `type_name`, `comment`) VALUES
(2, 'Напів-люкс', '-fjfjf\n-service'),
(3, 'Люкс', '-Телевізор\r\n-Душ\r\n-прибирання кожного дня\r\n-кімната для гостей'),
(4, 'Yura-new-type', 'some comment will be here'),
(5, 'Yura-new-type', 'some comment will be here'),
(6, 'Yura-new-type', 'some comment will be here'),
(7, 'Yura-new-type', 'some comment will be here'),
(8, 'Yura-new-type', 'some comment will be here');

-- --------------------------------------------------------

--
-- Структура таблицы `service`
--

CREATE TABLE IF NOT EXISTS `service` (
  `available_service` text NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `service`
--

INSERT INTO `service` (`available_service`, `id`) VALUES
('Сервіси включені в оплату:\r\n- Паркінг;\r\n- і т.д.\r\n', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`name`, `password`) VALUES
('administrator', 'dcc0f51a0c66b920850c48a0beb45ccdf29dba0b'),
('dev', 'dcc0f51a0c66b920850c48a0beb45ccdf29dba0b');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;