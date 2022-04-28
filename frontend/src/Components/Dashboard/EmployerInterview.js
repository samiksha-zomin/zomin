import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Col, Row, Button } from "react-bootstrap";

import { BiChevronLeft, BiChevronDownSquare } from "react-icons/bi";
import Heading from "../Heading";
import Name from "../Name";

function EmployerInterview({ setshowSubContentClick }) {
    const [interviewList, setInterviewList] = useState([])

    useEffect(() => {
        Axios.get(
          `${process.env.REACT_APP_SERVER_DOMAIN}/dashboard/interviewList`,
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        ).then((response) => {
            setInterviewList(response.data);
            console.log(interviewList);
        });
      }, []);

  return (
    <div>
      <h1
        onClick={() => setshowSubContentClick(0)}
        className="me-2 d-block d-sm-none"
      >
        <BiChevronLeft className="d-inline" />
        <Heading content="My Profile" design="h1 d-inline-block" />
      </h1>
      <Col lg={10} md={12} sm={12} className="mx-auto my-3">


      {interviewList
      .map((interviewDetails) => {
          const ivOption = interviewDetails.ivOption;
          const interviewerName = interviewDetails.interviewerName;
          const interviewerContactNum = interviewDetails.interviewerContactNum;
          const interviewTime = new Date(interviewDetails.interviewTime);
          const interviewDate = new Date(interviewDetails.interviewDate);
          const interviewVenueOrVideo = interviewDetails.interviewVenueOrVideo;
          const interviewRemarks = interviewDetails.interviewRemarks;
          const cddID = interviewDetails.candidate_id;
          const jobTitle = interviewDetails.job_title;

          const time = interviewTime.toLocaleTimeString("en-GB", {
            hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
            .replace(/ /g, " ");

          const date = interviewDate.toLocaleDateString("en-GB", {
            day: "numeric",
              month: "short",
              year: "numeric"
            })
            .replace(/ /g, " ");

          return (
              <>


        <Row>
          <Col lg={9} md={8} sm={12}>
            <p className="mx-2 my-1 text-truncate fw-bold">
              {jobTitle}
            </p>
            <p className="mx-2 my-1 text-truncate">
              <a
                href="/mm"
                target="_blank"
                className="text-decoration-none text-dark"
              >
                <Name id={cddID} />
              </a>
            </p>
            <p className="mx-2 my-1 text-truncate">
              <a href="/mm" target="_blank" className="text-decoration-none">
                {interviewVenueOrVideo}
              </a>
            {' '}({ivOption})
            </p>
            <p className="mx-2 my-1 text-truncate">{date} , {time}</p>
            <p className="mx-2 my-1 text-truncate">Interviewer: {interviewerName}{' '} ({interviewerContactNum})</p>
            <p className="mx-2 my-1 ">Remarks: {interviewRemarks}</p>
          </Col>
          <Col lg={3} md={4} sm={12}>
            <button
              type="button"
              className="col-12 btn btn-sm btn-primary mb-2"
            >
              Schedule
            </button>
            <button
              className="col-12 btn btn-sm btn-link text-decoration-none mb-2 text-end link-info"
              data-bs-toggle="collapse"
              //   href={`#col-${postID}`}
              role="button"
              aria-expanded="false"
              //   aria-controls={`col-${postID}`}
              href="#lol"
              aria-controls="lol"
            >
              Schedule History <BiChevronDownSquare size={21} />
            </button>
          </Col>
        </Row>
        <Row className="alert-warning mx-auto py-2 rounded">
        <Col sm={8} >
        <Heading content="New Proposed Interview" design="h5" />
        <p className="mx-2 my-1 text-truncate">
              <a href="/mm" target="_blank" className="text-decoration-none">
                https://fbcwejbcfewjub.com
              </a>
            </p>
            <p className="mx-2 my-1 text-truncate">11 June 2020 (10am)</p>
            <p className="mx-2 my-1 text-truncate">Reason: hrjebf djhvechje ehjc wejhdc w</p>
        </Col>
        <Col sm={4} className="align-self-center text-lg-center text-md-end text-end">
            <Button variant="danger" className="m-1">Reject</Button>
            <Button variant="success" className="m-1">Agree</Button>
        </Col>
        </Row>
        <Row className="collapse my-1 p-3" id="lol">
          <Col sm={12}>
              <Heading content="Schedule History" design="h6" />
          </Col>
          <Col sm={8} >
        <p className="mx-2 my-1 text-truncate">
              <a href="/mm" target="_blank" className="text-decoration-none">
                https://fbcwejbcfewjub.com
              </a>
            </p>
            <p className="mx-2 my-1 text-truncate">11 June 2020 (10am)</p>
            <p className="mx-2 px-2 my-1 text-truncate alert-danger rounded">Reason: hrjebf djhvechje ehjc wejhdc w</p>
        </Col>
        </Row>
        <hr className="mx-1 my-3" />


        </>
          )
        })
      }


      </Col>


              
          
      
    </div>
  );
}

export default EmployerInterview;
