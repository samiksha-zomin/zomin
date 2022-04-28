import React, { Fragment, useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Helpers/AuthContext";
import Axios from "axios";

import { Row, Col, Button, Nav, Form, Alert } from "react-bootstrap";
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

function User() {
  const { authState, setAuthState } = useContext(AuthContext);
  const [applicationList, setApplicationList] = useState([]);

  const [pendingNum, setPendingNum] = useState(0);
  const [shortlistedNum, setShortlistedNum] = useState(0);
  const [hiredNum, setHiredNum] = useState(0);
  const [rejectNum, setRejectNum] = useState(0);
  const [withdrewNum, setWithdrewNum] = useState(0);
  const [allApplicationNum, setAllApplicationNum] = useState(0);

  const [withdrawModal, setWithdrawModal] = useState(false);
  const [requestWithdraw, setRequestWithdraw] = useState("");
  const [applicationStatus, setApplicationStatus] = useState(5);

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/userApplication/numberList`,
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
    Axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/userApplication/list`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      setApplicationList(response.data);
    });
  }, []);

  const appStatus = (status) => {
    setApplicationStatus(status);
  };

  let requestWithdrawFormIsValid = false;

  if (requestWithdraw !== "") {
    requestWithdrawFormIsValid = true;
  }

  const requestWithdrawFormSubmissionHandler = (event) => {
    event.preventDefault();
    const withdrewID = event.target[0].value;

    if (requestWithdraw === "") {
      return;
    } else {
      Axios.patch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/userApplication/withdraw`,
        {
          grabID: withdrewID,
          requestWithdraw: requestWithdraw,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((response) => {
        if (response.data.error) {
          return [
            toast.error(
              <Fragment>
                <BiMinusCircle /> <span>{response.data.error}</span>
              </Fragment>
            ),
            setWithdrawModal(false),
          ];
        } else {
          return [
            setWithdrawModal(false),
            toast.success(
              <Fragment>
                <BiMessageCheck /> <span>{response.data.success}</span>
              </Fragment>
            ),

            setApplicationList(response.data.list),
          ];
        }
      });
    }
    setRequestWithdraw("");
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
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
                    const compName = applicationDetails.user_id;
                    const jobType = applicationDetails.job_type;
                    const applicationStatus =
                      applicationDetails.approve_candidate;
                    const grabID = applicationDetails.grab_oppo_id;
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
                              id={compName}
                              design="rounded-circle"
                              width="100"
                              height="100"
                            />
                          </Col>
                          <Col xs={12} sm={8}>
                            <p className="m-0">{jobTitle}</p>
                            <p className="m-0">
                              <Name id={compName} />
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
                            {status === "Shortlisted" ||
                            status === "Pending" ? (
                              <Button
                                variant="danger"
                                onClick={() => setWithdrawModal(true)}
                                data-bs-toggle="modal"
                                data-bs-target={`#col-${grabID}`}
                              >
                                Withdraw
                              </Button>
                            ) : null}
                          </Col>
                          <div
                            className="modal fade"
                            id={`col-${grabID}`}
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
                                    content="Request Application Withdrawal"
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
                                <Form
                                  onSubmit={
                                    requestWithdrawFormSubmissionHandler
                                  }
                                >
                                  <div className="modal-body">
                                    <Col sm={12} className="form-group mb-3">
                                      <Form.Control
                                        type="hidden"
                                        name="grabID"
                                        value={grabID}
                                      />

                                      <label
                                        htmlFor="withdrawReason"
                                        className="required"
                                      >
                                        Reason for withdrawal
                                      </label>
                                      <Form.Check
                                        type="radio"
                                        id="default-radio"
                                        label="I secured an offer from this website"
                                        value="I secured an offer from this website"
                                        name="reqWithdraw"
                                        onClick={(e) =>
                                          setRequestWithdraw(e.target.value)
                                        }
                                      />
                                      <Form.Check
                                        type="radio"
                                        id="default-radio"
                                        label="I secured an offer from other job portal"
                                        value="I secured an offer from other job portal"
                                        name="reqWithdraw"
                                        onClick={(e) =>
                                          setRequestWithdraw(e.target.value)
                                        }
                                      />
                                      <Form.Check
                                        type="radio"
                                        id="default-radio"
                                        label="I secured an offer offline"
                                        value="I secured an offer offline"
                                        name="reqWithdraw"
                                        onClick={(e) =>
                                          setRequestWithdraw(e.target.value)
                                        }
                                      />
                                      <Form.Check
                                        type="radio"
                                        id="default-radio"
                                        label="I accidentally applied for the job"
                                        value="I accidentally applied for the job"
                                        name="reqWithdraw"
                                        onClick={(e) =>
                                          setRequestWithdraw(e.target.value)
                                        }
                                      />

                                      <Form.Check
                                        type="radio"
                                        id="default-radio"
                                        label="Other"
                                        value="Other"
                                        name="reqWithdraw"
                                        onClick={(e) =>
                                          setRequestWithdraw(e.target.value)
                                        }
                                      />
                                    </Col>
                                  </div>
                                  <div className="modal-footer">
                                    <Button
                                      variant="danger"
                                      type="submit"
                                      disabled={!requestWithdrawFormIsValid}
                                    >
                                      Withdraw
                                    </Button>
                                  </div>
                                </Form>
                              </div>
                            </div>
                          </div>
                        </Row>
                      </>
                    );
                  })}
              </div>
            </div>
          </Col>
          <Col lg={2} md={2} sm={12} className="px-1 py-3 my-1 mx-auto">
            <Ads />
          </Col>
        </Row>
      </div>
    </AuthContext.Provider>
  );
}

export default User;
