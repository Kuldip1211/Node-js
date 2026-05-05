const mysql = require("mysql2");

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "deep70",
    database : "contact_from"
});

module.exports = db;