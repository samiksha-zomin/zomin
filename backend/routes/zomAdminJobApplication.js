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
  SELECT grab.*, acc.name, acc.email, acc.contnum, give.job_title, give.job_type, emp.companyname FROM grab_opportunity grab, opportunity_give give, accounts acc, accounts emp WHERE acc.id=grab.candidate_user_id and give.oppo_id=grab.give_oppo_id 
  and give.user_id=emp.id
  ORDER BY grab.grab_oppo_id;
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

  const remarks = list.grab_remarks;
  const oppo_id = list.grab_oppo_id;

  let updateSql = `UPDATE grab_opportunity set 
      grab_remarks=?
       WHERE grab_oppo_id = ?`;

  database.query(updateSql, [remarks, oppo_id], (err, updateList) => {
    if (updateList) {
      let getDataSql = `
        SELECT grab.*, acc.name, acc.email, acc.contnum, give.job_title, give.job_type, emp.companyname FROM grab_opportunity grab, opportunity_give give, accounts acc, accounts emp WHERE acc.id=grab.candidate_user_id and give.oppo_id=grab.give_oppo_id 
        and give.user_id=emp.id
        ORDER BY grab.grab_oppo_id;
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

app.patch("/sendToBP", (req, res) => {
  const sendToBP = req.body;
  let status = false;
  sendToBP.forEach((element) => {
    let updateSql = `UPDATE grab_opportunity set approve_candidate=2 WHERE grab_oppo_id = ?`;
    database.query(updateSql, [element.grab_oppo_id], (err, updateList) => {
      if (updateList) {
        let sendEmailDataSql = `SELECT grab.*, give.job_title, give.user_id FROM grab_opportunity grab, opportunity_give give where grab.give_oppo_id=give.oppo_id AND grab.grab_oppo_id=?`;
        database.query(
          sendEmailDataSql,
          [element.grab_oppo_id],
          (err, sendEmailData) => {

            const sendBPInfo =sendEmailData[0];

            let sentBP = sendBPInfo.send_bp;
            let cddID = sendBPInfo.candidate_user_id;
            let employerID = sendBPInfo.user_id;
            let jobTitle = sendBPInfo.job_title;
            console.log(sentBP)
            console.log(employerID)
            console.log(jobTitle)
            console.log(cddID)
            if(sentBP !== 1)  {

              let getInfoEmailSql = `SELECT * FROM accounts WHERE id=?;SELECT * FROM accounts WHERE id=?;`;

              database.query (getInfoEmailSql, [employerID, cddID], (err, getInfoEmail) => {
                if(getInfoEmail) {
                  let employerRepresentativeName = getInfoEmail[0].name;
                  let employerName = getInfoEmail[0].companyname;
                  let candidateName = getInfoEmail[1].name;

                console.log(employerRepresentativeName)
                console.log(employerName)
                console.log(candidateName)
                }

                if(err) {
                  res.json({
                    error: "System is Error. Please Try Again!",
                  });
                }

              })
              status = !status;
            }


            // if (sentBP === 1) {
            //   status = !status;
            // } else {

            //   let getInfoEmailSql= ``;
            //   database.query(getInfoEmailSql, [], (err, getInfoEmail) => {

            //     const jobInfo = getInfoEmail[0];
            // const sentBP = jobInfo[0].send_bp;



            //                   //Sending Email to Candidate
            //   var sendMailtoCandidate = {
            //     from: process.env.ADMIN_EMAIL,
            //     to: candidateEmail,
            //     subject: '[Zom-IN] Congratulations! There is a candidate applying for position with ${}',
            //     html: `
            //       <div style="background-color: #f8f9fa;color: #000;width: 80%;text-align: center;margin:0 auto;padding: 20px;">
            //       <div class="content-header">
            //       <img style="width: 100%;object-fit: contain;height: 50px;" src="https://www.zom-in.com/images/img/logo.png" alt="zomin logo">
            //       <p style="display:none !important;visibility:hidden;mso-hide:all;font-size:1px;color:#f8f9fa;line-height:1px;max-height:0px; max-width:0px;opacity:0;overflow:hidden;">Congratulations! There\'s a candidate applying for position with '.$compname.'. </p>
            //       </div>
            //       <div style="background-color: #fff;padding: 10px 20px;">
            //       <h3 style="font-size: 1em;font-weight: normal;color: #262626;font-family: Helvetica, Sans-Serif;word-break: break-word;">Dear '.$comprepresentativename.',</h3>
            //       <h1 style="font-family: sans-serif;font-size: 24px;font-weight: 600;line-height: 46px;letter-spacing: -0.6px;color: #231815;">Congratulations! There\'s a candidate applying for position with '.$compname.'.</h1>
            //       <p style="font-size: 13px;color:#262626;">Please find below for the applicant\'s information: </p>
            //       <p style="font-size: 13px;color:#262626;">Position:   for '.$grab_job_title.'. </p>
            //       <p style="font-size: 13px;color:#262626;">Name: '.$candidatename.'</p>
            //       <p style="font-size: 13px;color:#262626;">School: '.$cddSchool.'</p>
            //       <p style="font-size: 13px;color:#262626;">Course: '.$cddStudy_field.'</p>
            //       <p style="font-size: 13px;color:#262626;">Please login to your ZOM-IN Dashboard to view more information about the candidate and Approve/Decline the application. Should you have other questions, please reach out to Belinda for further assistance. Thanks! </p>
            //       </div>

            //       <div>
            //       <p style="font-size: 13px;color:#262626;" >Regards,</p>
            //       <a href="https://zom-in.com/index.php"  target="_blank" style="font-size: 12px;text-decoration: none;color: #216FBD;font-weight: normal;word-break: break-word;">www.zom-in.com</a>
            //       </div>
            //       </div>
            //                           `,
            //   };
            //   })
            // }
          }
        );
      }
      if (err) {
        status = status;
      }
    });
  });
  if ((status = true)) {
    let getDataSql = `
    SELECT grab.*, acc.name, acc.email, acc.contnum, give.job_title, give.job_type, emp.companyname FROM grab_opportunity grab, opportunity_give give, accounts acc, accounts emp WHERE acc.id=grab.candidate_user_id and give.oppo_id=grab.give_oppo_id 
    and give.user_id=emp.id
    ORDER BY grab.grab_oppo_id;
            `;
    database.query(getDataSql, function (err, getData) {
      if (getData) {
        res.json({
          success: "Successfully sent email to BP.",
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
