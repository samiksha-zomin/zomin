import React, { useState, useEffect, Fragment, useContext } from "react";
import Axios from "axios";
import { Container, Col, Form, Row } from "react-bootstrap";

import Profile from "../Profile";

import useInput from "../../Helpers/use-input";
import { AuthContext } from "../../Helpers/AuthContext";

import { BsClockFill } from "react-icons/bs";
import { BiMessageCheck, BiMinusCircle } from "react-icons/bi";
import { toast } from "react-toastify";

const isNotEmpty = (value) => value.trim() !== "";

function Comment(props) {
  const { authState, setAuthState } = useContext(AuthContext);

  const userID = props.userID;
  const postID = props.postID;
  const [viewProfile, setViewProfile] = useState("avatar/male.svg");
  const [viewComment, setViewComment] = useState([]);

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/home/userProfile/` + userID,
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    ).then((response) => {
      const profileDetail1 = response.data[0];
      const profileDetail2 = response.data[1];

      var profile;

      if (profileDetail1.length === 0) {
        if (authState.company === 1) {
          profile = `${process.env.REACT_APP_SERVER_DOMAIN}/public/Assests/Images/avatar/bp.png`;
          setViewProfile(profile);
        } else {
          if (profileDetail2[0].gender === "Male") {
            profile = `${process.env.REACT_APP_SERVER_DOMAIN}/public/Assests/Images/avatar/male.svg`;
            setViewProfile(profile);
          } else {
            profile = `${process.env.REACT_APP_SERVER_DOMAIN}/public/Assests/Images/avatar/female.svg`;
            setViewProfile(profile);
          }
        }
      } else {
        profile =
          `${process.env.REACT_APP_SERVER_DOMAIN}/public/Assests/Images/user/` +
          profileDetail1[0].profile_photo;
        setViewProfile(profile);
      }
    });
  });

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/home/commentlist/` + postID
    ).then((response) => {
      setViewComment(response.data);
    });
  }, [postID]);

  //COMMENT Input Check
  const {
    value: enteredComment,
    isValid: enteredCommentIsValid,
    hasError: commentInputHasError,
    valueChangeHandler: commentChangeHandler,
    inputBlurHandler: commentBlurHandler,
    reset: resetCommentInput,
  } = useInput(isNotEmpty);

  let commentFormIsValid = false;

  if (enteredComment !== "") {
    commentFormIsValid = true;
  }

  const commentFormSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredCommentIsValid) {
      return;
    } else {
      Axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/home/comment/`, {
        userID: userID,
        postID: postID,
        enteredComment: enteredComment,
      }).then((response) => {
        const newCommentData = response.data[1];
        if (response.data[0].error) {
          return toast.error(
            <Fragment>
              <BiMinusCircle /> <span>{response.data[0].error}</span>
            </Fragment>
          );
        } else {
          return [
            toast.success(
              <Fragment>
                <BiMessageCheck /> <span>{response.data[0].success}</span>
              </Fragment>
            ),
            setViewComment([
              {
                comment: newCommentData[0].comment,
                comment_user_id: newCommentData[0].comment_user_id,
                company: newCommentData[0].company,
                name: newCommentData[0].name,
                companyname: newCommentData[0].companyname,
                comment_time: newCommentData[0].comment_time,
              },
              ...viewComment,
            ]),
          ];
        }
      });
    }
    resetCommentInput();
  };

  const commentClasses = commentInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Container>
        <Form onSubmit={commentFormSubmissionHandler}>
          <Row className="align-items-center py-3">
            <Col xs={1} sm={1} className="p-0 ps-2 ps-xs-1">
              <img
                src={viewProfile}
                alt="Zom-In User"
                className=" col my-auto rounded-circle"
                width="30"
                height="30"
              />
            </Col>
            <Col xs={8} sm={9} className="pe-xs-0">
              <div className="">
                <input
                  type="text"
                  id="comment"
                  placeholder="Comments"
                  autoComplete="off"
                  className={commentClasses}
                  onChange={commentChangeHandler}
                  onBlur={commentBlurHandler}
                  value={enteredComment}
                />

                {commentInputHasError && (
                  <Form.Control.Feedback type="invalid">
                    Please share your thought on this post.
                  </Form.Control.Feedback>
                )}
              </div>
            </Col>
            <Col xs={2} sm={2} className="p-0">
              <button
                className="btn btn-sm btn-primary"
                type="submit"
                disabled={!commentFormIsValid}
              >
                Comment
              </button>
            </Col>
          </Row>
        </Form>
        {viewComment.map((commentDetails, key) => {
          const comment = commentDetails.comment;
          const commentOwnerID = commentDetails.comment_user_id;
          const companyRole = commentDetails.company;
          const commentUserName = commentDetails.name;
          const commentCompanyName = commentDetails.companyname;
          const comment_time = new Date(commentDetails.comment_time);

          if (companyRole === 1) {
            var postCompanyLink =
              "/partner/" +
              commentCompanyName.toLowerCase().trim().split(/\s+/).join("-");
          }

          const commentTime = comment_time
            .toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
            .replace(/ /g, " ");
          return (
            <Row className="py-1">
              <Col xs={1} sm={1} className="p-0 ps-2">
                <Profile id={commentOwnerID} width="50" height="50" design="rounded-circle"/>
              </Col>

              <Col xs={11} sm={11}>
                <div className="p-2 border rounded bg-light bg-gradient">
                  <p className="fw-bold mb-0">
                    {companyRole === 1 ? (
                      <a
                        href={postCompanyLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-decoration-none text-dark"
                      >
                        {commentCompanyName}
                      </a>
                    ) : (
                      <a
                        href="/home"
                        className="text-decoration-none text-dark"
                      >
                        {" "}
                        {commentUserName}
                      </a>
                    )}
                  </p>
                  <p className="mb-0">{comment}</p>
                </div>
                <p className="text-muted fw-light fs-7">
                  <BsClockFill size={12} className="me-1" />
                  {commentTime}
                </p>
              </Col>
            </Row>
          );
        })}
      </Container>
    </AuthContext.Provider>
  );
}

export default Comment;
