require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/Auth");

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

app.get("/about", validateToken, async (req, res) => {
  const userID = req.user.id;

  let aboutListSql = `
  SELECT * FROM accounts a, partner_profile p WHERE a.id=? AND a.id=p.user_id ORDER BY p.time DESC LIMIT 1
        `;

  database.query(aboutListSql, [userID], (err, aboutList) => {
    if (aboutList) {
      res.send(aboutList);
    }
    if (err) {
      res.json({
        error: "System is Error. Please Try Again!",
      });
    }
  });
});

module.exports = app;
