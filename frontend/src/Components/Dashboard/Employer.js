import React, { useEffect, useState } from "react";
import Axios from "axios";

import { Row, Col } from "react-bootstrap";

import { BiChevronsRight } from "react-icons/bi";
import briefcaseIcon from "../../Assests/Images/icon/briefcase.svg";
import Ads from "../Ads";

import Heading from "../Heading";

function Employer() {
  const [pendingNum, setPendingNum] = useState(0);
  const [shortlistedNum, setShortlistedNum] = useState(0);
  const [hiredNum, setHiredNum] = useState(0);
  const [rejectNum, setRejectNum] = useState(0);

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/dashboard/jobapplicationNum`,
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
    });
  }, []);

  return (
    <Row>
      <Col lg={10} md={12} sm={12} className="mx-auto my-3 p-5">
        <Col lg={12} md={12} sm={12} className="mx-auto my-3">
          <Row className="m-1 text-center text-light">
            <Col className="border border-0 rounded bg-warning mx-1 p-2">
              <h3>{pendingNum}</h3>
              <h6>
                <span className="d-none d-sm-block">Application</span> Pending
              </h6>
            </Col>
            <Col className="border border-0 rounded bg-primary mx-1 p-2">
              <h3>{shortlistedNum}</h3>
              <h6>
                <span className="d-none d-sm-block">Application</span>{" "}
                Shortlisted
              </h6>
            </Col>
            <Col className="border border-0 rounded bg-danger mx-1 p-2">
              <h3>{rejectNum}</h3>
              <h6>
                <span className="d-none d-sm-block">Application</span> Rejected
              </h6>
            </Col>
            <Col className="border border-0 rounded bg-success mx-1 p-2">
              <h3>{hiredNum}</h3>
              <h6>
                <span className="d-none d-sm-block">Application</span> Hired
              </h6>
            </Col>
          </Row>
        </Col>

        <Col
          lg={12}
          md={12}
          sm={12}
          className="mx-auto my-3 border rounded p-2"
        >
          <Row>
            <Col sm={8}>
              <Heading content="Latest Applicant" design="h5" />
            </Col>
            <Col sm={4} className="text-end fs-6">
              <p className="m-0" role="button">
                View More <BiChevronsRight />
              </p>
            </Col>
          </Row>
        </Col>

        <Col
          lg={12}
          md={12}
          sm={12}
          className="mx-auto my-3 border rounded p-2"
        >
          <Row>
            <Col sm={8}>
              <Heading content="Upcoming Interview" design="h5" />
            </Col>
            <Col sm={4} className="text-end fs-6">
              <p className="m-0" role="button">
                View More <BiChevronsRight />
              </p>
            </Col>
          </Row>
        </Col>
      </Col>
      <Col lg={2} md={12} sm={12} className="p-4">
        <Ads />
      </Col>
    </Row>
  );
}

export default Employer;
