var mysql = require('mysql');
/* to connect to he local database */

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tchat'
});

connection.connect();

module.exports = connection;