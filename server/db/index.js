const db_config = require("../knexfile");
let db
if (process.env.NODE_ENV === "production"){
    db = require("knex")(db_config.production);
}
else{
    db = require("knex")(db_config.development);
}
    
module.exports = db;