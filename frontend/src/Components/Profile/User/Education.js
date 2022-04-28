import React, { useState, useEffect, Fragment } from "react";
import Axios from "axios";
import useInput from "../../../Helpers/use-input";
import {
  BiPlus,
  BiMinusCircle,
  BiTrash,
  BiBookReader,
  BiCalendar,
  BiMessageCheck,
} from "react-icons/bi";
import { FaUniversity } from "react-icons/fa";

import { Col, Row, Form } from "react-bootstrap";
import Heading from "../../Heading";
import { toast } from "react-toastify";

const isNotEmpty = (value) => value.trim() !== "";

function Education() {
  const [education, setEducation] = useState([]);
  const [eduList, setEduList] = useState([]);

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/dashboardUserProfile/education/`,
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
        setEducation(response.data);
      }
    });
  }, []);

  //Education Level
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/meta/eduLevel`).then(
      (response) => {
        setEduList(response.data);
      }
    );
  });

  //ADD Education
  //School Input
  const {
    value: enteredSchool,
    isValid: enteredSchoolIsValid,
    hasError: schoolInputHasError,
    valueChangeHandler: schoolChangeHandler,
    inputBlurHandler: schoolBlurHandler,
    reset: resetSchoolInput,
  } = useInput(isNotEmpty);

  //Education Level Input
  const {
    value: enteredEduLevel,
    isValid: enteredEduLevelIsValid,
    hasError: eduLevelInputHasError,
    valueChangeHandler: eduLevelChangeHandler,
    inputBlurHandler: eduLevelBlurHandler,
    reset: resetEduLevelInput,
  } = useInput(isNotEmpty);

  //Study Field Input
  const {
    value: enteredStudyField,
    isValid: enteredStudyFieldIsValid,
    hasError: studyFieldInputHasError,
    valueChangeHandler: studyFieldChangeHandler,
    inputBlurHandler: studyFieldBlurHandler,
    reset: resetStudyFieldInput,
  } = useInput(isNotEmpty);

  //Grad Year
  var curYear = new Date().getFullYear();
  var afterCurYear = curYear + 20;
  var beforeCurYear = curYear + 50;

  const [endYear, setEndYear] = useState(curYear);
  const [startYear, setStartYear] = useState(curYear);
  //Grade
  const [grade, setGrade] = useState("");

  let educationFormIsValid = false;

  if (
    enteredSchoolIsValid &&
    enteredEduLevelIsValid &&
    enteredStudyFieldIsValid &&
    startYear !== "" &&
    endYear !== ""
  ) {
    educationFormIsValid = true;
  }

  const educationFormSubmissionHandler = (event) => {
    event.preventDefault();
    if (
      !enteredSchoolIsValid &&
      !enteredEduLevelIsValid &&
      !enteredStudyFieldIsValid &&
      startYear === "" &&
      endYear === ""
    ) {
      return;
    } else {
      Axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/dashboardUserProfile/neweducation`,
        {
          school: enteredSchool,
          eduLevel: enteredEduLevel,
          studyField: enteredStudyField,
          startYear: startYear,
          endYear: endYear,
          grade: grade,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((response) => {
        const newEducationData = response.data[1];

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
            setEducation([
              {
                id: newEducationData.insertId,
                school: enteredSchool,
                higher_stud: enteredEduLevel,
                study_field: enteredStudyField,
                grad_year_to: endYear,
                grad_year_from: startYear,
                grade: grade,
              },
              ...education,
            ]),
          ];
        }
      });
    }
    resetSchoolInput();
    resetEduLevelInput();
    resetStudyFieldInput();
    setEndYear("");
    setStartYear("");
  };

  const schoolClasses = schoolInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  const eduLevelClasses = eduLevelInputHasError
    ? "form-select form-select-sm is-invalid"
    : "form-select form-select-sm";

  const studyFieldClasses = studyFieldInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  //DELETE EDUCATION
  const deleteEducation = (deleteLanguageID) => {
    Axios.delete(
      `${process.env.REACT_APP_SERVER_DOMAIN}/dashboardUserProfile/education/` +
        deleteLanguageID,
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
          setEducation(
            education.filter((educationDetails) => {
              /* eslint-disable-next-line */
              return educationDetails.id != deleteLanguageID;
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
            <Heading content="Education" design="h5" />
          </Col>
          <Col xs={2} sm={2} className="text-end align-self-center">
            <p role="button" className="my-auto">
              <BiPlus
                className="icon"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#addEducation"
              />
            </p>
          </Col>

          <div
            className="modal fade"
            id="addEducation"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-scrollable">
              <div className="modal-content">
                <div className=" modal-header">
                  <Heading content="Add Education" design="h4 my-auto" />
                  <button
                    type="button"
                    id="closeButton"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <Form onSubmit={educationFormSubmissionHandler}>
                  <div className="modal-body">
                    <Col sm={12} className="form-group mb-2">
                      <label htmlFor="eduLevel" className="required">
                        Education Level
                      </label>
                      <select
                        placeholder="What's your Education level?"
                        className={eduLevelClasses}
                        onChange={eduLevelChangeHandler}
                        onBlur={eduLevelBlurHandler}
                      >
                        <option>Please Choose One</option>
                        {eduList.map((eduList) => {
                          const enteredHighLevel = eduList.child_name;
                          return (
                            <option
                              key={enteredHighLevel}
                              value={enteredHighLevel}
                            >
                              {enteredHighLevel}
                            </option>
                          );
                        })}
                      </select>
                      {eduLevelInputHasError && (
                        <Form.Control.Feedback type="invalid">
                          Please choose your Education Level.
                        </Form.Control.Feedback>
                      )}
                    </Col>

                    <Col sm={12} className="form-group mb-2">
                      <label htmlFor="studyField" className="required">
                        Study Field
                      </label>
                      <input
                        type="text"
                        placeholder="What's your study field?"
                        className={studyFieldClasses}
                        onChange={studyFieldChangeHandler}
                        onBlur={studyFieldBlurHandler}
                        value={enteredStudyField}
                      />
                      {studyFieldInputHasError && (
                        <Form.Control.Feedback type="invalid">
                          Please enter your study field.
                        </Form.Control.Feedback>
                      )}
                    </Col>

                    <Col sm={12} className="form-group mb-2">
                      <label htmlFor="school" className="required">
                        School
                      </label>
                      <input
                        type="text"
                        placeholder="What's your school name?"
                        className={schoolClasses}
                        onChange={schoolChangeHandler}
                        onBlur={schoolBlurHandler}
                        value={enteredSchool}
                      />
                      {schoolInputHasError && (
                        <Form.Control.Feedback type="invalid">
                          Please enter your school name.
                        </Form.Control.Feedback>
                      )}
                    </Col>

                    <Col sm={12} className="form-group mb-2">
                      <label htmlFor="grade" className="required">
                        Year
                      </label>
                      <div className="row g-3">
                        <div className="col">
                          <input
                            type="num"
                            className="form-control form-control-sm"
                            min={afterCurYear}
                            max={beforeCurYear}
                            onChange={(e) => setStartYear(e.target.value)}
                            value={startYear}
                            placeholder="Year Start"
                          />
                        </div>
                        <div className="col">
                          <input
                            type="num"
                            className="form-control form-control-sm"
                            min={afterCurYear}
                            max={beforeCurYear}
                            onChange={(e) => setEndYear(e.target.value)}
                            value={endYear}
                            placeholder="Year End"
                          />
                        </div>
                      </div>
                    </Col>

                    <Col sm={12} className="form-group mb-2">
                      <label htmlFor="grade">Grade</label>
                      <input
                        type="text"
                        placeholder="What's your grade?"
                        className="form-control form-control-sm"
                        onChange={(e) => setGrade(e.target.value)}
                        value={grade}
                      />
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
                      disabled={!educationFormIsValid}
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
        <Col>
          {education.map((educationDetails) => {
            const eduID = educationDetails.id;
            const school = educationDetails.school;
            const higherLevel = educationDetails.higher_stud;
            const studyField = educationDetails.study_field;
            const grade = educationDetails.grade;
            const gradYearFrom = educationDetails.grad_year_from;
            const gradYearTo = educationDetails.grad_year_to;

            return (
              <>
                <div key={eduID} className="mb-2">
                  <Row>
                    <Col lg={10} sm={10}>
                      <p className="text-start m-0 fw-bold fs-6">
                        {higherLevel}
                        {studyField !== null && <> in {studyField}</>}
                      </p>
                    </Col>
                    <Col lg={2} sm={2} className="text-end">
                      <BiTrash
                        className="icon"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target={`#createLanguageModal${eduID}`}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <p className="m-0 text-start fs-7">
                      <FaUniversity className="icon" />
                      {school}
                    </p>
                    {grade !== null && (
                      <p className="m-0 text-start fs-7">
                        <BiBookReader className="icon" />
                        {grade}
                      </p>
                    )}
                    <p className="m-0 text-start fs-7">
                      <BiCalendar className="icon" /> {gradYearFrom} -{" "}
                      {gradYearTo}
                    </p>
                  </Row>
                </div>

                <div
                  className="modal fade"
                  id={`createLanguageModal${eduID}`}
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className=" modal-header">
                        <Heading
                          content="Delete Education"
                          design="h4 my-auto"
                        />
                        <button
                          type="button"
                          id="closeButton"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <p>
                          Are you sure want to delete {higherLevel}
                          {studyField !== null && <> in {studyField}</>}?
                        </p>
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
                          onClick={() => deleteEducation(eduID)}
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
        </Col>
      </Col>
    </Row>
  );
}

export default Education;
