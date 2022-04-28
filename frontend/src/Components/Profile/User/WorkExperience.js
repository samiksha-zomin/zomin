import React, { useState, useEffect, Fragment } from "react";
import Axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import useInput from "../../../Helpers/use-input";
import {
  BiPlus,
  BiMinusCircle,
  BiTrash,
  BiMessageCheck,
  BiBriefcase,
  BiBuilding,
  BiCalendar,
} from "react-icons/bi";

import { Col, Row, Form } from "react-bootstrap";
import Heading from "../../Heading";
import { toast } from "react-toastify";

const isNotEmpty = (value) => value.trim() !== "";

function WorkExperience() {
  const [workingExperience, setWorkingExperience] = useState([]);
  const jobType =([
    "Full Time",
    "Internship",
    "Contract",
    "Part Time",
  ]);
  const [stateList, setStateList] = useState([]);
  // const [industryList, setIndustryList] = useState([]);

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/dashboardUserProfile/workingExperience/`,
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
        setWorkingExperience(response.data);
      }
    });
  }, []);

  //State List
  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/meta/stateLocation`).then(
      (response) => {
        setStateList(response.data);
      }
    );
  });

  //Job Type Input
  const {
    value: enteredJobType,
    isValid: enteredJobTypeIsValid,
    hasError: jobTypeInputHasError,
    valueChangeHandler: jobTypeChangeHandler,
    inputBlurHandler: jobTypeBlurHandler,
    reset: resetJobTypeInput,
  } = useInput(isNotEmpty);

  //Company Name Input
  const {
    value: enteredCompName,
    isValid: enteredCompNameIsValid,
    hasError: compNameInputHasError,
    valueChangeHandler: compNameChangeHandler,
    inputBlurHandler: compNameBlurHandler,
    reset: resetCompNameInput,
  } = useInput(isNotEmpty);

  //Location Input
  const {
    value: enteredLocation,
    isValid: enteredLocationIsValid,
    hasError: locationInputHasError,
    valueChangeHandler: locationChangeHandler,
    inputBlurHandler: locationBlurHandler,
    reset: resetlocationInput,
  } = useInput(isNotEmpty);

  //Position Input
  const {
    value: enteredPosition,
    isValid: enteredPositionIsValid,
    hasError: positionInputHasError,
    valueChangeHandler: positionChangeHandler,
    inputBlurHandler: positionBlurHandler,
    reset: resetPositionInput,
  } = useInput(isNotEmpty);

  //Job Year
  const [endYear, setEndYear] = useState("");
  const [startYear, setStartYear] = useState("");

  //Experience
  const [addData, setAdddata] = useState("");

  let workExpFormIsValid = false;

  if (
    enteredJobTypeIsValid &&
    enteredCompNameIsValid &&
    enteredLocationIsValid &&
    enteredPositionIsValid &&
    startYear !== "" &&
    endYear !== "" &&
    addData !== ""
  ) {
    workExpFormIsValid = true;
  }

  const workExpFormSubmissionHandler = (event) => {
    event.preventDefault();

    if (
      !enteredJobTypeIsValid &&
      !enteredCompNameIsValid &&
      !enteredLocationIsValid &&
      !enteredPositionIsValid &&
      startYear === "" &&
      endYear === "" &&
      addData === ""
    ) {
      return;
    } else {
      Axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/dashboardUserProfile/newWorkingExperience`,
        {
          jobType: enteredJobType,
          companyName: enteredCompName,
          location: enteredLocation,
          position: enteredPosition,
          startYear: startYear,
          endYear: endYear,
          experience: addData,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((response) => {
        const newWorkExpData = response.data[1];

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
            setWorkingExperience([
              {
                id: newWorkExpData.insertId,
                employ_status: enteredJobType,
                cur_position: enteredPosition,
                comp_name_user: enteredCompName,
                location: enteredLocation,
                start_date: startYear,
                end_date: endYear,
                work_exp: addData,
              },
              ...workingExperience,
            ]),
          ];
        }
      });
    }
    resetJobTypeInput();
    resetCompNameInput();
    resetlocationInput();
    resetPositionInput();
    setEndYear("");
    setStartYear("");
    setAdddata("");
  };

  const jobTypeClasses = jobTypeInputHasError
    ? "form-select form-select-sm is-invalid"
    : "form-select form-select-sm";

  const compNameClasses = compNameInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  const locationClasses = locationInputHasError
    ? "form-select form-select-sm is-invalid"
    : "form-select form-select-sm";

  const positionClasses = positionInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  //DELETE

  const deleteWorkExp = (workID) => {
    Axios.delete(
      `${process.env.REACT_APP_SERVER_DOMAIN}/dashboardUserProfile/workingExperience/` +
        workID,
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
          setWorkingExperience(
            workingExperience.filter((workingExperienceDetails) => {
              /* eslint-disable-next-line */
              return workingExperienceDetails.id != workID;
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
            <Heading content="Work Experience" design="h5" />
          </Col>
          <Col xs={2} sm={2} className="text-end align-self-center">
            <p role="button" className="my-auto">
              <BiPlus
                className="icon"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#addWorkExp"
              />
            </p>
          </Col>
          <div
            className="modal fade"
            id="addWorkExp"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog ">
              <div className="modal-content">
                <div className=" modal-header">
                  <Heading content="Add Work Experience" design="h4 my-auto" />
                  <button
                    type="button"
                    id="closeButton"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <Form
                  onSubmit={workExpFormSubmissionHandler}
                  encType="multipart/form-data"
                >
                  <div className="modal-body">
                    <Col sm={12} className="form-group mb-2">
                      <label htmlFor="jobType" className="required">
                        Job Type
                      </label>
                      <select
                        placeholder="What's your job type?"
                        className={jobTypeClasses}
                        onChange={jobTypeChangeHandler}
                        onBlur={jobTypeBlurHandler}
                      >
                        <option value="">Please Choose One</option>
                        {jobType.map((enteredJobType) => {
                          return (
                            <option value={enteredJobType}>
                              {enteredJobType}
                            </option>
                          );
                        })}
                      </select>
                      {jobTypeInputHasError && (
                        <Form.Control.Feedback type="invalid">
                          Please choose your Education Level.
                        </Form.Control.Feedback>
                      )}
                    </Col>

                    <Col sm={12} className="form-group mb-2">
                      <label htmlFor="compName" className="required">
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="What's your company name?"
                        className={compNameClasses}
                        onChange={compNameChangeHandler}
                        onBlur={compNameBlurHandler}
                        value={enteredCompName}
                      />
                      {compNameInputHasError && (
                        <Form.Control.Feedback type="invalid">
                          Please enter your company name.
                        </Form.Control.Feedback>
                      )}
                    </Col>

                    <Col sm={12} className="form-group mb-2">
                      <label htmlFor="location" className="required">
                        Location
                      </label>
                      <select
                        placeholder="Where your company located?"
                        className={locationClasses}
                        onChange={locationChangeHandler}
                        onBlur={locationBlurHandler}
                      >
                        <option>Please Choose One</option>
                        {stateList.map((stateList) => {
                          const enteredLocation = stateList.child_name;
                          return (
                            <option
                              key={enteredLocation}
                              value={enteredLocation}
                            >
                              {enteredLocation}
                            </option>
                          );
                        })}
                      </select>
                      {locationInputHasError && (
                        <Form.Control.Feedback type="invalid">
                          Please choose your company's location.
                        </Form.Control.Feedback>
                      )}
                    </Col>

                    <Col sm={12} className="form-group mb-2">
                      <label htmlFor="position" className="required">
                        Position
                      </label>
                      <input
                        type="text"
                        placeholder="What's your position?"
                        className={positionClasses}
                        onChange={positionChangeHandler}
                        onBlur={positionBlurHandler}
                        value={enteredPosition}
                      />
                      {positionInputHasError && (
                        <Form.Control.Feedback type="invalid">
                          Please enter your position.
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
                            type="date"
                            className="form-control form-control-sm"
                            onChange={(e) => setStartYear(e.target.value)}
                            value={startYear}
                            placeholder="Year Start"
                          />
                        </div>
                        <div className="col">
                          <input
                            type="date"
                            className="form-control form-control-sm"
                            onChange={(e) => setEndYear(e.target.value)}
                            value={endYear}
                            placeholder="Year End"
                          />
                        </div>
                      </div>
                    </Col>

                    <Col sm={12} className="form-group mb-2">
                      <label htmlFor="experience" className="required">
                        Experience
                      </label>
                      <CKEditor
                        editor={ClassicEditor}
                        config={{
                          placeholder: "Share your experience...",
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
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                          // console.log("Editor is ready to use!", editor);
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setAdddata(data);
                        }}
                      />
                      {positionInputHasError && (
                        <Form.Control.Feedback type="invalid">
                          Please enter your position.
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
                      disabled={!workExpFormIsValid}
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
          {workingExperience.map((workingExperienceDetails) => {
            const workID = workingExperienceDetails.id;
            const jobType = workingExperienceDetails.employ_status;
            const currentPosition = workingExperienceDetails.cur_position;
            const compName = workingExperienceDetails.comp_name_user;
            const location = workingExperienceDetails.location;
            const experience = workingExperienceDetails.work_exp;
            const startDate = new Date(workingExperienceDetails.start_date);
            const endDate = new Date(workingExperienceDetails.end_date);
            const startYear = startDate
              .toLocaleDateString("en-GB", {
                month: "short",
                year: "numeric",
              })
              .replace(/ /g, " ");

            const endYear = endDate
              .toLocaleDateString("en-GB", {
                month: "short",
                year: "numeric",
              })
              .replace(/ /g, " ");

            return (
              <>
                <div key={workID}>
                  <Row>
                    <Col lg={10} sm={10}>
                      <p className="text-start m-0 fw-bold fs-6 text-capitalize">
                        {currentPosition}
                      </p>
                    </Col>
                    <Col lg={2} sm={2} className="text-end">
                      <BiTrash
                        className="icon"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target={`#createWorkExpModal${workID}`}
                      />
                    </Col>

                    <div
                      className="modal fade"
                      id={`createWorkExpModal${workID}`}
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
                              content="Delete Work Experience"
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
                              Are you sure want to delete {currentPosition}?
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
                              onClick={() => deleteWorkExp(workID)}
                              data-bs-dismiss="modal"
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Row>

                  <Row>
                    <p className="m-0 text-start fs-7 text-capitalize">
                      <BiBriefcase className="icon" />
                      {jobType}
                    </p>
                    <p className="m-0 text-start fs-7 text-capitalize">
                      <BiBuilding className="icon" /> {compName}, {location}
                    </p>

                    <p className="m-0 text-start fs-7">
                      <BiCalendar className="icon" /> {startYear} - {endYear}
                    </p>
                    <ul className="px-auto px-md-1 px-lg-4 fs-7 text-justify">
                      {ReactHtmlParser(experience)}
                    </ul>
                  </Row>
                </div>
              </>
            );
          })}
        </Col>
      </Col>
    </Row>
  );
}

export default WorkExperience;
