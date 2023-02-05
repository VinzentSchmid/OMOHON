const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'sql11.freemysqlhosting.net',
    user: 'sql11592973',
    password: 'QsUtvchs88',
    database: 'sql11592973'
});

module.exports = connection