-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Окт 04 2014 г., 14:55
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

-- --------------------------------------------------------

--
-- Структура таблицы `hotel_info`
--

CREATE TABLE IF NOT EXISTS `hotel_info` (
  `address` text COLLATE utf8_bin NOT NULL,
  `email` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `hotel_info`
--

INSERT INTO `hotel_info` (`address`, `email`) VALUES
('м. Львів, вул. Скнилівська, 75б', 'rod.dvir@gmail.com');

-- --------------------------------------------------------

--
-- Структура таблицы `hotel_phones`
--

CREATE TABLE IF NOT EXISTS `hotel_phones` (
  `phone_numbers` varchar(255) COLLATE utf8_bin NOT NULL,
  UNIQUE KEY `phone_numbers` (`phone_numbers`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `hotel_phones`
--

INSERT INTO `hotel_phones` (`phone_numbers`) VALUES
('+380501001561'),
('+380973406800');

-- --------------------------------------------------------

--
-- Структура таблицы `rooms`
--

CREATE TABLE IF NOT EXISTS `rooms` (
  `id` varchar(255) COLLATE utf8_bin NOT NULL,
  `type` varchar(255) COLLATE utf8_bin NOT NULL,
  `comments` text COLLATE utf8_bin NOT NULL,
  `price` double NOT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

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
  `type_name` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `rooms_types`
--

INSERT INTO `rooms_types` (`id`, `type_name`) VALUES
(1, 'Стандарт'),
(2, 'Напів-люкс'),
(3, 'Люкс');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `name` varchar(255) COLLATE utf8_bin NOT NULL,
  `password` varchar(255) COLLATE utf8_bin NOT NULL,
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`name`, `password`) VALUES
('admin', 'RODdvir'),
('dev', 'RODdvir');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
