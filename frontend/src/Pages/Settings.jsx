import React, { Fragment, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { AuthContext } from "../Helpers/AuthContext";
import { Container, Row, Col } from "react-bootstrap";
import SubMenu from "../Components/Settings/SubMenu";
import Password from "../Components/Settings/Password";

import Ads from "../Components/Ads";


function Settings() {
  const { authState, setAuthState } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/signup");
    }
  });

  const [showSubContent, setshowSubContent] = useState(1);
  const subContentStatus = (currentSubContent) => {
    setshowSubContent(currentSubContent);
  };


  let mobileStatus;
  if (window.innerWidth < 575) {
    if (showSubContent > 0) {
        mobileStatus = "d-none";
    } else {
        mobileStatus = "d-block";
    }
  }

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Fragment>
        <HelmetProvider>
          <Helmet>
            <title> Settings | Zom - IN </title>
          </Helmet>
        </HelmetProvider>
        <div id="settings" className="settings my-2">
          <Container>
            <Row>
              <Col lg={2} md={3} sm={12} className={`mb-4 ${mobileStatus}`}>
                <Row
                  className="d-flex justify-content-between border-bottom"
                  onClick={(e) => subContentStatus(1)}
                  role="button"
                >
                  <SubMenu content="Password" />
                </Row>
              </Col>

              <Col lg={8} md={9} sm={12} className={!mobileStatus}>

                {showSubContent === 1 && (
                  <Password showSubContent={showSubContent} setshowSubContentClick={setshowSubContent} />
                )}
              </Col>
              <Col lg={2} className="d-none d-md-none d-lg-block">
                <Ads />
              </Col>
            </Row>
          </Container>
        </div>
      </Fragment>
    </AuthContext.Provider>
  );
}

export default Settings;
