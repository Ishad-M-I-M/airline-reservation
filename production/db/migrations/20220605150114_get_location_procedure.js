/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    let query = `
    create function get_location(code varchar(5)) 
    returns varchar(1000) deterministic
    begin
        declare loc varchar(1000);
        declare temp_s varchar(100);
        declare temp_id1 int;
        declare temp_id2 int;
        
        select id into temp_id1 from port_location where location = code;
        
        repeat
            select location, parent_id into temp_s, temp_id2 
                from port_location
                where id = temp_id1;
            set temp_id1 = temp_id2;
            if (isnull(loc)) then
                set loc = temp_s;
            else
                set loc = concat(loc,', ',temp_s);
            end if;
        until isnull(temp_id1)
        end repeat;
        return loc;
        
    end;`;
    return knex.schema.raw(query);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.raw("DROP PROCEDURE IF EXISTS get_location;");
};
