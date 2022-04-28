import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Row, Col, Image, Button } from "react-bootstrap";

import ApplyJob from "./ApplyJob";

//ICON
import {
  FcMoneyTransfer,
  FcSurvey,
  FcManager,
  FcLikePlaceholder,
  FcLike,
} from "react-icons/fc";
import { BiMessageCheck, BiMinusCircle } from "react-icons/bi";

import { toast } from "react-toastify";

function LandingTop(props) {
  const navigate = useNavigate();

  const oppoID = props.oppoID;
  const jobType = props.jobType;
  const compName = props.compName;
  const cardImage = props.cardImage;
  const jobTitle = props.jobTitle;
  const coverPic = props.coverPic;
  const compLink = props.compLink;
  const salaryStatus = props.salaryStatus;
  const salary = props.salary;
  const nationality = props.nationality;
  const jobTest = props.jobTest;
  const jobLocation = props.jobLocation;

  const [applyJobModalShow, setApplyJobModalShow] = useState(false);
  const [applyJobStatus, setApplyJobStatus] = useState(false);
  const [saveJobStatus, setSaveJobStatus] = useState(false);

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
  var shareLink = "https://www.zom-in.com" + oppoLink;

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
    <Col className="border p-0 m-0">
      <Row>
        <Col sm={12} className="position-relative">
          <Image className="oppoCoverImg" src={coverPic} fluid />
          <div className="position-absolute bottom-0 end-0 mb-2 me-3">
            {saveJobStatus ? (
              <FcLike
                size={42}
                className="unSaveBtn"
                onClick={() => unSaveJob(oppoID)}
              />
            ) : (
              <FcLikePlaceholder
                size={42}
                className="saveBtn"
                onClick={() => saveJob(oppoID)}
              />
            )}
          </div>
        </Col>
      </Row>
      <Row className="align-items-end mx-3 my-1">
        <Col xs={3} sm={12} md={2} lg={1} className=" ">
          <Image className="" src={cardImage} fluid />
        </Col>
        <Col xs={9} sm={12} md={6} lg={7}>
          <h5 className="text-wrap mb-0">{jobTitle}</h5>
          <a href={compLink} className="text-decoration-none text-wrap mb-0">
            {compName}
          </a>
        </Col>
        <Col xs={12} sm={12} md={4} lg={4} className="text-end">
          {applyJobStatus ? (
            <Button
              variant="outline-primary border-0"
              size="sm"
              href="/dashboard"
            >
              Applied!
            </Button>
          ) : (
            <>
              <Button
                variant="success border-0"
                size="sm"
                onClick={() => setApplyJobModalShow(true)}
              >
                Apply Now!
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
      <Row className="p-3">
        <Col sm={12}>
          <div className="d-flex flex-wrap align-items-center text-start cardJobDetail">
            <p className="">
              <span className={`badge rounded-pill text-dark ${jobTypeBG}`}>
                <img
                  alt="dg"
                  className="icon"
                  src="https://www.zom-in.com/images/icon/opportunity.svg"
                />{" "}
                {jobType}
              </span>
            </p>

            {salaryStatus === 1 ? (
              <p>
                <FcMoneyTransfer />
                {salary}
              </p>
            ) : (
              <p className="text-muted">
                <FcMoneyTransfer />
                Undisclosed
              </p>
            )}
          </div>
          <div className="d-flex flex-wrap align-items-center text-start cardJobDetail">
            {nationality !== "Not specific" ? (
              <p>
                <FcManager />
                {nationality}
              </p>
            ) : null}
            {jobTest === 1 ? (
              <p className="text-truncate">
                <FcSurvey /> Test / Assessment will be conducted
              </p>
            ) : null}
          </div>
          <div className="d-flex flex-wrap align-items-center text-start cardJobDetail">
            <p className="">
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
      <Row className="m-2">
        <Col
          xs={4}
          sm={4}
          md={4}
          lg={4}
          className="d-grid gap-2 border-top pt-2"
        >
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
          className="border-start border-end border-top d-grid gap-2 pt-2"
        >
          {saveJobStatus ? (
            <Button
              variant="outline-warning border-0"
              size="sm"
              onClick={() => unSaveJob(oppoID)}
            >
              Saved
            </Button>
          ) : (
            <Button
              variant="outline-warning border-0"
              size="sm"
              onClick={() => saveJob(oppoID)}
            >
              Save
            </Button>
          )}
        </Col>
        <Col
          xs={4}
          sm={4}
          md={4}
          lg={4}
          className="d-grid gap-2 border-top pt-2"
        >
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
    </Col>
  );
}

export default LandingTop;
