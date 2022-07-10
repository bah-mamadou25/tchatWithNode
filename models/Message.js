let connection = require('../config/connection.js');
let moment = require('moment');
class Message {

    static create(content) {
        connection.query('INSERT INTO message SET content=? , created_at= ?', [content, new Date()], (err, result) => {
            if (err) throw err;
        });
    }
    static all(cb) {
        connection.query('SELECT * FROM message', (error, result) => {
            if (error) throw error;
            else {
                cb(result);
            }

        });
    }
}

module.exports = Message;