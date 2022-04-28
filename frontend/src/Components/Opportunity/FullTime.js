import React, { useEffect, useState } from "react";
import Axios from "axios";

import { Row, Col, Form } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import useInput from "../../Helpers/use-input";

const isNotEmpty = (value) => value.trim() !== "";

function FullTime({setShow, show}) {
  const [location, setlocation] = useState([]);
  const [eduList, setEduList] = useState([]);


  //Location
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/meta/stateLocation`).then(
      (response) => {
        setlocation(response.data);
      }
    );
  }, []);

  //Education Level
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/meta/eduLevel`).then(
      (response) => {
        setEduList(response.data);
      }
    );
  });

  //JobTitle Input Check
  const {
    value: enteredJobTitle,
    isValid: enteredJobTitleIsValid,
    hasError: jobTitleInputHasError,
    valueChangeHandler: jobTitleChangeHandler,
    inputBlurHandler: jobTitleBlurHandler,
    reset: resetjobTitle,
  } = useInput(isNotEmpty);

  //Salary Input Check
  const {
    value: enteredSalary,
    isValid: enteredSalaryIsValid,
    hasError: salaryInputHasError,
    valueChangeHandler: salaryChangeHandler,
    inputBlurHandler: salaryBlurHandler,
    reset: resetSalary,
  } = useInput(isNotEmpty);

  //Location Input Check
  const {
    value: enteredLocation,
    isValid: enteredLocationIsValid,
    hasError: locationInputHasError,
    valueChangeHandler: locationChangeHandler,
    inputBlurHandler: locationBlurHandler,
    reset: resetLocation,
  } = useInput(isNotEmpty);

  //Experience Year Input Check
  const {
    value: enteredExpYear,
    isValid: enteredExpYearIsValid,
    hasError: expYearInputHasError,
    valueChangeHandler: expYearChangeHandler,
    inputBlurHandler: expYearBlurHandler,
    reset: resetExpYear,
  } = useInput(isNotEmpty);

  //Edu Level Input Check
  const {
    value: enteredHighLevel,
    isValid: enteredHighLevelIsValid,
    hasError: highLevelInputHasError,
    valueChangeHandler: highLevelChangeHandler,
    inputBlurHandler: highLevelBlurHandler,
    reset: resetHighLevel,
  } = useInput(isNotEmpty);

  //Study Field Input Check
  const {
    value: enteredStudyField,
    isValid: enteredStudyFieldIsValid,
    hasError: studyFieldInputHasError,
    valueChangeHandler: studyFieldChangeHandler,
    inputBlurHandler: studyFieldBlurHandler,
    reset: resetStudyField,
  } = useInput(isNotEmpty);

  //Nationality Input Check
  const {
    value: enteredNationality,
    isValid: enteredNationalityIsValid,
    hasError: nationalityInputHasError,
    valueChangeHandler: nationalityChangeHandler,
    inputBlurHandler: nationalityBlurHandler,
    reset: resetNationality,
  } = useInput(isNotEmpty);

  //Interview Option Input Check
  const {
    value: enteredInterviewOption,
    isValid: enteredInterviewOptionIsValid,
    hasError: interviewOptionHasError,
    valueChangeHandler: interviewOptionChangeHandler,
    inputBlurHandler: interviewOptionBlurHandler,
    reset: resetInterviewOption,
  } = useInput(isNotEmpty);

  const [addData, setAdddata] = useState("");


  const fullTimeFormSubmissionHandler = (event) => {
    alert("hi");
  }



  const jobTitleClasses = jobTitleInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  const salaryClasses = salaryInputHasError
    ? "form-select form-select-sm is-invalid"
    : "form-select form-select-sm";

  const locationClasses = locationInputHasError
    ? "form-select form-select-sm is-invalid"
    : "form-select form-select-sm";

  const expYearClasses = expYearInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  const highLevelClasses = highLevelInputHasError
    ? "form-select form-select-sm is-invalid"
    : "form-select form-select-sm";

  const studyFieldClasses = studyFieldInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  const nationalityClasses = nationalityInputHasError
    ? "form-select form-select-sm is-invalid"
    : "form-select form-select-sm";

  const interviewOptionClasses = interviewOptionHasError
    ? "form-select form-select-sm is-invalid"
    : "form-select form-select-sm";

  return (
    <Row className="my-2">
      <Form onSubmit={fullTimeFormSubmissionHandler}>
        <Col sm={12} className="form-group mb-3">
          <label htmlFor="jobTitle" className="required">
            Job Title
          </label>
          <input
            type="text"
            placeholder="Enter your Job Title"
            autoComplete="off"
            className="form-control form-control-sm"
            className={jobTitleClasses}
            onChange={jobTitleChangeHandler}
            onBlur={jobTitleBlurHandler}
            value={enteredJobTitle}
          />
          <p class="fs-7 text-danger">
            * Make sure the Job title is correct and it is not editable{" "}
          </p>

          {jobTitleInputHasError && (
            <Form.Control.Feedback type="invalid">
              Please fill in the job title.
            </Form.Control.Feedback>
          )}
        </Col>

        <Col sm={12} className="form-group mb-3">
          <label htmlFor="salary" className="required">
            Salary
          </label>
          <select
            aria-label="Salary"
            className={salaryClasses}
            value={enteredSalary}
            onChange={salaryChangeHandler}
            onBlur={salaryBlurHandler}
          >
            <option value="">Please Choose One</option>
            <option value="MYR 1000 and Below">MYR 1000 and Below</option>
            <option value="MYR 1001 to MYR 2000">MYR 1001 to MYR 2000</option>
            <option value="MYR 2001 and MYR 3000">MYR 2001 and MYR 3000</option>
            <option value="MYR 3001 and MYR 4000">MYR 3001 and MYR 4000</option>
            <option value="MYR 4001 and MYR 5000">MYR 4001 and MYR 5000</option>
            <option value="MYR 5001 and Above">MYR 5001 and Above</option>
          </select>
          <p>
            <input type="checkbox" name="salary_status" value="0" /> Do not
            disclose salary range to job seeker.
          </p>

          {salaryInputHasError && (
            <Form.Control.Feedback type="invalid">
              Please choose the salary range.
            </Form.Control.Feedback>
          )}
        </Col>

        <Col sm={12} className="form-group mb-2">
          <label htmlFor="location" className="required">
            Location
          </label>
          <select
            defaultValue={""}
            aria-label="Location"
            className={locationClasses}
            onChange={locationChangeHandler}
            onBlur={locationBlurHandler}
            value={enteredLocation}
          >
            <option value="">Please Choose One</option>
            {location.map((location) => {
              const enteredLocation = location.child_name;
              const enteredLocationID = location.child_id;
              return (
                <option key={enteredLocationID} value={enteredLocation}>
                  {enteredLocation}
                </option>
              );
            })}
          </select>
          {locationInputHasError && (
            <Form.Control.Feedback type="invalid">
              Please choose your location.
            </Form.Control.Feedback>
          )}
        </Col>

        <Col sm={12} className="form-group mb-3">
          <label htmlFor="expYear" className="required">
            Experience in years
          </label>
          <input
            type="number"
            min="0"
            max="30"
            placeholder="Enter experience in years"
            className="form-control form-control-sm"
            className={expYearClasses}
            onChange={expYearChangeHandler}
            onBlur={expYearBlurHandler}
            value={enteredExpYear}
          />

          {expYearInputHasError && (
            <Form.Control.Feedback type="invalid">
              Please fill in the experience.
            </Form.Control.Feedback>
          )}
        </Col>

        <Col sm={12} className="form-group mb-2">
          <label htmlFor="eduLevel" className="required">
            Minimum Education Level
          </label>
          <select
            aria-label="Education Level"
            className={highLevelClasses}
            onChange={highLevelChangeHandler}
            onBlur={highLevelBlurHandler}
            value={enteredHighLevel}
          >
            <option value="">Please Choose One</option>
            {eduList.map((eduList, key) => {
              const enteredHighLevel = eduList.child_name;
              return (
                <option key={enteredHighLevel} value={enteredHighLevel}>
                  {enteredHighLevel}
                </option>
              );
            })}
          </select>

          {highLevelInputHasError && (
            <Form.Control.Feedback type="invalid">
              Please choose your minimum education Level.
            </Form.Control.Feedback>
          )}
        </Col>

        <Col sm={12} className="form-group mb-2">
          <label htmlFor="studyField" className="required">
            Field of Study
          </label>
          <input
            type="text"
            placeholder="Enter Field of Study"
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

        <Col sm={12} className="form-group mb-3">
          <label htmlFor="nationality" className="required">
            Nationality
          </label>
          <select
            defaultValue={""}
            aria-label="Nationality"
            className={nationalityClasses}
            onChange={nationalityChangeHandler}
            onBlur={nationalityBlurHandler}
            value={enteredNationality}
          >
            <option value="">Please Choose One</option>
            <option value="Malaysian only">Malaysian Only</option>
            <option value="Not specific">Not specific</option>
          </select>

          {nationalityInputHasError && (
            <Form.Control.Feedback type="invalid">
              Please Choose One.
            </Form.Control.Feedback>
          )}
        </Col>

        <Col sm={12} className="form-group mb-3">
          <label htmlFor="interviewOption" className="required">
            Interview Option
          </label>
          <select
            defaultValue={""}
            aria-label="InterviewOption"
            className={interviewOptionClasses}
            onChange={interviewOptionChangeHandler}
            onBlur={interviewOptionBlurHandler}
            value={enteredInterviewOption}
          >
            <option value="">Please Choose One</option>
            <option value="Face to Face">Face to Face</option>
            <option value="Video Call">Video Call</option>
            <option value="Face to Face / Video Call">
              Face to Face / Video Call
            </option>
          </select>

          {interviewOptionHasError && (
            <Form.Control.Feedback type="invalid">
              Please Choose One
            </Form.Control.Feedback>
          )}
        </Col>

        <Col sm={12} className="form-group mb-2">
          <label htmlFor="experience" className="required">
            Job Requirement / Responsibility
          </label>
          <CKEditor
            editor={ClassicEditor}
            config={{
              placeholder: "Job Requirement / Responsibility",
              removePlugins: [
                "Heading",
                // // "Essentials",
                // // "Italic",
                // "Bold",
                // "Link",
                "imageUpload",
                "EasyImage",
                "ImageUpload",
                "MediaEmbed",
                "BlockQuote",
                // // "List",
                "Indent",
                "Table",
              ],
            }}
            data={addData}
            onChange={(event, editor) => {
              const data = editor.getData();
              setAdddata(data);
            }}
          />
        </Col>

        <button onClick={() => setShow(false)}></button>
      </Form>
    </Row>
  );
}

export default FullTime;
