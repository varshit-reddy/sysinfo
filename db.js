const Pool = require('pg').Pool;


const pool= new Pool({
    user:"postgres",
    password:"123admin",
    host:"localhost",
    port :5432,
    database:"SystemInfo"
});
module.exports = pool;