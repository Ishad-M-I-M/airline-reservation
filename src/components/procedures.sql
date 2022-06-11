DROP PROCEDURE IF EXISTS add_location;
DELIMITER //

create procedure add_location(in codes varchar(50),
                              in names varchar(50),
                             in parent varchar (50),
                              in c1 varchar(50),
                              in c2 varchar(50),
                              in c3 varchar(50),
                              in c4 varchar(50)
								                                                          
                             )
begin
    declare temp_id1 int;
    declare counter int;
    
    
    select id into temp_id1 from port_location where location = parent;
    select max(id) into counter from port_location;
    
	if (isnull(temp_id1)) THEN
    	insert into port_location(location,parent_id) values(parent,null);
        if ( not isnull(c1)) THEN
        	insert into port_location(location,parent_id) values(c1,counter+1);
            set counter = counter+2;
        end if;
    ELSE
    	if (not isnull(c1)) THEN
        	insert into port_location(location,parent_id) values(c1,temp_id1);
        end if;
    end if;
    
	   if (not isnull(c2)) THEN
        	insert into port_location(location,parent_id) values(c2,counter+1);
        	set counter = counter+1;
        end if;


        if (not isnull(c3)) THEN
        	insert into port_location(location,parent_id) values(c3,counter+1);
        	set counter = counter+1;
        end if;

        if (not isnull(c4)) THEN
        	insert into port_location(location,parent_id) values(c4,counter+1);
        	set counter = counter+1;
        end if;

        insert into port_location(location,parent_id) values(codes,counter+1);
        insert into airport(name,code) values(codes,names);
        
    	
	
End //
DELIMITER ;


-- CALL add_location("ABD","ABD","Sri Lanka2","CHILD1","CHILD2","child3","CHILD4");

BEGIN

	IF gold >= 0 THEN
    	UPDATE discount SET discount = gold WHERE type = 'Gold' ;
    END IF;
        
    IF frequent >= 0 THEN
    	UPDATE discount SET discount = frequent WHERE type = 'Frequent';
    END IF;
END