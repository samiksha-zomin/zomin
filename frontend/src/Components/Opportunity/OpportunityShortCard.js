import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

import { Card, Container, Row, Col, Button } from "react-bootstrap";
import ApplyJob from "./ApplyJob";

//Icon FcLike
import { FcMoneyTransfer, FcLikePlaceholder, FcLike } from "react-icons/fc";
import { BiMessageCheck, BiMinusCircle } from "react-icons/bi";

//Toast
import { toast } from "react-toastify";

function OpportunityShortCard(props) {
  const navigate = useNavigate();
  const [applyJobModalShow, setApplyJobModalShow] = useState(false);
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
  const jobLocation = props.jobLocation;

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
    <Card className="cardOppo mx-3 my-2 position-relative">
      <Container>
        <Row className="mb-1 border-bottom">
          <Col xs={3} sm={2} md={3} lg={3}>
            <img className="imgOppo float-start" alt="fdbdfb" src={cardImage} />
          </Col>
          <Col xs={9} sm={10} md={9} lg={9} className="text-start  p-1">
            <Row>
              <Col sm={10} className="lh-1">
                <dt className="h5 text-truncate">
                  <a
                    className="link-dark text-decoration-none"
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
              </Col>
            </Row>
            <div className="d-flex flex-wrap align-items-center text-start cardJobDetail mb-1">
              <p className="text-truncate">
                <span className={`badge rounded-pill text-dark ${jobTypeBG}`}>
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

              <p className="text-truncate">
                <img
                  alt="dg"
                  className="icon"
                  src="https://www.zom-in.com/images/img/location.svg"
                />
                {jobLocation}
              </p>
            </div>
          </Col>
        </Row>
        <Row className="mt-1">
          <Col xs={4} sm={4} md={4} lg={4} className="d-grid gap-2">
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
            className="border-start border-end d-grid gap-2"
          >
            <Button
              href={oppoLink}
              target="_blank"
              value={oppoLink}
              variant="outline-info border-0"
              size="sm"
            >
              {" "}
              View More
            </Button>
          </Col>
          <Col xs={4} sm={4} md={4} lg={4} className="d-grid gap-2">
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
      <div className="position-absolute top-0 end-0 mt-2 me-2">
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

export default OpportunityShortCard;
