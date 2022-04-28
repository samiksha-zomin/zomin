require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

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

app.get("/", (req, res) => {
  let studentListSql = `
  SELECT acc.*, edu.school, edu.study_field, edu.higher_stud FROM accounts acc, user_education edu WHERE acc.id=edu.user_id GROUP BY (edu.user_id) ORDER BY edu.id, edu.grad_year_to DESC;
        `;

  database.query(studentListSql, function (err, studentList) {
    if (studentList) {
      res.send(studentList);
    }
    if (err) {
      res.json({
        error: "System is Error. Please Try Again!",
      });
    }
  });
});

app.patch("/blockUser", (req, res) => {
  const blockList = req.body;
  let status = false;
  blockList.forEach((element) => {
    let blockUserSql = `UPDATE accounts set status=0 WHERE id = ?`;

    database.query(blockUserSql, [element.id], (err, blockUser) => {
      if (blockUser) {
        status = !status;
      }
      if (err) {
        status = status;
      }
    });
  });
  if ((status = true)) {
    let userListSql = `
    SELECT acc.*, edu.school, edu.study_field, edu.higher_stud FROM accounts acc, user_education edu WHERE acc.id=edu.user_id GROUP BY (edu.user_id) ORDER BY edu.id, edu.grad_year_to DESC;
          `;
    database.query(userListSql, function (err, userList) {
      if (userList) {
        res.json({
          success: "Successfully blocked the user(s).",
          list: userList,
        });
      }
      if (err) {
        res.json({
          error: "System is Error. Please Try Again!",
        });
      }
    });
  } else {
    res.json({
      error: "System is Error. Please Try Again!",
    });
  }
});

app.patch("/unblockUser", (req, res) => {
  const unblockList = req.body;
  let status = false;
  unblockList.forEach((element) => {
    let blockUserSql = `UPDATE accounts set status=1 WHERE id = ?`;

    database.query(blockUserSql, [element.id], (err, blockUser) => {
      if (blockUser) {
        status = !status;
      }
      if (err) {
        status = status;
      }
    });
  });
  if ((status = true)) {
    let userListSql = `
    SELECT acc.*, edu.school, edu.study_field, edu.higher_stud FROM accounts acc, user_education edu WHERE acc.id=edu.user_id GROUP BY (edu.user_id) ORDER BY edu.id, edu.grad_year_to DESC;
          `;
    database.query(userListSql, function (err, userList) {
      if (userList) {
        res.json({
          success: "Successfully unblocked the user(s).",
          list: userList,
        });
      }
      if (err) {
        res.json({
          error: "System is Error. Please Try Again!",
        });
      }
    });
  } else {
    res.json({
      error: "System is Error. Please Try Again!",
    });
  }
});

module.exports = app;
