require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { sign } = require("jsonwebtoken");

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

app.param("token", function (req, res, next, token) {
  req.token = token;
  next();
});

app.get("/:token", function (req, res) {
  const token = req.token;

  let resumeListSql = `
        SELECT * FROM user_profile WHERE user_id =? ORDER BY id DESC LIMIT 1;
        SELECT DISTINCT * FROM user_education WHERE user_id=? ORDER BY grad_year_to DESC;
        SELECT DISTINCT * FROM user_employ WHERE user_id=? ORDER BY end_date DESC;
        SELECT DISTINCT * FROM user_rle WHERE user_id=? ORDER BY id DESC;
        SELECT DISTINCT * FROM user_portfolio WHERE user_id=? ORDER BY id DESC;
        SELECT DISTINCT * FROM user_accomplishment WHERE user_id=? ORDER BY date_accomplishment DESC;
        SELECT DISTINCT * FROM user_reference WHERE user_id=? ORDER BY id DESC;
        SELECT * FROM user_skill WHERE user_id=? ORDER BY id DESC;
        SELECT * FROM user_language WHERE user_id=? ORDER BY id ASC;
        `;

  database.query(
    resumeListSql,
    [token, token, token, token, token, token, token, token, token],
    (err, resumeList) => {
      if (resumeList) {
        res.send(resumeList);
      }
      if (err) {
        res.json({
          error: "System is Error. Please Try Again!",
        });
      }
    }
  );
});

module.exports = app;
