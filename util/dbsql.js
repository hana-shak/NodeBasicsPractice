const mysql = require('mysql2');

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    database: 'nodeComplete',
    password: 'mysql12345//',
})

module.exports = pool.promise(); 