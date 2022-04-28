require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const nodemailer = require("nodemailer");

const database = require("../config/database");
let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PSWD,
  },
});

app.post("/token", function (req, res) {
  const vkey = req.body.token;
  const verified = 1;

  let tokenCheckerSql = `SELECT vkey FROM accounts WHERE vkey= ? LIMIT 1 `;
  database.query(tokenCheckerSql, [vkey], function (err, tokenCheker) {
    if (tokenCheker) {
      if (tokenCheker.length === 1) {
        let activateEmailSql = `UPDATE accounts SET verified= ? WHERE vkey=? LIMIT 1`;
        database.query(
          activateEmailSql,
          [verified, vkey],
          function (error, activateEmail) {
            if (activateEmail) {
              res.json({
                success: "Your Account  has been Verified. You may now Login!",
              });
            } else {
              res.json({
                error: "Your Email cannot Verified. Please Try Again!",
              });
            }
            if (error) {
              res.json({ error: "System is Error. Please Try Again!" });
            }
          }
        );
      } else {
        res.json({ warn: "Invalid Token! Please Try Again!" });
      }
    } else {
      res.json({ warn: "Invalid Token! Please Try Again!" });
    }
    if (err) {
      res.json({ error: "System is Error. Please Try Again!" });
    }
  });
});

app.post("/forgetpassword", (req, res) => {
  const email = req.body.email;

  let emailCheckerSql = "SELECT * FROM accounts WHERE email =? LIMIT 1";
  database.query(emailCheckerSql, [email], (error, emailChecker) => {
    if (error) {
      res.json({ error: "System is Error. Please Try Again!" });
    }

    if (emailChecker) {
      if (emailChecker.length === 1) {
        var today = new Date();
        var date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        var time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        const token = date + time + email;

        const emailToken = jwt.sign(token, process.env.EMAIL_TOKEN);

        let forgetPasswordSql =
          "INSERT INTO password_reset(email, token) VALUES (?,?);";

        database.query(
          forgetPasswordSql,
          [email, emailToken],
          (err, forgetPassword) => {
            if (err) {
            }

            if (forgetPassword) {
              let mailDetails = {
                from: process.env.ADMIN_EMAIL,
                to: email,
                subject: "[Zom-IN] Recover your Password!",
                html: `
                    <div style="background-color: #f8f9fa;color: #000;width: 80%;text-align: center;margin:0 auto;padding: 20px;">
                    <div class="content-header">
                    <img style="width: 100%;object-fit: contain;height: 50px;" src="https://www.zom-in.com/images/img/logo.png" alt="zomin logo">
                    </div>
                    <div style="background-color: #fff;padding: 10px 20px;">
                    <h1 style="font-family: sans-serif;font-size: 24px;font-weight: 600;line-height: 46px;letter-spacing: -0.6px;color: #231815;">Recover your password</h1>
                    <h3 style="font-size: 1em;font-weight: normal;color: #262626;font-family: Helvetica, Sans-Serif;word-break: break-word;">Hello</h3>
                    <h3 style="font-size: 1.1em;font-weight: normal;color: #262626;font-family: Helvetica, Sans-Serif;word-break: break-word;"> We've received a request to reset your password for your ZOM-IN account: ${email}</h3>
                    <p style="font-size: 1.1em;font-weight: normal;color: #262626;font-family: Helvetica, Sans-Serif;word-break: break-word;"> We're here to help! Simply click on the link below to set your new password:</p>
                    <a href="http://localhost:3000/resetpassword/${emailToken}" style="background: #85DDF0;background-image: -webkit-linear-gradient(top, #85DDF0, #5CC9E1);background-image: -moz-linear-gradient(top, #85DDF0, #5CC9E1);background-image: -ms-linear-gradient(top, #85DDF0, #5CC9E1);background-image: -o-linear-gradient(top, #85DDF0, #5CC9E1);background-image: linear-gradient(to bottom, #85DDF0, #5CC9E1);-webkit-border-radius: 30px;-moz-border-radius: 30px;border-radius: 30px;color: #FFFFFF;font-family: sans-serif;font-size: .875rem;font-weight: 500;padding: 10px 16px;margin: 5px 5px 10px;box-shadow: 1px 2px 1px 0px #EAECEC;-webkit-box-shadow: 1px 2px 1px 0px #EAECEC;-moz-box-shadow: 1px 2px 1px 0px #EAECEC;text-shadow: 1px 1px 2px #AAAAAA;text-decoration: none;display: inline-block;cursor: pointer;text-align: center;transition: 0.2s;text-transform: uppercase;border: none;outline: none;overflow: hidden;vertical-align: middle;letter-spacing: 0.1rem;line-height: 1;">Recover Password</a>
                    <p style="font-size: 1.1em;font-weight: normal;color: #262626;font-family: Helvetica, Sans-Serif;word-break: break-word;">If you suddenly recalled your password, don't worry. Your password is still safe. Just ignore this email and login with your old password.</p>
                    </div> 
                    <div>
                    <p style="font-size: 13px;color:#262626;">Having trouble with the link in this email? Copy and paste this link into your browser to recover your password:</p>
                    <a  target="_blank" style="font-size: 12px;text-decoration: none;color: #216FBD;font-weight: normal;word-break: break-word;">http://localhost:3000/resetpassword/${emailToken}</a>
                    </div>
                    <div>
                    <p style="font-size: 13px;color:#262626;">Have a question? Contact us:
                        <a href="" style="font-size: 12px;text-decoration: none;color: #216FBD;font-weight: normal;word-break: break-word;">admin@zom-in.com</a>
                    </p>
                    </div>
                    </div>
                `,
              };

              mailTransporter.sendMail(mailDetails, function (err, data) {
                if (err) {
                  res.json({
                    error: "System is Error. Please Try Again!",
                  });
                } else {
                  res.json({
                    success:
                      "Message has been sent. Please check your email inbox.",
                  });
                }
              });
            }
          }
        );
      } else {
        res.json({
          warn: "Sorry, no user exists on our system with that email",
        });
      }
    }
  });
});

app.post("/resetpassword/token", function (req, res) {
  const vkey = req.body.token;
});

module.exports = app;
