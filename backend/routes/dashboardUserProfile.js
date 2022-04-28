require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { sign } = require("jsonwebtoken");
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

app.get("/about", validateToken, async (req, res) => {
  const userID = req.user.id;

  let aboutListSql = `
  SELECT *, DATE(up.dob) as birthday FROM user_profile up, accounts acc WHERE up.user_id =? and up.user_id=acc.id ORDER BY up.id DESC LIMIT 1;
        `;

  database.query(aboutListSql, [userID], (err, aboutList) => {
    if (aboutList) {
      res.send(aboutList);
    }
    if (err) {
      res.json({
        error: "System is Error. Please Try Again!",
      });
    }
  });
});

// EDUACTION
app.get("/education", validateToken, async (req, res) => {
  const userID = req.user.id;

  let educationListSql = `
  SELECT DISTINCT * FROM user_education WHERE user_id=? ORDER BY grad_year_to DESC;
        `;

  database.query(educationListSql, [userID], (err, educationList) => {
    if (educationList) {
      res.send(educationList);
    }
    if (err) {
      res.json({
        error: "System is Error. Please Try Again!",
      });
    }
  });
});

app.post("/neweducation", validateToken, async (req, res) => {
  const userID = req.user.id;
  const school = req.body.school;
  const eduLevel = req.body.eduLevel;
  const studyField = req.body.studyField;
  const startYear = req.body.startYear;
  const endYear = req.body.endYear;
  const grade = req.body.grade;

  let addEducationSql =
    "INSERT INTO user_education (user_id, school, higher_stud, study_field, grad_year_from, grad_year_to, grade) VALUES (?,?,?,?,?,?,?);";

  database.query(
    addEducationSql,
    [userID, school, eduLevel, studyField, startYear, endYear, grade],
    (err, addEducation) => {
      if (err) {
        res.json({
          error: "System is Error. Please Try Again!",
        });
      }

      if (addEducation) {
        res.json([
          {
            success: "Successfully added",
          },
          addEducation,
        ]);
      }
    }
  );
});

app.param("eduID", function (req, res, next, eduID) {
  req.eduID = eduID;
  next();
});

app.delete("/education/:eduID", validateToken, async (req, res) => {
  const eduID = req.eduID;
  const userID = req.user.id;

  let deleteEduSql = `DELETE FROM user_education WHERE id = ? AND user_id=?`;

  database.query(deleteEduSql, [eduID, userID], (err, deleteEdu) => {
    if (err) {
      res.json({
        error: "System is Error. Please Try Again!",
      });
    }

    if (deleteEdu) {
      res.json({
        success: "Successfully deleted",
      });
    }
  });
});

app.get("/workingExperience", validateToken, async (req, res) => {
  const userID = req.user.id;

  let workingExperienceListSql = `
  SELECT DISTINCT * FROM user_employ WHERE user_id=? ORDER BY end_date DESC;
        `;

  database.query(
    workingExperienceListSql,
    [userID],
    (err, workingExperienceList) => {
      if (workingExperienceList) {
        res.send(workingExperienceList);
      }
      if (err) {
        res.json({
          error: "System is Error. Please Try Again!",
        });
      }
    }
  );
});

app.post("/newWorkingExperience", validateToken, async (req, res) => {
  const userID = req.user.id;
  const jobType = req.body.jobType;
  const compName = req.body.companyName;
  const location = req.body.location;
  const position = req.body.position;
  const startYear = req.body.startYear;
  const endYear = req.body.endYear;
  const experience = req.body.experience;

  let addWorkExpSql =
    "INSERT INTO user_employ (user_id, employ_status, comp_name_user, location, cur_position, start_date, end_date, work_exp ) VALUES (?,?,?,?,?,?,?,?);";

  database.query(
    addWorkExpSql,
    [
      userID,
      jobType,
      compName,
      location,
      position,
      startYear,
      endYear,
      experience,
    ],
    (err, addWorkExp) => {
      if (err) {
        res.json({
          error: "System is Error. Please Try Again!",
        });
      }

      if (addWorkExp) {
        res.json([
          {
            success: "Successfully added",
          },
          addWorkExp,
        ]);
      }
    }
  );
});

app.param("workID", function (req, res, next, workID) {
  req.workID = workID;
  next();
});

app.delete("/workingExperience/:workID", validateToken, async (req, res) => {
  const workID = req.workID;
  const userID = req.user.id;

  let deleteWorkExpSql = `DELETE FROM user_employ WHERE id = ? AND user_id=?`;

  database.query(deleteWorkExpSql, [workID, userID], (err, deleteWorkExp) => {
    if (err) {
      res.json({
        error: "System is Error. Please Try Again!",
      });
    }

    if (deleteWorkExp) {
      res.json({
        success: "Successfully deleted",
      });
    }
  });
});

//skills
app.get("/skills", validateToken, async (req, res) => {
  const userID = req.user.id;

  let skillsListSql = `
  SELECT * FROM user_skill WHERE user_id=? ORDER BY id DESC;
        `;

  database.query(skillsListSql, [userID], (err, skillsList) => {
    if (skillsList) {
      res.send(skillsList);
    }
    if (err) {
      res.json({
        error: "System is Error. Please Try Again!",
      });
    }
  });
});

app.post("/newskills", validateToken, async (req, res) => {
  const userID = req.user.id;
  const skill = req.body.newskill;

  let addSkillsSql = "INSERT INTO user_skill (user_id, skill) VALUES (?,?);";

  database.query(addSkillsSql, [userID, skill], (err, addSkills) => {
    if (err) {
      res.json({
        error: "System is Error. Please Try Again!",
      });
    }

    if (addSkills) {
      res.json([
        {
          success: "Successfully added",
        },
        addSkills,
      ]);
    }
  });
});

app.param("skillID", function (req, res, next, skillID) {
  req.skillID = skillID;
  next();
});

app.delete("/skills/:skillID", validateToken, async (req, res) => {
  const skillID = req.skillID;
  const userID = req.user.id;

  let deleteSkillSql = `DELETE FROM user_skill WHERE id = ? AND user_id=?`;

  database.query(deleteSkillSql, [skillID, userID], (err, deleteSkill) => {
    if (err) {
      res.json({
        error: "System is Error. Please Try Again!",
      });
    }

    if (deleteSkill) {
      res.json({
        success: "Successfully deleted",
      });
    }
  });
});

//Accomplishment
app.get("/accomplishment", validateToken, async (req, res) => {
  const userID = req.user.id;

  let accomplishmentListSql = `
  SELECT DISTINCT * FROM user_accomplishment WHERE user_id=? ORDER BY date_accomplishment DESC;
        `;

  database.query(accomplishmentListSql, [userID], (err, accomplishmentList) => {
    if (accomplishmentList) {
      res.send(accomplishmentList);
    }
    if (err) {
      res.json({
        error: "System is Error. Please Try Again!",
      });
    }
  });
});

app.post("/newAccomplishment", validateToken, async (req, res) => {
  const user_id = req.user.id;
  const accomplishment = req.body.title;
  const date_accomplishment = req.body.date;
  const description = req.body.desc;

  let addAccomplishmentSql =
    "INSERT INTO user_accomplishment (user_id, accomplishment, date_accomplishment,description) VALUES (?,?,?,?);";

  database.query(
    addAccomplishmentSql,
    [user_id, accomplishment, date_accomplishment, description],
    (err, addAccomplishment) => {
      if (err) {
        res.json({
          error: "System is Error. Please Try Again!",
        });
      }

      if (addAccomplishment) {
        res.json([
          {
            success: "Successfully added",
          },
          addAccomplishment,
        ]);
      }
    }
  );
});

app.param("accomplishmentID", function (req, res, next, accomplishmentID) {
  req.accomplishmentID = accomplishmentID;
  next();
});

app.delete(
  "/accomplishment/:accomplishmentID",
  validateToken,
  async (req, res) => {
    const accomplishmentID = req.accomplishmentID;
    const userID = req.user.id;

    let deleteAccomplishmentSql = `DELETE FROM user_accomplishment WHERE id = ? AND user_id=?`;

    database.query(
      deleteAccomplishmentSql,
      [accomplishmentID, userID],
      (err, deleteAccomplishment) => {
        if (err) {
          res.json({
            error: "System is Error. Please Try Again!",
          });
        }

        if (deleteAccomplishment) {
          res.json({
            success: "Successfully deleted",
          });
        }
      }
    );
  }
);

//Portfolio
app.get("/portfolio", validateToken, async (req, res) => {
  const userID = req.user.id;

  let portfolioListSql = `
  SELECT DISTINCT * FROM user_portfolio WHERE user_id=? ORDER BY id DESC;
        `;

  database.query(portfolioListSql, [userID], (err, portfolioList) => {
    if (portfolioList) {
      res.send(portfolioList);
    }
    if (err) {
      res.json({
        error: "System is Error. Please Try Again!",
      });
    }
  });
});

app.post("/newPortfolio", validateToken, async (req, res) => {
  const user_id = req.user.id;
  const name_portfolio = req.body.title;
  const date_portfolio = req.body.date;
  const summary_portfolio = req.body.desc;
  const link_portfolio = req.body.link;

  let addPortfolioSql =
    "INSERT INTO user_portfolio (user_id, name_portfolio, date_portfolio,summary_portfolio, link_portfolio) VALUES (?,?,?,?,?);";

  database.query(
    addPortfolioSql,
    [
      user_id,
      name_portfolio,
      date_portfolio,
      summary_portfolio,
      link_portfolio,
    ],
    (err, addPortfolio) => {
      if (err) {
        res.json({
          error: "System is Error. Please Try Again!",
        });
      }

      if (addPortfolio) {
        res.json([
          {
            success: "Successfully added",
          },
          addPortfolio,
        ]);
      }
    }
  );
});

app.param("portfolioID", function (req, res, next, portfolioID) {
  req.portfolioID = portfolioID;
  next();
});

app.delete("/portfolio/:portfolioID", validateToken, async (req, res) => {
  const portfolioID = req.portfolioID;
  const userID = req.user.id;

  let deletePortfolioSql = `DELETE FROM user_portfolio WHERE id = ? AND user_id=?`;

  database.query(
    deletePortfolioSql,
    [portfolioID, userID],
    (err, deletePortfolio) => {
      if (err) {
        res.json({
          error: "System is Error. Please Try Again!",
        });
      }

      if (deletePortfolio) {
        res.json({
          success: "Successfully deleted",
        });
      }
    }
  );
});

//REAL LIFE EXPERIENCE
app.get("/realLifeExp", validateToken, async (req, res) => {
  const userID = req.user.id;

  let realLifeExpListSql = `
  SELECT DISTINCT * FROM user_rle WHERE user_id=? ORDER BY id DESC;
        `;

  database.query(realLifeExpListSql, [userID], (err, realLifeExpList) => {
    if (realLifeExpList) {
      res.send(realLifeExpList);
    }
    if (err) {
      res.json({
        error: "System is Error. Please Try Again!",
      });
    }
  });
});

app.post("/newRealLife", validateToken, async (req, res) => {
  const user_id = req.user.id;
  const rle_comp_name = req.body.companyName;
  const rle_date = req.body.date;
  const rle_desc = req.body.desc;

  let addRealLifeSql =
    "INSERT INTO user_rle (user_id, rle_comp_name, rle_date,rle_desc) VALUES (?,?,?,?);";

  database.query(
    addRealLifeSql,
    [user_id, rle_comp_name, rle_date, rle_desc],
    (err, addRealLife) => {
      if (err) {
        res.json({
          error: "System is Error. Please Try Again!",
        });
      }

      if (addRealLife) {
        res.json([
          {
            success: "Successfully added",
          },
          addRealLife,
        ]);
      }
    }
  );
});

app.param("realLifeID", function (req, res, next, realLifeID) {
  req.realLifeID = realLifeID;
  next();
});

app.delete("/realLifeExp/:realLifeID", validateToken, async (req, res) => {
  const realLifeID = req.realLifeID;
  const userID = req.user.id;

  let deleteRealLifeSql = `DELETE FROM user_rle WHERE id = ? AND user_id=?`;

  database.query(
    deleteRealLifeSql,
    [realLifeID, userID],
    (err, deleteRealLife) => {
      if (err) {
        res.json({
          error: "System is Error. Please Try Again!",
        });
      }

      if (deleteRealLife) {
        res.json({
          success: "Successfully deleted",
        });
      }
    }
  );
});

//Language
app.get("/language", validateToken, async (req, res) => {
  const userID = req.user.id;

  let languageListSql = `
        SELECT * FROM user_language WHERE user_id=? ORDER BY id ASC;
        `;

  database.query(languageListSql, [userID], (err, languageList) => {
    if (languageList) {
      res.send(languageList);
    }
    if (err) {
      res.json({
        error: "System is Error. Please Try Again!",
      });
    }
  });
});

app.post("/newlanguage", validateToken, async (req, res) => {
  const userID = req.user.id;
  const language = req.body.newlanguage;

  let addLanguageSql =
    "INSERT INTO user_language (user_id, language) VALUES (?,?);";

  database.query(addLanguageSql, [userID, language], (err, addLanguage) => {
    if (err) {
      res.json({
        error: "System is Error. Please Try Again!",
      });
    }

    if (addLanguage) {
      res.json([
        {
          success: "Successfully added",
        },
        addLanguage,
      ]);
    }
  });
});

app.param("languageID", function (req, res, next, languageID) {
  req.languageID = languageID;
  next();
});

app.delete("/language/:languageID", validateToken, async (req, res) => {
  const languageID = req.languageID;
  const userID = req.user.id;

  let deleteLanguageSql = `DELETE FROM user_language WHERE id = ? AND user_id=?`;

  database.query(
    deleteLanguageSql,
    [languageID, userID],
    (err, deleteLanguage) => {
      if (err) {
        res.json({
          error: "System is Error. Please Try Again!",
        });
      }

      if (deleteLanguage) {
        res.json({
          success: "Successfully deleted",
        });
      }
    }
  );
});

app.get("/reference", validateToken, async (req, res) => {
  const userID = req.user.id;

  let referenceListSql = `
  SELECT DISTINCT * FROM user_reference WHERE user_id=? ORDER BY id DESC;
        `;

  database.query(referenceListSql, [userID], (err, referenceList) => {
    if (referenceList) {
      res.send(referenceList);
    }
    if (err) {
      res.json({
        error: "System is Error. Please Try Again!",
      });
    }
  });
});

app.post("/newReference", validateToken, async (req, res) => {
  const userID = req.user.id;
  const name_refer = req.body.name;
  const role_refer = req.body.position;
  const contnum_refer = req.body.contact;
  const email_refer = req.body.email;

  let addReferenceSql =
    "INSERT INTO user_reference (user_id, name_refer, role_refer, contnum_refer, email_refer) VALUES (?,?,?,?,?);";

  database.query(
    addReferenceSql,
    [userID, name_refer, role_refer, contnum_refer, email_refer],
    (err, addReference) => {
      if (err) {
        res.json({
          error: "System is Error. Please Try Again!",
        });
      }

      if (addReference) {
        res.json([
          {
            success: "Successfully added",
          },
          addReference,
        ]);
      }
    }
  );
});

app.param("referenceID", function (req, res, next, referenceID) {
  req.referenceID = referenceID;
  next();
});

app.delete("/reference/:referenceID", validateToken, async (req, res) => {
  const referenceID = req.referenceID;
  const userID = req.user.id;

  let deleteReferenceSql = `DELETE FROM user_reference WHERE id = ? AND user_id=?`;

  database.query(
    deleteReferenceSql,
    [referenceID, userID],
    (err, deleteReference) => {
      if (err) {
        res.json({
          error: "System is Error. Please Try Again!",
        });
      }

      if (deleteReference) {
        res.json({
          success: "Successfully deleted",
        });
      }
    }
  );
});

module.exports = app;
