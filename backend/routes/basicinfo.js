require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

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

app.get("/status", validateToken, async (req, res) => {
  const userID = req.user.id;

  let attemptSql = "SELECT attempt FROM accounts where id =?";
  database.query(attemptSql, [userID], (err, attempt) => {
    if (err) {
      res.json({
        error: "System is Error. Please Try Again!",
      });
    }

    if (attempt) {
      res.send(attempt);
    }
  });
});

app.post("/user", validateToken, async (req, res) => {
  const userID = req.user.id;
  const attempt = 1;

  // About User
  const gender = req.body.gender;
  const dob = req.body.dob;
  const about = req.body.about;

  //   About Edu
  const school = req.body.school;
  const eduLevel = req.body.eduLevel;
  const studyField = req.body.studyField;
  const startDate = new Date(req.body.startDate);
  const startYear = startDate.getFullYear();
  const endDate = new Date(req.body.endDate);
  const endYear = endDate.getFullYear();

  // About Current Status
  const currentStatus = req.body.currentStatus;
  const companyName = req.body.companyName;
  const currentPosition = req.body.currentPosition;

  //Intern Details
  const bgCourse = req.body.bgCourse;
  const startIntern = req.body.startIntern;
  const endIntern = req.body.endIntern;

  //About Skill
  const skill = req.body.skill;

  let userInfoSql =
    "INSERT INTO user_profile (user_id, gender, dob, about_user) VALUES (?,?,?,?);INSERT INTO user_education (user_id, school, higher_stud, study_field, grad_year_from, grad_year_to) VALUES (?,?,?,?,?,?);INSERT INTO user_employ(user_id,employ_status, comp_name_user, cur_position, bgCourse,start_date,end_date) VALUES (?,?,?,?,?,?,?);UPDATE accounts SET attempt=? WHERE id=?";
  database.query(
    userInfoSql,
    [
      userID,
      gender,
      dob,
      about,
      userID,
      school,
      eduLevel,
      studyField,
      startYear,
      endYear,
      userID,
      currentStatus,
      companyName,
      currentPosition,
      bgCourse,
      startIntern,
      endIntern,
      attempt,
      userID,
    ],
    (err, result) => {
      if (err) {
        res.json({
          error: "System is Error. Please Try Again!",
        });
      }

      if (result) {
        if (skill !== "") {
          const skillArr = skill.map((a) => a.label);

          for (let i = 0; i < skillArr.length; i++) {
            let userSkillSql =
              "INSERT INTO user_skill(user_id, skill) VALUES (?,?);";

            database.query(
              userSkillSql,
              [userID, `${skillArr[i]}`],
              (skillErr, skillRes) => {
                if (skillErr) {
                  if (i < skillArr.length) {
                    res.json({
                      error: "System is Error. Please Try Again!",
                    });
                  }
                }
                if (skillRes) {
                  if (i < skillArr.length) {
                    res.json({
                      success: "Welcome to Zom-IN",
                    });
                  }
                }
              }
            );
          }
        } else {
          res.json({
            success: "Welcome to Zom-IN",
          });
        }
      }
    }
  );
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/Assests/Images/user");
  },
  filename: function (req, file, cb) {
    cb(null, "bp-" + Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage }).any();

app.post("/employer", upload, (req, res) => {
  const userID = req.body.userID;
  const attempt = 1;
  let application = 0;
  let tob = 0;

  const role = req.body.role;
  const location = req.body.location;
  const regNum = req.body.regNum;
  const about = req.body.about;
  const hearZomIN = req.body.hearZomIN;
  const acceptToBP = req.body.acceptToBP;
  const interest = req.body.interest;
  const postImage = req.files[0].filename;

  if (acceptToBP === true) {
    application = 1;
    tob = 1;
  }

  let employerNameSql = "SELECT * FROM accounts WHERE id=?";

  database.query(employerNameSql, userID, (err, employerName) => {
    if (err) {
      res.json({
        error: "System is Error. Please Try Again!",
      });
    }

    if (employerName) {
      const compName = employerName[0].companyname;

      let employerInfoSql =
        "INSERT INTO partner_profile(user_id, role, hear_zomin, location_com, about_com, comp_reg) VALUES (?,?,?,?,?,?);INSERT INTO user_photo (user_id, profile_photo) VALUES (?, ?); INSERT INTO bp_application (application,company_name, company_logo, company_about, company_tob, company_interest,  user_id) VALUES (?,?,?,?,?,?,?); UPDATE accounts SET attempt=? WHERE id=?;";
      database.query(
        employerInfoSql,
        [
          userID,
          role,
          hearZomIN,
          location,
          about,
          regNum,
          userID,
          postImage,
          application,
          compName,
          postImage,
          about,
          tob,
          interest,
          userID,
          attempt,
          userID,
        ],
        (err, employerInfo) => {
          if (err) {
            res.json({
              error: "System is Error. Please Try Again!",
            });
          }

          if (employerInfo) {
            res.json({
              success: "Welcome to Zom-IN",
            });
          }
        }
      );
    }
  });
});

module.exports = app;
