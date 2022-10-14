/* For SQL intro
 const mysql = require('mysql2');

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    database: 'nodeComplete',
    password: 'mysql12345//',
})

module.exports = pool.promise(); 
*/

/* For Seqeulize */

const Seqeulize = require('seqeulize');

const seqeulize = new Seqeulize(
    'nodeComplete',
    'root',
    'mysql12345//',
    {
        dialect : 'mysql',
        host : 'localhost'
    }
);

module.exports = seqeulize; 