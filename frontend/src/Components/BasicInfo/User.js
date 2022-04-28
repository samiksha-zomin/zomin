import React, { Fragment, useEffect, useState, useContext } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

//SESSION and INPUT
import { AuthContext } from "../../Helpers/AuthContext";
import useInput from "../../Helpers/use-input";

import { Container, Row, Col, InputGroup, Form } from "react-bootstrap";
import { BiMessageCheck, BiMinusCircle } from "react-icons/bi";
import DatePicker from "react-datepicker";
import { Typeahead } from "react-bootstrap-typeahead";

//Toast
import { toast } from "react-toastify";

//Components
import Heading from "../Heading";

const isNotEmpty = (value) => value.trim() !== "";

function User() {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);

  const [universityList, setUniversityList] = useState([]);
  const [eduList, setEduList] = useState([]);

  useEffect(() => {
      Axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/meta/university`).then(
        (response) => {
          const uni = response.data;
          var rows = [];
          for (var i = 0; i < uni.length; i++) {
            rows.push(response.data[i].university_name);
          }
          setUniversityList(rows);
        }
      );
  });

  //Education Level
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/meta/eduLevel`).then(
      (response) => {
        setEduList(response.data);
      }
    );
  });

  const [currentStatus, setCurrentStatus] = useState(0); // 0: no show, 1: show yes, 2: show no.
  const jobStatus = (currentStatus) => {
    setCurrentStatus(currentStatus);
  };

  //GENDER Input Check
  const [genderInput, setGenderInput] = useState("");

  //DOB Input Check
  const {
    value: enteredDob,
    isValid: enteredDobIsValid,
    hasError: dobInputHasError,
    valueChangeHandler: dobChangeHandler,
    inputBlurHandler: dobBlurHandler,
    reset: resetDobInput,
  } = useInput(isNotEmpty);

  //About Input Check
  const {
    value: enteredAbout,
    isValid: enteredAboutIsValid,
    hasError: aboutInputHasError,
    valueChangeHandler: aboutChangeHandler,
    inputBlurHandler: aboutBlurHandler,
    reset: resetAboutInput,
  } = useInput(isNotEmpty);

  //School Input Check
  const [school, setSchool] = useState("");

  //Highest Education Level Input Check
  const {
    value: enteredHighLevel,
    isValid: enteredHighLevelIsValid,
    hasError: highLevelInputHasError,
    valueChangeHandler: highLevelChangeHandler,
    inputBlurHandler: highLevelBlurHandler,
    reset: resetHighLevelInput,
  } = useInput(isNotEmpty);

  //Study Field Level Input Check
  const {
    value: enteredStudyField,
    isValid: enteredStudyFieldIsValid,
    hasError: studyFieldInputHasError,
    valueChangeHandler: studyFieldChangeHandler,
    inputBlurHandler: studyFieldBlurHandler,
    reset: resetStudyFieldInput,
  } = useInput(isNotEmpty);

  //Start Year Input Check
  const [startDate, setStartDate] = useState();

  //End Year Input Check
  const [endDate, setEndDate] = useState();

  //Current Status Level Input Check
  const {
    value: enteredCurrentStatus,
    isValid: enteredCurrentStatusIsValid,
    // hasError: currentStatusInputHasError,
    valueChangeHandler: currentStatusChangeHandler,
    inputBlurHandler: currentStatusBlurHandler,
    reset: resetCurrentStatusInput,
  } = useInput(isNotEmpty);

  //Company Name Input Check
  const [companyName, setCompanyName] = useState("");

  //Current Position Input Check
  const [currentPosition, setCurrentPosition] = useState("");


  //Bg COurse
  const [bgCourse, setBgCourse] = useState("");
  const [startIntern, setStartIntern] = useState();
  const [endIntern, setEndIntern] = useState();

  const [skill, setSkill] = useState("");

  let userBasicInfoFormIsValid = false;

  if (
    genderInput !== "" &&
    enteredDobIsValid &&
    enteredAboutIsValid &&
    school !== "" &&
    enteredHighLevelIsValid &&
    enteredCurrentStatusIsValid &&
    enteredHighLevelIsValid
  ) {
    userBasicInfoFormIsValid = true;
  }
  const userBasicInfoFormSubmissionHandler = (event) => {
    event.preventDefault();

    if (
      genderInput === "" &&
      !enteredDobIsValid &&
      !enteredAboutIsValid &&
      school === "" &&
      !enteredHighLevelIsValid &&
      !enteredCurrentStatusIsValid &&
      !enteredStudyFieldIsValid
    ) {
      return;
    } else {
      Axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/basicinfo/user`,
        {
          gender: genderInput,
          dob: enteredDob,
          about: enteredAbout,
          school: school,
          eduLevel: enteredHighLevel,
          studyField: enteredStudyField,
          startDate: startDate,
          endDate: endDate,
          currentStatus: enteredCurrentStatus,
          companyName: companyName,
          currentPosition: currentPosition,
          bgCourse:bgCourse,
          startIntern:startIntern,
          endIntern: endIntern,
          skill: skill,
        },
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
          return toast.success(
            <Fragment>
              <BiMessageCheck /> <span>{response.data.success}</span>
            </Fragment>
          );
        }
      });
    }
    setGenderInput("");
    resetDobInput();
    resetAboutInput();
    setSchool("");
    resetHighLevelInput();
    resetCurrentStatusInput();
    resetStudyFieldInput();
    navigate("/");
  };

  const dobClasses = dobInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  const aboutClasses = aboutInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  const highLevelClasses = highLevelInputHasError
    ? "form-select form-select-sm is-invalid"
    : "form-select form-select-sm";

  const studyFieldClasses = studyFieldInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Fragment>
        <HelmetProvider>
          <Helmet>
            <title> Basic Info | Zom - IN </title>
          </Helmet>
        </HelmetProvider>
        <div id="basicInfo" className="basicInfo">
          <Container className="my-5">
            <Row>
              <Col sm={6} xs={12} className="mx-auto">
                <Heading content="Basic Info" design="h4 mb-4" />
                <Form onSubmit={userBasicInfoFormSubmissionHandler}>
                  <Col sm={12} className="form-group mb-3">
                    <label htmlFor="inputgender" className="required">
                      You are
                    </label>
                    <InputGroup>
                      <div>
                        <input
                          type="radio"
                          className="btn-check"
                          name="gender"
                          required
                          id="male"
                          autoComplete="off"
                          onChange={(e) => setGenderInput(e.target.value)}
                          value={[genderInput === "Male" || "Male"]}
                        />
                        <label
                          className="btn btn-outline-success"
                          htmlFor="male"
                        >
                          Male
                        </label>
                      </div>

                      <div className="ms-2 ">
                        <input
                          type="radio"
                          className="btn-check"
                          name="gender"
                          id="female"
                          autoComplete="off"
                          onChange={(e) => setGenderInput(e.target.value)}
                          value={[genderInput === "Female" || "Female"]}
                        />
                        <label
                          className="btn btn-outline-info"
                          htmlFor="female"
                        >
                          Female
                        </label>
                      </div>
                    </InputGroup>
                  </Col>
                  <Col sm={12} className="form-group mb-3">
                    <label htmlFor="inputdob" className="required">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="inputdob"
                      placeholder="Your Birthday"
                      className={dobClasses}
                      onChange={dobChangeHandler}
                      onBlur={dobBlurHandler}
                      value={enteredDob}
                    />
                    {dobInputHasError && (
                      <Form.Control.Feedback type="invalid">
                        Please select your birthdate.
                      </Form.Control.Feedback>
                    )}
                  </Col>

                  <Col sm={12} className="form-group mb-2">
                    <label htmlFor="inputabout" className="required">
                      About
                    </label>
                    <Form.Control
                      as="textarea"
                      placeholder="Tell us about you"
                      className={aboutClasses}
                      onChange={aboutChangeHandler}
                      onBlur={aboutBlurHandler}
                      value={enteredAbout}
                    />
                    {aboutInputHasError && (
                      <Form.Control.Feedback type="invalid">
                        Tell us about you.
                      </Form.Control.Feedback>
                    )}
                  </Col>

                  <hr className="my-4" />
                  <Heading content="Education" design="h4 mb-4" />

                  <Col sm={12} className="form-group mb-2">
                    <label htmlFor="inputSchool" className="required">
                      School
                    </label>

                    <Typeahead
                      inputProps={{ required: true }}
                      id="valid-styles-example"
                      size="small"
                      placeholder="Choose a School"
                      options={universityList}
                      onChange={(value) => {
                        setSchool(value);
                      }}
                      onInputChange={(value) => {
                        setSchool(value);
                      }}
                    />
                  </Col>

                  <Col sm={12} className="form-group mb-2">
                    <label htmlFor="eduLevel" className="required">
                      Highest Education Level
                    </label>
                    <select
                      aria-label="Education Level"
                      className={highLevelClasses}
                      onChange={highLevelChangeHandler}
                      onBlur={highLevelBlurHandler}
                    >
                      <option value="">Please Choose One</option>
                      {eduList.map((eduList, key) => {
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

                    {highLevelInputHasError && (
                      <Form.Control.Feedback type="invalid">
                        Please choose your highest education Level.
                      </Form.Control.Feedback>
                    )}
                  </Col>

                  <Col sm={12} className="form-group mb-2">
                    <label htmlFor="studyField" className="required">
                      Field of Study
                    </label>
                    <input
                      type="text"
                      className={studyFieldClasses}
                      onChange={studyFieldChangeHandler}
                      onBlur={studyFieldBlurHandler}
                      value={enteredStudyField}
                    />

                    {studyFieldInputHasError && (
                      <Form.Control.Feedback type="invalid">
                        Please fill in your field of study.
                      </Form.Control.Feedback>
                    )}
                  </Col>

                  <Col sm={12} className="form-group mb-2">
                    <label htmlFor="eduYear" className="required">
                      Year
                    </label>
                    <InputGroup className="mb-3">
                      <Col sm={4} xs={6}>
                        <DatePicker
                          required
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          showYearPicker
                          dateFormat="yyyy"
                          yearItemNumber={10}
                          placeholderText="Year Start"
                        />
                      </Col>
                      <Col>
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          showYearPicker
                          dateFormat="yyyy"
                          yearItemNumber={10}
                          placeholderText="Year End"
                        />
                      </Col>
                    </InputGroup>
                  </Col>

                  <hr className="my-4" />

                  <Heading content="Working Experience" design="h4 mb-4" />
                  <Col sm={12} className="form-group mb-2">
                    <label htmlFor="currentStatus" className="required">
                      Current Status
                    </label>

                    <InputGroup className="mb-3">
                      <div>
                        <input
                          type="radio"
                          className="btn-check"
                          name="status"
                          id="employedCS"
                          autoComplete="off"
                          onChange={currentStatusChangeHandler}
                          onBlur={currentStatusBlurHandler}
                          value={[
                            enteredCurrentStatus === "employee" || "employee",
                          ]}
                          checked={currentStatus === 2}
                          onClick={(e) => jobStatus(2)}
                        />
                        <label
                          className="btn btn-outline-success"
                          htmlFor="employedCS"
                        >
                          Employed
                        </label>
                      </div>

                      <div className="ms-2 ">
                        <input
                          type="radio"
                          className="btn-check"
                          name="status"
                          id="unemployedCS"
                          autoComplete="off"
                          onChange={currentStatusChangeHandler}
                          onBlur={currentStatusBlurHandler}
                          value={[
                            enteredCurrentStatus === "unemployed" ||
                              "unemployed",
                          ]}
                          checked={currentStatus === 1}
                          onClick={(e) => jobStatus(1)}
                        />
                        <label
                          className="btn btn-outline-info"
                          htmlFor="unemployedCS"
                        >
                          Unemployed
                        </label>
                      </div>

                      <div className="ms-2 ">
                        <input
                          type="radio"
                          className="btn-check"
                          name="status"
                          id="internCS"
                          autoComplete="off"
                          onChange={currentStatusChangeHandler}
                          onBlur={currentStatusBlurHandler}
                          value={[
                            enteredCurrentStatus === "intern" || "intern",
                          ]}
                          checked={currentStatus === 3}
                          onClick={(e) => jobStatus(3)}
                        />
                        <label
                          className="btn btn-outline-warning"
                          htmlFor="internCS"
                        >
                          Intern
                        </label>
                      </div>
                    </InputGroup>
                  </Col>

                  {currentStatus === 2 && (
                    <div>
                      <Col sm={12} className="form-group mb-2">
                        <label htmlFor="companyName" className="required">
                          Company Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="companyName"
                          placeholder="Company Name"
                          value={companyName}
                          onChange={(e) => {
                            setCompanyName(e.target.value);
                          }}
                        />
                      </Col>

                      <Col sm={12} className="form-group mb-2">
                        <label htmlFor="currentPos" className="required">
                          Current Position
                        </label>
                        <input
                          size="sm"
                          type="text"
                          className="form-control"
                          id="currentPos"
                          placeholder="Current Position"
                          value={currentPosition}
                          onChange={(e) => {
                            setCurrentPosition(e.target.value);
                          }}
                        />
                      </Col>
                    </div>
                  )}

                  {currentStatus === 3 && (
                    <>
                      <Col sm={12} className="form-group mb-2">
                        <label htmlFor="inputbgCourse" className="required">
                          Background of your course
                        </label>
                        <Form.Control
                          as="textarea"
                          placeholder="Tell us about background of your course"
                          className="form-control form-control-sm"
                          id="bgCourse"
                          value={bgCourse}
                          onChange={(e) => {
                            setBgCourse(e.target.value);
                          }}
                        />
                        {aboutInputHasError && (
                          <Form.Control.Feedback type="invalid">
                            Tell us about you.
                          </Form.Control.Feedback>
                        )}
                      </Col>
                      <Col xs={12} sm={12} className="form-group mb-2">
                        <label htmlFor="inputStartIntern" className="required">
                          Start Internship
                        </label>
                        <input 
                          type="date" 
                          className="form-control form-control-sm"
                          id="startIntern"
                          value={startIntern}
                          onChange={(e) => {
                            setStartIntern(e.target.value);
                          }}
                           />
                      </Col>
                      <Col xs={12} sm={12} className="form-group mb-2">
                        <label htmlFor="inputStartIntern" className="required">
                          End Internship
                        </label>
                        <input
                          type="date"
                          className="form-control form-control-sm"
                          id="endIntern"
                          value={endIntern}
                          onChange={(e) => {
                            setEndIntern(e.target.value);
                          }}
                        />
                      </Col>
                    </>
                  )}

                  <hr className="my-4" />
                  <Heading content="Skills & Experience" design="h4 mb-4" />
                  <Col sm={12} className="form-group mb-2">
                    <label htmlFor="inputskillexp">Skills & Experience</label>
                    <Typeahead
                      options={[]}
                      onChange={(value) => {
                        setSkill(value);
                      }}
                      onInputChange={(value) => {
                        setSkill(value);
                      }}
                      newSelectionPrefix="Add a new skill: "
                      allowNew
                      id="public-methods-example"
                      multiple
                      placeholder="Add a new skill:"
                    />
                  </Col>

                  <Col className="text-end my-3">
                    <button
                      type="submit"
                      className=" btn btn-primary"
                      disabled={!userBasicInfoFormIsValid}
                    >
                      Submit
                    </button>
                  </Col>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </Fragment>
    </AuthContext.Provider>
  );
}

export default User;
