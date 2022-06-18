drop database if exists test_bairways;
create database test_bairways;

use test_bairways;
SET foreign_key_checks = 'ON';

CREATE TABLE aircraft (
                          aircraft_id int auto_increment,
                          tail_number varchar(10) unique NOT NULL,
                          model varchar(50) NOT NULL,
                          Economy_seats int DEFAULT NULL check (Economy_seats > 0),
                          Business_seats int DEFAULT NULL check (Business_seats > 0),
                          Platinum_seats int DEFAULT NULL check (Platinum_seats > 0),
                          primary key(aircraft_id)
);

-- tail numbers from https://www.planespotters.net/country/operators/Indonesia

INSERT INTO `aircraft` (`tail_number`,`model`, `Economy_seats`, `Business_seats`, `Platinum_seats`) VALUES
                                                                                                        ('PK-MGI', 'Boeing 737', 50, 50, 26),
                                                                                                        ('PK-MGZ', 'Boeing 737', 50, 50, 26),
                                                                                                        ('PK-YGH', 'Boeing 737', 50, 50, 26),
                                                                                                        ('PK-YGV', 'Boeing 757', 70, 60, 32),
                                                                                                        ('PK-YGW', 'Boeing 757', 70, 60, 32),
                                                                                                        ('PK-LBW', 'Boeing 757', 70, 60, 32),
                                                                                                        ('PK-LBZ', 'Boeing 757', 70, 60, 32),
                                                                                                        ('PK-LUV', 'Airbus A380', 200, 200, 125);

CREATE TABLE airport (
                         airport_id int NOT NULL auto_increment,
                         code char(3) NOT NULL unique,
                         name varchar(50) NOT NULL,
                         location int NOT NULL,
                         primary key(airport_id)
);

INSERT INTO airport (code, name, location) VALUES
                                               ('CGK', 'Soekarno-Hatta International Airport', 1),
                                               ('DPS', 'Ngurah Rai International Airport', 4),
                                               ('BIA', 'Bandaranaike International Airport', 6),
                                               ('HRI', 'Mattala international airport', 8),
                                               ('DEL', 'Indira Gandhi International Airport', 9),
                                               ('BOM', 'Chhatrapati Shivaji Maharaj International Airport', 11),
                                               ('MAA', 'Chennai International Airport', 13),
                                               ('BKK', 'Suvarnabhumi Airport', 15),
                                               ('DMK', 'Don Mueang International Airport', 18),
                                               ('SIN', 'Singapore Changi Airport', 20);


CREATE TABLE `discount` (
                            `type` varchar(20) NOT NULL,
                            `discount` decimal(4,2) DEFAULT NULL CHECK (`discount` >= 0 and `discount` <= 100),
                            primary key (type)
);

INSERT INTO `discount` (`type`, `discount`) VALUES
                                                ('Frequent', '5.00'),
                                                ('Gold', '9.00');

CREATE TABLE `route` (
                         `route_id` int NOT NULL auto_increment,
                         `origin` int NOT NULL,
                         `destination` int NOT NULL,
                         primary key(route_id),
                         constraint foreign key(origin) references airport(airport_id),
                         constraint foreign key(destination) references airport(airport_id),
                         constraint unique(origin, destination)
);

INSERT INTO `route` (`origin`, `destination`) VALUES
                                                  (1, 2),
                                                  (1, 3),
                                                  ( 1, 4),
                                                  (1, 5),
                                                  (1, 6),
                                                  (1, 7),
                                                  (1, 8),
                                                  (1, 9),
                                                  (1, 10),
                                                  (2, 1),
                                                  (2, 3),
                                                  (2, 4),
                                                  (2, 5),
                                                  (2, 6),
                                                  (2, 7),
                                                  (2, 8),
                                                  (2, 9),
                                                  (2, 10),
                                                  (3, 1),
                                                  (3, 2),
                                                  (3, 4),
                                                  (3, 5),
                                                  (3, 6),
                                                  (3, 7),
                                                  (3, 8),
                                                  (3, 9),
                                                  (3, 10),
                                                  (4, 1),
                                                  (4, 2),
                                                  ( 4, 3),
                                                  (4, 5),
                                                  (4, 6),
                                                  (4, 7),
                                                  (4, 8),
                                                  (4, 9),
                                                  (4, 10),
                                                  (5, 1),
                                                  (5, 2),
                                                  (5, 3),
                                                  (5, 4),
                                                  (5, 6),
                                                  (5, 7),
                                                  (5, 8),
                                                  (5, 9),
                                                  (5, 10),
                                                  (6, 1),
                                                  (6, 2),
                                                  (6, 3),
                                                  (6, 4),
                                                  (6, 5),
                                                  (6, 7),
                                                  (6, 8),
                                                  (6, 9),
                                                  (6, 10),
                                                  (7, 1),
                                                  (7, 2),
                                                  (7, 3),
                                                  (7, 4),
                                                  (7, 5),
                                                  (7, 6),
                                                  (7, 8),
                                                  (7, 9),
                                                  (7, 10),
                                                  (8, 1),
                                                  (8, 2),
                                                  (8, 3),
                                                  (8, 4),
                                                  (8, 5),
                                                  (8, 6),
                                                  (8, 7),
                                                  (8, 9),
                                                  (8, 10),
                                                  (9, 1),
                                                  (9, 2),
                                                  (9, 3),
                                                  (9, 4),
                                                  (9, 5),
                                                  (9, 6),
                                                  (9, 7),
                                                  (9, 8),
                                                  (9, 10),
                                                  (10, 1),
                                                  (10, 2),
                                                  (10, 3),
                                                  (10, 4),
                                                  (10, 5),
                                                  (10, 6),
                                                  (10, 7),
                                                  (10, 8),
                                                  (10, 9);

CREATE TABLE `flight` (
  `flight_id` int NOT NULL auto_increment,
  `aircraft_id` int NOT NULL references aircraft.aircraft_id,
  `route_id` int NOT NULL references route.route_id,
  `takeoff_time` datetime NOT NULL,
  `departure_time` datetime NOT NULL,
  is_active tinyint default 1,
  primary key(flight_id),
  constraint foreign key (aircraft_id) references aircraft(aircraft_id) on delete cascade on update cascade,
  constraint foreign key (route_id) references route(route_id) on delete cascade on update cascade
) ;

INSERT INTO `flight` (`aircraft_id`, `route_id`, `takeoff_time`, `departure_time`) VALUES
                                                                                       (1, 2, '2022-04-24 10:25:00', '2022-04-24 13:35:00'),
                                                                                       (8, 1, '2022-04-24 08:00:00', '2022-04-24 11:00:00'),
                                                                                       (2, 3, '2022-04-25 13:27:07', '2022-04-25 16:27:07'),
                                                                                       (4, 4, '2022-04-25 13:35:00', '2022-04-25 16:31:14'),
                                                                                       (5, 6, '2022-04-26 07:35:00', '2022-04-26 09:30:00'),
                                                                                       (6, 14, '2022-04-26 20:00:00', '2022-04-26 22:00:00'),
                                                                                       (1, 16, '2022-04-27 06:30:00', '2022-04-27 09:30:00'),
                                                                                       (2, 20, '2022-04-27 15:00:00', '2022-04-27 16:30:00'),
                                                                                       (8, 23, '2022-04-28 02:30:00', '2022-04-28 04:00:00'),
                                                                                       (3, 30, '2022-04-28 22:00:00', '2022-04-28 23:40:00'),
                                                                                       (4, 40, '2022-04-29 10:40:00', '2022-04-29 12:40:00'),
                                                                                       (5, 45, '2022-04-29 01:00:00', '2022-04-29 02:30:00'),
                                                                                       (7, 76, '2022-04-30 18:00:00', '2022-04-30 20:00:00'),
                                                                                       (8, 86, '2022-04-30 22:44:00', '2022-04-30 23:44:00');


CREATE TABLE `flight_cost` (
  `flight_id` int NOT NULL references flight.flight_id,
  `class` varchar(10) NOT NULL CHECK (`class` in ('platinum','business','economy')),
  `cost` decimal(10,2) NOT NULL,
  primary key( flight_id, class),
  constraint foreign key (flight_id ) references flight(flight_id) on delete cascade on update cascade
) ;

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
                                                             (14, 'Platinum', '1000.00');


CREATE TABLE `passenger` (
                             `passenger_id` varchar(25) NOT NULL,
                             `name` varchar(150) NOT NULL,
                             `dob` date NOT NULL,
                             `address` varchar(255) NOT NULL,
                             primary key(passenger_id)
); -- need to include passport number?

INSERT INTO `passenger` (`passenger_id`, `name`, `dob`, `address`) VALUES
                                                                       ('A0000001', 'Kabilan Mahathevan', '1999-03-25', 'No. 45/60, Thirunavatkulam, Vavuniya, Sri Lanka'),
                                                                       ('A0000002', 'Jathavan Mahendrarajah', '2000-01-05', 'No. 36/1, 3rd lane, Pandarikulam, Vavuniya, Srilanka'),
                                                                       ('A0000003', 'John Wick', '1987-03-07', '112 Lower Horseshoe, Mill Neck, New York City, New York, USA.'),
                                                                       ('A0000004', 'Leonardo DiCaprio', '1974-11-11', 'Suite 615, West Hollywood, CA 90069 USA'),
                                                                       ('A0000005', 'Kate Winslet', '1975-10-05', 'Drury House, 34-43 Russell Street London, WC2B5HA, United Kingdom'),
                                                                       ('A0000006', 'Quentin Tarantino', '1963-03-27', '601 Wilshire Blvd. 3rd Floor Beverly Hills, CA 90210-5213. USA'),
                                                                       ('A0000007', 'Mahinda Rajapaksa', '1945-11-18', 'No. 117, Wijerama Mawatha, Colombo 07, Sri Lanka'),
                                                                       ('A0000008', 'Gotabaya Rajapaksa', '1948-06-20', 'No. 26/A, Pangiriwatta Mawatha, Mirihana, Nugegoda, Sri Lanka'),
                                                                       ('A0000009', 'Basil Rajapaksa', '1951-04-27', 'No. 1316, Jayanthipura, Nelum Mawatha, Battaramulla, Sri Lanka'),
                                                                       ('A0000010', 'Goran Peterson', '2010-04-10', 'No. 15, Lotus Avenue, Helineski, Finland'),
                                                                       ('A0000011', 'Arifullah Khan', '2015-04-10', 'No. 1516, Havelok street, Stockholm, Sweden');


CREATE TABLE port_location (
                               id int NOT NULL auto_increment,
                               location varchar(50) NOT NULL unique,
                               primary key(id)
);

INSERT INTO port_location (location) VALUES
                                         ('Tangerang City'),
                                         ('Banten'),
                                         ('Indonesia'),
                                         ('Kabupaten Badung'),
                                         ('Bali'),
                                         ('Katunayake'),
                                         ('Sri Lanka'),
                                         ('Hambantota'),
                                         ('Delhi'),
                                         ('India'),
                                         ('Mumbai'),
                                         ('Maharashtra'),
                                         ('Chennai'),
                                         ('Tamil Nadu'),
                                         ('Bang Phli District'),
                                         ('Samut Prakan'),
                                         ('Thailand'),
                                         ('Don Mueang'),
                                         ('Bangkok'),
                                         ('Airport Blvd.'),
                                         ('Singapore');

create table parent_location (
	id int unique ,
    parent_id int ,
    primary key(id, parent_id),
    constraint foreign key(id) references port_location(id) on update cascade on delete cascade,
    constraint foreign key(parent_id) references port_location(id) on update cascade on delete cascade
);
-- id set to unique as no location can have multiple parents

INSERT INTO parent_location VALUES
                                (1, 2),
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
                                (20, 21)
;

CREATE TABLE `sessions` (
                            `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
                            `expires` int UNSIGNED NOT NULL,
                            `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
                            primary key( session_id)
);

CREATE TABLE `user` (
  `user_id` int NOT NULL auto_increment,
  `email` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `role` varchar(30) NOT NULL CHECK (`role` in ('moderator','clerk','user','guest')),
  `discount_type` varchar(20) DEFAULT NULL references discount.type,
  `is_active` tinyint DEFAULT NULL,
  `dob` date NOT NULL,
  primary key(user_id),
  constraint foreign key(discount_type) references discount(type) on update cascade on delete set null
);


INSERT INTO `user` (`email`, `password`, `first_name`, `last_name`, `role`, `discount_type`, `is_active`, `dob`) VALUES
                                                                                                                     ('test1_mod@gmail.com', '$2b$09$tkU0Te8xv98Ivor4Nxv7gOqoHc6GVCxn3gXz/iJKox8y.TjZRxBXy', 'mod1', 'mod1', 'moderator', NULL, 1, '1987-03-07'),
                                                                                                                     ('test1_clr@gmail.com', '$2b$09$.nb0aGqTmcW6XoMH.u6JZeZ63GEJpvtaNx7XepSWqoMOwb2i1rrPe', 'clr_1', 'clr_1', 'clerk', NULL, 1, '1963-03-27'),
                                                                                                                     ('test1_usr@gmail.com', '$2b$09$/G0kHfffgFWyjrgBu8keYuMS2KSAoMu62NxunfCCyfcJHlmrUq.pK', 'usr_1', 'usr_1', 'user', 'gold', NULL, '2000-01-05');

CREATE TABLE `ticket` (
      `ticket_id` int NOT NULL auto_increment,
      `user_id` int DEFAULT NULL,
      `passenger_id` varchar(25) NOT NULL,
      `flight_id` int NOT NULL,
      `seat_number` varchar(5) NOT NULL,
      `date` datetime NOT NULL,
      `class` varchar(10) NOT NULL,
      `paid` decimal(10,2) NOT NULL,
      `status` tinyint NOT NULL DEFAULT 1,
      `is_boarded` tinyint DEFAULT NULL,
      primary key(ticket_id),
      constraint foreign key(user_id) references user(user_id) on update cascade on delete set null,
      constraint foreign key(passenger_id) references passenger(passenger_id) on update cascade on delete cascade,
      constraint foreign key(flight_id,class) references flight_cost(flight_id,class) on update cascade on delete cascade,
      constraint unique(passenger_id, flight_id),
      constraint unique(flight_id, seat_number)
);

insert into ticket(user_id, passenger_id, flight_id, seat_number, date, class, paid, status, is_boarded) VALUES (1, 'A0000001', 11, 10, '2022-06-14', 'Economy', '400.00',2, 0 );
insert into ticket(user_id, passenger_id, flight_id, seat_number, date, class, paid, status, is_boarded) VALUES (1, 'A0000002', 11, 11, '2022-06-14', 'Economy', '400.00',1, 0 );
insert into ticket(user_id, passenger_id, flight_id, seat_number, date, class, paid, status, is_boarded) VALUES (1, 'A0000003', 11, 12, '2022-06-14', 'Economy', '400.00',2, 0 );

create view port_location_with_parent as
select * from port_location left outer join parent_location using(id);

delimiter $$
create function get_location(location_id int)
    returns varchar(1000) deterministic
begin
    declare loc varchar(1000);
    declare temp_s varchar(100);
    declare temp_id1 int;
    declare temp_id2 int;

    set temp_id1 = location_id;

    repeat
        select location, parent_id into temp_s, temp_id2
        from port_location_with_parent
        where id = temp_id1;
        set temp_id1 = temp_id2;
        if isnull(loc) then
            set loc = temp_s;
        else
            set loc = concat(loc,', ',temp_s);
        end if;
    until isnull(temp_id1)
        end repeat;
    return loc;

end$$

delimiter ;

create view airport_locations as
select airport_id as id, code, name, get_location(location) as location from airport;

CREATE FUNCTION SPLIT_STR(
    x VARCHAR(255),
    delim VARCHAR(12),
    pos INT
)
    RETURNS VARCHAR(255) deterministic
    RETURN REPLACE(SUBSTRING(SUBSTRING_INDEX(x, delim, pos),
                             LENGTH(SUBSTRING_INDEX(x, delim, pos -1)) + 1),
                   delim, '');

delimiter $$
create procedure add_port_location(location_str varchar(1000), num int)
begin
    declare i int;
    declare parent int;
    declare current_id int;
    declare iter_count int;
    declare temp_loc varchar(100);

    drop temporary table if exists temp_data;
    create temporary table temp_data (id int auto_increment primary key, loc varchar(100), loc_parent int);

    set i = num;
    while ( i > 0) do
            select SPLIT_STR(location_str, ',', i) into temp_loc;
            select count(id) into parent from port_location where location = temp_loc;
            if parent = 0 then
                start transaction;
                insert into port_location (location) values (temp_loc);
                select last_insert_id() into parent;
                commit;
            else
                select id into parent from port_location where location = temp_loc;
            end if;
            insert into temp_data(loc, loc_parent) values (temp_loc, parent);
            set i = i-1;
        end while;

    select count(*) into iter_count from temp_data;

    set i = 1;
    while iter_count > i do
            select loc_parent into current_id from temp_data where id = i+1;
            select loc_parent into parent from temp_data where id = i;
            insert ignore into parent_location ( id, parent_id) values ( current_id, parent);
            set i = i + 1;
        end while;

    drop temporary table temp_data;

end$$
delimiter ;

delimiter $$

create procedure add_airport(code char(3), name varchar(50), locations varchar(1000), num int)
begin
    declare loc varchar(100);
    declare loc_id int;
    call add_port_location(locations, num);

    select SPLIT_STR(locations, ',', 1) into loc;
    -- select loc;
    select id into loc_id from port_location where location = loc;
    insert into airport(code, name, location) values (code, name, loc_id);
end $$
delimiter ;

-- discount procedure
DELIMITER //

create procedure UpdateDiscount(gold float,frequent float)
BEGIN

    IF gold >= 0 THEN
        UPDATE discount SET discount = gold WHERE type = 'Gold' ;
    END IF;

    IF frequent >= 0 THEN
        UPDATE discount SET discount = frequent WHERE type = 'Frequent';
    END IF;
END//
DELIMITER ;

delimiter $$
create function get_Economy_seats(fli_id int) 
returns varchar(3000) deterministic
begin
	declare seats varchar(3000);
    declare seat_num int;
    declare counter int;
    declare id int;
    declare craft_id int;
    
    set counter = 0;
    select aircraft_id into craft_id from flight where flight_id = fli_id limit 1;
    select Economy_seats into seat_num from aircraft where aircraft_id = craft_id limit 1;
    repeat
		set counter = counter +1;
        if not exists (select ticket_id from ticket where flight_id = fli_id and seat_number=counter and class='Economy' limit 1) then
			if(isnull(seats)) then
				set seats=counter;
			else
				set seats = concat(seats, '-', counter);
			end if;
		end if;
	until counter >= seat_num
    end repeat;
	return seats;
end$$

delimiter ;

delimiter $$
create function get_Business_seats(fli_id int) 
returns varchar(3000) deterministic
begin
	declare seats varchar(3000);
    declare seat_num int;
    declare counter int;
    declare id int;
    declare economy int;
    declare craft_id int;
    
    select aircraft_id into craft_id from flight where flight_id = fli_id limit 1;
    select Business_seats into seat_num from aircraft where aircraft_id = craft_id limit 1;
    select Economy_seats into economy from aircraft where aircraft_id = craft_id limit 1;
    set counter = economy;
    repeat
		set counter = counter +1;
        if not exists (select ticket_id from ticket where flight_id = fli_id and seat_number=counter and class='Business' limit 1) then
			if(isnull(seats)) then
				set seats=counter;
			else
				set seats = concat(seats, '-', counter);
			end if;
		end if;
	until counter >= (seat_num + economy)
    end repeat;
	return seats;
end$$

delimiter ;

delimiter $$
create function get_Platinum_seats(fli_id int) 
returns varchar(3000) deterministic
begin
	declare seats varchar(3000);
    declare seat_num int;
    declare counter int;
    declare id int;
    declare economy int;
    declare business int;
    declare craft_id int;
    
    select aircraft_id into craft_id from flight where flight_id = fli_id; 
    select Platinum_seats into seat_num from aircraft where aircraft_id = craft_id limit 1;
    select Economy_seats into economy from aircraft where aircraft_id = craft_id limit 1;
    select Business_seats into business from aircraft where aircraft_id = craft_id limit 1;
    set counter = economy + business;
    repeat
		set counter = counter +1;
        if not exists (select ticket_id from ticket where flight_id = fli_id and seat_number=counter and class='Platinum' limit 1) then
			if(isnull(seats)) then
				set seats=counter;
			else
				set seats = concat(seats, '-', counter);
			end if;
		end if;
	until counter >= (seat_num + economy + business)
    end repeat;
	return seats;
end$$

delimiter ;

delimiter //
create procedure book_ticket
(
IN passenger_id_in VARCHAR(25), 
IN name_in VARCHAR(150), 
IN dob_in DATE, 
IN address_in VARCHAR(255), 
IN user_id_in INT, 
IN flight_id_in INT, 
IN seat_number_in varchar(5), 
IN date_in DATETIME, 
IN class_in VARCHAR(10), 
IN paid_in DECIMAL(10, 2)
)
BEGIN
	declare counter INT;
    
    SELECT count(*) into counter from passenger where passenger_id=passenger_id_in group by(passenger_id);
    if(counter = 1) then
		INSERT INTO ticket(user_id, passenger_id, flight_id, seat_number, date, class, paid, status,is_boarded) VALUES (user_id_in, passenger_id_in, flight_id_in, seat_number_in, date_in, class_in, paid_in, 1, 0);
    else
		INSERT INTO passenger(passenger_id, name, dob, address) values(passenger_id_in, name_in, dob_in, address_in);
        INSERT INTO ticket(user_id, passenger_id, flight_id, seat_number, date, class, paid, is_boarded) VALUES (user_id_in, passenger_id_in, flight_id_in, seat_number_in, date_in, class_in, paid_in, 0);
    end if;
END //

delimiter ;
