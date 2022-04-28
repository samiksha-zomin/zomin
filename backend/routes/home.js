require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const getUrls = require("get-urls");

const { validateToken } = require("../middlewares/Auth");

const app = express();
app.use(express.static("./public"));
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

app.param("userID", function (req, res, next, userID) {
  req.userID = userID;
  next();
});

app.get("/userProfile/:userID", (req, res) => {
  const userID = req.userID;

  let UserProfileSql =
    "SELECT * FROM user_photo WHERE user_id=? order by upload_date DESC LIMIT 1;SELECT * FROM user_profile WHERE user_id=?;";

  database.query(UserProfileSql, [userID, userID], function (err, userProfile) {
    if (userProfile) {
      res.send(userProfile);
    }
    if (err) {
      console.log(err);
    }
  });
});

app.get("/userEducation/:userID", (req, res) => {
  const userID = req.userID;

  let userEducationSql =
    "SELECT DISTINCT  * FROM user_education  WHERE user_id=? ORDER BY grad_year_to DESC LIMIT 1;";

  database.query(userEducationSql, [userID], function (err, userEducation) {
    if (userEducation) {
      res.send(userEducation);
    }
    if (err) {
      console.log(err);
    }
  });
});

app.get("/employerIndustry/:userID", (req, res) => {
  const userID = req.userID;

  let employerIndustrySql = "SELECT industry FROM accounts  WHERE id=?;";

  database.query(
    employerIndustrySql,
    [userID],
    function (err, employerIndustry) {
      if (employerIndustry) {
        res.send(employerIndustry);
      }
      if (err) {
        console.log(err);
      }
    }
  );
});

app.get("/userName/:userID", (req, res) => {
  const userID = req.userID;

  let UserNameSql = "SELECT * FROM accounts WHERE id=?;";

  database.query(UserNameSql, [userID], function (err, userName) {
    if (userName) {
      res.send(userName);
    }
    if (err) {
      console.log(err);
    }
  });
});

app.get("/postList", (req, res) => {
  let postlistSql = `
    SELECT * 
    FROM post p, accounts acc
    WHERE acc.id=p.owner_user_id and p.status=1 ORDER BY p.time DESC;`;

  database.query(postlistSql, function (err, postlist) {
    if (postlist) {
      res.send(postlist);
    }
    if (err) {
      console.log(err);
    }
  });
});

app.param("postID", function (req, res, next, postID) {
  req.postID = postID;
  next();
});

app.get("/commentlist/:postID", (req, res) => {
  const postID = req.postID;

  let commentlistSql = `SELECT * FROM comment_post cp, accounts a
  WHERE  cp.comment_user_id=a.id and post_id=? ORDER BY commentID DESC`;

  database.query(commentlistSql, [postID], (err, commentlist) => {
    if (err) {
      console.log(err);
    }

    if (commentlist) {
      res.send(commentlist);
    }
  });
});

app.get("/likeStatus/:postID", validateToken, async (req, res) => {
  const userID = req.user.id;
  const postID = req.postID;

  let likelistSql = `SELECT * FROM like_post where user_id=? and post_id =? and like_post=1 ORDER BY post_id DESC`;

  database.query(likelistSql, [userID, postID], function (err, likelist) {
    if (err) {
      console.log(err);
    }

    if (likelist) {
      res.send(likelist);
    }
  });
});

app.post("/like", validateToken, async (req, res) => {
  const userID = req.user.id;
  const postID = req.body.postID;
  const likeStatus = 1;

  let likeCheckerSql =
    "SELECT * FROM like_post where user_id= ? and post_id =?;";
  database.query(
    likeCheckerSql,
    [userID, postID],
    (likeCheckerErr, likeCheckerRes) => {
      if (likeCheckerErr) {
        res.json({
          error: "System is Error. Please Try Again!",
        });
      }

      if (likeCheckerRes.length !== 0) {
        let likePostExistSql = `UPDATE like_post SET like_post = ? WHERE user_id = ? and post_id=?`;
        database.query(
          likePostExistSql,
          [likeStatus, userID, postID],
          (likePostExistErr, likePostExistRes) => {
            if (likePostExistErr) {
              res.json({
                error: "System is Error. Please Try Again!",
              });
            }

            if (likePostExistRes) {
              res.json({
                success: "This post have been liked!",
              });
            }
          }
        );
      } else {
        let likePostSql = `
        INSERT INTO like_post (user_id, post_id, like_post) VALUES (?,?,?); 
          `;

        database.query(
          likePostSql,
          [userID, postID, likeStatus],
          (likePostErr, likePostRes) => {
            if (likePostRes) {
              res.json({
                success: "This post have been liked!",
              });
            }
            if (likePostErr) {
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

app.post("/unlike", validateToken, async (req, res) => {
  const userID = req.user.id;
  const postID = req.body.postID;
  const unlikeStatus = 0;

  let unlikeSql = `
    UPDATE like_post SET like_post = ? WHERE user_id = ? and post_id=?
      `;

  database.query(
    unlikeSql,
    [unlikeStatus, userID, postID],
    (unlikeErr, unlikeRes) => {
      if (unlikeRes) {
        res.json({
          success: "This post have been unliked!",
        });
      }
      if (unlikeErr) {
        res.json({
          error: "System is Error. Please Try Again!",
        });
      }
    }
  );
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === "video/mp4") {
      cb(null, "public/Assests/Videos/post");
    } else {
      cb(null, "public/Assests/Images/post");
    }
  },
  filename: function (req, file, cb) {
    cb(null, "post-" + Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage }).any();

app.post("/createPost", upload, (req, res) => {
  const userID = req.body.userID;
  let postText = "";
  let postVideo = "";
  let postImage = "";

  postText = req.body.text;

  if (
    new RegExp(
      "([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?"
    ).test(postText)
  ) {
    postText = postText.replace(
      /href/g,
      'class="text-decoration-none" target="_blank" href'
    );
  }

  for (let fileNum = 0; fileNum < req.files.length; fileNum++) {
    if (req.files[fileNum].mimetype === "video/mp4") {
      postVideo = req.files[fileNum].filename;
    } else {
      postImage = req.files[fileNum].filename;
    }
  }

  let createPostSql =
    "INSERT INTO post (owner_user_id, post_text, post_image, post_video) VALUES (?,?,?,?);";

  database.query(
    createPostSql,
    [userID, postText, postImage, postVideo],
    (err, result) => {
      if (err) {
        res.json({
          error: "System is Error. Please Try Again!",
        });
      }
      if (result) {
        let currentPostSql =
          " SELECT * FROM post p, accounts acc WHERE acc.id=p.owner_user_id and post_id=?";

        database.query(
          currentPostSql,
          [result.insertId],
          (err, currentPost) => {
            if (err) {
              res.json({
                error: "System is Error. Please Try Again!",
              });
            }
            if (currentPost) {
              res.json([
                {
                  success: "Successfully posted",
                },
                currentPost,
              ]);
            }
          }
        );
      }
    }
  );
});

app.param("deletePostID", function (req, res, next, deletePostID) {
  req.deletePostID = deletePostID;
  next();
});

app.patch("/deletePost/:deletePostID", (req, res) => {
  const postID = req.deletePostID;

  let deletePostSql = "UPDATE post SET status = 0 WHERE post_id = ?;";

  database.query(deletePostSql, [postID], (err, result) => {
    if (err) {
      res.json({
        error: "System is Error. Please Try Again!",
      });
    }

    if (result) {
      res.json({
        success: "Successfully deleted",
      });
    }
  });
});

app.post("/comment", (req, res) => {
  const userID = req.body.userID;
  const postID = req.body.postID;
  const comment = req.body.enteredComment;

  let commentSql =
    "INSERT INTO comment_post (comment_user_id, post_id, comment) VALUES (?,?,?);";

  database.query(
    commentSql,
    [userID, postID, comment],
    (err, commentResult) => {
      if (err) {
        res.json({
          error: "System is Error. Please Try Again!",
        });
      }

      if (commentResult) {
        let currentCommentSql =
          "SELECT * FROM comment_post cp, accounts a WHERE  cp.comment_user_id=a.id AND cp.commentID=? ;";

        database.query(
          currentCommentSql,
          [commentResult.insertId],
          (err, currentComment) => {
            if (err) {
              res.json({
                error: "System is Error. Please Try Again!",
              });
            }
            if (currentComment) {
              res.json([
                {
                  success: "Successfully posted",
                },
                currentComment,
              ]);
            }
          }
        );
      }
    }
  );
});

app.post("/report", (req, res) => {
  const userID = req.body.userID;
  const postID = req.body.postID;
  const postOwnerID = req.body.postOwnerID;
  const reason = req.body.reportInput;

  let reportPostSql =
    "INSERT INTO reportPost (userID, postOwnerID, postID, reason) VALUES (?,?,?,?);";
  database.query(
    reportPostSql,
    [userID, postOwnerID, postID, reason],
    (err, result) => {
      if (err) {
        res.json({
          error: "System is Error. Please Try Again!",
        });
      }

      if (result) {
        res.json({
          success: "Successfully reported!",
        });
      }
    }
  );
});

module.exports = app;
