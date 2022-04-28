import React, { Fragment, useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Helpers/AuthContext";
import useInput from "../../Helpers/use-input";
import Axios from "axios";

import { Row, Col, Button, Form } from "react-bootstrap";
import { BiTime, BiMinusCircle, BiMessageCheck } from "react-icons/bi";
import { toast } from "react-toastify";

import Reschedule from "./User/Reschedule";
import Ads from "../Ads";
import Profile from "../Profile";
import Name from "../Name";
import Heading from "../Heading";

const isNotEmpty = (value) => value.trim() !== "";


function Employer() {
  const { authState, setAuthState } = useContext(AuthContext);
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/employerInterview/list`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      setInterviewList(response.data);
    });
  }, []);

  const {
    value: enteredProposeTimeDate,
    isValid: enteredProposeTimeDateIsValid,
    hasError: proposeTimeDateInputHasError,
    valueChangeHandler: proposeTimeDateChangeHandler,
    inputBlurHandler: proposeTimeDateBlurHandler,
    reset: resetProposeTimeDateInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredRemark,
    isValid: enteredRemarkIsValid,
    hasError: remarkInputHasError,
    valueChangeHandler: remarkChangeHandler,
    inputBlurHandler: remarkBlurHandler,
    reset: resetRemarkInput,
  } = useInput(isNotEmpty);

  let requestRescheduleFormIsValid = false;

  if (enteredProposeTimeDateIsValid && enteredRemarkIsValid) {
    requestRescheduleFormIsValid = true;
  }

  const requestRescheduleFormSubmissionHandler = (event) => {
    event.preventDefault();

    const candidateID = event.target[0].value;
    const interviewID = event.target[1].value;
    const grabID = event.target[2].value;
    const interviewTime = event.target[3].value;

    if (!enteredProposeTimeDate && !enteredRemark) {
      return;
    } else {
      Axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/employerinterview/scheduleInterview`,
        {
          timeDate: enteredProposeTimeDate,
          intialInterview: interviewTime,
          remarks: enteredRemark,
          candidateID: candidateID,
          interviewID: interviewID,
          grabID: grabID,
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
    resetProposeTimeDateInput();
    resetRemarkInput();
  };

  const proposeTimeDateClasses = proposeTimeDateInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  const remarkClasses = remarkInputHasError
    ? "form-control form-control-sm is-invalid"
    : "form-control form-control-sm";

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <div>
        <Row className="mx-auto p-1 p-lg-5">
          <Col lg={10} md={10} sm={12}>
          {interviewList.map((interviewDetails, key) => {
              const interviewID = interviewDetails.interviewID;
              const candidateID = interviewDetails.candidate_id;
              const grabID = interviewDetails.oppo_id;
              const jobTitle = interviewDetails.job_title;
              const interviewerName = interviewDetails.interviewerName;
              const interviewRemarks = interviewDetails.interviewRemarks;
              const interviewLink = interviewDetails.interviewVenueOrVideo;
              const interviewingTime = new Date(interviewDetails.interviewTime);
              const interviewTimeConvert = interviewingTime
                .toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
                .replace(/ /g, " ");

              const interviewInitial = interviewingTime
                .toISOString()
                .replace(".000Z", "");

              return (
                <Row className="mx-auto my-3 p-3 border-bottom">
                <Col sm={2} className="d-none d-md-none d-lg-block">
                    <Profile
                      id={candidateID}
                      design="rounded-circle"
                      width="100"
                      height="100"
                    />
                  </Col>
                  <Col xs={12} sm={8}>
                    <div>
                      <p className="m-0 fw-bold">{jobTitle}</p>
                      <p className="m-0">
                        <Name id={candidateID} />
                      </p>
                      <p className="m-0">Interviewer Name: {interviewerName}</p>
                      <p className="m-0">
                        <BiTime className="icon" />
                        {interviewTimeConvert}
                      </p>
                      <a
                        href={interviewLink}
                        target="_blank"
                        rel="noreferrer"
                        className="m-0 text-decoration-none"
                      >
                        {interviewLink}
                      </a>
                      <p>Remarks: {interviewRemarks}</p>
                    </div>
                    <Reschedule interviewID={interviewID} interviewerName={interviewerName} interviewLink={interviewLink}/>
                  </Col>
                  <Col sm={2} className="text-center mx-auto">
                    <Button
                      variant="warning"
                      // onClick={() => setRescheduleModal(true)}
                      data-bs-toggle="modal"
                      data-bs-target={`#col-${interviewID}`}
                    >
                      Re-Schedule
                    </Button>
                  </Col>

                  <div
                    className="modal fade"
                    id={`col-${interviewID}`}
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
                            content="Request Interview Re-Schedule"
                            design="h5"
                          />
                          <button
                            type="button"
                            id="closeButton"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <Form onSubmit={requestRescheduleFormSubmissionHandler}>
                          <Form.Control
                            type="hidden"
                            name="employerID"
                            value={candidateID}
                          />
                          <Form.Control
                            type="hidden"
                            name="interviewID"
                            value={interviewID}
                          />
                          <Form.Control
                            type="hidden"
                            name="grabID"
                            value={grabID}
                          />
                          <div className="modal-body">
                            <Col sm={12} className="form-group mb-3">
                              <label
                                htmlFor="intialTimeAndDate"
                                className="required"
                              >
                                Initial Time and Date
                              </label>
                              <input
                                plaintext="true"
                                readOnly
                                defaultValue={interviewInitial}
                                className="form-control-plaintext form-control-sm"
                              />
                            </Col>

                            <Col sm={12} className="form-group mb-3">
                              <label
                                htmlFor="proposedTimeDate"
                                className="required"
                              >
                                Proposed Time and Date
                              </label>
                              <input
                                type="datetime-local"
                                placeholder="Enter your Proposed Time and Date"
                                autoComplete="off"
                                className={proposeTimeDateClasses}
                                onChange={proposeTimeDateChangeHandler}
                                onBlur={proposeTimeDateBlurHandler}
                                value={enteredProposeTimeDate}
                              />

                              {proposeTimeDateInputHasError && (
                                <Form.Control.Feedback type="invalid">
                                  Please fill in the proposed Time and Date.
                                </Form.Control.Feedback>
                              )}
                            </Col>

                            <Col sm={12} className="form-group mb-2">
                              <label
                                htmlFor="inputremarks"
                                className="required"
                              >
                                Remarks
                              </label>
                              <Form.Control
                                as="textarea"
                                placeholder="Your reason for rescheduling"
                                className={remarkClasses}
                                onChange={remarkChangeHandler}
                                onBlur={remarkBlurHandler}
                                value={enteredRemark}
                              />
                              {remarkInputHasError && (
                                <Form.Control.Feedback type="invalid">
                                  Tell us your reason for reschedling the
                                  interview.
                                </Form.Control.Feedback>
                              )}
                            </Col>
                          </div>
                          <div className="modal-footer">
                            <Button
                              variant="warning"
                              type="submit"
                              disabled={!requestRescheduleFormIsValid}
                            >
                              Re-Schedule
                            </Button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </Row>
          );
            })}
          </Col>
          <Col lg={2} md={2} sm={12} className="px-1 py-3 my-1 mx-auto">
            <Ads />
          </Col>
        </Row>
      </div>
    </AuthContext.Provider>
  );
}

export default Employer;
