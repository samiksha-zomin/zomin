require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const _ = require("lodash");



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



app.get("/list", (req, res) => {

    let spiceINlistSql = `
    SELECT * FROM spice_in si, spicein_category sc WHERE si.category_spice=sc.category AND publish=1  ORDER BY si.date_spice DESC
        `;

    database.query(spiceINlistSql, function (err, spiceINlist) {
        if (spiceINlist) {
            res.send(spiceINlist);
        }
        if (err) {
            console.log(err);
        }
    });


});

app.param('spiceinLanding', function (req, res, next, spiceinLanding) {

    req.spiceinLanding = spiceinLanding;
    next();
});

app.get('/list/:spiceinLanding', function (req, res) {

    const spiceTitleLink = req.spiceinLanding;

    console.log(spiceTitleLink)

    let spiceINLandingSql = `
    SELECT * FROM spice_in where url_spice =?
    `;

    database.query(spiceINLandingSql, [spiceTitleLink], function (error, spiceINLanding) {
        res.send(spiceINLanding);
    });
    
});



module.exports = app;