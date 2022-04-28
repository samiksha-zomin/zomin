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

    let partnerlistSql = `
        SELECT  * 
        FROM accounts acc, bp_application bp 
        WHERE acc.id=bp.user_id and bp.status=1 and bp.publish=1 
        ORDER BY RAND()
        `;

    database.query(partnerlistSql, function (err, partnerlist) {
        if (partnerlist) {
            res.send(partnerlist);
        }
        if (err) {
            console.log(err);
        }
    });


});

app.param('companyname', function (req, res, next, companyname) {

    const partnerlink = _.toLower(companyname);
    req.companyname = partnerlink;
    next();
});

app.get('/list/:companyname', function (req, res) {

    const compNameLink = req.companyname;
    const companyName = compNameLink.split("-").join(" ");

    let partnerLandingSql = `
        SELECT *
        FROM accounts acc, bp_application bp, partner_profile pp
        WHERE acc.id=bp.user_id AND acc.id=pp.user_id AND bp.user_id=pp.user_id AND bp.status=1 AND bp.publish=1 AND bp.company_name= ?
    `;

    database.query(partnerLandingSql, [companyName], function (error, partnerLanding) {
        res.send(partnerLanding);
    });
    
});



module.exports = app;