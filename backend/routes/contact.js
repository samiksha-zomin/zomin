require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

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
let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PSWD,
  },
});

app.post("/", (req, res) => {
  const { name, email, phone, about } = req.body;

  let contactSql =
    "INSERT INTO contact(name, email, phone, description) VALUES(?,?,?,?)";

  database.query(contactSql, [name, email, phone, about], (err, contact) => {
    if (err) {
      res.json({
        error: "System is Error. Please Try Again!",
      });
    }

    if (contact) {
      //Sending Email to Candidate
      var sendMailtoUser = {
        from: process.env.ADMIN_EMAIL,
        to: email,
        subject: "[Zom-IN] Thanks for Contact Us!",
        html: `
                <div style="background-color: #f8f9fa;color: #000;width: 80%;text-align: center;margin:0 auto;padding: 20px;">
                <div class="content-header">
                    <img style="width: 100%;object-fit: contain;height: 50px;" src=${process.env.ZOMIN_LOGO} alt="zomIN logo">
                </div>
                <div style="background-color: #fff;padding: 10px 20px;">
                    <h3 style="font-size: 1em;font-weight: normal;color: #262626;font-family: Helvetica, Sans-Serif;word-break: break-word;">Dear ${name},</h3>
                    <h1 style="font-family: sans-serif;font-size: 24px;font-weight: 600;line-height: 46px;letter-spacing: -0.6px;color: #231815;">xThank you so much for reaching out!</h1>
                    <h3 style="font-size: 1.1em;font-weight: normal;color: #262626;font-family: Helvetica, Sans-Serif;word-break: break-word;">We received your email and will get back to you to response your questions as soon as possible. 
								This may take us a few hours to reply your answer.If you have general questions about Zom-IN, check out our for walkthroughs and answers to FAQs.
								If you have any additional information that you think will help us to assist you, please feel free to reply to this email.</h3>
                </div> 
                <div>
                    <p style="font-size: 13px;color:#262626;" >Regards,</p>
                    <a href="https://zom-in.com/"  target="_blank" style="font-size: 12px;text-decoration: none;color: #216FBD;font-weight: normal;word-break: break-word;">www.zom-in.com</a>
                </div>
            </div>
                `,
      };

      mailTransporter.sendMail(sendMailtoUser, function (err, data) {
        if (err) {
          res.json({
            error: "System is Error. Please Try Again!",
          });
        } else {
              var mailOptions = {
                from: process.env.ADMIN_EMAIL,
                to: process.env.ALTER_ADMIN_EMAIL,
                subject: "[Zom-IN] Contact US",
                html: `
                    <div style="background-color: #f8f9fa;color: #000;width: 80%;text-align: center;margin:0 auto;padding: 20px;">
                    <div class="content-header">
                        <img style="width: 100%;object-fit: contain;height: 50px;" src=${process.env.ZOMIN_LOGO} alt="zomin logo">
                    </div>
                    <div style="background-color: #fff;padding: 10px 20px;">
                        <h3 style="font-size: 1em;font-weight: normal;color: #262626;font-family: Helvetica, Sans-Serif;word-break: break-word;">Dear Admin,</h3>
                        <h1 style="font-family: sans-serif;font-size: 24px;font-weight: 600;line-height: 46px;letter-spacing: -0.6px;color: #231815;">New Question from Contact Us</h1>
                        <p style="font-size: 13px;color:#262626;">We\'ve received a new contact us . Please find below for the user\'s information:</p>
                        
                        <p style="font-size: 13px;color:#262626;text-align: left;padding: 0 5%;">Name: ${name}</p>
                        <p style="font-size: 13px;color:#262626;text-align: left;padding: 0 5%;">Email: ${email}</p>
                        <p style="font-size: 13px;color:#262626;text-align: left;padding: 0 5%;">Contact Number: ${phone}</p>
                        <p style="font-size: 13px;color:#262626;text-align: left;padding: 0 5%;">Description: ${about}</p>
                    </div> 
        
                </div>
                    `,
              };
              mailTransporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                  res.json({
                    error: "System is Error. Please Try Again!",
                  });
                } else {
                  res.json({
                    success: "We received your email and will get back to you to response your questions as soon as possible.",
                  });
                }
              });
        }
      });
    }
  });
});

module.exports = app;
