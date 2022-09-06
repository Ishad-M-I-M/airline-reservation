use bairways;

INSERT INTO `discount` (`type`, `discount`)
VALUES ('Normal', '0.00'),
       ('Frequent', '5.00'),
       ('Gold', '9.00');

INSERT INTO `user` (`user_id`, `email`, `password`, `first_name`, `last_name`, `role`, `discount_type`, `is_active`,
                    `dob`)
VALUES  (-1, '', '', '', NULL, 'Guest', 'Normal', 1, '0000-00-00'),
        (1, 'test1_mod@gmail.com', '$2b$09$tkU0Te8xv98Ivor4Nxv7gOqoHc6GVCxn3gXz/iJKox8y.TjZRxBXy', 'mod1', 'mod1', 
         'moderator', 'Normal', 1, '1987-03-07'),
        (2, 'test1_clr@gmail.com', '$2b$09$.nb0aGqTmcW6XoMH.u6JZeZ63GEJpvtaNx7XepSWqoMOwb2i1rrPe', 'clr_1', 'clr_1',
         'clerk', 'Normal', 1, '1963-03-27'),
        (3, 'test1_usr@gmail.com', '$2b$09$/G0kHfffgFWyjrgBu8keYuMS2KSAoMu62NxunfCCyfcJHlmrUq.pK', 'usr_1', 'usr_1',
         'user', 'Gold', 1, '2000-01-05'),
        (4, 'tharshasivapalarajah@gmail.com', '$2b$10$nPhxOLsNTSFWkWmLn19aR.Zn2Lkew7SmMnDNqNJAdIfdZNpU.lncG', 'Tharsha',
         'Sivapalarajah', 'user', 'Frequent', 1, '2000-01-06'),
        (5, 'poogitha@gmail.com', '$2b$10$atnGRCCzI2FrZmTVOUc4fuABPuvmZViaYndc0PeJDGW9L/49D4Xba', 'Poogitha', 'Jegakumaran',
         'user', 'Normal', 1, '1999-03-31');

INSERT INTO `aircraft` (`aircraft_id`, `tail_number`, `model`, `Economy_seats`, `Business_seats`, `Platinum_seats`)
VALUES (1, 'PK-MGI', 'Boeing 737', 50, 50, 26),
       (2, 'PK-MGZ', 'Boeing 737', 50, 50, 26),
       (3, 'PK-YGH', 'Boeing 737', 50, 50, 26),
       (4, 'PK-YGV', 'Boeing 757', 70, 60, 32),
       (5, 'PK-YGW', 'Boeing 757', 70, 60, 32),
       (6, 'PK-LBW', 'Boeing 757', 70, 60, 32),
       (7, 'PK-LBZ', 'Boeing 757', 70, 60, 32),
       (8, 'PK-LUV', 'Airbus A380', 200, 200, 125);

INSERT INTO `airport` (`airport_id`, `code`, `name`, `location`)
VALUES (1, 'CGK', 'Soekarno-Hatta International Airport', 1),
       (2, 'DPS', 'Ngurah Rai International Airport', 4),
       (3, 'BIA', 'Bandaranaike International Airport', 6),
       (4, 'HRI', 'Mattala international airport', 8),
       (5, 'DEL', 'Indira Gandhi International Airport', 9),
       (6, 'BOM', 'Chhatrapati Shivaji Maharaj International Airport', 11),
       (7, 'MAA', 'Chennai International Airport', 13),
       (8, 'BKK', 'Suvarnabhumi Airport', 15),
       (9, 'DMK', 'Don Mueang International Airport', 18),
       (10, 'SIN', 'Singapore Changi Airport', 20);

INSERT INTO `port_location` (`id`, `location`)
VALUES (20, 'Airport Blvd.'),
       (5, 'Bali'),
       (15, 'Bang Phli District'),
       (19, 'Bangkok'),
       (2, 'Banten'),
       (13, 'Chennai'),
       (9, 'Delhi'),
       (18, 'Don Mueang'),
       (8, 'Hambantota'),
       (10, 'India'),
       (3, 'Indonesia'),
       (4, 'Kabupaten Badung'),
       (6, 'Katunayake'),
       (12, 'Maharashtra'),
       (11, 'Mumbai'),
       (16, 'Samut Prakan'),
       (21, 'Singapore'),
       (7, 'Sri Lanka'),
       (14, 'Tamil Nadu'),
       (1, 'Tangerang City'),
       (17, 'Thailand');

INSERT INTO `parent_location` (`id`, `parent_id`)
VALUES (1, 2),
       (2, 3),
       (4, 5),
       (5, 3),
       (6, 7),
       (8, 7),
       (9, 10),
       (11, 12),
       (12, 10),
       (13, 14),
       (14, 10),
       (15, 16),
       (16, 17),
       (18, 19),
       (19, 17),
       (20, 21);

INSERT INTO `route` (`route_id`, `origin`, `destination`)
VALUES (1, 1, 2),
       (2, 1, 3),
       (3, 1, 4),
       (4, 1, 5),
       (5, 1, 6),
       (6, 1, 7),
       (7, 1, 8),
       (8, 1, 9),
       (9, 1, 10),
       (10, 2, 1),
       (11, 2, 3),
       (12, 2, 4),
       (13, 2, 5),
       (14, 2, 6),
       (15, 2, 7),
       (16, 2, 8),
       (17, 2, 9),
       (18, 2, 10),
       (19, 3, 1),
       (20, 3, 2),
       (21, 3, 4),
       (22, 3, 5),
       (23, 3, 6),
       (24, 3, 7),
       (25, 3, 8),
       (26, 3, 9),
       (27, 3, 10),
       (28, 4, 1),
       (29, 4, 2),
       (30, 4, 3),
       (31, 4, 5),
       (32, 4, 6),
       (33, 4, 7),
       (34, 4, 8),
       (35, 4, 9),
       (36, 4, 10),
       (37, 5, 1),
       (38, 5, 2),
       (39, 5, 3),
       (40, 5, 4),
       (41, 5, 6),
       (42, 5, 7),
       (43, 5, 8),
       (44, 5, 9),
       (45, 5, 10),
       (46, 6, 1),
       (47, 6, 2),
       (48, 6, 3),
       (49, 6, 4),
       (50, 6, 5),
       (51, 6, 7),
       (52, 6, 8),
       (53, 6, 9),
       (54, 6, 10),
       (55, 7, 1),
       (56, 7, 2),
       (57, 7, 3),
       (58, 7, 4),
       (59, 7, 5),
       (60, 7, 6),
       (61, 7, 8),
       (62, 7, 9),
       (63, 7, 10),
       (64, 8, 1),
       (65, 8, 2),
       (66, 8, 3),
       (67, 8, 4),
       (68, 8, 5),
       (69, 8, 6),
       (70, 8, 7),
       (71, 8, 9),
       (72, 8, 10),
       (73, 9, 1),
       (74, 9, 2),
       (75, 9, 3),
       (76, 9, 4),
       (77, 9, 5),
       (78, 9, 6),
       (79, 9, 7),
       (80, 9, 8),
       (81, 9, 10),
       (82, 10, 1),
       (83, 10, 2),
       (84, 10, 3),
       (85, 10, 4),
       (86, 10, 5),
       (87, 10, 6),
       (88, 10, 7),
       (89, 10, 8),
       (90, 10, 9);

INSERT INTO `flight` (`flight_id`, `aircraft_id`, `route_id`, `takeoff_time`, `departure_time`, `is_active`) VALUES
(1, 8, 1, '2022-07-16 22:00:28', '2022-07-17 02:00:28', 1),
(2, 1, 1, '2022-07-16 18:00:28', '2022-07-16 22:00:28', 1),
(3, 1, 1, '2022-07-16 02:00:28', '2022-07-16 06:00:28', 1),
(4, 3, 2, '2022-07-16 04:00:28', '2022-07-16 10:00:28', 1),
(5, 4, 2, '2022-07-16 12:00:28', '2022-07-16 18:00:28', 1),
(6, 5, 3, '2022-07-16 20:00:28', '2022-07-17 04:00:28', 1),
(7, 6, 3, '2022-07-15 16:00:28', '2022-07-16 00:00:28', 1),
(8, 7, 4, '2022-07-17 22:00:28', '2022-07-18 03:00:28', 1),
(9, 8, 4, '2022-07-16 22:00:28', '2022-07-17 03:00:28', 1),
(10, 1, 5, '2022-07-15 17:00:28', '2022-07-16 00:00:28', 1),
(11, 2, 5, '2022-07-16 04:00:28', '2022-07-16 11:00:28', 1),
(12, 3, 10, '2022-07-16 04:00:28', '2022-07-16 07:00:28', 1),
(13, 4, 10, '2022-07-15 16:00:28', '2022-07-15 19:00:28', 1),
(14, 5, 11, '2022-07-14 22:00:28', '2022-07-15 10:00:28', 1),
(15, 6, 11, '2022-07-16 04:00:28', '2022-07-16 10:00:28', 1),
(16, 7, 12, '2022-07-16 04:00:28', '2022-07-16 10:00:28', 1),
(17, 8, 12, '2022-07-15 14:00:28', '2022-07-15 20:00:28', 1),
(18, 1, 13, '2022-07-16 04:00:28', '2022-07-16 10:00:28', 1),
(19, 2, 13, '2022-07-13 22:00:28', '2022-07-14 06:00:28', 1),
(20, 3, 19, '2022-07-16 04:00:28', '2022-07-16 10:00:28', 1),
(21, 4, 19, '2022-07-12 22:00:28', '2022-07-13 04:00:28', 1),
(22, 6, 20, '2022-07-16 04:00:28', '2022-07-16 10:00:28', 1),
(23, 6, 21, '2022-07-16 04:00:28', '2022-07-16 10:00:28', 1),
(24, 1, 1, '2022-07-17 10:48:54', '2022-07-17 15:48:54', 1),
(25, 2, 2, '2022-07-17 10:48:54', '2022-07-17 15:48:54', 1),
(26, 3, 3, '2022-07-17 10:48:54', '2022-07-17 15:48:54', 1),
(27, 4, 4, '2022-07-17 10:48:54', '2022-07-17 15:48:54', 1),
(28, 5, 5, '2022-07-17 10:48:54', '2022-07-17 15:48:54', 1),
(29, 6, 6, '2022-07-17 10:48:54', '2022-07-17 15:48:54', 1),
(30, 7, 7, '2022-07-17 10:48:54', '2022-07-17 15:48:54', 1),
(31, 8, 8, '2022-07-17 10:48:54', '2022-07-17 15:48:54', 1),
(32, 1, 10, '2022-07-18 10:48:54', '2022-07-18 15:48:54', 1),
(33, 2, 11, '2022-07-18 10:48:54', '2022-07-18 15:48:54', 1),
(34, 3, 12, '2022-07-18 10:48:54', '2022-07-18 15:48:54', 1),
(35, 4, 13, '2022-07-18 10:48:54', '2022-07-18 15:48:54', 1),
(36, 5, 14, '2022-07-18 10:48:54', '2022-07-18 15:48:54', 1),
(37, 6, 15, '2022-07-18 10:48:54', '2022-07-18 15:48:54', 1),
(38, 7, 16, '2022-07-18 10:48:54', '2022-07-18 15:48:54', 1),
(39, 8, 19, '2022-07-19 10:48:54', '2022-07-19 15:48:54', 1),
(40, 1, 20, '2022-07-19 10:48:54', '2022-07-19 15:48:54', 1),
(41, 2, 21, '2022-07-19 10:48:54', '2022-07-19 15:48:54', 1),
(42, 3, 22, '2022-07-19 10:48:54', '2022-07-19 15:48:54', 1),
(43, 4, 23, '2022-07-19 10:48:54', '2022-07-19 15:48:54', 1),
(44, 5, 24, '2022-07-19 10:48:54', '2022-07-19 15:48:54', 1),
(45, 6, 25, '2022-07-19 10:48:54', '2022-07-19 15:48:54', 1),
(46, 1, 28, '2022-07-20 10:48:54', '2022-07-20 15:48:54', 1),
(47, 2, 29, '2022-07-20 10:48:54', '2022-07-20 15:48:54', 1),
(48, 3, 30, '2022-07-20 10:48:54', '2022-07-20 15:48:54', 1),
(49, 4, 31, '2022-07-20 10:48:54', '2022-07-20 15:48:54', 1),
(50, 5, 32, '2022-07-20 10:48:54', '2022-07-20 15:48:54', 1),
(51, 6, 33, '2022-07-20 10:48:54', '2022-07-20 15:48:54', 1),
(52, 7, 34, '2022-07-20 10:48:54', '2022-07-20 15:48:54', 1),
(53, 8, 37, '2022-07-21 10:48:54', '2022-07-21 15:48:54', 1),
(54, 1, 38, '2022-07-21 10:48:54', '2022-07-21 15:48:54', 1),
(55, 2, 39, '2022-07-21 10:48:54', '2022-07-21 15:48:54', 1),
(56, 3, 40, '2022-07-21 10:48:54', '2022-07-21 15:48:54', 1),
(57, 4, 41, '2022-07-21 10:48:54', '2022-07-21 15:48:54', 1),
(58, 5, 42, '2022-07-21 10:48:54', '2022-07-21 15:48:54', 1),
(59, 6, 43, '2022-07-21 10:48:54', '2022-07-21 15:48:54', 1),
(60, 1, 46, '2022-07-22 10:48:54', '2022-07-22 15:48:54', 1),
(61, 2, 47, '2022-07-22 10:48:54', '2022-07-22 15:48:54', 1),
(62, 3, 48, '2022-07-22 10:48:54', '2022-07-22 15:48:54', 1),
(63, 4, 49, '2022-07-22 10:48:54', '2022-07-22 15:48:54', 1),
(64, 5, 50, '2022-07-22 10:48:54', '2022-07-22 15:48:54', 1),
(65, 6, 51, '2022-07-22 10:48:54', '2022-07-22 15:48:54', 1),
(66, 7, 52, '2022-07-22 10:48:54', '2022-07-22 15:48:54', 1);






INSERT INTO `flight_cost` (`flight_id`, `class`, `cost`) VALUES
(1, 'Business', '800.00'),
(1, 'Economy', '400.00'),
(1, 'Platinum', '1000.00'),
(2, 'Business', '800.00'),
(2, 'Economy', '400.00'),
(2, 'Platinum', '1000.00'),
(3, 'Business', '800.00'),
(3, 'Economy', '400.00'),
(3, 'Platinum', '1000.00'),
(4, 'Business', '800.00'),
(4, 'Economy', '400.00'),
(4, 'Platinum', '1000.00'),
(5, 'Business', '800.00'),
(5, 'Economy', '400.00'),
(5, 'Platinum', '1000.00'),
(6, 'Business', '800.00'),
(6, 'Economy', '400.00'),
(6, 'Platinum', '1000.00'),
(7, 'Business', '800.00'),
(7, 'Economy', '400.00'),
(7, 'Platinum', '1000.00'),
(8, 'Business', '800.00'),
(8, 'Economy', '400.00'),
(8, 'Platinum', '1000.00'),
(9, 'Business', '800.00'),
(9, 'Economy', '400.00'),
(9, 'Platinum', '1000.00'),
(10, 'Business', '800.00'),
(10, 'Economy', '400.00'),
(10, 'Platinum', '1000.00'),
(11, 'Business', '800.00'),
(11, 'Economy', '400.00'),
(11, 'Platinum', '1000.00'),
(12, 'Business', '800.00'),
(12, 'Economy', '400.00'),
(12, 'Platinum', '1000.00'),
(13, 'Business', '800.00'),
(13, 'Economy', '400.00'),
(13, 'Platinum', '1000.00'),
(14, 'Business', '800.00'),
(14, 'Economy', '400.00'),
(14, 'Platinum', '1000.00'),
(15, 'Business', '800.00'),
(15, 'Economy', '400.00'),
(15, 'Platinum', '1000.00'),
(16, 'Business', '800.00'),
(16, 'Economy', '400.00'),
(16, 'Platinum', '1000.00'),
(17, 'Business', '800.00'),
(17, 'Economy', '400.00'),
(17, 'Platinum', '1000.00'),
(18, 'Business', '800.00'),
(18, 'Economy', '400.00'),
(18, 'Platinum', '1000.00'),
(19, 'Business', '800.00'),
(19, 'Economy', '400.00'),
(19, 'Platinum', '1000.00'),
(20, 'Business', '800.00'),
(20, 'Economy', '400.00'),
(20, 'Platinum', '1000.00'),
(21, 'Business', '800.00'),
(21, 'Economy', '400.00'),
(21, 'Platinum', '1000.00'),
(22, 'Business', '800.00'),
(22, 'Economy', '400.00'),
(22, 'Platinum', '1000.00'),
(23, 'Business', '800.00'),
(23, 'Economy', '400.00'),
(23, 'Platinum', '1000.00'),
(24, 'Business', '800.00'),
(24, 'Economy', '400.00'),
(24, 'Platinum', '1000.00'),
(25, 'Business', '800.00'),
(25, 'Economy', '400.00'),
(25, 'Platinum', '1000.00'),
(26, 'Business', '800.00'),
(26, 'Economy', '400.00'),
(26, 'Platinum', '1000.00'),
(27, 'Business', '800.00'),
(27, 'Economy', '400.00'),
(27, 'Platinum', '1000.00'),
(28, 'Business', '800.00'),
(28, 'Economy', '400.00'),
(28, 'Platinum', '1000.00'),
(29, 'Business', '800.00'),
(29, 'Economy', '400.00'),
(29, 'Platinum', '1000.00'),
(30, 'Business', '800.00'),
(30, 'Economy', '400.00'),
(30, 'Platinum', '1000.00'),
(31, 'Business', '800.00'),
(31, 'Economy', '400.00'),
(31, 'Platinum', '1000.00'),
(32, 'Business', '800.00'),
(32, 'Economy', '400.00'),
(32, 'Platinum', '1000.00'),
(33, 'Business', '800.00'),
(33, 'Economy', '400.00'),
(33, 'Platinum', '1000.00'),
(34, 'Business', '800.00'),
(34, 'Economy', '400.00'),
(34, 'Platinum', '1000.00'),
(35, 'Business', '800.00'),
(35, 'Economy', '400.00'),
(35, 'Platinum', '1000.00'),
(36, 'Business', '800.00'),
(36, 'Economy', '400.00'),
(36, 'Platinum', '1000.00'),
(37, 'Business', '800.00'),
(37, 'Economy', '400.00'),
(37, 'Platinum', '1000.00'),
(38, 'Business', '800.00'),
(38, 'Economy', '400.00'),
(38, 'Platinum', '1000.00'),
(39, 'Business', '800.00'),
(39, 'Economy', '400.00'),
(39, 'Platinum', '1000.00'),
(40, 'Business', '800.00'),
(40, 'Economy', '400.00'),
(40, 'Platinum', '1000.00'),
(41, 'Business', '800.00'),
(41, 'Economy', '400.00'),
(41, 'Platinum', '1000.00'),
(42, 'Business', '800.00'),
(42, 'Economy', '400.00'),
(42, 'Platinum', '1000.00'),
(43, 'Business', '800.00'),
(43, 'Economy', '400.00'),
(43, 'Platinum', '1000.00'),
(44, 'Business', '800.00'),
(44, 'Economy', '400.00'),
(44, 'Platinum', '1000.00'),
(45, 'Business', '800.00'),
(45, 'Economy', '400.00'),
(45, 'Platinum', '1000.00'),
(46, 'Business', '800.00'),
(46, 'Economy', '400.00'),
(46, 'Platinum', '1000.00'),
(47, 'Business', '800.00'),
(47, 'Economy', '400.00'),
(47, 'Platinum', '1000.00'),
(48, 'Business', '800.00'),
(48, 'Economy', '400.00'),
(48, 'Platinum', '1000.00'),
(49, 'Business', '800.00'),
(49, 'Economy', '400.00'),
(49, 'Platinum', '1000.00'),
(50, 'Business', '800.00'),
(50, 'Economy', '400.00'),
(50, 'Platinum', '1000.00'),
(51, 'Business', '800.00'),
(51, 'Economy', '400.00'),
(51, 'Platinum', '1000.00'),
(52, 'Business', '800.00'),
(52, 'Economy', '400.00'),
(52, 'Platinum', '1000.00'),
(53, 'Business', '800.00'),
(53, 'Economy', '400.00'),
(53, 'Platinum', '1000.00'),
(54, 'Business', '800.00'),
(54, 'Economy', '400.00'),
(54, 'Platinum', '1000.00'),
(55, 'Business', '800.00'),
(55, 'Economy', '400.00'),
(55, 'Platinum', '1000.00'),
(56, 'Business', '800.00'),
(56, 'Economy', '400.00'),
(56, 'Platinum', '1000.00'),
(57, 'Business', '800.00'),
(57, 'Economy', '400.00'),
(57, 'Platinum', '1000.00'),
(58, 'Business', '800.00'),
(58, 'Economy', '400.00'),
(58, 'Platinum', '1000.00'),
(59, 'Business', '800.00'),
(59, 'Economy', '400.00'),
(59, 'Platinum', '1000.00'),
(60, 'Business', '800.00'),
(60, 'Economy', '400.00'),
(60, 'Platinum', '1000.00'),
(61, 'Business', '800.00'),
(61, 'Economy', '400.00'),
(61, 'Platinum', '1000.00'),
(62, 'Business', '800.00'),
(62, 'Economy', '400.00'),
(62, 'Platinum', '1000.00'),
(63, 'Business', '800.00'),
(63, 'Economy', '400.00'),
(63, 'Platinum', '1000.00'),
(64, 'Business', '800.00'),
(64, 'Economy', '400.00'),
(64, 'Platinum', '1000.00'),
(65, 'Business', '800.00'),
(65, 'Economy', '400.00'),
(65, 'Platinum', '1000.00'),
(66, 'Business', '800.00'),
(66, 'Economy', '400.00'),
(66, 'Platinum', '1000.00');

INSERT INTO `passenger` (`passenger_id`, `name`, `dob`, `address`)
VALUES ('A0000001', 'Kabilan Mahathevan', '1999-03-25', 'No. 45/60, Thirunavatkulam, Vavuniya, Sri Lanka'),
       ('A0000002', 'Jathavan Mahendrarajah', '2000-01-05', 'No. 36/1, 3rd lane, Pandarikulam, Vavuniya, Srilanka'),
       ('A0000003', 'John Wick', '2006-03-07', '112 Lower Horseshoe, Mill Neck, New York City, New York, USA.'),
       ('A0000004', 'Leonardo DiCaprio', '1974-11-11', 'Suite 615, West Hollywood, CA 90069 USA'),
       ('A0000005', 'Kate Winslet', '2006-10-05', 'Drury House, 34-43 Russell Street London, WC2B5HA, United Kingdom'),
       ('A0000006', 'Quentin Tarantino', '1963-03-27',
        '601 Wilshire Blvd. 3rd Floor Beverly Hills, CA 90210-5213. USA'),
       ('A0000007', 'Mahinda Rajapaksa', '1945-11-18', 'No. 117, Wijerama Mawatha, Colombo 07, Sri Lanka'),
       ('A0000008', 'Gotabaya Rajapaksa', '2004-06-20',
        'No. 26/A, Pangiriwatta Mawatha, Mirihana, Nugegoda, Sri Lanka'),
       ('A0000009', 'Basil Rajapaksa', '2008-04-27', 'No. 1316, Jayanthipura, Nelum Mawatha, Battaramulla, Sri Lanka'),
       ('A0000010', 'Goran Peterson', '2010-04-10', 'No. 15, Lotus Avenue, Helineski, Finland'),
       ('A0000011', 'Arifullah Khan', '2015-04-10', 'No. 1516, Havelok street, Stockholm, Sweden'),
       ('A0000012', 'Andrew Ferdinan', '2000-01-01', 'No.12, 1st Cross Street, Mannar'),
       ('A00000123', 'Tharsha', '2000-01-06', 'No 679/34, Velikulam, Vavuniya'),
       ('A00000124', 'Lakshiga', '2005-10-25', 'No. 59, Nelliyadi East, Karaveddi, Jaffna, Sri Lanka.'),
       ('A00000126', 'Nifla', '2000-01-01', 'No. 112, Halatuttne, Haldummulla, Badulla, Sri Lanka'),
       ('A0000031', 'Poogitha', '1999-03-31', 'No. 353/8G, Mannar Road, Veppankulam, Vavuniya, Sri Lanka');

INSERT INTO `ticket` ( `user_id`, `passenger_id`, `flight_id`, `seat_number`, `date`, `class`, `paid`,
                      `status`)
VALUES (4, 'A00000123', 6, '6', '2022-07-06 22:19:01', 'Economy', '380.00', 1),
       (4, 'A0000001', 6, '84', '2022-07-06 22:23:48', 'Business', '760.00', 1),
       (4, 'A0000012', 6, '145', '2022-07-06 22:25:41', 'Platinum', '950.00', 1),
       (-1, 'A0000002', 6, '13', '2022-07-06 22:26:33', 'Economy', '400.00', 1),
       (-1, 'A0000003', 6, '90', '2022-07-06 22:27:45', 'Business', '800.00', 1),
       (-1, 'A0000004', 6, '150', '2022-07-06 22:28:45', 'Platinum', '1000.00', 1),
       (5, 'A0000005', 6, '10', '2022-07-06 22:33:20', 'Economy', '400.00', 1),
       (5, 'A0000006', 6, '108', '2022-07-06 22:34:39', 'Business', '800.00', 1),
       (5, 'A0000007', 6, '162', '2022-07-06 22:35:43', 'Platinum', '1000.00', 1),
       (3, 'A0000008', 6, '19', '2022-07-06 22:37:43', 'Economy', '364.00', 1),
       (3, 'A0000009', 6, '125', '2022-07-06 22:38:17', 'Business', '728.00', 1),
       (3, 'A0000010', 6, '157', '2022-07-06 22:39:49', 'Platinum', '910.00', 1),
       (3, 'A0000001', 7, '13', '2022-07-06 22:54:09', 'Economy', '364.00', 1),
       (3, 'A0000002', 7, '83', '2022-07-06 22:54:59', 'Business', '728.00', 1),
       (3, 'A0000003', 7, '139', '2022-07-06 22:55:37', 'Platinum', '910.00', 1),
       (4, 'A0000004', 7, '10', '2022-07-06 22:57:07', 'Economy', '380.00', 1),
       (4, 'A0000005', 7, '90', '2022-07-06 22:57:45', 'Business', '760.00', 1),
       (4, 'A0000006', 7, '150', '2022-07-06 22:58:47', 'Platinum', '950.00', 1),
       (5, 'A0000008', 7, '20', '2022-07-06 23:00:25', 'Economy', '400.00', 1),
       (5, 'A0000009', 7, '80', '2022-07-06 23:01:04', 'Business', '800.00', 1),
       (5, 'A0000010', 7, '145', '2022-07-06 23:01:43', 'Platinum', '1000.00', 1),
       (-1, 'A00000124', 7, '7', '2022-07-06 23:06:25', 'Economy', '400.00', 1),
       (-1, 'A0000031', 7, '144', '2022-07-06 23:08:11', 'Platinum', '1000.00', 1),
       (-1, 'A00000126', 7, '120', '2022-07-06 23:10:27', 'Business', '800.00', 1),
       (4, 'A0000011', 1, '16', '2022-06-06 22:19:01', 'Economy', '380.00', 1),
       (4, 'A0000001', 1, '84', '2022-06-07 22:23:48', 'Business', '760.00', 1),
       (4, 'A0000012', 1, '145', '2022-06-08 22:25:41', 'Platinum', '950.00', 1),
       (-1, 'A0000002', 1, '13', '2022-06-10 22:26:33', 'Economy', '400.00', 1),
       (-1, 'A0000003', 1, '90', '2022-06-11 22:27:45', 'Business', '800.00', 1),
       (-1, 'A0000004', 1, '150', '2022-06-18 22:28:45', 'Platinum', '1000.00', 1),
       (5, 'A0000005', 1, '10', '2022-06-26 22:33:20', 'Economy', '400.00', 1),
       (5, 'A0000006', 1, '108', '2022-06-27 22:34:39', 'Business', '800.00', 1),
       (5, 'A0000007', 1, '162', '2022-07-03 22:35:43', 'Platinum', '1000.00', 1),
       (3, 'A0000008', 1, '19', '2022-06-19 22:37:43', 'Economy', '364.00', 1),
       (3, 'A0000009', 1, '125', '2022-07-02 22:38:17', 'Business', '728.00', 1),
       (3, 'A0000010', 1, '157', '2022-07-01 22:39:49', 'Platinum', '910.00', 1),
       (3, 'A0000001', 2, '13', '2022-06-16 22:54:09', 'Economy', '364.00', 1),
       (3, 'A0000002', 2, '83', '2022-06-26 22:54:59', 'Business', '728.00', 1),
       (3, 'A0000003', 2, '139', '2022-06-23 22:55:37', 'Platinum', '910.00', 1),
       (4, 'A0000004', 2, '10', '2022-07-03 22:57:07', 'Economy', '380.00', 1),
       (4, 'A0000005', 2, '90', '2022-07-02 22:57:45', 'Business', '760.00', 1),
       (4, 'A0000006', 2, '150', '2022-06-15 22:58:47', 'Platinum', '950.00', 1),
       (5, 'A0000008', 2, '20', '2022-06-19 23:00:25', 'Economy', '400.00', 1),
       (5, 'A0000009', 2, '80', '2022-06-21 23:01:04', 'Business', '800.00', 1),
       (5, 'A0000010', 2, '145', '2022-06-29 23:01:43', 'Platinum', '1000.00', 1),
       (-1, 'A00000124', 2, '7', '2022-06-28 23:06:25', 'Economy', '400.00', 1),
       (-1, 'A0000011', 2, '144', '2022-06-16 23:08:11', 'Platinum', '1000.00', 1),
       (-1, 'A00000123', 2, '120', '2022-06-06 23:10:27', 'Business', '800.00', 1),
       (4, 'A00000123', 19, '6', '2022-07-06 22:19:01', 'Economy', '380.00', 1),
       (4, 'A0000001', 19, '84', '2022-07-10 22:23:48', 'Business', '760.00', 1),
       (4, 'A0000012', 19, '145', '2022-07-07 22:25:41', 'Platinum', '950.00', 1),
       (-1, 'A0000002', 19, '13', '2022-07-08 22:26:33', 'Economy', '400.00', 1),
       (-1, 'A0000003', 19, '90', '2022-07-09 22:27:45', 'Economy', '400.00', 1),
       (-1, 'A0000004', 19, '150', '2022-07-11 22:28:45', 'Economy', '400.00', 1),
       (5, 'A0000005', 19, '10', '2022-07-12 22:33:20', 'Economy', '400.00', 1),
       (5, 'A0000006', 19, '108', '2022-07-01 22:34:39', 'Business', '800.00', 1),
       (5, 'A0000007', 19, '162', '2022-07-02 22:35:43', 'Economy', '400.00', 1),
       (3, 'A0000008', 19, '19', '2022-07-03 22:37:43', 'Economy', '364.00', 1),
       (3, 'A0000009', 19, '125', '2022-07-04 22:38:17', 'Business', '728.00', 1),
       (3, 'A0000010', 19, '157', '2022-06-26 22:39:49', 'Platinum', '910.00', 1),
       (3, 'A0000001', 14, '13', '2022-06-22 22:54:09', 'Business', '728.00', 1),
       (3, 'A0000002', 14, '83', '2022-06-28 22:54:59', 'Business', '728.00', 1),
       (3, 'A0000003', 14, '139', '2022-06-15 22:55:37', 'Platinum', '910.00', 1),
       (4, 'A0000004', 14, '10', '2022-07-06 22:57:07', 'Economy', '380.00', 1),
       (4, 'A0000005', 14, '90', '2022-07-07 22:57:45', 'Business', '760.00', 1),
       (4, 'A0000006', 14, '150', '2022-07-08 22:58:47', 'Platinum', '950.00', 1),
       (5, 'A0000008', 14, '20', '2022-07-09 23:00:25', 'Economy', '400.00', 1),
       (5, 'A0000009', 14, '80', '2022-07-10 23:01:04', 'Business', '800.00', 1),
       (5, 'A0000010', 14, '145', '2022-07-11 23:01:43', 'Economy', '400.00', 1),
       (-1, 'A00000124', 14, '7', '2022-07-12 23:06:25', 'Economy', '400.00', 1),
       (-1, 'A0000031', 14, '144', '2022-07-13 23:08:11', 'Platinum', '1000.00', 1),
       (-1, 'A00000126', 14, '120', '2022-06-30 23:10:27', 'Business', '800.00', 1),
       (4, 'A0000011', 10, '16', '2022-06-06 22:19:01', 'Economy', '380.00', 1),
       (4, 'A0000001', 10, '84', '2022-06-07 22:23:48', 'Business', '760.00', 1),
       (4, 'A0000012', 10, '145', '2022-06-08 22:25:41', 'Platinum', '950.00', 1),
       (-1, 'A0000002', 10, '13', '2022-06-10 22:26:33', 'Economy', '400.00', 1),
       (-1, 'A0000003', 10, '90', '2022-06-11 22:27:45', 'Business', '800.00', 1),
       (-1, 'A0000004', 10, '150', '2022-06-18 22:28:45', 'Platinum', '1000.00', 1),
       (5, 'A0000005', 10, '10', '2022-06-26 22:33:20', 'Economy', '400.00', 1),
       (5, 'A0000006', 10, '108', '2022-06-27 22:34:39', 'Economy', '400.00', 1),
       (5, 'A0000007', 10, '162', '2022-07-03 22:35:43', 'Platinum', '1000.00', 1),
       (3, 'A0000008', 10, '19', '2022-06-19 22:37:43', 'Business', '728.00', 1),
       (3, 'A0000009', 10, '125', '2022-07-12 22:38:17', 'Business', '728.00', 1),
       (3, 'A0000010', 10, '157', '2022-07-14 22:39:49', 'Platinum', '910.00', 1),
       (3, 'A0000001', 21, '13', '2022-07-04 22:54:09', 'Economy', '364.00', 1),
       (3, 'A0000002', 21, '83', '2022-06-26 22:54:59', 'Business', '728.00', 1),
       (3, 'A0000003', 21, '139', '2022-06-23 22:55:37', 'Platinum', '910.00', 1),
       (4, 'A0000004', 21, '10', '2022-07-03 22:57:07', 'Economy', '380.00', 1),
       (4, 'A0000005', 21, '90', '2022-07-02 22:57:45', 'Platinum', '950.00', 1),
       (4, 'A0000006', 21, '150', '2022-06-15 22:58:47', 'Platinum', '950.00', 1),
       (5, 'A0000008', 21, '20', '2022-06-19 23:00:25', 'Economy', '400.00', 1),
       (5, 'A0000009', 21, '80', '2022-06-21 23:01:04', 'Business', '800.00', 1),
       (5, 'A0000010', 21, '145', '2022-06-29 23:01:43', 'Platinum', '1000.00', 1),
       (-1, 'A00000124', 21, '7', '2022-06-28 23:06:25', 'Economy', '400.00', 1),
       (-1, 'A0000011', 21, '144', '2022-06-16 23:08:11', 'Platinum', '1000.00', 1),
       (-1, 'A00000123', 21, '120', '2022-06-06 23:10:27', 'Economy', '400.00', 1),
       (4, 'A00000123', 17, '6', '2022-07-06 22:19:01', 'Economy', '380.00', 1),
       (4, 'A0000001', 17, '84', '2022-07-10 22:23:48', 'Business', '760.00', 1),
       (4, 'A0000012', 17, '145', '2022-07-07 22:25:41', 'Platinum', '950.00', 1),
       (-1, 'A0000002', 17, '13', '2022-07-08 22:26:33', 'Economy', '400.00', 1),
       (-1, 'A0000003', 17, '90', '2022-07-09 22:27:45', 'Economy', '400.00', 1),
       (-1, 'A0000004', 17, '150', '2022-07-11 22:28:45', 'Economy', '400.00', 1),
       (5, 'A0000005', 17, '10', '2022-07-12 22:33:20', 'Economy', '400.00', 1),
       (5, 'A0000006', 17, '108', '2022-07-01 22:34:39', 'Business', '800.00', 1),
       (5, 'A0000007', 17, '162', '2022-07-02 22:35:43', 'Economy', '400.00', 1),
       (3, 'A0000008', 17, '19', '2022-07-13 22:37:43', 'Economy', '364.00', 1),
       (3, 'A0000009', 17, '125', '2022-07-14 22:38:17', 'Business', '728.00', 1),
       (3, 'A0000010', 17, '157', '2022-06-26 22:39:49', 'Platinum', '910.00', 1),
       (3, 'A0000001', 9, '13', '2022-06-22 22:54:09', 'Business', '728.00', 1),
       (3, 'A0000002', 9, '83', '2022-06-28 22:54:59', 'Business', '728.00', 1),
       (3, 'A0000003', 9, '139', '2022-06-15 22:55:37', 'Platinum', '910.00', 1),
       (4, 'A0000004', 9, '10', '2022-07-06 22:57:07', 'Economy', '380.00', 1),
       (4, 'A0000005', 9, '90', '2022-07-07 22:57:45', 'Business', '760.00', 1),
       (4, 'A0000006', 9, '150', '2022-07-08 22:58:47', 'Platinum', '950.00', 1),
       (5, 'A0000008', 9, '20', '2022-07-09 23:00:25', 'Economy', '400.00', 1),
       (5, 'A0000009', 9, '80', '2022-07-10 23:01:04', 'Business', '800.00', 1),
       (5, 'A0000010', 9, '145', '2022-07-11 23:01:43', 'Economy', '400.00', 1),
       (-1, 'A00000124', 9, '7', '2022-07-12 23:06:25', 'Economy', '400.00', 1),
       (-1, 'A0000031', 9, '144', '2022-07-13 23:08:11', 'Platinum', '1000.00', 1),
       (4, 'A0000011', 8, '16', '2022-06-06 22:19:01', 'Economy', '380.00', 1),
       (4, 'A0000001', 8, '84', '2022-06-07 22:23:48', 'Business', '760.00', 1),
       (4, 'A0000012', 8, '145', '2022-06-08 22:25:41', 'Platinum', '950.00', 1),
       (-1, 'A0000002', 8, '13', '2022-06-10 22:26:33', 'Economy', '400.00', 1),
       (-1, 'A0000003', 8, '90', '2022-06-11 22:27:45', 'Business', '800.00', 1),
       (-1, 'A0000004', 8, '150', '2022-06-18 22:28:45', 'Platinum', '1000.00', 1),
       (5, 'A0000005', 8, '10', '2022-06-26 22:33:20', 'Economy', '400.00', 1),
       (5, 'A0000006', 8, '108', '2022-06-27 22:34:39', 'Economy', '400.00', 1),
       (5, 'A0000007', 8, '162', '2022-07-03 22:35:43', 'Platinum', '1000.00', 1),
       (3, 'A0000008', 8, '19', '2022-06-19 22:37:43', 'Business', '728.00', 1),
       (3, 'A0000009', 8, '125', '2022-07-12 22:38:17', 'Business', '728.00', 1),
       (3, 'A0000010', 8, '157', '2022-07-14 22:39:49', 'Platinum', '910.00', 1),
       (3, 'A0000003', 5, '139', '2022-06-23 22:55:37', 'Platinum', '910.00', 1),
       (4, 'A0000004', 5, '10', '2022-07-03 22:57:07', 'Economy', '380.00', 1),
       (4, 'A0000005', 5, '90', '2022-07-02 22:57:45', 'Platinum', '950.00', 1),
       (4, 'A0000006', 5, '150', '2022-06-15 22:58:47', 'Platinum', '950.00', 1),
       (5, 'A0000008', 5, '20', '2022-06-19 23:00:25', 'Economy', '400.00', 1),
       (5, 'A0000009', 5, '80', '2022-06-21 23:01:04', 'Business', '800.00', 1),
       (5, 'A0000010', 5, '145', '2022-06-29 23:01:43', 'Platinum', '1000.00', 1),
       (-1, 'A00000124', 5, '7', '2022-06-28 23:06:25', 'Economy', '400.00', 1),
       (-1, 'A0000011', 5, '144', '2022-06-16 23:08:11', 'Platinum', '1000.00', 1),
       (-1, 'A00000123', 5, '120', '2022-06-06 23:10:27', 'Economy', '400.00', 1);

       