require("dotenv").config();
const express = require("express");
// const passport = require('passport');
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/Auth");

const bcrypt = require("bcryptjs");
const saltRounds = 10;
const md5 = require("md5");
const nodemailer = require("nodemailer");

// const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));

const database = require("../config/database");
const { authenticate } = require("passport");
let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PSWD,
  },
});


// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: process.env.GOOGLE_CALLBACK_URL
// },
// async(accessToken, refreshToken, profile, cb) => {
//   // User.findOrCreate({ googleId: profile.id }, function (err, user) {
//   //   return cb(err, user);
//   // });

//   console.log(accessToken);
//   console.log(refreshToken);
//   console.log(profile);
// }
// ));



app.get("/authenticate", validateToken, (req, res) => {
  res.json(req.user);
});

app.post("/signup", async (req, res) => {
  const { fullName, email, phone, password } = req.body;
  const admin = 0;
  const company = 0;
  const copyright = 1;

  //Check on existing email
  let emailCheckerSql = `SELECT email FROM accounts WHERE email= ? `;
  database.query(emailCheckerSql, [email], function (err, emailChecker) {
    if (emailChecker) {
      if (emailChecker.length === 0) {
        //Block Domain Email Address by Admin
        const emailDomain = email.replace(/.*@/, "");
        let emailBlockSql = `SELECT * FROM email_blocker where email_blocker=? `;

        database.query(
          emailBlockSql,
          [emailDomain],
          function (err, emailBlock) {
            if (emailBlock.length === 0) {
              //Encrypt the password
              bcrypt.hash(password, saltRounds, function (error, hash) {
                if (hash) {
                  //Generate token for verifying email
                  const emailToken = jwt.sign(email, process.env.EMAIL_TOKEN);
                  let signUpSql = ` INSERT INTO accounts (name, email, contnum, password2, admin, company, copy_right, vkey) VALUES ( ?,?,?,?,?,?,?,? )`;

                  database.query(
                    signUpSql,
                    [
                      fullName,
                      email,
                      phone,
                      hash,
                      admin,
                      company,
                      copyright,
                      emailToken,
                    ],
                    (err, result) => {
                      if (result) {
                        //Send Email to user to verify
                        let mailDetails = {
                          from: process.env.ADMIN_EMAIL,
                          to: email,
                          subject: "[Zom-IN] Activate your Account!",
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
                                                <a href="http://localhost:3000/Verify/${emailToken}" style="background: #85DDF0;background-image: -webkit-linear-gradient(top, #85DDF0, #5CC9E1);background-image: -moz-linear-gradient(top, #85DDF0, #5CC9E1);background-image: -ms-linear-gradient(top, #85DDF0, #5CC9E1);background-image: -o-linear-gradient(top, #85DDF0, #5CC9E1);background-image: linear-gradient(to bottom, #85DDF0, #5CC9E1);-webkit-border-radius: 30px;-moz-border-radius: 30px;border-radius: 30px;color: #FFFFFF;font-family: sans-serif;font-size: .875rem;font-weight: 500;padding: 10px 16px;margin: 5px 5px 10px;box-shadow: 1px 2px 1px 0px #EAECEC;-webkit-box-shadow: 1px 2px 1px 0px #EAECEC;-moz-box-shadow: 1px 2px 1px 0px #EAECEC;text-shadow: 1px 1px 2px #AAAAAA;text-decoration: none;display: inline-block;cursor: pointer;text-align: center;transition: 0.2s;text-transform: uppercase;border: none;outline: none;overflow: hidden;vertical-align: middle;letter-spacing: 0.1rem;line-height: 1;">ACTIVATE</a>
                                                </div> 
                                                <div>
                                                <p style="font-size: 13px;color:#262626;">Having trouble with the link in this email? Copy and paste this link into your browser to verify:</p>
                                                <a  target="_blank" style="font-size: 12px;text-decoration: none;color: #216FBD;font-weight: normal;word-break: break-word;">http://localhost:3000/Verify/${emailToken}</a>
                                                </div>
                                                <div>
                                                <p style="font-size: 13px;color:#262626;">Have a question? Contact us:
                                                    <a href="" style="font-size: 12px;text-decoration: none;color: #216FBD;font-weight: normal;word-break: break-word;">admin@zom-in.com</a>
                                                </p>
                                                </div>
                                                </div>
                                            `,
                        };

                        mailTransporter.sendMail(
                          mailDetails,
                          function (err, data) {
                            if (err) {
                              res.json({
                                error: "System is Error. Please Try Again!",
                              });
                            } else {
                              {
                                res.json({
                                  success: "Email sent successfully",
                                });
                              }
                            }
                          }
                        );
                      }

                      if (err) {
                        res.json({
                          error: "System is Error. Please Try Again!",
                        });
                      }
                    }
                  );
                }
                if (error) {
                  res.json({ error: "System is Error. Please Try Again!" });
                }
              });
            } else {
              res.json({ warn: "This Email is Invalid!" });
            }
          }
        );
      } else {
        res.json({ warn: "This Email already exists!" });
      }
    }

    if (err) {
      res.json({ error: "System is Error. Please Try Again!" });
    }
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let emailCheckerSql = `SELECT * from accounts where email= ? `;

  database.query(emailCheckerSql, [email], (err, emailChecker) => {
    if (emailChecker.length !== 0) {
      if (emailChecker[0].password2 !== null) {
        const hash = emailChecker[0].password2;
        bcrypt.compare(password, hash, function (error, passwordChecker) {
          if (error) {
            res.json({ error: "System is Error. Please Try Again!a" });
          }
          if (passwordChecker) {
            if (emailChecker[0].verified === 1) {
              if (emailChecker[0].status === 1) {
                const accessToken = sign(
                  {
                    id: emailChecker[0].id,
                    admin: emailChecker[0].admin,
                    company: emailChecker[0].company,
                    attempt: emailChecker[0].attempt,
                  },
                  process.env.SESSION_CODE
                );
                res.json({
                  token: accessToken,
                  id: emailChecker[0].id,
                  admin: emailChecker[0].admin,
                  company: emailChecker[0].company,
                  attempt: emailChecker[0].attempt,
                });
              } else {
                res.json({
                  warn: "Your Account have been blocked. Please contact our team!",
                });
              }
            } else {
              res.json({ warn: "Please Verify your account!" });
            }
          } else {
            res.json({ error: "Wrong email / password!" });
          }
        });
      } else {
        const oldpassword = md5(password);
        if (emailChecker[0].password === oldpassword) {
          const accessToken = sign(
            {
              id: emailChecker[0].id,
              admin: emailChecker[0].admin,
              company: emailChecker[0].company,
              attempt: emailChecker[0].attempt,
            },
            process.env.SESSION_CODE
          );
          res.json({
            token: accessToken,
            id: emailChecker[0].id,
            admin: emailChecker[0].admin,
            company: emailChecker[0].company,
            attempt: emailChecker[0].attempt,
          });
        } else {
          res.json({ warn: "Wrong email / password!" });
        }
      }

    } else {
      res.json({ error: "Email does not Exist!" });
    }

    if (err) {
      res.json({ error: "System is Error. Please Try Again!" });
    }
  });
});

app.post("/employer/signup", async (req, res) => {
  const { companyName, industry, fullName, email, phone, password } = req.body;
  const admin = 0;
  const company = 1;
  const copyright = 1;

  let emailCheckerSql = `SELECT * from accounts where email= ? `;

  database.query(emailCheckerSql, [email], function (err, emailChecker) {
    if (err) {
      res.json({ error: "System is Error. Please Try Again!qrfv" });
    }

    if (emailChecker) {
      if (emailChecker.length === 0) {
        //Block Domain Email Address by Admin
        const emailDomain = email.replace(/.*@/, "");
        let emailBlockSql = `SELECT * FROM email_blocker where email_blocker=? `;

        database.query(emailBlockSql, [emailDomain], (err, emailBlock) => {
          if (err) {
            res.json({ error: "System is Error. Please Try Again!fwef" });
          }

          if (emailBlock.length === 0) {
            //Encrypt the password
            bcrypt.hash(password, saltRounds, (error, hash) => {
              if (error) {
                res.json({ error: "System is Error. Please Try Again!gbgb" });
              }

              if (hash) {
                //Generate token for verifying email
                const emailToken = jwt.sign(email, process.env.EMAIL_TOKEN);
                let signUpSql = ` INSERT INTO accounts (companyname, industry	, name, email, contnum, password2, admin, company, copy_right, vkey) VALUES ( ?,?,?,?,?,?,?,?,?,? )`;

                database.query(
                  signUpSql,
                  [
                    companyName,
                    industry,
                    fullName,
                    email,
                    phone,
                    hash,
                    admin,
                    company,
                    copyright,
                    emailToken,
                  ],
                  (err, result) => {
                    if (err) {
                      res.json({ error: "System is Error. Please Try Again!mngjmntg" });
                    }

                    if (result) {
                      //Send Email to user to verify
                      let mailDetails = {
                        from: process.env.ADMIN_EMAIL,
                        to: email,
                        subject: "[Zom-IN] Activate your Account!",
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
                                <a href="http://localhost:3000/Verify/${emailToken}" style="background: #85DDF0;background-image: -webkit-linear-gradient(top, #85DDF0, #5CC9E1);background-image: -moz-linear-gradient(top, #85DDF0, #5CC9E1);background-image: -ms-linear-gradient(top, #85DDF0, #5CC9E1);background-image: -o-linear-gradient(top, #85DDF0, #5CC9E1);background-image: linear-gradient(to bottom, #85DDF0, #5CC9E1);-webkit-border-radius: 30px;-moz-border-radius: 30px;border-radius: 30px;color: #FFFFFF;font-family: sans-serif;font-size: .875rem;font-weight: 500;padding: 10px 16px;margin: 5px 5px 10px;box-shadow: 1px 2px 1px 0px #EAECEC;-webkit-box-shadow: 1px 2px 1px 0px #EAECEC;-moz-box-shadow: 1px 2px 1px 0px #EAECEC;text-shadow: 1px 1px 2px #AAAAAA;text-decoration: none;display: inline-block;cursor: pointer;text-align: center;transition: 0.2s;text-transform: uppercase;border: none;outline: none;overflow: hidden;vertical-align: middle;letter-spacing: 0.1rem;line-height: 1;">ACTIVATE</a>
                                </div> 
                                <div>
                                <p style="font-size: 13px;color:#262626;">Having trouble with the link in this email? Copy and paste this link into your browser to verify:</p>
                                <a  target="_blank" style="font-size: 12px;text-decoration: none;color: #216FBD;font-weight: normal;word-break: break-word;">http://localhost:3000/Verify/${emailToken}</a>
                                </div>
                                <div>
                                <p style="font-size: 13px;color:#262626;">Have a question? Contact us:
                                    <a href="" style="font-size: 12px;text-decoration: none;color: #216FBD;font-weight: normal;word-break: break-word;">admin@zom-in.com</a>
                                </p>
                                </div>
                                </div>
                            `,
                      };

                      mailTransporter.sendMail(
                        mailDetails,
                        function (err, data) {
                          if (err) {
                            res.json({
                              error: "System is Error. Please Try Again!rvger",
                            });
                          } else {
                            //Admin Info
                            let adminInfoSql =
                              "SELECT email FROM accounts WHERE verified=1 AND admin=1;";
                            database.query(
                              adminInfoSql,
                              (adminInfoErr, adminInfoRes) => {
                                if (adminInfoErr) {
                                  res.json({
                                    error: "System is Error. Please Try Again!njtyuj",
                                  });
                                }
                                if (adminInfoRes) {
                                  const emailDetails = adminInfoRes;
                                  var emailList = emailDetails
                                    .map((item) => {
                                      return item.email;
                                    })
                                    .join(",");

                                  var mailOptions = {
                                    from: process.env.ADMIN_EMAIL,
                                    to: emailList,
                                    subject: "[Zom-IN] NEW COMPANY SIGN UP",
                                    html: `
                                    <div style="background-color: #f8f9fa;color: #000;width: 80%;text-align: center;margin:0 auto;padding: 20px;">
            <div class="content-header">
                <img style="width: 100%;object-fit: contain;height: 50px;" src="https://www.zom-in.com/images/img/logo.png" alt="zomin logo">
				<p style="display:none !important;visibility:hidden;mso-hide:all;font-size:1px;color:#f8f9fa;line-height:1px;max-height:0px; max-width:0px;opacity:0;overflow:hidden;">A new account have been created! Here are the details:</p>
            </div>
            <div style="background-color: #fff;padding: 10px 20px;">
                <h3 style="font-size: 1em;font-weight: normal;color: #262626;font-family: Helvetica, Sans-Serif;word-break: break-word;">Dear Admin,</h3>
                <h1 style="font-family: sans-serif;font-size: 24px;font-weight: 600;line-height: 46px;letter-spacing: -0.6px;color: #231815;">New Company Sign Up</h1>
                <p style="font-size: 13px;color:#262626;">A new account have been created! Here are the details:</p>
                <p style="font-size: 13px;color:#262626;text-align: left;padding: 0 5%;">Company Name: ${companyName}</p>
                <p style="font-size: 13px;color:#262626;text-align: left;padding: 0 5%;">Industry: ${industry}</p>
                <p style="font-size: 13px;color:#262626;text-align: left;padding: 0 5%;">Representative Name: ${fullName}</p>
                <p style="font-size: 13px;color:#262626;text-align: left;padding: 0 5%;">Representative Email: ${email}</p>
                <p style="font-size: 13px;color:#262626;text-align: left;padding: 0 5%;">Contact Number: ${phone}</p>
            </div> 

        </div>
                                    `,
                                  };
                                  mailTransporter.sendMail(
                                    mailOptions,
                                    (err, data) => {
                                      if (err) {
                                        res.json({
                                          error:
                                            "System is Error. Please Try Again!",
                                        });
                                      } else {
                                        res.json({
                                          success: "Email sent successfully",
                                        });
                                      }
                                    }
                                  );
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                );
              }
            });
          } else {
            res.json({ warn: "This Email is Invalid!" });
          }
        });
      } else {
        res.json({ warn: "This Email already exists!" });
      }
    }
  });
});


// app.get("/google/zomin",
// passport.authenticate('google', { scope: ['profile'] }),

// console.log("hih"));

// app.get('/google/zomin', 
//   passport.authenticate('google', { failureRedirect: '/signup' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });

// app.get ("/google/zomin", passport.authenticate('google', { scope: ['profile'] })
// );

// app.get('/google/zomin', 
//   passport.authenticate('google', { failureRedirect: '/signup' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });

module.exports = app;
