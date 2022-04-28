require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

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
let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PSWD,
  },
});

app.get("/applicationNum", validateToken, async (req, res) => {
  const userID = req.user.id;

  let applicationSql = `
    SELECT DISTINCT COUNT(*) AS pendingNum
    FROM grab_opportunity grab, opportunity_give give
    where grab.give_oppo_id=give.oppo_id
    and give.user_id=?
    and grab.send_bp=1 and grab.approve_candidate=0;

    SELECT DISTINCT COUNT(*) AS rejectNum
    FROM grab_opportunity grab, opportunity_give give
    where grab.give_oppo_id=give.oppo_id
    and give.user_id=?
    and grab.send_bp=1 and grab.approve_candidate=1;

    SELECT DISTINCT COUNT(*) AS hiredNum
    FROM grab_opportunity grab, opportunity_give give
    where grab.give_oppo_id=give.oppo_id
    and give.user_id=?
    and grab.send_bp=1 and grab.approve_candidate=2;

    SELECT DISTINCT COUNT(*) AS shortlistedNum
    FROM grab_opportunity grab, opportunity_give give
    where grab.give_oppo_id=give.oppo_id
    and give.user_id=?
    and grab.send_bp=1 and grab.approve_candidate=3;
    
    SELECT DISTINCT COUNT(*) AS withdrewNum
    FROM grab_opportunity grab, opportunity_give give
    where grab.give_oppo_id=give.oppo_id
    and give.user_id=?
    and grab.send_bp=1 and grab.approve_candidate=4;
    
    SELECT DISTINCT COUNT(*) AS allApplicationNum
    FROM grab_opportunity grab, opportunity_give give
    where grab.give_oppo_id=give.oppo_id
    and give.user_id=?
    and grab.send_bp=1;
    `;

  database.query(
    applicationSql,
    [userID, userID, userID, userID, userID, userID],
    (err, applicationNum) => {
      if (applicationNum) {
        res.send(applicationNum);
      }
      if (err) {
        console.log(err);
      }
    }
  );
});


app.get("/jobapplicationNum", validateToken, async (req, res) => {
  const userID = req.user.id;

  let applicationSql = `
    SELECT DISTINCT COUNT(*) AS pendingNum
    FROM grab_opportunity grab, opportunity_give give
    where grab.give_oppo_id=give.oppo_id
    and give.user_id=?
    and grab.send_bp=1 and grab.approve_candidate=0;

    SELECT DISTINCT COUNT(*) AS rejectNum
    FROM grab_opportunity grab, opportunity_give give
    where grab.give_oppo_id=give.oppo_id
    and give.user_id=?
    and grab.send_bp=1 and grab.approve_candidate=1;

    SELECT DISTINCT COUNT(*) AS hiredNum
    FROM grab_opportunity grab, opportunity_give give
    where grab.give_oppo_id=give.oppo_id
    and give.user_id=?
    and grab.send_bp=1 and grab.approve_candidate=2;

    SELECT DISTINCT COUNT(*) AS shortlistedNum
    FROM grab_opportunity grab, opportunity_give give
    where grab.give_oppo_id=give.oppo_id
    and give.user_id=?
    and grab.send_bp=1 and grab.approve_candidate=3;
    
    SELECT DISTINCT COUNT(*) AS withdrewNum
    FROM grab_opportunity grab, opportunity_give give
    where grab.give_oppo_id=give.oppo_id
    and give.user_id=?
    and grab.send_bp=1 and grab.approve_candidate=4;
    
    SELECT DISTINCT COUNT(*) AS allApplicationNum
    FROM grab_opportunity grab, opportunity_give give
    where grab.give_oppo_id=give.oppo_id
    and give.user_id=?
    and grab.send_bp=1;
    `;

  database.query(
    applicationSql,
    [userID, userID, userID, userID, userID, userID],
    (err, applicationNum) => {
      if (applicationNum) {
        res.send(applicationNum);
      }
      if (err) {
        console.log(err);
      }
    }
  );
});

app.get("/applicationStatusList", validateToken, async (req, res) => {
  const userID = req.user.id;

  let applicationListSql = `SELECT DISTINCT *
    FROM grab_opportunity grab, opportunity_give give
    where grab.give_oppo_id=give.oppo_id
    and give.user_id=?
    and grab.send_bp=1;`;

  database.query(applicationListSql, [userID], (err, applicationList) => {
    if (applicationList) {
      res.send(applicationList);
    }
    if (err) {
      console.log(err);
    }
  });
});

app.param("userID", function (req, res, next, userID) {
  req.userID = userID;
  next();
});

app.get("/username/:userID", (req, res) => {
  const userID = req.userID;

  let UserNameSql = "SELECT * FROM accounts WHERE id=? order by id asc;";

  database.query(UserNameSql, [userID], function (err, userName) {
    if (userName) {
      res.send(userName);
    }
    if (err) {
      console.log(err);
    }
  });
});

app.get("/userprofile/:userID", (req, res) => {
  const userID = req.userID;

  let UserProfileSql = "SELECT * FROM accounts WHERE id=?;SELECT * FROM user_photo WHERE user_id=? order by upload_date DESC LIMIT 1;SELECT * FROM user_profile WHERE user_id=?;";

  database.query(UserProfileSql, [userID, userID, userID], function (err, UserProfile) {
    if (UserProfile) {
      res.send(UserProfile);
    }
    if (err) {
      console.log(err);
    }
  });
});

app.post("/employer/application/hire", validateToken, async (req, res) => {
  const userID = req.user.id;
  const grabID = req.body.grabID;
  const hireCode = 2;

  let hireCddSql = `UPDATE grab_opportunity SET approve_candidate = ? WHERE grab_oppo_id = ?`;

  database.query(hireCddSql, [hireCode, grabID], (hireCddErr, hireCddRes) => {
    if (hireCddErr) {
      res.json({
        error: "System is Error. Please Try Again!",
      });
    }

    if (hireCddRes) {
      // get Grab Oppo Details
      let getOppoDetailsSql = `SELECT distinct * FROM grab_opportunity grab, opportunity_give give where grab.give_oppo_id=give.oppo_id and give.user_id=? AND grab.grab_oppo_id=? ORDER BY grab.grab_oppo_id DESC;`;

      database.query(
        getOppoDetailsSql,
        [userID, grabID],
        (getOppoDetailsErr, getOppoDetailsRes) => {
          if (getOppoDetailsErr) {
            res.json({
              error: "System is Error. Please Try Again!",
            });
          }

          if (getOppoDetailsRes) {
            const jobTitle = getOppoDetailsRes[0].job_title;
            const cddID = getOppoDetailsRes[0].candidate_user_id;

            // get Employer Details
            let getEmployerDetailsSql = `SELECT * FROM accounts WHERE id=?`;

            database.query(
              getEmployerDetailsSql,
              [userID],
              (getEmployerDetailsErr, getEmployerDetailsRes) => {
                if (getEmployerDetailsErr) {
                  res.json({
                    error: "System is Error. Please Try Again!",
                  });
                }
                if (getEmployerDetailsRes) {
                  const employerName = getEmployerDetailsRes[0].companyname;
                  const employerEmail = getEmployerDetailsRes[0].email;
                  const EmployerRepresentativeName =
                    getEmployerDetailsRes[0].name;

                  // get Candidate Details
                  let getCandidateDetailSql = `SELECT * FROM accounts WHERE id=?`;

                  database.query(
                    getCandidateDetailSql,
                    [cddID],
                    (getCandidateDetailErr, getCandidateDetailRes) => {
                      if (getCandidateDetailErr) {
                        res.json({
                          error: "System is Error. Please Try Again!",
                        });
                      }

                      if (getCandidateDetailRes) {
                        const candidateName = getCandidateDetailRes[0].name;
                        const candidateEmail = getCandidateDetailRes[0].email;

                        //Sending Email to Candidate
                        var sendMailtoCandidate = {
                          from: process.env.ADMIN_EMAIL,
                          to: candidateEmail,
                          subject: "[Zom-IN] Congratulations! You're Selected!",
                          html: `
                        <div style="background-color: #f8f9fa;color: #000;width: 80%;text-align: center;margin:0 auto;padding: 20px;">
                        <div class="content-header">
                            <img style="width: 100%;object-fit: contain;height: 50px;" src=${process.env.ZOMIN_LOGO} alt="zomIN logo">
                            <p style="display:none !important;visibility:hidden;mso-hide:all;font-size:1px;color:#f8f9fa;line-height:1px;max-height:0px; max-width:0px;opacity:0;overflow:hidden;">
                            The ${employerName} has selected you as the final candidate for the ${jobTitle}. 
                            </p>
                        </div>
                        <div style="background-color: #fff;padding: 10px 20px;">
                            <h3 style="font-size: 1em;font-weight: normal;color: #262626;font-family: Helvetica, Sans-Serif;word-break: break-word;">Dear ${candidateName},</h3>
                            <h1 style="font-family: sans-serif;font-size: 24px;font-weight: 600;line-height: 46px;letter-spacing: -0.6px;color: #231815;">Congratulations! You’re Selected!</h1>
                            <p style="font-size: 13px;color:#262626;">Congratulations! The ${employerName} has selected you as the final candidate for the ${jobTitle}.</p>

                            <p style="font-size: 13px;color:#262626;text-align: left;padding: 0 5%;">Their team will take over from here and will reach out to you for further discussion on the offering. </p>
                <p style="font-size: 13px;color:#262626;text-align: left;padding: 0 5%;">However, you can still stay in touch with us when you need any help. Once again, congratulations to you! </p>
                        </div> 
                        <div>
                        <p style="font-size: 13px;color:#262626;">PS/ Please don’t be stingy to share ZOM-IN to your other friends who are searching for opportunities too. Million thanks in advance! </p>
                        </div>
                        <div>
                            <p style="font-size: 13px;color:#262626;" >Regards,</p>
                            <a href="https://zom-in.com/"  target="_blank" style="font-size: 12px;text-decoration: none;color: #216FBD;font-weight: normal;word-break: break-word;">www.zom-in.com</a>
                        </div>
                    </div>
                        `,
                        };

                        mailTransporter.sendMail(
                          sendMailtoCandidate,
                          (err, data) => {
                            if (err) {
                              res.json({
                                error: "System is Error. Please Try Again!",
                              });
                            } else {
                              res.json({
                                success: "Successfully notify the candidate.",
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
});

app.patch("/jobStatus/", validateToken, async (req, res) => {
  const userID = req.user.id;

  const jobCode = req.body.jobCode;
  const grabID = req.body.grabID;
  let jobStatusSql = `UPDATE grab_opportunity SET approve_candidate = ? WHERE grab_oppo_id = ?`;

  database.query(
    jobStatusSql,
    [jobCode, grabID],
    (jobStatusErr, jobStatusRes) => {
      if (jobStatusErr) {
        res.json({
          error: "System is Error. Please Try Again!",
        });
      }

      if (jobStatusRes) {
        let applicationListSql = `SELECT DISTINCT *
    FROM grab_opportunity grab, opportunity_give give
    where grab.give_oppo_id=give.oppo_id
    and give.user_id=?
    and grab.send_bp=1;`;

        database.query(
          applicationListSql,
          [userID],
          (applicationListErr, applicationListRes) => {
            if (applicationListErr) {
              res.json({
                error: "System is Error. Please Try Again!",
              });
            }
            if (applicationListRes) {
              // 0 -pending
              if (jobCode === "0") {
                res.json({
                  success: "Successfully pending the candidate.",
                  list: applicationListRes,
                });
              }

              // 1 -reject
              if (jobCode === "1") {
                res.json({
                  success: "Successfully rejecting the candidate.",
                  list: applicationListRes,
                });
              }

              // 2 -hired
              if (jobCode === "2") {
                res.json({
                  success: "Successfully hiring the candidate.",
                  list: applicationListRes,
                });
              }

              // 3 -shortlisted
              if (jobCode === "3") {
                res.json({
                  success: "Successfully shortlisting the candidate.",
                  list: applicationListRes,
                });
              }
            }
          }
        );
      }
    }
  );
});

app.get("/interviewList", validateToken, async (req, res) => {
  const userID = req.user.id;

  let interviewListSql = 'SELECT * FROM interviewOption io, opportunity_give og WHERE  bp_id=? AND og.oppo_id=io.opportunity_id  ORDER BY interviewDate DESC, interviewTime DESC';

  database.query(interviewListSql, [userID], (interviewListErr, interviewListRes) => {
    if(interviewListErr){
      res.json({
        error: "System is Error. Please Try Again!",
      });
    }

    if(interviewListRes) {
      res.send(interviewListRes);
    }
  })
  
});

module.exports = app;
