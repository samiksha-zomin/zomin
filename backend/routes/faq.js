require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

//DATABASE CON
const database = require("../config/database");

app.get("/list", (req, res) => {

    let faqListSql = `
        SELECT  * 
        FROM faqs
        `;

    database.query(faqListSql, function (err, faqList) {
        if (faqList) {
            res.send(faqList);
        }
        if (err) {
            res.json({
                error: "System is Error. Please Try Again!",
              });
        }
    });


});

module.exports = app;
