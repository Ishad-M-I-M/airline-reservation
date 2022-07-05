drop database if exists bairways;
create database bairways;

use bairways;
SET foreign_key_checks = 'ON';

CREATE TABLE aircraft
(
    aircraft_id    int auto_increment,
    tail_number    varchar(10) unique NOT NULL,
    model          varchar(50)        NOT NULL,
    Economy_seats  int DEFAULT 0 check (Economy_seats > 0),
    Business_seats int DEFAULT 0 check (Business_seats > 0),
    Platinum_seats int DEFAULT 0 check (Platinum_seats > 0),
    is_active tinyint DEFAULT 1,
    primary key (aircraft_id)
);
CREATE TABLE airport
(
    airport_id int         NOT NULL auto_increment,
    code       char(3)     NOT NULL unique,
    name       varchar(50) NOT NULL,
    location   int         NOT NULL,
    is_active tinyint DEFAULT 1,
    primary key (airport_id)
);

CREATE TABLE `discount`
(
    `type`     varchar(20) NOT NULL,
    `discount` decimal(4, 2) DEFAULT 0 CHECK (`discount` >= 0 and `discount` <= 100),
    primary key (type)
);

CREATE TABLE `route`
(
    `route_id`    int NOT NULL auto_increment,
    `origin`      int NOT NULL,
    `destination` int NOT NULL,
    primary key (route_id),
    constraint foreign key (origin) references airport (airport_id),
    constraint foreign key (destination) references airport (airport_id),
    constraint unique (origin, destination)
);

CREATE TABLE `flight`
(
    `flight_id`      int      NOT NULL auto_increment,
    `aircraft_id`    int      NOT NULL,
    `route_id`       int      NOT NULL,
    `takeoff_time`   datetime NOT NULL,
    `departure_time` datetime NOT NULL,
    is_active        tinyint default 1,
    primary key (flight_id),
    constraint foreign key (aircraft_id) references aircraft (aircraft_id) on delete cascade on update cascade,
    constraint foreign key (route_id) references route (route_id) on delete cascade on update cascade
);

CREATE TABLE `flight_cost`
(
    `flight_id` int            NOT NULL,
    `class`     varchar(10)    NOT NULL CHECK (`class` in ('Platinum', 'Business', 'Economy')),
    `cost`      decimal(10, 2) NOT NULL,
    primary key (flight_id, class),
    constraint foreign key (flight_id) references flight (flight_id) on delete cascade on update cascade
);


CREATE TABLE `flight_cost` (
  `flight_id` int NOT NULL references flight.flight_id,
  `class` varchar(10) NOT NULL CHECK (`class` in ('Platinum','Business','Economy')),
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

CREATE TABLE port_location
(
    id       int         NOT NULL auto_increment,
    location varchar(50) NOT NULL unique,
    primary key (id)
);

create table parent_location
(
    id        int unique NOT NULL,
    parent_id int        NOT NULL,
    primary key (id, parent_id),
    constraint foreign key (id) references port_location (id) on update cascade on delete cascade,
    constraint foreign key (parent_id) references port_location (id) on update cascade on delete cascade
);
-- id set to unique as no location can have multiple parents

CREATE TABLE `user`
(
    `user_id`       int          NOT NULL auto_increment,
    `email`         varchar(255) NOT NULL,
    `password`      varchar(100) NOT NULL,
    `first_name`    varchar(100) NOT NULL,
    `last_name`     varchar(100) DEFAULT NULL,
    `role`          varchar(30)  NOT NULL CHECK (`role` in ('moderator', 'clerk', 'user', 'guest')),
    `discount_type` varchar(20)  DEFAULT 'Normal',
    `is_active`     tinyint      DEFAULT 1,
    `dob`           date         NOT NULL,
    primary key (user_id),
    constraint foreign key (discount_type) references discount (type) on update cascade on delete set null
);

CREATE TABLE `ticket`
(
    `ticket_id`    int            NOT NULL auto_increment,
    `user_id`      int            NULL DEFAULT NULL, -- user_id NULL refers to guest user
    `passenger_id` varchar(25)    NOT NULL,
    `flight_id`    int            NOT NULL,
    `seat_number`  varchar(5)     NOT NULL,
    `date`         datetime       NOT NULL,
    `class`        varchar(10)    NOT NULL,
    `paid`         decimal(10, 2) NOT NULL,
    `status`       tinyint        NOT NULL DEFAULT 1,
    `is_boarded`   tinyint        NOT NULL DEFAULT 0,
    primary key (ticket_id),
    constraint foreign key (user_id) references user (user_id) on update cascade,
    constraint foreign key (passenger_id) references passenger (passenger_id) on update cascade on delete cascade,
    constraint foreign key (flight_id, class) references flight_cost (flight_id, class) on update cascade on delete cascade,
    constraint unique (passenger_id, flight_id),
    constraint unique (flight_id, seat_number)
);

create view port_location_with_parent as
select *
from port_location
         left outer join parent_location using (id);

delimiter $$
create function get_location(location_id int)
    returns varchar(1000)
    deterministic
begin
    declare loc varchar(1000);
    declare temp_s varchar(100);
    declare temp_id1 int;
    declare temp_id2 int;

    set temp_id1 = location_id;

    repeat
        select location, parent_id
        into temp_s, temp_id2
        from port_location_with_parent
        where id = temp_id1;
        set temp_id1 = temp_id2;
        if isnull(loc) then
            set loc = temp_s;
        else
            set loc = concat(loc, ', ', temp_s);
        end if;
    until isnull(temp_id1)
        end repeat;
    return loc;

end$$

delimiter ;

create view airport_locations as
select airport_id as id, code, name, get_location(location) as location
from airport;

CREATE FUNCTION SPLIT_STR(
    x VARCHAR(255),
    delim VARCHAR(12),
    pos INT
)
    RETURNS VARCHAR(255)
    deterministic
    RETURN REPLACE(SUBSTRING(SUBSTRING_INDEX(x, delim, pos),
                             LENGTH(SUBSTRING_INDEX(x, delim, pos - 1)) + 1),
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
    create temporary table temp_data
    (
        id         int auto_increment primary key,
        loc        varchar(100),
        loc_parent int
    );

    set i = num;
    while (i > 0)
        do
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
            set i = i - 1;
        end while;

    select count(*) into iter_count from temp_data;

    set i = 1;
    while iter_count > i
        do
            select loc_parent into current_id from temp_data where id = i + 1;
            select loc_parent into parent from temp_data where id = i;
            insert ignore into parent_location (id, parent_id) values (current_id, parent);
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

create procedure UpdateDiscount(gold float, frequent float)
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
    returns varchar(3000)
    deterministic
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
        set counter = counter + 1;
        if not exists(select ticket_id
                      from ticket
                      where flight_id = fli_id
                        and seat_number = counter
                        and class = 'Economy') then
            if (isnull(seats)) then
                set seats = counter;
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
    returns varchar(3000)
    deterministic
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
        set counter = counter + 1;
        if not exists(select ticket_id
                      from ticket
                      where flight_id = fli_id
                        and seat_number = counter
                        and class = 'Business') then
            if (isnull(seats)) then
                set seats = counter;
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
    returns varchar(3000)
    deterministic
begin
    declare seats varchar(3000);
    declare seat_num int;
    declare counter int;
    declare economy int;
    declare business int;
    declare craft_id int;

    select aircraft_id into craft_id from flight where flight_id = fli_id;
    select Platinum_seats into seat_num from aircraft where aircraft_id = craft_id limit 1;
    select Economy_seats into economy from aircraft where aircraft_id = craft_id limit 1;
    select Business_seats into business from aircraft where aircraft_id = craft_id limit 1;
    set counter = economy + business;
    repeat
        set counter = counter + 1;
        if not exists(select ticket_id
                      from ticket
                      where flight_id = fli_id
                        and seat_number = counter
                        and class = 'Platinum') then
            if (isnull(seats)) then
                set seats = counter;
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
create procedure book_ticket(
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

    SELECT count(*) into counter from passenger where passenger_id = passenger_id_in group by(passenger_id);
    if (counter = 1) then
        INSERT INTO ticket(user_id, passenger_id, flight_id, seat_number, date, class, paid, status, is_boarded)
        VALUES (user_id_in, passenger_id_in, flight_id_in, seat_number_in, date_in, class_in, paid_in, 1, 0);
    else
        START TRANSACTION;
        INSERT INTO passenger(passenger_id, name, dob, address) values (passenger_id_in, name_in, dob_in, address_in);
        INSERT INTO ticket(user_id, passenger_id, flight_id, seat_number, date, class, paid, is_boarded)
        VALUES (user_id_in, passenger_id_in, flight_id_in, seat_number_in, date_in, class_in, paid_in, 0);
        COMMIT;
    end if;
END //

delimiter ;



DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `release_booking`(IN `f_id` INT(11), IN `seatNo` VARCHAR(11), IN `passengerId` VARCHAR(11))
BEGIN
	START TRANSACTION;
    	DELETE FROM ticket WHERE flight_id=f_id and seat_number=seatNo and status=0;
        DELETE FROM passenger WHERE passenger_id=passengerId and passenger_id not in (SELECT passenger_id FROM ticket);
    
    COMMIT;

END$$
DELIMITER ;


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `book_ticket_proc`(IN `in_f_id` INT(11), IN `in_user_id` INT(11), IN `in_passenger_id` VARCHAR(25), IN `in_passenger_name` VARCHAR(150), IN `in_passenger_add` VARCHAR(255), IN `in_dob` DATE, IN `in_class` VARCHAR(10), IN `in_seat_no` VARCHAR(5))
BEGIN  
    declare payment  dec(10,2);
    declare disc_type varchar(20);
    declare var_discount dec(4,2);

	select cost into payment from flight_cost where flight_id =in_f_id and class=in_class limit 1;
    
	if in_user_id !=0 then
        
    		select discount_type into disc_type from user where user_id=in_user_id limit 1;
        	select discount into var_discount from discount where type =disc_type limit 1;
        	
            set payment= payment *( 100-var_discount)/100;
    end if;  
    start TRANSACTION;
    	insert IGNORE into passenger values(in_passenger_id,in_passenger_name,in_dob,in_passenger_add);
    	insert into ticket(user_id,passenger_id,flight_id,seat_number,date,class,paid,status,is_boarded) values (in_user_id,in_passenger_id,in_f_id,in_seat_no,NOW(),in_class,payment,0,0);
    commit;
END$$
DELIMITER ;

delimiter $$
CREATE PROCEDURE schedule_flight
(
    IN aircraft_id_in INT,
    IN route_id_in INT,
    IN takeoff_time_in DATETIME,
    IN departure_time_in DATETIME,
    IN business_cost_in decimal(10,2),
    IN economy_cost_in decimal(10,2),
    IN platinum_cost_in decimal(10,2)
)
BEGIN
    DECLARE flight_id_get INT;
    START TRANSACTION;
    INSERT INTO flight (aircraft_id, route_id, takeoff_time, departure_time) VALUES(aircraft_id_in, route_id_in, takeoff_time_in, departure_time_in);
    SELECT flight_id into flight_id_get from flight order by flight_id desc limit 1;
    INSERT INTO flight_cost(flight_id, class, cost) VALUES (flight_id_get, 'Business',business_cost_in);
    INSERT INTO flight_cost(flight_id, class, cost) VALUES (flight_id_get, 'Economy',economy_cost_in);
    INSERT INTO flight_cost(flight_id, class, cost) VALUES (flight_id_get, 'Platinum',platinum_cost_in);
    COMMIT;
END $$

delimiter ;
