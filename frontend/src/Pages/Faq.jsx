import React, { Fragment, useState, useEffect } from "react";
import Axios from "axios";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ReactHtmlParser from "react-html-parser";

import { Col, Container, Row } from "react-bootstrap";
import { BiSearchAlt } from "react-icons/bi";
import Heading from "../Components/Heading";

function Faq() {
  const [faqList, setFaqList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchRole, setSearchRole] = useState("");

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/faq/list`).then(
      (response) => {
        setFaqList(response.data);
        setSearchRole("user");
      }
    );
  }, []);

  const roleType = (event) => {
    const faqType = event.target.value;
    setSearchRole(faqType);
  };

  return (
    <Fragment>
      <HelmetProvider>
        <Helmet>
          <title> FAQs | Zom - IN </title>
        </Helmet>
      </HelmetProvider>
      <div id="faq" className="faq">
        <Container fluid className="h-100 searchbox">
          <Row className="py-3 px-5 text-center mx-auto">
            <Heading content="How can we help you?" design="h4 fw-bold" />
            {/* <div className="fs-3 fw-bold"></div> */}

            <div className="input-group ">
              <input
                type="text"
                className="form-control"
                placeholder="Describe the issue here"
                aria-label="Keywords"
                aria-describedby="button-addon2"
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              />
              <button
                className="btn btn-outline-primary"
                type="button"
                id="button-addon2"
              >
                <BiSearchAlt /> Search
              </button>
            </div>
            <div className="mt-3">
              <p>
              Didn't find the solution you're looking for?{"  "}
                <a href="/contact" className="text-decoration-none">
                  Contact us now!
                </a>
              </p>
            </div>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col sm={10}>
              <div className="row justify-content-center">
                <nav>
                  <div
                    className="nav nav-pills justify-content-center mt-4"
                    id="faqTab"
                    role="tablist"
                  >
                    <button
                      className="nav-link active"
                      id="userFaq"
                      data-bs-toggle="tab"
                      data-bs-target="#userTab"
                      role="tab"
                      aria-controls="userTab"
                      aria-selected="true"
                      value="user"
                      onClick={roleType}
                    >
                      User
                    </button>
                    <button
                      className="nav-link"
                      id="bpFaq"
                      data-bs-toggle="tab"
                      data-bs-target="#bpTab"
                      role="tab"
                      aria-controls="bpTab"
                      aria-selected="false"
                      value="company"
                      onClick={roleType}
                    >
                      Employer
                    </button>
                  </div>
                </nav>
              </div>

              <div className="tab-content" id="faqTabContent">
                <div
                  className="tab-pane fade show active"
                  id="userTab"
                  role="tabpanel"
                  aria-labelledby="userFaq"
                >
                  <div
                    className="accordion accordion-flush my-3"
                    id="accordUser"
                  >
                    {faqList

                      .filter((faqDetails) => {
                        if (searchTerm === "") {
                          return faqDetails;
                        } else if (
                          faqDetails.title
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        ) {
                          return faqDetails;
                        }
                        return false;
                      })

                      .filter((faqDetails) => {
                        if (
                          faqDetails.status
                            .toLowerCase()
                            .includes(searchRole.toLowerCase())
                        ) {
                          return faqDetails;
                        }
                        return false;
                      })

                      .map((faqDetails, key) => {
                        const faqID = "faq-" + faqDetails.faqs_id;
                        const question = faqDetails.title;
                        const answer = faqDetails.description;

                        return (
                          <div className="accordion-item">
                            <h2 className="accordion-header" id="userQ1">
                              <button
                                className="accordion-button collapsed fw-bold"
                                data-bs-toggle="collapse"
                                data-bs-target={`#${faqID}`}
                                aria-expanded="false"
                                aria-controls={faqID}
                              >
                                {question}
                              </button>
                            </h2>
                            <div
                              id={faqID}
                              className="accordion-collapse collapse"
                              aria-labelledby="userQ1"
                              data-bs-parent="#accordUser"
                            >
                              <div className="accordion-body text-decoration-none">
                                {ReactHtmlParser(answer)}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={2}>
              <Heading content="ads here" design="h5 border" />
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
}

export default Faq;
