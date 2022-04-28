import React, { useState, useEffect, Fragment } from "react";
import Axios from "axios";
import useInput from "../../../Helpers/use-input";
import {
  BiMinusCircle,
  BiXCircle,
  BiMessageCheck,
  BiPlus,
} from "react-icons/bi";

import { Col, Row, Form } from "react-bootstrap";
import Heading from "../../Heading";
import { toast } from "react-toastify";

const isNotEmpty = (value) => value.trim() !== "";

function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/dashboardUserProfile/skills/`,
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    ).then((response) => {
      if (response.data.error) {
        return toast.error(
          <Fragment>
            <BiMinusCircle /> <span>{response.data.error}</span>
          </Fragment>
        );
      } else {
        setSkills(response.data);
      }
    });
  }, []);

  //Skills Input
  const {
    value: enteredSkills,
    isValid: enteredSkillsIsValid,
    hasError: skillsInputHasError,
    valueChangeHandler: skillsChangeHandler,
    inputBlurHandler: skillsBlurHandler,
    reset: resetSkillsInput,
  } = useInput(isNotEmpty);

  let skillsFormIsValid = false;

  if (enteredSkillsIsValid) {
    skillsFormIsValid = true;
  }

  const skillsFormSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredSkillsIsValid) {
      return;
    } else {
      Axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/dashboardUserProfile/newskills`,
        {
          newskill: enteredSkills,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((response) => {
        const newskillsData = response.data[1];

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
            setSkills([
              {
                skill: enteredSkills,
                id: newskillsData.insertId,
              },
              ...skills,
            ]),
          ];
        }
      });
    }
    resetSkillsInput();
  };

  const skillsClasses = skillsInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  const deleteSkill = (skillID) => {
    Axios.delete(
      `${process.env.REACT_APP_SERVER_DOMAIN}/dashboardUserProfile/skills/` +
        skillID,
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    ).then((response) => {
      if (response.data.error) {
        return toast.error(
          <Fragment>
            <BiMinusCircle /> <span>{response.data.error}</span>
          </Fragment>
        );
      } else {
        return [
          toast.success(
            <Fragment>
              <BiMessageCheck /> <span>{response.data.success}</span>
            </Fragment>
          ),
          setSkills(
            skills.filter((skillsDetails) => {
              /* eslint-disable-next-line */
              return skillsDetails.id != skillID;
            })
          ),
        ];
      }
    });
  };

  return (
    <Row className="mx-auto border rounded p-2 my-2">
      <Col sm={12}>
        <Row>
          <Col xs={10} sm={10} className="text-start">
            <Heading content="Skills" design="h5" />
          </Col>
          <Col xs={2} sm={2} className="text-end align-self-center">
            <p role="button" className="my-auto">
              <BiPlus
                className="icon"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#addSkill"
              />
            </p>
          </Col>
          <div
            className="modal fade"
            id="addSkill"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-scrollable">
              <div className="modal-content">
                <div className=" modal-header">
                  <Heading content="Add Skills" design="h4 my-auto" />
                  <button
                    type="button"
                    id="closeButton"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <Form onSubmit={skillsFormSubmissionHandler}>
                  <div className="modal-body">
                    <Col sm={12} className="form-group mb-2">
                      <label htmlFor="role" className="required">
                        Role
                      </label>
                      <input
                        type="text"
                        placeholder="What's your skills?"
                        className={skillsClasses}
                        onChange={skillsChangeHandler}
                        onBlur={skillsBlurHandler}
                        value={enteredSkills}
                      />
                      {skillsInputHasError && (
                        <Form.Control.Feedback type="invalid">
                          Please enter your skills.
                        </Form.Control.Feedback>
                      )}
                    </Col>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      disabled={!skillsFormIsValid}
                    >
                      Save Changes
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Row>
      </Col>
      <Col sm={12}>
        <div className="d-flex flex-wrap">
          {skills.map((skillsDetails) => {
            const skillID = skillsDetails.id;
            const skill = skillsDetails.skill;
            return (
              <>
                <p
                  key={skillID}
                  className="badge rounded-pill alert-primary fw-normal text-dark m-2 fs-7"
                >
                  {skill}{" "}
                  <BiXCircle
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target={`#createSkillModal${skillID}`}
                  />
                </p>

                <div
                  className="modal fade"
                  id={`createSkillModal${skillID}`}
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className=" modal-header">
                        <Heading content="Delete Skills" design="h4 my-auto" />
                        <button
                          type="button"
                          id="closeButton"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <p>Are you sure want to delete {skill}?</p>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => deleteSkill(skillID)}
                          data-bs-dismiss="modal"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </Col>
    </Row>
  );
}

export default Skills;
