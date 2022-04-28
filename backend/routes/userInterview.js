require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
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


app.get("/list", validateToken, async (req, res) => {
  const userID = req.user.id;

  let totalListSql = `
  SELECT * FROM interviewOption ivo, opportunity_give give WHERE ivo.candidate_id=? and ivo.opportunity_id=give.oppo_id ORDER BY ivo.interviewDate DESC, ivo.interviewTime DESC;
        `;

  database.query(totalListSql, [userID], (err, totalList) => {
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

app.post("/scheduleInterview", validateToken, async (req, res) => {
    const userID = req.user.id;

  const proposedTimeDate = req.body.timeDate;
  const initialTimeDate = req.body.intialInterview;
  const remarks = req.body.remarks;
  const employerID = req.body.employerID;
  const interviewID = req.body.interviewID;
  const grabID = req.body.grabID;
  
    let rescheduleSql = `
    INSERT INTO interviewreschedule (interviewId, candidate_id, job_id, company_id, initial_interview, proposed_interview, remarks) VALUES (?,?,?,?,?,?,?)
          `;
  
    database.query(rescheduleSql, [interviewID, userID, grabID, employerID, initialTimeDate, proposedTimeDate, remarks], (err, rescheduleRes) => {
      if (rescheduleRes) {
        res.json({
            success: "Successfully reschedule",
          });
      }
      if (err) {
        res.json({
          error: "System is Error. Please Try Again!",
        });
      }
    });
  });

  app.param('interviewID', function (req, res, next, interviewID) {

    req.interviewID = interviewID;
    next();
});

app.get('/reschedule/:interviewID', function (req, res) {
    const interviewID = req.interviewID;
  
    let rescheduleListSql = `
    SELECT * FROM interviewreschedule WHERE interviewId=? ORDER BY id DESC LIMIT 1;
          `;
  
    database.query(rescheduleListSql, [interviewID], (err, rescheduleList) => {
      if (rescheduleList) {
        res.send(rescheduleList);
      }
      if (err) {
        res.json({
          error: "System is Error. Please Try Again!",
        });
      }
    });
  });


module.exports = app;
