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

app.get("/", (req, res) => {
  let getDataSql = `
  SELECT acc.email, acc.companyname, acc.name, acc.contnum, acc.industry, app.*, pro.location_com, pro.role FROM accounts acc, bp_application app, partner_profile pro WHERE acc.id=app.user_id AND app.user_id=pro.user_id AND app.status=1;
        `;

  database.query(getDataSql, function (err, getData) {
    if (getData) {
      res.send(getData);
    }
    if (err) {
      res.json({
        error: "System is Error. Please Try Again!",
      });
    }
  });
});

app.patch("/", (req, res) => {
  const list = req.body;

  const remarks = list.remarks;
  const joinDate = new Date(list.joining_date);
  const interview = list.interview;
  const app_id = list.application_id;

      let updateSql = `UPDATE bp_application set 
      joining_date=?,
      interview=?,
      remarks=?
       WHERE application_id = ?`;

    database.query(updateSql, [joinDate,interview, remarks, app_id], (err, updateList) => {
      if (updateList) {
        let getDataSql = `
        SELECT acc.email, acc.companyname, acc.name, acc.contnum, acc.industry, app.*, pro.location_com, pro.role FROM accounts acc, bp_application app, partner_profile pro WHERE acc.id=app.user_id AND app.user_id=pro.user_id AND app.status=1;
              `;
        database.query(getDataSql, function (err, userList) {
          if (userList) {
            res.json({
              success: "Successfully updated",
              list: userList,
            });
          }
          if (err) {
            res.json({
              error: "System is Error. Please Try Again!",
            });
          }
        });
      }
      if (err) {
        res.json({
      error: "System is Error. Please Try Again!",
    });
      }
    });

});


app.patch("/showLanding", (req, res) => {
    const showLanding = req.body;
    let status = false;
    showLanding.forEach((element) => {
      let updateSql = `UPDATE bp_application set publish=1 WHERE application_id = ?`;
  
      database.query(updateSql, [element.application_id], (err, updateList) => {
        if (updateList) {
          status = !status;
        }
        if (err) {
          status = status;
        }
      });
    });
    if ((status = true)) {
      let getDataSql = `
      SELECT acc.email, acc.companyname, acc.name, acc.contnum, acc.industry, app.*, pro.location_com, pro.role FROM accounts acc, bp_application app, partner_profile pro WHERE acc.id=app.user_id AND app.user_id=pro.user_id AND app.status=1;
            `;
      database.query(getDataSql, function (err, getData) {
        if (getData) {
          res.json({
            success: "Successfully publish the landing page(s).",
            list: getData,
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


  app.patch("/hideLanding", (req, res) => {
    const hideLanding = req.body;
    let status = false;
    hideLanding.forEach((element) => {
      let updateSql = `UPDATE bp_application set publish=0 WHERE application_id = ?`;
  
      database.query(updateSql, [element.application_id], (err, updateList) => {
        if (updateList) {
          status = !status;
        }
        if (err) {
          status = status;
        }
      });
    });
    if ((status = true)) {
      let getDataSql = `
      SELECT acc.email, acc.companyname, acc.name, acc.contnum, acc.industry, app.*, pro.location_com, pro.role FROM accounts acc, bp_application app, partner_profile pro WHERE acc.id=app.user_id AND app.user_id=pro.user_id AND app.status=1;
            `;
      database.query(getDataSql, function (err, getData) {
        if (getData) {
          res.json({
            success: "Successfully publish the landing page(s).",
            list: getData,
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
