const mysql = require("mysql");

const database = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "zomindb",
});

module.export = database;