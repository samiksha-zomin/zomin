import React from "react";
import ReactPlayer from 'react-player';
import { Row, Col } from "react-bootstrap";

function AboutZomIN() {
  return (
    <Row>
      <Col lg={8} md={10} className="justify-content-center my-3 mx-auto">
        <div className="ratio ratio-16x9">
           <ReactPlayer
            width="100%"
            min-height="360px"
            url="https://fb.watch/9uddc8Ij52/" />
        </div>
      </Col>
      <figure className="text-center my-2">
        <blockquote className="blockquote">
          <p className="fw-bold">
            "To bridge the gap between graduates and employers"
          </p>
        </blockquote>
        <figcaption className="blockquote-footer">ZOM-IN</figcaption>
      </figure>
    </Row>
  );
}

export default AboutZomIN;
