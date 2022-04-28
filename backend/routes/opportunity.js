require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const _ = require("lodash");
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
const { validateToken } = require("../middlewares/Auth");
let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PSWD,
  },
});

app.get("/list", (req, res) => {
  let opportunitylistSql = `
    SELECT * 
    FROM opportunity_give og, accounts acc, bp_application bp
    WHERE 
        og.fulfill=1 AND 
        og.approve=2 AND 
        acc.id=bp.user_id AND 
        bp.status=1 AND 
        bp.publish=1 AND 
        og.user_id=acc.id 
    ORDER BY RAND()
        `;

  database.query(opportunitylistSql, function (err, opportunitylist) {
    if (opportunitylist) {
      res.send(opportunitylist);
    }
    if (err) {
      console.log(err);
    }
  });
});

app.get("/employerlist", validateToken, async (req, res) => {
  const userID = req.user.id;

  let opportunitylistSql = `
    SELECT * 
    FROM opportunity_give og, accounts acc, bp_application bp
    WHERE 
        og.fulfill=1 AND 
        og.approve=2 AND 
        acc.id=bp.user_id AND 
        bp.status=1 AND 
        bp.publish=1 AND 
        og.user_id=acc.id
        AND  og.user_id=?
    ORDER BY RAND()
        `;

  database.query(opportunitylistSql,[userID], (err, opportunitylist)  =>{
    if (opportunitylist) {
      res.send(opportunitylist);
    }
    if (err) {
      console.log(err);
    }
  });
});

app.param("company", function (req, res, next, company) {
  req.company = company;
  next();
});

app.param("jobtitle", function (req, res, next, jobtitle) {
  req.jobtitle = jobtitle;
  next();
});

app.param("oppoID", function (req, res, next, oppoID) {
  req.oppoID = oppoID;
  next();
});

app.get("/list/:company/:jobtitle/:oppoID", function (req, res) {
  const oppoID = req.oppoID;
  const company = req.company.split("-").join(" ");
  let opportunityLandingSql = `
    SELECT * 
    FROM opportunity_give og, accounts acc, bp_application bp
    WHERE 
        og.fulfill=1 AND 
        og.approve=2 AND 
        acc.id=bp.user_id AND 
        bp.status=1 AND 
        bp.publish=1 AND 
        og.user_id=acc.id AND 
        og.oppo_id=? AND
        acc.companyname=?
        `;

  database.query(
    opportunityLandingSql,
    [oppoID, company],
    function (error, opportunityLandingSql) {
      if (opportunityLandingSql.length !== 0) {
        res.send(opportunityLandingSql);
      } else {
        res.send("No Opportunities Found!");
      }
      if (error) {
        console.log(error);
      }
    }
  );
});

app.post("/user", validateToken, async (req, res) => {
  const userID = req.user.id;
  const oppoID = req.body.oppoID;

  let applyJobSql = `INSERT INTO grab_opportunity (candidate_user_id, give_oppo_id) VALUES (?,?)`;

  database.query(applyJobSql, [userID, oppoID], (applyJobErr, applyJobRes) => {
    if (applyJobErr) {
      res.json({
        error: "System is Error. Please Try Again!",
      });
    }

    if (applyJobRes) {
      //Job Info
      let jobInfoSql = "SELECT * FROM opportunity_give WHERE oppo_id=?;";
      database.query(jobInfoSql, [oppoID], (jobInfoErr, jobInfoRes) => {
        if (jobInfoErr) {
          res.json({
            error: "System is Error. Please Try Again!",
          });
        }
        if (jobInfoRes) {
          const jobType = jobInfoRes[0].job_type;
          const jobTitle = jobInfoRes[0].job_title;
          const employerID = jobInfoRes[0].user_id;

          //Employer Info
          let employerInfoSql = "SELECT * FROM accounts WHERE id=?;";
          database.query(
            employerInfoSql,
            [employerID],
            (employerInfoErr, employerInfoRes) => {
              if (employerInfoErr) {
                res.json({
                  error: "System is Error. Please Try Again!",
                });
              }
              if (employerInfoRes) {
                const employerName = employerInfoRes[0].companyname;

                //Candidate Info
                let candidateInfoSql =
                  "SELECT * FROM accounts WHERE id=?;SELECT * FROM user_education edu WHERE edu.user_id=? ORDER BY grad_year_to DESC LIMIT 1;";
                database.query(
                  candidateInfoSql,
                  [userID, userID],
                  (candidateInfoErr, candidateInfoRes) => {
                    if (candidateInfoErr) {
                      res.json({
                        error: "System is Error. Please Try Again!",
                      });
                    }
                    if (candidateInfoRes) {
                      const cddInfo = candidateInfoRes[0];
                      const cddEdu = candidateInfoRes[1];

                      const candidateName = cddInfo[0].name;
                      const candidateEmail = cddInfo[0].email;
                      const candidatePhone = cddInfo[0].contnum;

                      const candidateSchool = cddEdu[0].school;
                      const candidateStudyField = cddEdu[0].study_field;

                      //Sending Email to Candidate
                      var sendMailtoCandidate = {
                        from: process.env.ADMIN_EMAIL,
                        to: candidateEmail,
                        subject: "[Zom-IN] Job Application Confirmation",
                        html: `
                        <div style="background-color: #f8f9fa;color: #000;width: 80%;text-align: center;margin:0 auto;padding: 20px;">
                        <div class="content-header">
                            <img style="width: 100%;object-fit: contain;height: 50px;" src=${process.env.ZOMIN_LOGO} alt="zomIN logo">
                            <p style="display:none !important;visibility:hidden;mso-hide:all;font-size:1px;color:#f8f9fa;line-height:1px;max-height:0px; max-width:0px;opacity:0;overflow:hidden;">Thanks for applying for job(s) with ZOM-IN Opportunity.</p>
                        </div>
                        <div style="background-color: #fff;padding: 10px 20px;">
                            <h3 style="font-size: 1em;font-weight: normal;color: #262626;font-family: Helvetica, Sans-Serif;word-break: break-word;">Dear ${candidateName},</h3>
                            <h1 style="font-family: sans-serif;font-size: 24px;font-weight: 600;line-height: 46px;letter-spacing: -0.6px;color: #231815;">Job Application Confirmation</h1>
                            <p style="font-size: 13px;color:#262626;">Thanks for applying for job(s) with ZOM-IN Opportunity. Below is the summary of the job that you\'ve applied most recently: </p>
                            <p style="font-size: 13px;color:#262626;text-align: left;padding: 0 5%;">Company: ${employerName}</p>
                            <p style="font-size: 13px;color:#262626;text-align: left;padding: 0 5%;">Job Title: ${jobTitle}</p>
                            <p style="font-size: 13px;color:#262626;text-align: left;padding: 0 5%;">Type of Job: ${jobType}</p>
                        </div> 
                        <div>
                            <p style="font-size: 13px;color:#262626;">You may login to your account to check your job application status. Kindly note that the duration for hiring process varies from company to company. </p>
                            <p style="font-size: 13px;color:#262626;">Please reach out us via admin@zom-in.com should you need any further assistance. Thanks!  </p>
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
                            //Admin Info
                            let adminInfoSql =
                              "SELECT email FROM accounts WHERE verified=1 AND admin=1;";
                            database.query(
                              adminInfoSql,
                              (adminInfoErr, adminInfoRes) => {
                                if (adminInfoErr) {
                                  res.json({
                                    error: "System is Error. Please Try Again!",
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
                                    subject:
                                      "[Zom-IN] Job Application Confirmation",
                                    html: `
                    <div style="background-color: #f8f9fa;color: #000;width: 80%;text-align: center;margin:0 auto;padding: 20px;">
                    <div class="content-header">
                        <img style="width: 100%;object-fit: contain;height: 50px;" src=${process.env.ZOMIN_LOGO} alt="zomin logo">
                        <p style="display:none !important;visibility:hidden;mso-hide:all;font-size:1px;color:#f8f9fa;line-height:1px;max-height:0px; max-width:0px;opacity:0;overflow:hidden;">We\'ve received a new job application. Please find below for the applicant\'s information: </p>
                    </div>
                    <div style="background-color: #fff;padding: 10px 20px;">
                        <h3 style="font-size: 1em;font-weight: normal;color: #262626;font-family: Helvetica, Sans-Serif;word-break: break-word;">Dear Admin,</h3>
                        <h1 style="font-family: sans-serif;font-size: 24px;font-weight: 600;line-height: 46px;letter-spacing: -0.6px;color: #231815;">New Job Application</h1>
                        <p style="font-size: 13px;color:#262626;">We\'ve received a new job application. Please find below for the applicant\'s information:</p>
                        
                        <p style="font-size: 13px;color:#262626;text-align: left;padding: 0 5%;">Name: ${candidateName}</p>
                        <p style="font-size: 13px;color:#262626;text-align: left;padding: 0 5%;">Email: ${candidateEmail}</p>
                        <p style="font-size: 13px;color:#262626;text-align: left;padding: 0 5%;">Contact Number: ${candidatePhone}</p>
                        <p style="font-size: 13px;color:#262626;text-align: left;padding: 0 5%;">School: ${candidateSchool}</p>
                        <p style="font-size: 13px;color:#262626;text-align: left;padding: 0 5%;">Course: ${candidateStudyField}</p>
                        <hr>
                        
                        
                        
                        <p style="font-size: 13px; font-weight:bold;color:#262626;text-align: left;padding: 0 5%;">JOB INFORMATION</p>
                        <p style="font-size: 13px;color:#262626;text-align: left;padding: 0 5%;">Company: ${employerName}</p>
                        <p style="font-size: 13px;color:#262626;text-align: left;padding: 0 5%;">Job Title: ${jobTitle}</p>
                        <p style="font-size: 13px;color:#262626;text-align: left;padding: 0 5%;">Type of Job: ${jobType}</p>
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
                                          success: "Successfully Applied",
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
            }
          );
        }
      });
    }
  });
});

app.get("/user/applystatus/:oppoID", validateToken, async (req, res) => {
  const userID = req.user.id;
  const oppoID = req.oppoID;

  let applyStatusSql = `
    SELECT * FROM grab_opportunity grab where grab.give_oppo_id=? and grab.candidate_user_id=?; 
    `;

  database.query(
    applyStatusSql,
    [oppoID, userID],
    (applyStatusErr, applyStatusRes) => {
      if (applyStatusRes) {
        res.send(applyStatusRes);
      }
      if (applyStatusErr) {
        res.json({
          error: "System is Error. Please Try Again!",
        });
      }
    }
  );
});

app.get("/user/savedjob/:oppoID", validateToken, async (req, res) => {
  const userID = req.user.id;
  const oppoID = req.oppoID;

  let savedJobSql = `
      SELECT * FROM savedJob where oppoID=? and userID=? and status=1; 
      `;

  database.query(savedJobSql, [oppoID, userID], (savedJobErr, savedJobRes) => {
    if (savedJobRes) {
      res.send(savedJobRes);
    }
    if (savedJobErr) {
      res.json({
        error: "System is Error. Please Try Again!",
      });
    }
  });
});

app.post("/user/save", validateToken, async (req, res) => {
  const userID = req.user.id;
  const oppoID = req.body.oppoID;
  const saveStatus = 1;

  let likeCheckerSql = "SELECT * FROM savedJob where userID= ? and oppoID =?;";
  database.query(
    likeCheckerSql,
    [userID, oppoID],
    (likeCheckerErr, likeCheckerRes) => {
      if (likeCheckerErr) {
        res.json({
          error: "System is Error. Please Try Again!",
        });
      }
      if (likeCheckerRes.length !== 0) {
        let saveJobExistSql = `UPDATE savedJob SET status = ? WHERE userID = ? and oppoID=?`;
        database.query(
          saveJobExistSql,
          [saveStatus, userID, oppoID],
          (saveJobExistErr, saveJobExistRes) => {
            if (saveJobExistErr) {
              res.json({
                error: "System is Error. Please Try Again!",
              });
            }

            if (saveJobExistRes) {
              res.json({
                success: "This Job is been saved!",
              });
            }
          }
        );
      } else {
        let saveJobSql = `
        INSERT INTO savedJob (userID, oppoID, status) VALUES (?,?,?); 
          `;

        database.query(
          saveJobSql,
          [userID, oppoID, saveStatus],
          (saveJobErr, saveJobRes) => {
            if (saveJobRes) {
              res.json({
                success: "This Job is been saved!",
              });
            }
            if (saveJobErr) {
              res.json({
                error: "System is Error. Please Try Again!",
              });
            }
          }
        );
      }
    }
  );
});

app.post("/user/unsave", validateToken, async (req, res) => {
  const userID = req.user.id;
  const oppoID = req.body.oppoID;
  const unsaveStatus = 0;

  let unsaveJobSql = `
    UPDATE savedJob SET status = ? WHERE userID = ? and oppoID=?
      `;

  database.query(
    unsaveJobSql,
    [unsaveStatus, userID, oppoID],
    (unsaveJobErr, unsaveJobRes) => {
      if (unsaveJobRes) {
        res.json({
          success: "This Job is been unsaved!",
        });
      }
      if (unsaveJobErr) {
        res.json({
          error: "System is Error. Please Try Again!",
        });
      }
    }
  );
});

module.exports = app;
