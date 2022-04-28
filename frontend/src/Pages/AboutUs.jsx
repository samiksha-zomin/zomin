import React, { Fragment } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";

import Heading from "../Components/Heading";
import AboutZomIN from "../Components/AboutUs/AboutZomIN";
import ZomINBg from "../Components/AboutUs/ZomINBg";
import Team from "../Components/AboutUs/Team";
import ActivityEvent from "../Components/AboutUs/ActivityEvent";
import Footer from '../Components/Footer';
import ScrollToTop from '../Components/ScrollToTop';

import Ads from '../Components/Ads'

function AboutUs() {
  return (
    <Fragment>
    <HelmetProvider>
      <Helmet>
        <title> About Us | Zom - IN </title>
      </Helmet>
    </HelmetProvider>
    <div id="aboutUs" className="aboutUs my-2">
      <Container>
        <Row className="d-flex">
          <Col sm={12} md={12} lg={10} className="mx-auto">
            <Row>
              <Col md={3} lg={3} className="mb-4 d-none d-sm-none d-md-block">
                <Heading content="Menu" design="h2 mb-4 px-3" />
                <Row>
                  <Col sm={12}>
                    <div className="nav flex-column">
                      <div className="nav-item">
                        <a className="text-dark nav-link active" aria-current="page" href="#compBg">Company Background</a>
                      </div>
                      <div className="nav-item">
                        <a className="text-dark nav-link" href="#team">Our Teams</a>
                      </div>
                      <div className="nav-item">
                        <a className="text-dark nav-link" href="#activityEvent">Activities and Events</a>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>

              <Col sm={9} className="mb-4 border-start min-vh-75 d-block">
              <Row className="justify-content-center">
                <Col sm={11} className="mx-auto">
                <AboutZomIN />
                <ZomINBg />
                <Team />
                <ActivityEvent />

                </Col>

              </Row>

              </Col>
            </Row>
          </Col>
          <Col sm={12} md={12} lg={2} className="d-none d-md-none d-lg-block">
          <Ads />

          </Col>
        </Row>
      </Container>
    </div>
    <Footer />
    <ScrollToTop />
    </Fragment>
  );
}

export default AboutUs;
