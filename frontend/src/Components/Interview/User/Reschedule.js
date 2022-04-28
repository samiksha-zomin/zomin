import React, {useEffect, useState, useContext } from "react";
import Axios from "axios";
import { AuthContext } from "../../../Helpers/AuthContext";

import { Row, Alert, Col, Button } from "react-bootstrap";
import { BiTime } from "react-icons/bi";

import Heading from "../../Heading";

function Reschedule(props) {
  const interviewID = props.interviewID;
  const interviewerName = props.interviewerName;
  const interviewLink = props.interviewLink;

  const { authState, setAuthState } = useContext(AuthContext);
  const [newInterview, setNewInterview] = useState([]);


  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/userinterview/reschedule/`+interviewID
    ).then((response) => {
      setNewInterview(response.data);
    });
  }, [interviewID]);


  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
    {newInterview
    .map((rescheduleDetails, key) => {
        const proposedInterview = new Date(rescheduleDetails.proposed_interview);
        const remarks = rescheduleDetails.remarks;

        const newInterview = proposedInterview
                .toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
                .replace(/ /g, " ");

        return (
            <Row className="p-2">
      <Alert variant="warning" className="mx-auto rounded">
      <Heading content="Reschedule to New Time and Date" design="h4" />
        <Row>
        <Col sm={12}>
          <div>
            <p className="m-0">Intervierew Name: {interviewerName}</p>
            <p className="m-0">
              <BiTime className="icon" />
              {newInterview}
            </p>
            <a
              href={interviewLink}
              target="_blank"
              rel="noreferrer"
              className="m-0 text-decoration-none"
            >
              {interviewLink}
            </a>
            <p className="m-0">Reason: {remarks}</p>
          </div>
        </Col>
        {/* <Col
          sm={4}
          className="mx-auto align-self-center text-lg-center text-md-end text-end"
        >
        <Button variant="danger" className="me-3 my-1">Reject</Button>
        <Button variant="success" className="mx-auto my-auto">Agree</Button>
        </Col> */}
        </Row>
      </Alert>
    </Row>
        );
    })}

    </AuthContext.Provider>
  );
}

export default Reschedule;
