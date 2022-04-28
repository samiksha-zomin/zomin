import React, { useEffect, useState, Fragment } from "react";
import {useNavigate} from 'react-router-dom';
import Axios from "axios";

import { Row, Col, Nav } from "react-bootstrap";
import {
  BiChevronLeft,
  BiFilter,
  BiCheckCircle,
  BiXCircle,
  BiMinusCircle,
  BiMessageCheck
} from "react-icons/bi";
import briefcaseIcon from "../../Assests/Images/icon/briefcase.svg";
import { toast } from "react-toastify";

import Heading from "../Heading";
import ApplicationCard from "./ApplicationCard";
import Name from "../Name";
import Email from "../Email";

function EmployerApplication({ setshowSubContentClick }) {
  const navigate = useNavigate();


  const [pendingNum, setPendingNum] = useState(0);
  const [shortlistedNum, setShortlistedNum] = useState(0);
  const [hiredNum, setHiredNum] = useState(0);
  const [rejectNum, setRejectNum] = useState(0);
  const [withdrewNum, setWithdrewNum] = useState(0);
  const [allApplicationNum, setAllApplicationNum] = useState(0);
  const [applicationList, setApplicationList] = useState([]);
  const [applicationStatus, setApplicationStatus] = useState(5);

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/dashboard/applicationNum`,
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
      `${process.env.REACT_APP_SERVER_DOMAIN}/dashboard/applicationStatusList`,
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

  const changeJobStatus = (jobCode, grabID) => {
    let applyJobInfo = [jobCode, grabID];
    Axios.patch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/dashboard/jobStatus`,
      {
        jobCode:applyJobInfo[0],
        grabID:applyJobInfo[1],
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    ).then((response)=> {
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
          setApplicationList(response.data.list),
        ];
      }
    })
  };

  const resume = (candidateID) => {
    let cddInfo = candidateID;
    
    navigate('/resume/'+cddInfo);
    console.log(cddInfo)
  }

  

  return (
    <div>
      <h1
        onClick={() => setshowSubContentClick(0)}
        className="me-2 d-block d-sm-none"
      >
        <BiChevronLeft className="d-inline" />
        <Heading content="Application History" design="h1 d-inline-block" />
      </h1>
      <Col lg={10} md={12} sm={12} className="mx-auto my-3">
        <div className="d-none d-lg-block">
          <Nav justify variant="tabs" defaultActiveKey="link-0">
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
          </Nav>
        </div>
        <div className="d-block d-md-block d-lg-none">
          <button
            className="ms-2 btn btn-white text-dark border border-1 rounded"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTabs"
            aria-expanded="false"
            aria-controls="collapseTabs"
          >
            <BiFilter /> Filter
          </button>
          <div className="ms-2 collapse navbar-collapse" id="collapseTabs">
            <div className="nav navbar-nav dropdown-menu px-3" id="myAppTab">
              <div className="nav-item">
                <div
                  className="nav-link text-dark"
                  onClick={() => appStatus(5)}
                >
                  All <span>({allApplicationNum})</span>
                </div>
              </div>
              {pendingNum > 0 && (
                <div className="nav-item">
                  <div
                    className="nav-link active text-dark"
                    onClick={() => appStatus(0)}
                  >
                    Pending <span>({pendingNum})</span>
                  </div>
                </div>
              )}
              {shortlistedNum > 0 && (
                <div className="nav-item">
                  <div
                    className="nav-link text-dark"
                    onClick={() => appStatus(3)}
                  >
                    Shortlisted <span>({shortlistedNum})</span>
                  </div>
                </div>
              )}
              {hiredNum > 0 && (
                <div className="nav-item">
                  <div
                    className="nav-link text-dark"
                    onClick={() => appStatus(2)}
                  >
                    Hired <span>({hiredNum})</span>
                  </div>
                </div>
              )}
              {rejectNum > 0 && (
                <div className="nav-item">
                  <div
                    className="nav-link text-dark"
                    onClick={() => appStatus(1)}
                  >
                    Rejected <span>({rejectNum})</span>
                  </div>
                </div>
              )}
              {withdrewNum > 0 && (
                <div className="nav-item">
                  <div
                    className="nav-link text-dark"
                    onClick={() => appStatus(4)}
                  >
                    Withdrew <span>({withdrewNum})</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Col>
      <Col lg={10} md={12} sm={12} className="mx-auto my-3">
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
            const grabID = applicationDetails.grab_oppo_id;
            const jobTitle = applicationDetails.job_title;
            const jobType = applicationDetails.job_type;
            const candidateID = applicationDetails.candidate_user_id;
            const cddStatus = applicationDetails.approve_candidate;
            {
              /* setStatus */
            }

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

            return (
              <Row>
                <Col lg={9} md={8} sm={12} className="fs-6 mb-2">
                  <p className="mb-0 text-truncate fw-bold">{jobTitle}</p>
                  <p className="mb-0 ms-2 text-truncate">
                    <a
                      onClick={() => resume(candidateID)}
                      target="_blank"
                      className="text-decoration-none"
                    >
                      <Name id={candidateID} />
                    </a>
                  </p>
                  <p className="mb-0 ms-2 text-truncate">
                    <Email id={candidateID} />
                  </p>
                  <p className="mb-0 ms-2 text-truncate">
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
                  {cddStatus === 4 && (
                    <div className="border border-0 rounded alert-warning my-1 ms-2 p-2">
                      <p className="p-0 m-0">
                        The candidate already secured a job in this website.
                      </p>
                    </div>
                  )}
                </Col>
                {cddStatus === 4 ? (
                  <Col lg={3} md={4} sm={12} className="text-center mx-auto">
                    <h5>
                      <BiMinusCircle size={28} className="mx-2 text-warning" />
                      Withdrew
                    </h5>
                  </Col>
                ) : (
                  <>
                    {cddStatus === 2 ? (
                      <Col
                        lg={3}
                        md={4}
                        sm={12}
                        className="text-center mx-auto"
                      >
                        <h5>
                          <BiCheckCircle
                            size={28}
                            className="mx-2 text-success"
                          />
                          Hired
                        </h5>
                      </Col>
                    ) : (
                      <>
                        {cddStatus === 1 ? (
                          <Col
                            lg={3}
                            md={4}
                            sm={12}
                            className="text-center mx-auto"
                          >
                            <h5>
                              <BiXCircle
                                size={28}
                                className="mx-2 text-danger"
                              />
                              Rejected
                            </h5>
                          </Col>
                        ) : (
                          <Col lg={3} md={4} sm={12}>
                            <button
                              type="button"
                              className="col-12 btn btn-sm btn-primary mb-2"
                            >
                              Schedule
                            </button>
                            <ApplicationCard grabID={grabID} onClick={changeJobStatus} cddStatus={cddStatus} candidateID={candidateID}/>
                          </Col>
                        )}
                      </>
                    )}
                  </>
                )}
                <hr className="mx-1 my-3" />
              </Row>
            );
          })}
      </Col>
    </div>
  );
}

export default EmployerApplication;
