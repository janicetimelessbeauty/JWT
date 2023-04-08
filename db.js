const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    port: 5432,
    password: "Nga123456@",
    database: "jwt"
})
module.exports = pool