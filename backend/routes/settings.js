require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { validateToken } = require("../middlewares/Auth");

const bcrypt = require("bcryptjs");
const saltRounds = 10;
const md5 = require("md5");


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

app.post("/password", validateToken, async (req, res) => {

  const userID = req.user.id;

  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;

  let passwordTypeSql = "SELECT * FROM accounts WHERE id=?";
  database.query(passwordTypeSql, [userID], (err, passwordType) => {
    if(err){
        res.json({
            error: "System is Error. Please Try Again!",
          }); 
    }

    if(passwordType) {
        const dataPassword = passwordType[0].password2;
        if(dataPassword !== "") {
                bcrypt.compare(currentPassword, dataPassword, (err, passwordChecker) => {
                    if(err) {
                        res.json({
                            error: "System is Error. Please Try Again!",
                          });   
                    }

                    if(passwordChecker) {
                //Encrypt the password
                bcrypt.hash(confirmPassword, saltRounds, (err, hash) => {
                    if(err) {
                        res.json({
                            error: "System is Error. Please Try Again!",
                          }); 
                    }

                    if(hash) {

                        let updatePasswordSql ="UPDATE accounts SET password2=? WHERE id=?";

                        database.query(updatePasswordSql, [hash,userID], (err, updatePassword) => {
                            if(err) {
                                res.json({
                                    error: "System is Error. Please Try Again!",
                                  }); 
                            }

                            if(updatePassword) {
                                res.json({
                                    success: "Your password have been changed",
                                  });
                            }
                        });
                        
                    }
                });
                    }  else {
                        res.json({
                            warn: "Your Current Password is incorrect!",
                          }); 
                      }
                });


        } else {
            const oldPassword = md5(currentPassword);
            if(passwordType[0].password === oldPassword) {
                //Encrypt the password
                bcrypt.hash(confirmPassword, saltRounds, (err, hash) => {
                    if(err) {
                        res.json({
                            error: "System is Error. Please Try Again!",
                          }); 
                    }

                    if(hash) {
                        let updatePasswordSql ="UPDATE accounts SET password2=? WHERE id=?";

                        database.query(updatePasswordSql, [hash,userID], (err, updatePassword) => {
                            if(err) {
                                res.json({
                                    error: "System is Error. Please Try Again!",
                                  }); 
                            }

                            if(updatePassword) {
                                res.json({
                                    success: "Your password have been changed",
                                  });
                            }
                        });
                    }
                });

            } else {
                res.json({
                    warn: "Your Current Password is incorrect!",
                  }); 
            }

        }
    }
  })


});

module.exports = app;
