var mysql = require('mysql');
var connection = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    port: process.env.MYSQLPORT,
    password: process.env.MYSQLPASS,
    database: process.env.MYSQLDATABASE,
});


module.exports = connection;