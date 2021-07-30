require('dotenv').config();
const express = require("express");
const app = express();
const mysql = require("mysql");

const database = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "zomindb",
});

app.post('/token', function(req, res) {
    const vkey = req.body.token;
    const verified = 1;
    
    let tokenCheckerSql = `SELECT vkey FROM accounts WHERE vkey= ? LIMIT 1 `;
    database.query(tokenCheckerSql, [vkey], function (err, tokenCheker){
        if(tokenCheker) {
            console.log(tokenCheker);
            if(tokenCheker.length === 1) {
                
                let activateEmailSql = `UPDATE accounts SET verified= ? WHERE vkey=? LIMIT 1`;
                database.query(activateEmailSql, [verified, vkey], function (error, activateEmail){
                    if(activateEmail){
                        res.send("Email Activated");
                        console.log("email activ2e5");
                    } else {
                        res.send("Email Cannot Activate!");
                        console.log("1");
                    }
                    if (error) {
                        res.send("System Error!");
                        console.log("2");
                    }
                });
            } else {
                res.send("Invalid Token!");
                console.log("4");
            }
        } else {
            res.send("Invalid Token!");
            console.log("3");
        }
        if(err){
            res.send("System Error!");
            console.log("5");
        }
    });
});

module.exports = app;