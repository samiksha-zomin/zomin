import React from 'react';
import ReactPlayer from 'react-player';
import { Row, Col } from "react-bootstrap";

import { FcCalendar } from "react-icons/fc";


function Events(props) {
    return (
        <Row className="my-3 mx-auto">
          <Col xs={12} sm={12} md={8} lg={8} className="justify-content-center">
            <div className="ratio ratio-16x9">
            <ReactPlayer
            width="100%"
            min-height="360px"
            url={props.source} />
            </div>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4}>
            <p className="fs-5 m-0 fw-bold">{props.eventName}</p>
            <p className="fs-6">
              <FcCalendar className="icons" />
              {props.eventDate}
            </p>
          </Col>
        </Row>
    )
}

export default Events
