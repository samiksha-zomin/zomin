import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import TopBanner from "./TopBanner";
import Profile from "./Profile";
import Suggestion from './Suggestion';
import Posts from "./Posts";
import Footer from '../Footer';
import ScrollToTop from '../ScrollToTop';
import Ads from "../Ads";

function Home(props) {

const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
          navigate("/signup");
        }
      });

    const userID = props.userID;

  return (
    <div id="home" className="home my-2">
      <Container className="mx-auto mb-5">
        <Row>
          <TopBanner />
        </Row>
      </Container>
      <Container className="my-2">
      <Row>
          <Col
            lg={2} md={3}
            className="d-none d-xs-none d-sm-none d-md-block d-lg-block"
          >
            <Profile userID={userID} />
            <Suggestion />
          </Col>
          <Col xs={12} sm={12} md={9} lg={7}>
              <Posts userID={userID} />
          </Col>
          <Col lg={3}
            className="d-none d-xs-none d-sm-none d-md-none d-lg-block"
            >
            <Ads />
            </Col>
        </Row>
      </Container>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default Home;
