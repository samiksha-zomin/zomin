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
  SELECT acc.companyname, oppo.* FROM accounts acc, opportunity_give oppo WHERE acc.id=oppo.user_id ORDER BY oppo.oppo_time DESC;
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

  const remarks = list.give_remarks;
  const oppo_id = list.oppo_id;


      let updateSql = `UPDATE opportunity_give set 
      give_remarks=?
       WHERE oppo_id = ?`;

    database.query(updateSql, [remarks, oppo_id], (err, updateList) => {
      if (updateList) {
        let getDataSql = `
        SELECT acc.companyname, oppo.* FROM accounts acc, opportunity_give oppo WHERE acc.id=oppo.user_id ORDER BY oppo.oppo_time DESC;
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


app.patch("/publish", (req, res) => {
    const publish = req.body;
    let status = false;
    publish.forEach((element) => {
      let updateSql = `UPDATE opportunity_give set approve=2 WHERE oppo_id = ?`;
  
      database.query(updateSql, [element.oppo_id], (err, updateList) => {
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
      SELECT acc.companyname, oppo.* FROM accounts acc, opportunity_give oppo WHERE acc.id=oppo.user_id;
            `;
      database.query(getDataSql, function (err, getData) {
        if (getData) {
          res.json({
            success: "Successfully published to user view.",
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


  app.patch("/hide", (req, res) => {
    const hide = req.body;
    let status = false;
    hide.forEach((element) => {
      let updateSql = `UPDATE opportunity_give set approve=1 WHERE oppo_id = ?`;
  
      database.query(updateSql, [element.oppo_id], (err, updateList) => {
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
      SELECT acc.companyname, oppo.* FROM accounts acc, opportunity_give oppo WHERE acc.id=oppo.user_id;
            `;
      database.query(getDataSql, function (err, getData) {
        if (getData) {
          res.json({
            success: "Successfully hidden from user view.",
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
