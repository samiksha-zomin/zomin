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

app.get("/totalList", (req, res) => {
  let totalListSql = `
        SELECT COUNT(*) AS totalUser FROM accounts;
        SELECT COUNT(*) AS totalUnBlockUser FROM accounts WHERE status=1;
        SELECT COUNT(*) AS totalBlockUser FROM accounts WHERE status=0;
        SELECT COUNT(*) AS totalVerifiedUser FROM accounts WHERE status=1 AND verified=1;
        SELECT COUNT(*) AS totalUnverifiedUser FROM accounts WHERE status=1 AND verified=0;
        SELECT COUNT(*) AS totalActiveUser FROM accounts WHERE status=1 AND verified=1 AND company=0;
        SELECT COUNT(*) AS totalActiveBP FROM accounts WHERE status=1 AND verified=1 AND company=1;
        SELECT COUNT(*) AS totalJobVacancy FROM opportunity_give WHERE approve=2;
        SELECT COUNT(*) AS totalJobApplication FROM grab_opportunity WHERE send_bp=1;
        `;

  database.query(totalListSql, function (err, totalList) {
    if (totalList) {
      res.send(totalList);
    }
    if (err) {
      res.json({
        error: "System is Error. Please Try Again!",
      });
    }
  });
});

app.get("/monthList", (req, res) => {
  let todayDate = new Date();
  let currentYear = todayDate.getFullYear();
  let currentMonth = ("0" + todayDate.getMonth()).slice(-2);

  let monthListSql = `
  SELECT COUNT(*) AS totalUser FROM accounts WHERE YEAR(create_time) = ? AND MONTH(create_time) = ?;
  SELECT COUNT(*) AS totalUnBlockUser FROM accounts WHERE status=1 AND YEAR(create_time) = ? AND MONTH(create_time) = ?;
  SELECT COUNT(*) AS totalBlockUser FROM accounts WHERE status=0 AND YEAR(create_time) = ? AND MONTH(create_time) = ?;
  SELECT COUNT(*) AS totalVerifiedUser FROM accounts WHERE status=1 AND verified=1 AND YEAR(create_time) = ? AND MONTH(create_time) = ?;
  SELECT COUNT(*) AS totalUnverifiedUser FROM accounts WHERE status=1 AND verified=0 AND YEAR(create_time) = ? AND MONTH(create_time) = ?;
  SELECT COUNT(*) AS totalActiveUser FROM accounts WHERE status=1 AND verified=1 AND company=0 AND YEAR(create_time) = ? AND MONTH(create_time) = ?;
  SELECT COUNT(*) AS totalActiveBP FROM accounts WHERE status=1 AND verified=1 AND company=1 AND YEAR(create_time) = ? AND MONTH(create_time) = ?;
  SELECT COUNT(*) AS totalJobVacancy FROM opportunity_give WHERE approve=2 AND YEAR(oppo_time) = ? AND MONTH(oppo_time) = ?;
  SELECT COUNT(*) AS totalJobApplication FROM grab_opportunity WHERE send_bp=1 AND YEAR(time) = ? AND MONTH(time) = ?;
  `;

  database.query(
    monthListSql,
    [
        currentYear,currentMonth,
        currentYear,currentMonth,
        currentYear,currentMonth,
        currentYear,currentMonth,
        currentYear,currentMonth,
        currentYear,currentMonth,
        currentYear,currentMonth,
        currentYear,currentMonth,
        currentYear,currentMonth
    ],
    function (err, monthList) {
      if (monthList) {
        res.send(monthList);
      }
      if (err) {
        res.json({
          error: "System is Error. Please Try Again!",
        });
      }
    }
  );
});

app.get("/todayList", (req, res) => {
    let todayDate = new Date();
    let currentDate = ("0" + todayDate.getDate()).slice(-2);
    let currentYear = todayDate.getFullYear();
    let currentMonth = ("0" + todayDate.getMonth()).slice(-2);
  
    let todayListSql = `
    SELECT COUNT(*) AS totalUser FROM accounts WHERE YEAR(create_time) = ? AND MONTH(create_time) = ? AND DAYOFMONTH(create_time)= ?;
    SELECT COUNT(*) AS totalUnBlockUser FROM accounts WHERE status=1 AND YEAR(create_time) = ? AND MONTH(create_time) = ? AND DAYOFMONTH(create_time)= ?;
    SELECT COUNT(*) AS totalBlockUser FROM accounts WHERE status=0 AND YEAR(create_time) = ? AND MONTH(create_time) = ? AND DAYOFMONTH(create_time)= ?;
    SELECT COUNT(*) AS totalVerifiedUser FROM accounts WHERE status=1 AND verified=1 AND YEAR(create_time) = ? AND MONTH(create_time) = ? AND DAYOFMONTH(create_time)= ?;
    SELECT COUNT(*) AS totalUnverifiedUser FROM accounts WHERE status=1 AND verified=0 AND YEAR(create_time) = ? AND MONTH(create_time) = ? AND DAYOFMONTH(create_time)= ?;
    SELECT COUNT(*) AS totalActiveUser FROM accounts WHERE status=1 AND verified=1 AND company=0 AND YEAR(create_time) = ? AND MONTH(create_time) = ? AND DAYOFMONTH(create_time)= ?;
    SELECT COUNT(*) AS totalActiveBP FROM accounts WHERE status=1 AND verified=1 AND company=1 AND YEAR(create_time) = ? AND MONTH(create_time) = ? AND DAYOFMONTH(create_time)= ?;
    SELECT COUNT(*) AS totalJobVacancy FROM opportunity_give WHERE approve=2 AND YEAR(oppo_time) = ? AND MONTH(oppo_time) = ? AND DAYOFMONTH(oppo_time)= ?;
    SELECT COUNT(*) AS totalJobApplication FROM grab_opportunity WHERE send_bp=1 AND YEAR(time) = ? AND MONTH(time) = ? AND DAYOFMONTH(time)= ?;
    `;
  
    database.query(
        todayListSql,
      [
          currentYear,currentMonth,currentDate,
          currentYear,currentMonth,currentDate,
          currentYear,currentMonth,currentDate,
          currentYear,currentMonth,currentDate,
          currentYear,currentMonth,currentDate,
          currentYear,currentMonth,currentDate,
          currentYear,currentMonth,currentDate,
          currentYear,currentMonth,currentDate,
          currentYear,currentMonth,currentDate
      ],
      function (err, todayList) {
        if (todayList) {
          res.send(todayList);
        }
        if (err) {
          res.json({
            error: "System is Error. Please Try Again!",
          });
        }
      }
    );
  });

  app.get("/oneDayBeforeList", (req, res) => {
    let todayDate = new Date();
    let currentDate = ("0" + (todayDate.getDate()-1)).slice(-2);
    let currentYear = todayDate.getFullYear();
    let currentMonth = ("0" + todayDate.getMonth()).slice(-2);
  
    let oneDayBeforeListSql = `
    SELECT COUNT(*) AS totalUser FROM accounts WHERE YEAR(create_time) = ? AND MONTH(create_time) = ? AND DAYOFMONTH(create_time)= ?;
    SELECT COUNT(*) AS totalUnBlockUser FROM accounts WHERE status=1 AND YEAR(create_time) = ? AND MONTH(create_time) = ? AND DAYOFMONTH(create_time)= ?;
    SELECT COUNT(*) AS totalBlockUser FROM accounts WHERE status=0 AND YEAR(create_time) = ? AND MONTH(create_time) = ? AND DAYOFMONTH(create_time)= ?;
    SELECT COUNT(*) AS totalVerifiedUser FROM accounts WHERE status=1 AND verified=1 AND YEAR(create_time) = ? AND MONTH(create_time) = ? AND DAYOFMONTH(create_time)= ?;
    SELECT COUNT(*) AS totalUnverifiedUser FROM accounts WHERE status=1 AND verified=0 AND YEAR(create_time) = ? AND MONTH(create_time) = ? AND DAYOFMONTH(create_time)= ?;
    SELECT COUNT(*) AS totalActiveUser FROM accounts WHERE status=1 AND verified=1 AND company=0 AND YEAR(create_time) = ? AND MONTH(create_time) = ? AND DAYOFMONTH(create_time)= ?;
    SELECT COUNT(*) AS totalActiveBP FROM accounts WHERE status=1 AND verified=1 AND company=1 AND YEAR(create_time) = ? AND MONTH(create_time) = ? AND DAYOFMONTH(create_time)= ?;
    SELECT COUNT(*) AS totalJobVacancy FROM opportunity_give WHERE approve=2 AND YEAR(oppo_time) = ? AND MONTH(oppo_time) = ? AND DAYOFMONTH(oppo_time)= ?;
    SELECT COUNT(*) AS totalJobApplication FROM grab_opportunity WHERE send_bp=1 AND YEAR(time) = ? AND MONTH(time) = ? AND DAYOFMONTH(time)= ?;
    `;
  
    database.query(
        oneDayBeforeListSql,
      [
          currentYear,currentMonth,currentDate,
          currentYear,currentMonth,currentDate,
          currentYear,currentMonth,currentDate,
          currentYear,currentMonth,currentDate,
          currentYear,currentMonth,currentDate,
          currentYear,currentMonth,currentDate,
          currentYear,currentMonth,currentDate,
          currentYear,currentMonth,currentDate,
          currentYear,currentMonth,currentDate
      ],
      function (err, oneDayBeforeList) {
        if (oneDayBeforeList) {
          res.send(oneDayBeforeList);
        }
        if (err) {
          res.json({
            error: "System is Error. Please Try Again!",
          });
        }
      }
    );
  });

  app.get("/twoDayBeforeList", (req, res) => {
    let todayDate = new Date();
    let currentDate = ("0" + (todayDate.getDate()-2)).slice(-2);
    let currentYear = todayDate.getFullYear();
    let currentMonth = ("0" + todayDate.getMonth()).slice(-2);
  
    let twoDayBeforeListSql = `
    SELECT COUNT(*) AS totalUser FROM accounts WHERE YEAR(create_time) = ? AND MONTH(create_time) = ? AND DAYOFMONTH(create_time)= ?;
    SELECT COUNT(*) AS totalUnBlockUser FROM accounts WHERE status=1 AND YEAR(create_time) = ? AND MONTH(create_time) = ? AND DAYOFMONTH(create_time)= ?;
    SELECT COUNT(*) AS totalBlockUser FROM accounts WHERE status=0 AND YEAR(create_time) = ? AND MONTH(create_time) = ? AND DAYOFMONTH(create_time)= ?;
    SELECT COUNT(*) AS totalVerifiedUser FROM accounts WHERE status=1 AND verified=1 AND YEAR(create_time) = ? AND MONTH(create_time) = ? AND DAYOFMONTH(create_time)= ?;
    SELECT COUNT(*) AS totalUnverifiedUser FROM accounts WHERE status=1 AND verified=0 AND YEAR(create_time) = ? AND MONTH(create_time) = ? AND DAYOFMONTH(create_time)= ?;
    SELECT COUNT(*) AS totalActiveUser FROM accounts WHERE status=1 AND verified=1 AND company=0 AND YEAR(create_time) = ? AND MONTH(create_time) = ? AND DAYOFMONTH(create_time)= ?;
    SELECT COUNT(*) AS totalActiveBP FROM accounts WHERE status=1 AND verified=1 AND company=1 AND YEAR(create_time) = ? AND MONTH(create_time) = ? AND DAYOFMONTH(create_time)= ?;
    SELECT COUNT(*) AS totalJobVacancy FROM opportunity_give WHERE approve=2 AND YEAR(oppo_time) = ? AND MONTH(oppo_time) = ? AND DAYOFMONTH(oppo_time)= ?;
    SELECT COUNT(*) AS totalJobApplication FROM grab_opportunity WHERE send_bp=1 AND YEAR(time) = ? AND MONTH(time) = ? AND DAYOFMONTH(time)= ?;
    `;
  
    database.query(
        twoDayBeforeListSql,
      [
          currentYear,currentMonth,currentDate,
          currentYear,currentMonth,currentDate,
          currentYear,currentMonth,currentDate,
          currentYear,currentMonth,currentDate,
          currentYear,currentMonth,currentDate,
          currentYear,currentMonth,currentDate,
          currentYear,currentMonth,currentDate,
          currentYear,currentMonth,currentDate,
          currentYear,currentMonth,currentDate
      ],
      function (err, twoDayBeforeList) {
        if (twoDayBeforeList) {
          res.send(twoDayBeforeList);
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
