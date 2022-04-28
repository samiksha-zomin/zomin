require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");


const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: true }));

//DATABASE CON
const database = require("../config/database");



app.get("/industry", (req, res) => {
    
        let industrylistSql = `
        SELECT * 
        FROM parent_meta 
        WHERE parent_id=3 
        ORDER BY child_name ASC
        `;

        database.query(industrylistSql, function (err, industrylist) {
            if (industrylist) {
                res.send(industrylist);
            }
            if (err) {
                console.log(err);
            }
        });
    
    
});

app.get("/stateLocation", (req, res) => {
    
    let statelistSql = `
    SELECT * 
    FROM parent_meta 
    WHERE parent_id=1 
    ORDER BY child_id ASC
    `;

    database.query(statelistSql, function (err, statelist) {
        if (statelist) {
            res.send(statelist);
        }
        if (err) {
            console.log(err);
        }
    });
});

app.get("/university", (req, res) => {
    
    let universitylistSql = `
    SELECT * 
    FROM university_name 
    ORDER BY id ASC
    `;

    database.query(universitylistSql, function (err, universitylist) {
        if (universitylist) {
            res.json(universitylist);
        }
        if (err) {
            console.log(err);
        }
    });
});

app.get("/eduLevel", (req, res) => {
    
    let eduLevellistSql = `
    SELECT child_name 
    FROM parent_meta 
    WHERE parent_id=5
    ORDER BY child_id DESC
    `;

    database.query(eduLevellistSql, function (err, eduLevellist) {
        if (eduLevellist) {
            res.send(eduLevellist);
        }
        if (err) {
            console.log(err);
        }
    });
});

app.get("/hearZomIN", (req, res) => {
    
    let hearlistSql = `
    SELECT child_name 
    FROM parent_meta 
    WHERE parent_id=2
    ORDER BY child_id DESC
    `;

    database.query(hearlistSql,  (err, hearlist)=> {
        if (hearlist) {
            res.send(hearlist);
        }
        if (err) {
            console.log(err);
        }
    });
});

module.exports = app;