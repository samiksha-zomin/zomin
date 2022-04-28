import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import ReactHtmlParser from "react-html-parser";

import { Card, Container, Row, Col, Button, Collapse } from "react-bootstrap";
import ApplyJob from "./ApplyJob";

//Icon
import {
  FcMoneyTransfer,
  FcSurvey,
  FcReadingEbook,
  FcManager,
  FcLikePlaceholder,
  FcLike,
} from "react-icons/fc";
import { BiChevronsDown, BiMessageCheck, BiMinusCircle } from "react-icons/bi";
import { GiBrain, GiVideoConference } from "react-icons/gi";
import { FaUniversity } from "react-icons/fa";

//Toast
import { toast } from "react-toastify";

function OpportunityLongCard(props) {
const navigate = useNavigate();
  const [applyJobModalShow, setApplyJobModalShow] = useState(false);
  const [open, setOpen] = useState(false);

  const [applyJobStatus, setApplyJobStatus] = useState(false);
  const [saveJobStatus, setSaveJobStatus] = useState(false);

  const oppoID = props.oppoID;
  const jobType = props.jobType;
  const compName = props.compName;
  const jobTitle = props.jobTitle;
  const cardImage = props.cardImage;
  const compLink = props.compLink;
  const salaryStatus = props.salaryStatus;
  const salary = props.salary;
  const nationality = props.nationality;
  const jobTest = props.jobTest;
  const jobLocation = props.jobLocation;
  const yearExp = props.yearExp;
  const freshGraduate = props.freshGraduate;
  const education = props.education;
  const fieldStudy = props.fieldStudy;
  const ivOption = props.ivOption;
  const jobDesc = props.jobDesc;

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      Axios.get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/opportunity/user/applystatus/` +
          oppoID,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((response) => {
        const applyStatus = response.data;
        if (applyStatus.length > 0) {
          setApplyJobStatus(true);
        }
      });
    }
  });

  function copyLink(link) {
    navigator.clipboard.writeText(link);
    return toast.dark(
      <Fragment>
        <BiMessageCheck />
        <span>Copied to the clipboard!</span>
      </Fragment>
    );
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

  var oppoLink =
    "/opportunity/" +
    compName.replace(/\//g, "-").toLowerCase().trim().split(/\s+/).join("-") +
    "/" +
    jobTitle.replace(/\//g, "-").toLowerCase().trim().split(/\s+/).join("-") +
    "/" +
    oppoID;
  var shareLink = "https://www.zom-in.com/" + oppoLink;

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      Axios.get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/opportunity/user/savedjob/` +
          oppoID,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      ).then((response) => {
        const savedJobStatus = response.data;
        if (savedJobStatus.length > 0) {
          setSaveJobStatus(true);
        }
      });
    }
  });

  const saveJob = (id) => {
    let saveJobInfo = [id];

    if (!localStorage.getItem("accessToken")) {
      return [
        navigate("/signup"),
        toast.warn(
          <Fragment>
            <BiMinusCircle />
            <span>Please Sign In /Sign Up before saving for a job</span>
          </Fragment>
        ),
      ];
    } else {
      Axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/opportunity/user/save`,
        {
          oppoID: saveJobInfo[0],
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
          return [
            toast.success(
              <Fragment>
                <BiMessageCheck /> <span>{response.data.success}</span>
              </Fragment>
            ),
            setSaveJobStatus(true),
          ];
        }
      });
    }
  };

  const unSaveJob = (id) => {
    let saveJobInfo = [id];

    if (!localStorage.getItem("accessToken")) {
      return [
        navigate("/signup"),
        toast.warn(
          <Fragment>
            <BiMinusCircle />
            <span>Please Sign In /Sign Up before saving for a job</span>
          </Fragment>
        ),
      ];
    } else {
      Axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/opportunity/user/unsave`,
        {
          oppoID: saveJobInfo[0],
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
          return [
            toast.success(
              <Fragment>
                <BiMessageCheck /> <span>{response.data.success}</span>
              </Fragment>
            ),
            setSaveJobStatus(false),
          ];
        }
      });
    }
  };

  return (
    <Card className="cardOppo cardLOppo position-relative">
      <Container>
        <Row className="mb-1 border-bottom">
          <Col xs={3} sm={3} md={2} lg={2}>
            <img
              className="imgOppo float-start"
              alt="zom-in partner logo"
              src={cardImage}
            />
          </Col>
          <Col xs={9} sm={9} md={7} lg={7} className="text-start p-1">
            <Row>
              <Col className="lh-1">
                <dt className="h5 text-truncate">
                  <a
                    className="link-dark text-decoration-none "
                    href={oppoLink}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {jobTitle}
                  </a>
                </dt>
                <a
                  href={compLink}
                  className="text-decoration-none text-truncate"
                >
                  {compName}
                </a>
                <div className="d-flex flex-wrap align-items-center text-start cardJobDetail mb-4">
                  <p className="text-truncate">
                    <span
                      className={`badge rounded-pill text-dark ${jobTypeBG}`}
                    >
                      <img
                        alt="dg"
                        className="icon"
                        src="https://www.zom-in.com/images/icon/opportunity.svg"
                      />
                      {jobType}
                    </span>
                  </p>

                  {salaryStatus === 1 ? (
                    <p className="text-truncate">
                      <FcMoneyTransfer />
                      {salary}
                    </p>
                  ) : (
                    <p className="text-truncate text-muted">
                      <FcMoneyTransfer />
                      Undisclosed
                    </p>
                  )}

                  {nationality !== "Not specific" ? (
                    <p className="text-truncate">
                      <FcManager />
                      {nationality}
                    </p>
                  ) : null}

                  {jobTest === 1 ? (
                    <p className="text-truncate">
                      <FcSurvey /> Test / Assessment will be conducted
                    </p>
                  ) : null}
                  <p className="text-truncate">
                    <img
                      alt="dg"
                      className="icon"
                      src="https://www.zom-in.com/images/img/location.svg"
                    />{" "}
                    {jobLocation}
                  </p>
                </div>
                <Collapse in={open} className="pt-1">
                  <Col
                    xs={9}
                    sm={10}
                    md={12}
                    lg={12}
                    id="collapseID"
                    className="text-start p-1"
                  >
                    <p className="h6">Job Details</p>
                    <div className="fs-6 p-2">
                      {yearExp > 0 && (
                        <p className="text-truncate">
                          <GiBrain className="icon" /> {yearExp} years of
                          experience
                        </p>
                      )}

                      {freshGraduate === 1 && (
                        <p className="text-truncate">
                          <img
                            alt="zom-in-fresh-graduate-icon"
                            className="icon"
                            src="https://www.zom-in.com/images/icon/graduated.svg"
                          />
                          Open for Fresh Graduates
                        </p>
                      )}

                      {education && (
                        <p className="text-truncate">
                          <FaUniversity className="icon" /> {education}
                        </p>
                      )}

                      {fieldStudy && (
                        <p className="text-truncate">
                          <FcReadingEbook className="icon" /> {fieldStudy}
                        </p>
                      )}

                      {ivOption && (
                        <p className="text-truncate">
                          <GiVideoConference className="icon" /> {ivOption}
                        </p>
                      )}
                    </div>
                    <p className="h6">Job Requirement / Responsibilities</p>
                    <div className="fs-6 p-2">{ReactHtmlParser(jobDesc)}</div>
                  </Col>
                </Collapse>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-1">
          <Col xs={4} sm={4} md={4} lg={4}>
            <Button
              variant="outline-secondary border-0"
              size="sm"
              onClick={() => copyLink(shareLink)}
            >
              {" "}
              Share
            </Button>
          </Col>
          <Col
            xs={4}
            sm={4}
            md={4}
            lg={4}
            className="border-start border-end"
          >
            <Button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="collapseID"
              variant="outline-info border-0"
              size="sm"
            >
              <BiChevronsDown />
              View More
            </Button>
          </Col>
          <Col xs={4} sm={4} md={4} lg={4}>
            {applyJobStatus ? (
              <Button
                variant="outline-primary border-0"
                size="sm"
                href="/dashboard"
              >
                Applied
              </Button>
            ) : (
              <>
                <Button
                  variant="outline-success border-0"
                  size="sm"
                  // onClick={() => applyJob(jobTitle, compName)}
                  onClick={() => setApplyJobModalShow(true)}
                >
                  Apply Now
                </Button>
                <ApplyJob
                  oppo_id={oppoID}
                  job_title={jobTitle}
                  show={applyJobModalShow}
                  onHide={() => setApplyJobModalShow(false)}
                />
              </>
            )}
          </Col>
        </Row>
      </Container>

      <div
        className="position-absolute top-0 end-0 mt-2 me-2"
        // onClick={() =>saveJob(oppoID)}
      >
        {saveJobStatus ? (
          <FcLike
            size={28}
            className="unSaveBtn"
            onClick={() => unSaveJob(oppoID)}
          />
        ) : (
          <FcLikePlaceholder
            size={28}
            className="saveBtn"
            onClick={() => saveJob(oppoID)}
          />
        )}
      </div>
    </Card>
  );
}

export default OpportunityLongCard;
