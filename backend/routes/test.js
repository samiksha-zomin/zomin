require('dotenv').config();
const express = require("express");
const app = express();
const mysql = require("mysql");
const jwt = require('jsonwebtoken');

//Encrypt password
const bcrypt = require("bcrypt");
const saltRound = 10;

//Email
const nodemailer = require("nodemailer");

//Connect to database
const database = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "zomindb",
});


  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PSWD
    }
});
  


app.post('/signup', (req, res) => {

    const fullName = req.body.fullName;
    const email = req.body.email;
    const contactNumber = req.body.contactNumber;
    const password = req.body.password;
    const admin = 0;
    const company = 0;
    const copyright = 1;

    //Check on exist Email
    let emailCheckerSql = `SELECT COUNT(*) from accounts where email= ? `;
    database.query(emailCheckerSql, [email], (err, emailChecker) => {
        if (emailChecker < 0) {
            console.log("57");
            //Block Email Address by Admin
            const emailDomain = email.replace(/.*@/, "");

            let emailBlockSql = `SELECT COUNT(*) FROM email_blocker where email_blocker=? `;

            database.query(emailBlockSql, [emailDomain], (err, emailBlock) => {
                if (emailBlock < 0) {

                    //Encrypt the password
                    bcrypt.hash(password, saltRound, (error, hash) => {
                        if (error) {
                            res.send("System Error");
                            console.log("4!");
                        }

                        //Generate token for verifying email
                        const emailToken = jwt.sign(email, process.env.EMAIL_TOKEN);
                        let signUpSql = ` INSERT INTO accounts (name, email, contnum, password, admin, company, copy_right, vkey) VALUES ( ?,?,?,?,?,?,?,? )`;

                        database.query(signUpSql, [fullName, email, contactNumber, hash, admin, company, copyright, emailToken], (err, signUp) => {

                            if (err) {
                                res.send("System Error");
                                console.log('3');
                            }
                        });

                        if (signUp) {

                            //Send Email to user to verify 
                            let mailDetails = {
                                from: process.env.ADMIN_EMAIL,
                                to: email,
                                subject: '[Zom-IN] Activate your Account!',
                                html: `
                                        <div style="background-color: #f8f9fa;color: #000;width: 80%;text-align: center;margin:0 auto;padding: 20px;">
                                        <div class="content-header">
                                        <img style="width: 100%;object-fit: contain;height: 50px;" src="https://www.zom-in.com/images/img/logo.png" alt="zomin logo">
                                        </div>
                                        <div style="background-color: #fff;padding: 10px 20px;">
                                        <p style="display:none !important;visibility:hidden;mso-hide:all;font-size:1px;color:#f8f9fa;line-height:1px;max-height:0px; max-width:0px;opacity:0;overflow:hidden;">Just one more step, ${fullName}! Thank you for registering at zom-in.com</p>
                                        <h1 style="font-family: sans-serif;font-size: 24px;font-weight: 600;line-height: 46px;letter-spacing: -0.6px;color: #231815;">Verify your account</h1>
                                        <h3 style="font-size: 1em;font-weight: normal;color: #262626;font-family: Helvetica, Sans-Serif;word-break: break-word;">Hi, ${fullName}</h3>
                                        <h3 style="font-size: 1.1em;font-weight: normal;color: #262626;font-family: Helvetica, Sans-Serif;word-break: break-word;">Thanks for signing up, Activate your account now and start exploring opportunities.</h3>
                                        <a href="https://zom-in.com/verify.php?vkey=${emailToken}" style="background: #85DDF0;background-image: -webkit-linear-gradient(top, #85DDF0, #5CC9E1);background-image: -moz-linear-gradient(top, #85DDF0, #5CC9E1);background-image: -ms-linear-gradient(top, #85DDF0, #5CC9E1);background-image: -o-linear-gradient(top, #85DDF0, #5CC9E1);background-image: linear-gradient(to bottom, #85DDF0, #5CC9E1);-webkit-border-radius: 30px;-moz-border-radius: 30px;border-radius: 30px;color: #FFFFFF;font-family: sans-serif;font-size: .875rem;font-weight: 500;padding: 10px 16px;margin: 5px 5px 10px;box-shadow: 1px 2px 1px 0px #EAECEC;-webkit-box-shadow: 1px 2px 1px 0px #EAECEC;-moz-box-shadow: 1px 2px 1px 0px #EAECEC;text-shadow: 1px 1px 2px #AAAAAA;text-decoration: none;display: inline-block;cursor: pointer;text-align: center;transition: 0.2s;text-transform: uppercase;border: none;outline: none;overflow: hidden;vertical-align: middle;letter-spacing: 0.1rem;line-height: 1;">ACTIVATE</a>
                                        </div> 
                                        <div>
                                        <p style="font-size: 13px;color:#262626;">Having trouble with the link in this email? Copy and paste this link into your browser to verify:</p>
                                        <a  target="_blank" style="font-size: 12px;text-decoration: none;color: #216FBD;font-weight: normal;word-break: break-word;">https://zom-in.com/verify.php?vkey=${emailToken}</a>
                                        </div>
                                        <div>
                                        <p style="font-size: 13px;color:#262626;">Have a question? Contact us:
                                            <a href="" style="font-size: 12px;text-decoration: none;color: #216FBD;font-weight: normal;word-break: break-word;">admin@zom-in.com</a>
                                        </p>
                                        </div>
                                        </div>
                                    `
                            };

                            mailTransporter.sendMail(mailDetails, function(err, data) {
                                if(err) {
                                    console.log(err);
                                } else {
                                    console.log('Email sent successfully');
                                    res.send('Email sent successfully');

                                }
                            });
                        }
                    });

                } else {
                    res.send("Invalid Email!");
                    console.log("1!");
                }
            });

        } else {
            res.send("Email Exist!");
            console.log("Email Exist!");
        }
    });
});

app.post("/log", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    let sql = `SELECT * FROM account email = ? AND password =?`;

    database.query(sql, [email, password], (err, result) => {

        if (err) {
            res.send({ err: err });
        }


        if (result) {
            res.send(result);
        } else {
            res.send({ message: "Wrong password" });
        }


    }
    );
});

module.exports = app;