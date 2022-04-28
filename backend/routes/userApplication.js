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

app.get("/numberList", validateToken, async (req, res) => {
  const userID = req.user.id;

  let totalListSql = `
  SELECT COUNT(*) AS pendingNum FROM grab_opportunity grab, opportunity_give give where grab.give_oppo_id=give.oppo_id and grab.candidate_user_id =? and grab.approve_candidate=0  ORDER BY grab.grab_oppo_id DESC;
  SELECT COUNT(*) AS rejectNum FROM grab_opportunity grab, opportunity_give give where grab.give_oppo_id=give.oppo_id and grab.candidate_user_id =? and grab.approve_candidate=1 ORDER BY grab.grab_oppo_id DESC;
  SELECT COUNT(*) AS hiredNum FROM grab_opportunity grab, opportunity_give give where grab.give_oppo_id=give.oppo_id and grab.candidate_user_id =? and grab.approve_candidate=2 ORDER BY grab.grab_oppo_id DESC;
  SELECT COUNT(*) AS shortlistedNum FROM grab_opportunity grab, opportunity_give give where grab.give_oppo_id=give.oppo_id and grab.candidate_user_id =? and grab.approve_candidate=3 ORDER BY grab.grab_oppo_id DESC;
  SELECT COUNT(*) AS withdrewNum FROM grab_opportunity grab, opportunity_give give where grab.give_oppo_id=give.oppo_id and grab.candidate_user_id =? and grab.approve_candidate=4 ORDER BY grab.grab_oppo_id DESC;
  SELECT COUNT(*) AS allApplicationNum FROM grab_opportunity grab, opportunity_give give where grab.give_oppo_id=give.oppo_id and grab.candidate_user_id =? ORDER BY grab.grab_oppo_id DESC;
        `;

  database.query(totalListSql, [userID,userID,userID,userID,userID,userID], (err, totalList) => {
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


app.get("/list", validateToken, async (req, res) => {
  const userID = req.user.id;

  let totalListSql = `
  SELECT * FROM grab_opportunity grab, opportunity_give give where grab.give_oppo_id=give.oppo_id and grab.candidate_user_id =? ORDER BY grab.grab_oppo_id DESC;
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

app.patch("/withdraw", validateToken, async (req, res) => {
  const userID = req.user.id;
  const grabID = req.body.grabID;
  const requestWithdraw = req.body.requestWithdraw;
  const applicationStatus = 4;

  let withdrawSql = "UPDATE grab_opportunity SET withdrawReason=?, approve_candidate=? WHERE grab_oppo_id=? AND candidate_user_id=?";
  
  database.query (withdrawSql, [requestWithdraw,applicationStatus, grabID, userID], (err, withdrawRes) => {
    if(err) {
        res.json({
          error: "System is Error. Please Try Again!",
        });
      }
  
      if (withdrawRes) {
        let getDataSql = `
        SELECT * FROM grab_opportunity grab, opportunity_give give where grab.give_oppo_id=give.oppo_id and grab.candidate_user_id =? ORDER BY grab.grab_oppo_id DESC;
              `;
      database.query(getDataSql, [userID], (err, getDataList) =>{
        if (getDataList) {
          res.json({
            success: "Successfully Withdrew the Application",
            list: getDataList,
          });
        }
        if (err) {
          res.json({
            error: "System is Error. Please Try Again!",
          });
        }
      });

      }
  })

});


module.exports = app;
