const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pradeep@095',
    port: 3306,
    database: 'housing1'
});
connection.connect(function (err) {
    if (err) {
        console.log("Error", err.sqlMessage);
    } else {
        console.log("Connected!!!!!!")
    }
})
module.exports = connection;