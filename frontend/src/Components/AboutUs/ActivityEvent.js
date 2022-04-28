import React from "react";
import { Row, Col } from "react-bootstrap";

import Heading from "../Heading";
import Events from "./Events";

function ActivityEvent() {
  return (
    <Row>
      <Col sm={12} className="my-1 mx-auto" id="activityEvent">
        <Heading
          content="Events & Activities"
          design="fw-bold fs-5 bg-info text-white rounded text-center mb-3"
        />
        <Events
          source="https://fb.watch/9ucL8-TEvl/"
          eventName="Selamat Hari Raya!"
          eventDate="11th May 2021"
        />
        <Events
          source="https://fb.watch/9ucPOR7ywd/"
          eventName="Happy Mother's Day to All Mothers"
          eventDate="7th May 2021"
        />
        <Events
          source="https://fb.watch/9ucTLiyUjf/"
          eventName="Dream vs. Reality. What Would You Choose?"
          eventDate="9th April 2021"
        />
        <Events
          source="https://fb.watch/9ucYmmMC8J/"
          eventName="Things to do during CMCO"
          eventDate="23rd October 2020"
        />
      </Col>
    </Row>
  );
}

export default ActivityEvent;
