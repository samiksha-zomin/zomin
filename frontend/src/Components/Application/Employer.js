import React, { Fragment, useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Helpers/AuthContext";
import Axios from "axios";

import { Row, Col, Button, Nav, Form, Alert, Modal } from "react-bootstrap";
import briefcaseIcon from "../../Assests/Images/icon/briefcase.svg";
import {
  BiTime,
  BiXCircle,
  BiCheckCircle,
  BiMessageCheck,
  BiMinusCircle,
  BiErrorCircle,
} from "react-icons/bi";
import { toast } from "react-toastify";

import Ads from "../Ads";
import Profile from "../Profile";
import Name from "../Name";
import Heading from "../Heading";

function Employer() {
  const { authState, setAuthState } = useContext(AuthContext);
  const [applicationList, setApplicationList] = useState([]);

  const [pendingNum, setPendingNum] = useState(0);
  const [shortlistedNum, setShortlistedNum] = useState(0);
  const [hiredNum, setHiredNum] = useState(0);
  const [rejectNum, setRejectNum] = useState(0);
  const [withdrewNum, setWithdrewNum] = useState(0);
  const [allApplicationNum, setAllApplicationNum] = useState(0);

  const [applicationStatus, setApplicationStatus] = useState(5);

  const [shortlistedModal, setShortlistedModal] = useState(false);
  const [hiredModal, setHiredModal] = useState(false);
  const [rejectedModal, setRejectedModal] = useState(false);

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/employerApplication/numberList`,
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    ).then((response) => {
      setPendingNum(response.data[0][0].pendingNum);
      setRejectNum(response.data[1][0].rejectNum);
      setHiredNum(response.data[2][0].hiredNum);
      setShortlistedNum(response.data[3][0].shortlistedNum);
      setWithdrewNum(response.data[4][0].withdrewNum);
      setAllApplicationNum(response.data[5][0].allApplicationNum);
    });
  }, []);

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/employerApplication/list`,
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    ).then((response) => {
      setApplicationList(response.data);
    });
  }, []);

  const appStatus = (status) => {
    setApplicationStatus(status);
  };

  const changingStatus = (e) => {
    if (e.target.value == 1) {
      setRejectedModal(true);
    } else if (e.target.value == 2) {
      setHiredModal(true);
    } else {
      setShortlistedModal(true);
    }
  };

  return (
    <div>
      <Row className="mx-auto p-5">
        <Col lg={10} md={10} sm={12}>
          <ul className="nav nav-fill nav-tabs" id="appTab1" role="tablist">
            <Nav.Item>
              <Nav.Link eventKey="link-0" onClick={() => appStatus(5)}>
                All<span>({allApplicationNum})</span>
              </Nav.Link>
            </Nav.Item>
            {pendingNum > 0 && (
              <Nav.Item>
                <Nav.Link eventKey="link-1" onClick={() => appStatus(0)}>
                  Pending<span>({pendingNum})</span>
                </Nav.Link>
              </Nav.Item>
            )}
            {shortlistedNum > 0 && (
              <Nav.Item>
                <Nav.Link eventKey="link-2" onClick={() => appStatus(3)}>
                  Shortlisted<span>({shortlistedNum})</span>
                </Nav.Link>
              </Nav.Item>
            )}
            {hiredNum > 0 && (
              <Nav.Item>
                <Nav.Link eventKey="link-3" onClick={() => appStatus(2)}>
                  Hired<span>({hiredNum})</span>
                </Nav.Link>
              </Nav.Item>
            )}
            {rejectNum > 0 && (
              <Nav.Item>
                <Nav.Link eventKey="link-4" onClick={() => appStatus(1)}>
                  Rejected<span>({rejectNum})</span>
                </Nav.Link>
              </Nav.Item>
            )}
            {withdrewNum > 0 && (
              <Nav.Item>
                <Nav.Link eventKey="link-5" onClick={() => appStatus(4)}>
                  Withdrew<span>({withdrewNum})</span>
                </Nav.Link>
              </Nav.Item>
            )}
          </ul>

          <div className="tab-content" id="appTabContent">
            <div
              className="tab-pane fade show active"
              id="appApplied"
              role="tabpanel"
              aria-labelledby="applied-tab"
            >
              {applicationList
                .filter((applicationDetails) => {
                  if (applicationStatus === "") {
                    return applicationDetails;
                  } else if (applicationStatus === 5) {
                    return applicationDetails;
                  } else if (
                    applicationDetails.approve_candidate === applicationStatus
                  ) {
                    return applicationDetails;
                  }
                  return false;
                })

                .map((applicationDetails, key) => {
                  const jobTitle = applicationDetails.job_title;
                  const candidateID = applicationDetails.candidate_user_id;
                  const jobType = applicationDetails.job_type;
                  const applicationStatus =
                    applicationDetails.approve_candidate;
                  const withdrawReason = applicationDetails.withdrawReason;

                  let jobTypeBG;
                  switch (jobType) {
                    case "Contract":
                      jobTypeBG = "bg-contract";
                      break;
                    case "Internship":
                      jobTypeBG = "bg-internship";
                      break;
                    case "Part Time":
                      jobTypeBG = "bg-partTime";
                      break;
                    default:
                      jobTypeBG = "bg-fullTime";
                  }

                  let status;
                  let statusBG;
                  let statusIcon;
                  switch (applicationStatus) {
                    case 4:
                      status = "Withdrew";
                      statusBG = "link-danger";
                      statusIcon = <BiMinusCircle className="icon" />;
                      break;
                    case 3:
                      status = "Shortlisted";
                      statusBG = "link-warning";
                      statusIcon = <BiTime className="icon" />;
                      break;
                    case 2:
                      status = "Accepted";
                      statusBG = "link-success";
                      statusIcon = <BiCheckCircle className="icon" />;
                      break;
                    case 1:
                      status = "Rejected";
                      statusBG = "link-danger";
                      statusIcon = <BiXCircle className="icon" />;
                      break;
                    default:
                      status = "Pending";
                      statusBG = "link-warning";
                      statusIcon = <BiTime className="icon" />;
                  }

                  return (
                    <>
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
                          <p className="m-0">{jobTitle}</p>
                          <p className="m-0">
                            <Name id={candidateID} />
                          </p>
                          <p>
                            <span
                              className={`badge rounded-pill text-dark ${jobTypeBG}`}
                            >
                              <img
                                alt="briefcaseIcon"
                                className="icon"
                                src={briefcaseIcon}
                              />
                              {jobType}
                            </span>
                          </p>
                          {status === "Withdrew" && (
                            <Alert variant="danger">
                              <BiErrorCircle /> Withdrew Reason:{" "}
                              {withdrawReason}
                            </Alert>
                          )}
                        </Col>
                        <Col sm={2} className="text-center">
                          <p className={statusBG}>
                            {" "}
                            {statusIcon} {status}
                          </p>
                          {status === "Shortlisted" || status === "Pending" ? (
                            <Form.Select
                              defaultValue={applicationStatus}
                              onChange={changingStatus}
                            >
                              <option value="0">Pending</option>
                              <option value="3">Shortlisted</option>
                              <option value="2">Hired</option>
                              <option value="1">Rejected</option>x
                            </Form.Select>
                          ) : null}
                        </Col>
                      </Row>
                    </>
                  );
                })}
            </div>
          </div>

          {hiredModal === true && (
            <>
              <Modal
                show={hiredModal}
                onHide={() => setHiredModal(false)}
                scrollable
                size="md"
              >
                <Modal.Header closeButton>
                  <Modal.Title>
                    <Heading content="Hiring the candidate" design="h4" />
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Once you choose "hired", an email will be sent to notify the
                  candidate. Do you want to proceed?
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setHiredModal(false)}
                  >
                    Close
                  </Button>
                  <Button variant="primary">Understood</Button>
                </Modal.Footer>
              </Modal>
            </>
          )}

          {rejectedModal === true && (
            <>
              <Modal
                show={rejectedModal}
                onHide={() => setRejectedModal(false)}
                scrollable
                size="md"
              >
                <Modal.Header closeButton>
                  <Modal.Title>
                    <Heading content="Rejecting the candidate" design="h4" />
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                Once you choose "rejected", an email will be sent to notify the
                  candidate. Do you want to proceed?
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setRejectedModal(false)}
                  >
                    Close
                  </Button>
                  <Button variant="primary">Understood</Button>
                </Modal.Footer>
              </Modal>
            </>
          )}


          {shortlistedModal === true && (
            <>
              <Modal
                show={shortlistedModal}
                onHide={() => setShortlistedModal(false)}
                scrollable
                size="md"
              >
                <Modal.Header closeButton>
                  <Modal.Title>
                    <Heading content="Shortlisting the candidate" design="h4" />
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                Once you choose "shortlisting", an email will be sent to notify the
                  candidate. Do you want to proceed?
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShortlistedModal(false)}
                  >
                    Close
                  </Button>
                  <Button variant="primary">Understood</Button>
                </Modal.Footer>
              </Modal>
            </>
          )}
        </Col>
        <Col lg={2} md={2} sm={12} className="px-1 py-3 my-1 mx-auto">
          <Ads />
        </Col>
      </Row>
    </div>
  );
}

export default Employer;
