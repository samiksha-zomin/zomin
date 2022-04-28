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
  SELECT * FROM spice_in ORDER BY date_spice DESC
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

  const title = list.title_spice;
  const url = list.url_spice;
  const spiceInID = list.spicein_id;

      let updateSql = `UPDATE spice_in set 
      title_spice=?,
      url_spice=?
       WHERE spicein_id = ?`;

    database.query(updateSql, [title,url, spiceInID], (err, updateList) => {
      if (updateList) {
        let getDataSql = `
        SELECT * FROM spice_in ORDER BY date_spice DESC
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
      let updateSql = `UPDATE spice_in set publish=1 WHERE spicein_id = ?`;
  
      database.query(updateSql, [element.spicein_id], (err, updateList) => {
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
      SELECT * FROM spice_in ORDER BY date_spice DESC
            `;
      database.query(getDataSql, function (err, getData) {
        if (getData) {
          res.json({
            success: "Successfully publish the article(s).",
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
      let updateSql = `UPDATE spice_in set publish=0 WHERE spicein_id = ?`;
  
      database.query(updateSql, [element.spicein_id], (err, updateList) => {
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
      SELECT * FROM spice_in ORDER BY date_spice DESC
            `;
      database.query(getDataSql, function (err, getData) {
        if (getData) {
          res.json({
            success: "Successfully publish the article(s).",
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