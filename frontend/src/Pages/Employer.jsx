import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import Benefit1 from "../Assests/Images/index/zom-in-employer-benefit-1.png";
import Benefit2 from "../Assests/Images/index/zom-in-employer-benefit-2.png";
import Benefit3 from "../Assests/Images/index/zom-in-employer-benefit-3.png";

function Employer() {
  const [partnerList, setPartnerList] = useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/partner/list`).then(
      (response) => {
        setPartnerList(response.data);
      }
    );
  }, []);
  return (
    <div className="index indexPage mb-5" id="index">
      <Container className="py-5">
        <Row className="d-flex my-1 mx-auto flex-nowrap overflow-auto">
          <Col lg={4} md={5} sm={11} className="py-4">
            <div className="text-center mx-auto">
              <img
                src={Benefit1}
                className="card-img-top w-75 img-fluid"
                alt="Benefit of Using ZOM-IN"
              />
            </div>
            <div>
              <p className="text-center fs-5 fw-bold p-0 m-0">
                Fast and Easy Application
              </p>
              <p className="text-secondary text-center p-0 m-0">
                Easy application with a single click.
              </p>
            </div>
          </Col>
          <Col lg={4} md={5} sm={11} className="py-4">
            <div className="text-center mx-auto">
              <img
                src={Benefit2}
                className="card-img-top w-75 img-fluid"
                alt="Benefit of Using ZOM-IN"
              />
            </div>
            <div>
              <p className="text-center fs-5 fw-bold p-0 m-0">
                Trusted Companies
              </p>
              <p className="text-secondary text-center p-0 m-0">
                More than 70 reliable companies are hiring with us.
              </p>
            </div>
          </Col>
          <Col lg={4} md={5} sm={11} className="py-4">
            <div className="text-center mx-auto">
              <img
                src={Benefit3}
                className="card-img-top w-75 img-fluid"
                alt="Benefit of Using ZOM-IN"
              />
            </div>
            <div>
              <p className="text-center fs-5 fw-bold p-0 m-0">
                Virtual Interview
              </p>
              <p className="text-secondary text-center p-0 m-0">
                Attend your interview online to conform SOP.
              </p>
            </div>
          </Col>
        </Row>

        <Row className="my-5 mx-auto justify-content-center">
          <p className="text-center fs-4 fw-bold mt-5">Testimonials</p>
          <Row className="d-flex flex-nowrap mb-5 overflow-auto py-3">
            <Col lg={4} md={5} sm={11} className="px-lg-4 px-md-2">
              <Card className=" h-100 cardBorder">
                <Card.Body>
                  <Card.Text className="m-2">
                    "Zom-In has definitely been helpful in my search for an
                    internship placement. They're very prompt and has constantly
                    been updating and checking up on me. Definitely recommending
                    them to my colleagues."
                    <blockquote className="px-3 text-center fst-italic">
                      <span className="fw-bold">Muhammad Fakhrul Aqil</span> -
                      Intern
                    </blockquote>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={5} sm={11} className="px-lg-4 px-md-2">
              <Card className=" h-100 cardBorder">
                <Card.Body>
                  <Card.Text className="m-2">
                    "Life is all about exploring and learning. ZOM-IN provides
                    an opportunity for us to explore new ideas and build up
                    connection. Opportunity is already given, keep it and move
                    towards your goals."
                    <blockquote className="px-3 text-center fst-italic">
                      <span className="fw-bold">Alex Chai</span> - College
                      Student
                    </blockquote>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={5} sm={11} className="px-lg-4 px-md-2">
              <Card className=" h-100 cardBorder">
                <Card.Body>
                  <Card.Text className="m-2">
                    "ZOM-IN creates a positive impact on the students in terms
                    of having a sense of entrepreneurship. Besides, it also
                    encourages the students to take their first step by
                    connecting them to the right peple. There is always a
                    barrier between students and the working professionals, and
                    now ZOM-IN is breaking it."
                    <blockquote className="px-3 text-center fst-italic">
                      <span className="fw-bold">Jia Wey Tan</span> - Researcher
                    </blockquote>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Row>

        <Row className="my-5 mx-auto justify-content-center">
          <p className="text-center fs-4 fw-bold mt-5">Our Partners</p>
          <div className="d-flex flex-nowrap overflow-auto justify-content-lg-center justify-content-md-start mb-5 mt-3 py-3">
            {partnerList.slice(0, 6).map((partnerDetails, key) => {
              const companyName = partnerDetails.company_name;
              const partnerIndustry = partnerDetails.industry;
              const partnerLink =
                "/partner/" +
                companyName.toLowerCase().trim().split(/\s+/).join("-");
              const partnerLogo =
                `${process.env.REACT_APP_SERVER_DOMAIN}/public/Assests/Images/user/` +
                partnerDetails.company_logo;

              return (
                <div className="m-3 text-center">
                  <div className="h-75 m-auto">
                    <img
                      src={partnerLogo}
                      alt={companyName}
                      href={partnerLink}
                      className=" mb-2 img-fluid rounded-circle align-middle border"
                      width="100"
                      height="100"
                    />
                  </div>
                  <p className="fs-5 d-block fw-bold p-0 m-0 text-truncate">
                    {companyName}
                  </p>
                  <p className="text-secondary d-block fs-6">{partnerIndustry}</p>
                </div>
              );
            })}
          </div>
        </Row>

        <Row className="my-5 mx-auto justify-content-center">
          <p className="text-center fs-4 fw-bold mt-5">Need Our Assistance?</p>
          <Col className="text-center">
            <Button href="/contact" variant="primary" size="lg">
              Contact Us
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Employer;
