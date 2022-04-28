import React, { useEffect , useState } from "react";
import Axios from 'axios';

import { Row, Col } from "react-bootstrap";

import { BiChevronLeft, BiChevronsRight } from "react-icons/bi";
import briefcaseIcon from "../../Assests/Images/icon/briefcase.svg";

import Heading from "../Heading";

function EmployerDashboard({ setshowSubContentClick }) {

    const [pendingNum, setPendingNum] = useState(0);
    const [shortlistedNum, setShortlistedNum] = useState(0);
    const [hiredNum, setHiredNum] = useState(0);
    const [rejectNum, setRejectNum] = useState(0);

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/dashboard/applicationNum`, {
        headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
        ).then(
          (response) => {
            setPendingNum(response.data[0][0].pendingNum);
            setRejectNum(response.data[1][0].rejectNum);
            setHiredNum(response.data[2][0].hiredNum);
            setShortlistedNum(response.data[3][0].shortlistedNum);
          }
        );
      }, []);


  // let jobTypeBG;
  // switch (jobType) {
  //   case "Contract":
  //     jobTypeBG = "bg-contract";
  //     break;
  //   case "Internship":
  //     jobTypeBG = "bg-internship";
  //     break;
  //   case "Part Time":
  //     jobTypeBG = "bg-partTime";
  //     break;
  //   default:
  //     jobTypeBG = "bg-fullTime";
  // }

  return (
    <div>
      <h1
        onClick={() => setshowSubContentClick(0)}
        className="me-2 d-block d-sm-none"
      >
        <BiChevronLeft className="d-inline" />
        <Heading content="My Dashboard" design="h1 d-inline-block" />
      </h1>

      <Col lg={10} md={12} sm={12} className="mx-auto my-3">
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
              <span className="d-none d-sm-block">Application</span> Shortlisted
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

      <Col lg={10} md={12} sm={12} className="mx-auto my-3 border rounded p-2">
        <Heading content="Latest Application" design="h5 pb-1 border-bottom" />

        <Row>
          <Col lg={9} md={9} sm={12} className="fs-6 mb-2">
            <p className="mb-0 text-truncate fw-bold">
              Internship for Web Development
            </p>
            <p className="mb-0 ms-2 text-truncate">
              <a href="/mm" target="_blank" className="text-decoration-none">
                Samiksha Moghan
              </a>{" "}
            </p>
            <p className="mb-0 ms-2 text-truncate">
            samikshamogahn@gmail.com </p>
            <p className="mb-0 ms-2 text-truncate">
              <span className={`badge rounded-pill text-dark bg-fullTime`}>
                <img alt="briefcaseIcon" className="icon" src={briefcaseIcon} />
                Full Time
              </span>
            </p>
          </Col>
          <Col lg={3} md={3} sm={12}>
            <button
              type="button"
              className="col-12 btn btn-sm btn-primary mb-2"
            >
              Schedule
            </button>
            <select
              className="form-select form-select-sm text-center"
            >
              <option defaultValue="Pending">
                Pending
              </option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </Col>
        </Row>
        <hr className="m-1" />
        <Row>
          <Col sm={12} className="text-end fs-6">
            <p className="m-0" role="button" onClick={() => setshowSubContentClick(3)}>
              View More <BiChevronsRight />
            </p>
          </Col>
        </Row>
      </Col>

      <Col lg={10} md={12} sm={12} className="mx-auto my-3 border rounded p-2">
        <Heading content="Upcoming Interview" design="h5 pb-1 border-bottom" />
        <Row>
        <Col sm={12}>
        <p className="mb-0 text-truncate fw-bold">
              Internship rvjrebvn fhvbfv fjvfh
            </p>
            <p className="mb-0 ms-2 text-truncate">
              <a href="/mm" target="_blank" className="text-decoration-none">
                Samiksha Moghan
              </a>{" "}
            </p>
            <p className="mb-0 ms-2">11 June 2020 (10am)</p>
            <a className="mb-0 ms-2 text-decoration-none fs-6 text-truncate" href="/bjgyufvju">https://jdevvjdecjksnvs.com</a>
        </Col>
        </Row>
        <hr className="m-1" />
        <Row>
          <Col sm={12} className="text-end fs-6">
            <p className="m-0" role="button" onClick={() => setshowSubContentClick(4)}>
              View More <BiChevronsRight />
            </p>
          </Col>
        </Row>
      </Col>
    </div>
  );
}

export default EmployerDashboard;
